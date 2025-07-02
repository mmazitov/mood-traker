import { useDragAndDrop } from '@/hooks/useDragAndDrop';
import { useSwipeToDelete } from '@/hooks/useSwipeToDelete';
import { Emotion } from '@/types/emotion';
import { memo, useEffect, useMemo } from 'react';

import { getEmotionColors } from '@/utils/emotionColor';
import { formatDate, formatTime } from '@/utils/timeDateFormat';

import Button from '../ui/Button';

export interface EmotionCardProps {
	emotion: Emotion;
	note?: string;
	timestamp: Date;
	onDelete?: () => void;
	index: number;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
	id: string;
}

const EmotionCard = memo(
	({
		emotion,
		note,
		timestamp,
		onDelete,
		index,
		moveCard,
		id,
	}: EmotionCardProps) => {
		// Memoize emotion colors to avoid recalculating on every render
		const colors = useMemo(
			() => getEmotionColors(emotion.name),
			[emotion.name],
		);

		// Memoize formatted date strings to avoid recalculation
		const dateTimeStrings = useMemo(() => {
			const cardId = `emotion-card-${id}`;
			const dateTimeString = `${formatDate(timestamp)} at ${formatTime(timestamp)}`;

			return { cardId, dateTimeString };
		}, [id, timestamp]);

		// Initialize drag and drop functionality (mobile/tablet only)
		const {
			ref,
			isDragging,
			handlerId,
			opacity: dragOpacity,
			drag,
			drop,
		} = useDragAndDrop({
			id,
			index,
			moveCard,
		});

		// Initialize swipe-to-delete functionality (mobile/tablet only)
		const { touchHandlers, isSwipping, swipeDistance } = useSwipeToDelete({
			onSwipeLeft: () => onDelete?.(),
			threshold: 100,
		});

		// Memoize transform and opacity calculations
		const visualEffects = useMemo(() => {
			const transform = isSwipping
				? `translateX(-${swipeDistance}px)` // Move left when swiping
				: 'translateX(0)';
			const opacity = isDragging
				? dragOpacity // Fade when dragging
				: isSwipping
					? Math.max(0.3, 1 - swipeDistance / 200) // Fade when swiping
					: 1;

			return { transform, opacity };
		}, [isSwipping, swipeDistance, isDragging, dragOpacity]);

		// Set up drag and drop references when component mounts
		useEffect(() => {
			if (ref.current) {
				drag(ref.current);
				drop(ref.current);
			}
		}, [drag, drop, ref]);

		const { cardId, dateTimeString } = dateTimeStrings;
		const { transform, opacity } = visualEffects;

		return (
			<div className="relative rounded-lg">
				{/* Background shown when swiping left to delete (mobile/tablet only) */}
				<div
					className="lg:hidden absolute inset-0 flex justify-end items-center bg-red-500 px-6 rounded-lg"
					style={{
						opacity: isSwipping && swipeDistance > 20 ? 1 : 0,
						transition: 'opacity 0.2s ease',
					}}
					aria-hidden="true"
				>
					<span className="font-medium text-white">Delete</span>
				</div>

				{/* Main card content with drag/swipe interactions */}
				<article
					ref={ref}
					{...touchHandlers} // Apply touch handlers for swipe functionality
					data-handler-id={handlerId} // Required for react-dnd
					className={`${colors.background} ${colors.border} ${colors.leftBorder} shadow-sm hover:shadow-md p-4 border border-l-4 rounded-lg transition-all duration-200 transform lg:hover:scale-[1.02] relative h-full`}
					style={{
						transform,
						opacity,
						// Disable transitions during interactions for smooth performance
						transition: isSwipping || isDragging ? 'none' : 'all 0.2s ease',
					}}
					aria-labelledby={`${cardId}-emotion`}
					aria-describedby={`${cardId}-details`}
					role="region"
				>
					{/* Visual drag handle indicator (mobile/tablet only) */}
					<div
						className="lg:hidden flex justify-center mb-2"
						aria-hidden="true"
					>
						<div className="bg-gray-300 rounded-full w-8 h-1"></div>
					</div>

					{/* Card header with date/time and emotion info */}
					<header className="flex justify-between items-start mb-3">
						<div>
							{/* Date display */}
							<h3 className="font-medium text-gray-900 text-sm">
								<time dateTime={timestamp.toISOString()}>
									{formatDate(timestamp)}
								</time>
							</h3>
							{/* Time display */}
							<span className="text-gray-500 text-xs">
								<time dateTime={timestamp.toISOString()}>
									{formatTime(timestamp)}
								</time>
							</span>
						</div>
						{/* Emotion icon and name */}
						<div className="flex items-center gap-2">
							<span
								className="text-2xl"
								aria-hidden="true"
								role="img"
								aria-label={emotion.name}
							>
								{emotion.icon}
							</span>
							<span
								id={`${cardId}-emotion`}
								className="font-medium text-gray-700 text-sm"
							>
								{emotion.name}
							</span>
						</div>
					</header>

					{/* Optional note section */}
					{note && (
						<div className="mb-3">
							<p
								id={`${cardId}-note`}
								className="text-gray-600 text-sm leading-relaxed"
							>
								{note}
							</p>
						</div>
					)}

					{/* Screen reader description */}
					<div id={`${cardId}-details`} className="sr-only">
						Emotion entry: {emotion.name} recorded on {dateTimeString}
						{note && `. Note: ${note}`}
					</div>

					{/* Delete button (desktop only) */}
					<footer className="hidden lg:flex justify-end">
						{onDelete && (
							<Button
								type="button"
								onClick={onDelete}
								variant="remove"
								aria-label={`Delete ${emotion.name} emotion from ${dateTimeString}`}
							>
								Delete
							</Button>
						)}
					</footer>

					{/* Usage instructions (mobile/tablet only) */}
					<div className="lg:hidden mt-3 text-center" aria-hidden="true">
						<p className="text-gray-400 text-xs">
							Hold & drag to reorder • Swipe left to delete
						</p>
					</div>
				</article>
			</div>
		);
	},
);

EmotionCard.displayName = 'EmotionCard';

export default EmotionCard;
