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
// console.dir(nero);
// console.dir(vindex);
// console.dir(galba);
// console.dir(otho);
// console.dir(vitellius);
// console.dir(rufus);

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
	const department = {};
	const employees = {};
	return owner = {
		confirm : function(information){
			let employee = null;
			employee = new Member(information);
			employees[information.name] = employee;
			return employee;
		},
		employment : function(){
			
		},
		createTeam : function(Task, manager){
			let team = new Task(manager);
			department[Task.name] = team;
		},
		getResource : function(){
			return [ department, employees ];
		}
	}
})();

const design = function(member){
	this.chief = member.position === "Team Manager" ? member.name : null;
	this.work = ["UI design", "visual design", "proposal prototyping"];		
	this.project = ["LG", "Gorvernent", "SK Telecom"];

	design.prototype.responsibillity = function(member){
		const allocation_running = Math.floor(Math.random() * this.project.length);
		if(member.position !== "Team Manager"){
			member.job = this.project[allocation_running];
		}		
	}
}



const Member = function(information){
	this.name = information.name;
	this.position = information.position;
}
const Jh = companyFactory.confirm({name : "Jh", position: "Team Manager", job : "team management, projects leader"});

companyFactory.createTeam(design, Jh);

console.dir(Jh);
const [department, crewList] = companyFactory.getResource();
console.log("department :", department);
console.log("employees :", crewList);
