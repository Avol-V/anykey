import {h} from 'preact';
import Toolbar from './Toolbar/index';

function Header(): JSX.Element
{
	return (
		<header>
			<h1>AnyKey</h1>
			<Toolbar />
		</header>
	);
}

export {
	Header as default,
};
