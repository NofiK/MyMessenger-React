export function formatAMPM(date) {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12;
	minutes = minutes < 10 ? '0' + minutes : minutes;
	const strTime = hours + ':' + minutes + ' ' + ampm;
	const today = new Date();
	const currentDate =
		today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
	return currentDate + ', ' + strTime;
}

export function justDate(date) {
	const options = {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	};
	const today = new Date(date);
	const currentDate = today.toLocaleDateString('en-US', options);
	return currentDate;
}
