import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../../interfaces/TreeData';
import printDate from '../../../../../utils/printDate';
import Item from './Item';

type InfoProps = TreeDataEntry & ComponentProps;

function Info( {id, url, history, expiration, description}: InfoProps ): JSX.Element
{
	const created = (
		( history && history[0] )
		? history[0]
		: id
	);
	
	return (
		<dl class="info">
			<Item className="url" name="URL">
				{
					url
					? <a href={url}>{url}</a>
					: ''
				}
			</Item>
			<Item className="creation" name="Creation">
				{printDate( new Date( created ), true )}
			</Item>
			<Item className="modification" name="Modification">
				{printDate( new Date( id ), true )}
			</Item>
			<Item className="expiration" name="Expiration">
				{
					expiration
					? printDate( new Date( expiration ), true )
					: 'Never'
				}
			</Item>
			<Item className="description" name="Description">
				{description}
			</Item>
		</dl>
	);
}

export {
	Info as default,
	InfoProps,
};
