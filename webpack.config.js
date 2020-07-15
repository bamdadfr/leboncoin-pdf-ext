const CopyPlugin = require ('copy-webpack-plugin')

module.exports = {
    // 'watch': true,
    'mode': 'development',
    'devtool': 'cheap-source-map',
    'entry': {
        // 'scripts/background': './src/scripts/background.js',
        'scripts/content': './src/scripts/content.js',
        'scripts/popup': './src/scripts/popup.js',
    },
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