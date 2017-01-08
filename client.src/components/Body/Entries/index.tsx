import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../interfaces/TreeData';
import Details from './Details/index';
import Table from './Table/index';

interface EntriesProps extends ComponentProps
{
	entries: TreeDataEntry[];
}

function Entries( {entries}: EntriesProps ): JSX.Element
{
	return (
		<section class="entries">
			<h2>Password entries</h2>
			<Table entries={entries} />
			<Details {...entries[0]} />
		</section>
	);
}

export {
	Entries as default,
	EntriesProps,
};
