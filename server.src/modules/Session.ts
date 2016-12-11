/**
 * Module for mantain sessions.
 * 
 * @module
 */
;

import {randomBytes} from 'crypto';
import * as Session from 'express-session';

/**
 * Maximum interval from last user action, mses.
 */
const SESSION_LIFETIME = 5 * 60 * 1000;
/**
 * Minimum interval from last garbage collector check, mses.
 */
const GARBAGE_COLLECTOR_INTERVAL = 60 * 60 * 1000;

/**
 * Session store.
 */
const store = new Session.MemoryStore();
/**
 * Session options.
 */
const sessionOptions: Session.SessionOptions = {
	cookie: {
		httpOnly: true,
		path: '/',
		secure: ( process.env.NODE_ENV === 'production' ),
	},
	name: 'ANYKEYSESS',
	resave: false,
	saveUninitialized: false,
	secret: ( process.env.SESSION_SECRET || randomBytes( 64 ).toString( 'hex' ) ),
	store,
};
/**
 * Session middleware.
 */
const middleware = Session( sessionOptions );
/**
 * Timestamp of last Garbage Collector check.
 */
let lastGarbageCheck: number = Date.now();
/**
 * Sessions Garbage Collector.
 */
function garbageCollector(): void
{
	const timestamp = Date.now();
	
	if ( (lastGarbageCheck + GARBAGE_COLLECTOR_INTERVAL) > timestamp )
	{
		return;
	}
	
	lastGarbageCheck = timestamp;
	
	store.all( destroyOldSessions );
}

/**
 * Destroy expired sessions.
 * 
 * @param error Error object.
 * @param sessions Sessions list.
 */
function destroyOldSessions( error: Error,
	sessions: {[sid: string]: Express.Session} ): void
{
	if ( error )
	{
		console.error( error );
		return;
	}
	
	const timestamp = Date.now();
	
	for ( const id of Object.keys( sessions ) )
	{
		const session = sessions[id];
		
		if (
			!session['lastAccess']
			|| ( (session['lastAccess'] + SESSION_LIFETIME) < timestamp )
		)
		{
			store.destroy( id, errorHandler );
		}
	}
}

/**
 * Simple error handler.
 * 
 * @param error Error object.
 */
function errorHandler( error: Error ): void
{
	if ( error )
	{
		console.error( error );
	}
}

/**
 * Module
 */
export {
	SESSION_LIFETIME,
	middleware,
	garbageCollector,
};
