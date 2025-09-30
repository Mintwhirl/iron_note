export type ExerciseCategory = 'CHEST' | 'BACK' | 'SHOULDERS' | 'LEGS' | 'CORE';

export interface Exercise {
	id: string;
	name: string;
	category: ExerciseCategory;
	isCustom: boolean;
}

export interface WorkoutSet {
	setNumber: 1 | 2 | 3 | 4 | 5;
	reps: number;
	weight: number;
}

export interface ExerciseSession {
	id: string;
	exerciseId: string;
	exerciseName: string;
	category: ExerciseCategory;
	sets: WorkoutSet[];
	notes?: string;
	timestamp: number;
}

export interface Workout {
	id: string;
	date: string; // MM/DD/YY format
	timestamp: number;
	exercises: ExerciseSession[];
	isActive: boolean; // Whether workout is currently in progress
	completedAt?: number; // Timestamp when workout was ended
}

export interface ExerciseHistoryEntry {
	date: string;
	sets: WorkoutSet[];
	notes?: string;
}