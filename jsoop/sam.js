// console.log("pi", Math.PI);
// console.log("random", Math.random());
// console.log("floor", Math.floor(Math.PI));
// console.log("ceil", Math.ceil(Math.PI));
// console.log("round", Math.round(Math.PI));

/*
console.group("MyMath");
let MyMath = {
	PI : Math.PI,
	random  : function(){
		return Math.random();
	},
	floor : function(value){
		return Math.floor(value);
	}
}
console.log(MyMath.PI);
console.log(MyMath.random());
console.log(MyMath.floor(3,444));
console.groupEnd("MyMath");
*/

/* this keyword 
let kim = {
	name : "kim",
	score : {
		fir : 10,
		sec : 20,
	},
	sum : function(){
		return this.score.fir + this.score.sec;
	}
}
console.log( 
	// kim.sum(kim.score.fir, kim.score.sec)
	kim.sum()
);
*/

/* factoring object :: constructor function 
let kim = new Person("kim", 10, 20, 30);
kim.prototype.sum = function(){
	return "this" + this.score.fir + this.score.sec + this.score.thr;
}
let lee = new Person("lee", 10, 10, 10);

// let day = new Date('2019-7-15');
// console.log(day);

function Person(name, fir, sec, thr){
	this.name = name,
	this.score = {
		fir : fir,
		sec : sec,
		thr : thr
	},
	this.prototype.sum = function(){
		return "prototype" + this.score.fir + this.score.sec + this.score.thr;
	}
}

console.log(new Person());
console.log(kim);
console.log(lee);
*/

/* class

class Person {
	constructor(name, first, second){
		console.log("check consturtor");
		this.name = name;
		this.first = first;
		this.second = second;
	}
	sum(){
		return (this.first + this.second);
	}
}

class PersonMore extends Person{
	constructor(name, first, second, third){
		super(name, first, second);
		this.third = third;
	}
	sum(){
		return super.sum() + this.third;
	}
	avg(){
		return (super.sum() + this.third)/3;
	}
}

let kim = new PersonMore("kim", 10, 20, 30);
console.log(kim);
console.log(kim.sum());
console.log(kim.avg());
*/

/* prototype inheritance 

// let superObj = {superVal:"super"}
// let subObj = {subVal:"sub"}
// subObj.__proto__ = superObj;

let superObj = {superVal:"super"}
let subObj = Object.create(superObj);
console.log(subObj.superVal);
subObj.superVal = "superSub";
debbugger;
console.log(subObj.superVal);
console.log(superObj.superVal);

let kim = {
	name:"kim",
	first:10,
	second:20,
	sum:function(){return this.first + this.second}
}

let lee = Object.create(kim);
lee.name="lee";
lee.second=10;
lee.avg=function(){
	return (this.first+this.second)/2;
}
console.log(lee.sum())
console.log(lee.avg())

*/