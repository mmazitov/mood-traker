export interface Emotion {
	id: string;
	name: string;
	icon: string;
}

export interface DragItem {
	index: number;
	id: string;
	type: string;
}

export const ItemTypes = {
	EMOTION_CARD: 'emotion_card',
};
