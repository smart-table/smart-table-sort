import node from 'rollup-plugin-node-resolve'

export default {
	input: 'index.js',
	output: {
		file: './dist/smart-table-sort.js',
		format: 'iife',
		name: 'smartTableSort',
		sourcemap: true
	},
	plugins: [node()]
}