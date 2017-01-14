/**
 * Item in Entry details list.
 */
;

import {ComponentProps, h} from 'preact';

/**
 * Properties of Item in Entry details list.
 */
interface ItemProps extends ComponentProps
{
	/** HTML class name */
	className: string;
	/** Item name */
	name: string;
}

/**
 * Item in Entry details list.
 */
function Item( {className, name, children}: ItemProps ): JSX.Element
{
	return (
		<div class={className}>
			<dt>{name}:</dt>
			<dd>{children}</dd>
		</div>
	);
}

/**
 * Module
 */
export {
	Item as default,
	ItemProps,
};
