import Link from 'next/link';

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer
			className="mt-auto py-[20px] border-amber-500 border-t-2"
			role="contentinfo"
			aria-label="Site footer"
		>
			<div className="container">
				<p className="text-gray-600 text-center">
					<span aria-label={`Copyright ${currentYear}`}>
						&copy; {currentYear}
					</span>{' '}
					<Link
						href="/"
						className="rounded-sm text-amber-500 hover:text-amber-600 transition-colors duration-300"
						aria-label="Mood Tracker homepage"
					>
						Mood Tracker
					</Link>
					. All rights reserved.
				</p>
			</div>
		</footer>
	);
};

export default Footer;
