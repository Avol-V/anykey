/**
 * Entry details list.
 */
;

import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../../interfaces/TreeData';
import printDate from '../../../../../utils/printDate';
import Item from './Item';

/**
 * Properties of Entry details list.
 */
type InfoProps = TreeDataEntry & ComponentProps;

/**
 * Entry details list.
 */
function Info( {id, url, history, expiration, description}: InfoProps ): JSX.Element
{
	const created = (
		( history && history[0] )
		? history[0]
		: id
	);
	const empty = (id < 0);
	
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
				{
					empty
					? ''
					: printDate( new Date( created ), true )
				}
			</Item>
			<Item className="modification" name="Modification">
				{
					empty
					? ''
					: printDate( new Date( id ), true )
				}
			</Item>
			<Item className="expiration" name="Expiration">
				{
					empty
					? ''
					: expiration
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

/**
 * Module
 */
export {
	Info as default,
	InfoProps,
};
