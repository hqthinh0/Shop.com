/* ------------------------------------------------------------
 * [ Utilities ]
 * ------------------------------------------------------------ */
function getScrollBarWidth() {
	var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};

function getWindowHeight() {
	var div1 = $('<div id="getSizeEle1"/>');
	var div2 = $('<div id="getSizeEle2"/>');
	div1.css({
		position: 'fixed',
		width: '100%',
		height: 0,
		left: 0,
		top: 0,
		zIndex: -1
	});
	div2.css({
		position: 'fixed',
		width: '100%',
		height: 0,
		left: 0,
		bottom: 0,
		zIndex: -1
	});
	$('body').prepend(div1);
	$('body').prepend(div2);
	var height = div2.offset().top - div1.offset().top;
	var width = div1.width();
	div1.remove();
	div2.remove();
	return {width: width, height: height};
}

function getOffset(el) {
	if(el){
		const box = el.getBoundingClientRect();
		return {
			top: box.top + window.pageYOffset - document.documentElement.clientTop,
			left: box.left + window.pageXOffset - document.documentElement.clientLeft,
			width: box.width,
			height: box.height
		};
	} else{
		return 0;
	}
};

/**
* Disable Body Scrolling on iOS
*/
var disableBodyScroll = (function () {
	var _selector = false,
	_element = false,
	_clientY = false;
	var preventBodyScroll = function (event) {
		if (false === _element || $(event.target).closest(_selector).length == 0) {
			event.preventDefault();
		}
	};
	var captureClientY = function (event) {
		if (event.targetTouches.length === 1) { 
			_clientY = event.targetTouches[0].clientY;
		}
	};
	var preventOverscroll = function (event) {
		if (event.targetTouches.length !== 1) {
			return;
		}
		var clientY = event.targetTouches[0].clientY - _clientY;
		if (_element.scrollTop === 0 && clientY > 0) {
			event.preventDefault();
		}
		if ((_element.scrollHeight - _element.scrollTop <= _element.clientHeight) && clientY < 0) {
			event.preventDefault();
		}
	};
	
	return function (allow, selector) {
		if (typeof selector !== "undefined") {
			_selector = selector;
			if(typeof selector != 'object'){
				_element = document.querySelector(selector);
			} else{
				_element = selector;
			}
		}
		if (true === allow) {
			if (false !== _element) {
				_element.addEventListener('touchstart', captureClientY, {passive: false});
				
				_element.addEventListener('touchmove', preventOverscroll, {passive: false});
			}
			document.body.addEventListener("touchmove", preventBodyScroll, {passive: false});
		} else {
			if (false !== _element) {
				_element.removeEventListener('touchstart', captureClientY, {passive: false});
				_element.removeEventListener('touchmove', preventOverscroll, {passive: false});
			}
			document.body.removeEventListener("touchmove", preventBodyScroll, {passive: false});
		}
	};
}());