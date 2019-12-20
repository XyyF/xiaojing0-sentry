const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

const config = {
    publicPath: '/',
    runtimeCompiler: true,
    productionSourceMap: false,
    lintOnSave: false,
    pages: {
        app: {
            entryName: 'sentry',
            // page 的入口
            entry: 'src/index.js',
            filename: 'index.html',
        },
    },
    chainWebpack: config => {
        // __external下的依赖默认使用主工程的
        config.resolve.modules.prepend(path.join(__dirname, './node_modules'))
    },
    configureWebpack: {
        output: {
            filename: '[name].js',
            chunkFilename: '[name].js',
        },
        resolve: {
            extensions: ['.js', '.vue', '.json'],
        },
        plugins: [
            new CleanWebpackPlugin(),
            // 替换全局变量Vue，解决引入顺序导致有时提示Vue不存在的问题
            new webpack.ProvidePlugin({
                Vue: 'vue',
            }),
            // 复制不需要通过webpack打包的第三方库
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, 'src/static'),
                    to: path.join(__dirname, 'dist'),
                    ignore: ['.*'],
                },
            ]),
        ],
    },
}

module.exports = config