<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
	export let direction: 'up' | 'down' | 'left' | 'right' = 'right';

	const rotations = {
		up: '270',
		down: '90',
		left: '180',
		right: '0'
	};
</script>

<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	style="transform: rotate({rotations[direction]}deg); transition: transform 0.2s ease;"
>
	<path d="M9 6L15 12L9 18" stroke={color} stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>