import { useStores } from '@/hooks/useStore';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { FilterPeriod } from './Filter';

interface SummaryProps {
	selectedPeriod: FilterPeriod;
}

// Summary component displays key emotion statistics in cards
const Summary = observer(({ selectedPeriod }: SummaryProps) => {
	// Get emotion store from MobX context
	const { emotionStore } = useStores();

	// Memoize expensive calculations to avoid recalculating on every render
	const statisticsData = useMemo(() => {
		const totalEntries = emotionStore.emotionEntries.length;
		const periodEntries = emotionStore.getEntriesByPeriod(selectedPeriod);
		const emotionStats = emotionStore.emotionStats;

		// Calculate percentage for a specific emotion count
		const getEmotionPercentage = (count: number) => {
			if (totalEntries === 0) return 0;
			return ((count / totalEntries) * 100).toFixed(1);
		};

		// Get emotion data sorted by frequency (most frequent first)
		const emotionData = emotionStore.emotions
			.map((emotion) => {
				const count = emotionStats[emotion.id] || 0;
				return {
					emotion,
					count,
					percentage: getEmotionPercentage(count),
				};
			})
			.sort((a, b) => b.count - a.count); // Sort by count descending

		return {
			totalEntries,
			periodEntries,
			mostFrequentEmotion: emotionData[0],
		};
	}, [
		emotionStore.emotionEntries.length,
		selectedPeriod,
		emotionStore.emotionStats,
		emotionStore.emotions,
	]);

	// Memoize period labels to avoid recalculation
	const periodLabels = useMemo(() => {
		// Convert period enum to human-readable label
		const getPeriodLabel = (period: FilterPeriod) => {
			switch (period) {
				case FilterPeriod.TODAY:
					return "Today's";
				case FilterPeriod.WEEK:
					return "This Week's";
				case FilterPeriod.MONTH:
					return "This Month's";
				case FilterPeriod.ALL:
					return 'All Time';
				default:
					return 'Selected Period';
			}
		};

		// Get period description for aria-label
		const getPeriodDescription = (period: FilterPeriod) => {
			switch (period) {
				case FilterPeriod.TODAY:
					return 'today';
				case FilterPeriod.WEEK:
					return 'this week';
				case FilterPeriod.MONTH:
					return 'this month';
				case FilterPeriod.ALL:
					return 'all time';
				default:
					return 'selected period';
			}
		};

		return {
			label: getPeriodLabel(selectedPeriod),
			description: getPeriodDescription(selectedPeriod),
		};
	}, [selectedPeriod]);

	const { totalEntries, periodEntries, mostFrequentEmotion } = statisticsData;

	return (
		<section
			className="gap-4 grid grid-cols-1 md:grid-cols-3 mb-[10px]"
			aria-labelledby="summary-heading"
			role="region"
		>
			{/* Hidden heading for screen readers */}
			<h2 id="summary-heading" className="sr-only">
				Emotion Statistics Summary
			</h2>

			{/* Total emotions card */}
			<article
				className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg"
				aria-labelledby="total-emotions-heading"
			>
				<h3
					id="total-emotions-heading"
					className="mb-2 font-medium text-gray-900 text-lg"
				>
					Total Emotions
				</h3>
				<p
					className="font-bold text-amber-600 text-3xl"
					aria-label={`${totalEntries} total emotion entries`}
				>
					{totalEntries}
				</p>
				<p
					className="mt-1 text-gray-500 text-sm"
					aria-describedby="total-emotions-heading"
				>
					All time entries
				</p>
			</article>

			{/* Selected period emotions card */}
			<article
				className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg"
				aria-labelledby="period-emotions-heading"
			>
				<h3
					id="period-emotions-heading"
					className="mb-2 font-medium text-gray-900 text-lg"
				>
					{periodLabels.label} Emotions
				</h3>
				<p
					className="font-bold text-blue-600 text-3xl"
					aria-label={`${periodEntries.length} emotion entries for ${periodLabels.description}`}
				>
					{periodEntries.length}
				</p>
				<p
					className="mt-1 text-gray-500 text-sm"
					aria-describedby="period-emotions-heading"
				>
					Entries {periodLabels.description}
				</p>
			</article>

			{/* Most frequent emotion card */}
			<article
				className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg"
				aria-labelledby="frequent-emotions-heading"
			>
				<h3
					id="frequent-emotions-heading"
					className="mb-2 font-medium text-gray-900 text-lg"
				>
					Most Frequent
				</h3>
				{/* Show most frequent emotion if data exists */}
				{mostFrequentEmotion && mostFrequentEmotion.count > 0 ? (
					<div
						className="flex items-center gap-2"
						aria-label={`Most frequent emotion: ${mostFrequentEmotion.emotion.name}, recorded ${mostFrequentEmotion.count} times`}
					>
						<span
							className="text-2xl"
							role="img"
							aria-label={mostFrequentEmotion.emotion.name}
						>
							{mostFrequentEmotion.emotion.icon}
						</span>
						<div>
							<p className="font-bold text-gray-900">
								{mostFrequentEmotion.emotion.name}
							</p>
							<p
								className="text-gray-500 text-sm"
								aria-describedby="frequent-emotions-heading"
							>
								{mostFrequentEmotion.count} times
							</p>
						</div>
					</div>
				) : (
					// Show placeholder when no data available
					<p
						className="text-gray-500"
						aria-describedby="frequent-emotions-heading"
					>
						No data yet
					</p>
				)}
			</article>
		</section>
	);
});

Summary.displayName = 'Summary';

export default Summary;
