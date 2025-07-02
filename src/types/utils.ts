export interface DateFormatOptions {
	locale?: string;
	timeZone?: string;
}

export interface EmotionStatistics {
	totalEntries: number;
	todayEntries: number;
	weekEntries: number;
	monthEntries: number;
	emotionStats: Record<string, number>;
}
