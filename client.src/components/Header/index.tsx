/**
 * Application header.
 */
;

import {h} from 'preact';
import Toolbar from './Toolbar/index';

/**
 * Application header.
 */
function Header(): JSX.Element
{
	return (
		<header>
			<h1>AnyKey</h1>
			<Toolbar />
		</header>
	);
}

/**
 * Module
 */
export {
	Header as default,
};
