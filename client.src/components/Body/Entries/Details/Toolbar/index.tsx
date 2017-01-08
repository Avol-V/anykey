import {h} from 'preact';
import Item from './Item';

function Toolbar(): JSX.Element
{
	return (
		<ul class="toolbar">
			<Item className="login">Copy login</Item>
			<Item className="password">Copy password</Item>
		</ul>
	);
}

export {
	Toolbar as default,
};
