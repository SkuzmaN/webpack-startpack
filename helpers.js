const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');


exports.setupCSS  = function(paths){
	return {
		module: {
			loaders: [
				{
				  test: /\.scss$/,
				  loaders: ['style','css','postcss-loader','sass'],
				  include: paths
				}
			]
		},
		postcss: function () {
			return [autoprefixer()]
		},
	}
}

exports.setupFonts = function(){
	return {
		module: {
			loaders: [
			{ 
				test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "file?name=fonts/[name].[hash].[ext]"
			},
			{ 
				test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
				loader: "file?name=fonts/[name].[hash].[ext]"
			}
			]
		}
	}
}

exports.extractCSS = function(paths){
	return {
		module: {
			loaders: [
				{
				  test: /\.scss$/,
				  loader: ExtractTextPlugin.extract(['css','postcss-loader','sass']),
				  include: paths
				}
			]
		},
		plugins: [
			new ExtractTextPlugin('[name].css')
		]
	}
}

exports.minifyImage = function(paths){
	  return {
		  module: {
			  loaders:[
				{
				    test: /\.(jpg|png)$/,
					loader: 'url-loader?limit=25000',
					include: paths
				}
			  ]
		  }
	  }
}
exports.includeImage = function(paths,exclude ={}){
	return{
		module:{
			loaders:[
						{
			  test: /\.(jpg|png)$/,
			  loader: 'file?name=[path][name].[hash].[ext]&context=./app/',
			  include: paths,
			  exclude: exclude
				}	
			]
		}
	}
}

exports.setupHtml = function(paths){
	return {
		module:{
			loaders:[
			{
				test: /\.html$/,
				loader: "html?attrs[]=img:src&attrs[]=video:poster&attrs[]=source:src"
				}
			]
		}
	}
}
exports.setupVideo = function(paths){
	return {
		module:{
			loaders:[
			{
				test: /\.(mp4|ogg)$/,
				loader: 'file?name=[path][name].[hash].[ext]&context=./app/',
				include:paths
				}
			]
		}
	}
}

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd()
      })
    ]
  };
}


exports.devServer = function(options) {
  return {
	watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000
    },  
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
}

exports.setFreeVariable = function (key,value){
	const env = {};
	env[key] = JSON.stringify(value);
	
	return {
		plugins: [
			new webpack.DefinePlugin(env)
		]
	}
}




