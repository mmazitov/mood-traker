import { useEffect, useRef } from 'react';

interface UseModalOptions {
	isOpen: boolean;
	onClose: () => void;
}

// Custom hook for managing modal behavior and accessibility
export const useModal = ({ isOpen, onClose }: UseModalOptions) => {
	const modalRef = useRef<HTMLDivElement>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);

	// Handle ESC key press and focus management
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && isOpen) {
				onClose();
			}
		};

		if (isOpen) {
			// Save current focus element before modal opens
			previousFocusRef.current = document.activeElement as HTMLElement;

			// Focus modal container after it renders
			setTimeout(() => {
				modalRef.current?.focus();
			}, 0);

			// Add ESC key listener
			document.addEventListener('keydown', handleKeyDown);
			// Prevent body scroll when modal is open
			document.body.style.overflow = 'hidden';
		} else {
			// Restore focus to previously focused element when modal closes
			if (previousFocusRef.current) {
				previousFocusRef.current.focus();
			}
			// Restore body scroll
			document.body.style.overflow = 'unset';
		}

		// Cleanup function
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	// Handle focus trap within modal
	useEffect(() => {
		if (!isOpen) return;

		const handleFocusTrap = (event: KeyboardEvent) => {
			// Only handle Tab key
			if (event.key !== 'Tab') return;

			const modal = modalRef.current;
			if (!modal) return;

			// Get all focusable elements within modal
			const focusableElements = modal.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
			);
			const firstElement = focusableElements[0] as HTMLElement;
			const lastElement = focusableElements[
				focusableElements.length - 1
			] as HTMLElement;

			// Handle Shift+Tab (reverse tab)
			if (event.shiftKey) {
				if (document.activeElement === firstElement) {
					lastElement.focus();
					event.preventDefault();
				}
			} else {
				// Handle Tab (forward tab)
				if (document.activeElement === lastElement) {
					firstElement.focus();
					event.preventDefault();
				}
			}
		};

		// Add focus trap listener
		document.addEventListener('keydown', handleFocusTrap);
		return () => document.removeEventListener('keydown', handleFocusTrap);
	}, [isOpen]);

	return {
		modalRef, // Ref to attach to modal container
	};
};
