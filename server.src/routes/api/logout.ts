/**
 * Logout action.
 * 
 * @module
 */
;

import * as Express from 'express';

/**
 * Logout from service.
 * 
 * @param request Request object.
 * @param response Response object.
 */
function main( request: Express.Request, response: Express.Response ): void
{
	if ( !request.session )
	{
		response.end();
		return;
	}
	
	request.session.destroy(
		( error: Error ) =>
		{
			if ( error )
			{
				console.error( error );
				response.statusCode = 500;
			}
			
			response.end();
		},
	);
}

/**
 * Module
 */
export {
	main as default,
};
