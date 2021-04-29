import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'build',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        typescript(),
        nodeResolve(),
    ],
    preserveEntrySignatures: false,
};
