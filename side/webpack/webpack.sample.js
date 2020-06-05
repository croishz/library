/*
# webpack 환경에서 module 문법 사용 개요.
	node.js는 commonJS의 module system을 사용한다.
	webpack은 node 환경 위에서 구동하므로 node.js의 module system을 사용해야 한다. 
		- 개발 코드는 ecma script의 module system을 사용해도 무방.
	commonJS의 module system에서 import는 "require api"를 export는 "module" 객체 - module.exports - 를 이용한다.
*/
const webpack = require('webpack');
// path는 node.js가 기본으로 제공하는 모듈.
const path = require('path');
const HtmlWebpackPlugin  = require('html-webpack-plugin')
// 이하가 webpack 실행부에 제공할 명세.
// 여러 개의 config 파일을 통해 공통의 옵션을 import 해오는 방식을 사용할 수 있다 :: scalable webpack configurations
/* example
	webpack.common.js
		개발 환경 - webpack.development.js
		배포 환경 - webpack.production.js
	
	webpack-merge 패키지- https://github.com/survivejs/webpack-merge -를 사용하여, 
	const webpackStatement = {
		common : require('./webpack.common'),
		vendor : require('./webpack.library'),
	}
	const webpackMerge = require('webpack-merge');
	module.exports = webpackMerge([webpackStatement.common], {...});
	
*/
// 한 개의 config 파일에선 배열로 여러 config를 선언하고 name키를 이용해 개별 접근할 수 있다 :: Exporting multiple configurations
module.exports = [
	{
		// Context :: webpack이 동작할 root 폴더 설정. 
		context : path.resolve(__dirname, 'src'),	// 설정 시, entry의 경로가 src부터 시작. entry에서 맨 앞의 . = src
		
		// Entry :: webpack이 코드 번들링을 위해 출발할 시작점 정보를 제공한다.
		/*
			webpack은 단일 파일 번들링의 경우에는 string을, 다중 파일 번들링은 객체를 받아 사용한다.
			4.0 업데이트 이후 webpack의 폴더 트리에 기본값이 설정되었다. 
			"src"는 개발 코드를 담는 폴더, 
			"dist"는 번들링한 파일을 내보내는 폴더이다. 	
			동적으로 로딩하는 파일은 entry point로 지정할 수 없다.

		*/

		// single entry case
		// entry : "./src/index.js",
		
		// multi entry case by object syntax
		// entry[key]의 key는 webpack의 chunk.name
		// entry : {
		// 	app : "./src/app/js",
		// 	adminApp : ".src/adminApp.js"
		// },
	
		// webpack의 권장안. 
		// mpa : html마다 entry point를 제공.
		// span : 오직 하나의 entry point.
		entry : {
			main : "./index.js",
			// page1 : "./page1/index.js",
			// page2 : "./page2/index.js"
		},
		
		// Output :: 번들링한 코드를 파일로 만들기 위한 정보를 제공한다.
	
		output : {
			// single entry case
			// filename : "main.js",				// default filename
	
			// multi entry case
			filename : "[name].js",	// writes to disk : ./dist/page1.js, ./dist/page2.js
	
			// path : __dirname + 'dist',	 
			path : path.resolve(__dirname, 'dist'), // __dirname은 폴더 트리의 절대경로를 제공하는 node 객체. 
		},

		// Loader(module) :: 번들링할 파일을 webpack - javascript - 이 해석할 수 있는 형태로 불러오는 툴을 제공한다. 파일을 빌드하는 것과는 별개.
		module : {
			// 번들링 방식을 정의한다.
			rules : [
				// 대상 파일 또는 파일들마다 하나의 객체로 정보를 제공한다. 
				// 옵션이 늘어나고 객체의 깊이가 깊어질수록 가독성이 떨어지므로, 개별 대상 파일별 설정을 변수로 치환하는 것이 유리하다.
				
				// HTML module rule
				{
					test : /\.(html|hbs)$/i,	// 파일 경로 전체를 문자열로 삼기 때문에 \.을 사용해 확장자만 구분. 트리상 분기가 필요하면 경로까지 포함하면 된다.
					use : [						// 4.0부터 loaders가 use로 대체되었다.
						// html load
						{ 
							loader : "html-loader",
							options : {
								// preprocessor :: 문자열로 전환한 html 코드를 새 파일에 밀어넣기 전의 사전 처리 옵션. 기본값은 undefined.
								// handlebars(hbs) 패키지의 api를 사용하는 예제. 대상이 html이어도 적용 가능하다.
								preprocessor : async (content, loaderContext) => {	// 비동기 처리시 웹팩의 번들링 타임을 줄일 수 있다.
									// console.log(content);	// 문자열로 전환된 html 코드. <template>을 사용하여 innerHTML을 가져온 것과 동일하다.
									// console.dir(loaderContext); // html-loader 객체 전체 열람. 
	
									let result;
									
									try {
										result = await hbs.compile(content)({
											// 키값과 같은 html 내의 변수를 찾아 값으로 변경한다.
											lang : "ko",
											title: "webpack",
											head : "Get started webpack!",
											body : "Practice"
										});
	
									} catch (error) {
										loaderContext.emitError(error);	// 뭔지 모름.
	
										return content;
									}
	
									return result;
								},
								
								// esModule :: node.js 대신 es6+의 모듈 시스템을 사용할 지 결정할 수 있다. 기본값은 false.
								esModule : true, // 
	
								// minimize :: minify
								// 모든 옵션 활성화 
								// minimize : true, // 기본값은 false이지만, webpack.mode의 값이 production이면 true가 기본값. 
								// 개별 옵션 스위치
								minimize : {
									removeComments : true,				// 주석 제거
									collapseWhitespace : false,			// 공백 제거
									minifyJS : true,					// script 태그의 압축
									removeScriptTypeAttributes : true,	// script 태그의 type 제거
									minifyCSS : false,					// style 태그의 압축
									removeStyleTypeAttributes : false,	// style 태그의 type 제거
									removeAttributeQuotes : false,		// 태그 속성 선언의 따옴표 제거
									keepClosingSlash : true,			// self closing 유지 ex> 값이 false이면, <br /> => <br>. xml 마크업을 위한 옵션.
									useShortDoctype : true,				// true이면 어떤 doctype 선언이라도 <!doctype html>로 컴파일링 됨. html5 문서로 고정시키는 옵션.
									// 정체 모를 옵션.
									conservativeCollapse : false,
								},
	
								// attributes :: 뭔지 모르겠다. file-loader, url-loader를 이용해서 가져오는 참조 경로등을 밀어넣어주는 기능 같아 보이는데...
								attributes : {
									list : [
										{tag:"img", attribute:"src", type:"data-src"},
										{tag:"img", attribute:"data-srcset", type:"srcset"},
									]
								}
							}
						},


					]
				},
				
				// CSS module rule
				// {
				// 	test : /\.s?[ca]ss$/i,		// sass, scss, css
				// 	use : [
				// 		// 배열의 마지막부터 처리. 처리의 마지막 로더가 결과물을 반환한다. sass => css => style 순.
				// 		// compiled type
				// 		{loader : "style-loader"},
				// 		// css load
				// 		{loader : "css-loader"},
				// 		// scss load n compiling 
				// 		{
				// 			loader : "sass-loader",
				// 			options : {
				// 				implementation : require('node-sass'),
				// 				sassOptions : {
				// 					indentWidth : 4,
				// 					outputStyle : "compressed"
				// 				},
				// 				sourceMap : true,
				// 				webpackImporter : false // 기본값은 true. webpack의 importer 사용 여부를 정의한다.
				// 			}
				// 		},

				// 		// compress version if without options
				// 		// "style-loader", "css-loader", "sass-loader"
				// 	]
				// },
				
				// // JS module rule
				// {
				// 	test : /\.m?js?x$/i,	// /\.(mjs|js|jsx)$/
				// 	test : /\.jsx?$/i,		// /\.(js|jsx)$/
				// 	exclude : /(node_modules|bower_components)/,	// 번들링 과정에서 불필요한 타겟들을 제거.
				// 	use : {
				// 		// es6+ transpile to es5-
				// 		loader : "babel-loader",	// https://github.com/babel/babel-loader, https://webpack.js.org/loaders/babel-loader/
				// 		options: {
				// 			presets : ["@babel/preset-env"],
				// 			plugins :[
				// 				"@babel/plugin-proposal-object-rest-spread",
				// 				"@babel/plugin-transform-runtime",
				// 			],
				// 			cacheDirectory : true,
				// 		}
				// 	}					
				// },
				
				// // assets - image rule
				// {
				// 	test : /\.[jpe?g, gif, png]/,
				// 	use : {
				// 		// file load
				// 		loader : "file-loader"
				// 	}
				// },
			]
		},
		plugins : [
			new HtmlWebpackPlugin({
				title : "Webpack",
				lang : "ko",
				removeComments: true,
				template : './index.html',
				filename : "main.html" 
			})
		],
		mode : "none"
	},
	// cdn 전용 명세 추가 - 보류
	// {
	// 	name : "cdn",
	// 	entry : "./src/index.js",
	// 	output : {
	// 		path: `${__dirname}/dist/lib`,
	// 		publicPath : "https://code.jquery.com/jquery-3.5.1.js"
	// 	}
	// }
]