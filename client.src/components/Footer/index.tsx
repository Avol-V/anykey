/**
 * Application footer.
 */
;

import {ComponentProps, h} from 'preact';

/**
 * Properties of application footer.
 */
interface FooterProps extends ComponentProps
{
	/** Current status string */
	status: string;
}

/**
 * Application footer.
 */
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

/**
 * Module
 */
export {
	Footer as default,
	FooterProps,
};
