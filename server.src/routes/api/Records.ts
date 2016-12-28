/**
 * Storage records actions.
 * 
 * @module
 */
;

import * as Express from 'express';
import * as Path from 'path';
import * as FsAsync from '../../utils/FsAsync';

/**
 * Gets storage record.
 * 
 * Route should be with `:name` parameter.
 * 
 * @param request Request object.
 * @param response Response object.
 */
async function get( request: Express.Request,
	response: Express.Response ): Promise<void>
{
	const name = request.params.name as string;
	
	if ( !/^\d+$/.test( name ) )
	{
		response.status( 400 );
		response.end();
		return;
	}
	
	const fileName = Path.join( process.cwd(), 'data/records', name );
	
	try
	{
		const content = await FsAsync.readFile( fileName, 'utf8' );
		response.send( content );
	}
	catch ( _error )
	{
		response.status( 404 );
		response.end();
	}
}

/**
 * Puts storage record.
 * 
 * @param request Request object.
 * @param response Response object.
 */
async function put( request: Express.Request,
	response: Express.Response ): Promise<void>
{
	if (
		!request.body
		|| ( typeof request.body !== 'string' )
	)
	{
		response.status( 400 );
		response.end();
		return;
	}
	
	const name = String( Date.now() );
	const fileName = Path.join( process.cwd(), 'data/records', name );
	let fileDescriptor: number | undefined;
	
	try
	{
		fileDescriptor = await FsAsync.open( fileName, 'wx' );
		await FsAsync.write( fileDescriptor, request.body );
	}
	catch ( error )
	{
		console.error( error );
		response.status( 500 );
	}
	finally
	{
		if ( fileDescriptor )
		{
			await FsAsync.close( fileDescriptor );
		}
		
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
