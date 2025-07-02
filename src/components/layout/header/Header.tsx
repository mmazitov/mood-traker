import Logo from './partials/Logo';
import Navigation from './partials/Navigation';

const Header = () => {
	return (
		<header className="border-amber-500 border-b-2">
			<div className="flex flex-wrap justify-between items-center gap-[10px] mx-auto py-[20px] container">
				<Logo />
				<Navigation />
			</div>
		</header>
	);
};

export default Header;
