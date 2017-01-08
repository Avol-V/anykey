import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import Info from './Info/index';
import Toolbar from './Toolbar/index';

type DetailsProps = TreeDataEntry & ComponentProps;

function Details( entry: DetailsProps ): JSX.Element
{
	return (
		<aside class="details">
			<h3>{entry.name}</h3>
			<Toolbar />
			<Info {...entry} />
		</aside>
	);
}

export {
	Details as default,
	DetailsProps,
};
