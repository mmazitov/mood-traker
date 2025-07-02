import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import Footer from '@/components/layout/footer/Footer';
import Header from '@/components/layout/header/Header';
import Modal from '@/components/modal/Modal';
import { ThemeScript } from '@/components/ThemeScript';
import { Providers } from '@/lib/providers';
import './globals.css';

const poppinsFont = Poppins({
	variable: '--font-poppins',
	weight: ['400', '500', '600', '700'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	display: 'swap',
});

export const metadata: Metadata = {
	title: "Today's Emotions | Mood Tracker",
	description:
		'Track and review your daily emotions. Monitor your emotional wellbeing and identify patterns in your mood.',
	keywords: [
		'mood tracker',
		'emotions',
		'mental health',
		'wellbeing',
		'daily tracking',
	],
	openGraph: {
		title: "Today's Emotions | Mood Tracker",
		description: 'Track and review your daily emotions',
		type: 'website',
	},
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body className={`${poppinsFont.variable} antialiased`}>
				<ThemeScript />
				<Providers>
					<div className="flex flex-col min-h-screen wrapper">
						<Header />
						<main
							id="main-content"
							className="flex-grow container"
							tabIndex={-1}
							role="main"
						>
							{children}
						</main>
						<Footer />
					</div>
					<Modal />
				</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
