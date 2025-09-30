<script lang="ts">
	import type { Workout } from '$lib/types';
	import Card from '../common/Card.svelte';
	import ChevronIcon from '../icons/ChevronIcon.svelte';

	export let workout: Workout;
	export let onSelect: () => void;

	$: totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0);
	$: totalExercises = workout.exercises.length;
</script>

<Card clickable padding="lg" on:click={onSelect}>
	<div class="workout-card">
		<div class="workout-info">
			<div class="date">{workout.date}</div>
			<div class="stats">
				<span>{totalExercises} exercise{totalExercises !== 1 ? 's' : ''}</span>
				<span class="separator">•</span>
				<span>{totalSets} set{totalSets !== 1 ? 's' : ''}</span>
			</div>
		</div>
		<ChevronIcon size={20} color="var(--text-tertiary)" />
	</div>
</Card>

<style>
	.workout-card {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.workout-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.date {
		font-size: 1.125rem;
		font-weight: 700;
		color: var(--text-primary);
	}

	.stats {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		font-size: 0.875rem;
		color: var(--text-secondary);
	}

	.separator {
		color: var(--text-tertiary);
	}
</style>