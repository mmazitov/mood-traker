import { useRef, useState } from 'react';

// Configuration interface for swipe behavior
interface SwipeConfig {
	onSwipeLeft: () => void; // Callback when left swipe is detected
	threshold?: number; // Minimum distance to trigger action
	restrain?: number; // Maximum vertical movement allowed
	allowedTime?: number; // Maximum time for swipe gesture
}

// Custom hook for implementing swipe-to-delete functionality
export const useSwipeToDelete = ({
	onSwipeLeft,
	threshold = 100, // Default: 100px swipe distance
	restrain = 100, // Default: 100px vertical tolerance
	allowedTime = 300, // Default: 300ms time limit
}: SwipeConfig) => {
	// State to track swipe progress
	const [isSwipping, setIsSwipping] = useState(false);
	const [swipeDistance, setSwipeDistance] = useState(0);

	// Refs to store touch start values
	const touchStartX = useRef<number>(0);
	const touchStartY = useRef<number>(0);
	const touchStartTime = useRef<number>(0);

	// Handle touch start - record initial position and time
	const handleTouchStart = (e: React.TouchEvent) => {
		const touch = e.touches[0];
		touchStartX.current = touch.clientX;
		touchStartY.current = touch.clientY;
		touchStartTime.current = Date.now();
		setIsSwipping(true);
	};

	// Handle touch move - update swipe distance if within constraints
	const handleTouchMove = (e: React.TouchEvent) => {
		if (!isSwipping) return;

		const touch = e.touches[0];
		const deltaX = touchStartX.current - touch.clientX; // Horizontal distance
		const deltaY = Math.abs(touchStartY.current - touch.clientY); // Vertical distance

		// Only track horizontal swipe if vertical movement is minimal
		if (deltaY < restrain) {
			setSwipeDistance(Math.max(0, deltaX)); // Only positive values (left swipe)
		}
	};

	// Handle touch end - check if swipe meets criteria and trigger action
	const handleTouchEnd = () => {
		if (!isSwipping) return;

		const elapsedTime = Date.now() - touchStartTime.current;

		// Check if swipe distance and time meet the threshold requirements
		if (swipeDistance > threshold && elapsedTime <= allowedTime) {
			onSwipeLeft(); // Trigger delete action
		}

		// Reset all swipe state
		setIsSwipping(false);
		setSwipeDistance(0);
	};

	return {
		// Touch event handlers to be spread on target element
		touchHandlers: {
			onTouchStart: handleTouchStart,
			onTouchMove: handleTouchMove,
			onTouchEnd: handleTouchEnd,
		},
		// Current swipe state for visual feedback
		isSwipping,
		swipeDistance,
	};
};
