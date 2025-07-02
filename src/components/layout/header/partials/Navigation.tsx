'use client';
import { usePathname } from 'next/navigation';

import Button from '@/components/ui/Button';
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';

import { useStores } from '@/hooks/useStore';
import { ModalType } from '@/types/modal';

const Navigation = () => {
	const pathname = usePathname();
	const navigationItems = NAVIGATION_ITEMS;
	const { modalStore } = useStores();

	const handleAddEmotion = () => {
		modalStore.openModal(ModalType.ADD_EMOTION);
	};

	return (
		<nav
			className="flex justify-center md:justify-end w-full md:w-auto"
			role="navigation"
			aria-label="Main navigation"
		>
			<ul className="flex flex-wrap justify-center items-center gap-[15px]">
				{navigationItems.map((item, index) => {
					const isActive = pathname === item.href;

					return (
						<li key={item.href}>
							{index === navigationItems.length - 1 ? (
								<Button
									onClick={handleAddEmotion}
									aria-label="Open dialog to add new emotion"
								>
									{item.name}
								</Button>
							) : (
								<a
									href={item.href}
									className={`relative transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded px-2 py-1 ${
										isActive
											? 'text-amber-600 before:w-full'
											: 'before:w-0 hover:before:w-full'
									} before:bottom-[-2px] before:left-0 before:absolute before:bg-amber-500 before:h-[2px] before:transition-all before:duration-300`}
									aria-current={isActive ? 'page' : undefined}
								>
									{item.name}
								</a>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Navigation;
