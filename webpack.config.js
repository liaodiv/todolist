/**
 * Created by 27353 on 2017/4/5.
 */
var path = require('path');
var webpack = require('webpack');
module.exports = {
    entry:'./public/javascripts/main.js',
    output:{
        path:path.join(__dirname,'/public/javascripts'),
        filename:'bundle.js'
    },
    module: {
        loaders: [
            {
               /* test: /\.js|jsx$/,
                loaders: ['react-hot', 'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'],
                include: path.join(__dirname, 'js'),
                exclude: /node_modules/*/
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }

}
