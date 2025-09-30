<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
</script>

<!-- Dumbbells for overhead press -->
<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Left dumbbell -->
	<g>
		<!-- Handle -->
		<rect x="5" y="9" width="1.5" height="6" rx="0.5" fill={color} />
		<!-- Top weight -->
		<rect x="3.5" y="7.5" width="4.5" height="2" rx="0.5" fill={color} />
		<!-- Bottom weight -->
		<rect x="3.5" y="14.5" width="4.5" height="2" rx="0.5" fill={color} />
	</g>

	<!-- Right dumbbell -->
	<g>
		<!-- Handle -->
		<rect x="17.5" y="9" width="1.5" height="6" rx="0.5" fill={color} />
		<!-- Top weight -->
		<rect x="16" y="7.5" width="4.5" height="2" rx="0.5" fill={color} />
		<!-- Bottom weight -->
		<rect x="16" y="14.5" width="4.5" height="2" rx="0.5" fill={color} />
	</g>

	<!-- Upward arrows showing press motion -->
	<path d="M6 6 L6 3 L4.5 4.5 M6 3 L7.5 4.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	<path d="M18 6 L18 3 L16.5 4.5 M18 3 L19.5 4.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>