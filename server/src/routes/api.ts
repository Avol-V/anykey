/**
 * API Router.
 * 
 * @module
 */
;

import * as Express from 'express';
import logoutRoute from './api/logout';

/**
 * API Router.
 */
const router = Express.Router();

router.get(
	'/tree',
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
