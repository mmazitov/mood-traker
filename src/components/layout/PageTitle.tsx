interface PageTitleProps {
	title: string;
	subtitle?: string;
	className?: string;
}

const PageTitle = ({ title, subtitle, className }: PageTitleProps) => {
	return (
		<div>
			<h1 className={`${className} mb-2 font-bold text-gray-900 text-3xl`}>
				{title}
			</h1>
			{subtitle && <p className={`${className} text-gray-600`}>{subtitle}</p>}
		</div>
	);
};

export default PageTitle;
