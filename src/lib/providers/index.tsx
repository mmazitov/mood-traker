import React, { ReactNode } from 'react';

import { DragDropProvider } from './DndProvider';
import { MobxProvider } from './MobxProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
	children: ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
	return (
		<MobxProvider>
			<DragDropProvider>
				<ThemeProvider>{children}</ThemeProvider>
			</DragDropProvider>
		</MobxProvider>
	);
};

export { MobxProvider } from './MobxProvider';
