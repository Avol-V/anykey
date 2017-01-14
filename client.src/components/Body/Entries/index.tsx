/**
 * Entries section.
 */
;

import {Component, ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../interfaces/TreeData';
import Details from './Details/index';
import Table from './Table/index';

/**
 * Properties of Entries section.
 */
interface EntriesProps extends ComponentProps
{
	/** Password entries in this group */
	entries: TreeDataEntry[];
	/** Index of current password entry */
	entryIndex: number;
	/** Handler of Entry changing */
	onEntryChange: ( event: Event ) => void;
}

/**
 * Entries section.
 */
class Entries extends Component<EntriesProps, void>
{
	/**
	 * Empty entry data (when no entry selected).
	 */
	private static readonly emptyEntry: TreeDataEntry = {
		id: -1,
		name: '',
	};
	
	/**
	 * Entries section.
	 */
	public constructor( props: EntriesProps )
	{
		super( props );
	}
	
	/**
	 * Render component.
	 */
	public render(
		{entries, entryIndex, onEntryChange}: EntriesProps,
	): JSX.Element
	{
		const entry = entries[entryIndex];
		
		return (
			<section class="entries">
				<h2>Password entries</h2>
				<Table
					entries={entries}
					entryIndex={entryIndex}
					onEntryChange={onEntryChange}
				/>
				<Details {
					...(
						entry
						? entry
						: Entries.emptyEntry
					)
				} />
			</section>
		);
	}
}

/**
 * Module
 */
export {
	Entries as default,
	EntriesProps,
};
