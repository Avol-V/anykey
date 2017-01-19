/**
 * Server API actions.
 */
;

/**
 * Send async request to server API.
 * 
 * @param method HTTP method.
 * @param path The path to request within API (part after `/api`).
 * @param data Data to send to the server.
 * @returns Parsed server response.
 */
function send<T>( method: HttpMethod, path: string, data: any = null ): Promise<T>
{
	const xhr = new XMLHttpRequest();
	
	xhr.open( method, '/api' + path );
	xhr.setRequestHeader( 'Accept', 'application/json' );
	xhr.setRequestHeader( 'Content-Type', 'application/json' );
	xhr.setRequestHeader( 'X-Requested-With', 'XMLHttpRequest' );
	
	const promise = new Promise<T>(
		( resolve: ( value: T ) => void ) =>
		{
			// TODO: Custom errors
			
			xhr.onerror = (): void =>
			{
				throw new Error( 'An error occurred during the transaction.' );
			};
			xhr.onabort = (): void =>
			{
				throw new Error( 'The request was aborted.' );
			};
			xhr.onload = (): void =>
			{
				if ( xhr.status >= 500 )
				{
					throw new Error( 'Server error: ' + xhr.statusText );
				}
				if ( xhr.status >= 400 )
				{
					throw new Error( 'Request error: ' + xhr.statusText );
				}
				
				resolve( JSON.parse( xhr.responseText ) );
			};
		},
	);
	
	xhr.send( data );
	
	return promise;
}

/**
 * Send async GET request to server API.
 * 
 * @param path The path to request within API (part after `/api`).
 * @returns Parsed server response.
 */
const get = <T>( path: string ) => send<T>( 'GET', path );

/**
 * Send async POST request to server API.
 * 
 * @param path The path to request within API (part after `/api`).
 * @param data Data to send to the server.
 * @returns Parsed server response.
 */
const post = <T>( path: string, data: any ) => send<T>( 'POST', path, data );

/**
 * Send async POST request to server API.
 * 
 * @param path The path to request within API (part after `/api`).
 * @param data Data to send to the server.
 * @returns Parsed server response.
 */
const put = <T>( path: string, data: any ) => send<T>( 'PUT', path, data );

/**
 * Available HTTP methods.
 */
type HttpMethod = 'GET' | 'POST' | 'PUT';

/**
 * Module
 */
export {
	send,
	get,
	post,
	put,
	HttpMethod,
};
