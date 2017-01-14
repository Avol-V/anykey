import {ComponentProps, h} from 'preact';
import TreeData, {TreeDataItem} from '../../../interfaces/TreeData';
import Item from './Item';

interface GroupsProps extends ComponentProps
{
	tree: TreeData;
	groupIndex: number;
	onGroupClick: ( event: MouseEvent ) => void;
}

function Groups( {tree, groupIndex, onGroupClick}: GroupsProps ): JSX.Element
{
	return (
		<aside class="groups">
			<h2>Groups</h2>
			<ul>
				{
					tree.map(
						( item: TreeDataItem, index: number ) => (
							<Item
								key={item.name}
								index={index}
								checked={groupIndex === index}
								onGroupClick={onGroupClick}
								{...item}
							/>
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
