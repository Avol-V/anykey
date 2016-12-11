/**
 * Module with Authentication middleware.
 * @module
 */
;

import * as basicAuth from 'basic-auth';
import * as Express from 'express';
import * as Otp from '../modules/Otp';
import {garbageCollector, SESSION_LIFETIME} from '../modules/Session';

/**
 * Authentication middleware.
 * 
 * @param request Request object.
 * @param response Response object.
 * @param next Next middleware function.
 */
async function main( request: Express.Request, response: Express.Response,
	next: Express.NextFunction ): Promise<void>
{
	const session = request.session;
	
	if ( !session )
	{
		console.error( 'No session object' );
		next();
		return;
	}
	
	garbageCollector();
	
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
		
		if ( await Otp.check( credentials.name, credentials.pass ) )
		{
			session['lastAccess'] = Date.now();
			next();
		}
		else
		{
			authFail( response );
		}
		
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
