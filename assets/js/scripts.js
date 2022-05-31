/* -----------------------------------------------
Table of Contents (common js)
--------------------------------------------------
1. userAgent判別
2. URL判別
3. 設定
4. JSファイル読み込み時即実行(Execute JavaScript when the page loaded.)
5. DOM構築後実行(Execute JavaScript when the DOM is fully loaded.)
6. 画像など含めてページ読込み完了後に実行(Execute JavaScript when the Window Object is fully loaded.)
7. 動的コンテンツに対してイベントを設定
8. その他のイベントを設定
9. 関数(プラグイン)複数

// require jQuery JavaScript Library v3.5.1
/* ------------------------------------------------------------
 * [ userAgent ] http://www.useragentstring.com/pages/useragentstring.php
 * ------------------------------------------------------------ */
var ua                   = window.navigator.userAgent;
var appVer               = window.navigator.appVersion;

//PC
var isIE                 = ua.indexOf('MSIE') != -1 || ua.indexOf('Trident') != -1;
var isIE6                = isIE && appVer.indexOf('MSIE 6') != -1;
var isIE7                = isIE && appVer.indexOf('MSIE 7.') != -1;
var isIE8                = isIE && ua.indexOf('Trident/4.') != -1;
var isIE9                = isIE && ua.indexOf('Trident/5.') != -1;
var isIE10               = isIE && ua.indexOf('Trident/6.') != -1;
var isIE11               = ua.indexOf('Trident/7.') != -1;

var isFirefox            = ua.indexOf('Firefox') != -1;
var isChrome             = ua.indexOf('Chrome') != -1;
var isSafari             = ua.indexOf('Safari') != -1;

//Mobile (smartphone + tablet)
var isMobileSafari       = ua.match(/iPhone|iPad|iPod/i) ? true : false;
var isMobileSafariTypeT  = ua.match(/ipad/i) ? true : false;
var isMobileSafariTypeS  = ua.match(/iphone|ipod/i) ? true : false;
var isAndroid            = ua.indexOf('Android') != -1;
var isMobileAndroidTypeT = isAndroid && ua.indexOf('Mobile') == -1;
var isMobileAndroidTypeS = isAndroid && ua.indexOf('Mobile') != -1;
var isAndroidChrome      = isChrome && isAndroid;
var isAndroidFirefox     = isFirefox && isAndroid;
var isMobileFirefox      = isFirefox && ua.indexOf('Mobile') != -1;
var isTabletFirefox      = isFirefox && ua.indexOf('Tablet') != -1;

//PC or Mobile
var isTablet             = isMobileSafariTypeT || isMobileAndroidTypeT || isTabletFirefox;
var isSmartPhone         = isMobileSafariTypeS || isMobileAndroidTypeS || isMobileFirefox;
var isMobile             = isTablet || isSmartPhone || isAndroidChrome || isAndroidFirefox;
var isPC                 = !isMobile;



/* ------------------------------------------------------------
 * [ Location ]
 * ------------------------------------------------------------ */
var  locationHref     = window.location.href,     // http://www.google.com:80/search?q=demo#test
     locationProtocol = window.location.protocol, // http:
     locationHostname = window.location.hostname, // www.google.com
     locationHost     = window.location.host,     // www.google.com:80
     locationPort     = window.location.port,     // 80
     locationPath     = window.location.pathname, // /search
     locationSearch   = window.location.search,   // ?q=demo
     locationHash     = window.location.hash;     // #test

/* ============================================================
* IE11 Fixed element problems
* ============================================================ */
if(isIE11) {
	document.body.addEventListener("mousewheel", function(event) {
		event.preventDefault();
		var weelDelta = event.wheelDelta;
		var currentOffset = window.pageYOffset;
		window.scrollTo(0, currentOffset - weelDelta);
	});
}
/* ============================================================
* Common Script
* ============================================================ */
var Common = (function () {
	function Common() {
		this.onInit();
	}
	
	/**
	* 初期化
	*/
	Common.prototype.onInit = function () {
		var _this = this;
		_this.addAgentClass();
		_this.globalNavButton();
		_this.initGlobalNav();
		_this.jsMatchHeight();
		_this.fullBackground();
		_this.smoothScroll();
	}

	/**
	* initLocomotive SmoothScroll
	*/
	Common.prototype.initLocomotive = function () {
		var _this = this;
		_this.scroller = new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true,
			reloadOnContextChange: true,
			tablet: {
				breakpoint: 768
			}
		});
		$(window).on('load', function(){
			_this.scroller.update();
		});
	}

	/**
	* userAgent Classes to <html>
	*/
	Common.prototype.addAgentClass = function(){
		if (isTablet) {
			$('html').addClass('is-tablet');
		}
		if (isSmartPhone) {
			$('html').addClass('is-sp');
		}
		if (isPC) {
			$('html').addClass('is-pc');
		}
		if (isMobile) {
			$('html').addClass('is-mobile');
		}
		if (isIE) {
			$('html').addClass('is-ie');
		}
		if (isIE11) {
			$('html').addClass('is-ie11');
		}

		var vh = window.innerHeight * 0.01;
		var vw = window.innerWidth * 0.01;
		var resizeTimerVh = false;
		document.documentElement.style.setProperty('--vh', vh + 'px');
		document.documentElement.style.setProperty('--vw', vw + 'px');
		$(window).on('resize', function(){
			if(resizeTimerVh) clearTimeout(resizeTimerVh);
			resizeTimerVh = setTimeout(function(){
				var vh = window.innerHeight * 0.01;
				var vw = window.innerWidth * 0.01;
				document.documentElement.style.setProperty('--vh', vh + 'px');
				document.documentElement.style.setProperty('--vw', vw + 'px');
			}, 200);
		});
	}

	/**
	* smoothScroll
	*/
	Common.prototype.smoothScroll = function(){
		$('body').on('click', 'a[href^="#"]:not([href="#top"])',function(){
			var href= $(this).attr('href');
			var target = $(href === '#' || href === '' ? 'html' : href);
			var position = target.offset().top;
			$('body,html').animate({scrollTop:position}, 500, 'swing');
			return false;
		});
	}

	//Global menu
	Common.prototype.globalNavButton = function () {
		var menuBtn = $(".nav-global-menu");
		var header = $("#header");
		var globalNav = $(".nav-global-wrap");
		menuBtn && menuBtn.on('click', function(e){
			e.preventDefault();
			if(menuBtn.hasClass('is-active')){
				menuBtn.removeClass('is-active');
				header.removeClass('is-hover');
				globalNav.removeClass('is-active');
				$('html').removeClass('is-opened-menu');
				disableBodyScroll(false, globalNav.get(0));
			} else{
				menuBtn.addClass('is-active');
				header.addClass('is-hover');
				globalNav.addClass('is-active');
				$('html').addClass('is-opened-menu');
				disableBodyScroll(true, globalNav.get(0));
			}
		});		
	}

	/**
	* グローバリゼーション
	*/
	Common.prototype.initGlobalNav = function () {
		var _this = this;
		var globalNavItem = $(".nav-global > li");
		var globalNavSub = $(".nav-global__sub > li");
		var header = $("#l-header");
		if(isPC){
			globalNavItem.each(function(i, elem){
				var timer = false;
				var elem = $(elem);
				elem.on('mouseenter', function(){
					if(timer) clearTimeout(timer);
					elem.addClass('is-hover');
				});
				elem.on('mouseleave', function(){
					timer = setTimeout(function(){
						elem.removeClass('is-hover');
					}, 50)
				});
			});
			globalNavSub.each(function(i, elem){
				var elem = $(elem);
				var subNav = elem.find(".nav-global__sub__child");
				if(subNav.length){
					elem.addClass('has-sub');
					var globalNav = elem.closest('.nav-parent');
					elem.on('mouseenter', function(){
						var subNavHeight = subNav.get(0).clientHeight;
						if(subNavHeight > 0 && globalNav != null){
							globalNav.get(0).style.minHeight = subNavHeight + 'px';
						}
					});
					elem.on('mouseleave', function(){
						globalNav.get(0).style.minHeight = 0 + 'px';
					});
				}
			});


			var subTitle = $(".nav-global__sub__title");
			subTitle.each(function(i, item){
				item = $(item);
				var subNav = item.closest('li');
				var subNavWrap = subNav.find(".nav-global__sub__child");
				var globalNav = item.closest('.nav-parent');
				item.on('click', function(e){
					if(window.innerWidth <= 768){
						e.preventDefault();
						if(!subNav.hasClass('is-active')){
							subTitle.each(function(i, elem){
								var subNav1 = $(elem).closest('li');
								subNav1.removeClass('is-active');
							});
							subNav.addClass('is-active');
							var subNavHeight = subNav.get(0).clientHeight;
							if(subNavHeight > 0 && globalNav != null){
								globalNav.get(0).style.minHeight = subNavHeight + 'px';
							}
						} else{
							subNav.removeClass('is-active');
						}
					}
				})
			});
		} else{
			globalNavItem.each(function(i, elem){
				var elem = $(elem);
				var anchor = elem.find('.nav-item');
				var navParent = elem.find(".nav-parent-wrap");
				if(navParent){
					anchor.on('click', function(e){
						if(window.innerWidth > 768){
							if(elem.hasClass('is-hover')){
								elem.removeClass('is-hover');
								header.removeClass('is-hover');
							} else{
								e.preventDefault();
								globalNavItem.removeClass('is-hover');
								header.addClass('is-hover');
								elem.addClass('is-hover');
							}
						}
					});
				}
			});
			$(document).on('click', function(e){
				if(!$(e.target).closest('.nav-global') && !$(e.target).closest('#l-header')){
					globalNavItem.removeClass('is-hover');
					header.removeClass('is-hover');
				}
			});

			var subTitle = $(".nav-global__sub__title");
			subTitle.each(function(i, item){
				var item = $(item);
				var subNav = item.closest('li');
				var subNavWrap = subNav.find(".nav-global__sub__child");
				var globalNav = item.closest('.nav-parent');
				subNav.addClass('has-sub');
				item.on('click', function(e){
					e.preventDefault();
					if(!subNav.hasClass('is-active')){
						subTitle.each(function(i, elem){
							var subNav1 = $(elem).closest('li');
							subNav1.removeClass('is-active');
						});
						subNav.addClass('is-active');
						var subNavHeight = subNavWrap.get(0).clientHeight;
						if(subNavHeight > 0 && globalNav != null){
							globalNav.get(0).style.minHeight = subNavHeight + 'px';
						}
					} else{
						subNav.removeClass('is-active');
					}
				})
			});
		}
	}

	/**
	* jsFullBackground
	*/
	Common.prototype.fullBackground = function(){
		$('.js-fullbg').jsFullBackground();
	}

	/**
	* matchHeight
	*/
	Common.prototype.jsMatchHeight = function(){
		$('.js-matchheight').matchHeight();
		$('.js-matchheight02').matchHeight();
	}

	return Common;
}());


/* ============================================================
 * Plugin
 * ============================================================ */

/**
* Full background
*/
$.fn.jsFullBackground = function(config){
	var defaults = {
			position : 'center center',
			bgsize: 'cover',
			repeat: 'no-repeat'
		};
	var config = $.extend({}, defaults, config);
	return this.each(function() {
		var $this = $(this);
		var $img = $this.children('img').first();
		if (!$img.length) return false;
		var src = $img.attr('src');
		var position = config.position;
		var bgsize = config.bgsize;
		var repeat = config.repeat;
		if ($this.data('position')) {
			position = $this.data('position');
		}
		if ($this.data('bgsize')) {
			bgsize = $this.data('bgsize');
		}
		if ($this.data('repeat')) {
			repeat = $this.data('repeat');
		}
		$this.css({
			backgroundSize: bgsize,
			backgroundImage: 'url(' + src + ')',
			backgroundRepeat: repeat,
			backgroundPosition: position
		});
		$img.hide();
	});
}


/* ============================================================
 * Execute JavaScript when the DOM is fully loaded.
 * ============================================================ */
var commonJS;
function eventHandler(){
	commonJS = new Common();
}
if(document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}



/*
** With Slick Slider Plugin : https://github.com/marvinhuebner/slick-animation
** And Slick Animation Plugin : https://github.com/marvinhuebner/slick-animation
*/

// Init slick slider + animation

$(function(){
	$('.slider').slick({
		autoplay: true,
		speed: 800,
		lazyLoad: 'progressive',
		arrows: true,
		dots: false,
		prevArrow: '<div class="slick-nav prev-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',
		nextArrow: '<div class="slick-nav next-arrow"><i></i><svg><use xlink:href="#circle"></svg></div>',

		});
		$('.slick-nav').on('click touch', function(e) {
			e.preventDefault();

			let arrow = $(this);

			if(!arrow.hasClass('animate')) {
				arrow.addClass('animate');
				setTimeout(() => {
					arrow.removeClass('animate');
				}, 1600);
			}

	});


});

$(function(){
	$("#slider").slick({
	  autoplay: true,
	  speed: 1000,
	  arrows: false,
	  asNavFor: "#thumbnail_slider"
	});
	$("#thumbnail_slider").slick({
	  slidesToShow: 5,
	  speed: 1000,    
	  asNavFor: "#slider",
	  focusOnSelect: true,
	});
  });



$(function(){
	// tabs

var tabLinks = document.querySelectorAll(".nav-item");
var tabContent = document.querySelectorAll(".tab-content > div");

tabLinks.forEach(function(el) {
   el.addEventListener("click", openTabs);
});

//tab
function openTabs(el) {
	var btnTarget = el.currentTarget;
	var toggle = btnTarget.dataset.toggle;
	console.log(toggle);

	tabContent.forEach(function(el) {
		el.classList.remove("active");
	 });
	 tabLinks.forEach(function(el) {
		el.classList.remove("active");
	 });
	 document.querySelector("#" + toggle).classList.add("active");
	btnTarget.classList.add("active");
	}

});


$(function(){
	document.querySelector(".jsFilter").addEventListener("click", function () {
		document.querySelector(".filter-menu").classList.toggle("active");
		});
		
		document.querySelector(".grid").addEventListener("click", function () {
		document.querySelector(".list").classList.remove("active");
		document.querySelector(".grid").classList.add("active");
		document.querySelector(".products-area-wrapper").classList.add("gridView");
		document.querySelector(".products-area-wrapper").classList.remove("tableView");
		});
		
		document.querySelector(".list").addEventListener("click", function () {
		document.querySelector(".list").classList.add("active");
		document.querySelector(".grid").classList.remove("active");
		document.querySelector(".products-area-wrapper").classList.remove("gridView");
		document.querySelector(".products-area-wrapper").classList.add("tableView");
		});

});


//fotter

function generateBalls() {
    for (var i = 0; i < Math.floor(window.innerWidth/20); i++) {
      $(".gooey-animations").append(`<div class="ball"></div>`);
      var colors = ['#00ade1','#FFA036', '#dc00d4', '#00dc82'];
      $(".ball").eq(i).css({"bottom":"-50px","left":Math.random()*window.innerWidth-100,"animation-delay":Math.random()*5+"s","transform":"translateY("+Math.random()*10+"px)","background-color":colors[i%4]});
    }
  }
  generateBalls();
  
  window.addEventListener('resize', function(e) {
    $(".gooey-animations .ball").remove();
    generateBalls();
  });


//tab collection
  $(function(){

	var tabLinks = document.querySelectorAll(".catogery-list li");
	var tabContent =document.querySelectorAll(".products div");


tabLinks.forEach(function(el) {
	el.addEventListener("click", openTabs);
 });
 
 function openTabs(el) {
	var btn = el.currentTarget; // lắng nghe sự kiện và hiển thị các element
	var electronic = btn.dataset.value; // lấy giá trị trong data-electronic

	tabContent.forEach(function(el) {
		el.classList.remove("active");
	});

	tabLinks.forEach(function(el) {
		el.classList.remove("active");
	});

	console.log(electronic);
		document.querySelector("#" + electronic).classList.add("active");
		btn.classList.add("active");
	}
});


const fillter_product = () =>{
   let search_bar = document.querySelector('.search-bar').value.toUpperCase();
   let products_row =  document.querySelectorAll('.products-row');
   let name =  document.querySelectorAll('.products-row a span');
   
   for(var i = 0; i< products_row.length; i++){

    let list2 = name[i];
        if(list2){
            let textvalue = list2.textContent || list2.innerHTML;
           
            if(textvalue.toUpperCase().indexOf(search_bar) > -1){
                 console.log(i);
                products_row[i].style.display = "";
            }else{
                products_row[i].style.display = "none";
            }
        }
   }
}

//infinite scroll

$(function() {
	var counter = 0;
	
	$(window).on('scroll', function(){
	  var win_height = $(this).height();
	  console.log('win_height' + win_height);
	  var win_scroll = $(this).scrollTop();
	  var scroll_trigger = win_height + win_scroll; 
	  console.log('scroll_trigger' + scroll_trigger);
	  
	  var elm_height = $('.products-area-wrapper').height();
	  var elm_pos_y  = $('.products-area-wrapper').offset().top;

	
	  var elm_bottom = elm_height + elm_pos_y;
	  console.log('elm_bottom' + elm_bottom);
	  if (scroll_trigger >= elm_bottom){
		var $last_item = $('.products-row').first().clone();
		counter++;
		$last_item.prepend(counter);
		$('.products-area-wrapper').append($last_item);
	  }
	});
  });