import {ComponentProps, h} from 'preact';
import {TreeDataItem} from '../../../interfaces/TreeData';
import toHtmlId from '../../../utils/toHtmlId';

type ItemProps = TreeDataItem & ComponentProps;

function Item( {name, icon}: ItemProps ): JSX.Element
{
	const inputId = 'groups-radio-' + toHtmlId( name );
	
	return (
		<li>
			<input type="radio" name="group" id={inputId} />
			<label for={inputId}>
				<span class="icon">
					<img src={icon || 'folder.svg'} alt="" />
				</span>
				<span class="name">{name}</span>
			</label>
		</li>
	);
}

export {
	Item as default,
	ItemProps,
};
