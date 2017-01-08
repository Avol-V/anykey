/**
 * Convert any string value to use as HTML id attribute.
 */
;

/**
 * Convert any string value to use as HTML id attribute.
 * 
 * @param value Original value.
 * @returns Converted value.
 */
function main( value: string ): string
{
	return value.toLowerCase()
		.replace( /[^a-z0-9]+/g, '-' )
		.replace( /^[\d-]|-$/g, '' );
}

/**
 * Module
 */
export {
	main as default,
};
