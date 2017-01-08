import {ComponentProps, h} from 'preact';
import TreeData from '../../interfaces/TreeData';
import Entries from './Entries/index';
import Groups from './Groups/index';

interface BodyProps extends ComponentProps
{
	tree: TreeData;
}

function Body( {tree}: BodyProps ): JSX.Element
{
	return (
		<main>
			<Groups tree={tree} />
			<Entries entries={tree[0].entries} />
		</main>
	);
}

export {
	Body as default,
	BodyProps,
};
