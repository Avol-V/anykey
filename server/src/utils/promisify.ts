/**
 * Returns a function that will wrap the given `nodeFunction`. Instead 
 * of taking a callback, the returned function will return a promise whose 
 * fate is decided by the callback behavior of the given node function. 
 * The node function should conform to node.js convention of accepting 
 * a callback as last argument and calling that callback with error 
 * as the first argument and success value on the second argument.
 * 
 * If the `nodeFunction` calls its callback with multiple success values, 
 * the fulfillment value will be the first fulfillment item.
 * 
 * Setting `multiArgs` to `true` means the resulting promise will always 
 * fulfill with an array of the callback's success value(s). This is needed 
 * because promises only support a single success value while some callback 
 * API's have multiple success value. The default is to ignore all but 
 * the first success value of a callback function.
 * 
 * If you pass a `thisArg`, the `nodeFunction` will be called as a method 
 * on the `thisArg`.
 * 
 * @module
 */
;

/**
 * Default options of `promisify` function
 */
const DEFAULT_OPTIONS: PromisifyOptions = {
	multiArgs: false,
	thisArg: null,
};

/**
 * Transforms callback-based function into an Promise-based.
 * 
 * @param nodeFunction The function to promisify
 * @param options Object with options
 * @returns A promisified version of `nodeFunction`
 */
function promisify<T>(
	nodeFunction: (
		callback: ( error: any, result: T ) => void,
	) => void,
	options?: PromisifyOptions,
): () => Promise<T>;
/**
 * Transforms callback-based function into an Promise-based.
 * 
 * @param nodeFunction The function to promisify
 * @param options Object with options
 * @returns A promisified version of `nodeFunction`
 */
function promisify<T, A1>(
	nodeFunction: (
		arg1: A1,
		callback: ( error: any, result: T ) => void,
	) => void,
	options?: PromisifyOptions,
): (arg1: A1) => Promise<T>;
/**
 * Transforms callback-based function into an Promise-based.
 * 
 * @param nodeFunction The function to promisify
 * @param options Object with options
 * @returns A promisified version of `nodeFunction`
 */
function promisify<T, A1, A2>(
	nodeFunction: (
		arg1: A1,
		arg2: A2,
		callback: ( error: any, result: T ) => void,
	) => void,
	options?: PromisifyOptions,
): (arg1: A1, arg2: A2) => Promise<T>;
/**
 * Transforms callback-based function into an Promise-based.
 * 
 * @param nodeFunction The function to promisify
 * @param options Object with options
 * @returns A promisified version of `nodeFunction`
 */
function promisify<T, A1, A2, A3>(
	nodeFunction: (
		arg1: A1,
		arg2: A2,
		arg3: A3,
		callback: ( error: any, result: T ) => void,
	) => void,
	options?: PromisifyOptions,
): (arg1: A1, arg2: A2, arg3: A3) => Promise<T>;
/**
 * Transforms callback-based function into an Promise-based.
 * 
 * @param nodeFunction The function to promisify
 * @param options Object with options
 * @returns A promisified version of `nodeFunction`
 */
function promisify<T, A1, A2, A3, A4>(
	nodeFunction: (
		arg1: A1,
		arg2: A2,
		arg3: A3,
		arg4: A4,
		callback: ( error: any, result: T ) => void,
	) => void,
	options?: PromisifyOptions,
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4) => Promise<T>;
/**
 * Transforms callback-based function into an Promise-based.
 * 
 * @param nodeFunction The function to promisify
 * @param options Object with options
 * @returns A promisified version of `nodeFunction`
 */
function promisify<T, A1, A2, A3, A4, A5>(
	nodeFunction: (
		arg1: A1,
		arg2: A2,
		arg3: A3,
		arg4: A4,
		arg5: A5,
		callback: ( error: any, result: T ) => void,
	) => void,
	options?: PromisifyOptions,
): (arg1: A1, arg2: A2, arg3: A3, arg4: A4, arg5: A5) => Promise<T>;
/**
 * Transforms callback-based function into an Promise-based.
 * 
 * @param nodeFunction The function to promisify
 * @param options Object with options
 * @returns A promisified version of `nodeFunction`
 */
function promisify(
	nodeFunction: Function,
	options?: PromisifyOptions,
): Function
{
	const allOptions = Object.assign( {}, DEFAULT_OPTIONS, options );
	
	return ( ...args: any[] ) =>
	{
		return new Promise(
			( resolve: Function, reject: Function ): void =>
			{
				args.push(
					( error: any, ...results: any[] ) => (
						error
						? reject( error )
						: (
							allOptions.multiArgs
							? resolve( results )
							: resolve( results[0] )
						)
					),
				);
				nodeFunction.apply( allOptions.thisArg, args );
			},
		);
	};
}

/**
 * Options to use with `promisify`
 */
interface PromisifyOptions
{
	/**
	 * A `this` context to use with function
	 */
	thisArg?: any;
	/**
	 * Should multiple arguments be returned as an array?
	 */
	multiArgs?: boolean;
}

/**
 * Module
 */
export {
	promisify as default,
};
