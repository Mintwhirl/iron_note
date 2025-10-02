<script lang="ts">
	import { browser } from '$app/environment';
	import Button from './Button.svelte';

	export let isOpen: boolean = false;
	export let onConfirm: () => void;
	export let onCancel: () => void;

	let confirmText = '';
	let deleteClicks = 0;

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			resetAndClose();
		}
	}

	function resetAndClose() {
		confirmText = '';
		deleteClicks = 0;
		onCancel();
	}

	function handleDeleteClick() {
		if (confirmText.toLowerCase() === 'delete everything') {
			deleteClicks++;
			if (deleteClicks >= 5) {
				onConfirm();
				confirmText = '';
				deleteClicks = 0;
			}
		}
	}

	$: isTextValid = confirmText.toLowerCase() === 'delete everything';
	$: remainingClicks = Math.max(0, 5 - deleteClicks);

	$: if (browser) {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

{#if isOpen}
	<div class="modal-backdrop" on:click={handleBackdropClick} role="presentation">
		<div class="confirmation-dialog">
			<h3>Delete All Workouts?</h3>
			<p class="warning">This action cannot be undone. All your workout history will be permanently deleted.</p>

			<div class="input-section">
				<label for="confirm-text">Type "delete everything" to confirm:</label>
				<input
					id="confirm-text"
					type="text"
					bind:value={confirmText}
					placeholder="delete everything"
					autocomplete="off"
					autocapitalize="off"
					spellcheck="false"
				/>
			</div>

			{#if isTextValid && deleteClicks > 0 && deleteClicks < 5}
				<p class="tap-reminder">Tap {remainingClicks} more time{remainingClicks !== 1 ? 's' : ''} to confirm</p>
			{/if}

			<div class="button-group">
				<Button variant="secondary" fullWidth on:click={resetAndClose}>Cancel</Button>
				<Button
					variant="danger"
					fullWidth
					disabled={!isTextValid}
					on:click={handleDeleteClick}
				>
					{#if deleteClicks === 0}
						Delete All
					{:else}
						Tap {remainingClicks} More
					{/if}
				</Button>
			</div>
		</div>
	</div>
{/if}

<style>
	.modal-backdrop {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1100;
		padding: var(--space-md);
		animation: fadeIn 0.2s ease;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.confirmation-dialog {
		background: var(--bg-secondary);
		border-radius: var(--radius-xl);
		width: 100%;
		max-width: 360px;
		padding: var(--space-xl);
		box-shadow: var(--shadow-lg);
		animation: scaleIn 0.2s ease;
		display: flex;
		flex-direction: column;
		gap: var(--space-lg);
	}

	@keyframes scaleIn {
		from {
			transform: scale(0.9);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	.confirmation-dialog h3 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
		color: var(--text-primary);
		text-align: center;
	}

	.warning {
		font-size: 0.9375rem;
		margin: 0;
		color: #dc2626;
		text-align: center;
		line-height: 1.5;
		font-weight: 500;
	}

	.input-section {
		display: flex;
		flex-direction: column;
		gap: var(--space-sm);
	}

	.input-section label {
		font-size: 0.875rem;
		font-weight: 600;
		color: var(--text-secondary);
	}

	.input-section input {
		width: 100%;
		padding: var(--space-md);
		font-size: 1rem;
		background: var(--bg-primary);
		color: var(--text-primary);
		border: 2px solid var(--border-primary);
		border-radius: var(--radius-md);
		outline: none;
		transition: border-color 0.15s ease;
	}

	.input-section input:focus {
		border-color: var(--accent-primary);
	}

	.input-section input::placeholder {
		color: var(--text-tertiary);
	}

	.tap-reminder {
		font-size: 0.9375rem;
		margin: 0;
		color: var(--accent-primary);
		text-align: center;
		font-weight: 600;
		animation: pulse 1s infinite;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.6;
		}
	}

	.button-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}
</style>
