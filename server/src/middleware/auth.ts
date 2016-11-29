/**
 * Module with Authentication middleware.
 * @module
 */
;

import * as basicAuth from 'basic-auth';
import * as Express from 'express';
import * as Otp from '../utils/Otp';

/**
 * Maximum interval from last user action, mses.
 */
const SESSION_LIFETIME = 2 * 60 * 1000;

/**
 * Authentication middleware.
 * 
 * @param request Request object.
 * @param response Response object.
 * @param next Next middleware function.
 */
function main( request: Express.Request, response: Express.Response,
	next: Express.NextFunction ): void
{
	const session = request.session;
	
	if ( !session )
	{
		console.error( 'No session object' );
		next();
		return;
	}
	
	if (
		!session['lastAccess']
		|| ( (session['lastAccess'] + SESSION_LIFETIME) < Date.now() )
	)
	{
		const credentials = basicAuth( request );
		
		if ( !credentials )
		{
			authFail( response );
			return;
		}
		
		Otp.check( credentials.name, credentials.pass )
			.then(
				() =>
				{
					session['lastAccess'] = Date.now();
					next();
				},
			)
			.catch(
				( error: Error ) =>
				{
					if ( error instanceof Otp.AuthError )
					{
						authFail( response );
					}
					else
					{
						throw error;
					}
				},
			);
		
		return;
	}
	else
	{
		session['lastAccess'] = Date.now();
		next();
	}
}

/**
 * Send Authentication faild status.
 * 
 * @param response Response object.
 */
function authFail( response: Express.Response ): void
{
	response.statusCode = 401;
	response.setHeader(
		'WWW-Authenticate',
		'Basic realm="Authentication required"',
	);
	response.end( 'Unauthorized' );
}

/**
 * Module
 */
export {
	main as default,
};
