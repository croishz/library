'use strict mode'

// 언어별 텍스트가 달라져도 keydown 이벤트로 매칭하는 철자값 찾기.
const obj = {
	"a" : 1,	// 자판 텍스트 : 키코드
	"b" : 3,
	"c" : 4,
	"d" : null,
	"e" : "e"
}
const obj2 = {};
const arr = [], filterLog = [];
for (const key in obj) {
	if (obj.hasOwnProperty(key)) {
		if(typeof obj[key] !== 'number'){
			filterLog.push(obj[key]);
		}else{
			arr[obj[key]] = key;
			obj2[obj[key]] = key;
		}
	}
}
// console.log(arr);
// console.log(obj2);
// console.log(filterLog);

// 단어세트 분해
// 주어진 단어들의 모든 철자를 동일한 확률에서 무작위로 화면에 표시한다. 단, 중복 철자는 해당 철자를 가장 많이 사용한 단어를 기준으로 표시한다. ex> cookie, code, toggle의 세트에서 c, d, e, i, k, l, t는 1개, o, g는 2개 표시한다.
// 철자들은 정방형의 레이아웃으로 표시한다. 행 = 열이 될 수 없다면, 행 > 열로 표시한다. 

// 로직
// 각 단어에서 사용한 철자들의 수를 구한다.
// 단어 간 사용한 철자의 수를 비교하여, 큰 수를 남긴다.
// 각 철자를 사용한 수만큼 나열한다.
// 나열한 철자들을 섞는다.
// 행열로 바꾼다.

const set = ["Statement", "Toast", "Illustration", "Code", "Lion", "ivory", "Taste", "umbrella", "joker", "Potato", "Cream cheese", "context", "mephisto", "icon", "blending", "Jazz"];
const alphabet = {
	"a" : 0,
	"b" : 0,
	"c" : 0,
	"d" : 0,
	"e" : 0,
	"f" : 0,
	"g" : 0,
	"h" : 0,
	"i" : 0,
	"j" : 0,
	"k" : 0,
	"l" : 0,
	"m" : 0,
	"n" : 0,
	"o" : 0,
	"p" : 0,
	"q" : 0,
	"r" : 0,
	"s" : 0,
	"t" : 0,
	"u" : 0,
	"v" : 0,
	"w" : 0,
	"x" : 0,
	"y" : 0,
	"z" : 0,
}

// 조회 함수
const alpha = set.reduce(testFunc, {});
function testFunc(countBoard, word, c, d){
	word.split("").map((spl)=>{
		const transSpl = spl.toLowerCase();
		const recode = countBoard[transSpl];
		const collector = new RegExp(transSpl, 'gi');
		const count = word.match(collector).length;

		if( transSpl === ' '){
			return countBoard;
		}

		if(recode === undefined){
			countBoard[transSpl] = 1;
		}else if(typeof recode && recode < count){
			countBoard[transSpl] = count;
		}
	})
	return countBoard;
}
// console.log(alpha);
for (let i = 0; i < set.length; i++) {
	for (let k = 0; k < set[i].length; k++) {
		const spelling = set[i][k];
		const collector = new RegExp(spelling, 'gi');
		const count = set[i].match(collector).length;
		alphabet[spelling] < count && (alphabet[spelling] = count);
	}
}
// console.log(alphabet);
function spread(object, array){
	for (const key in object) {
		if (object.hasOwnProperty(key) && object[key] > 0) {
			for (let i = 0; i < object[key]; i++) {
				array.push(key);
			}
		}
	}
	return array;
}
const spreadCollection = spread(alphabet, []);
const spreadCollection2 = spread(alpha, []);
const shuffle = shuffler(spreadCollection);
const shuffle2 = shuffler(spreadCollection2);

function shuffler(array){
	const newArray = [...array];
	for (let i = (newArray.length - 1); i > 0; i--) {
		const j = Math.floor(Math.random() * (i+1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]]; 
	}
	return newArray;
}

const matrix = [];
const col = Math.ceil( Math.sqrt(shuffle.length) );
for (let i = 0; i < shuffle.length; i += col) {
	matrix.push( shuffle.slice(i, col + i) );
}
// 화면 생성
const body = document.querySelector('body');
const wrapper = document.createElement('div');
wrapper.className ='wrapper-matchGame';
const group = document.createElement('div');
group.className ='matchGame';
body.appendChild(wrapper);
// shuffle.reduce(expose, group);
shuffle2.reduce(expose, group);
function expose(acc, val, idx, arr){
	const z = Math.round( Math.sqrt(arr.length) );
	const exposeSpl = document.createElement('div');
	const alignElem = z%2 === 0 ?  acc : exposeSpl;

	exposeSpl.innerText = val;
	exposeSpl.setAttribute("data-new-line", ( (idx + z) % z === 0 && true ) );
	exposeSpl.setAttribute("style", "width:" + (100/z).toFixed(4) + "%");
	alignElem.setAttribute("data-align", "center");
	acc.appendChild(exposeSpl);
	( (idx + 1) === arr.length ) && wrapper.appendChild(acc);

	return acc;
}
const ui = document.createElement('input');
ui.setAttribute("type", "text");
ui.setAttribute("name", "inputfield");
ui.setAttribute("id", "inputField");
ui.setAttribute("placeholder", "Please, Type it");
wrapper.appendChild(ui);

const logWindow = document.createElement('div');
wrapper.appendChild(logWindow);
logWindow.className = "log-window";
// 데이터 의존성을 가진 로직으로 교체하기.
/*
	- 사용된 철자를 객체 데이터로 추출.
	- 철자를 키값으로, 객체 정보는 
		1. 단어 세트 내에서 가장 많이 사용한 횟수 = 화면 표시 개수
		2. 화면에 표시한 철자의 배열 내 색인 번호. 중복이면 번호들.
	- 매칭 철자 표시
		셔플한 배열을 인풋의 누적 입력값과 비교하여 매칭하는 값들을 찾음.
		해당 값들을 가진 요소의 클래스를 제어하여 매칭을 표시.
*/
function type_isIng(eventObject){
	const insertText = eventObject.target.value;
	const textToArray = insertText.length > 0 ? insertText.split("") : [-1];
	const toIndexData = textToArray.reduce((update, spl)=>{
		const splLower = insertText.length > 0 ? spl.toLowerCase() : "";
		const collector = new RegExp(spl, 'gi');
		const theSplLength = insertText.length > 0 ? insertText.match(collector).length: 0;
		const indexCollection = [];

		shuffle2.forEach((s, i)=>{ s === splLower && indexCollection.push(i);});
		
		if((theSplLength - 1) <= indexCollection.length || theSplLength >= indexCollection.length){
			// console.log(indexCollection.slice(0, theSplLength));
			const pushData = indexCollection.slice(0, theSplLength);
			update = [... new Set(update.concat(pushData))];
			// console.log(update);
		}

		return update;

	}, []);

	// textToArray.map((val)=>{
	// 	toIndexData.push(shuffle2.indexOf(val));	// indexOf, lastIndexOf로는 중복 선택을 판별해낼 수 없음.
	// });
	
	// console.log(toIndexData);
	
	[].map.call(group.children, (elem)=>{elem.classList.remove("typing-word")});

	toIndexData.map((num)=>{
		if(-1 < num) {
			group.children[num].classList.add("typing-word");
		}
	});
}
function type_end(eventObject){
	const whitespace = " ";
	const word = eventObject.target.value;
	const wordLength = word.replace(whitespace, "").length;
	const matchSplCount = [].filter.call(group.children, (el)=> el.className === "typing-word" ).length;
	// console.log(wordLength, matchSplCount);
	const confirm_word = (wordLength === matchSplCount && wordLength > 1) ? true : false;

	return confirm_word;
}
console.dir(ui);
ui.addEventListener('keyup', (e)=>{
	// console.log("keyup :", e);
	// console.log(e.key, e.keyCode, e.which);
	// console.log(typeof e.target.value);

	// 화면 의존성
	// let matchword = null;
	// if(e.keyCode !== 27 && e.keyCode !== 8){
	// 	for (let i = 0; i < group.children.length; i++) {
	// 		if(group.children[i].innerText === e.key){
	// 			matchword = [].indexOf.call(group.children, group.children[i]);
	// 			// console.dir(matchword);
	// 		}
	// 	}
	// 	console.log(group.children[matchword]);
	// 	group.children[matchword].classList.add("typing-word");
	// }
	type_isIng(e);
});

const logGroup = document.createElement("ul");
logWindow.appendChild(logGroup);

function logUpdate(eventObject, confirm){
	const v = eventObject.target.value;
	const arr = [];
	
	if(confirm){
		const log = document.createElement("li");
		log.className = "log";
		log.innerText = eventObject.target.value;
		logGroup.appendChild(log);
		if(logGroup.children.length > 0){

		}

		const itemHeight = logGroup.children[0].clientHeight;
		const inLength = logGroup.clientHeight % itemHeight;
		const totalLength = logGroup.children.length;
		const outLength = totalLength - inLength;
		
		if(outLength > 0){
			logGroup.scrollTop = outLength * itemHeight;
		}
	}
}

ui.addEventListener('change', (e)=>{
	// console.log("change :", e)
	const confirm = type_end(e);
	logUpdate(e, confirm);
	e.target.value = "";
});


// ui.addEventListener('input', (e)=>{
// 	console.log("input :", e);
// 	const valueToArray = e.target.value.length > 0 ? e.target.value.split("") : [-1];
// 	console.log(valueToArray);
// 	valueToArray.reduce(match, []);	// acc를 누적시키기 위한 불필요한 loop가 존재.
// });
// function match(acc, val, idx, arr){
// 	acc.push(shuffle2.indexOf(val));

// 	[].map.call(group.children, (elem)=>{elem.classList.remove("typing-word")});

// 	if(acc.length > 0){
// 		acc.map((num)=>{
// 			if(num > 0) {
// 				group.children[num].classList.add("typing-word");
// 			}
// 		})
// 	}

// 	console.log(acc);

// 	return acc;
// }

// function inputData(actionType){
// 	const value = null;
// 	console.log(actionType);
// 	switch(actionType = eventObj){
// 		case actionType === "keydown" :
// 			value = {[eventObj.key] : eventObj.keyCode}
// 			console.log(eventObj.key, eventObj.keyCode);
// 		case actionType === "change" :
// 			value = eventObj.target.value
// 			console.log(eventObj.target.value);
// 		case actionType === "input" :
// 			value = eventObj.data;
// 			console.log(eventObj.data);
// 	}
// 	return value;
// }

const arr1 = [0,1,2,3,4,5];
const arr2 = [0,0,1,3,4,6,7];
const dataCompare = function(target, comparison){
	return target.reduce((accumulator, value, index, array)=>{
		// console.log(accumulator, value, index);
		comparison.forEach((v, i)=>{
			if(v === value){
				console.log(i);
				accumulator.push[i];
			}
		});
		console.log("acc : ", accumulator);
		return accumulator;
	}, []);
}
const a = dataCompare(arr1, arr2);
console.log(a);