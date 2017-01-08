import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import Row from './Row';

interface TableProps extends ComponentProps
{
	entries: TreeDataEntry[];
}

function Table( {entries}: TableProps ): JSX.Element
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
						( item: TreeDataEntry ) => (
							<Row key={String( item.id )} {...item} />
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
