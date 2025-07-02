import { EmotionColors } from '@/types/store';

// Map emotion names to their corresponding color schemes for UI styling
export const getEmotionColors = (emotionName: string): EmotionColors => {
	const name = emotionName.toLowerCase();

	switch (name) {
		case 'happy':
			// Yellow color scheme for happy emotions
			return {
				border: 'border-yellow-200 hover:border-yellow-300',
				leftBorder: 'border-l-yellow-400',
				background: 'bg-yellow-50',
			};
		case 'sad':
			// Blue color scheme for sad emotions
			return {
				border: 'border-blue-200 hover:border-blue-300',
				leftBorder: 'border-l-blue-400',
				background: 'bg-blue-50',
			};
		case 'angry':
			// Red color scheme for angry emotions
			return {
				border: 'border-red-200 hover:border-red-300',
				leftBorder: 'border-l-red-400',
				background: 'bg-red-50',
			};
		case 'surprised':
			// Purple color scheme for surprised emotions
			return {
				border: 'border-purple-200 hover:border-purple-300',
				leftBorder: 'border-l-purple-400',
				background: 'bg-purple-50',
			};
		case 'neutral':
			// Gray color scheme for neutral emotions
			return {
				border: 'border-gray-200 hover:border-gray-300',
				leftBorder: 'border-l-gray-400',
				background: 'bg-gray-50',
			};
		default:
			// Default amber color scheme for unknown emotions
			return {
				border: 'border-gray-200 hover:border-amber-300',
				leftBorder: 'border-l-amber-400',
				background: 'bg-white',
			};
	}
};
