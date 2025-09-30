import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['icons/*.png'],
			manifest: {
				name: 'Iron Note',
				short_name: 'Iron Note',
				description: 'Lightweight gym tracker for iOS',
				theme_color: '#0a0a0a',
				background_color: '#0a0a0a',
				display: 'standalone',
				orientation: 'portrait',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: 'icons/icon-192.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'any maskable'
					},
					{
						src: 'icons/icon-512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				]
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365
							}
						}
					}
				]
			}
		})
	]
});