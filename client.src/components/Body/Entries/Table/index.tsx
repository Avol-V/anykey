import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import Row from './Row';

interface TableProps extends ComponentProps
{
	entries: TreeDataEntry[];
	entryIndex: number;
	onEntryChange: ( event: Event ) => void;
}

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

export {
	Table as default,
	TableProps,
};
