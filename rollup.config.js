import license from 'rollup-plugin-license';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

const defaults = {
    input: 'src/index.ts',
    plugins: [typescript({ declaration: false })]
};

const licensePlugin = license({
    banner: {
        content: `Copyright <%= moment().format('YYYY') %> Alexander Regnet`,
        commentStyle: 'ignored'
    }
});

export default [
    {
        ...defaults,
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
                plugins: [terser(), licensePlugin]
            }
        ]
    },
    {
        ...defaults,
        plugins: [typescript()],
        output: [
            {
                name: 'IbanVal',
                format: 'cjs',
                file: 'dist/node/index.js',
                plugins: [licensePlugin]
            }
        ]
    }
];
