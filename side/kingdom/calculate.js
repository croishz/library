'use strict';
// data
import {
	atk,
	hp,
	def,
	atk_spd,
	cooldown,
	crit_per,
	dmg_regist,
	crit_regist,
	amplify_buff,
	debuff_regist,
	raspberry,
	chocolate,
	almond,
	walnet,
	peanut,
	caramel,
	hazelnet,
	chococandy,
	kiwi,
	applejelly,
	upgrade_step,
	base,
	grades,
	limit
} from"./base-data.js";
import {my_toppings} from"./toppings.js";
const effect_array = [atk,hp,def,atk_spd,cooldown,crit_per,dmg_regist,crit_regist,amplify_buff,debuff_regist];
// utils
function print(_topping){
	const {kind, equip, level, "6" : passive1, "9" : passive2, "12" : passive3} = _topping;
	const arr = [passive1, passive2, passive3];

	console.group(`${kind}`);
	console.log(kind);
	console.log(level);
	console.log(equip);
	console.log(upgrade_step[eval(kind)]);
	console.log(base[eval(kind)]);
	console.log(passive1);
	console.log(passive2);
	console.log(passive3);
	console.log(`Topping base : ${level * upgrade_step[eval(kind)] + base[eval(kind)]}`);
	console.groupEnd(`${kind}`);
};
function spread(_topping_list){
	const templete = ({
		id, kind, level, own, equip,
		"6" : passive1, 
		"9" : passive2, 
		"12" : passive3
	})=>{
		return(`
		<div class="topping-item" data-id=${id} data-kind="${kind}">
			<div class="item-head" data-equip-check="${equip}">
				<span class="kind">${kind}</span>
				<span class="level">lv.${level}</span>
				<span class="owner">${equip ? own : "no equip"}</span>
			</div>
			<div class="passive">				
				<div 
					class="effect" 
					data-effect-name="${passive1[0] === null ? "none" : passive1[0]}"
					style="grid-column-start:${effect_array.indexOf(passive1[0]) + 1};grid-column-end:${effect_array.indexOf(passive1[0]) + 2};"
				>
					<span class="value">${passive1[1] === null ? "none" : passive1[1]}</span>
				</div>
				<div 
					class="effect" 
					data-effect-name="${passive2[0] === null ? "none" : passive2[0]}"
					style="grid-column-start:${effect_array.indexOf(passive2[0]) + 1};grid-column-end:${effect_array.indexOf(passive2[0]) + 2};"
				>
					<span class="value">${passive2[1]=== null ? "none" : passive2[1]}</span>
				</div>
				<div 
					class="effect" 
					data-effect-name="${passive3[0] === null ? "none" : passive3[0]}"
					style="grid-column-start:${effect_array.indexOf(passive3[0]) + 1};grid-column-end:${effect_array.indexOf(passive3[0]) + 2};"
				>
					<span class="value">${passive3[1]=== null ? "none" : passive3[1]}</span>
				</div>
			<div>
		</div>
		`);
	}
	const wrap = document.createElement("div");
	wrap.setAttribute("class", "my-topping-list");
	wrap.innerHTML += `
		<div class="effect-list"></div>
	`;
	effect_array.map(effect => {
		wrap.children[0].innerHTML += `<span>${effect}</span>`
	})
	_topping_list.map(topping => {
		wrap.innerHTML += templete(topping)
	});
	document.body.appendChild(wrap);
}
function find_topping(_config, _topping_list){
	const {name, criteria} = _config;
	// console.log(name);
	// console.log(criteria);
	const matched = _topping_list.filter( topping => {
		const {"6" : passive1, "9" : passive2, "12" : passive3} = topping;

		// console.group("effect match check");
		// console.log(passive1[0], passive1[0] === name);
		// console.log(passive2[0], passive2[0] === name);
		// console.log(passive3[0], passive3[0] === name);
		// console.groupEnd("effect match check");

		if(passive1[0] === name && passive1[1] >= criteria) return topping;
		if(passive2[0] === name && passive2[1] >= criteria) return topping;
		if(passive3[0] === name && passive3[1] >= criteria) return topping;
	})
	console.log("matched_list", matched); 
	const sort_list = matched.map( topping => {
		const {id, "6" : passive1, "9" : passive2, "12" : passive3} = topping;
		if(passive1[0] === name){
			return ({
				id,
				value : passive1[1]
			});
		};
		if(passive2[0] === name){
			return ({ 
				id,
				value : passive2[1]
			});
		};
		if(passive3[0] === name){
			return ({
				id,
				value : passive3[1]
			});
		};
		return id;
	}).sort((a, b)=> b.value - a.value );
	console.log("sort_list", sort_list);

	const pick_id = sort_list.map(set => set.id);
	console.log("id_list", pick_id);

	const selected = packing_topping(matched, pick_id);
	console.log("selected_list", selected); 

	return selected;
};
function packing_topping(_compare, _picked, _packing_line = 5){
	return _picked.reduce( (output, id, idx)=>{
		if(_packing_line < idx + 1) return output;
		_compare.forEach ( topping => topping.id === id && output.push(topping) );
		return output;
	}, []);
}
function flat_passive_value(_topping_set){
	const flat_set = _topping_set.reduce((acc, set)=>{
		const {"6" : passive1, "9" : passive2, "12" : passive3} = set;
		acc.push(passive1);
		acc.push(passive2);
		acc.push(passive3);
		return acc;
	}, []);
	return flat_set;
};
function calculate_passive_value(_flat_set){
	const model = {
		[atk] : null,
		[hp] : null,
		[def] : null,
		[atk_spd] : null,
		[cooldown] : null,
		[crit_per] : null,
		[dmg_regist] : null,
		[crit_regist] : null,
		[amplify_buff] : null,
		[debuff_regist] : null
	};
	const passive_accumulate = _flat_set.reduce((acc, passive)=>{
		const [name, value] = passive;
		const empty = name === null;
		const adj_value = value * 10;
		!empty && (acc[name] += adj_value);
		return acc;
	}, model);
	console.log("All passive effect : ", passive_accumulate);
};
// excute
(function(){
	my_toppings.forEach(topping => print(topping));
	spread(my_toppings);
	const sample = find_topping({name : dmg_regist, criteria : 0}, my_toppings);
	const flat_set = flat_passive_value(sample);
	calculate_passive_value (flat_set);
})();