// node api
const path = require("path");

// HTML module
const HtmlWebpackPlugin = require("html-webpack-plugin");
const hbs = require("handlebars");
const hbs_r = require("handlebars/runtime");
// console.dir(hbs);
// console.dir(hbs_r);

module.exports = {
	entry : {
		main : "./src/index.js",
		sub : "./src/route/index.js"
	},
	// devtool :: source map을 제공.
	devtool: 'eval-source-map',
	mode : "none",
	output : {
		filename : "[name].js",
		path : path.resolve(__dirname, "dist")
	},
	module : {
		rules : [
			{
				test : /\.html$/i,
				use : [
										
					// file extract 
					{
						loader : "file-loader?name=[name].[ext]"
					},

					//  
					{
						loader : "extract-loader"
					},

					{
						loader : "html-loader",
						options : {
							preprocessor : async (content, loaderContext) => {	// 비동기 처리시 웹팩의 번들링 타임을 줄일 수 있다.
								// console.log(content);	// 문자열로 전환된 html 코드. <template>을 사용하여 innerHTML을 가져온 것과 동일하다.
								// console.dir(loaderContext); // html-loader 객체 전체 열람. 

								let result;
								
								try {
									result = await hbs.compile(content)({
										lang : "ko",
										title: "webpack",
										head : "Get started webpack!",
										imgClass : "img",
										templateContent : content,
										loaderObject : loaderContext,
										hbsObject : hbs
									});

								} catch (error) {
									loaderContext.emitError(error);

									return content;
								}

								return result;
							},
							esModule : true,
							// html 문자열 처리.
							// minimize : true, 			// 모든 옵션 활성화 
							minimize : {					// 개별 옵션 스위치
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
							attributes : {
								list : [
									{
										tag : "img",
										attribute : "src",
										type : "src" 
									}
								]
							}
						}, 					
					},				

				]
			}
		]
	},
	plugins : [
		new HtmlWebpackPlugin({
			template : "./src/index.html",
			filename : "main.html"
		}),
		new HtmlWebpackPlugin({
			template : "./src/route/route.html",
			filename : "sub.html"
		}),
	]
}