'use client';

import { useEffect, useState } from 'react';

import { TimeOfDay } from '@/lib/constants/dayTime';
import {
	getCurrentTimeOfDay,
	getTimeOfDayClassName,
} from '@/utils/timeDateFormat';

// Custom hook for managing time-based theme changes
export const useTheme = () => {
	// Initialize with current time of day
	const [currentTimeOfDay, setCurrentTimeOfDay] = useState<TimeOfDay>(() => {
		return getCurrentTimeOfDay();
	});

	useEffect(() => {
		// Function to update theme based on current time
		const updateTimeOfDay = () => {
			const newTimeOfDay = getCurrentTimeOfDay();
			setCurrentTimeOfDay(newTimeOfDay);

			// Apply corresponding CSS class to body element
			const className = getTimeOfDayClassName(newTimeOfDay);
			// Remove existing time-based classes and add new one
			document.body.className = document.body.className
				.split(' ')
				.filter((cls) => !cls.startsWith('time-')) // Remove old time classes
				.concat(className) // Add new time class
				.join(' ');
		};

		// Check for time changes every minute
		const interval = setInterval(updateTimeOfDay, 60000);

		// Cleanup interval on component unmount
		return () => {
			clearInterval(interval);
		};
	}, []);

	return {
		currentTimeOfDay, // Current time period
		className: getTimeOfDayClassName(currentTimeOfDay), // CSS class name
	};
};
