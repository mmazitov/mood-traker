export enum ModalType {
	ADD_EMOTION = 'ADD_EMOTION',
	DELETE_CONFIRM = 'DELETE_CONFIRM',
	REMOVE_ALL_CONFIRM = 'REMOVE_ALL_CONFIRM',
}

export type ModalState = {
	type: ModalType | null;
	isOpen: boolean;
};
