import {h} from 'preact';
import Item from './Item';

function Toolbar(): JSX.Element
{
	return (
		<ul class="toolbar">
			<Item className="new-group">Add new group</Item>
			<Item className="edit-group">Edit group</Item>
			<Item className="new-entry">Add new entry</Item>
			<Item className="edit-entry">Edit entry</Item>
		</ul>
	);
}

export {
	Toolbar as default,
};
