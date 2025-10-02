<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllWorkouts, deleteAllWorkouts } from '$lib/db/workout-db';
	import { exportAllWorkoutsToCSV } from '$lib/utils/export';
	import type { Workout } from '$lib/types';
	import WorkoutCard from '$lib/components/history/WorkoutCard.svelte';
	import WorkoutDetails from '$lib/components/history/WorkoutDetails.svelte';
	import DeleteAllConfirmation from '$lib/components/common/DeleteAllConfirmation.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import DownloadIcon from '$lib/components/icons/DownloadIcon.svelte';
	import TrashIcon from '$lib/components/icons/TrashIcon.svelte';

	let workouts: Workout[] = [];
	let selectedWorkout: Workout | null = null;
	let showDetails = false;
	let showDeleteAllConfirmation = false;

	onMount(async () => {
		workouts = await getAllWorkouts();
	});

	async function refreshWorkouts() {
		workouts = await getAllWorkouts();
	}

	function handleSelectWorkout(workout: Workout) {
		selectedWorkout = workout;
		showDetails = true;
	}

	async function handleCloseDetails() {
		showDetails = false;
		selectedWorkout = null;
		await refreshWorkouts();
	}

	async function handleExerciseDeleted() {
		await refreshWorkouts();
		// If the selected workout no longer exists (all exercises deleted), close the details
		const workoutStillExists = workouts.find(w => w.id === selectedWorkout?.id);
		if (!workoutStillExists) {
			showDetails = false;
			selectedWorkout = null;
		} else {
			// Update the selected workout with fresh data
			selectedWorkout = workoutStillExists;
		}
	}

	function handleExportAll() {
		if (workouts.length > 0) {
			exportAllWorkoutsToCSV(workouts);
		}
	}

	function handleDeleteAllClick() {
		showDeleteAllConfirmation = true;
	}

	async function confirmDeleteAll() {
		await deleteAllWorkouts();
		await refreshWorkouts();
		showDeleteAllConfirmation = false;
		showDetails = false;
		selectedWorkout = null;
	}

	function cancelDeleteAll() {
		showDeleteAllConfirmation = false;
	}

	$: hasWorkouts = workouts.length > 0;
</script>

<div class="page">
	<div class="header">
		<h1>History</h1>
	</div>

	{#if hasWorkouts}
		<div class="header-actions">
			<Button variant="secondary" size="sm" on:click={handleExportAll}>
				<DownloadIcon size={18} />
				<span class="button-text">Export All</span>
			</Button>
			<Button variant="danger" size="sm" on:click={handleDeleteAllClick}>
				<TrashIcon size={18} />
				<span class="button-text">Delete All</span>
			</Button>
		</div>
	{/if}

	{#if !hasWorkouts}
		<div class="empty-state">
			<p>No workout history yet.</p>
			<p class="hint">Complete your first workout to see it here.</p>
		</div>
	{:else}
		<div class="workout-list">
			{#each workouts as workout (workout.id)}
				<WorkoutCard {workout} onSelect={() => handleSelectWorkout(workout)} />
			{/each}
		</div>
	{/if}
</div>

{#if selectedWorkout}
	<WorkoutDetails
		workout={selectedWorkout}
		isOpen={showDetails}
		onClose={handleCloseDetails}
		onExerciseDeleted={handleExerciseDeleted}
	/>
{/if}

<DeleteAllConfirmation
	isOpen={showDeleteAllConfirmation}
	onConfirm={confirmDeleteAll}
	onCancel={cancelDeleteAll}
/>

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
		align-items: center;
		justify-content: space-between;
	}

	.header-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-sm);
		width: 100%;
	}

	.button-text {
		white-space: nowrap;
	}

	.header h1 {
		font-size: 2rem;
		font-weight: 900;
		margin: 0;
		color: var(--text-primary);
		letter-spacing: -0.02em;
	}

	.empty-state {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		padding: var(--space-2xl);
		text-align: center;
	}

	.empty-state p {
		margin: 0;
		font-size: 1.125rem;
		color: var(--text-secondary);
	}

	.empty-state .hint {
		font-size: 1rem;
		color: var(--text-tertiary);
	}

	.workout-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}
</style>