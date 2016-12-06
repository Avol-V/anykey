/**
 * Account management middleware.
 * @module
 */
;

import * as basicAuth from 'basic-auth';
import {ActionError, ActionNewAuth} from 'common/interfaces/actions';
import * as Express from 'express';
import * as Otp from '../utils/Otp';

/**
 * Account management middleware.
 * 
 * @param request Request object.
 * @param response Response object.
 * @param next Next middleware function.
 */
async function main( request: Express.Request, response: Express.Response,
	next: Express.NextFunction ): Promise<void>
{
	if ( await Otp.hasAuthData() )
	{
		next();
		return;
	}
	
	const credentials = basicAuth( request );
	
	if ( !credentials || !credentials.name )
	{
		authRequest( response );
		return;
	}
	
	await generateNewAuthData( credentials.name, response );
	response.end();
}

/**
 * Generate new User Authentication Data.
 * 
 * @param response Response object.
 */
async function generateNewAuthData(
	accountName: string,
	response: Express.Response,
): Promise<void>
{
	try
	{
		await Otp.generate( accountName );
		const uri = await Otp.getQrCode();
		response.json(
			{
				type: 'NEW_AUTH',
				uri,
			} as ActionNewAuth,
		);
	}
	catch ( error )
	{
		console.error( error );
		response.json(
			{
				error: 'Can\'t generate new User Authentication Data',
				type: 'ERROR',
			} as ActionError,
		);
	}
}

/**
 * Send Authentication request.
 * 
 * @param response Response object.
 */
function authRequest( response: Express.Response ): void
{
	response.statusCode = 401;
	response.setHeader(
		'WWW-Authenticate',
		'Basic realm="Specify your account name"',
	);
	response.end( 'Unauthorized' );
}

/**
 * Module
 */
export {
	main as default,
};
