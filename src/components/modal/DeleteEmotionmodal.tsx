'use client';
import { observer } from 'mobx-react-lite';

import { useStores } from '@/hooks/useStore';

import Button from '../ui/Button';

// Modal component for confirming emotion entry deletion
const DeleteEmotionModal = observer(() => {
	// Get stores from MobX context
	const { modalStore, emotionStore } = useStores();

	// Handle confirmed deletion action
	const handleConfirmDelete = () => {
		// Check if there's deletion data available
		if (modalStore.deleteConfirmData) {
			// Delete the emotion entry from store
			emotionStore.deleteEmotionEntry(modalStore.deleteConfirmData.id);
			// Close the modal after deletion
			modalStore.closeModal();
		}
	};

	// Handle cancellation - just close modal without action
	const handleCancel = () => {
		modalStore.closeModal();
	};

	// Don't render modal if no deletion data is set
	if (!modalStore.deleteConfirmData) {
		return null;
	}

	return (
		<>
			<div className="text-center">
				{/* Warning icon section */}
				<div className="mb-4">
					<div className="flex justify-center items-center bg-red-100 mx-auto rounded-full w-12 h-12">
						<span className="text-red-600 text-xl">⚠️</span>
					</div>
				</div>

				{/* Modal title */}
				<h3 className="mb-2 font-medium text-gray-900 text-lg">
					Delete Emotion Entry
				</h3>

				{/* Confirmation message with emotion name */}
				<p className="mb-6 text-gray-500 text-sm">
					Are you sure you want to delete this{' '}
					<span className="font-medium text-gray-700">
						{modalStore.deleteConfirmData.emotionName}
					</span>{' '}
					emotion entry? This action cannot be revert.
				</p>

				{/* Action buttons */}
				<div className="flex justify-center gap-3">
					{/* Cancel button */}
					<Button type="button" onClick={handleCancel} variant="cancel">
						Cancel
					</Button>
					{/* Confirm delete button */}
					<Button type="button" onClick={handleConfirmDelete} variant="remove">
						Delete
					</Button>
				</div>
			</div>
		</>
	);
});

export default DeleteEmotionModal;
