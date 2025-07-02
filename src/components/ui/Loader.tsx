type LoaderSize = 'sm' | 'md' | 'lg';

interface LoaderProps {
	size?: LoaderSize;
	className?: string;
	'aria-label'?: string;
	'aria-describedby'?: string;
	id?: string;
}

const Loader = ({
	size = 'md',
	className = '',
	'aria-label': ariaLabel = 'Loading content',
	'aria-describedby': ariaDescribedby,
	id,
}: LoaderProps) => {
	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-8 h-8',
		lg: 'w-12 h-12',
	};

	const loaderId = id || 'loader';
	const descriptionId = `${loaderId}-description`;

	return (
		<div className={`flex justify-center items-center ${className}`}>
			<div
				id={loaderId}
				className={`${sizeClasses[size]} border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin`}
				role="status"
				aria-label={ariaLabel}
				aria-describedby={ariaDescribedby || descriptionId}
				aria-live="polite"
				tabIndex={-1}
			>
				<span className="sr-only">{ariaLabel}</span>
			</div>
			{!ariaDescribedby && (
				<span id={descriptionId} className="sr-only">
					Please wait while content is loading
				</span>
			)}
		</div>
	);
};

export default Loader;
