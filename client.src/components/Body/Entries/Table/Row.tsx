import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import printDate from '../../../../utils/printDate';
import printUrl from '../../../../utils/printUrl';

type RowProps = TreeDataEntry & ComponentProps;

function Row( {id, name, icon, url, history}: RowProps ): JSX.Element
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
				<input type="radio" name="entry" id={inputId} />
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

export {
	Row as default,
	RowProps,
};
