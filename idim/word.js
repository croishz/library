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
console.log(arr);
console.log(obj2);
console.log(filterLog);

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
	a : 0,
	b : 0,
	c : 0,
	d : 0,
	e : 0,
	f : 0,
	g : 0,
	h : 0,
	j : 0,
	k : 0,
	l : 0,
	m : 0,
	n : 0,
	o : 0,
	p : 0,
	q : 0,
	r : 0,
	s : 0,
	t : 0,
	u : 0,
	v : 0,
	w : 0,
	x : 0,
	y : 0,
	z : 0,
}
const spreadCollection = [];
const layout = [];
for (let i = 0; i < set.length; i++) {
	for (let k = 0; k < set[i].length; k++) {
		// let spelling = "";
		// if ( set[i][k] !== " "){
		// 	spelling = set[i][k]
		// }
		const spelling = set[i][k];
		const collector = new RegExp(spelling, 'gi');
		const count = set[i].match(collector).length;
		// console.log(spelling);
		if( 
			typeof alphabet[spelling] === 'number' && 
			alphabet[spelling] !== NaN && 
			alphabet[spelling] < count 
		){
			alphabet[spelling] = count;
		}
	}
}
// console.log(alphabet);
for (const key in alphabet) {
	if (alphabet.hasOwnProperty(key) && alphabet[key] > 0) {
		for (let i = 0; i < alphabet[key]; i++) {
			spreadCollection.push(key);
		}
	}
}
console.log("before shuffle", spreadCollection);
const shuffle = [...spreadCollection];
for (let i = (shuffle.length - 1); i > 0; i--) {
	const j = Math.floor(Math.random() * (i+1));
	console.log(j);
	[shuffle[i], shuffle[j]] = [shuffle[j], shuffle[i]]; 
}
console.log("after shuffle", shuffle);
const col = Math.ceil( Math.sqrt(shuffle.length) );
for (let i = 0; i < shuffle.length; i += col) {
	layout.push( shuffle.slice(i, col + i) );
}
console.log(layout);