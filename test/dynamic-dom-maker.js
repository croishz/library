// abstract
/*
	1. create schedule markup 
		memorize template => insert value => loop => complete;
	2. move schedule dom tree
		
*/
const static_data = {
	prefix : "ir-",
	cell : {
		classList : ["ir-calendar-day", "ir-calendar-have-event", "ir-calendar-week-rest"],
		length : [new Date().getMonth + 1].reduce((length, this_month)=>{ 
			switch(this_month){
				case 2 :
					// 양력 윤달은 4년에 한번, 그러나 100년째는 생략. 다만 다시 4번째 100년은 셈한다.
					// 10진수에서 4의 배수에서 손을 접는다. 그러나 그 n번째 10은 건너뛰고 다시 그 n번째의 4의 배수에서 접는다. 
					if(new Date().getFullYear() % 400 === 0) return length = 29;
					if(new Date().getFullYear() % 4 === 0 && new Date().getFullYear() % 100 !== 0) return length = 29;
					return length = 28;
				case 4 :
				case 6 :
				case 9 :
				case 11 :
					return length = 30;
				default : return length;
			}
			return length;}, 31),
		start_weekend : [1, 2],	// 첫주 주말 일자 [토요일, 일요일]
		event_date : [10, 12, 28]	// 행사 일자
	}
}
function tree_maker(param){
	const {classList, length, start_weekend, event_date, viewport} = param;
	const template = (props)=> {
		const cell_tagname = props.viewport !== "mobile" ? "div" : "td";
		const date_tagname = props.haveEvent ? "a" : "span"; 
		return `
			<${cell_tagname} class="${props.classList.join(" ")}">
				<${date_tagname} ${props.haveEvent ? `href="#" aria-selected="false"` : ``}>
					${props.date}
				</${date_tagname}>
			</${cell_tagname}>
		`.trim();
	}
	const result = 
		new Array(length).fill("")
		.reduce((tree, virtual_cell, idx)=>{
			const date = idx + 1;
			const saturday = start_weekend[0];
			const sunday = start_weekend[1];
			const haveEvent = event_date.includes(date);
			const no_weekend = saturday !== date % 7 && sunday !== date % 7;
			const filter_classList = (()=>{
				let new_classList = [...classList];
				if(!haveEvent) new_classList = new_classList.filter(classname => classname !== "ir-calendar-have-event");
				if(no_weekend) new_classList = new_classList.filter(classname => classname !== "ir-calendar-week-rest");
				return new_classList;
			})();
			if(viewport === "mobile" && (date % 7 === sunday)) {
				tree += "<tr>"
			}
			tree += template({
				viewport,
				haveEvent,
				classList : filter_classList,
				date
			});
			if(viewport === "mobile" && (date % 7 + 7 === sunday + 7) ) {
				tree += "</tr>"
			}
			return tree;
	}, "");
	return result;
}
const desktop_tree = tree_maker(Object.assign(static_data.cell, {viewport : "desktop"}));
const mobile_tree = tree_maker(Object.assign(static_data.cell, {viewport : "mobile"}));
// console.log(desktop_tree);
console.log(mobile_tree);