'use client';

import { ReactNode, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';

interface DragDropProviderProps {
	children: ReactNode;
}

// Provider component that configures react-dnd with appropriate backend for device type
export const DragDropProvider = ({ children }: DragDropProviderProps) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		// Detect if device is mobile/tablet based on screen width and touch capability
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768 || 'ontouchstart' in window);
		};

		checkMobile();
		// Re-check on window resize
		window.addEventListener('resize', checkMobile);

		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Use TouchBackend for mobile devices, HTML5Backend for desktop
	const backend = isMobile ? TouchBackend : HTML5Backend;

	// Configure backend options based on device type
	const backendOptions = isMobile
		? {
				enableMouseEvents: true, // Allow mouse events on touch devices
				delayTouchStart: 200, // Delay before drag starts (ms)
				touchSlop: 5, // Minimum movement to start drag (px)
			}
		: {};

	return (
		<DndProvider backend={backend} options={backendOptions}>
			{children}
		</DndProvider>
	);
};
