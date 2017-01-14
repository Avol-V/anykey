import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import Row from './Row';

interface TableProps extends ComponentProps
{
	entries: TreeDataEntry[];
	entryIndex: number;
	onEntryClick: ( event: MouseEvent ) => void;
}

function Table( {entries, entryIndex, onEntryClick}: TableProps ): JSX.Element
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
			<tbody>
				{
					entries.map(
						( item: TreeDataEntry, index: number ) => (
							<Row
								key={String( item.id )}
								index={index}
								checked={entryIndex === index}
								onEntryClick={onEntryClick}
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
