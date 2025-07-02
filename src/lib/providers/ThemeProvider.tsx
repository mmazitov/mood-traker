'use client';

import { useTheme } from '@/hooks/useTheme';

// Provider component that initializes time-based theming
// This component doesn't render any UI but ensures theme hook runs at app level
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	// Initialize theme hook to apply time-based CSS classes to body
	useTheme();

	// Pass through children without wrapping in additional elements
	return <>{children}</>;
};
