interface RadioButtonProps {
	id: string;
	name: string;
	value: string;
	checked: boolean;
	onChange: (value: string) => void;
	children: React.ReactNode;
	className?: string;
	disabled?: boolean;
	'aria-describedby'?: string;
	required?: boolean;
}

const RadioButton = ({
	id,
	name,
	value,
	checked,
	onChange,
	children,
	className = '',
	disabled = false,
	'aria-describedby': ariaDescribedby,
	required = false,
}: RadioButtonProps) => {
	return (
		<label
			htmlFor={id}
			className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
				checked
					? 'border-amber-500 bg-amber-50'
					: 'border-gray-200 hover:border-amber-300 hover:bg-gray-50'
			} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
		>
			<input
				type="radio"
				id={id}
				name={name}
				value={value}
				checked={checked}
				onChange={() => onChange(value)}
				disabled={disabled}
				aria-describedby={ariaDescribedby}
				required={required}
				className="sr-only"
			/>
			{children}
		</label>
	);
};

export default RadioButton;
