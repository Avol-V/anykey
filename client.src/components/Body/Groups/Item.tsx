import {Component, ComponentProps, h} from 'preact';
import {TreeDataItem} from '../../../interfaces/TreeData';
import toHtmlId from '../../../utils/toHtmlId';

interface ItemProps extends TreeDataItem, ComponentProps
{
	index: number;
	checked: boolean;
	onGroupClick: ( event: MouseEvent ) => void;
}

class Item extends Component<ItemProps, void>
{
	public render(
		{name, icon, index, checked, onGroupClick}: ItemProps
	): JSX.Element
	{
		const inputId = 'groups-radio-' + toHtmlId( name );
		
		return (
			<li>
				<input type="radio" name="group"
					id={inputId}
					value={String( index )}
					checked={checked}
					onClick={onGroupClick}
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

export {
	Item as default,
	ItemProps,
};
