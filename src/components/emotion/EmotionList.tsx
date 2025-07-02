'use client';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo } from 'react';

import { useStores } from '@/hooks/useStore';

import Loader from '../ui/Loader';
import EmotionCard from './EmotionCard';

const EmotionList = observer(() => {
	const { emotionStore, modalStore } = useStores();

	// Memoize delete handler to prevent unnecessary re-renders
	const handleDeleteEmotion = useCallback(
		(entryId: string, emotionName: string) => {
			modalStore.openDeleteConfirmModal(entryId, emotionName);
		},
		[modalStore],
	);

	// Memoize moveCard function to prevent unnecessary re-renders
	const moveCard = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			emotionStore.reorderEmotionEntries(dragIndex, hoverIndex);
		},
		[emotionStore],
	);

	// Memoize today's entries to avoid recalculation
	const todayEntries = useMemo(
		() => emotionStore.todayEntries,
		[emotionStore.todayEntries],
	);

	if (emotionStore.isLoading) {
		return (
			<div className="col-span-full py-12 text-center">
				<Loader size="lg" aria-label="Loading your emotion entries" />
				<p className="text-gray-500 text-lg">Loading your emotions...</p>
			</div>
		);
	}

	if (todayEntries.length === 0) {
		return (
			<div
				className="col-span-full py-12 text-center"
				role="region"
				aria-labelledby="empty-state-title"
			>
				<h3 id="empty-state-title" className="mb-2 text-gray-500 text-lg">
					No emotions tracked today
				</h3>
				<p className="text-gray-400">
					Start by adding your first emotion to track your mood!
				</p>
			</div>
		);
	}

	return (
		<section
			className="gap-4 grid [grid-template-columns:repeat(auto-fill,minmax(280px,1fr))]"
			aria-labelledby="emotions-list-title"
		>
			<h2 id="emotions-list-title" className="sr-only">
				Today's emotion entries ({todayEntries.length} total)
			</h2>

			{todayEntries.map((entry, index) => {
				const emotion = emotionStore.getEmotionById(entry.emotionId);
				if (!emotion) return null;

				return (
					<EmotionCard
						key={entry.id}
						id={entry.id}
						index={index}
						emotion={emotion}
						note={entry.note}
						timestamp={entry.timestamp}
						moveCard={moveCard}
						onDelete={() => handleDeleteEmotion(entry.id, emotion.name)}
					/>
				);
			})}
		</section>
	);
});

export default EmotionList;
