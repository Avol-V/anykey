import {ComponentProps, h} from 'preact';

interface FooterProps extends ComponentProps
{
	status: string;
}

function Footer( {status}: FooterProps ): JSX.Element
{
	return (
		<footer>
			<p class="status">
				{status}
			</p>
		</footer>
	);
}

export {
	Footer as default,
	FooterProps,
};
