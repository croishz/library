let kim  = {
	name : "kim",
	first : 10,
	second : 20
}

let lee  = {
	name : "lee",
	first : 10,
	second : 10
}

function sum(prefix){
	// this = this argument;
	return prefix + (this.first + this.second);
}

// sum();
console.log(kim.name, sum.call(kim, "=> "));
console.log(lee.name, sum.call(lee, ": "));

let kimSum = sum.bind(kim, "-> ");

console.log("kimSum", kimSum());