import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility function to merge and deduplicate CSS classes
// Combines clsx for conditional classes and tailwind-merge for Tailwind CSS deduplication
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
