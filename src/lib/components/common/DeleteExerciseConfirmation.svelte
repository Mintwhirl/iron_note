<script lang="ts">
	import { browser } from '$app/environment';
	import Button from './Button.svelte';

	export let isOpen: boolean = false;
	export let exerciseName: string = '';
	export let onConfirm: () => void;
	export let onCancel: () => void;

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onCancel();
		}
	}

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
			<h3>Delete Exercise?</h3>
			<p>Are you sure you want to delete <strong>{exerciseName}</strong>?</p>
			<div class="button-group">
				<Button variant="secondary" fullWidth on:click={onCancel}>No</Button>
				<Button variant="danger" fullWidth on:click={onConfirm}>Yes</Button>
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
		max-width: 320px;
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

	.confirmation-dialog p {
		font-size: 1rem;
		margin: 0;
		color: var(--text-secondary);
		text-align: center;
		line-height: 1.5;
	}

	.confirmation-dialog strong {
		color: var(--text-primary);
		font-weight: 600;
	}

	.button-group {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: var(--space-md);
	}
</style>
