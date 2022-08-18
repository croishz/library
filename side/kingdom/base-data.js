console.log("welcome cookie topping");
// effect
export const atk = "공격력";
export const hp = "체력";
export const def = "방어력";
export const atk_spd = "공격속도";
export const cooldown = "쿨타임";
export const crit_per = "치명타 확률";
export const dmg_regist = "피해감소";
export const crit_regist = "치명타 피해감소";
export const amplify_buff = "이로운 효과 증가";
export const debuff_regist = "해로운 효과 감소";
// topping name
export const raspberry = "라즈베리";
export const chocolate = "초콜릿칩";
export const almond = "아몬드";
export const walnet = "호두";
export const peanut = "땅콩";
export const caramel = "카라멜";
export const hazelnet = "헤이즐넛";
export const chococandy = "초코캔디";
export const kiwi = "키위";
export const applejelly = "애플젤리";
// base data
export const upgrade_step = {
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
export const base = {
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
export const grades = {
	elementary : "",
	middle : "",
	advanced : {
		"0.5" : 3,
		"0.1" : 1.8,
	},
}
export const limit = {
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