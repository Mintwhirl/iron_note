<script lang="ts">
	export let variant: 'primary' | 'secondary' | 'ghost' | 'danger' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let fullWidth: boolean = false;
	export let disabled: boolean = false;
	export let type: 'button' | 'submit' = 'button';
</script>

<button
	class="btn btn-{variant} btn-{size}"
	class:fullWidth
	{disabled}
	{type}
	on:click
>
	<slot />
</button>

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-sm);
		font-weight: 600;
		border-radius: var(--radius-lg);
		transition: all 0.15s ease;
		cursor: pointer;
		user-select: none;
		-webkit-tap-highlight-color: transparent;
	}

	.btn:active {
		transform: scale(0.97);
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn:disabled:active {
		transform: none;
	}

	/* Variants */
	.btn-primary {
		background: var(--accent-primary);
		color: white;
	}

	.btn-primary:hover:not(:disabled) {
		background: var(--accent-hover);
	}

	.btn-primary:active:not(:disabled) {
		background: var(--accent-active);
	}

	.btn-secondary {
		background: var(--bg-elevated);
		color: var(--text-primary);
	}

	.btn-secondary:hover:not(:disabled) {
		background: var(--bg-tertiary);
	}

	.btn-ghost {
		background: transparent;
		color: var(--text-secondary);
	}

	.btn-ghost:hover:not(:disabled) {
		background: var(--bg-secondary);
		color: var(--text-primary);
	}

	.btn-danger {
		background: #dc2626;
		color: white;
	}

	.btn-danger:hover:not(:disabled) {
		background: #b91c1c;
	}

	.btn-danger:active:not(:disabled) {
		background: #991b1b;
	}

	/* Sizes */
	.btn-sm {
		padding: var(--space-sm) var(--space-md);
		font-size: 0.875rem;
		min-height: 40px;
	}

	.btn-md {
		padding: var(--space-md) var(--space-lg);
		font-size: 1rem;
		min-height: var(--touch-min);
	}

	.btn-lg {
		padding: var(--space-lg) var(--space-xl);
		font-size: 1.125rem;
		min-height: 56px;
	}

	.fullWidth {
		width: 100%;
	}
</style>