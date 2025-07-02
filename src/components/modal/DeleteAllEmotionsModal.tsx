'use client';
import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks/useStore';

import Button from '../ui/Button';

const DeleteAllEmotionsModal = observer(() => {
	const { modalStore, emotionStore } = useStores();

	const handleConfirmRemoveAll = () => {
		emotionStore.removeAllEmotions();
		modalStore.closeModal();
	};

	const handleCancel = () => {
		modalStore.closeModal();
	};

	const emotionCount = emotionStore.emotionEntries.length;

	return (
		<>
			<div className="text-center">
				<div className="mb-4">
					<div className="flex justify-center items-center bg-red-100 mx-auto rounded-full w-12 h-12">
						<span className="text-red-600 text-xl">🗑️</span>
					</div>
				</div>

				<h3 className="mb-2 font-medium text-gray-900 text-lg">
					Delete All Emotions
				</h3>

				<p className="mb-6 text-gray-500 text-sm">
					Are you sure you want to delete all{' '}
					<span className="font-medium text-gray-700">
						{emotionCount} emotion{emotionCount !== 1 ? 's' : ''}
					</span>
					? This action cannot be revert and will permanently delete all your
					emotion entries.
				</p>

				<div className="flex justify-center gap-3">
					<Button type="button" onClick={handleCancel} variant="cancel">
						Cancel
					</Button>
					<Button
						type="button"
						onClick={handleConfirmRemoveAll}
						variant="remove"
					>
						Delete All
					</Button>
				</div>
			</div>
		</>
	);
});

export default DeleteAllEmotionsModal;
