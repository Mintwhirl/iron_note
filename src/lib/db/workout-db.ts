import { db } from './schema';
import type { Workout, ExerciseSession } from '$lib/types';
import { format } from 'date-fns';

// Get today's date in MM/DD/YY format
export function getTodayDate(): string {
	return format(new Date(), 'MM/dd/yy');
}

// Get or create today's workout
export async function getTodayWorkout(): Promise<Workout> {
	const todayDate = getTodayDate();
	let workout = await db.workouts.where('date').equals(todayDate).first();

	if (!workout) {
		workout = {
			id: `workout-${Date.now()}`,
			date: todayDate,
			timestamp: Date.now(),
			exercises: [],
			isActive: false
		};
		await db.workouts.add(workout);
	}

	return workout;
}

// Start today's workout session
export async function startWorkoutSession(): Promise<Workout> {
	const workout = await getTodayWorkout();
	workout.isActive = true;
	await db.workouts.update(workout.id, { isActive: true });
	return workout;
}

// End today's workout session
export async function endWorkoutSession(): Promise<Workout> {
	const workout = await getTodayWorkout();
	workout.isActive = false;
	workout.completedAt = Date.now();
	await db.workouts.update(workout.id, { isActive: false, completedAt: Date.now() });
	return workout;
}

// Add exercise session to today's workout
export async function addExerciseToWorkout(exerciseSession: ExerciseSession): Promise<void> {
	const workout = await getTodayWorkout();
	workout.exercises.push(exerciseSession);
	await db.workouts.update(workout.id, { exercises: workout.exercises });
}

// Update exercise session in workout
export async function updateExerciseSession(
	workoutId: string,
	exerciseSessionId: string,
	updates: Partial<ExerciseSession>
): Promise<void> {
	const workout = await db.workouts.get(workoutId);
	if (!workout) return;

	const exerciseIndex = workout.exercises.findIndex((ex) => ex.id === exerciseSessionId);
	if (exerciseIndex === -1) return;

	workout.exercises[exerciseIndex] = {
		...workout.exercises[exerciseIndex],
		...updates
	};

	await db.workouts.update(workoutId, { exercises: workout.exercises });
}

// Get all workouts sorted by date (newest first)
export async function getAllWorkouts(): Promise<Workout[]> {
	return await db.workouts.orderBy('timestamp').reverse().toArray();
}

// Get workout by ID
export async function getWorkoutById(id: string): Promise<Workout | undefined> {
	return await db.workouts.get(id);
}

// Get workouts by date range
export async function getWorkoutsByDateRange(startDate: Date, endDate: Date): Promise<Workout[]> {
	const start = startDate.getTime();
	const end = endDate.getTime();
	return await db.workouts.where('timestamp').between(start, end, true, true).toArray();
}

// Delete workout
export async function deleteWorkout(id: string): Promise<void> {
	await db.workouts.delete(id);
}