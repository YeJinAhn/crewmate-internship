$(function () {
    //클릭시 on 토글
    $(document).on("click", ".js_on", function () {
        $(this).toggleClass('on');
    });
});

var slideList = $('.item_layer_popup .gallery-top .swiper-slide')
var thumbList = $('.item_layer_popup .slide_thumbs li')
var btnArrow = $('.item_layer_popup .swiper-button-white')

btnArrow.on('click', function(){
    var selectIndex = $(this).parent('.gallery-top').children('.swiper-wrapper').children('.swiper-slide-active').index() - 1,
        slideLength = $(this).parent('.gallery-top').children('.swiper-wrapper').children('.swiper-slide').length - 2;
    console.log('children',$(this).parent('.gallery-top').children('.swiper-wrapper').children('.swiper-slide-active').index() - 1);
    console.log('thumb-index', thumbList.eq(selectIndex))
    console.log('asdasdasd', slideLength)
    setTimeout(function(){
        thumbList.eq(selectIndex).addClass('on').siblings().removeClass('on')
        if(selectIndex == slideLength ){
            console.log(selectIndex);
            console.log(thumbList.eq(selectIndex));
            selectIndex = 1
            thumbList.eq(selectIndex - 1).addClass('on').siblings().removeClass('on')
        }

    },100)
})

thumbList.on('click', function(){
    console.log('thumb-index', $(this).index()+ 1)
    $(this).addClass('on').siblings().removeClass('on')
    galleryTop.slideTo($(this).index() + 1)
})


// custom select box
function CustomSelectBox(selector){
    this.$selectBox = null,
    this.$select = null,
    this.$list = null,
    this.$listLi = null;
    CustomSelectBox.prototype.init = function(selector){
        this.$selectBox = $(selector);
        this.$select = this.$selectBox.find('.box .select, .box .select span');
        this.$selectColor = this.$selectBox.find('.box .item_color');
        this.$list = this.$selectBox.find('.box .list');
        this.$listLi = this.$list.children('li');
    }

    CustomSelectBox.prototype.initEvent = function(e){
        var that = this;
        this.$select.on('click', function(e){
            e.stopPropagation();
            that.listOn($(this));
        });
        // this.$selectColor.on('click', function(e){
        //     that.listColorOn($(this));
        // });
        this.$listLi.on('click', function(e){
            that.listSelect($(this));
        });
        $(document).on('click', function(e){
            that.listOff($(e.target));
        });
    }
    CustomSelectBox.prototype.listOn = function($target){
        $target.parents('.select_box').toggleClass('on');
        if($target.parents('.select_box').hasClass('on')){
            $target.next().css('display', 'block');
        }else{
            $target.next().css('display', 'none');
        };
    }

    CustomSelectBox.prototype.listSelect = function($target){
        //li
            // console.log("===========", $target)
            // console.log("sadasdasdasdasd", $target.children('.name'))
            // console.log(">>", !$target.children('.name').hasClass('sold_out'))
        if(!$target.children('.name').hasClass('sold_out')){
            $target.addClass('selected').siblings('li').removeClass('selected');
            $target.parents('.select_box').removeClass('on');
            $target.parents('.box').children('.select').text($target.text());
            $target.parents('.box').children('.select').html($target.html());
            $target.parents('.list').css('display', 'none');
        }
    }

    CustomSelectBox.prototype.listOff = function($target){
        if(!$target.is(this.$select) && this.$selectBox.hasClass('on')){
            this.$selectBox.removeClass('on');
            this.$list.css('display', 'none');
        };
    }
    this.init(selector);
    this.initEvent();
}

$(function(){
    var select = new CustomSelectBox('.select_box.typeA');
    var select = new CustomSelectBox('.select_box.typeB');
});


$(document).ready(function(){

    
    //gnb tab
    var siteTab = $('.gnb_top .brand_site_list li');

    siteTab.on('click', function(){
        if(!$(this).hasClass('on')){
            $(this).addClass('on').siblings().removeClass('on')
        }
    })

    //gnb search toggle
    var oepenSearch = $('.search_wrap .btn_open'),
        closeSearch = $('.search_wrap .btn_close');

    oepenSearch.on('click',function (){ 
        oepenSearch.parents('.search_box').addClass('on')
        console.log('======>>', oepenSearch)
        // console.log('======>', $(this))
        // console.log('======', $(this).next('.search_box'))
        oepenSearch.next('.search_box').animate({
            'opacity': 1,
            'z-index': 10,
            }).show().children().children('input').focus()
    })
    closeSearch.on('click',function (){ 
        closeSearch.parents('.search_box').removeClass('on')
        // console.log('======', $(this).parents('.search_box'))
        closeSearch.parents('.search_box').animate({
            'display': 'none',
            'opacity': 0,
            'z-index': 5,
        }).hide().parents('.search_wrap').children('btn_open').focus()
    })

    // 최근본 상품
    var quickProdList = $('.contents_quick_menu .prod_list'),
        quickProdListClose = $('.contents_quick_menu .btn_close');

    $('#todayProd').on('click', function(){
    	
    	if(quickProdList.css("display") == "none"){
    		quickProdList.show();
    	} else {
    		quickProdList.hide();
    	}
        // 최근본 상품 swiper

        var prodSwiperList = $('.prod_swiper li');
        if(prodSwiperList.length > 3) {
            var prodSwiper = new Swiper('.prod_swiper', {
                slidesPerView: 3,
                spaceBetween: 10,
                pagination: {
                    el: '.prod_pagination',
                    clickable: true,
                },
            });
            // prodSwiper.update();
            quickProdList.addClass('slider_on')
        }
        else {
            console.log('asdasdasd')
            prodSwiperList.show();
            if(quickProdList.hasClass('slider_on')){
                quickProdList.removeClass('slider_on')
            }
        }

    })
    quickProdListClose.on('click', function(){
        quickProdList.hide();

    })

    // top 버튼
    $('#btnScrollTop').on('click', function(){
        $('html, body').animate({scrollTop : 0 }, 500);
        return false;
    });

    
    function skyScraperCtl(){
    	// 대상 오브젝트
    	var skyScraper = $("div.contents_quick_menu .quick_inner");
    	skyScraper.show();

    	// 위치 계산. fixed 기반으로 계산해야 함.
    	var padding				= 30;		// 하단 여백
    	var windowBottom 		= $(window).height() + $(window).scrollTop();
    	var gnbBottom			= $(window).scrollTop() + $(".gnb_wrap").height();
    	var skyScraperMaxTop	= $(".gnb_wrap").height() - gnbBottom + ($(".pick .box").size() == 1 ? $(".pick .box").offset().top : 0);		// 메인과 일반 페이지를 구분함.
    	var skyScrapertop		= $(window).height() - skyScraper.height();
    	var footerTop			= $(".footer_wrap").offset().top;
    	
    	// 위치 조정
    	skyScraper.css("position", "fixed");
    	if(footerTop - padding <= windowBottom){				// 하단 제한에 걸리는 경우. top값 재계산
    		// 최초 스크롤이 풋터를 넘어가는 시점에서 위치를 잘못 계산하는 경우가 발생함. 이때 높이값 보정 처리
    		var top = skyScrapertop - ($(window).height() + $(window).scrollTop() - footerTop) - padding;
    		if(skyScrapertop - top < padding){
    			top = skyScrapertop - padding;
    		}
    		
    		// 스크롤을 하단으로 계속하는 경우 gnb영역을 넘어가는 경우에 대한 대응 처리 - 그냥 풋터를 밀고 들어가도록 조정
    		if(top < $(".gnb_wrap").height() + padding){
    			top = $(".gnb_wrap").height() + padding;
    		}
    		
    		skyScraper.css("top", top);
    	}else if(skyScrapertop < skyScraperMaxTop){			// 상단 제한에 걸리는 경우
    		// 스크롤을 하단으로 계속하는 경우 gnb영역을 넘어가는 경우에 대한 대응 처리 - 그냥 풋터를 밀고 들어가도록 조정
    		var top = skyScraperMaxTop;
    		if(top < $(".gnb_wrap").height() + padding){
    			top = $(".gnb_wrap").height() + padding;
    		}    		
    		
    		skyScraper.css("top", top);
    	}else{												// 정상 케이스
    		// 스크롤을 하단으로 계속하는 경우 gnb영역을 넘어가는 경우에 대한 대응 처리 - 그냥 풋터를 밀고 들어가도록 조정
    		var top = skyScrapertop - padding;
    		if(top < $(".gnb_wrap").height() + padding){
    			top = $(".gnb_wrap").height() + padding;
    		}
    		
    		skyScraper.css("top", top);
    	}
    	
    	
    	// 좌우 위치 보정 처리
    	var skyScraperArea = $("div.contents_quick_menu");
    }
    
    // 스카이스크래퍼의 좌우 위치를 조정한다.
    function skyScraperWidthCtl(){
    	// 컨텐츠 영역의 우측 50의 공간에 위치 시킨다.
    	var padding			= 50;
    	var paddingMin		= 5;
    	var skyScraperArea	= $("div.contents_quick_menu");
    	var skyScraper		= $("div.contents_quick_menu .quick_inner");
    	var skyScraperWidth	= skyScraper.width();
    	var leftMax			= $(".main_new2020").size() == 1 ? $("div.pick_03").offset().left + $("div.pick_03").width() : $(".content-wrap").offset().left + $(".content-wrap").width();
    	var left			= leftMax + padding;

    	// 윈도우의 가로크기가 줄어들어서 해당 영역을 숨기는 경우에는 그 크기만큼 차감해서 우측 스크롤바에 위치하도록 조정한다.
    	if($(window).width() < left + skyScraperWidth){
    		left = $(window).width() - skyScraperWidth - 1;

    		// 컨텐츠의 안쪽까지 들어오는 경우 메인만 안으로 들어오고 나머지는 컨텐츠에 붙을때까지만 조정함.
    		if(left < leftMax + paddingMin){
        		if($(".main_new2020").size() == 1){
        			if(left < leftMax - skyScraperWidth){
        				left = leftMax - skyScraperWidth;
        			}
        		}else{
        			left = leftMax + paddingMin;
        		}
    		}
    	}
    	
    	skyScraperArea.css("left", left);
    }
    
    
    $(document).ready(function(evt){
    	// 최초 위치 설정용
    	skyScraperCtl();
    	skyScraperWidthCtl();
    	
    	$(window).scroll(function(){ skyScraperCtl(); });
    	$(window).resize(function(){ skyScraperCtl(); skyScraperWidthCtl(); });
    });
    
    
    // $(window).scroll(function(){
    // 	var mainContsHeight = $('.wrap').innerHeight(),
    // 		footHeight = $('.footer_wrap').innerHeight(),
    // 		winScrollTop = $(window).scrollTop(),
    // 		quickMenu = $('.wrap .contents_quick_menu');
    // 		console.log('$(window).scrollTop() >', $(window).scrollTop())
    // 		console.log('mainHeight >', mainContsHeight)
    // 		console.log('winHeight >', $(window).innerHeight())

    // 		if( winScrollTop >= 400 ){
    // 			quickMenu.css({
    // 				'position': 'fixed',
    // 				'top': 'initial',
    // 				'bottom': 30 + 'px',

    // 			})
    // 		}
    // 		else{
    // 			quickMenu.css({
    // 				'position': 'absolute',
    // 				'top': 904 + 'px',
    // 				'bottom': 'initial',
    // 				'left': 1721 + 'px',
    // 			})
    // 		}
    // });
        

})