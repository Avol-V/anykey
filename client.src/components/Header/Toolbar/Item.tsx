import {ComponentProps, h} from 'preact';

interface ItemProps extends ComponentProps
{
	className: string;
}

function Item( {className, children}: ItemProps ): JSX.Element
{
	return (
		<li class={className}>
			<button type="button">{children}</button>
		</li>
	);
}

export {
	Item as default,
	ItemProps,
};
