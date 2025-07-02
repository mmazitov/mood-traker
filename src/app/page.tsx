'use client';

import { observer } from 'mobx-react-lite';
import { useCallback, useMemo } from 'react';

import EmotionList from '@/components/emotion/EmotionList';
import PageTitle from '@/components/layout/PageTitle';
import Button from '@/components/ui/Button';
import { useStores } from '@/hooks/useStore';

// Main home page component - tracks today's emotions
const Home = observer(() => {
	// Get stores from MobX context
	const { emotionStore, modalStore } = useStores();

	// Memoize handler to prevent unnecessary re-renders
	const handleRemoveAllEmotions = useCallback(() => {
		modalStore.openRemoveAllConfirmModal();
	}, [modalStore]);

	// Memoize today's entries count to avoid recalculation
	const todayEntriesCount = useMemo(
		() => emotionStore.todayEntries.length,
		[emotionStore.todayEntries.length],
	);

	return (
		<div className="my-4">
			{/* Page header with title and conditional delete all button */}
			<header
				className="flex flex-wrap justify-between items-center gap-[10px] mb-[10px]"
				aria-label="Home header"
			>
				{/* Page title and subtitle */}
				<PageTitle
					title="Today's Emotions"
					subtitle="Track and review your daily emotions"
				/>
				{/* Delete all button - only show when there are entries and not loading */}
				{!emotionStore.isLoading && todayEntriesCount > 0 && (
					<div>
						<Button
							onClick={handleRemoveAllEmotions}
							type="button"
							variant="remove"
							aria-label={`Delete all ${todayEntriesCount} emotion entries from today`}
						>
							Delete All emotions
						</Button>
					</div>
				)}
			</header>
			{/* Main content area - displays list of emotion entries */}
			<EmotionList />
		</div>
	);
});

export default Home;
