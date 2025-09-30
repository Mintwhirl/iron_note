import type { Workout } from '$lib/types';

export function exportWorkoutToCSV(workout: Workout): void {
	// CSV Header
	const headers = ['Date', 'Exercise', 'Category', 'Set', 'Reps', 'Weight (lbs)', 'Notes'];

	// CSV Rows
	const rows: string[][] = [];

	workout.exercises.forEach((exerciseSession) => {
		exerciseSession.sets.forEach((set) => {
			rows.push([
				workout.date,
				exerciseSession.exerciseName,
				exerciseSession.category,
				set.setNumber.toString(),
				set.reps.toString(),
				set.weight.toString(),
				exerciseSession.notes || ''
			]);
		});
	});

	// Combine headers and rows
	const csvContent = [headers, ...rows].map((row) => row.map(escapeCsvValue).join(',')).join('\n');

	// Create blob and download
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);

	link.setAttribute('href', url);
	link.setAttribute('download', `iron-note-${workout.date.replace(/\//g, '-')}.csv`);
	link.style.visibility = 'hidden';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

export function exportAllWorkoutsToCSV(workouts: Workout[]): void {
	// CSV Header
	const headers = ['Date', 'Exercise', 'Category', 'Set', 'Reps', 'Weight (lbs)', 'Notes'];

	// CSV Rows
	const rows: string[][] = [];

	workouts.forEach((workout) => {
		workout.exercises.forEach((exerciseSession) => {
			exerciseSession.sets.forEach((set) => {
				rows.push([
					workout.date,
					exerciseSession.exerciseName,
					exerciseSession.category,
					set.setNumber.toString(),
					set.reps.toString(),
					set.weight.toString(),
					exerciseSession.notes || ''
				]);
			});
		});
	});

	// Combine headers and rows
	const csvContent = [headers, ...rows].map((row) => row.map(escapeCsvValue).join(',')).join('\n');

	// Create blob and download
	const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
	const link = document.createElement('a');
	const url = URL.createObjectURL(blob);

	link.setAttribute('href', url);
	link.setAttribute('download', `iron-note-all-workouts-${new Date().getTime()}.csv`);
	link.style.visibility = 'hidden';
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
}

function escapeCsvValue(value: string): string {
	if (value.includes(',') || value.includes('"') || value.includes('\n')) {
		return `"${value.replace(/"/g, '""')}"`;
	}
	return value;
}