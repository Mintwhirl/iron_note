<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
</script>

<!-- Barbell with plates (bench press) -->
<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Barbell bar -->
	<line x1="3" y1="12" x2="21" y2="12" stroke={color} stroke-width="2.5" stroke-linecap="round" />

	<!-- Left plates -->
	<rect x="4" y="8" width="3" height="8" rx="0.5" fill={color} />
	<rect x="5" y="9" width="1.5" height="6" fill="white" fill-opacity="0.3" />

	<!-- Right plates -->
	<rect x="17" y="8" width="3" height="8" rx="0.5" fill={color} />
	<rect x="17.5" y="9" width="1.5" height="6" fill="white" fill-opacity="0.3" />

	<!-- Grip markers -->
	<circle cx="9" cy="12" r="1" fill={color} />
	<circle cx="15" cy="12" r="1" fill={color} />
</svg>