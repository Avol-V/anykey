import {Component, ComponentProps, h} from 'preact';
import TreeData from '../../interfaces/TreeData';
import Entries from './Entries/index';
import Groups from './Groups/index';

interface BodyProps extends ComponentProps
{
	tree: TreeData;
}

interface BodyState
{
	groupIndex: number;
	entryIndex: number;
}

class Body extends Component<BodyProps, BodyState>
{
	public constructor( props: BodyProps )
	{
		super( props );
		
		this.state = {
			groupIndex: -1,
			entryIndex: -1,
		};
	}
	
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
