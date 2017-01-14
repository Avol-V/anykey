/**
 * Item on header toolbar.
 */
;

import {ComponentProps, h} from 'preact';

/**
 * Properties of item on header toolbar.
 */
interface ItemProps extends ComponentProps
{
	/** HTML class name */
	className: string;
}

/**
 * Item on header toolbar.
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
