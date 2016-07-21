const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');

const helper = require('./helpers');

const PATHS ={
	app: path.join(__dirname,'app'),
	js:path.join(__dirname,'app','js'),
	style:path.join(__dirname,'app','scss','style.scss'),
	build: path.join(__dirname,'build'),
	template: path.join(__dirname,'app','index.html')
};


const common = {
	entry:{
		style:[PATHS.style],
		js:PATHS.js
	},
	output: {
		path: PATHS.build,
		filename: '[name].js',
	},
	sassLoader: {
			includePaths: [ 
			'node_modules/normalize-scss/sass/',
			'node_modules/font-awesome/scss/',
			]
    },
	plugins:[
		new HtmlWebpackPlugin({
			template: PATHS.template
		}),
	],
	resolve:{
		alias:{
		}
	}
}


let config;

switch(process.env.npm_lifecycle_event){
	case 'build':
		config = merge(
			common,
			helper.setFreeVariable(
				'process.env.NODE_ENV',
				'production'
			),
			helper.clean(PATHS.build),
			// helper.setupFonts(),
			// helper.includeImage(PATHS.images,PATHS.imagesSprites),
			// helper.minifyImage(PATHS.imagesSprites),
			// helper.setupVideo(PATHS.videos),
			helper.setupHtml(PATHS.app),
			helper.extractCSS(PATHS.style)
		);
		break;
	default:
		config = merge(
			common,
			{
				devtool: 'eval-source-map'
			},
			helper.devServer({
				host: process.env.HOST,
				port: process.env.PORT
			}),
			// helper.setupFonts(),
			// helper.minifyImage(PATHS.images),
			// helper.setupVideo(PATHS.videos),
			helper.setupHtml(PATHS.app),
			helper.setupCSS(PATHS.style)
		);
}
module.exports = config;




