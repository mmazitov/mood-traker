'use client';
import { observer } from 'mobx-react-lite';
import { useCallback, useState } from 'react';

import PageTitle from '@/components/layout/PageTitle';
import Breakdown from '@/components/statistics/Breakdown';
import Filter, { FilterPeriod } from '@/components/statistics/Filter';
import Summary from '@/components/statistics/Summary';
import Loader from '@/components/ui/Loader';
import { useStores } from '@/hooks/useStore';

// Statistics page component - displays emotion analytics and trends
const StatisticPage = observer(() => {
	// Get emotion store from MobX context
	const { emotionStore } = useStores();

	// Local state for selected time period filter
	const [selectedPeriod, setSelectedPeriod] = useState<FilterPeriod>(
		FilterPeriod.TODAY,
	);

	// Memoize handler for period filter changes to prevent unnecessary re-renders
	const handlePeriodChange = useCallback((period: FilterPeriod) => {
		setSelectedPeriod(period);
	}, []);

	// Show loading state while emotion data is being fetched
	if (emotionStore.isLoading) {
		return (
			<div className="my-4">
				<div className="py-12 text-center">
					<Loader
						size="lg"
						className="mb-4"
						aria-label="Loading emotion statistics"
					/>
					<p className="text-gray-500 text-lg">Loading statistics...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="my-4">
			{/* Page header with title and time period filter */}
			<header
				className="flex flex-wrap justify-between items-start gap-[10px] mb-[10px]"
				aria-label="Statistics header"
			>
				{/* Page title and subtitle */}
				<PageTitle
					title="Emotion Statistics"
					subtitle="Analyze your emotional patterns and trends"
				/>
				{/* Time period filter component */}
				<Filter
					selectedPeriod={selectedPeriod}
					onPeriodChange={handlePeriodChange}
				/>
			</header>

			{/* Main statistics content */}
			<section>
				{/* Summary statistics component with selected period */}
				<Summary selectedPeriod={selectedPeriod} />
				{/* Detailed breakdown component with selected period */}
				<Breakdown period={selectedPeriod} />
			</section>
		</div>
	);
});

export default StatisticPage;
