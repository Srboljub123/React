module.exports = {
    // compact: true,
    // comments: false,
    // minified: true,
    // sourceMaps: true,
    // moduleRoot:'package/modules',
    // ignore: ['./src/__tests__'],
    // include: ['./src/__tests__'],
    // exclude: ['./src/__tests__/**/*'], // returns an error but excludes the folder
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false,
                loose: true,
                shippedProposals: true,
                corejs: 3,
                targets: { node: 'current' },
                // useBuiltIns: 'usage',
                useBuiltIns: 'entry',
            },
        ],
        [
            '@babel/preset-typescript',
            {
                isTSX: true,
                allExtensions: true,
                onlyRemoveTypeImports: true,
            },
        ],
    ],
    plugins: [
        '@babel/plugin-transform-runtime',
        'syntax-async-functions',
        'transform-react-remove-prop-types',
        [
            'babel-plugin-styled-components', {
                minify: true,
                transpileTemplateLiterals: true
            }
        ],
        ['transform-define', {
            'process.env.NODE_ENV': process.env.NODE_ENV,
            'process.env.CLIENT_ENV': process.env.CLIENT_ENV,
            'process.env.LOCAL_API_SERVICE': process.env.LOCAL_API_SERVICE,
            'process.env.SINCE': new Date().toISOString()
        }],
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
                alias: {
                    '^__tests__/(.+)': './src/__tests__/\\1',
                    '^@types/(.+)': './@types/\\1',
                    '^@common/(.+)': './src/common/\\1',
                    '^@common/assets/(.+)': './src/common/assets/\\1',
                    '^@common/hooks/(.+)': './src/common/hooks/\\1',
                    '^@common/types/(.+)': './src/common/types/\\1',
                    '^@components/(.+)': './src/components/\\1',
                    '^@contexts/(.+)': './src/contexts/\\1',
                    '^@init/(.+)': './init/\\1',
                    '^@controllers/(.+)': './src/controllers/\\1',
                    '^@layouts/(.+)': './src/layouts/\\1',
                    '^@pages/(.+)': './src/pages/\\1',
                    '^@public/(.+)': './public/\\1',
                    '^@providers/(.+)': './src/providers/\\1',
                    '^@routes/(.+)': './src/routes/\\1',
                    '^@views/(.+)': './src/views/\\1',
                    '^@styles/(.+)': './src/styles/\\1',
                },
            },
        ],
    ],
    env: {
        development: {
            presets: [
                [
                    '@babel/preset-react',
                    {
                        development: true,
                        // runTime: 'automatic',
                    },
                ],
            ]
        },
        production: {
            presets: [
                [
                    '@babel/preset-react',
                ],
            ],
            plugins: [
                '@babel/plugin-transform-react-constant-elements', // only for production
                '@babel/plugin-transform-react-inline-elements', // only for production
            ]
        }
    }
}
