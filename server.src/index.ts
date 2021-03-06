/**
 * AnyKey – Password Manager with client-side encryption.
 */
;

import * as Express from 'express';
import * as Path from 'path';
import accountMiddleware from './middleware/account';
import authMiddleware from './middleware/auth';
import * as Otp from './modules/Otp';
import {middleware as sessionMiddleware} from './modules/Session';
import apiRouter from './routes/api';

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
app.use( '/api', sessionMiddleware );
app.use( '/api', accountMiddleware );
app.use( '/api', authMiddleware );
app.use( '/api', apiRouter );

app.use(
	( _request: Express.Request, response: Express.Response ) =>
	{
		response.status( 404 );
		
		response.format(
			{
				'text/plain': () => response.send( 'Not found' ),
				'text/html': () => response.sendFile(
					Path.resolve( rootPath, 'views/static/404.html' ),
				),
				'application/json': () => response.send(
					{error: 'Not found'},
				),
			},
		);
	},
);

app.listen( process.env.PORT || 8080 );
