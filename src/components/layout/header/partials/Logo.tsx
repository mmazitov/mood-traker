import Link from 'next/link';

const Logo = () => {
	return (
		<Link
			href="/"
			className="w-full md:w-auto text-amber-500 hover:hover:text-amber-600 text-center transition-colors duration-300"
		>
			Mood Tracker
		</Link>
	);
};

export default Logo;
