/**
 * Action interfaces.
 * 
 * @module
 */
;

/**
 * Common action interface.
 */
interface IAction
{
	type: string;
}

/**
 * Action with error.
 */
interface ActionError extends IAction
{
	/** Action type */
	type: 'ERROR';
	/** Error message */
	error: string;
};

/**
 * Action with new authentication data.
 */
interface ActionNewAuth extends IAction
{
	/** Action type */
	type: 'NEW_AUTH';
	/** URI to QR Code image */
	uri: string;
};

/**
 * Action with new account.
 */
interface ActionNewAccount extends IAction
{
	/** Action type */
	type: 'NEW_ACCOUNT';
	/** Account name */
	name: string;
};

/**
 * Action with request of new account name.
 */
interface ActionAccountRequired extends IAction
{
	/** Action type */
	type: 'ACCOUNT_REQUIRED';
};

/**
 * Module
 */
export {
	IAction,
	ActionError,
	ActionNewAuth,
	ActionNewAccount,
	ActionAccountRequired,
};
