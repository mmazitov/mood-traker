interface TextAreaProps {
	note: string;
	setNote: (value: string) => void;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	id?: string;
	'aria-label'?: string;
	'aria-describedby'?: string;
	required?: boolean;
}

const TextArea = ({
	note,
	setNote,
	placeholder = 'How are you feeling? (optional)',
	className = 'hover:bg-gray-50 p-3 border-2 border-gray-200 hover:border-amber-300 rounded-lg focus-visible:outline-0 w-full min-h-[70px] transition-colors duration-200',
	disabled = false,
	id,
	'aria-label': ariaLabel,
	'aria-describedby': ariaDescribedby,
	required = false,
}: TextAreaProps) => {
	return (
		<textarea
			id={id}
			value={note}
			onChange={(e) => setNote(e.target.value)}
			placeholder={placeholder}
			className={className}
			disabled={disabled}
			aria-label={ariaLabel || 'Enter your emotion notes'}
			aria-describedby={ariaDescribedby}
			required={required}
			rows={3}
		/>
	);
};

export default TextArea;
