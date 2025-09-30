<script lang="ts">
	import { workoutStore, isSetLogged, getSetData } from '$lib/stores/workout';
	import Button from '../common/Button.svelte';
	import CheckIcon from '../icons/CheckIcon.svelte';

	export let onFinishExercise: () => void;

	let activeSet: 1 | 2 | 3 | 4 | 5 | null = null;
	let reps: number | null = null;
	let weight: number | null = null;

	const setNumbers: (1 | 2 | 3 | 4 | 5)[] = [1, 2, 3, 4, 5];

	function handleSetClick(setNumber: 1 | 2 | 3 | 4 | 5) {
		if ($isSetLogged(setNumber)) {
			// Load existing data
			const existingSet = $getSetData(setNumber);
			if (existingSet) {
				activeSet = setNumber;
				reps = existingSet.reps;
				weight = existingSet.weight;
			}
		} else {
			// Start new set
			activeSet = setNumber;
			reps = null;
			weight = null;
		}
	}

	function handleSaveSet() {
		if (activeSet && reps !== null && weight !== null && reps > 0 && weight >= 0) {
			workoutStore.addSet(activeSet, reps, weight);
			// Reset form
			activeSet = null;
			reps = null;
			weight = null;
		}
	}

	function handleCancel() {
		activeSet = null;
		reps = null;
		weight = null;
	}

	$: canSave = reps !== null && weight !== null && reps > 0 && weight >= 0;
	$: hasAnySets = $workoutStore.currentSets.length > 0;
</script>

<div class="set-logger">
	<div class="exercise-header">
		<div class="exercise-info">
			<span class="category">{$workoutStore.currentExercise?.category}</span>
			<h2 class="exercise-name">{$workoutStore.currentExercise?.name}</h2>
		</div>
	</div>

	<!-- Set buttons -->
	<div class="set-buttons">
		{#each setNumbers as setNum}
			<button
				class="set-btn"
				class:active={activeSet === setNum}
				class:logged={$isSetLogged(setNum)}
				on:click={() => handleSetClick(setNum)}
			>
				{#if $isSetLogged(setNum) && activeSet !== setNum}
					<CheckIcon size={20} color="var(--success)" />
				{/if}
				<span class="set-number">Set {setNum}</span>
				{#if $isSetLogged(setNum)}
					{@const data = $getSetData(setNum)}
					{#if data}
						<span class="set-details">{data.reps} × {data.weight} lbs</span>
					{/if}
				{/if}
			</button>
		{/each}
	</div>

	<!-- Input form (only shown when a set is active) -->
	{#if activeSet}
		<div class="input-form">
			<h3>Log Set {activeSet}</h3>
			<div class="inputs">
				<div class="input-group">
					<label for="reps">Reps</label>
					<input
						id="reps"
						type="number"
						inputmode="numeric"
						placeholder="0"
						bind:value={reps}
						min="0"
					/>
				</div>
				<div class="input-group">
					<label for="weight">Weight (lbs)</label>
					<input
						id="weight"
						type="number"
						inputmode="decimal"
						placeholder="0"
						bind:value={weight}
						min="0"
						step="0.5"
					/>
				</div>
			</div>
			<div class="form-actions">
				<Button variant="ghost" fullWidth on:click={handleCancel}>Cancel</Button>
				<Button variant="primary" fullWidth disabled={!canSave} on:click={handleSaveSet}>
					Save Set
				</Button>
			</div>
		</div>
	{/if}

	<!-- Finish button (only shown when at least one set is logged) -->
	{#if hasAnySets && !activeSet}
		<div class="finish-section">
			<Button variant="primary" size="lg" fullWidth on:click={onFinishExercise}>
				Finish Exercise
			</Button>
		</div>
	{/if}
</div>

<style>
	.set-logger {
		display: flex;
		flex-direction: column;
		gap: var(--space-xl);
	}

	.exercise-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.exercise-info {
		display: flex;
		flex-direction: column;
		gap: var(--space-xs);
	}

	.category {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-tertiary);
		text-transform: uppercase;
		letter-spacing: 0.1em;
	}

	.exercise-name {
		font-size: 1.75rem;
		font-weight: 800;
		margin: 0;
		color: var(--text-primary);
	}

	.set-buttons {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.set-btn {
		display: flex;
		align-items: center;
		gap: var(--space-md);
		padding: var(--space-lg);
		background: var(--bg-secondary);
		border: 2px solid var(--border-primary);
		border-radius: var(--radius-lg);
		color: var(--text-primary);
		font-size: 1rem;
		font-weight: 600;
		min-height: 72px;
		text-align: left;
		transition: all 0.15s ease;
	}

	.set-btn:hover {
		background: var(--bg-tertiary);
		border-color: var(--border-secondary);
	}

	.set-btn:active {
		transform: scale(0.98);
	}

	.set-btn.active {
		border-color: var(--accent-primary);
		background: var(--bg-tertiary);
	}

	.set-btn.logged {
		border-color: var(--success);
		background: var(--bg-tertiary);
	}

	.set-number {
		font-size: 1.125rem;
	}

	.set-details {
		margin-left: auto;
		font-size: 1rem;
		color: var(--text-secondary);
		font-weight: 500;
	}

	.input-form {
		background: var(--bg-secondary);
		border: 2px solid var(--accent-primary);
		border-radius: var(--radius-xl);
		padding: var(--space-lg);
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
		animation: slideDown 0.2s ease;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.input-form h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
	}

	.inputs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}

	.input-group {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.input-group label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.input-group input {
		width: 100%;
		padding: var(--space-md);
		background: var(--bg-primary);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 1.25rem;
		font-weight: 700;
		text-align: center;
	}

	.input-group input:focus {
		border-color: var(--accent-primary);
		outline: none;
	}

	.form-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}

	.finish-section {
		padding-top: var(--space-md);
		border-top: 1px solid var(--border-primary);
	}
</style>