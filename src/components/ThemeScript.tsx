export function ThemeScript() {
	return (
		<script
			dangerouslySetInnerHTML={{
				__html: `
					(function() {
						function getCurrentTimeOfDay() {
							const hour = new Date().getHours();
							if (hour >= 6 && hour < 12) return 'morning';
							if (hour >= 12 && hour < 18) return 'day';
							if (hour >= 18 && hour < 22) return 'evening';
							return 'night';
						}
						
						function getTimeOfDayClassName(timeOfDay) {
							return 'time-' + timeOfDay;
						}
						
						const timeOfDay = getCurrentTimeOfDay();
						const className = getTimeOfDayClassName(timeOfDay);
						document.body.className = document.body.className
							.split(' ')
							.filter(cls => !cls.startsWith('time-'))
							.concat(className)
							.join(' ');
					})();
				`,
			}}
		/>
	);
}
