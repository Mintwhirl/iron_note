import { writable } from 'svelte/store';
import type { Exercise } from '$lib/types';

function createExercisesStore() {
	const { subscribe, set } = writable<Exercise[]>([]);

	return {
		subscribe,
		set,
		refresh: async () => {
			// Will be loaded from DB in +layout.svelte
		}
	};
}

export const exercisesStore = createExercisesStore();