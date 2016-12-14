/**
 * File I/O module with Promises.
 * 
 * `promisify` function cannot work properly with overloads,
 * so we need to specify types manually.
 * 
 * @module
 */
;

import * as Fs from 'fs';
// import * as Path from 'path';
import promisify from './promisify';

/**
 * Asynchronously reads the entire contents of a file.
 */
const readFile: {
		/**
		 * Asynchronously reads the entire contents of a file.
		 * 
		 * @param filename File name or file descriptor
		 * @returns Raw buffer
		 */
		( filename: string ): Promise<Buffer>;
		/**
		 * Asynchronously reads the entire contents of a file.
		 * 
		 * @param filename File name or file descriptor
		 * @param encoding File encoding (e.g. `'utf8'`)
		 * @returns String contents
		 */
		( filename: string, encoding: string ): Promise<string>;
		/**
		 * Asynchronously reads the entire contents of a file.
		 * 
		 * @param filename File name or file descriptor
		 * @param options Options, default: `{encoding: null, flag: 'r'}`
		 * @returns String contents
		 */
		( filename: string, options: { encoding?: string; flag?: string; } ): Promise<string>;
	}
	= promisify( Fs.readFile ) as any;

/**
 * Asynchronously writes data to a file, replacing the file if it already exists.
 */
const writeFile:
	/**
	 * Asynchronously writes data to a file, replacing the file if it already exists.
	 * 
	 * @param filename File name or file descriptor
	 * @param data Data to write (the `encoding` option is ignored if data is a buffer)
	 * @param options Options, default: `{encoding: 'utf8', mode: 0o666, flag: 'w'}`
	 */
	(
		filename: string,
		data: string | Buffer,
		options?: { encoding?: string; mode?: number | string; flag?: string; } | string,
	) => Promise<void>
	= promisify( Fs.writeFile ) as any;

/**
 * Asynchronous rename – change the name or location of a file.
 */
const rename:
	/**
	 * Asynchronous rename – change the name or location of a file.
	 * 
	 * @param oldPath Original file path.
	 * @param newPath New file path.
	 */
	(
		oldPath: string,
		newPath: string,
	) => Promise<void>
	= promisify( Fs.rename );

/**
 * Asynchronous file open.
 * 
 * `flags` can be:
 * - `'r'` - Open file for reading. An exception occurs if the file
 *   does not exist.
 * - `'r+'` - Open file for reading and writing. An exception occurs
 *   if the file does not exist.
 * - `'rs+'` - Open file for reading and writing in synchronous mode.
 *   Instructs the operating system to bypass the local file system cache.
 * - `'w'` - Open file for writing. The file is created
 *   (if it does not exist) or truncated (if it exists).
 * - `'wx'` - Like 'w' but fails if path exists.
 * - `'w+'` - Open file for reading and writing. The file is created
 *   (if it does not exist) or truncated (if it exists).
 * - `'wx+'` - Like 'w+' but fails if path exists.
 * - `'a'` - Open file for appending. The file is created if it
 *   does not exist.
 * - `'ax'` - Like 'a' but fails if path exists.
 * - `'a+'` - Open file for reading and appending. The file is created
 *   if it does not exist.
 * - `'ax+'` - Like 'a+' but fails if path exists.
 */
const open:
	/**
	 * Asynchronous file open.
	 * 
	 * `flags` can be:
	 * - `'r'` - Open file for reading. An exception occurs if the file
	 *   does not exist.
	 * - `'r+'` - Open file for reading and writing. An exception occurs
	 *   if the file does not exist.
	 * - `'rs+'` - Open file for reading and writing in synchronous mode.
	 *   Instructs the operating system to bypass the local file system cache.
	 * - `'w'` - Open file for writing. The file is created
	 *   (if it does not exist) or truncated (if it exists).
	 * - `'wx'` - Like 'w' but fails if path exists.
	 * - `'w+'` - Open file for reading and writing. The file is created
	 *   (if it does not exist) or truncated (if it exists).
	 * - `'wx+'` - Like 'w+' but fails if path exists.
	 * - `'a'` - Open file for appending. The file is created if it
	 *   does not exist.
	 * - `'ax'` - Like 'a' but fails if path exists.
	 * - `'a+'` - Open file for reading and appending. The file is created
	 *   if it does not exist.
	 * - `'ax+'` - Like 'a+' but fails if path exists.
	 * 
	 * @param path File path.
	 * @param flags Flags to use (r, r+, rs+, w, wx, w+, wx+, a, ax, a+, ax+).
	 * @param mode Sets the file mode (permission and sticky bits), but only
	 *  if the file was created. It defaults to `0666`, readable and writable.
	 * @returns File descriptor.
	 */
	(
		path: string | Buffer,
		flags: string | number,
		mode?: number,
	) => Promise<number>
	= promisify( Fs.open );


/**
 * Asynchronous file close.
 */
const close:
	/**
	 * Asynchronous file close.
	 * 
	 * @param fd File descriptor.
	 */
	( fd: number ) => Promise<void>
	= promisify( Fs.close );

/**
 * Module
 */
export {
	readFile,
	writeFile,
	rename,
	open,
	close,
};
