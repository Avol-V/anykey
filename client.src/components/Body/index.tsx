/**
 * Application body for home screen.
 */
;

import {Component, ComponentProps, h} from 'preact';
import TreeData from '../../interfaces/TreeData';
import Entries from './Entries/index';
import Groups from './Groups/index';

/**
 * Properties of Application body.
 */
interface BodyProps extends ComponentProps
{
	/** Passwords tree data */
	tree: TreeData;
}

/**
 * State of Application body.
 */
interface BodyState
{
	/** Index of current group */
	groupIndex: number;
	/** Index of current password entry */
	entryIndex: number;
}

/**
 * Application body for home screen.
 */
class Body extends Component<BodyProps, BodyState>
{
	/**
	 * Application body for home screen.
	 */
	public constructor( props: BodyProps )
	{
		super( props );
		
		this.state = {
			groupIndex: -1,
			entryIndex: -1,
		};
	}
	
	/**
	 * Render component
	 */
	public render( {tree}: BodyProps, {groupIndex, entryIndex}: BodyState ): JSX.Element
	{
		const group = tree[groupIndex];
		
		return (
			<main>
				<Groups
					tree={tree}
					groupIndex={groupIndex}
					onGroupChange={this.onGroupChange}
				/>
				<Entries
					entryIndex={entryIndex}
					onEntryChange={this.onEntryChange}
					entries={
						group
						? group.entries
						: []
					}
				/>
			</main>
		);
	}
	
	/**
	 * Handler of Group changing.
	 */
	private onGroupChange = ( event: Event ): void =>
	{
		const target = event.target as HTMLInputElement;
		
		if ( target.name !== 'group' )
		{
			return;
		}
		
		this.setState(
			{
				groupIndex: Number( (event.target as HTMLInputElement).value ),
				entryIndex: -1,
			} as BodyState,
		);
	}
	
	/**
	 * Handler of Entry changing.
	 */
	private onEntryChange = ( event: Event ): void =>
	{
		const target = event.target as HTMLInputElement;
		
		if ( target.name !== 'entry' )
		{
			return;
		}
		
		this.setState(
			{
				entryIndex: Number( target.value ),
			} as BodyState,
		);
	}
}

export {
	Body as default,
	BodyProps,
	BodyState,
};
