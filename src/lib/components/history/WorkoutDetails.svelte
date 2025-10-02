<script lang="ts">
	import type { Workout } from '$lib/types';
	import Modal from '../common/Modal.svelte';
	import Button from '../common/Button.svelte';
	import DeleteExerciseConfirmation from '../common/DeleteExerciseConfirmation.svelte';
	import DownloadIcon from '../icons/DownloadIcon.svelte';
	import { exportWorkoutToCSV } from '$lib/utils/export';
	import { deleteExerciseFromWorkout } from '$lib/db/workout-db';

	export let workout: Workout;
	export let isOpen: boolean;
	export let onClose: () => void;
	export let onExerciseDeleted: () => void;

	let showDeleteConfirmation = false;
	let selectedExerciseId = '';
	let selectedExerciseName = '';

	function handleExport() {
		exportWorkoutToCSV(workout);
	}

	function handleExerciseClick(exerciseId: string, exerciseName: string) {
		selectedExerciseId = exerciseId;
		selectedExerciseName = exerciseName;
		showDeleteConfirmation = true;
	}

	async function confirmDeleteExercise() {
		await deleteExerciseFromWorkout(workout.id, selectedExerciseId);
		showDeleteConfirmation = false;
		selectedExerciseId = '';
		selectedExerciseName = '';
		onExerciseDeleted();
	}

	function cancelDeleteExercise() {
		showDeleteConfirmation = false;
		selectedExerciseId = '';
		selectedExerciseName = '';
	}
</script>

<Modal {isOpen} title={`Workout - ${workout.date}`} {onClose}>
	<div class="workout-details">
		{#each workout.exercises as exercise}
			<div class="exercise-section">
				<div class="exercise-header">
					<span class="category">{exercise.category}</span>
					<button
						class="exercise-name-btn"
						on:click={() => handleExerciseClick(exercise.id, exercise.exerciseName)}
					>
						<h3 class="exercise-name">{exercise.exerciseName}</h3>
					</button>
				</div>

				<div class="sets-table">
					<div class="table-header">
						<span>Set</span>
						<span>Reps</span>
						<span>Weight</span>
					</div>
					{#each exercise.sets as set}
						<div class="table-row">
							<span>{set.setNumber}</span>
							<span>{set.reps}</span>
							<span>{set.weight} lbs</span>
						</div>
					{/each}
				</div>

				{#if exercise.notes}
					<div class="notes">
						<span class="notes-label">Notes:</span>
						<p>{exercise.notes}</p>
					</div>
				{/if}
			</div>
		{/each}

		<div class="export-section">
			<Button variant="secondary" size="lg" fullWidth on:click={handleExport}>
				<DownloadIcon size={20} />
				Export to CSV
			</Button>
		</div>
	</div>
</Modal>

<DeleteExerciseConfirmation
	isOpen={showDeleteConfirmation}
	exerciseName={selectedExerciseName}
	onConfirm={confirmDeleteExercise}
	onCancel={cancelDeleteExercise}
/>

<style>
	.workout-details {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.exercise-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-md);
		padding-bottom: var(--space-lg);
		border-bottom: 1px solid var(--border-primary);
	}

	.exercise-section:last-of-type {
		border-bottom: none;
		padding-bottom: 0;
	}

	.exercise-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.category {
		font-size: 0.75rem;
		font-weight: 600;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.exercise-name-btn {
		width: 100%;
		text-align: left;
		padding: var(--space-sm);
		border-radius: var(--radius-md);
		transition: background 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.exercise-name-btn:hover {
		background: var(--bg-tertiary);
	}

	.exercise-name-btn:active {
		transform: scale(0.98);
	}

	.exercise-name {
		font-size: 1.125rem;
		font-weight: 700;
		margin: 0;
		color: var(--text-primary);
	}

	.sets-table {
		display: flex;
		flex-direction: column;
		background: var(--bg-primary);
		border-radius: var(--radius-md);
		overflow: hidden;
	}

	.table-header,
	.table-row {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		padding: var(--space-md);
		text-align: center;
	}

	.table-header {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		background: var(--bg-tertiary);
	}

	.table-row {
		font-size: 1rem;
		color: var(--text-primary);
		border-top: 1px solid var(--border-primary);
	}

	.notes {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--bg-tertiary);
		border-radius: var(--radius-md);
	}

	.notes-label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.notes p {
		margin: 0;
		font-size: 0.9375rem;
		color: var(--text-primary);
		line-height: 1.5;
	}

	.export-section {
		padding-top: var(--space-md);
		border-top: 1px solid var(--border-primary);
	}
</style>