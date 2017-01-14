/**
 * Table of entries row.
 */
;

import {Component, ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import printDate from '../../../../utils/printDate';
import printUrl from '../../../../utils/printUrl';

/**
 * Properties of Table of entries row.
 */
interface RowProps extends TreeDataEntry, ComponentProps
{
	/** Index of row */
	index: number;
	/** Is row selected? */
	checked: boolean;
}

/**
 * Table of entries row.
 */
class Row extends Component<RowProps, void>
{
	public render(
		{id, name, icon, url, history, index, checked}: RowProps,
	): JSX.Element
	{
		const inputId = 'entries-radio-' + id;
		const created = (
			( history && history[0] )
			? history[0]
			: id
		);
		
		return (
			<tr>
				<td class="name">
					<span class="icon">
						<img src={icon || 'key.svg'} alt="" />
					</span>
					<input type="radio" name="entry"
						id={inputId}
						value={String( index )}
						checked={checked}
					/>
					<label for={inputId}>
						{name}
					</label>
				</td>
				<td class="url">
					{
						url
						? (
							<a href={url} tabIndex={-1}>
								{printUrl( url )}
							</a>
						)
						: ''
					}
				</td>
				<td class="created">
					{printDate( new Date( created ) )}
				</td>
				<td class="modified">
					{printDate( new Date( id ) )}
				</td>
			</tr>
		);
	}
}

/**
 * Module
 */
export {
	Row as default,
	RowProps,
};
