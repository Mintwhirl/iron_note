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
		d="M12 4V16M12 16L8 12M12 16L16 12"
		stroke={color}
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
	<path d="M4 18H20" stroke={color} stroke-width="2" stroke-linecap="round" />
</svg>