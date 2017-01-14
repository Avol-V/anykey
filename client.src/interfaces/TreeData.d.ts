/**
 * Passwords tree data.
 */
type TreeData = TreeDataItem[];

/**
 * Group item in tree data.
 */
interface TreeDataItem
{
	/** Group name */
	name: string;
	/** Icon URI */
	icon?: string;
	/** Password entries in this group */
	entries: TreeDataEntry[];
}

/**
 * Password entry in tree data.
 */
interface TreeDataEntry
{
	/** Creation timestamp */
	id: number;
	/** Expiration timestamp */
	expiration?: number;
	/** Timestamps of previous versions */
	history?: number[];
	/** Entry name */
	name: string;
	/** Additional description */
	description?: string;
	/** URL address */
	url?: string;
	/** Icon URI */
	icon?: string;
	/** Separately encrypted data */
	protected?: TreeDataEntryProtected;
}

/**
 * Protected part of password enrty.
 */
interface TreeDataEntryProtected
{
	/** Login name */
	login: string;
	/** Password */
	password: string;
	/** Additional data/comments */
	comment?: string;
	/** Attachments */
	attachments?: TreeDataEntryAttachment[];
}

/**
 * Attachment to password entry.
 */
interface TreeDataEntryAttachment
{
	/** File name */
	name: string;
	/** File contents in Base64 */
	data: string;
}

/**
 * Module
 */
export {
	TreeData as default,
	TreeDataItem,
	TreeDataEntry,
	TreeDataEntryProtected,
	TreeDataEntryAttachment,
};
