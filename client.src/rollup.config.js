import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
	entry: '../client.es/index.js',
	format: 'iife',
	dest: '../public/scripts/bundle.js',
	sourceMap: true,
	plugins: [
		sourcemaps(),
		nodeResolve(
			{
				jsnext: true,
				main: true,
				browser: true,
			}
		),
	],
};
