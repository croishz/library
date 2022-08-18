// const iter = {
// 	[Symbol.iterator] : function(){
// 		return {
// 			data : [0,1,2,3,4,5],
// 			next :  function(){
// 				return {
// 					value : this.data.pop(),
// 					done : 0 === this.data.length
// 				}
// 			}
// 		}
// 	}
// };


// const list = [
// 	(data) => {console.log("A : ", data); return data.value.map(v => v *= 2);},
// 	(data) => {console.log("B : ", data); return data.value.filter(v => 9 < v);},
// ];
// const stream = stream_generator(list);

// function* stream_generator(_list){
// 	let data = null;
// 	for(i=0; i < _list.length; i++){
// 		console.log("index: ", i);
// 		data = yield;
// 		yield data;
// 	}
// }

// function runner(_generator, _data, _list){
// 	const { length } = _list; 
// 	const stream = _generator(_data, length);
// 	for(i=0; i < length; i++){
// 		let data = stream.next();
// 		stream.next();
// 		_list[i](data);
// 	}
// }
// runner(
// 	stream_generator,
// 	[0,1,2,3,4,5],
// 	[
// 		function A(data){console.log("A : ", data)},
// 		function B(data){console.log("B : ", data.value.map(v => v*= 2 ))}
// 	]
// );
console.log("ready!");
function *stream_generator(initial_value){
	let v = yield initial_value;
	while(true){
		v = yield v;
	}
	// for(i=0; i < list.length; i++){
	// 	v = yield v;
	// }
}
function stream_runner(list, initial_value){
	const stream = stream_generator(initial_value);
	let data = stream.next();
	for(i=0; i < list.length; i++){
		data = stream.next(list[i](data));
		console.log(i, data);
	}
	return data;
}
function A(data){
	console.log(`A input :`, data);
	return data.value.map(v => v*= 2);
}
function B(data){
	console.log(`B input :`, data);
	return data.value.filter(v => 9 < v);
}
console.log(

	stream_runner(
		[A, B], 
		[0,1,2,3,4,5]
	)
);