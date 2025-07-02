import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Emotion Statistics | Mood Tracker',
	description:
		'Analyze your emotional patterns and trends. View detailed statistics and insights about your mood over time.',
	keywords: [
		'emotion statistics',
		'mood analysis',
		'emotional patterns',
		'mental health insights',
		'mood trends',
	],
	openGraph: {
		title: 'Emotion Statistics | Mood Tracker',
		description: 'Analyze your emotional patterns and trends',
		type: 'website',
	},
};

export default function StatisticLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
