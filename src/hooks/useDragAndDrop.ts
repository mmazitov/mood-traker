import { DragItem, ItemTypes } from '@/types/emotion';
import { useEffect, useRef, useState } from 'react';
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd';

export interface DragAndDropOptions {
	id: string;
	index: number;
	moveCard: (dragIndex: number, hoverIndex: number) => void;
	itemType?: string;
}

export interface DragAndDropResult {
	ref: React.RefObject<HTMLDivElement | null>;
	isDragging: boolean;
	handlerId: string | symbol | null;
	opacity: number;
	drag: (el: HTMLElement | null) => void;
	drop: (el: HTMLElement | null) => void;
}

export const useDragAndDrop = ({
	id,
	index,
	moveCard,
	itemType = ItemTypes.EMOTION_CARD,
}: DragAndDropOptions): DragAndDropResult => {
	const ref = useRef<HTMLDivElement>(null);
	// State to track if device is mobile/tablet (drag enabled only for these)
	const [isMobile, setIsMobile] = useState(false);

	// Check device type and enable/disable drag based on screen size
	useEffect(() => {
		const checkDevice = () => {
			setIsMobile(window.innerWidth <= 1024); // tablet and mobile
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);
		return () => window.removeEventListener('resize', checkDevice);
	}, []);

	// Configure drop target - only accept drops on mobile devices
	const [{ handlerId }, drop] = useDrop<
		DragItem,
		void,
		{ handlerId: string | symbol | null }
	>({
		accept: itemType,
		canDrop: () => isMobile, // Only allow drops on mobile
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: DragItem, monitor: DropTargetMonitor<DragItem>) {
			// Exit early if not mobile or no ref
			if (!ref.current || !isMobile) {
				return;
			}
			const dragIndex = item.index;
			const hoverIndex = index;

			// Don't replace items with themselves
			if (dragIndex === hoverIndex) {
				return;
			}

			// Calculate element boundaries for hover detection
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			// Get current mouse/touch position
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

			// Only move when cursor crosses the middle threshold
			// This prevents excessive swapping while dragging
			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}
			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// Perform the actual move operation
			moveCard(dragIndex, hoverIndex);

			// Update item index to prevent multiple moves
			item.index = hoverIndex;
		},
	});

	// Configure drag source - only allow dragging on mobile devices
	const [{ isDragging }, drag] = useDrag<
		DragItem,
		void,
		{ isDragging: boolean }
	>({
		type: itemType,
		canDrag: () => isMobile, // Only allow drag on mobile
		item: (): DragItem => {
			return { id, index, type: itemType };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	// Reduce opacity when dragging
	const opacity = isDragging ? 0.5 : 1;

	return {
		ref,
		isDragging,
		handlerId,
		opacity,
		// Return actual drag/drop functions only for mobile, empty functions for desktop
		drag: isMobile ? drag : () => {},
		drop: isMobile ? drop : () => {},
	};
};
