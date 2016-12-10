/**
 * API Router.
 * 
 * @module
 */
;

import * as BodyParser from 'body-parser';
import * as Express from 'express';
import logoutRoute from './api/logout';

/**
 * API Router.
 */
const router = Express.Router();
/**
 * Create application/json parser
 */
const jsonParser = BodyParser.json();

router.get(
	'/tree',
	jsonParser,
	( _request: Express.Request, response: Express.Response ) =>
	{
		response.end();
	},
);
router.get( '/logout', logoutRoute );

/**
 * Module
 */
export {
	router as default,
};
