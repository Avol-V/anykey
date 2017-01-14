/**
 * Entry details toolbar.
 */
;

import {h} from 'preact';
import Item from './Item';

/**
 * Entry details toolbar.
 */
function Toolbar(): JSX.Element
{
	return (
		<ul class="toolbar">
			<Item className="login">Copy login</Item>
			<Item className="password">Copy password</Item>
		</ul>
	);
}

/**
 * Module
 */
export {
	Toolbar as default,
};
