<script lang="ts">
	export let size: number = 24;
	export let color: string = 'currentColor';
</script>

<!-- Squat rack with barbell -->
<svg
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<!-- Left rack stand -->
	<rect x="4" y="10" width="2.5" height="11" rx="0.5" fill={color} />
	<rect x="4" y="8" width="2.5" height="2" rx="0.5" fill={color} />

	<!-- Right rack stand -->
	<rect x="17.5" y="10" width="2.5" height="11" rx="0.5" fill={color} />
	<rect x="17.5" y="8" width="2.5" height="2" rx="0.5" fill={color} />

	<!-- Barbell on rack -->
	<line x1="6.5" y1="9" x2="17.5" y2="9" stroke={color} stroke-width="2.5" stroke-linecap="round" />

	<!-- Barbell plates -->
	<rect x="7" y="6.5" width="2" height="5" rx="0.5" fill={color} />
	<rect x="15" y="6.5" width="2" height="5" rx="0.5" fill={color} />

	<!-- Base plates -->
	<rect x="3" y="19" width="4" height="1.5" rx="0.5" fill={color} />
	<rect x="17" y="19" width="4" height="1.5" rx="0.5" fill={color} />

	<!-- Downward arrows showing squat motion -->
	<path d="M12 13 L12 16 L10.5 14.5 M12 16 L13.5 14.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>