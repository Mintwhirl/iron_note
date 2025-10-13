<script lang="ts">
	import Modal from './Modal.svelte';
	import Button from './Button.svelte';

	export let isOpen: boolean;
	export let defaultFilename: string;
	export let onExport: (filename: string) => void;
	export let onCancel: () => void;

	let filename = defaultFilename;

	$: if (isOpen) {
		filename = defaultFilename;
	}

	function handleExport() {
		const cleanFilename = filename.trim().replace(/\.csv$/i, '');
		onExport(cleanFilename);
	}
</script>

<Modal {isOpen} title="Export Workout" onClose={onCancel}>
	<div class="export-modal">
		<p class="description">Enter a filename for your CSV export:</p>

		<div class="input-group">
			<input
				type="text"
				class="filename-input"
				bind:value={filename}
				placeholder="Enter filename"
				on:keydown={(e) => e.key === 'Enter' && handleExport()}
			/>
			<span class="extension">.csv</span>
		</div>

		<div class="actions">
			<Button variant="ghost" fullWidth on:click={onCancel}>
				Cancel
			</Button>
			<Button variant="primary" fullWidth on:click={handleExport} disabled={!filename.trim()}>
				Export
			</Button>
		</div>
	</div>
</Modal>

<style>
	.export-modal {
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	.description {
		margin: 0;
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.input-group {
		display: flex;
		align-items: center;
		gap: var(--space-sm);
		background: var(--bg-primary);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-md);
		padding: var(--space-xs);
	}

	.filename-input {
		flex: 1;
		padding: var(--space-md);
		background: transparent;
		border: none;
		color: var(--text-primary);
		font-size: 1rem;
	}

	.filename-input:focus {
		outline: none;
	}

	.filename-input::placeholder {
		color: var(--text-tertiary);
	}

	.extension {
		font-size: 0.875rem;
		color: var(--text-tertiary);
		padding-right: var(--space-sm);
	}

	.actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
		padding-top: var(--space-md);
		border-top: 1px solid var(--border-primary);
	}
</style>
