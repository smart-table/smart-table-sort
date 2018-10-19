import node from 'rollup-plugin-node-resolve';

export default {
    input: './dist/src/index.js',
    output: [{
        file: './dist/bundle/smart-table-sort.js',
        format: 'iife',
        name: 'smartTableSort',
        sourcemap: true
    }, {
        file: './dist/bundle/smart-table-sort.es.js',
        format: 'es',
        sourcemap: true
    }],
    plugins: [node()]
};
