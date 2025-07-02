export const MODAL_CONFIG = {
	ADD_EMOTION: {
		title: 'Add Emotion',
		maxWidth: '380px',
	},
	DELETE_CONFIRM: {
		title: 'Delete Emotion Entry',
		icon: '⚠️',
		confirmText: 'Delete',
		cancelText: 'Cancel',
		warningText: 'This action cannot be revert.',
	},
	REMOVE_ALL_CONFIRM: {
		title: 'Remove All Emotions',
		icon: '🗑️',
		confirmText: 'Remove All',
		cancelText: 'Cancel',
		warningText:
			'This action cannot be undone and will permanently delete all your emotion entries.',
	},
} as const;
