// example
// https://www.zerocho.com/category/JavaScript/post/57b9692ae492d01700b0b75a
const abstractCharater = (function(){
	const jobs = {}
	return {
		addJob : function(job, Character){
			if (Character.prototype.attack){
				jobs[job] = Character;
			}
		},
		create : function(job, options){
			let Character = jobs[job];
			return (Character ? new Character(options) : null);
		}
	}
})();
const Emperor = (function(){
	function Emperor(options){
		this.name = options.name;
	}
	Emperor.prototype.attack = function(target){
		console.log(this.name + "is attack" + target);
	}
	Emperor.prototype.proclaime = function(){
		console.log(this.name + "be Named Emperor himself");
	}
	return Emperor
})();
console.log(Emperor);
const Governor = (function(){
	function Governor(options){
		this.name = options.name;
	}
	Governor.prototype.attack = function(target){
		console.log(this.name + "is attack" + target);
	}
	Governor.prototype.betray = function(){
		console.log(this.name + "is treason Emperor");
	}
	return Governor
})();

abstractCharater.addJob('emperor', Emperor);
abstractCharater.addJob('governor', Governor);
const nero = abstractCharater.create("emperor", {name : "Nero"} );
const vindex = abstractCharater.create('governor', { name: 'Vindex' });
const galba = abstractCharater.create('governor', { name: 'Galba' });
const otho = abstractCharater.create('governor', { name: 'otho' });
const vitellius = abstractCharater.create('governor', { name: 'vitellius' });
const rufus = abstractCharater.create('governor', { name: 'rufus' });
console.dir(nero);
console.dir(vindex);
console.dir(galba);
console.dir(otho);
console.dir(vitellius);
console.dir(rufus);

/*
	로마라는 집단을 구성하는 구성원의 종류는 다양하나, 로마를 구성한다는 점에서 동일하므로, 
	로마에 구성원 그룹을 등록하고, 해당 그룹 안에서 개개의 identity를 가지는 형태로 설계한다. 
	즉, 그룹이 객체를 생성하지 않고, 그보다 상위의 클래스에 생성하는 역할을 넘기고 그룹은 그룹의 특성만 정의하며, 객체 고유의 정보는 독립성을 유지한다.

	이 구조를 회사에 적용하면, 
	회사라는 집단을 구성하는 각 팀이 있고, 각 팀이 맡은 업무가 존재하며, 팀원이 맡는 고유한 상세-직급, 이름 등등...-가 있다.
	
	owner가 팀의 생성 권한을 가지고 구성원 합류를 인가하며, 
	cheif는 팀원에게 업무를 분담하며, 
	member는 직급과 이름을 부여받아 들어와 업무를 받는다.
*/ 

// sampling
const companyFactory = (function(){
	// papers
	const department = {};
	const employees = {};
	// owner
	return owner = {
		confirm : function(information){
			let employee = null;
			employee = new Member(information);
			employees[information.name] = employee;
			return employee;
		},
		createTeam : function(Task, manager){
			let team = new Task(manager);
			department[Task.name] = team;
			manager.teamTask = Task.name;
			manager.job = "team management, projects leader";
		},
		getResource : function(){
			return [ department, employees ];
		},
	}
})();

function Member(information){
	this.name = information.name;
	this.position = information.position;
}

const UIDesign = function design(member){
	const keyword = "design";
	this.work = ["UI design", "visual design"];
	this.project = ["LG", "Gorvernent", "SK Telecom", "Doosan", "Lotte"];

	this.chief = member.position === "Team Manager" ? member.name : null;
	this.chief.authority = design.prototype;

	// this.members = Object.keys(crewList).filter( key => crewList[key].teamTask === keyword);

	design.prototype.join = function(member){
		member.teamTask = keyword;
	}
	design.prototype.assign = function(member){
		const run_allocate = Math.floor(Math.random() * this.project.length);
		console.log(run_allocate);
		if(member.position !== "Team Manager"){
			member.job = this.project[run_allocate];
		}
	}
}
const Frontend = function frontend(member){
	const keyword = "frontend";

	this.work = ["publishing", "incteractive dev"];
	this.project = ["LG", "Gorvernent", "SK Telecom", "Samsung", "Hyundai"];

	this.chief = member.position === "Team Manager" ? member.name : null;
	this.chief.authority = frontend.prototype;

	// this.members = Object.keys(crewList).filter( key => crewList[key].teamTask === keyword);

	frontend.prototype.join = function(member){
		
		member.teamTask = keyword;
	}
	frontend.prototype.assign = function(member){
		const run_allocate = Math.floor(Math.random() * this.project.length);
		if(member.position !== "Team Manager"){
			member.job = this.project[run_allocate];
		}
	}
}
// employment
const Tom = companyFactory.confirm({name : "Tom", position: "Team Manager"});
const Robert = companyFactory.confirm({name : "Robert", position: "Team Manager"});
const Julia = companyFactory.confirm({name : "Julia", position: "Assistant Manager"});

// create team;
companyFactory.createTeam(UIDesign, Tom);
companyFactory.createTeam(Frontend, Robert);

const [department, crewList] = companyFactory.getResource();
console.log("department :", department);
console.log("employees :", crewList);

department.frontend.join(Julia);
department.frontend.assign(Julia);
console.dir(Julia);

/* 개선사항 
1. 각 팀별 명단을 추출할 수 있도록. 
2. 고용이 전제되어야 팀을 만들 수 있다. 팀 생성을 독립적으로. 
3. 전출, 보직 변경에 대한 코드 추가 필요.
4. 팀 별 공통의 코드를 지닌 객체가 필요.
*/