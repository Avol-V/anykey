/**
 * Prepare date to use in text.
 */
;

/**
 * Prepare date to use in text.
 * 
 * @param date Date to output.
 * @param withTime Output date with time?
 * @returns String representation of the date.
 */
function main( date: Date, withTime: boolean = false ): string
{
	const dateStr = `${zeroPad( date.getFullYear(), 4 )}.${
		zeroPad( date.getMonth() )}.${zeroPad( date.getDay() )}`;
	
	if ( withTime )
	{
		const timeStr = `${zeroPad( date.getHours() )}.${
			zeroPad( date.getMinutes() )}`;
		
		return `${dateStr} ${timeStr}`;
	}
	
	return dateStr;
}

/**
 * Left pad number with zeroes.
 * 
 * @param num Original number.
 * @param pad Number of characters to align.
 * @returns String of number with leading zeroes.
 */
function zeroPad( num: number, pad: number = 2 ): string
{
	return `0000${num}`.substr( -pad );
}

/**
 * Module
 */
export {
	main as default,
};
