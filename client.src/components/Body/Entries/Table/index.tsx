/**
 * Table of entries.
 */
;

import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import Row from './Row';

/**
 * Properties of Table of entries.
 */
interface TableProps extends ComponentProps
{
	/** Password entries in this group */
	entries: TreeDataEntry[];
	/** Index of current password entry */
	entryIndex: number;
	/** Handler of Entry changing */
	onEntryChange: ( event: Event ) => void;
}

/**
 * Table of entries.
 */
function Table( {entries, entryIndex, onEntryChange}: TableProps ): JSX.Element
{
	return (
		<table>
			<thead>
				<tr>
					<th class="name">Name</th>
					<th class="url">URL</th>
					<th class="created">Created</th>
					<th class="modified">Modified</th>
				</tr>
			</thead>
			<tbody onChange={onEntryChange}>
				{
					entries.map(
						( item: TreeDataEntry, index: number ) => (
							<Row
								key={String( item.id )}
								index={index}
								checked={entryIndex === index}
								{...item}
							/>
						),
					)
				}
			</tbody>
		</table>
	);
}

/**
 * Module
 */
export {
	Table as default,
	TableProps,
};
