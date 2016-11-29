/**
 * File I/O module with Promises
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
	= promisify<Buffer, string>( Fs.readFile );

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
		options?: { encoding?: string; mode?: number | string; flag?: string; } | string
	) => Promise<void>
	= promisify<
		void,
		string,
		string | Buffer,
		{ encoding?: string; mode?: number | string; flag?: string; } | string
	>( Fs.writeFile as any );

/**
 * Module
 */
export {
	readFile,
	writeFile,
};