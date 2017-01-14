/**
 * AnyKey – Password Manager with client-side encryption.
 * 
 * UI entry point.
 */
;

import {h, render} from 'preact';
import 'preact/devtools/index';
import TreeData from './interfaces/TreeData';
import Home from './scenes/Home/index';

/**
 * Mock data tree.
 */
const TREE_DATA: TreeData = [
	{
		name: 'Services',
		icon: '#folder',
		entries: [
			{
				id: 1482949340975,
				expiration: 1483686907461,
				history: [
					1482949340970,
				],
				name: 'Google',
				description: 'Big brother',
				url: 'https://google.com/',
				icon: 'https://www.google.com/images/branding/product/ico/googleg_lodp.ico',
				protected: {
					login: 'example@google.com',
					password: 'Secret password',
					comment: 'Secret code: 42\nTel: 1234567890',
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
				id: 1482949464927,
				name: 'Yandex',
			},
		],
	},
	{
		name: 'Other',
		entries: [],
	},
];

render( <Home tree={TREE_DATA} />, document.body );
