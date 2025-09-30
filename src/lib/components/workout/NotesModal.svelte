<script lang="ts">
	import Modal from '../common/Modal.svelte';
	import Button from '../common/Button.svelte';

	export let isOpen: boolean;
	export let exerciseName: string;
	export let onSave: (notes: string) => void;
	export let onSkip: () => void;

	let notes = '';

	function handleSave() {
		onSave(notes);
		notes = '';
	}

	function handleSkip() {
		onSkip();
		notes = '';
	}

	function handleClose() {
		handleSkip();
	}
</script>

<Modal {isOpen} title="Exercise Complete" onClose={handleClose}>
	<div class="notes-content">
		<p class="exercise-name">{exerciseName}</p>
		<p class="prompt">Add any notes about this exercise? (optional)</p>

		<textarea
			class="notes-input"
			placeholder="e.g., felt strong, focus on form next time..."
			bind:value={notes}
			rows="4"
		></textarea>

		<div class="actions">
			<Button variant="ghost" size="lg" fullWidth on:click={handleSkip}>None</Button>
			<Button variant="primary" size="lg" fullWidth on:click={handleSave}>Save</Button>
		</div>
	</div>
</Modal>

<style>
	.notes-content {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.exercise-name {
		font-size: 1.25rem;
		font-weight: 700;
		color: var(--text-primary);
		margin: 0;
	}

	.prompt {
		font-size: 1rem;
		color: var(--text-secondary);
		margin: 0;
	}

	.notes-input {
		width: 100%;
		padding: var(--space-md);
		background: var(--bg-primary);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-md);
		color: var(--text-primary);
		font-size: 1rem;
		font-family: var(--font-sans);
		resize: vertical;
		min-height: 100px;
	}

	.notes-input::placeholder {
		color: var(--text-tertiary);
	}

	.notes-input:focus {
		border-color: var(--accent-primary);
		outline: none;
	}

	.actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
		margin-top: var(--space-md);
	}
</style>