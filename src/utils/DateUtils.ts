/**
 * 
 * @param date 
 * @returns 
 * Usage
 * let today = new Date();
 * const formattedToday = formatDate(today);
 * console.log(`Formatted date: ${formattedToday}`);
 */
const formatDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');
  
	// Calculate the time zone offset in minutes and convert it to [+-]ZZZZ format
	let offset = date.getTimezoneOffset();
	const offsetSign = offset < 0 ? '+' : '-';
	offset = Math.abs(offset);
	const offsetHours = String(Math.floor(offset / 60)).padStart(2, '0');
	const offsetMinutes = String(offset % 60).padStart(2, '0');
  
	const timeZone = `${offsetSign}${offsetHours}${offsetMinutes}`;
  
	return `${year}${month}${day}${hours}${minutes}${seconds}${timeZone}`;
  };
  
  // Usage
  const formatShortDate = (date: Date): string => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}${month}${day}`;
  }

  export {formatDate, formatShortDate};