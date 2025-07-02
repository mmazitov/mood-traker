import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

import { useStores } from '@/hooks/useStore';
import { getEmotionDataByPeriod } from '@/utils/emotionStatistic';

import { FilterPeriod } from './Filter';

interface BreakdownProps {
	period: FilterPeriod;
}

// Breakdown component displays detailed emotion statistics for selected period
const Breakdown = observer(({ period }: BreakdownProps) => {
	// Get emotion store from MobX context
	const { emotionStore } = useStores();

	// Memoize expensive calculations to avoid recalculating on every render
	const breakdownData = useMemo(() => {
		const periodEntries = emotionStore.getEntriesByPeriod(period);
		const emotionData = getEmotionDataByPeriod(emotionStore, period);

		return { periodEntries, emotionData };
	}, [emotionStore, period]);

	// Memoize period label to avoid recalculation
	const periodLabel = useMemo(() => {
		// Convert period enum to human-readable label
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
				return 'the selected period';
		}
	}, [period]);

	const { periodEntries, emotionData } = breakdownData;

	return (
		<section
			className="bg-white shadow-sm p-6 border border-gray-200 rounded-lg"
			aria-labelledby="breakdown-heading"
			role="region"
		>
			<h2
				id="breakdown-heading"
				className="mb-6 font-semibold text-gray-900 text-xl"
			>
				Emotion Breakdown
			</h2>

			{/* Show empty state if no data available */}
			{periodEntries.length === 0 ? (
				<div className="py-8 text-center" role="status" aria-live="polite">
					<p className="text-gray-500">
						No emotion data available for {periodLabel}. Start tracking your
						emotions to see statistics!
					</p>
				</div>
			) : (
				// Render emotion breakdown list
				<div
					className="space-y-4"
					role="list"
					aria-label={`Emotion breakdown for ${periodLabel}`}
				>
					{emotionData.map(({ emotion, count, percentage }) => (
						<article
							key={emotion.id}
							className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
							role="listitem"
							aria-labelledby={`emotion-${emotion.id}-name`}
							aria-describedby={`emotion-${emotion.id}-stats`}
						>
							{/* Left side: emotion icon and details */}
							<div className="flex items-center gap-3">
								<span className="text-2xl" role="img" aria-label={emotion.name}>
									{emotion.icon}
								</span>
								<div>
									<h3
										id={`emotion-${emotion.id}-name`}
										className="font-medium text-gray-900"
									>
										{emotion.name}
									</h3>
									<p
										id={`emotion-${emotion.id}-stats`}
										className="text-gray-500 text-sm"
									>
										{count} {count === 1 ? 'entry' : 'entries'}
									</p>
								</div>
							</div>
							{/* Right side: percentage and progress bar */}
							<div className="text-right">
								<p
									className="font-semibold text-gray-900 text-lg"
									aria-label={`${percentage} percent of total emotions`}
								>
									{percentage}%
								</p>
								{/* Progress bar visualization */}
								<div
									className="bg-gray-200 mt-1 rounded-full w-24 h-2"
									role="progressbar"
									aria-valuemin={0}
									aria-valuemax={100}
									aria-label={`${emotion.name}: ${percentage}% of emotions`}
								>
									<div
										className="bg-amber-500 rounded-full h-2 transition-all duration-300"
										style={{ width: `${percentage}%` }}
										aria-hidden="true"
									/>
								</div>
							</div>
						</article>
					))}
				</div>
			)}
		</section>
	);
});

Breakdown.displayName = 'Breakdown';

export default Breakdown;
