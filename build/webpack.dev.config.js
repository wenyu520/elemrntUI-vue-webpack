const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin') // 生成html的插件
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const merge = require('webpack-merge')


const devWebpackConfig = merge(webpackConfig, {
    output:{
        publicPath: '/',
        filename:'[name].[hash].js',
        chunkFilename: '[id].[chunkhash].js'
    },
    devtool: 'eval-source-map', // 指定加source-map的方式
    devServer: {
        inline:true,//打包后加入一个websocket客户端
        hot:true,//热加载
        contentBase: path.join(__dirname, "..", "dist"), //静态文件根目录
        port: 8080, // 端口
        host: 'localhost',
        overlay: true,
        compress: false // 服务器返回浏览器的时候是否启动gzip压缩
    },
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500, //防止重复保存频繁重新编译,500毫米内重复保存不打包
        poll:1000 //每秒询问的文件变更的次数
    },
    plugins: [
        // 多入口的html文件用chunks这个参数来区分
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '..', 'public','index.html'),
            filename:'index.html',
            hash:true,//防止缓存
            minify:{
                removeAttributeQuotes:true//压缩 去掉引号
            }
        }),
        new webpack.HotModuleReplacementPlugin(), //HMR
        new webpack.NamedModulesPlugin() // HMR
    ]
})

module.exports = devWebpackConfig
