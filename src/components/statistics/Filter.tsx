'use client';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo } from 'react';

import { useStores } from '@/hooks/useStore';

// Enum defining available time periods for filtering
export enum FilterPeriod {
	TODAY = 'today',
	WEEK = 'week',
	MONTH = 'month',
	ALL = 'all',
}

interface FilterProps {
	selectedPeriod: FilterPeriod;
	onPeriodChange: (period: FilterPeriod) => void;
}

// Filter component for selecting time periods in statistics
const Filter = observer(({ selectedPeriod, onPeriodChange }: FilterProps) => {
	// Get emotion store to access filtered entry counts
	const { emotionStore } = useStores();

	// Memoize filter options to avoid recalculation on every render
	const filterOptions = useMemo(
		() => [
			{
				value: FilterPeriod.TODAY,
				label: 'Today',
				count: emotionStore.todayEntries.length,
			},
			{
				value: FilterPeriod.WEEK,
				label: 'Week',
				count: emotionStore.weekEntries.length,
			},
			{
				value: FilterPeriod.MONTH,
				label: 'Month',
				count: emotionStore.monthEntries.length,
			},
			{
				value: FilterPeriod.ALL,
				label: 'All',
				count: emotionStore.emotionEntries.length,
			},
		],
		[
			emotionStore.todayEntries.length,
			emotionStore.weekEntries.length,
			emotionStore.monthEntries.length,
			emotionStore.emotionEntries.length,
		],
	);

	// Memoize button click handler to prevent unnecessary re-renders
	const handleButtonClick = useCallback(
		(value: FilterPeriod) => {
			onPeriodChange(value);
		},
		[onPeriodChange],
	);

	return (
		<div className="flex flex-wrap gap-2 w-full md:w-auto">
			{/* Render filter buttons */}
			{filterOptions.map((option) => (
				<button
					key={option.value}
					onClick={() => handleButtonClick(option.value)}
					// Dynamic styling based on selection state
					className={`px-4 py-2 rounded-lg border-2 transition-all duration-200 w-full md:w-auto ${
						selectedPeriod === option.value
							? 'border-amber-500 bg-amber-50 text-amber-700' // Active state
							: 'border-gray-200 bg-white text-gray-700 hover:border-amber-300 hover:bg-amber-50' // Inactive state with hover
					}`}
				>
					{/* Filter label */}
					<span className="font-medium">{option.label}</span>
					{/* Entry count for this period */}
					<span className="opacity-75 ml-2 text-sm">({option.count})</span>
				</button>
			))}
		</div>
	);
});

Filter.displayName = 'Filter';

export default Filter;
