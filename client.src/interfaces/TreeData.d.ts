type TreeData = TreeDataItem[];

interface TreeDataItem
{
	name: string;
	icon?: string;
	entries: TreeDataEntry[];
}

interface TreeDataEntry
{
	id: number;
	expiration?: number;
	history?: number[];
	name: string;
	description?: string;
	url?: string;
	icon?: string;
	protected?: TreeDataEntryProtected;
}

interface TreeDataEntryProtected
{
	login: string;
	password: string;
	comment?: string;
	attachments?: TreeDataEntryAttachment[];
}

interface TreeDataEntryAttachment
{
	name: string;
	data: string;
}

export {
	TreeData as default,
	TreeDataItem,
	TreeDataEntry,
	TreeDataEntryProtected,
	TreeDataEntryAttachment,
};
