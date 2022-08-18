console.log("welcome cookie");

const atk = "공격력";
const hp = "체력";
const def = "방어력";
const atk_spd = "공격속도";
const cooldown = "쿨타임";
const crit_per = "치명타 확률";
const dmg_regist = "피해감소";
const crit_regist = "치명타 피해감소";
const amplify_buff = "이로운 효과 증가";
const debuff_regist = "해로운 효과 감소";

const raspberry = "라즈베리";
const chocolate = "초콜릿칩";
const almond = "아몬드";
const walnet = "호두";
const peanut = "땅콩";
const caramel = "카라멜";
const hazelnet = "헤이즐넛";
const chococandy = "초코캔디";
const kiwi = "키위";
const applejelly = "애플젤리";

const upgrade_step = {
	[raspberry] : 0.5,
	[chocolate] : 0.1,
	[almond] : 0.1,
	[walnet] : 0.5,
	[peanut] : 0.5,
	[caramel] : 0.5,
	[hazelnet] : 0.1,
	[chococandy] : 0.1,
	[kiwi] : 0.1,
	[applejelly] : 0.5,
}
const base = {
	[raspberry] : 3,
	[chocolate] : 1.8,
	[almond] : 1.8,
	[walnet] : 3,
	[peanut] : 3,
	[caramel] : 3,
	[hazelnet] : 1.8,
	[chococandy] : 1.8,
	[kiwi] : 1.8,
	[applejelly] : 3,
}
const grades = {
	elementary : "",
	middle : "",
	advanced : {
		"0.5" : 3,
		"0.1" : 1.8,
	},
}
const limit = {
	atk : 3,
	hp : 3,
	def : 3,
	atk_spd : 3,
	cooldown : 2,
	crit_per : 3,
	dmg_regist : 6,
	crit_regist : 4,
	amplify_buff : 2,
	debuff_regist : 2,
	level : {
		elementary : 6,
		middle : 9,
		advanced : 12
	}
}

const my_toppings = [
	// {
	// 	name :  raspberry,
	// 	grade : grades.advanced,
	// 	level : limit.level.advanced,
	// 	passive : [
	// 		{
	// 			name : cooldown,
	// 			value : 1.7
	// 		},
	// 		{
	// 			name : dmg_regist,
	// 			value : 6
	// 		},
	// 		{
	// 			name : crit_regist,
	// 			value : 3.5
	// 		}
	// 	]
	// },
	
	// rasberry
	{
		id : 1,
		name :  raspberry,
		level : 12,
		"6" : [hp, 2.4],
		"9" : [crit_per, 2.7],
		"12" : [atk, 2.7]
	},
	{
		id : 2,
		name :  raspberry,
		level : 12,
		"6" : [cooldown, 1.9],
		"9" : [debuff_regist, 1.1],
		"12" : [crit_per, 2.7]
	},
	{
		id : 3,
		name :  raspberry,
		level : 12,
		"6" : [dmg_regist, 2.5],
		"9" : [cooldown, 1.9],
		"12" : [debuff_regist, 1.5]
	},
	{
		id : 4,
		name :  raspberry,
		level : 12,
		"6" : [dmg_regist, 5.2],
		"9" : [atk, 2.1],
		"12" : [crit_per, 2.7]
	},
	{
		id : 5,
		name :  raspberry,
		level : 12,
		"6" : [crit_per, 2.6],
		"9" : [atk, 1.6],
		"12" : [hp, 2.1]
	}
];

function print(_topping){
	const {name, level, "6" : passive1, "9" : passive2, "12" : passive3} = _topping;

	console.group(`${name}`);
	// console.log(level);
	// console.log(upgrade_step[name]);
	// console.log(base[name]);
	console.log(passive1);
	console.log(passive2);
	console.log(passive3);
	const arr = [passive1, passive2, passive3];
	console.log(`Topping base : ${level * upgrade_step[name] + base[name]}`);
	console.groupEnd(`${name}`);
	
}
const flat_set_all_passive = (_topping_set)=>{
	const set_value = _topping_set.reduce((acc, set)=>{
		const {id, name, "6" : passive1, "9" : passive2, "12" : passive3} = set;

		acc.push(passive1);
		acc.push(passive2);
		acc.push(passive3);
		
		// console.log(acc);
		return acc;
	}, []).reduce((acc, passive, idx, arr)=>{
		const [name, value] = passive;
		acc[name] += value;
		// console.log(acc);
		return acc;
	}, {
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
	});
	console.log(set_value);
}
flat_set_all_passive(my_toppings);
my_toppings.map((topping)=>{
	
	// print(topping);
})

// 원하는 패시브 값을 입력하면
// limit에 가장 가까운 패시브값을 가진 토핑을 내림차순으로 나열하고, 5번째 값과 동일한 토핑들까지 잘라서 토핑의 id값을 배열로 반환한다.
// 반환된 id 배열을 데이터와 매칭하여 두번째 우선순위 값에 대해 위의 과정을 반복한다. 
// 5개를 채우지 못하는 경우, 사용자에게 두번째 우선순위 값을 토핑 5개에서 채우는 것을 더 우선하는지 묻는다.
// 승인하면, 두번째 우선순위의 패시브값으로 1의 과정을 돌고, 1의 배열과 id가 같은 것을 우선 set에 담고, 다른 것 중 배열의 index가 작은 것부터 넣어 5개를 채운다.
// 