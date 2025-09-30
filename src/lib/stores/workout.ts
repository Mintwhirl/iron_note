import { writable, derived } from 'svelte/store';
import type { ExerciseSession, WorkoutSet, Exercise } from '$lib/types';

interface WorkoutState {
	currentExercise: Exercise | null;
	currentSets: WorkoutSet[];
	isLogging: boolean;
}

function createWorkoutStore() {
	const { subscribe, set, update } = writable<WorkoutState>({
		currentExercise: null,
		currentSets: [],
		isLogging: false
	});

	return {
		subscribe,
		startExercise: (exercise: Exercise | null) => {
			update((state) => ({
				...state,
				currentExercise: exercise,
				currentSets: [],
				isLogging: true
			}));
		},
		addSet: (setNumber: 1 | 2 | 3 | 4 | 5, reps: number, weight: number) => {
			update((state) => {
				// Remove existing set with same number if it exists
				const filteredSets = state.currentSets.filter((s) => s.setNumber !== setNumber);
				return {
					...state,
					currentSets: [...filteredSets, { setNumber, reps, weight }].sort(
						(a, b) => a.setNumber - b.setNumber
					)
				};
			});
		},
		removeSet: (setNumber: 1 | 2 | 3 | 4 | 5) => {
			update((state) => ({
				...state,
				currentSets: state.currentSets.filter((s) => s.setNumber !== setNumber)
			}));
		},
		finishExercise: () => {
			update((state) => ({
				...state,
				isLogging: false
			}));
		},
		reset: () => {
			set({
				currentExercise: null,
				currentSets: [],
				isLogging: false
			});
		}
	};
}

export const workoutStore = createWorkoutStore();

// Derived store to check if a set number is logged
export const isSetLogged = derived(workoutStore, ($workout) => (setNumber: number) =>
	$workout.currentSets.some((s) => s.setNumber === setNumber)
);

// Derived store to get logged set data
export const getSetData = derived(
	workoutStore,
	($workout) => (setNumber: number) => $workout.currentSets.find((s) => s.setNumber === setNumber)
);