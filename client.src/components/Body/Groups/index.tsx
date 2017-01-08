import {ComponentProps, h} from 'preact';
import TreeData, {TreeDataItem} from '../../../interfaces/TreeData';
import Item from './Item';

interface GroupsProps extends ComponentProps
{
	tree: TreeData;
}

function Groups( {tree}: GroupsProps ): JSX.Element
{
	return (
		<aside class="groups">
			<h2>Groups</h2>
			<ul>
				{
					tree.map(
						( item: TreeDataItem ) => (
							<Item key={item.name} {...item} />
						),
					)
				}
			</ul>
		</aside>
	);
}

export {
	Groups as default,
	GroupsProps,
};
