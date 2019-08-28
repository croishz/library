
// name01((stat)=>{
// 	stat.prototype = name01;
// });

class publishing{
	static ar = [0,0,0];
	constructor(workerName, autorityClass){
		this.workerName = workerName;
		this.autorityClass = autorityClass;
	}
}

function j(){
	var p = j.prototype;
	p.a = {
		b : [0,1,2]
	}
}

function name(){
	const a = 0;
	let b = 0;
	for(let i=0; i<4; i+=1){
		b = a + i;
	}
	console.log(b);
}

const a = name;
const b = 2;
export { a, b, name };
export const c = 0;
export default publishing;