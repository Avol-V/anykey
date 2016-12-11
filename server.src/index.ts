/**
 * AnyKey – Password Manager with client-side encryption.
 */
;

import * as Express from 'express';
import * as Path from 'path';
import accountMiddleware from './middleware/account';
import authMiddleware from './middleware/auth';
import {middleware as sessionMiddleware} from './modules/Session';
import apiRouter from './routes/api';
import * as Otp from './utils/Otp';

/**
 * Application root directory
 */
const rootPath = Path.resolve( __dirname, '../' );
process.chdir( rootPath );

// Setting up working directories

Otp.setAuthFile( Path.resolve( rootPath, 'data/auth.json' ) );

// Initializing application

const app = Express();

if ( app.get( 'env' ) === 'production' )
{
	app.set( 'trust proxy', 1 );
}

app.use( Express.static( Path.resolve( rootPath, 'public' ) ) );
app.use( sessionMiddleware );
app.use( accountMiddleware );
app.use( authMiddleware );
app.use( '/api', apiRouter );

app.get(
	'/test',
	( _request: Express.Request, response: Express.Response ) =>
	{
		response.send( 'Hello World!' );
	},
);

app.listen( process.env.PORT || 8080 );
