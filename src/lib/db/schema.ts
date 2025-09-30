import Dexie, { type EntityTable } from 'dexie';
import type { Exercise, Workout, ExerciseSession } from '$lib/types';

// Database schema
export class IronNoteDB extends Dexie {
	exercises!: EntityTable<Exercise, 'id'>;
	workouts!: EntityTable<Workout, 'id'>;

	constructor() {
		super('IronNoteDB');

		this.version(1).stores({
			exercises: 'id, name, category, isCustom',
			workouts: 'id, date, timestamp'
		});
	}
}

export const db = new IronNoteDB();