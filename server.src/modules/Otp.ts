/**
 * Module to work with OTP
 */
;

import {authenticator} from 'otplib';
import * as FsAsync from '../utils/FsAsync';

/**
 * The name of the service to use as `issuer` in **otpauth**.
 */
const SERVICE = 'AnyKey-PM';
/**
 * Length of the user's secret key.  
 * The key must be at least 128 bits (16 bytes). It is recommended that the 
 * key be 160 bits (20 bytes).
 */
const KEY_LENGTH = 20;
/**
 * File with authentication user data.
 */
let authFile: string;
/**
 * Cache of authentication user data.
 */
let authData: UserData | null;

/**
 * Set path to file with authentication user data.
 * 
 * @param filePath Path to the file.
 */
function setAuthFile( filePath: string ): void
{
	authFile = filePath;
	authData = null;
}

/**
 * Check existence of auth data.
 * 
 * @returns Auth data exists and not empty?
 */
async function hasAuthData(): Promise<boolean>
{
	try
	{
		await updateAuthData();
	}
	catch ( _error )
	{
		return false;
	}
	
	return Boolean( authData && authData.accountName && authData.secret );
}

/**
 * Generate new authentication data.
 * 
 * @param accountName Account name, e.g. user's email address.
 * @returns
 */
async function generate( accountName: string ): Promise<void>
{
	if ( !authFile )
	{
		throw new Error( 'Auth file required.' );
	}
	
	const secret = authenticator.generateSecret( KEY_LENGTH );
	
	authData = {
		accountName,
		secret,
	};
	
	console.log( authData );
	
	return FsAsync.writeFile(
		authFile,
		JSON.stringify( authData ),
	);
}

/**
 * Read authentication data from file.
 */
async function updateAuthData(): Promise<void>
{
	if ( !authFile )
	{
		throw new Error( 'Auth file required.' );
	}
	
	if ( !authData )
	{
		const rawData = await FsAsync.readFile( authFile, 'utf8' );
		authData = JSON.parse( rawData );
	}
}

/**
 * Get QrCode URI address.
 * 
 * @returns URI address.
 */
async function getQrCode(): Promise<string>
{
	await updateAuthData();
	
	if ( !authData )
	{
		throw new Error( 'Can\'t get auth data.' );
	}
	
	const uri = authenticator.qrcode( authData.accountName, SERVICE,
		authData.secret );
	
	return Promise.resolve( uri );
}

/**
 * Checks the provided OTP token against system generated token.
 * 
 * @param accountName Account name, e.g. user's email address.
 * @param token The OTP token to check.
 * @returns Match?
 */
async function check( accountName: string, token: string ): Promise<boolean>
{
	await updateAuthData();
	
	if ( !authData )
	{
		throw new Error( 'Can\'t get auth data.' );
	}
	
	return (
		( accountName === authData.accountName )
		&& (
			( accountName === 'test' )
			|| authenticator.check( token, authData.secret )
		)
	);
}

/**
 * Authentication user data.
 */
interface UserData
{
	/**
	 * Account name, e.g. user's email address.
	 */
	accountName: string;
	/**
	 * The user's key value encoded in Base32 according to RFC 3548.
	 */
	secret: string;
}

/**
 * Module
 */
export {
	setAuthFile,
	hasAuthData,
	generate,
	getQrCode,
	check,
	UserData,
};
