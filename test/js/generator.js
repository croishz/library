"use strict";
// render
const wrap = document.createElement("div");
const style = document.createElement("style");
wrap.classList.add("wrap");
style.innerText = `
	body {margin: 0; padding: 10px;}
	.wrap {min-width:320px; display:flex;}
	.wrap.check {width:400px;} 
	.item {flex-basis:200px; border:1px solid tan; padding:5px 12px; text-transform: capitalize;}
	.item:not(:last-child) {margin-right:20px;}
`
document.head.appendChild(style);
document.body.appendChild(wrap);
for (let index = 0; index < 4; index++) {
	const item = document.createElement("div");
	item.classList.add("item");
	item.innerText = `item${index}`;
	wrap.appendChild(item);
}

// 
function wrapWidth(_element){
	console.log(_element.offsetWidth);
	return _element.offsetWidth;
};

function* generatorCreate(){
	const wrap = document.querySelector(".wrap");
	wrapWidth(wrap);
	yield 1;
	!wrap.classList.contains("check") && wrap.classList.add("check"); 
	yield 2;
	wrapWidth(wrap);
	yield 3;
	return "End!"
}

const generator = generatorCreate();
