const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const ChromeReloadPlugin = require('lin-wcer')
const { resolve, page, assetsPath } = require('./util')

module.exports = {
    entry: {
        popup: resolve('src/popup'),
        options: resolve('src/options'),
        content: resolve('src/content'),
        background: resolve('src/background'),
        inject: resolve('src/content/inject'),
    },
    output: {
        path: resolve('plugin'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: 'js/[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'assets': resolve('src/assets'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src')],
                options: {
                  formatter: require('eslint-friendly-formatter')
                }
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' }
                ]
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
                options: {
                    loaders: {
                        css: [MiniCssExtractPlugin.loader, 'css-loader'],
                        scss: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                        sass: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                    }
                }
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [
        page({
            title: 'popup title',
            name: 'popup',
            chunks: ['popup']
        }),
        page({
            title: 'options title',
            name: 'options',
            chunks: ['options']
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([{
            from: resolve('static')
        }]),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        }),
        new ChromeReloadPlugin({
            port: 23333,
            manifest: resolve('src/manifest.js')
        })
    ],
}
