module.exports = {
    module: { 
        rules: [ 
            {
                test: /\.scss$/,
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    synac: 'postcss-scss',
                    plugins: () => [
                        require('postcss-import'),
                        require('tailwindcss'),
                        require('autoprefixer')
                    ]
                }
            }
        ]
    }
}