import { makeAutoObservable } from 'mobx';

import { Emotion } from '@/types/emotion';
import { EMOTIONS } from '../constants/emotion';

// Interface for individual emotion entries
export interface EmotionEntry {
	id: string;
	emotionId: string;
	note: string;
	timestamp: Date;
}

// MobX store for managing emotion entries and related data
export class EmotionStore {
	emotionEntries: EmotionEntry[] = [];
	isLoading = true;
	storageKey = 'mood-tracker-emotions';

	constructor() {
		// Make all properties and methods observable/actions
		makeAutoObservable(this);
		this.loadFromStorage();
	}

	// Load emotion entries from localStorage with simulated delay
	loadFromStorage = async () => {
		this.isLoading = true;

		// Simulate async loading delay for better UX
		await new Promise((resolve) => setTimeout(resolve, 800));

		if (typeof window !== 'undefined') {
			try {
				const stored = localStorage.getItem(this.storageKey);
				if (stored) {
					const parsed = JSON.parse(stored);
					// Convert timestamp strings back to Date objects
					this.emotionEntries = parsed.map((entry: any) => ({
						...entry,
						timestamp: new Date(entry.timestamp),
					}));
				}
			} catch (error) {
				console.error('Error loading emotions from localStorage:', error);
			}
		}

		this.isLoading = false;
	};

	// Save current emotion entries to localStorage
	saveToStorage = () => {
		if (typeof window !== 'undefined') {
			try {
				localStorage.setItem(
					this.storageKey,
					JSON.stringify(this.emotionEntries),
				);
			} catch (error) {
				console.error('Error saving emotions to localStorage:', error);
			}
		}
	};

	// Add new emotion entry and save to storage
	addEmotionEntry = (emotionId: string, note: string) => {
		const newEntry: EmotionEntry = {
			id: Date.now().toString(), // Simple ID generation
			emotionId,
			note,
			timestamp: new Date(),
		};

		// Add to beginning of array for chronological order
		this.emotionEntries.unshift(newEntry);
		this.saveToStorage();
	};

	// Delete specific emotion entry by ID
	deleteEmotionEntry = (entryId: string) => {
		this.emotionEntries = this.emotionEntries.filter(
			(entry) => entry.id !== entryId,
		);
		this.saveToStorage();
	};

	// Delete all emotion entries
	deleteAllEntries = () => {
		this.emotionEntries = [];
		this.saveToStorage();
	};

	// Alternative method name for deleting all emotions
	removeAllEmotions = () => {
		this.emotionEntries = [];
		this.saveToStorage();
	};

	// Find emotion object by ID from the constants
	getEmotionById = (emotionId: string): Emotion | undefined => {
		return EMOTIONS.find((emotion) => emotion.id === emotionId);
	};

	// Computed getter for today's emotion entries
	get todayEntries() {
		const today = new Date().toDateString();
		return this.emotionEntries.filter(
			(entry) => entry.timestamp.toDateString() === today,
		);
	}

	// Computed getter for current week's emotion entries (Monday to Sunday)
	get weekEntries() {
		const now = new Date();
		const startOfWeek = new Date(now);
		const dayOfWeek = now.getDay();
		// Calculate days from Monday (0 = Sunday, 1 = Monday, etc.)
		const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
		startOfWeek.setDate(now.getDate() - daysFromMonday);
		startOfWeek.setHours(0, 0, 0, 0);

		return this.emotionEntries.filter(
			(entry) => entry.timestamp >= startOfWeek,
		);
	}

	// Computed getter for current month's emotion entries
	get monthEntries() {
		const now = new Date();
		const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
		startOfMonth.setHours(0, 0, 0, 0);

		return this.emotionEntries.filter(
			(entry) => entry.timestamp >= startOfMonth,
		);
	}

	// Computed getter for most recent 10 entries
	get recentEntries() {
		return this.emotionEntries.slice(0, 10);
	}

	// Computed getter for emotion statistics (count per emotion type)
	get emotionStats() {
		const stats: Record<string, number> = {};
		this.emotionEntries.forEach((entry) => {
			stats[entry.emotionId] = (stats[entry.emotionId] || 0) + 1;
		});
		return stats;
	}

	// Get entries filtered by time period
	getEntriesByPeriod = (period: string) => {
		switch (period) {
			case 'today':
				return this.todayEntries;
			case 'week':
				return this.weekEntries;
			case 'month':
				return this.monthEntries;
			case 'all':
				return this.emotionEntries;
			default:
				return this.todayEntries;
		}
	};

	// Get emotion statistics for specific time period
	getStatsByPeriod = (period: string) => {
		const entries = this.getEntriesByPeriod(period);
		const stats: Record<string, number> = {};
		entries.forEach((entry) => {
			stats[entry.emotionId] = (stats[entry.emotionId] || 0) + 1;
		});
		return stats;
	};

	// Getter for available emotions from constants
	get emotions() {
		return EMOTIONS;
	}

	// Reorder emotion entries for drag and drop functionality
	reorderEmotionEntries = (dragIndex: number, hoverIndex: number) => {
		const draggedEntry = this.emotionEntries[dragIndex];
		const newEntries = [...this.emotionEntries];

		// Remove dragged item and insert at new position
		newEntries.splice(dragIndex, 1);
		newEntries.splice(hoverIndex, 0, draggedEntry);

		this.emotionEntries = newEntries;
		this.saveToStorage();
	};
}
