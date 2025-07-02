'use client';

import { configure } from 'mobx';
import React, { createContext, ReactNode } from 'react';

import { EmotionStore } from '../stores/EmotionStore';
import { ModalStore } from '../stores/ModalStore';

// Configure MobX with strict mode settings for better development experience
configure({
	enforceActions: 'always', // Require actions for state mutations
	computedRequiresReaction: true, // Computed values must be accessed in reactions
	reactionRequiresObservable: true, // Reactions must observe something
	observableRequiresReaction: true, // Observables must be accessed in reactions
	disableErrorBoundaries: true, // Let React handle errors
});

// Interface defining the structure of our root store
interface RootStore {
	modalStore: ModalStore;
	emotionStore: EmotionStore;
}

// Factory function to create all stores
const createRootStore = (): RootStore => {
	return {
		modalStore: new ModalStore(),
		emotionStore: new EmotionStore(),
	};
};

// React context for providing stores to the component tree
export const StoreContext = createContext<RootStore | null>(null);

// Provider component props interface
interface MobxProviderProps {
	children: ReactNode;
}

// Provider component that creates and provides stores to child components
export const MobxProvider: React.FC<MobxProviderProps> = ({ children }) => {
	// Create stores once and memoize them to prevent recreation on re-renders
	const store = React.useMemo(() => createRootStore(), []);

	return (
		<StoreContext.Provider value={store}>{children}</StoreContext.Provider>
	);
};
