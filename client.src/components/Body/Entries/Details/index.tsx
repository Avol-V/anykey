/**
 * Details of current entry.
 */
;

import {ComponentProps, h} from 'preact';
import {TreeDataEntry} from '../../../../interfaces/TreeData';
import Info from './Info/index';
import Toolbar from './Toolbar/index';

/**
 * Properties of Details section.
 */
type DetailsProps = TreeDataEntry & ComponentProps;

/**
 * Details of current entry.
 */
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

/**
 * Module
 */
export {
	Details as default,
	DetailsProps,
};
