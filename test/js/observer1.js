const Store = function(){
	let state = {
		a: "",
		b: null,
		c: 100,
		d: [0,1,2,3,4]
	}
	return {
		getter : (_param)=>{_param ?? console.log(state)},
		setter : (_param)=>{state = Object.assign({}, state, _param)}
	}
}
const store = Store();
store.setter({a : "test", d : null});
store.getter();


// scenario
/*
	1. Popup의 toggle data를 가질 store를 생성.
	2. Popup store에 popup 객체 등록. 
	3. event
	4. action이 일어난 객체의 data 확인 해당 객체에게 갱신된 data를 전달
	5. callback
*/