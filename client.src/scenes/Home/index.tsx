/**
 * Application home screen.
 */
;

import {ComponentProps, h} from 'preact';
import Body from '../../components/Body/index';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import TreeData from '../../interfaces/TreeData';

/**
 * Properties of Home screen.
 */
interface HomeProps extends ComponentProps
{
	/** Passwords tree data */
	tree: TreeData;
}

/**
 * Application home screen.
 */
function Home( {tree}: HomeProps ): JSX.Element
{
	return (
		<div id="application">
			<Header />
			<Body tree={tree} />
			<Footer status="Data received."/>
		</div>
	);
}

/**
 * Module
 */
export {
	Home as default,
	HomeProps,
};
