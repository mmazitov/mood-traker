import { useContext } from 'react';

import { StoreContext } from '@/lib/providers/MobxProvider';
import { EmotionStore } from '@/lib/stores/EmotionStore';
import { ModalStore } from '@/lib/stores/ModalStore';

// Interface defining the structure of our root store
interface RootStore {
	modalStore: ModalStore;
	emotionStore: EmotionStore;
}

// Custom hook to access MobX stores from React components
export const useStores = (): RootStore => {
	// Get store context from MobxProvider
	const context = useContext(StoreContext);

	// Throw error if hook is used outside of provider
	if (!context) {
		throw new Error('useStores must be used within MobxProvider');
	}

	return context;
};
