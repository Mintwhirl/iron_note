<script lang="ts">
	export let clickable: boolean = false;
	export let padding: 'sm' | 'md' | 'lg' = 'md';

	$: paddingClass = `padding-${padding}`;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div class="card {paddingClass}" class:clickable on:click on:keydown role={clickable ? 'button' : undefined} tabindex={clickable ? 0 : -1}>
	<slot />
</div>

<style>
	.card {
		background: var(--bg-secondary);
		border: 1px solid var(--border-primary);
		border-radius: var(--radius-lg);
		transition: all 0.15s ease;
	}

	.clickable {
		cursor: pointer;
		user-select: none;
	}

	.clickable:hover {
		background: var(--bg-tertiary);
		border-color: var(--border-secondary);
	}

	.clickable:active {
		transform: scale(0.98);
	}

	.padding-sm {
		padding: var(--space-sm);
	}

	.padding-md {
		padding: var(--space-md);
	}

	.padding-lg {
		padding: var(--space-lg);
	}
</style>