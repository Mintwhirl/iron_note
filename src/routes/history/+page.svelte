<script lang="ts">
	import { onMount } from 'svelte';
	import { getAllWorkouts } from '$lib/db/workout-db';
	import { exportAllWorkoutsToCSV } from '$lib/utils/export';
	import type { Workout } from '$lib/types';
	import WorkoutCard from '$lib/components/history/WorkoutCard.svelte';
	import WorkoutDetails from '$lib/components/history/WorkoutDetails.svelte';
	import Button from '$lib/components/common/Button.svelte';
	import DownloadIcon from '$lib/components/icons/DownloadIcon.svelte';

	let workouts: Workout[] = [];
	let selectedWorkout: Workout | null = null;
	let showDetails = false;

	onMount(async () => {
		workouts = await getAllWorkouts();
	});

	function handleSelectWorkout(workout: Workout) {
		selectedWorkout = workout;
		showDetails = true;
	}

	function handleCloseDetails() {
		showDetails = false;
		selectedWorkout = null;
	}

	function handleExportAll() {
		if (workouts.length > 0) {
			exportAllWorkoutsToCSV(workouts);
		}
	}

	$: hasWorkouts = workouts.length > 0;
</script>

<div class="page">
	<div class="header">
		<h1>History</h1>
		{#if hasWorkouts}
			<Button variant="secondary" on:click={handleExportAll}>
				<DownloadIcon size={20} />
				Export All
			</Button>
		{/if}
	</div>

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
	<WorkoutDetails workout={selectedWorkout} isOpen={showDetails} onClose={handleCloseDetails} />
{/if}

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
		gap: var(--space-md);
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