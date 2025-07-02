import { cva } from 'class-variance-authority';

import { cn } from '@/utils/cn';

export type ButtonVariant = 'default' | 'remove' | 'cancel';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps {
	type?: ButtonType;
	onClick?: () => void;
	children: React.ReactNode;
	className?: string;
	variant?: ButtonVariant;
	disabled?: boolean;
	size?: ButtonSize;
	'aria-label'?: string;
	'aria-describedby'?: string;
	autoFocus?: boolean;
}

const buttonVariants = cva(
	'disabled:opacity-50 px-4 py-2 rounded-md focus-visible:outline-none text-white transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed',
	{
		variants: {
			variant: {
				default: 'bg-amber-500 hover:bg-amber-600',
				cancel:
					'bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 text-sm',
				remove: 'bg-red-600 hover:bg-red-700 font-medium text-sm ',
			},
		},
		defaultVariants: {
			variant: 'default',
		},
	},
);

const Button = ({
	type = 'button',
	onClick,
	children,
	className,
	variant,
	disabled,
	'aria-label': ariaLabel,
	'aria-describedby': ariaDescribedby,
	autoFocus,
}: ButtonProps) => {
	return (
		<button
			type={type}
			onClick={onClick}
			className={cn(buttonVariants({ variant }), className)}
			disabled={disabled}
			aria-label={ariaLabel}
			aria-describedby={ariaDescribedby}
			autoFocus={autoFocus}
			role="button"
		>
			{children}
		</button>
	);
};

export default Button;
