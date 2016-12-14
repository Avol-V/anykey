/**
 * Storage tree actions.
 * 
 * @module
 */
;

import * as Express from 'express';
import * as Path from 'path';
import * as FsAsync from '../../utils/FsAsync';

/**
 * Gets storage tree data.
 * 
 * @param _request Request object.
 * @param response Response object.
 */
async function get( _request: Express.Request,
	response: Express.Response ): Promise<void>
{
	const fileName = Path.join( process.cwd(), 'data/tree' );
	let content: string;
	
	try
	{
		content = await FsAsync.readFile( fileName, 'utf8' );
	}
	catch ( _error )
	{
		content = '';
	}
	
	response.send( content );
}

/**
 * Puts storage tree data.
 * 
 * @param _request Request object.
 * @param response Response object.
 */
async function put( request: Express.Request,
	response: Express.Response ): Promise<void>
{
	const fileName = Path.join( process.cwd(), 'data/tree' );
	
	if (
		!request.body
		|| ( typeof request.body !== 'string' )
	)
	{
		response.status( 400 );
		response.end();
		return;
	}
	
	try
	{
		await FsAsync.rename( fileName, fileName + `.${Date.now()}` );
	}
	catch ( _error )
	{
		// It's OK
	}
	
	try
	{
		await FsAsync.writeFile( fileName, request.body );
	}
	catch ( _error )
	{
		response.status( 500 );
	}
	finally
	{
		response.end();
	}
}

/**
 * Module
 */
export {
	get,
	put,
};
