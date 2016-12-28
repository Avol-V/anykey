/**
 * API Router.
 * 
 * @module
 */
;

import * as BodyParser from 'body-parser';
import * as Express from 'express';
import logoutRoute from './api/logout';
import * as RecordsRoutes from './api/Records';
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
 * Create text body parser
 */
const textParser = BodyParser.text( {type: 'text/plain'} );

router.get( '/tree', TreeRoutes.get );
router.put( '/tree', textParser, TreeRoutes.put );
router.get( '/records/:name', RecordsRoutes.get );
router.put( '/records', textParser, RecordsRoutes.put );
router.get( '/logout', logoutRoute );

/**
 * Module
 */
export {
	router as default,
};
