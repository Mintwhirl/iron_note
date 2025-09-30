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
	<circle cx="12" cy="12" r="8" stroke={color} stroke-width="2" />
	<path d="M12 8V12L15 15" stroke={color} stroke-width="2" stroke-linecap="round" />
</svg>