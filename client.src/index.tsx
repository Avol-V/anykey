import {h, render} from 'preact';

const TREE_DATA = [
	{
		name: 'Services',
		icon: '#folder',
		entries: [
			{
				key: 1482949340975,
				expiration: 1483686907461,
				history: [
					1482949340970,
				],
				name: 'Google',
				description: 'Big brother',
				url: 'https://google.com/',
				icon: 'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
				data: {
					login: 'example@google.com',
					password: 'Secret password',
					comments: 'Secret code: 42\nTel: 1234567890',
					attachments: [
						{
							name: 'secret.txt',
							data: 'U2VjcmV0IHRleHQ=',
						},
						{
							name: 'secret2.txt',
							data: 'U2VjcmV0IHRleHQgMg==',
						},
					],
				},
			},
			{
				key: 1482949464927,
				name: 'Yandex',
			}
		],
	},
	{
		name: 'Other',
		entries: [],
	},
];
