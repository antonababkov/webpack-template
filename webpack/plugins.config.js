const path = require('path');
const multipage = require('./multipage.config');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

const result = {};

const htmlPlugins = multipage.pages.map(page => {
    return new HtmlWebpackPlugin({
        inject: true,
        template: page.template,
        filename: page.page,
        chunks: [...page.chunks]
    });
});

result.plugins = [
    new MiniCssExtractPlugin({
        filename: 'styles/[name].[contenthash].css',
    }),
    ...htmlPlugins
];
result.module = {
    rules: [
        {
            test: /\.html$/i,
            loader: 'html-loader',
        },
        {
            test: /\.(c||sa||sc)ss$/i,
            use: [
                devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: [require('postcss-preset-env')],
                        }
                    }
                },
                'sass-loader'
            ],
        },
        {
            test: /\.woff2?$/i,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name][ext]'
            }
        },
        {
            test: /\.(jpe?g|png|webp|gifsvg)$/i,
            use: [
                {
                    loader: 'image-webpack-loader',
                    options: {
                        mozjpeg: {
                            progressive: true,
                        },
                        // optipng.enabled: false отключит optipng 
                        optipng: {
                            enabled: false,
                        },
                        pngquant: {
                            quality: [0.65, 0.90],
                            speed: 4
                        },
                        gifsicle: {
                            interlaced: false,
                        },
                        // параметр webp включит WEBP 
                        webp: {
                            quality: 75
                        }
                    },
                }
            ],
            type: 'asset/resource',
            generator: {
                filename: 'image/[name][ext]'
            }
        },
        {
            test: /\.(?:js|mjs|cjs)$/i,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    targets: "defaults",
                    presets: [
                        ['@babel/preset-env']
                    ]
                }
            }
        },

    ],
}
result.optimization = {
    splitChunks: {
        chunks: 'all'
    }
}
module.exports = result;