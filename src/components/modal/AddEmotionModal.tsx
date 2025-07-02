'use client';
import { observer } from 'mobx-react-lite';
import { useCallback, useMemo, useState } from 'react';

import { useStores } from '@/hooks/useStore';
import { EMOTIONS } from '../../lib/constants/emotion';

import Button from '../ui/Button';
import RadioButton from '../ui/RadioButton';
import TextArea from '../ui/TextArea';

const AddEmotionModal = observer(() => {
	const { modalStore, emotionStore } = useStores();

	// Memoize emotion items to avoid recalculation
	const emotionItems = useMemo(() => EMOTIONS, []);

	const [selectedEmotion, setSelectedEmotion] = useState<string>('');
	const [note, setNote] = useState<string>('');

	// Memoize emotion change handler
	const handleEmotionChange = useCallback((emotionId: string) => {
		setSelectedEmotion(emotionId);
	}, []);

	// Memoize note change handler
	const handleNoteChange = useCallback((value: string) => {
		setNote(value);
	}, []);

	// Memoize form submit handler
	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			if (selectedEmotion) {
				// Save emotion to store and localStorage
				emotionStore.addEmotionEntry(selectedEmotion, note);

				// Reset form
				setSelectedEmotion('');
				setNote('');

				// Close modal
				modalStore.closeModal();
			}
		},
		[selectedEmotion, note, emotionStore, modalStore],
	);

	return (
		<>
			<h2 id="modal-title" className="mb-4 font-semibold text-2xl">
				Add Emotion
			</h2>
			<form className="space-y-4" onSubmit={handleSubmit}>
				<fieldset className="form-group">
					<legend className="sr-only">Choose your emotion</legend>
					<div
						role="radiogroup"
						aria-labelledby="emotion-group-label"
						aria-required="true"
					>
						<p
							id="emotion-group-label"
							className="mb-3 font-medium text-gray-700 text-sm"
						>
							How are you feeling right now?
						</p>
						<ul className="flex flex-wrap justify-center gap-3">
							{emotionItems.map((item) => (
								<li key={item.id}>
									<RadioButton
										id={item.id}
										name="emotion"
										value={item.id}
										checked={selectedEmotion === item.id}
										onChange={handleEmotionChange}
										aria-describedby="emotion-group-label"
										required={true}
									>
										<span className="text-2xl" aria-hidden="true">
											{item.icon}
										</span>
										<span className="sr-only">{item.name}</span>
									</RadioButton>
								</li>
							))}
						</ul>
					</div>
				</fieldset>

				<div className="form-group">
					<label
						htmlFor="emotion-note"
						className="block mb-2 font-medium text-gray-700 text-sm"
					>
						Additional notes (optional)
					</label>
					<TextArea
						id="emotion-note"
						note={note}
						setNote={handleNoteChange}
						aria-describedby="note-help"
					/>
					<p id="note-help" className="mt-1 text-gray-500 text-xs">
						You can add more details about how you're feeling
					</p>
				</div>

				<div className="form-group">
					<Button
						type="submit"
						disabled={!selectedEmotion}
						className="w-full"
						aria-describedby={!selectedEmotion ? 'submit-help' : undefined}
					>
						Add Emotion
					</Button>
					{!selectedEmotion && (
						<p id="submit-help" className="mt-1 text-gray-500 text-xs">
							Please select an emotion to continue
						</p>
					)}
				</div>
			</form>
		</>
	);
});

export default AddEmotionModal;
