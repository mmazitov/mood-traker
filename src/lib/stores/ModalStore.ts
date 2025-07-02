import { makeAutoObservable } from 'mobx';

import { ModalType } from '@/types/modal';
import { DeleteConfirmData } from '@/types/store';

// MobX store for managing modal state and data
export class ModalStore {
	currentModal: ModalType | null = null;
	isOpen: boolean = false;
	deleteConfirmData: DeleteConfirmData | null = null;

	constructor() {
		// Make all properties and methods observable/actions
		makeAutoObservable(this);
	}

	// Generic method to open any modal type
	openModal = (modalType: ModalType): void => {
		this.currentModal = modalType;
		this.isOpen = true;
	};

	// Close current modal and reset all data
	closeModal = (): void => {
		this.currentModal = null;
		this.isOpen = false;
		this.deleteConfirmData = null;
	};

	// Open the "add emotion" modal
	openAddEmotionModal = () => {
		this.openModal(ModalType.ADD_EMOTION);
	};

	// Open delete confirmation modal with specific entry data
	openDeleteConfirmModal = (entryId: string, emotionName: string): void => {
		this.deleteConfirmData = { id: entryId, emotionName };
		this.openModal(ModalType.DELETE_CONFIRM);
	};

	// Open "remove all emotions" confirmation modal
	openRemoveAllConfirmModal = () => {
		this.openModal(ModalType.REMOVE_ALL_CONFIRM);
	};

	// Close add emotion modal (alias for closeModal)
	closeAddEmotionModal = () => {
		this.closeModal();
	};

	// Computed getter to check if add emotion modal is open
	get isAddEmotionModalOpen() {
		return this.isOpen && this.currentModal === ModalType.ADD_EMOTION;
	}

	// Computed getter to check if delete confirmation modal is open
	get isDeleteConfirmModalOpen() {
		return this.isOpen && this.currentModal === ModalType.DELETE_CONFIRM;
	}

	// Computed getter to check if remove all confirmation modal is open
	get isRemoveAllConfirmModalOpen() {
		return this.isOpen && this.currentModal === ModalType.REMOVE_ALL_CONFIRM;
	}
}
