<script lang="ts">
	import { exercisesStore } from '$lib/stores/exercises';
	import type { Exercise, ExerciseCategory } from '$lib/types';
	import Card from '../common/Card.svelte';
	import ChestIcon from '../icons/ChestIcon.svelte';
	import BackIcon from '../icons/BackIcon.svelte';
	import ShouldersIcon from '../icons/ShouldersIcon.svelte';
	import LegsIcon from '../icons/LegsIcon.svelte';
	import CoreIcon from '../icons/CoreIcon.svelte';
	import ChevronIcon from '../icons/ChevronIcon.svelte';

	export let onSelectExercise: (exercise: Exercise) => void;

	let selectedCategory: ExerciseCategory | null = null;
	let searchQuery = '';

	const categories: { name: ExerciseCategory; icon: any }[] = [
		{ name: 'CHEST', icon: ChestIcon },
		{ name: 'BACK', icon: BackIcon },
		{ name: 'SHOULDERS', icon: ShouldersIcon },
		{ name: 'LEGS', icon: LegsIcon },
		{ name: 'CORE', icon: CoreIcon }
	];

	$: filteredExercises = $exercisesStore.filter((ex) => {
		const matchesCategory = !selectedCategory || ex.category === selectedCategory;
		const matchesSearch =
			!searchQuery || ex.name.toLowerCase().includes(searchQuery.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	function selectCategory(category: ExerciseCategory) {
		selectedCategory = selectedCategory === category ? null : category;
	}

	function handleSelectExercise(exercise: Exercise) {
		onSelectExercise(exercise);
		// Reset selection
		selectedCategory = null;
		searchQuery = '';
	}
</script>

<div class="exercise-selector">
	<h2>Select Exercise</h2>

	<!-- Search bar -->
	<input
		type="text"
		class="search-input"
		placeholder="Search exercises..."
		bind:value={searchQuery}
	/>

	<!-- Category filters -->
	<div class="categories">
		{#each categories as category}
			<button
				class="category-btn"
				class:active={selectedCategory === category.name}
				on:click={() => selectCategory(category.name)}
			>
				<svelte:component this={category.icon} size={28} />
				<span>{category.name}</span>
			</button>
		{/each}
	</div>

	<!-- Exercise list -->
	<div class="exercise-list">
		{#if filteredExercises.length === 0}
			<p class="empty-message">No exercises found</p>
		{:else}
			{#each filteredExercises as exercise (exercise.id)}
				<Card clickable padding="md" on:click={() => handleSelectExercise(exercise)}>
					<div class="exercise-item">
						<div class="exercise-info">
							<span class="exercise-name">{exercise.name}</span>
							<span class="exercise-category">{exercise.category}</span>
						</div>
						<ChevronIcon size={20} color="var(--text-tertiary)" />
					</div>
				</Card>
			{/each}
		{/if}
	</div>
</div>

<style>
	.exercise-selector {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	h2 {
		font-size: 1.75rem;
		font-weight: 800;
		margin: 0;
	}

	.search-input {
		width: 100%;
		padding: var(--space-md);
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-size: 1rem;
	}

	.search-input::placeholder {
		color: var(--text-tertiary);
	}

	.search-input:focus {
		border-color: var(--accent-primary);
		outline: none;
	}

	.categories {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: var(--space-sm);
	}

	.category-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--space-xs);
		padding: var(--space-md);
		background: var(--bg-secondary);
		border: 2px solid var(--border-primary);
		border-radius: var(--radius-lg);
		color: var(--text-secondary);
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: capitalize;
		min-height: 80px;
		transition: all 0.15s ease;
	}

	.category-btn:hover {
		border-color: var(--border-secondary);
		background: var(--bg-tertiary);
	}

	.category-btn:active {
		transform: scale(0.95);
	}

	.category-btn.active {
		border-color: var(--accent-primary);
		background: var(--bg-tertiary);
		color: var(--accent-primary);
	}

	.exercise-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
		max-height: 60vh;
		overflow-y: auto;
	}

	.exercise-item {
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

	.exercise-category {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.empty-message {
		text-align: center;
		color: var(--text-tertiary);
		padding: var(--space-xl);
	}
</style>