$(function(){

	//다국어로 된 테마를 영어 테마로 리턴
	var getTranslateTheme = function(theme){
		theme = theme.toUpperCase();
		if( theme == "MINIMALIST" || theme == "MINIMALISMUS" || theme == "MINIMALISMO" ){
			return "minimalist";
		}else if( theme == "NATURAL" || theme == "NATUERLICH" || theme == "NATURALE" ){
			return "natural";
		}else{
			return "sleek";
		}
	}

	/////// 함수 및 변수 선언
	var DESIGN_D = 1920;			// PC 기준 해상도
	var DESIGN_T = 1600;			// 타블렛 기준 해상도
	var DESIGN_M = 640;				// 모바일 기준 해상도
	var DEVICE_MAX = 767;
	var DEVICE_BTW = 1599;
	var DEVICE_MIN = 768;

	//화면 및 테마 설정
	var showroomCrId = "showroom_carousel";		//캐러셀 아이디
	var arrUrl = window.location.href.split("#");
	var curHref = arrUrl[0];
	var arrUrl2 = window.location.href.split("/");

	var site = "";
	var siteTemp = arrUrl2[arrUrl2.length-2] + " / " + arrUrl2[arrUrl2.length-1];
	var arrSite = siteTemp.split("-");
	var strTemp = "";
	for( var i = 0 ; i < arrSite.length ; i++ ) strTemp += arrSite[i];
	if( strTemp.indexOf("kitchen") != -1 || strTemp.indexOf("kueche") != -1 || strTemp.indexOf("cucina") != -1 || strTemp.indexOf("cocina") != -1 ){
		site = "kitchen";
	}else if( strTemp.indexOf("laundryroom") != -1 || strTemp.indexOf("waeschekammer") != -1 || strTemp.indexOf("lavanderia") != -1 || strTemp.indexOf("cuarto-de-lavado") != -1 ){
		site = "laundryroom";
	}else{
		site = "livingroom";
	}

	var isHeaderTabOn = false;
	var theme = window.location.hash.substr(1);
	theme = getTranslateTheme(theme);
	if( theme == "" || theme == null ) theme = "sleek";
	var defaultItemNo = 1;
	$("#" + showroomCrId).removeClass("showroom_livingroom");
	$("#" + showroomCrId).removeClass("showroom_kitchen");
	$("#" + showroomCrId).removeClass("showroom_laundryroom");
	$("#" + showroomCrId).removeClass("showroom_minimalist");
	$("#" + showroomCrId).removeClass("showroom_natural");
	$("#" + showroomCrId).removeClass("showroom_sleek");
	$("#" + showroomCrId).addClass("showroom_" + site);
	$("#" + showroomCrId).addClass("showroom_" + theme);
	switch( theme ){
		case "minimalist":
			defaultItemNo = 1; break;
		case "natural":
			defaultItemNo = 2; break;
		case "sleek":
			defaultItemNo = 3; break;
	}

	/////// 쇼룸 캐러셀
	var showroomCrOpt = {
		"hv" : "h",								//h: 가로, v : 세로
		"swipe" : true,							//스와이프 가능 여부
		"moveButton" : true,					//좌우 이동 버튼
		"navigationButton" : true,				//내비게이션 버튼
		"navNormalColor" : "#FFFFFF",			//내비게이션 버튼 색상
		"navHoverColor" : "#FFFFFF",			//내비게이션 버튼 오버시 색상
		"autoPlayFlag" : true,					//자동 플레이 여부
		"playButton" : true,					//자동 플레이 버튼
		"autoPlaySpeed" : 12000,				//자동 플레이 속도. duration. 단위 : ms
		"autoPlayDir" : "right",				//자동 플레이 방향
		"moveItemNum" : 1,						//버튼(or 자동플레이) 한번에 넘어가는 아이템 개수
		"itemChangeSpeed" : 700,				//아이템 전환 속도. duration. 단위 : ms
		"itemAlign" : "center",					//아이템 정렬
		"itemRepeat" : true,					//아이템 무한 반복 여부
		"defaultItemNo" : defaultItemNo			//처음에 보여질 아이템 번호
	};

	var showroom_carousel = new ShowroomCarousel(
				$("#" + showroomCrId),
				$("#" + showroomCrId + " .carouselItems"),
				$("#" + showroomCrId + " .carouselUI"),
				showroomCrId,
				showroomCrOpt
	);

	//캐러셀 초기화
	showroom_carousel.initSwiper();



	//캐러셀 아이템을 나타낸다.
	var loadItemCnt = 0;
	var showCarouselItemContent = function(theme){
		var dataObj = showroomCarouselDataObj[site][theme];

		//1. 아이템 나타내기
		var mySrc = null;
		var addTagStr = "";
		var curScreenMode = getDeviceMode();
		var ori =  getOri();
		var parentEl = $("#" + showroomCrId + " .carouselItems .view_" + theme).eq(0);

		if( curScreenMode == "mobile" ){
			if( ori == "l" ) mySrc = dataObj["content"]["mobile-w"]; else mySrc = dataObj["content"]["mobile"];
		}else if( curScreenMode == "tablet" ){
			mySrc = dataObj["content"]["tablet"];
		}else{
			mySrc = dataObj["content"]["pc"];
		}

		if( mySrc.indexOf(".mp4") == -1 ){
			//컨텐츠가 이미지인 경우

			//그라데이션 제거
			if( $(parentEl).find(".exBtnWrapper .showroomGradation").length > 0 ) $(parentEl).find(".exBtnWrapper .showroomGradation").remove();

			addTagStr = "<img src=\"" + mySrc + "\" alt=\"\">";
			if( $(parentEl).children("img").length > 0 ) $(parentEl).children("img").eq(0).remove();
			if( $(parentEl).children("video").length > 0 ) $(parentEl).children("video").eq(0).remove();
			$(parentEl).prepend(addTagStr);
			$(parentEl).children("img").eq(0).on("load",function(){
				if( ++loadItemCnt >= showroom_carousel.maxItem ){
					loadItemCnt = 0;
					if( $("#" + showroomCrId + " .view_" + theme + " .goExBtn").eq(0).css("display") == "none" ) showroom_carousel.startCarousel();
					else showroom_carousel.adjustTopForSiteTheme();
				}
			});
		}else{
			//컨텐츠가 동영상인 경우

			//그라데이션 삽입
			if( $(parentEl).find(".exBtnWrapper .showroomGradation").length == 0 ){
				$(parentEl).find(".exBtnWrapper").prepend("<div class=\"showroomGradation\"></div>");
				$(parentEl).find(".exBtnWrapper .showroomGradation").css({
																			"width": showroom_carousel.itemSize - showroom_carousel.scrollBarWidth,
																			"height": showroom_carousel.itemsMaskEl.height(),
																			"margin-top": -1 * Number(showroom_carousel.itemsEl.css("margin-top").split("px")[0])
																		});

			}

			addTagStr = "<video id=\"\" muted><source src=\"" + mySrc + "\" type=\"video/mp4\" /></video>";
			if( $(parentEl).children("img").length > 0 ) $(parentEl).children("img").eq(0).remove();
			if( $(parentEl).children("video").length > 0 ) $(parentEl).children("video").eq(0).remove();
			$(parentEl).prepend(addTagStr);
			var video = $(parentEl).children("video").eq(0);
			video.on("loadeddata",function(){
				if( ++loadItemCnt >= showroom_carousel.maxItem ){
					loadItemCnt = 0;
					if( $("#" + showroomCrId + " .goExBtn").eq(0).css("display") == "none" ) showroom_carousel.startCarousel();
					else{
						$(".showroomGradation").show();
						showroom_carousel.curVideoStart();
						showroom_carousel.adjustTopForSiteTheme();
						showroom_carousel.refreshExBtn();
					}
				}
			});
		}

	}

	//현재 해상도에 따라 데스크탑, 타블렛, 모바일 여부를 판단
	var getScreenMode = function(){
		if( $(window).outerWidth() <= DEVICE_MAX ) return "mobile";
		else if( $(window).outerWidth() <= DEVICE_BTW ) return "tablet";
		else return "pc";
	}

	var getOri = function(){
		if( $(window).outerWidth() <= $(window).outerHeight() ) return "p"; else return "l";
	}

	//스마트폰, 타블렛, PC접속 구분
	var getDeviceMode = function(){
		var pf = navigator.platform;
		var ua = navigator.userAgent;
		if(/ipad/i.test(pf)){
			// ipad
			return "tablet";
		}else if(/iphone/i.test(pf)){
			// iphone
			return "mobile";
		}else if(/linux armv/i.test(pf)){
			//android
			if(/SHW-M/i.test(ua)){
				// galaxy tab
				return "tablet";
			}else{
				// smart phone
				var ori = getOri();
				if( ori == "l" ){
					if( $(window).outerWidth() < 800 ) return "mobile"; else return "tablet";
				}else{
					if( $(window).outerWidth() < 500 ) return "mobile"; else return "tablet";
				}
				return "mobile";
			}
		}else{
			// pc
			var curScreenMode = getScreenMode();
			if( curScreenMode == "mobile" ) return "mobile"; else return "pc";
		}
	}

	//실제 디바이스 구분 - 스크린 사이즈에 관계없이 실제 접속한 디바이스를 리턴
	var getDevice = function(){
		var pf = navigator.platform;
		var ua = navigator.userAgent;
		if(/ipad/i.test(pf)){
			// ipad
			return "tablet";
		}else if(/iphone/i.test(pf)){
			// iphone
			return "mobile";
		}else if(/linux armv/i.test(pf)){
			//android
			if(/SHW-M/i.test(ua)){
				// galaxy tab
				return "tablet";
			}else{
				// smart phone
				var ori = getOri();
				if( ori == "l" ){
					if( $(window).outerWidth() < 800 ) return "mobile"; else return "tablet";
				}else{
					if( $(window).outerWidth() < 500 ) return "mobile"; else return "tablet";
				}
				return "mobile";
			}
		}else{
			return "pc";
		}
	}

	//px → vw
	var getVw = function(target, standard){
		var vw_context = (standard * .01);
		return (target / vw_context);
	}


	//현재 화면에 따라 헤더 탭 on-off 업데이트
	var updateHeaderTabOnOff = function(){
		$(".header-wrap .showroomTabHeader .tabs li").each(function(){
			if( site == "livingroom" ){
				if( $(this).children("a").attr("href").indexOf("living-room") != -1 ){
					$(this).addClass("on");
					$(this).children("a").removeAttr("adobe-click");
					$(this).children("a").removeAttr("adobe-value");
				}else $(this).removeClass("on");
			}else if( site == "kitchen" ){
				if( $(this).children("a").attr("href").indexOf("kitchen") != -1 ){
					$(this).addClass("on");
					$(this).children("a").removeAttr("adobe-click");
					$(this).children("a").removeAttr("adobe-value");
				}else $(this).removeClass("on");
			}else if( site == "laundryroom" ){
				if( $(this).children("a").attr("href").indexOf("laundry-room") != -1 ){
					$(this).addClass("on");
					$(this).children("a").removeAttr("adobe-click");
					$(this).children("a").removeAttr("adobe-value");
				}else $(this).removeClass("on");
			}
		});
	}

	//[글로벌 ONLY] 헤더 탭 컨트롤
	var headerTabControll = function(){
		var carouselTop = $("#" + showroomCrId).offset().top - $(window).scrollTop();
		var wrapHeight = $(".signature-header .header-wrap").outerHeight();
		if( carouselTop <= wrapHeight && wrapHeight < 200){
			if( !isHeaderTabOn ){
				// 헤더 탭 나타내기
				isHeaderTabOn = true;
				updateHeaderTabOnOff();
				$("head style[data-headerTab]").remove();
				if( getDeviceMode() == "mobile" ){
					var tabHeaderStr = "<style data-headerTab>";
					tabHeaderStr += ".signature-header .showroomTabHeader .tabs ul { padding: 0; margin-left: -17px; } .signature-header .showroomTabHeader .tabs ul li a { padding: 0 2px 0 2px; }";
					tabHeaderStr += ".signature-header .showroomTabHeader .tabs ul li a{letter-spacing:-1px;}";
					tabHeaderStr += "</style>";
					$("head").append(tabHeaderStr);
				}else{
					$(".header-wrap .showroomTabHeader").show();
				}
			}
		}else{
			if( isHeaderTabOn ){
				// 헤더 탭 감추기
				isHeaderTabOn = false;
				$("head style[data-headerTab]").remove();
				if( getDeviceMode() == "mobile" ){
					$("head").append("<style data-headerTab>.signature-header .logo { display:block !important; } .signature-header .showroomTabHeader { display:none !important; }</style>");
				}else{
					$(".header-wrap .logo").show();
					$(".header-wrap .showroomTabHeader").hide();
				}
			}
		}
	}

	var lastScreenMode = getDeviceMode();
	var lastOri = getOri();

	// 현재 화면 크기에 맞게 캐러셀 업데이트
	var updateScreenSize = function(){
		var curScreenMode = getDeviceMode();
		var ori = getOri();
		var tabEl = $(".showroom-contents .showroomTabArea .showroomTabs");
		updateHeaderTabOnOff();
		if( curScreenMode == "mobile" ){
			if( $(tabEl).outerWidth() != 0 ){
				var tabWidth = Number(tabEl.find("li").eq(0).outerWidth()) + Number(tabEl.find("li").eq(1).outerWidth()) + Number(tabEl.find("li").eq(2).outerWidth());
				if( $(window).innerWidth() <= tabWidth ){
					tabEl.css( {"left":"0", "margin-left":"0", "text-align":"left", "width":"auto"} );
				}else{
					tabEl.css( {"left":"50%", "margin-left":"-300px", "text-align":"center", "width":"600px"} );
				}
			}
		}

		if( lastScreenMode != curScreenMode || ( curScreenMode != "pc" && lastScreenMode == curScreenMode && ori != lastOri ) ){

			loadItemCnt = 0;
			$("#" + showroomCrId + " .carouselItems").children("div").each(function(idx,item){ showCarouselItemContent($(this).attr("class").split("_")[1]); });
			if( curScreenMode == "tablet" ){
				tabEl.css( {"left":"50%", "margin-left":"-300px", "text-align":"center", "width":"600px"} );
			}else if( curScreenMode == "pc" ){
				tabEl.css( {"left":"50%", "margin-left":"-300px", "text-align":"center", "width":"600px"} );
			}
			lastScreenMode = curScreenMode;
			lastOri = ori;
		}
		headerTabControll();
	}


	//주어진 data-site를 해석하여 해당 화면으로 이동
	var moveSite = function(dataSite){

		/*
			◎상단 탭 태그 상에 data-site속성으로 리빙룸/키친/런드리룸 구분값이 명시되어 있는데, 이 값을 해당 화면의 경로명에 쓸 수 있는 문자열로 바꿔준다.
			1. 해당 국가 언어가 영어인 경우 : data-site와 디렉토리명이 다를 수 있으므로 올바른 디렉토리명으로 바꿔줘야 한다.
				예) [data-site]livingroom ←→ [경로명]living-room

			2. 비영어권인 경우 : data-site와 디렉토리 이름이 같으므로 바꿀 필요 없다.
				예) [data-site]cuarto-de-lavado = [경로명]cuarto-de-lavado
		*/
		var moveFlag = false;
		switch( site ){
			case "livingroom":
				if( dataSite != "livingroom"
					&& dataSite != "wohnzimmer"
					&& dataSite != "soggiorno"
					&& dataSite != "salon"
					&& dataSite != "sala"
				) moveFlag = true;
			break;

			case "kitchen":
				if( dataSite != "kitchen"
					&& dataSite != "kueche"
					&& dataSite != "cucina"
					&& dataSite != "cocina"
				) moveFlag = true;
			break;

			case "laundryroom":
				if( dataSite != "laundryroom"
					&& dataSite != "waeschekammer"
					&& dataSite != "lavanderia"
					&& dataSite != "cuarto-de-lavado"
				) moveFlag = true;
			break;
		}

		if( moveFlag ){
			var myDirName = dataSite;
			switch( dataSite ){
				case "livingroom":
					myDirName = "living-room"; break;
				case "kitchen":
					myDirName = "kitchen"; break;
				case "laundryroom":
					myDirName = "laundry-room"; break;
			}
			location.href = "/global/lg-signature/brand/showroom/" + myDirName;
		}

	}



	// 브레드크럼 세팅
	var siteNameObj = {
		"livingroom" : "Living room",
		"kitchen" : "Kitchen",
		"laundryroom" : "Laundry room"
	};
	var themeNameObj = {
		"minimalist" : "Minimalist",
		"natural" : "Natural",
		"sleek" : "Sleek"
	};

	var firstTheme = $("#" + showroomCrId + " .carouselItems > div").eq(0).attr("class").split("_")[1];

	// 탭 태그의 data-site값을 영어 외의 다른 언어를 사용하는 국가의 다국어 지원
	var onSite = "livingroom";
	if( site == "kitchen" ) onSite = "kitchen";
	else if( site == "laundryroom" ) onSite = "laundryroom";

	// 상단 탭 활성화
	$(".showroom-contents .showroomTabArea .showroomTabs ul li[data-site='" + onSite + "']").addClass("on");
	$(".showroom-contents .showroomTabArea .showroomTabs ul li[data-site='" + onSite + "']").css("cursor", "default");

	// 탭 이벤트
	$(".showroom-contents .showroomTabArea .showroomTabs ul li").on("click",function(){ moveSite($(this).attr("data-site")); });

	var touchStartTabX = null;
	var touchStartCarX = null;
	var touchStartCarY = null;
	var inDragTab = false;
	var inDragScroll = false;

	var onTouchStartTab = function(event){
		touchStartTabX = event.originalEvent.changedTouches[0].pageX;
	}

	var onTouchStartCarousel = function(event){
		touchStartCarX = event.originalEvent.changedTouches[0].pageX;
		touchStartCarY = event.originalEvent.changedTouches[0].pageY;
	}

	//(+)버튼 클릭 처리
	var onClickExBtn = function(event){
		var tx = null;
		var ty = null;
		var btnDiffX = 0;
		var btnDiffY = 0;
		if( getDevice() == "pc" ){
			tx = event.pageX;
			ty = event.pageY;
		}else{
			tx = event.originalEvent.changedTouches[0].pageX;
			ty = event.originalEvent.changedTouches[0].pageY;
			btnDiffX = Math.abs(touchStartCarX - tx);
			btnDiffY = Math.abs(touchStartCarY - ty);
		}
		if( btnDiffX < 3  && btnDiffY < 3 ){
			var theme = showroom_carousel.arrTheme[showroom_carousel.curThemeNo].toLowerCase();
			var themeEl = $("#" + showroomCrId + " .carouselItems .view_" + theme);
			var dataObj = showroomCarouselDataObj[site][theme];
			var btnCnt = $(themeEl).find(".goExBtn").length;
			var btnEl = $(themeEl).find(".goExBtn");
			var curDevice = getDeviceMode();
			if( curDevice == "mobile" && getOri() == "l" ) curDevice += "_w";
			for( var i = 0 ; i < btnCnt ; i++ ){
				(function(btnNo){
					var myBtnEl = btnEl.eq(i);
					if( $(myBtnEl).length > 0 ){
						var btnX = Number(myBtnEl.offset().left) + Number(myBtnEl.outerWidth()/2);
						var btnY = Number(myBtnEl.offset().top) + Number(myBtnEl.outerHeight()/2);
						if( Math.abs( tx - btnX ) < myBtnEl.outerWidth() / 2 && Math.abs( ty - btnY ) < myBtnEl.outerHeight() / 2 ){
							location.href = dataObj["exBtn_" + curDevice][btnNo].url;
						}
					}
				})(Number(i)+1);
			}// for
		}
		if( getDevice() != "pc" ){
			inDragTab = false;
			inDragScroll = false;
			touchStartTabX = null;
			touchStartCarX = null;
			touchStartCarY = null;
		}
	}

	//탭 스와이프 처리
	var onTouchMoveTab = function(event){
		if( event.originalEvent.changedTouches.length > 1 ) return;
		if( getDeviceMode() != "mobile" ) return;
		if( $(window).outerWidth() >= $(window).outerHeight() ) return;

		//탭 영역 좌우 스와이프 처리
		var tabEl = $(".showroom-contents .showroomTabArea .showroomTabs");
		var tabWidth = Number(tabEl.find("li").eq(0).outerWidth()) + Number(tabEl.find("li").eq(1).outerWidth()) + Number(tabEl.find("li").eq(2).outerWidth());
		if( $(window).innerWidth() > tabWidth ) return;
		var tabConEl = $(tabEl).parent();
		if( touchStartTabX != null){
			var diff = event.originalEvent.changedTouches[0].pageX - touchStartTabX;
			if( Math.abs(diff) < 1 ) return false;
			inDragTab = true;
			var destX = Number($(tabEl).offset().left) + Number(diff);

			//스와이프 한계선
			var swipeLimitR = $(tabConEl).outerWidth();
			var tabR = Number($(tabEl).position().left) + Number($(tabEl).outerWidth());
			if( destX > 0 ) destX = 0;
			else if( Number(tabR) + Number(diff) < swipeLimitR ) destX = $(tabConEl).outerWidth() - $(tabEl).outerWidth();

			$(tabEl).css("left", destX + "px");
			touchStartTabX = event.originalEvent.changedTouches[0].pageX;
		}
	}

	$(".showroom-contents .showroomTabArea .showroomTabs ul li").on("touchstart",function(event){ onTouchStartTab(event); });
	$(".showroom-contents .showroomTabArea .showroomTabs").on("touchmove",onTouchMoveTab);
	$("#" + showroomCrId).on("touchstart", function(event){ onTouchStartCarousel(event); });
	$(window).on("touchend", function(event){ onClickExBtn(event); });


	/////// 화면과 테마에 따라 배경 이미지와 (+)버튼 세팅
	$("#" + showroomCrId + " .carouselItems").children("div").each(function(idx,item){

		var theme = $(this).attr("class").split("_")[1];
		var dataObj = showroomCarouselDataObj[site][theme];

		//1. 아이템 나타내기
		showCarouselItemContent(theme);

		//2. PC > (+)버튼 이벤트
		var btnEl = $(this).find(".goExBtn").eq(0);
		if( Object.keys(dataObj).length == 1 ){ btnEl.hide(); return true; }		//해당 테마의 버튼 데이터가 없을 경우

		for( var key in dataObj ){
			if( key == "exBtn_" + getDeviceMode() ){
				var btnNo = 1;
				for( var numberKey in dataObj[key] ){

					var exBtnObj = dataObj[key][numberKey];
					var myBtnEl = btnEl;

					//(+)버튼이 하나 이상일 때는 기존 버튼을 복사한다.
					if( Number(numberKey) > 1 ){
						myBtnEl = btnEl.clone();
						btnEl.parent().append(myBtnEl);
					}

					if( theme == "sleek" ){
						if( btnNo == "1" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-sleek-dishwasher");
						}else if( btnNo == "2" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-sleek-wine-cellar");
						}else if( btnNo == "3" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-sleek-refrigerator");
						}
					}else if( theme == "minimalist" ){
						if( btnNo == "1" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-minimalist-oven");
						}else if( btnNo == "2" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-minimalist-wine-cellar");
						}else if( btnNo == "3" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-minimalist-refrigerator");
						}
					}else if( theme == "natural" ){
						if( btnNo == "1" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-natural-refrigerator");
						}else if( btnNo == "2" ){
							$(myBtnEl).attr("adobe-click", "signature-online-showroom-room-products");
							$(myBtnEl).attr("adobe-value", "products-natural-wine-cellar");
						}
					}

					//버튼 텍스트
					$(myBtnEl).find("p").text(exBtnObj["btnText"]);

					(function(btnNo){ myBtnEl.on("click", function(event){ if( getDevice() != "pc" ) return; onClickExBtn(event); }); })(btnNo);

					btnNo++;
				}
				break;
			}

		}

	});

	//(+)버튼 마우스오버 이벤트 연결
	if( getDeviceMode() == "pc" ) showroom_carousel.invokeExBtn();
	updateScreenSize();		//모바일 > 탭 수평위치 잡기

	$(window).resize(function(){ updateScreenSize(); });

	$(window).scroll(function(){ headerTabControll(); });

	if( getDeviceMode() == "mobile" && getOri() == "l" ){
		var hederTabIntervalCnt = 0;
		var hederTabIntervalID = setInterval(function(){
			if( $(".header-wrap .showroomTabHeader .tabs li").length > 0 ){
				updateHeaderTabOnOff();
				headerTabControll();
				clearInterval(hederTabIntervalID);
			}
			if( hederTabIntervalCnt++ > 400 ) clearInterval(hederTabIntervalID);
		},10);
	}

});

window.onload = function(){


}