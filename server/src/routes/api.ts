/**
 * API Router.
 * 
 * @module
 */
;

import * as Express from 'express';

const router = Express.Router();

router.get(
	'/tree',
	( _request: Express.Request, response: Express.Response ) =>
	{
		response.end();
	},
);

/**
 * Module
 */
export {
	router as default,
};
