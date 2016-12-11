import * as Express from 'express';
// import * as FsAsync from './utils/FsAsync';
import * as Path from 'path';
import accountMiddleware from './middleware/account';
import authMiddleware from './middleware/auth';
import {middleware as sessionMiddleware} from './modules/Session';
import apiRouter from './routes/api';
import * as Otp from './utils/Otp';

const rootPath = Path.resolve( __dirname, '../' );
process.chdir( rootPath );

Otp.setAuthFile( Path.resolve( rootPath, 'data/auth.json' ) );

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
		/*Otp.generate( 'user' )
			.then( Otp.getQrCode )
			.then(
				( uri: string ) =>
					response.send( 'Hello World! <img src="' + uri + '" alt="" />' )
			)
			.catch(
				( error: Error ) =>
					response.send( String( error ) )
			);*/
	},
);

app.listen( process.env.PORT || 8080 );
