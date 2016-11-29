/**
 * Time-based (TOTP) and HMAC-based (HOTP) One-Time Password library
 * 
 * @package otplib
 * @version 3.0.2
 * @see https://www.npmjs.com/package/otplib
 */
declare module 'otplib'
{
	/**
	 *
	 * HMAC-based One-time Password Algorithm
	 *
	 * References
	 * --------------------------
	 * - http://en.wikipedia.org/wiki/HMAC-based_One-time_Password_Algorithm
	 * - http://tools.ietf.org/html/rfc4226
	 *
	 * Algorithm
	 * --------------------------
	 * ```
	 *  K be a secret secret
	 *  C be a counter
	 *  HMAC(K,C) = SHA1(K & 0x5c5c... | SHA1(K & 0x3636... | C))
	 *  be an HMAC calculated with the SHA-1 cryptographic hash algorithm
	 *  Truncate be a function that selects 4 bytes from the result of the
	 *  HMAC in a defined manner
	 *  HOTP(K,C) = Truncate(HMAC(K,C)) & 0x7FFFFFFF
	 *  HOTP-Value = HOTP(K,C) mod 10d, where d is the desired number of digits
	 * ```
	 *
	 * @class HOTP
	 * @since 3.0.0
	 * @author Gerald Yeo
	 * @license MIT
	 *
	 */
	class HOTP
	{
		/**
		 * HMAC-based One-time Password Algorithm
		 */
		constructor();
		
		/**
		 * Option Setter
		 * 
		 * @param otp Custom options, default = `{digits: 6}`
		 */
		options( otp: {digits: number} ): void;
		
		/**
		 * Generates the OTP code
		 * 
		 * @param secret Your secret that is used to generate the token
		 * @param counter The OTP counter (usually it's an incremental count)
		 * @returns OTP Code
		 */
		generate( secret: string, counter: number ): number;
		
		/**
		 * Checks the provided OTP token against system generated token
		 * 
		 * @param token The OTP token to check
		 * @param secret Your secret that is used to generate the token
		 * @param counter The OTP counter (usually it's an incremental count)
		 * @returns Match?
		 */
		check( token: string, secret: string, counter: number ): boolean;
	}
	
	/**
	 *
	 * Time-based One-time Password Algorithm
	 *
	 * References
	 * --------------------------
	 * - http://en.wikipedia.org/wiki/Time-based_One-time_Password_Algorithm
	 * - http://tools.ietf.org/html/rfc6238
	 *
	 *
	 * Algorithm
	 * --------------------------
	 * ```
	 *  T0 be an epoch
	 *  TS be the time stemp
	 *  TC be the current timestamp turned into an int, using defined T0, counting in TS units
	 *  TC = (unixtime(now) - unixtime(T0)) / TS
	 *  TOTP = HOTP(secretsecret, TC), where the HOTP algorithm is defined below.
	 *  TOTP-Value = TOTP mod 10d, where d is the desired number of digits of the one-time password.
	 * ```
	 *
	 * @class TOTP
	 * @extends {HOTP}
	 * @since 3.0.0
	 * @author Gerald Yeo
	 * @license MIT
	 *
	 */
	class TOTP extends HOTP
	{
		/**
		 * Time-based One-time Password Algorithm
		 */
		constructor();
		
		/**
		 * Option Setter
		 * 
		 * @param otp Custom options, default = `{digits: 6, step: 30, epoch: null}`
		 */
		options( otp: {digits?: number, step?: number, epoch?: number} ): void;
		
		/**
		 * Generates the OTP code
		 * 
		 * @param secret Your secret that is used to generate the token
		 * @returns OTP Code
		 */
		generate( secret: string ): number;
		
		/**
		 * Checks the provided OTP token against system generated token
		 * 
		 * @param token The OTP token to check
		 * @param secret Your secret that is used to generate the token
		 * @returns Match?
		 */
		check( token: string, secret: string ): boolean;
	}
	
	/**
	 *
	 * Google Authenticator adapter
	 *
	 * References
	 * --------------------------
	 * - http://en.wikipedia.org/wiki/Google_Authenticator
	 *
	 * Algorithm
	 * --------------------------
	 * ```
	 *  secret := base32decode(secret)
	 *  message := floor(current Unix time / 30)
	 *  hash := HMAC-SHA1(secret, message)
	 *  offset := last nibble of hash
	 *  truncatedHash := hash[offset..offset+3]  //4 bytes starting at the offset
	 *  set the first bit of truncatedHash to zero  //remove the most significant bit
	 *  code := truncatedHash mod 1000000
	 *  pad code with 0 until length of code is 6
	 *
	 *  return code
	 * ```
	 *
	 * @class Authenticator
	 * @extends {TOTP}
	 * @since 3.0.0
	 * @author Gerald Yeo
	 * @license MIT
	 *
	 */
	class Authenticator extends TOTP
	{
		/**
		 * Google Authenticator adapter
		 */
		constructor();
		
		/**
		 * Option Setter
		 * 
		 * @param otp Custom options, default = `{digits: 6, step: 30, epoch: null, 
		 *  chart: 'https://chart.googleapis.com/chart?cht=qr&chs=150x150&choe=UTF-8&chld=M|0&chl=%uri'}`
		 */
		options( otp: {digits?: number, step?: number, epoch?: number, chart?: string} ): void;
		
		/**
		 * Generates an otpauth uri
		 * 
		 * @param user The name/id of your user (default = `'user'`)
		 * @param service The name of your service (default = `'service'`)
		 * @param secret Your secret that is used to generate the token (default = `''`)
		 * @returns Otpauth uri. Example: `otpauth://totp/user:localhost?secet=NKEIBAOUFA`
		 */
		keyuri( user?: string, service?: string, secret?: string ): string;
		
		/**
		 * Generates a QR Code image
		 * 
		 * @param user The name/id of your user (default = `'user'`)
		 * @param service The name of your service (default = `'service'`)
		 * @param secret Your secret that is used to generate the token (default = `''`)
		 * @returns The QR code image url
		 */
		qrcode( user?: string, service?: string, secret?: string ): string;
		
		/**
		 * Encodes secret into base32
		 * 
		 * @param secret Your secret that is used to generate the token
		 * @param format Any format supported by node's `Buffer` (default = `'binary'`)
		 * @returns Base32 string
		 */
		encode( secret: string, format?: string ): string;
		
		/**
		 * Decodes base32 value to secret
		 * 
		 * @param eSecret Your secret that is used to generate the token
		 * @param format Any format supported by node's `Buffer` (default = `'binary'`)
		 * @returns Decoded string
		 */
		decode( eSecret: string, format?: string ): string;
		
		/**
		 * Generates the OTP code
		 * 
		 * @param secret Your secret that is used to generate the token
		 * @returns OTP Code
		 */
		generate( secret: string ): number;
		
		/**
		 * Generates a secret key
		 * 
		 * @param len Length of secret (default = `16`)
		 * @returns Secret key
		 */
		generateSecret( len: number ): string;
	}
	
	/**
	 * Google Authenticator adapter
	 */
	export const authenticator: Authenticator;
	/**
	 * HMAC-based One-time Password Algorithm
	 */
	export const hotp: Authenticator;
	/**
	 * Time-based One-time Password Algorithm
	 */
	export const totp: Authenticator;
}
