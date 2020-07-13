const CopyPlugin = require ('copy-webpack-plugin')

module.exports = {
    'watch': true,
    'mode': 'development',
    'devtool': 'cheap-source-map',
    'entry': {
        'scripts/background': './src/scripts/background.js',
        'scripts/content': './src/scripts/content.js',
        'scripts/popup': './src/scripts/popup.js',
    },
    // 'resolve': {
    //     'modules': [
    //         './src',
    //         './node_modules',
    //     ],
    // },
    // 'node': {
    //     'fs': 'empty',
    //     'net': 'empty',
    //     'tls': 'empty',
    // },
    'plugins': [
        new CopyPlugin ({
            'patterns': [
                {
                    'from': './src/manifest.json',
                    'to': 'manifest.json',
                },
                {
                    'from': './src/assets',
                    'to': 'assets',
                },
                {
                    'from': './src/popup',
                    'to': 'popup',
                },
            ],
        }),
    ],
}