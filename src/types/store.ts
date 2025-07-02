import { EmotionStore } from '../lib/stores/EmotionStore';
import { ModalStore } from '../lib/stores/ModalStore';

export interface RootStore {
	modalStore: ModalStore;
	emotionStore: EmotionStore;
}

export interface DeleteConfirmData {
	id: string;
	emotionName: string;
}

export interface EmotionColors {
	border: string;
	leftBorder: string;
	background: string;
}
