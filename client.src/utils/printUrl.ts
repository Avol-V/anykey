/**
 * Prepare URL to output as link text.
 */
;

/**
 * Prepare URL to output as link text.
 * 
 * For use in:
 * `<a href={originalUrl}>{output}</a>`.
 * 
 * @param url Original url.
 * @returns Text for this URL.
 */
function main( url: string ): string
{
	const domainRegExp = /^\w+:\/+([^\/]+)/;
	const matches = domainRegExp.exec( url );
	
	if ( matches )
	{
		return matches[1];
	}
	
	return url;
}

/**
 * Module
 */
export {
	main as default,
};
