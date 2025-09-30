<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M6 6L18 18M6 18L18 6"
		stroke={color}
		stroke-width="2.5"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>