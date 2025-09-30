import { db } from './schema';
import type { Exercise, ExerciseCategory } from '$lib/types';

// Pre-populated exercise library
export const DEFAULT_EXERCISES: Omit<Exercise, 'id'>[] = [
	// CHEST
	{ name: 'Barbell Bench Press', category: 'CHEST', isCustom: false },
	{ name: 'Dumbbell Bench Press', category: 'CHEST', isCustom: false },
	{ name: 'Incline Barbell Press', category: 'CHEST', isCustom: false },
	{ name: 'Incline Dumbbell Press', category: 'CHEST', isCustom: false },
	{ name: 'Decline Barbell Press', category: 'CHEST', isCustom: false },
	{ name: 'Chest Fly (Machine)', category: 'CHEST', isCustom: false },
	{ name: 'Cable Crossover', category: 'CHEST', isCustom: false },
	{ name: 'Push-ups', category: 'CHEST', isCustom: false },
	{ name: 'Dips (Chest)', category: 'CHEST', isCustom: false },

	// BACK
	{ name: 'Deadlift', category: 'BACK', isCustom: false },
	{ name: 'Barbell Row', category: 'BACK', isCustom: false },
	{ name: 'Dumbbell Row', category: 'BACK', isCustom: false },
	{ name: 'Lat Pulldown', category: 'BACK', isCustom: false },
	{ name: 'Pull-ups', category: 'BACK', isCustom: false },
	{ name: 'Chin-ups', category: 'BACK', isCustom: false },
	{ name: 'Cable Row', category: 'BACK', isCustom: false },
	{ name: 'T-Bar Row', category: 'BACK', isCustom: false },
	{ name: 'Face Pulls', category: 'BACK', isCustom: false },

	// SHOULDERS
	{ name: 'Overhead Press', category: 'SHOULDERS', isCustom: false },
	{ name: 'Dumbbell Shoulder Press', category: 'SHOULDERS', isCustom: false },
	{ name: 'Lateral Raises', category: 'SHOULDERS', isCustom: false },
	{ name: 'Front Raises', category: 'SHOULDERS', isCustom: false },
	{ name: 'Rear Delt Fly', category: 'SHOULDERS', isCustom: false },
	{ name: 'Arnold Press', category: 'SHOULDERS', isCustom: false },
	{ name: 'Shrugs', category: 'SHOULDERS', isCustom: false },
	{ name: 'Upright Row', category: 'SHOULDERS', isCustom: false },

	// LEGS
	{ name: 'Barbell Squat', category: 'LEGS', isCustom: false },
	{ name: 'Front Squat', category: 'LEGS', isCustom: false },
	{ name: 'Leg Press', category: 'LEGS', isCustom: false },
	{ name: 'Romanian Deadlift', category: 'LEGS', isCustom: false },
	{ name: 'Leg Curl', category: 'LEGS', isCustom: false },
	{ name: 'Leg Extension', category: 'LEGS', isCustom: false },
	{ name: 'Lunges', category: 'LEGS', isCustom: false },
	{ name: 'Bulgarian Split Squat', category: 'LEGS', isCustom: false },
	{ name: 'Calf Raises', category: 'LEGS', isCustom: false },
	{ name: 'Hip Thrust', category: 'LEGS', isCustom: false },

	// CORE
	{ name: 'Plank', category: 'CORE', isCustom: false },
	{ name: 'Crunches', category: 'CORE', isCustom: false },
	{ name: 'Hanging Leg Raises', category: 'CORE', isCustom: false },
	{ name: 'Russian Twists', category: 'CORE', isCustom: false },
	{ name: 'Cable Crunches', category: 'CORE', isCustom: false },
	{ name: 'Ab Wheel Rollout', category: 'CORE', isCustom: false },
	{ name: 'Mountain Climbers', category: 'CORE', isCustom: false },
	{ name: 'Bicycle Crunches', category: 'CORE', isCustom: false }
];

// Initialize database with default exercises
export async function initializeExercises(): Promise<void> {
	const count = await db.exercises.count();
	if (count === 0) {
		const exercises: Exercise[] = DEFAULT_EXERCISES.map((ex, index) => ({
			...ex,
			id: `default-${index}`
		}));
		await db.exercises.bulkAdd(exercises);
	}
}

// Get all exercises
export async function getAllExercises(): Promise<Exercise[]> {
	return await db.exercises.toArray();
}

// Get exercises by category
export async function getExercisesByCategory(category: ExerciseCategory): Promise<Exercise[]> {
	return await db.exercises.where('category').equals(category).toArray();
}

// Add custom exercise
export async function addCustomExercise(
	name: string,
	category: ExerciseCategory
): Promise<Exercise> {
	const exercise: Exercise = {
		id: `custom-${Date.now()}`,
		name,
		category,
		isCustom: true
	};
	await db.exercises.add(exercise);
	return exercise;
}

// Delete custom exercise
export async function deleteCustomExercise(id: string): Promise<void> {
	const exercise = await db.exercises.get(id);
	if (exercise?.isCustom) {
		await db.exercises.delete(id);
	}
}