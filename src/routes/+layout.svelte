<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { initializeExercises, getAllExercises } from '$lib/db/exercise-db';
	import { exercisesStore } from '$lib/stores/exercises';
	import AddIcon from '$lib/components/icons/AddIcon.svelte';
	import HistoryIcon from '$lib/components/icons/HistoryIcon.svelte';
	import '../app.css';

	onMount(async () => {
		// Initialize database with default exercises
		await initializeExercises();
		// Load exercises into store
		const exercises = await getAllExercises();
		exercisesStore.set(exercises);
	});

	$: isHomePage = $page.url.pathname === '/';
	$: isHistoryPage = $page.url.pathname === '/history';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer class="app-footer">
		<p>Made by Kevin Stewart © 2025</p>
		<p class="privacy-note">All data stored locally on your device • Nothing collected or transmitted</p>
	</footer>

	<nav class="bottom-nav">
		<a href="/" class="nav-item" class:active={isHomePage} aria-label="Workout">
			<AddIcon size={28} />
			<span>Workout</span>
		</a>
		<a href="/history" class="nav-item" class:active={isHistoryPage} aria-label="History">
			<HistoryIcon size={28} />
			<span>History</span>
		</a>
	</nav>
</div>

<style>
	.app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
	}

	.bottom-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 80px;
		background: var(--bg-secondary);
		border-top: 1px solid var(--border-primary);
		display: grid;
		grid-template-columns: 1fr 1fr;
		padding-bottom: env(safe-area-inset-bottom);
		z-index: 100;
	}

	.nav-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: var(--space-xs);
		color: var(--text-secondary);
		text-decoration: none;
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		transition: all 0.15s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.nav-item:active {
		transform: scale(0.95);
	}

	.nav-item.active {
		color: var(--accent-primary);
	}

	.nav-item:not(.active):hover {
		color: var(--text-primary);
		background: var(--bg-tertiary);
	}

	.app-footer {
		padding: var(--space-lg) var(--space-md);
		padding-bottom: var(--space-sm);
		text-align: center;
		background: var(--bg-primary);
	}

	.app-footer p {
		margin: 0;
		font-size: 0.625rem;
		color: var(--text-tertiary);
		opacity: 0.7;
		line-height: 1.4;
	}

	.privacy-note {
		font-size: 0.5625rem;
		margin-top: var(--space-xs);
	}
</style>