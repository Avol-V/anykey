/**
 * Item on Entry details toolbar.
 */
;

import {ComponentProps, h} from 'preact';

/**
 * Properties of Item on Entry details toolbar.
 */
interface ItemProps extends ComponentProps
{
	/** HTML class name */
	className: string;
}

/**
 * Item on Entry details toolbar.
 */
function Item( {className, children}: ItemProps ): JSX.Element
{
	return (
		<li class={className}>
			<button type="button">{children}</button>
		</li>
	);
}

/**
 * Module
 */
export {
	Item as default,
	ItemProps,
};
