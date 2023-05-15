import license from 'rollup-plugin-license';
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import terser from '@rollup/plugin-terser';

const licensePlugin = license({
    banner: {
        content: `Copyright <%= moment().format('YYYY') %> Alexander Regnet`,
        commentStyle: 'ignored'
    }
});

export default [
    {
        input: `src/index.ts`,
        plugins: [esbuild()],
        output: [
            {
                file: `dist/index.js`,
                format: 'cjs',
                sourcemap: true,
                exports: 'auto',
               plugins: [licensePlugin]
            },
        ]
    },
    {
        input: `src/index.ts`,
        plugins: [dts()],
        output: {
            file: `dist/index.d.ts`,
            format: 'es',
            plugins: [licensePlugin]
        },
    },
    {
        input: `src/index.ts`,
        plugins: [esbuild()],
        output: [
            {
                name: 'IbanVal',
                format: 'iife',
                file: 'dist/iban-val.js',
                plugins: [licensePlugin]
            },
            {
                name: 'IbanVal',
                format: 'iife',
                file: 'dist/iban-val.min.js',
                plugins: [licensePlugin,terser()]
            }
        ]
    },
]