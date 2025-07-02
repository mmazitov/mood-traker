'use client';
import { observer } from 'mobx-react-lite';
import { MdClose } from 'react-icons/md';

import { useModal } from '@/hooks/useModal';
import { useStores } from '@/hooks/useStore';
import { ModalType } from '@/types/modal';

import AddEmotionModal from './AddEmotionModal';
import DeleteAllEmotionsModal from './DeleteAllEmotionsModal';
import DeleteEmotionModal from './DeleteEmotionmodal';

// Main modal component that handles rendering different modal types
const Modal = observer(() => {
	// Get modal store from MobX context
	const { modalStore } = useStores();

	// Use custom modal hook for accessibility and behavior management
	const { modalRef } = useModal({
		isOpen: modalStore.isOpen,
		onClose: modalStore.closeModal,
	});

	// Don't render anything if modal is not open
	if (!modalStore.isOpen) {
		return null;
	}

	// Render appropriate modal content based on current modal type
	const renderModalContent = () => {
		switch (modalStore.currentModal) {
			case ModalType.ADD_EMOTION:
				return <AddEmotionModal />;
			case ModalType.DELETE_CONFIRM:
				return <DeleteEmotionModal />;
			case ModalType.REMOVE_ALL_CONFIRM:
				return <DeleteAllEmotionsModal />;
			default:
				return null;
		}
	};

	return (
		<div
			className="z-50 fixed inset-0 flex justify-center items-center"
			role="dialog"
			aria-modal="true"
			aria-labelledby="modal-title"
		>
			{/* Modal backdrop - clicking closes modal */}
			<div
				className="absolute inset-0 bg-black opacity-80"
				onClick={modalStore.closeModal}
				aria-hidden="true"
			/>

			{/* Modal content container */}
			<div
				ref={modalRef}
				className="z-10 relative bg-white shadow-xl p-[20px] rounded-lg focus:outline-none w-[calc(100%-20px)] md:w-[380px]"
				tabIndex={-1}
			>
				{/* Close button */}
				<div className="top-2 right-2 absolute">
					<button
						onClick={modalStore.closeModal}
						className="flex justify-center items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 w-8 h-8 font-bold text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
						aria-label="Close modal"
					>
						<MdClose />
					</button>
				</div>
				{/* Dynamic modal content based on modal type */}
				{renderModalContent()}
			</div>
		</div>
	);
});

export default Modal;
