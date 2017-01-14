import {Component, ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../interfaces/TreeData';
import Details from './Details/index';
import Table from './Table/index';

interface EntriesProps extends ComponentProps
{
	entries: TreeDataEntry[];
	entryIndex: number;
	onEntryChange: ( event: Event ) => void;
}

class Entries extends Component<EntriesProps, void>
{
	private static readonly emptyEntry: TreeDataEntry = {
		id: -1,
		name: '',
	};
	
	public constructor( props: EntriesProps )
	{
		super( props );
	}
	
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

export {
	Entries as default,
	EntriesProps,
};
