<script lang="ts">
	import { onMount } from 'svelte';
	import { workoutStore } from '$lib/stores/workout';
	import { addExerciseToWorkout, getTodayWorkout, startWorkoutSession, endWorkoutSession } from '$lib/db/workout-db';
	import type { Exercise, ExerciseSession, Workout } from '$lib/types';
	import ExerciseSelector from '$lib/components/workout/ExerciseSelector.svelte';
	import SetLogger from '$lib/components/workout/SetLogger.svelte';
	import NotesModal from '$lib/components/workout/NotesModal.svelte';
	import Card from '$lib/components/common/Card.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import CheckIcon from '$lib/components/icons/CheckIcon.svelte';

	let todayWorkout: Workout | null = null;
	let showNotesModal = false;

	onMount(async () => {
		todayWorkout = await getTodayWorkout();
	});

	async function handleStartWorkout() {
		todayWorkout = await startWorkoutSession();
	}

	async function handleEndWorkout() {
		todayWorkout = await endWorkoutSession();
		workoutStore.reset();
	}

	async function handleSelectExercise(exercise: Exercise) {
		workoutStore.startExercise(exercise);
		// Refresh today's workout
		todayWorkout = await getTodayWorkout();
	}

	function handleFinishExercise() {
		showNotesModal = true;
	}

	async function handleSaveNotes(notes: string) {
		const { currentExercise, currentSets } = $workoutStore;

		if (currentExercise && currentSets.length > 0) {
			const exerciseSession: ExerciseSession = {
				id: `session-${Date.now()}`,
				exerciseId: currentExercise.id,
				exerciseName: currentExercise.name,
				category: currentExercise.category,
				sets: currentSets,
				notes: notes || undefined,
				timestamp: Date.now()
			};

			await addExerciseToWorkout(exerciseSession);
			todayWorkout = await getTodayWorkout();
		}

		workoutStore.reset();
		showNotesModal = false;
	}

	async function handleSkipNotes() {
		const { currentExercise, currentSets } = $workoutStore;

		if (currentExercise && currentSets.length > 0) {
			const exerciseSession: ExerciseSession = {
				id: `session-${Date.now()}`,
				exerciseId: currentExercise.id,
				exerciseName: currentExercise.name,
				category: currentExercise.category,
				sets: currentSets,
				timestamp: Date.now()
			};

			await addExerciseToWorkout(exerciseSession);
			todayWorkout = await getTodayWorkout();
		}

		workoutStore.reset();
		showNotesModal = false;
	}

	$: hasCompletedExercises = todayWorkout && todayWorkout.exercises.length > 0;
	$: workoutCompleted = todayWorkout && !todayWorkout.isActive && hasCompletedExercises;
	$: workoutInProgress = todayWorkout && todayWorkout.isActive;
	$: workoutNotStarted = todayWorkout && !todayWorkout.isActive && !hasCompletedExercises;
</script>

<div class="page">
	<div class="header">
		<h1>Iron Note</h1>
		<p class="date">{todayWorkout?.date || ''}</p>
	</div>

	<!-- Workout Not Started - Show Start Workout Button -->
	{#if workoutNotStarted}
		<div class="start-workout-section">
			<button class="start-workout-btn" on:click={handleStartWorkout}>
				<AddIcon size={48} />
				<span>Start Workout</span>
			</button>
		</div>
	{/if}

	<!-- Workout Completed Summary -->
	{#if workoutCompleted && todayWorkout}
		<div class="completion-summary">
			<div class="completion-icon">
				<CheckIcon size={64} color="var(--success)" />
			</div>
			<h2>Workout Complete!</h2>
			<div class="completion-stats">
				<div class="stat">
					<span class="stat-value">{todayWorkout.exercises.length}</span>
					<span class="stat-label">Exercises</span>
				</div>
				<div class="stat">
					<span class="stat-value">{todayWorkout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)}</span>
					<span class="stat-label">Total Sets</span>
				</div>
			</div>
			<div class="completed-exercises-list">
				{#each todayWorkout.exercises as exercise}
					<Card padding="md">
						<div class="completed-exercise">
							<div class="exercise-info">
								<span class="exercise-name">{exercise.exerciseName}</span>
								<span class="exercise-stats">
									{exercise.sets.length} set{exercise.sets.length !== 1 ? 's' : ''}
								</span>
							</div>
							<span class="category-badge">{exercise.category}</span>
						</div>
					</Card>
				{/each}
			</div>

			<!-- Return to Home Button -->
			<Button variant="primary" size="lg" fullWidth on:click={() => todayWorkout = null}>
				Return to Home
			</Button>
		</div>
	{/if}

	<!-- Workout In Progress -->
	{#if workoutInProgress && todayWorkout}
		<!-- Today's completed exercises summary -->
		{#if hasCompletedExercises}
			<div class="completed-section">
				<h2>Today's Workout</h2>
				<div class="completed-list">
					{#each todayWorkout.exercises as exercise}
						<Card padding="md">
							<div class="completed-exercise">
								<div class="exercise-info">
									<span class="exercise-name">{exercise.exerciseName}</span>
									<span class="exercise-stats">
										{exercise.sets.length} set{exercise.sets.length !== 1 ? 's' : ''}
									</span>
								</div>
								<span class="category-badge">{exercise.category}</span>
							</div>
						</Card>
					{/each}
				</div>
			</div>
		{/if}

		<!-- Main workout area -->
		{#if $workoutStore.isLogging}
			<SetLogger onFinishExercise={handleFinishExercise} />
		{:else}
			<div class="workout-actions">
				<button class="add-exercise-btn" on:click={() => workoutStore.startExercise(null)}>
					<AddIcon size={32} />
					<span>Add Exercise</span>
				</button>
				<Button variant="secondary" size="lg" fullWidth on:click={handleEndWorkout}>
					End Workout
				</Button>
			</div>

			{#if $workoutStore.currentExercise === null && !$workoutStore.isLogging}
				<ExerciseSelector onSelectExercise={handleSelectExercise} />
			{/if}
		{/if}
	{/if}

	<!-- Notes modal -->
	<NotesModal
		isOpen={showNotesModal}
		exerciseName={$workoutStore.currentExercise?.name || ''}
		onSave={handleSaveNotes}
		onSkip={handleSkipNotes}
	/>
</div>

<style>
	.page {
		min-height: 100vh;
		padding: var(--space-lg);
		padding-bottom: calc(80px + var(--space-lg));
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.header h1 {
		font-size: 2rem;
		font-weight: 900;
		margin: 0;
		color: var(--accent-primary);
		letter-spacing: -0.02em;
	}

	.date {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-secondary);
		margin: 0;
	}

	.completed-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
	}

	.completed-section h2 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
		color: var(--text-primary);
	}

	.completed-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.completed-exercise {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.exercise-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.exercise-name {
		font-size: 1rem;
		font-weight: 600;
		color: var(--text-primary);
	}

	.exercise-stats {
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.category-badge {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-tertiary);
		padding: var(--space-xs) var(--space-sm);
		background: var(--bg-tertiary);
		border-radius: var(--radius-sm);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	/* Start Workout Section */
	.start-workout-section {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-2xl);
	}

	.start-workout-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-lg);
		width: 100%;
		max-width: 280px;
		padding: var(--space-2xl);
		background: var(--accent-primary);
		border-radius: var(--radius-xl);
		color: white;
		font-size: 1.5rem;
		font-weight: 900;
		transition: all 0.2s ease;
		box-shadow: var(--shadow-lg);
	}

	.start-workout-btn:hover {
		background: var(--accent-hover);
		transform: translateY(-4px);
		box-shadow: 0 16px 32px -8px rgba(255, 107, 53, 0.4);
	}

	.start-workout-btn:active {
		transform: translateY(0) scale(0.98);
	}

	/* Completion Summary */
	.completion-summary {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xl);
		padding: var(--space-xl);
		text-align: center;
	}

	.completion-icon {
		animation: scaleIn 0.5s ease;
	}

	@keyframes scaleIn {
		from {
			transform: scale(0);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	.completion-summary h2 {
		font-size: 1.75rem;
		font-weight: 800;
		margin: 0;
		color: var(--success);
	}

	.completion-stats {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-lg);
		width: 100%;
		max-width: 300px;
	}

	.stat {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-lg);
		background: var(--bg-secondary);
		border: 2px solid var(--border-primary);
		border-radius: var(--radius-lg);
	}

	.stat-value {
		font-size: 2.5rem;
		font-weight: 900;
		color: var(--accent-primary);
		line-height: 1;
	}

	.stat-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.completed-exercises-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	/* Workout Actions */
	.workout-actions {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		align-items: center;
	}

	.add-exercise-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		width: 100%;
		max-width: 200px;
		padding: var(--space-xl);
		background: var(--accent-primary);
		border-radius: var(--radius-xl);
		color: white;
		font-size: 1.125rem;
		font-weight: 700;
		transition: all 0.15s ease;
		box-shadow: var(--shadow-lg);
	}

	.add-exercise-btn:hover {
		background: var(--accent-hover);
		transform: translateY(-2px);
		box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.6);
	}

	.add-exercise-btn:active {
		transform: translateY(0) scale(0.98);
	}
</style>