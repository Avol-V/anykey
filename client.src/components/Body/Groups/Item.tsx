/**
 * Groups list item.
 */
;

import {Component, ComponentProps, h} from 'preact';
import {TreeDataItem} from '../../../interfaces/TreeData';
import toHtmlId from '../../../utils/toHtmlId';

/**
 * Properties of Groups list item.
 */
interface ItemProps extends TreeDataItem, ComponentProps
{
	index: number;
	checked: boolean;
}

/**
 * Groups list item.
 */
class Item extends Component<ItemProps, void>
{
	public render(
		{name, icon, index, checked}: ItemProps,
	): JSX.Element
	{
		const inputId = 'groups-radio-' + toHtmlId( name );
		
		return (
			<li>
				<input type="radio" name="group"
					id={inputId}
					value={String( index )}
					checked={checked}
				/>
				<label for={inputId}>
					<span class="icon">
						<img src={icon || 'folder.svg'} alt="" />
					</span>
					<span class="name">{name}</span>
				</label>
			</li>
		);
	}
}

/**
 * Module
 */
export {
	Item as default,
	ItemProps,
};
