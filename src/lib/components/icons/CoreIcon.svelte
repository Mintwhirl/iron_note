<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
</script>

<!-- Ab wheel / core roller -->
<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Wheel -->
	<circle cx="12" cy="15" r="6" stroke={color} stroke-width="2.5" fill="none" />

	<!-- Inner wheel detail -->
	<circle cx="12" cy="15" r="3" fill={color} fill-opacity="0.3" />

	<!-- Axle/hub -->
	<circle cx="12" cy="15" r="1.5" fill={color} />

	<!-- Handle bar -->
	<rect x="10" y="4" width="4" height="1.5" rx="0.75" fill={color} />

	<!-- Left handle grip -->
	<rect x="7.5" y="4" width="2.5" height="1.5" rx="0.75" fill={color} />

	<!-- Right handle grip -->
	<rect x="14" y="4" width="2.5" height="1.5" rx="0.75" fill={color} />

	<!-- Connection rods -->
	<line x1="9" y1="5" x2="10" y2="14" stroke={color} stroke-width="1.5" />
	<line x1="15" y1="5" x2="14" y2="14" stroke={color} stroke-width="1.5" />

	<!-- Tread lines on wheel -->
	<path d="M12 9 L12 11" stroke={color} stroke-width="1" opacity="0.5" />
	<path d="M12 19 L12 21" stroke={color} stroke-width="1" opacity="0.5" />
	<path d="M8 15 L6 15" stroke={color} stroke-width="1" opacity="0.5" />
	<path d="M16 15 L18 15" stroke={color} stroke-width="1" opacity="0.5" />
</svg>