export enum TimeOfDay {
	MORNING = 'morning',
	DAY = 'day',
	EVENING = 'evening',
	NIGHT = 'night',
}

export const DAY_TIME_PERIODS = {
	[TimeOfDay.MORNING]: { start: 6, end: 12, className: 'time-morning' },
	[TimeOfDay.DAY]: { start: 12, end: 16, className: 'time-day' },
	[TimeOfDay.EVENING]: { start: 16, end: 23, className: 'time-evening' },
	[TimeOfDay.NIGHT]: { start: 23, end: 6, className: 'time-night' },
};

export const DAY_TIME = Object.values(TimeOfDay);
