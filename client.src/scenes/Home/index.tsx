/**
 * Application home screen.
 */
;

import {Component, ComponentProps, h} from 'preact';
import Body from '../../components/Body/index';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import TreeData from '../../interfaces/TreeData';
import {get} from '../../utils/ServerApi';

/**
 * Properties of Home screen.
 */
type HomeProps = ComponentProps;

/**
 * State of Home screen.
 */
interface HomeState
{
	/** Passwords tree data */
	tree: TreeData;
	/** Application status message */
	status: string;
}

/**
 * Application home screen.
 */
class Home extends Component<HomeProps, HomeState>
{
	/**
	 * Application home screen.
	 */
	public constructor( props: HomeProps )
	{
		super( props );
		
		this.state = {
			tree: [],
			status: '',
		};
	}
	
	/**
	 * Added to DOM
	 */
	public async componentDidMount(): Promise<void>
	{
		const tree = await get( '/tree' );
		
		this.setState(
			{tree} as HomeState,
		);
	}
	
	/**
	 * Render component
	 */
	public render( _props: HomeProps, {tree, status}: HomeState ): JSX.Element
	{
		return (
			<div id="application">
				<Header />
				<Body tree={tree} />
				<Footer status={status} />
			</div>
		);
	}
}

/**
 * Module
 */
export {
	Home as default,
	HomeProps,
};
