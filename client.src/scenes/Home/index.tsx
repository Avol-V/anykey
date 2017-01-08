import {ComponentProps, h} from 'preact';
import Body from '../../components/Body/index';
import Footer from '../../components/Footer/index';
import Header from '../../components/Header/index';
import TreeData from '../../interfaces/TreeData';

interface HomeProps extends ComponentProps
{
	tree: TreeData;
}

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

export {
	Home as default,
	HomeProps,
};
