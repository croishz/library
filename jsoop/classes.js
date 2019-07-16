// console.clear();

// class Person {
// 	constructor(name, first, second){
// 		console.log("check consturtor");
// 		this.name = name;
// 		this.first = first;
// 		this.second = second;
// 	}
// 	sum(){
// 		return (this.first + this.second);
// 	}
// }

// class PersonMore extends Person{
// 	constructor(name, first, second, third){
// 		super(name, first, second);
// 		this.third = third;
// 	}
// 	sum(){
// 		return super.sum() + this.third;
// 	}
// 	avg(){
// 		return (super.sum() + this.third)/3;
// 	}
// }

// let kim = new PersonMore("kim", 10, 20, 30);
// console.log(kim);
// console.log(kim.sum());
// console.log(kim.avg());

// constructor inheritance

// function Person(name, first, second){
// 	this.name = name;
// 	this.first = first;
// 	this.second = second;
// }
// Person.prototype.sum = function(){
// 	return this.first + this.second;
// }

// function PersonMore(name, first, second, third){
// 	Person.call(this, name, first, second);
// 	this.third = third;
// }
// // PersonMore.prototype.__proto__ = Person.prototype; // 비표준
// PersonMore.prototype = Object.create(Person.prototype);	// 표준
// PersonMore.prototype.constructor = PersonMore;

// PersonMore.prototype.avg = function(){
// 	return (this.first + this.second + this.third)/3;
// }
// let kim = new PersonMore("kim", 10, 20, 30);
// console.log(kim.sum());
// console.log(kim.avg());
// console.log(kim.constructor);


class obb {
	constructor(){
		this.ghk = 10;
	}
}

let di = new obb();
console.log(di.ghk);
console.log(obb.ghk);
