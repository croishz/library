function Tab(config){
	'use strict';
	// constructor field
	// method
	const mapAssign = function(_elementArray){
		return Array.prototype.map.call(_elementArray, element => element);
	}
	const getRenderStyle = function(_element, _needValue){
		const measure = /[px, em, rem, vw, vh, %]/gi;
		let value = window.getComputedStyle(_element, null).getPropertyValue(_needValue);

		0 <= value.search(measure) ? value = parseInt(value.replace(measure, "")) : value;
		
		return value;
	}
	const createHTML = (_opt)=>{
		let HTML = config.template;

		HTML =	HTML.replace(/\*rootSelector\*/g, _opt.rootSelector)
					.replace(/\*rootName\*/g, _opt.rootName);

		_opt.appendTarget.innerHTML = HTML;
		// rootElement = document.querySelector(`.${_opt.root}`);
		const rootElement = config.rootElement = _opt.appendTarget.children[0];
		return rootElement;
	}
	const matchLength = (_length)=>{
		if(_length <= this.tabUnits.length) return "aleady done";

		const buttonWrap = this.tabUnits[0].parentElement;
		const panelWrap = this.tabPanelWrap;
		const button = this.tabUnits[0].outerHTML;
		const panel = this.tabPanels[0].outerHTML;
		let tabList = buttonWrap.innerHTML; 
		let tabpanel = panelWrap.innerHTML;

		for(let i=0; i < (_length - this.tabUnits.length); i++ ){
			tabList += button;
			tabpanel += panel;
		}

		buttonWrap.innerHTML = tabList;
		panelWrap.innerHTML = tabpanel;
		
		// update DOM
		this.tabUnits = mapAssign( this.rootElement.querySelectorAll(".tab") );
		this.tabPanels = mapAssign( this.tabPanelWrap.children );
		
		return [_length, "matched"];
	};
	// Flag
	this.autoCreate = config.autoCreate === false && config.autoCreate === undefined ? false : true;
	this.isRTL = config.direction === "rtl" ? true : false;
	this.isAutomaticTab = config.isAutomaticTab === "automatic" ? true : false;
	this.webAccessibility = config.webAccessibility || false;
	// DOM
	this.rootElement = config.template && createHTML(config.dynamicOptions) || config.rootElement;
	this.tabUnits = mapAssign( this.rootElement.querySelectorAll(".tab") );
	this.tabPanelWrap = config.panelWrapElement || this.rootElement.nextElementSibling
	this.tabPanels = mapAssign( this.tabPanelWrap.children );
	this.scrollerContainerSelector = config.scrollerContainerSelector || ".scrollerContainer";
	this.scrollerContainer = this.rootElement.querySelector(this.scrollerContainerSelector);
	this.scrollerSelector = config.scrollerSelector || ".scroller";
	this.scroller = this.rootElement.querySelector(this.scrollerSelector);
	this.indicatorSelector = config.indicatorSelector || ".indicator";
	this.indicator = config.indicator || this.rootElement.querySelector(this.indicatorSelector);
	this.arrows = this.indicator && mapAssign( this.indicator.children );
	// initialize value
	this.name = (this.debug || this.webAccessibility) && ( config.rootElement.getAttribute("data-root-name") || config.rootElement.getAttribute("id") || config.rootElement.getAttribute("class") );
	this.activeClass = config.activeClass || "active";
	this.activeIndex = config.startIndex || 0;
	this.focusIndex = this.activeIndex;
	this.beforeIndex = this.activeIndex;
	this.customKeys = config.customKeys || {};
	this.debounceDuration = config.debounceDuration || 400;
	this.indicatorFor = config.indicatorFor || "scroll";
	this.aria = config.aria || {};
	this.template = config.template || false;
	this.tabLengthMatch = config.template && matchLength(config.tabLength) || "be matched manually";
	this.covertAriaMarkUp = false;
	this.dynamicFetch = config.dynamicFetch || false;
	this.fetchURL = config.fetchURL || "/";
	this.fetchByTab = config.fetchByTab || false;
	this.listData = null;
	this.containerWidth = null;
	this.tabUnitsWidth = null;
	this.boundRange = [0, this.rootElement.offsetWidth];
	this.resizeHandleEvent = null;
	this.swipeHandleEvent = null;
	this.point = {
		new : null,
		start : null,
		last : null,
	}
	// Action type
	const CHOOSE = "CHOOSE";
	const FIRST_TAB = "FIRST";
	const LAST_TAB = "LAST";
	const NEXT_TAB = "NEXT";
	const PREV_TAB = "PREV";
	const SCROLL_LEFT = "SCROLL_LEFT";
	const SCROLL_RIGHT = "SCROLL_RIGHT";
	const SWIPE_START = "SWIPE_START";
	const SWIPE_ING = "SWIPE_ING";
	const SWIPE_END = "SWIPE_END";
	const STEADY = "STEADY";
	
	// Prototype field
	// method
	// fetch data
	const AJAX = ()=>{
		
	};
	Tab.prototype.fetchData = function(_url = this.fetchURL, _callback = this.fetchAPI, _action = "get", _dataType = "json", _parseJSON = true){
		const context = this;
		const xhr = new XMLHttpRequest();
		xhr.responseType = _dataType;
		xhr.onload = (progressEvent)=>{
			_callback.call(context, xhr.response);
			context.dimensionUpdate();
		};
		xhr.open(_action, _url, _parseJSON);
		xhr.send();
	};
	Tab.prototype.fetchAPI = function(_response){
		if(!_response) return false;
		const data = _response.product;
		data.map((contents, idx)=>{
			const unit = this.tabUnits[idx];
			const panel = this.tabPanels[idx];
			unit && (unit.innerText = contents.id);
			panel && (panel.innerText = contents.copy);
		});
	};
	// web accessibility
	Tab.prototype.convertWaiAriaMarkup = function(){
		// catch DOM
		const tabList = this.rootElement;
		const scroller = this.scroller;
		const panelList = this.tabPanelWrap;
		const tabs = this.tabUnits;
		const panels = this.tabPanels;
		const indicator = this.indicator && this.indicator;
		const arrows = this.indicator && this.arrows;
		const initialIndex = this.activeIndex;
		let rootName = this.name.replace("-", "_");

		// Check n Convert markup
		const tabListCheck = tabList.getAttribute("role") === "tablist" ? "check" : tabList.setAttribute("role", "tablist");
		const panelListCheck = (panelList.nodeName !== "UL" && panelList.nodeName !== "OL") ? "check" : panelList.setAttribute("role", "none");
		const tabListTreeCheck = scroller.nodeName !== "LI" ? "check" : scroller.setAttribute("role", "none");
		
		const tabCheck = (()=>{
			tabs.map((tab, idx)=>{
				const order = (idx + 1);
				tab.setAttribute("role", "tab");
				tab.setAttribute("id", `${rootName}_tab${order}`);
				tab.setAttribute("aria-controls", `${rootName}_panel_${order}`);
				tab.setAttribute("aria-selected", false);
				initialIndex === idx &&  tab.setAttribute("aria-selected", true);
			});
			return "check";
		})();
		
		const panelCheck = (()=>{
			panels.map((panel, idx)=>{
				const order = (idx + 1);
				panel.setAttribute("role", "tabpanel");
				panel.setAttribute("id", `${rootName}_panel_${order}`);
				panel.setAttribute("aria-labelledby", `${rootName}_tab${order}`);
			});
			return "check";
		})();

		const indicatorCheck = (()=>{
			if(!this.indicator) return "reject";

			!this.rootElement.getAttribute("id") && this.rootElement.setAttribute("id", rootName); 
			indicator.setAttribute("aria-controls", rootName);
			
			arrows.map((arrow, idx)=>{
				if(this.aria){
					const prevLabel = this.aria.prevLabel ? this.aria.prevLabel : false; 
					const nextLabel = this.aria.nextLabel ? this.aria.nextLabel : false;
					idx === 0 && arrow.setAttribute( "aria-label", (prevLabel || arrow.innerText + "tab") );
					idx === 1 && arrow.setAttribute( "aria-label", (nextLabel || arrow.innerText + "tab") );
				}
				arrow.getAttribute("type") !== "button" && arrow.setAttribute("role", "button");
				arrow.setAttribute("aria-disabled", true);
			});

			return "check";
		})();
		
		const checkList = [tabListCheck, panelListCheck, tabListTreeCheck, tabCheck, panelCheck, indicatorCheck];
		const allCheck = checkList.filter( checker => (checker !== "check" && checker !== undefined && checker !== "reject") );

		return allCheck.length <= 0 ? true : false;
	}
	// Event
	// tab
	Tab.prototype.TabEvent = function(_context){
		if(0 > this.tabUnits.length) return false;
		
		const context = _context || this;
		this.tabUnits.map((unit)=>{
			// click
			unit.addEventListener("click", function(event){
				console.log(event.type);
				context.dispatch({
					action : CHOOSE,
					data : {
						index : context.getIndex(event.target),
						screenX : context.point.last
					}
				})
			});
			// keyboard
			unit.addEventListener("keyup", function(event){
				console.log(event.type);
				context.dispatch({
					action : context.keyChecker(event.keyCode),
					data : {
						index : context.focusIndex,
						screenX : context.point.last
					}
				})
			});
		});

		return context;
	};
	Tab.prototype.getIndex = function(_target){
		const siblings = mapAssign( _target.parentElement.children);
		const index = siblings.findIndex( element => element === _target);
		
		return index;
	};
	Tab.prototype.keyChecker = function(_keyCode){
		const customKeys = this.isRTL ? {} : this.customKeys;
		const keyList = Object.assign({
			// default keys;
			"40" : !this.isRTL ? NEXT_TAB : PREV_TAB,
			"39" : !this.isRTL ? NEXT_TAB : PREV_TAB,
			"38" : !this.isRTL ? PREV_TAB : NEXT_TAB,
			"37" : !this.isRTL ? PREV_TAB : NEXT_TAB,
			"36" : FIRST_TAB,
			"35" : LAST_TAB,
			"13" : CHOOSE
		}, customKeys);
		const action = keyList[`${_keyCode}`]; 

		return action;
	};
	// indicator
	Tab.prototype.indicatorEvent = function(_context){
		if(!this.indicator) return false;
		
		const context = _context || this;
		this.arrows.map((arrow)=>{
			arrow.addEventListener("click", function(event){
				const label = event.target.getAttribute("aria-label");
				const indicatorChecker = Array.prototype.findIndex.call(context.arrows,  arrow => arrow === event.target); 
				let action = null;
				let data = {};

				// Tab type
				if(context.indicatorFor === "tab"){
					action = label ? context.indicatorLabelChecker(label) : (indicatorChecker === 0) ? PREV_TAB : NEXT_TAB,
					data = {
						index : context.focusIndex,
						screenX : context.point.last || 0
					}
				}
				// Scroll type
				if(context.indicatorFor === "scroll"){
					action = label ? context.indicatorLabelChecker(label) : (indicatorChecker === 0) ? SCROLL_LEFT : SCROLL_RIGHT,
					data = {
						index : context.focusIndex,
						screenX : context.point.last || 0
					}
				}

				context.dispatch({
					action,
					data
				});
				
				return false;
			});
		});

		return context;
	};
	Tab.prototype.indicatorLabelChecker = function(_label){
		const action = {
			"Previous tab" : PREV_TAB,
			"Next tab" : NEXT_TAB,
			"Scroll left" : SCROLL_LEFT,
			"Scroll right" : SCROLL_RIGHT
		};

		return action[_label]; 
	};
	// swipe
	Tab.prototype.swipeLifeCycle = function(_action, _event){
		const action = _action;
		const screenX = _event.changedTouches ? _event.changedTouches[0].screenX : _event.screenX;
		const isTouch = _event.touches ? true : false;
		const object = {
			action,
			data : {
				screenX : screenX,
				isTouch
			}
		};

		this.dispatch(object);

		return this;
	};
	Tab.prototype.swipeHandler = function(_context){
		const context = _context || this;
		return function swipeHandleEvent(event){
			switch(event.type){
				case "mousedown" : 
				case "touchstart" : 
					context.swipeLifeCycle(SWIPE_START, event);
					break;
				case "mousemove" : 
				case "touchmove" : 
					context.swipeLifeCycle(SWIPE_ING, event);
					break;
				case "mouseup" : 
				case "touchend" : 
					context.swipeLifeCycle(SWIPE_END, event);
					break;
			}
		}
	};
	Tab.prototype.swipe = function(){
		this.scrollerContainer.addEventListener("mousedown", this.swipeHandleEvent, false);
		this.scrollerContainer.addEventListener("touchstart", this.swipeHandleEvent, false);
	};
	Tab.prototype.swipeClosed = function(){
		this.scrollerContainer.removeEventListener("mousedown", this.swipeHandleEvent, false);
		this.scrollerContainer.removeEventListener("touchstart", this.swipeHandleEvent, false);
	};
	Tab.prototype.hangInSwipe = function(_containerWidth, _tabUnitsWidth){
		_containerWidth <= _tabUnitsWidth ? this.swipe() : this.swipeClosed();

		return this;
	};
	Tab.prototype.resizeHandler = function(_context){
		const context = _context || this;
		const debounceDuration = this.debounceDuration;
		let debounce = null;
		return function resizeHandleEvent(event){
			clearTimeout(debounce);
			debounce = setTimeout(()=>{
				context.containerWidth = context.scrollContainerWidth();
				context.tabUnitsWidth = context.scrollBeltWidth();
				context.boundRange = context.scrollRange(context.containerWidth, context.tabUnitsWidth);
				context.point.last = context.scrollPosition(context.activeIndex);
				context.hangInSwipe(context.containerWidth, context.tabUnitsWidth);
				context.animate(context.point.last);
			}, debounceDuration);
		}
	};
	// Flow
	Tab.prototype.dispatch = function(_object){
		return this.eventBinder(_object);
	};
	Tab.prototype.eventBinder = function(_object){
		const {action, data} = _object || {};
		const maxIndex = this.tabUnits.length - 1;
		const minIndex = 0;
		let index = _object.data ? data.index : this.focusIndex;
		const screenX = _object.data ? data.screenX : this.point.last;
		const isTouch = _object.data.isTouch &&  data.isTouch;
		const indicatorScrollX = config.indicatorScrollX || this.tabUnitsWidth * 0.4;
		let dep = null;
		const depType = {
			INDEX : "INDEX",
			SCREEN_POSITION : "SCREEN_POSITION",
		}
		switch(action){
			case CHOOSE :
				console.log(CHOOSE);
				console.trace();
				dep === depType.INDEX;
				index = index;
				this.setFocus(index).markActive(index);
				this.point.last = this.animate(this.scrollPosition(index));
				this.beforeIndex = this.activeIndex;
				this.focusIndex = this.activeIndex = index;
				break;
			case FIRST_TAB : 
				console.log(FIRST_TAB);
				dep === depType.INDEX;
				index = minIndex;
				this.setFocus(index);
				this.focusIndex = index;
				if(this.isAutomaticTab) {
					this.markActive(index);
					this.beforeIndex = this.activeIndex;
					this.focusIndex = this.activeIndex = index;
				}
				this.point.last = this.animate(this.scrollPosition(index));
				break;
			case LAST_TAB : 
				console.log(LAST_TAB);
				dep === depType.INDEX;
				index = maxIndex;
				this.setFocus(index);
				this.focusIndex = index;
				if(this.isAutomaticTab) {
					this.markActive(index);
					this.beforeIndex = this.activeIndex;
					this.focusIndex = this.activeIndex = index;
				}
				this.point.last = this.animate(this.scrollPosition(index));
				break;
			case PREV_TAB : 
				console.log(PREV_TAB);
				dep === depType.INDEX;
				index = minIndex >= index ? minIndex : index - 1;
				this.setFocus(index);
				this.focusIndex = index;
				if(this.isAutomaticTab) {
					this.markActive(index);
					this.beforeIndex = this.activeIndex;
					this.focusIndex = this.activeIndex = index;
				}
				this.point.last = this.animate(this.scrollPosition(index));
				break;
			case NEXT_TAB : 
				console.log(NEXT_TAB);
				dep === depType.INDEX;
				index = maxIndex <= index ? maxIndex : index + 1;
				this.setFocus(index);
				this.focusIndex = index;
				if(this.isAutomaticTab) {
					this.markActive(index);
					this.beforeIndex = this.activeIndex;
					this.focusIndex = this.activeIndex = index;
				}
				this.point.last = this.animate(this.scrollPosition(index));
				break;
			case "SCROLL_LEFT" : 
				dep = depType.SCREEN_POSITION;
				this.point.last = this.animate(screenX + indicatorScrollX);
				break;
			case "SCROLL_RIGHT" : 
				dep = depType.SCREEN_POSITION;
				this.point.last = this.animate(screenX - indicatorScrollX);
				break;
			case SWIPE_START : 
				dep = depType.SCREEN_POSITION;
				console.log(SWIPE_START);
				if(isTouch){
					// rootElement.addEventListener("touchstart", handleEvent, false);
					this.scrollerContainer.addEventListener("touchmove", this.swipeHandleEvent, false);
					this.scrollerContainer.addEventListener("touchend", this.swipeHandleEvent, false);
				}else{
					window.addEventListener("mousemove", this.swipeHandleEvent, false);
					window.addEventListener("mouseup", this.swipeHandleEvent, false);
				}
				this.scroller.classList.add("transitionClose");
				this.point.new = screenX
				this.point.start = this.point.last;
			break;
			case SWIPE_ING : 
				dep = depType.SCREEN_POSITION;
				console.log(SWIPE_ING);

				this.point.last = this.animate( this.point.start + (screenX - this.point.new), true );
			break;
			case SWIPE_END : 
				dep = depType.SCREEN_POSITION;
				console.log(SWIPE_END);
				if(isTouch){
					// this.rootElement.removeEventListener("touchstart", handleEvent, false);
					this.scrollerContainer.removeEventListener("touchmove", this.swipeHandleEvent, false);
					this.scrollerContainer.removeEventListener("touchend", this.swipeHandleEvent, false);
				}else{
					window.removeEventListener("mousemove", this.swipeHandleEvent, false);
					window.removeEventListener("mouseup", this.swipeHandleEvent, false);
				}
				this.scroller.classList.remove("transitionClose");
				this.point.last = this.animate(this.point.last);
				break;
			default :
			break;
		}

		return this;
	};
	Tab.prototype.setFocus = function(_index){
		this.tabUnits[_index].focus();

		return this;
	};
	Tab.prototype.markActive = function(_index){
		const index = _index;
		const tabUnits = this.tabUnits;
		const tabPanels = this.tabPanels;
		const activeClass = this.activeClass;

		// set attribute
		tabUnits.map((unit, i) => {
			unit.classList.remove(activeClass);
			unit.tabIndex = -1;
			if(index === i){
				unit.classList.add(activeClass);
				unit.tabIndex = 0;
			}
		});
		
		tabPanels.map((panel, i) => {
			panel.classList.remove(activeClass);
			panel.removeAttribute("tabindex");
			if(index === i){ 
				panel.classList.add(activeClass); 
				panel.tabIndex = 0;
			}
		});

		return this;
	};
	Tab.prototype.animate = function(_distance, _moveFlag = false, _target = this.scroller){
		const distance = _moveFlag ? _distance :  this.wallHeat(_distance);
		
		_target.style.transform = `matrix(1,0,0,1,${distance},0)`;
		
		return distance;
	};
	Tab.prototype.wallHeat = function(_distance){
		let distance = _distance;
		const [leftLimit, rightLimit] = this.boundRange;
		
		if( 0 > distance && leftLimit > distance) distance = leftLimit;
		if( 0 <= distance && rightLimit < distance) distance = rightLimit;

		return distance;
	};	
	// Calculate
	Tab.prototype.scrollContainerWidth = function(){
		console.trace();
		console.dir(this.scroller);
		console.dir(this.scrollerContainer);
		const width = this.scrollerContainer.offsetWidth;
		
		return width;
	};
	Tab.prototype.scrollBeltWidth = function(_index, _tabMargin){
		const index = _index || this.activeIndex;
		const scrollItem = this.tabUnits;
		const scrollItemMargin = _tabMargin || getRenderStyle(scrollItem[index], "margin-left");
		const wrapBorder = getRenderStyle(this.rootElement, "border-left-width");
		const baseWidth = (scrollItemMargin * 2) * (scrollItem.length - 1) + (wrapBorder * 2);
		const totalWidth = Array.prototype.reduce.call(scrollItem, (total, tab)=> total + tab.offsetWidth, baseWidth);

		return totalWidth;
	};
	Tab.prototype.scrollPosition = function(_index, _tabMargin){
		const element = this.tabUnits[_index];
		const elementMargin = _tabMargin || getRenderStyle(element, "margin-left");
		const direction = this.isRTL ? 1 : -1;
		const elementRight = element.offsetLeft + element.offsetWidth;
		const elementLeft = this.isRTL ? ( (this.containerWidth) - (elementRight - elementMargin) ) : element.offsetLeft;
		const position = this.isRTL ? elementLeft * direction : (elementLeft - elementMargin) * direction;

		return position;
	};
	Tab.prototype.scrollRange = function(_containerWidth, _tabUnitsWidth){
		const rightLimit = 0;	// limit point for right scroll.
		const leftLimit = _containerWidth > _tabUnitsWidth ? 0 : (_containerWidth - _tabUnitsWidth);
		const boundRange = this.isRTL ? [rightLimit, (leftLimit * -1)] : [leftLimit, rightLimit];
		
		return boundRange;
	};
	// CRUD 
	// create
	Tab.prototype.create = function(){
		// Pre setting
		this.webAccessibility && (this.covertAriaMarkUp = this.convertWaiAriaMarkup());
		this.dynamicFetch || this.dimensionUpdate();
		this.indicator && this.arrows.map((arrow)=> arrow.tabIndex = -1);
		this.setFocus(this.activeIndex).markActive(this.activeIndex);

		// Event listening
		// Tab
		this.TabEvent();
		// indicator
		this.indicatorEvent();
		// Swipe
		this.swipeHandleEvent = this.swipeHandler();
		this.hangInSwipe(this.containerWidth, this.tabUnitsWidth);				
		// Resize
		this.resizeHandleEvent = this.resizeHandler();
		window.addEventListener("resize", this.resizeHandleEvent);
		
		return this;
	};
	// read
	Tab.prototype.read = function(_key, _method = "method", _param){
		if(_method === "method"){
			return this[_key](_param);
		}else{
			return this[_key];
		}
	};
	// update
	Tab.prototype.update = function(_key, _value, _context){
		const context = _context || this;
		context[_key] = _value;
	}
	Tab.prototype.dimensionUpdate = function(){
		this.containerWidth = this.scrollContainerWidth();
		this.tabUnitsWidth = this.scrollBeltWidth();
		this.boundRange = this.scrollRange(this.containerWidth, this.tabUnitsWidth);
	}
	// delete
	// init
	this.dynamicFetch && this.fetchData(); 
	this.autoCreate && this.create();
}