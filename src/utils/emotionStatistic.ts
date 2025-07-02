import { EMOTIONS } from '@/lib/constants/emotion';
import { EmotionStore } from '@/lib/stores/EmotionStore';

// Calculate percentage of specific emotion from total entries
export const getEmotionPercentage = (count: number, totalEntries: number) => {
	if (totalEntries === 0) return 0;
	return ((count / totalEntries) * 100).toFixed(1);
};

// Get emotion data with counts and percentages for all emotions
export const getEmotionData = (emotionStore: EmotionStore) => {
	const emotionStats = emotionStore.emotionStats;
	const totalEntries = emotionStore.emotionEntries.length;

	// Map each emotion to its statistics and sort by frequency
	return emotionStore.emotions
		.map((emotion) => {
			const count = emotionStats[emotion.id] || 0;
			return {
				emotion,
				count,
				percentage: getEmotionPercentage(count, totalEntries),
			};
		})
		.sort((a, b) => b.count - a.count); // Sort by count descending
};

// Get the most frequently recorded emotion overall
export const getMostFrequentEmotion = (emotionStore: EmotionStore) => {
	const emotionData = getEmotionData(emotionStore);
	return emotionData[0]; // First item is most frequent due to sorting
};

// Get emotion data filtered by specific time period
export const getEmotionDataByPeriod = (
	emotionStore: EmotionStore,
	period: string,
) => {
	const emotionStats = emotionStore.getStatsByPeriod(period);
	const totalEntries = emotionStore.getEntriesByPeriod(period).length;

	// Map emotions to their period-specific statistics
	return EMOTIONS.map((emotion) => {
		const count = emotionStats[emotion.id] || 0;
		return {
			emotion,
			count,
			percentage: getEmotionPercentage(count, totalEntries),
		};
	}).sort((a, b) => b.count - a.count); // Sort by frequency
};

// Get most frequent emotion for a specific time period
export const getMostFrequentEmotionByPeriod = (
	emotionStore: EmotionStore,
	period: string,
) => {
	const emotionData = getEmotionDataByPeriod(emotionStore, period);
	return emotionData[0];
};
