	//신문사를 짓다.
	var publisher = {
		subscribers: {
			any : [] // '이벤트 타입 : 구독자의 배열'의 형식
		},
		//등록
		on : function(fn, type) {
			type = type || 'any';
			if(typeof this.subscribers[type] === "undefined"){
			this.subscribers[type] = [];
			}
			this.subscribers[type].push(fn);
		},
		//구독해지
		remove : function(fn, type){
			this.visitSubscribers('remove', fn, type);
		},
		//알림
		fire : function(publication, type){
			this.visitSubscribers('fire', publication, type);
		},
		//신문사의 일하는 사람
		visitSubscribers : function(action, arg, type){
			var pubtype = type || 'any',
			subscribers = this.subscribers[pubtype],
			i,
			max = subscribers.length;
			console.group();
			console.log("visit :", action);
			console.log("visit :", arg);
			console.log("visit :", type, pubtype);
			console.log("visit :", subscribers);
			console.groupEnd();
			for(i=0; i<max; i+=1){
				if(action==='fire'){
					subscribers[i](arg);
				}else{
					if(subscribers[i]===arg){
						subscribers.splice(i,1);
					}
				}
			}

		}
	};

	//객체를 받아 발행자 객체로 바꿔준다.
	//단순히 해당 객체에 범용 발행자 메서드들을 복사해 넣는다.
	function makePublisher(_object){
		for(let key in publisher){
			if(publisher.hasOwnProperty(key) && typeof publisher[key] === "function"){
				_object[key] = publisher[key];
			}
		}
		_object.subscribers = { any: [] };
	}

	//newyorkTimes 신문사
	var newyorkTimes = {
		daily : function() {
			this.fire("big news today");
		},
		monthly : function() {
			this.fire("monthly hot-issue", "monthly");
		}
	};

	//newyorkTimes를 발행자로 만든다.
	makePublisher(newyorkTimes);

	//구독자 객체 joe 생성
	var joe = {
		drinkCoffe : function(daily){
			console.log(daily + '를 읽었습니다.');
		},
		sundayPreNap : function(monthly){
			console.log('월간 ' + monthly + ' 를 읽고있습니다.');
		}
	};

	//newyorkTimes의 구독자 목록에 joe를 추가한다.(joe가 paper를 구독한다.)
	//나 이제 신문을 읽을 것이오~
	//일간신문이 발행이 되면 내 drinkCoffe 메소드를 호출해주시오.
	//월간신문이 발행이 되면 내 sundayPreNap 메소드를 호출해주시오.
	newyorkTimes.on(joe.drinkCoffe);
	newyorkTimes.on(joe.sundayPreNap, 'monthly');

	//joe는 기본 이벤트 타입인 'any'이벤트 발생시 호출될 메서드와, 'monthly'타입의 이벤트 발생시 호출될 메서드를 전달했다.
	//몇가지 이벤트를 발생
	// newyorkTimes.daily(); //"big news today를 읽었습니다."
	// newyorkTimes.daily(); //"big news today를 읽었습니다."
	// newyorkTimes.daily(); //"big news today를 읽었습니다."
	// newyorkTimes.monthly(); //"월간 monthly hot-issue 를 읽고있습니다."