import {ComponentProps, h} from 'preact';

interface ItemProps extends ComponentProps
{
	className: string;
	name: string;
}

function Item( {className, name, children}: ItemProps ): JSX.Element
{
	return (
		<div class={className}>
			<dt>{name}:</dt>
			<dd>{children}</dd>
		</div>
	);
}

export {
	Item as default,
	ItemProps,
};
