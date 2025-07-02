import { DAY_TIME_PERIODS, TimeOfDay } from '@/lib/constants/dayTime';

// Format date to human-readable format (e.g., "Jan 15, 2024")
export const formatDate = (date: Date) => {
	return new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date);
};

// Format time to 12-hour format with AM/PM (e.g., "02:30 PM")
export const formatTime = (date: Date) => {
	return new Intl.DateTimeFormat('en-US', {
		hour: '2-digit',
		minute: '2-digit',
	}).format(date);
};

// Determine current time period based on hour (morning, day, evening, night)
export const getCurrentTimeOfDay = (date: Date = new Date()): TimeOfDay => {
	const hour = date.getHours();

	// Morning: 6-12
	if (hour >= 6 && hour < 12) {
		return TimeOfDay.MORNING;
	}
	// Day: 12-16
	if (hour >= 12 && hour < 16) {
		return TimeOfDay.DAY;
	}
	// Evening: 16-23
	if (hour >= 16 && hour < 23) {
		return TimeOfDay.EVENING;
	}
	// Night: 23-6
	return TimeOfDay.NIGHT;
};

// Get CSS class name for current time period for theme styling
export const getTimeOfDayClassName = (timeOfDay?: TimeOfDay): string => {
	const currentTime = timeOfDay || getCurrentTimeOfDay();
	return DAY_TIME_PERIODS[currentTime].className;
};
