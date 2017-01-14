/**
 * Groups list section.
 */
;

import {ComponentProps, h} from 'preact';
import TreeData, {TreeDataItem} from '../../../interfaces/TreeData';
import Item from './Item';

/**
 * Properties of Groups list section.
 */
interface GroupsProps extends ComponentProps
{
	/** Passwords tree data */
	tree: TreeData;
	/** Index of current group */
	groupIndex: number;
	/** Handler of Group changing */
	onGroupChange: ( event: Event ) => void;
}

/**
 * Groups list section.
 */
function Groups( {tree, groupIndex, onGroupChange}: GroupsProps ): JSX.Element
{
	return (
		<aside class="groups">
			<h2>Groups</h2>
			<ul onChange={onGroupChange}>
				{
					tree.map(
						( item: TreeDataItem, index: number ) => (
							<Item
								key={item.name}
								index={index}
								checked={groupIndex === index}
								{...item}
							/>
						),
					)
				}
			</ul>
		</aside>
	);
}

/**
 * Module
 */
export {
	Groups as default,
	GroupsProps,
};
