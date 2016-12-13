/**
 * API Router.
 * 
 * @module
 */
;

import * as BodyParser from 'body-parser';
import * as Express from 'express';
import logoutRoute from './api/logout';
import * as TreeRoutes from './api/Tree';

/**
 * API Router.
 */
const router = Express.Router();
// /**
//  * Create application/json parser
//  */
// const jsonParser = BodyParser.json();
/**
 * Create raw body parser
 */
const rawParser = BodyParser.text( {type: 'text/plain'} );

router.get( '/tree', TreeRoutes.get );
router.put( '/tree', rawParser, TreeRoutes.put );
router.get( '/logout', logoutRoute );

/**
 * Module
 */
export {
	router as default,
};
