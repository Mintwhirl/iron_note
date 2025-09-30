<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import CloseIcon from '../icons/CloseIcon.svelte';

	export let isOpen: boolean = false;
	export let title: string = '';
	export let onClose: () => void;

	function handleBackdropClick(event: MouseEvent) {
		if (event.target === event.currentTarget) {
			onClose();
		}
	}

	function handleEscape(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
		}
	}

	onMount(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});

	$: if (browser) {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
</script>

{#if isOpen}
	<div class="modal-backdrop" on:click={handleBackdropClick} on:keydown={handleEscape} role="presentation">
		<div class="modal-content">
			<div class="modal-header">
				<h2>{title}</h2>
				<button class="close-btn" on:click={onClose} aria-label="Close modal">
					<CloseIcon size={24} />
				</button>
			</div>
			<div class="modal-body">
				<slot />
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
		align-items: flex-end;
		justify-content: center;
		z-index: 1000;
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

	.modal-content {
		background: var(--bg-secondary);
		border-radius: var(--radius-xl);
		width: 100%;
		max-width: 500px;
		max-height: 80vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: var(--shadow-lg);
		animation: slideUp 0.25s ease;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
		}
		to {
			transform: translateY(0);
		}
	}

	.modal-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: var(--space-lg);
		border-bottom: 1px solid var(--border-primary);
	}

	.modal-header h2 {
		font-size: 1.25rem;
		font-weight: 700;
		margin: 0;
	}

	.close-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		border-radius: var(--radius-md);
		color: var(--text-secondary);
		transition: all 0.15s ease;
	}

	.close-btn:hover {
		background: var(--bg-tertiary);
		color: var(--text-primary);
	}

	.close-btn:active {
		transform: scale(0.95);
	}

	.modal-body {
		padding: var(--space-lg);
		overflow-y: auto;
	}
</style>