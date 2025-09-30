<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
</script>

<!-- Pull-up bar with hanging grips -->
<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Pull-up bar -->
	<line x1="4" y1="6" x2="20" y2="6" stroke={color} stroke-width="2.5" stroke-linecap="round" />

	<!-- Bar mounts -->
	<rect x="3" y="4" width="2" height="4" rx="0.5" fill={color} />
	<rect x="19" y="4" width="2" height="4" rx="0.5" fill={color} />

	<!-- Left grip handle -->
	<rect x="7" y="6" width="2.5" height="8" rx="1" stroke={color} stroke-width="2" fill="none" />

	<!-- Right grip handle -->
	<rect x="14.5" y="6" width="2.5" height="8" rx="1" stroke={color} stroke-width="2" fill="none" />

	<!-- Downward arrows showing pull motion -->
	<path d="M8.25 16 L8.25 19 L7 17.5 M8.25 19 L9.5 17.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M15.75 16 L15.75 19 L14.5 17.5 M15.75 19 L17 17.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>