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
					onGroupClick={this.onGroupClick}
				/>
				<Entries
					entryIndex={entryIndex}
					onEntryClick={this.onEntryClick}
					entries={
						group
						? group.entries
						: []
					}
				/>
			</main>
		);
	}
	
	private onGroupClick = ( event: MouseEvent ): void =>
	{
		this.setState(
			{
				groupIndex: Number( (event.target as HTMLInputElement).value ),
				entryIndex: -1,
			} as BodyState,
		);
	}
	
	private onEntryClick = ( event: MouseEvent ): void =>
	{
		this.setState(
			{
				entryIndex: Number( (event.target as HTMLInputElement).value ),
			} as BodyState,
		);
	}
}

export {
	Body as default,
	BodyProps,
	BodyState,
};
