/* global jQuery, $, navigator */

var nepa = (function ($){
    // 팝업 id 증가용 integer
    var popupIdCnt = 0;
    
    var comp = {
        // 검색조건 가격 Slider 공통 최소 값
        priceMin: 0,
        // 검색조건 가격 Slider 공통 최대 값
        priceMax: 2000000,
        // 검색조건 가격 Slider 공통 스탭
        priceStep: 100,
        // 160603 closePopupSelf 함수에서 callback 함수 사용하기 위한 변수
        popupDictionary: [],
        // initialize
        initialize: function (){
            
            $(window).resize(windowResizeHandler);
            
            setContentsHeight();
            setNumericInput();
            setContentWingPosition();
            setProdUtilButton();
            setDatepicker();
            // 160901 수정 : setGnbMenuList 호출 삭제
            //setGnbMenuList();
            // 160712 추가 : 마우스 오버시 GNB 서브 리스트 사이즈 조정
            // 폰트 로드 전 GNB 노출시 위치 이슈 해결을 위해 추가
            //$(".gnb-sub").on("mouseover", setGnbMenuList);
            
            comp.radio();
            comp.checkbox();
        },
        /**
         * 디자인 라디오 생성 함수
         * default selector ".ui-radio"
         */
        radio: function (selector) {
            if (selector == undefined) {
                selector = ".ui-radio";
            }
            var radio = $(selector).find("input[type=radio]");
            radio.addClass("nepa-radio");
            radio.each(function (index){
                $(this).after('<span class="icon' + ($(this).prop("checked") ? " checked" : "") +  '"></span>');
            });
            
            // 라디오 체크 상태 변경 이벤트
            // changeForce의 경우 IE8에서 change 이벤트가 발생하지 않아 추가함
            radio.on("change changeForce", function (event){
                var groupName = $(event.target).attr("name");
                $("input[name=" + groupName + "] + .icon").removeClass("checked");
                if ($(event.target).is(":checked")) {
                    $(event.target).next(".icon").addClass("checked");
                }
            });
        },
        /**
         * 디자인 체크박스 생성 함수
         * default selector ".ui-check"
         */
        checkbox: function (selector) {
            if (selector == undefined) {
                selector = ".ui-check";
            }
            
            var checkbox = $(selector).find("input[type=checkbox]");
            checkbox.addClass("nepa-checkbox");
            
            checkbox.each(function (index){
                $(this).after('<span class="icon' + ($(this).prop("checked") ? " checked" : "") +  '"></span>');
            });
            
            // 체크박스 체크 상태 변경 이벤트
            // changeForce의 경우 IE8에서 change 이벤트가 발생하지 않아 추가함
            checkbox.on("change changeForce", function (event){
                if ($(event.target).is(":checked")) {
                    $(event.target).next(".icon").addClass("checked");
                }
                else {
                    $(event.target).next(".icon").removeClass("checked");
                }
            });
        },
        /**
         * 탭 생성 함수
         * default selector "[data-role=tab]"
         */
        tab: function (selector) {
            if (selector == undefined) {
                selector = "[data-role=tab]";
            }
            if ($(selector).length > 0) {
                // 생성 된 탭에 대한 Object 또는 탭 Array 반환
                var tabList;
                if ($(selector).length > 1) {
                    tabList = [];
                    $(selector).each(function (index){
                        tabList.push(setTab(this));
                    });
                }
                else {
                    tabList = setTab(selector);
                }
                return tabList;
            }
        },
        /**
         * 버튼 그룹 생성 함수
         * default selector [data-role=button-group]
         */
        buttonGroup: function (selector) {
            if (selector == undefined) {
                selector = "[data-role=button-group]";
            }
            if ($(selector).length > 0) {
                // 생성 된 버튼 그룹에 대한 Object 또는 버튼 그룹 Array 반환
                var buttonGroupList;
                if ($(selector).length > 1) {
                    buttonGroupList = [];
                    $(selector).each(function (index){
                        buttonGroupList.push(setButtonGroup(this));
                    });
                }
                else {
                    buttonGroupList = setButtonGroup(selector);
                }
                return buttonGroupList;
            }
        },
        /**
         * Modal Alert 노출 함수
         * @param {String}      title           Alert 타이틀 텍스트
         * @param {String}      message         Alert 내용 텍스트
         * @param {Function}    callbackConfirm 확인 버튼 클릭 콜백 함수
         */
        alert: function (title, message, callbackConfirm, url) {
            // 전체 팝업을 담는  컨테이너 생성
            if ($("#popupContainer").length == 0) {
                $("body").append('<div id="popupContainer"></div>');
            }
            else {
                $("#popupContainer").show();
            }
            // 160617 추가 : 팝업 노출시 body 스크롤 안되도록 스크립트 추가
            $("html").css("overflow-y", "visible");
            $("body").css("overflow", "hidden");
            
            if (url == undefined) {
                url = "/html/popup/popup_alert.html";
            }
            
            var dimmedCover = setDimmedPopup();
            dimmedCover.append('<iframe src="' + url + '" class="iframe-popup" frameborder="0"></iframe>');
            
            var iframe = dimmedCover.find(".iframe-popup");
            iframe.load(function(){
                // 160616 추가 : IE서 플리커링 나는 이슈 해결을 위해 iframe 로드 완료후 노출 되도록 수정.
                iframe.show();
                // 160607 iFrame에 포커스 옮김 추가
                iframe.focus();
                var popup = iframe.contents().find(".popup-wrap");
                iframe.contents().find(".btn[data-role=popup-close]").on("click", function (event){
                    if ($(event.target).hasClass("btn-confirm") && callbackConfirm != undefined && callbackConfirm != null) {
                        callbackConfirm();
                    }
                    
                    closeDimmedPopup(dimmedCover.attr("id"));
                });
                
                popup.draggable({ handle: ".popup-header", containment: "parent", scroll: false });
                
                if (title == "" || title == null) {
                    popup.find(".popup-header .title").remove();
                }
                else {
                    popup.find(".popup-header .title").text(title);
                }
                popup.find(".popup-contents").append(message);
                
                popup.find(".btn").on("click", function (event){
                    event.preventDefault();
                });
                
                // 160603 팝업 컨텐츠 영역 최대 높이 값 계산
                // 160616 수정 : popup_front.js에서 옮겨옴. 화면 로드 후 중앙 정렬한 뒤 노출되도록 수정
                popup.find(".popup-contents").css({
                    maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - 70 // 160901 수정 : 팝업 컨텐츠 최대 높이 계산식 수정
                })
                popup.css({
                    left: (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 > 0 ? (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 : 0,
                    top: (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 > 0 ? (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 : 0,
                });
                // 160616 팝업 로드 완료 후 노출 되도록 수정
                popup.show();
            });
        },
        /**
         * Modal Confirm 노출 함수
         * @param {String}      title           Confirm 타이틀 텍스트
         * @param {String}      message         Confirm 내용 텍스트
         * @param {Function}    callbackConfirm 확인 버튼 클릭 콜백 함수
         * @param {Function}    callbackCancel  취소/닫기 버튼 클릭 콜백 함수
         */
        confirm: function (title, message, callbackConfirm, callbackCancel, url) {
            // 전체 팝업을 담는  컨테이너 생성
            if ($("#popupContainer").length == 0) {
                $("body").append('<div id="popupContainer"></div>');
            }
            else {
                $("#popupContainer").show();
            }
            // 160617 추가 : 팝업 노출시 body 스크롤 안되도록 스크립트 추가
            $("html").css("overflow-y", "visible");
            $("body").css("overflow", "hidden");
            
            
            if (url == undefined) {
                url = "/html/popup/popup_confirm.html";
            }
            
            var dimmedCover = setDimmedPopup();
            dimmedCover.append('<iframe src="' + url + '" class="iframe-popup" frameborder="0"></iframe>');
            
            var iframe = dimmedCover.find(".iframe-popup");
            iframe.load(function(){
                // 160616 추가 : IE서 플리커링 나는 이슈 해결을 위해 iframe 로드 완료후 노출 되도록 수정.
                iframe.show();
                // 160607 iFrame에 포커스 옮김 추가
                iframe.focus();
                var popup = iframe.contents().find(".popup-wrap");
                iframe.contents().find(".btn[data-role=popup-close]").on("click", function (event){
                    if ($(event.target).hasClass("btn-confirm") && callbackConfirm != undefined && callbackConfirm != null) {
                        callbackConfirm();
                    }
                    if ($(event.target).hasClass("btn-cancel") && callbackCancel != undefined && callbackCancel != null) {
                        callbackCancel();
                    }
                    
                    closeDimmedPopup(dimmedCover.attr("id"));
                });
                
                popup.draggable({ handle: ".popup-header", containment: "parent", scroll: false });
                
                if (title == "" || title == null) {
                    popup.find(".popup-header .title").remove();
                }
                else {
                    popup.find(".popup-header .title").text(title);
                }
                popup.find(".popup-contents").append(message);
                
                popup.find(".btn").on("click", function (event){
                    event.preventDefault();
                });
                
                // 160603 팝업 컨텐츠 영역 최대 높이 값 계산
                // 160616 수정 : popup_front.js에서 옮겨옴. 화면 로드 후 중앙 정렬한 뒤 노출되도록 수정
                popup.find(".popup-contents").css({
                    maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - 70 // 160901 수정 : 팝업 컨텐츠 최대 높이 계산식 수정
                })
                popup.css({
                    left: (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 > 0 ? (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 : 0,
                    top: (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 > 0 ? (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 : 0,
                });
                // 160616 팝업 로드 완료 후 노출 되도록 수정
                popup.show();
            });
        },
        /**
         * Modal Popup 노출 함수
         * @param {Object}      target          타겟이 되는 버튼 JQuery 객체
         * @param {Function}    callbackConfirm 확인 버튼 클릭 콜백 함수
         * @param {Function}    callbackCancel  취소/닫기 버튼 클릭 콜백 함수
         * @param {String}      popupClass      .popup-wrap에 추가할 클래스명
         * @param {Object}      customContents      .popup-contents에 덮어 씌워질 jQuery DOM 객체
         */
        // 160920 추가 : parameter customContents 추가
        popup: function (target, callbackConfirm, callbackCancel, popupClass, customContents) {
            comp.popupByData(target.data("url"), callbackConfirm, callbackCancel, popupClass, customContents);
        },
        /**
         * Modal Popup 노출 함수
         * @param {String}      url             IFrame에 load할 팝업 URL 경로
         * @param {Function}    callbackConfirm 확인 버튼 클릭 콜백 함수
         * @param {Function}    callbackCancel  취소/닫기 버튼 클릭 콜백 함수
         * @param {String}      popupClass      .popup-wrap에 추가할 클래스명
         * @param {Object}      customContents      .popup-contents에 덮어 씌워질 jQuery DOM 객체
         */
         // 160920 추가 : parameter customContents 추가
        popupByData: function (url, callbackConfirm, callbackCancel, popupClass, customContents) {
            // 전체 팝업을 담는  컨테이너 생성
            if ($("#popupContainer").length == 0) {
                $("body").append('<div id="popupContainer"></div>');
            }
            else {
                $("#popupContainer").show();
            }
            var dimmedCover = setDimmedPopup();
            dimmedCover.append('<iframe src="'+ url + '" class="iframe-popup" frameborder="0" allowtransparency="true"></iframe>');
            // 160617 추가 : 팝업 노출시 body 스크롤 안되도록 스크립트 추가
            $("html").css("overflow-y", "visible");
            $("body").css("overflow", "hidden");
            // 160603 closePopupSelf 함수에서 callback 함수 사용하기 위해 추가
            var popupData = {
                id: dimmedCover.attr("id"),
                callbackConfirm: callbackConfirm,
                callbackCancel: callbackCancel
            }

            window.nepa.popupDictionary.push(popupData);
            
            
            var iframe = dimmedCover.find(".iframe-popup");
            iframe.load(function(){
                // 160616 추가 : IE서 플리커링 나는 이슈 해결을 위해 iframe 로드 완료후 노출 되도록 수정.
                iframe.show();
                // 160607 iFrame에 포커스 옮김 추가
                iframe.focus();
                var popup = iframe.contents().find(".popup-wrap");
                popup.attr("data-id", dimmedCover.attr("id"));
                
                if (popupClass != undefined) {
                    popup.addClass(popupClass);
                    // 160610 changePopupType 함수 undefined 체크
                    if (iframe[0].contentWindow.changePopupType != undefined) {
                        iframe[0].contentWindow.changePopupType();
                    }
                }
                
                /*
                // 160920 추가
                if (customContents != undefined) {
                    console.log("has customContents")
                    //console.log(customContents);
                    var scripts = customContents.find("script");
                    customContents.find("script").remove();
                    console.log(scripts);
                    popup.find(".popup-contents").append(customContents);
                    
                    console.log(iframe.contents()[0]);
                    
                    scripts.each(function (index){
                        // var script = iframe.contents().find("head").append("<script></script>");
                        var script = $('<script>').attr('type', 'text/javascript').text($(this).html());
                        console.log(script);
                        iframe.contents().find("head").append(script);
                        //script.html($(this).html());
                    });
                }
                */
                iframe.contents().find(".btn[data-role=popup-close]").on("click", function (event){
                    if ($(event.target).hasClass("btn-confirm") && callbackConfirm != undefined && callbackConfirm != null) {
                        callbackConfirm();
                    }
                    if ($(event.target).hasClass("btn-cancel") && callbackCancel != undefined && callbackCancel != null) {
                        callbackCancel();
                    }
                    console.log("popup-close");
                    $("html").css("overflow-y", "scroll"); // 160906 추가 : 페이지 스크롤 항상 노출되도록 함
                    $("body").css("overflow", "visible");
                    closeDimmedPopup(dimmedCover.attr("id"));
                });
                
                popup.draggable({ handle: ".popup-header", containment: "parent", scroll: false });
                
                popup.find(".btn").on("click", function (event){
                    event.preventDefault();
                });
                
                // 160603 팝업 컨텐츠 영역 최대 높이 값 계산
                // 160616 수정 : popup_front.js에서 옮겨옴. 화면 로드 후 중앙 정렬한 뒤 노출되도록 수정
                popup.find(".popup-contents").css({
                    maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - 70 // 160901 수정 : 팝업 컨텐츠 최대 높이 계산식 수정
                })
                popup.css({
                    left: (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 > 0 ? (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 : 0,
                    top: (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 > 0 ? (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 : 0,
                });
                // 160616 팝업 로드 완료 후 노출 되도록 수정
                popup.show();
                
                // 160923 추가 : 팝업 2번 이상 오픈시 input 포커스 안되는 이슈 해결
//                if (iframe.contents().find(".popup-wrap input[type=text]").length > 1) {
//                    iframe.contents().find(".popup-wrap input[type=text]").focus();
//                    iframe.contents().find(".popup-wrap").focus();
//                }
                
                // 2017.03.17 - 정재요
                // IE에서 jQuery를 사용하여 iframe을 생성할 때 첫번째 생성 후 input/textarea에 포커싱 된 후 두번째 iframe이 생성되면
                // input/textarea에 포커스가 가지 않는 문제 해결. 
                //    --> 해당 문제는 jQuery를 사용하여 iframe을 생성할 때 발생하는 jQuery 버그로 아래 코드는 IE를 위한 코드.
                //    --> 위 방식은 iframe을 보안 문제로 접근할 수 없기 때문에 해결되지 못함.
                $("input[type=text]").first().focus();
            });
        },
        /**
         * 함수를 호출한 팝업 IFrame을 제거
         * @param {String}  닫을때 실행할 callback 함수 타입(confirm, cancel)
         */
        closePopupSelf: function (type) {
            if (frameElement != null) {
                // 160603 popupDictionary 변수 추가로 팝업 self 닫기 시 callback 함수 호출 가능
                var cover = $(frameElement.parentElement);
                
                closeDimmedPopupSelf(cover, type);
            }
        },
        customPopup: function(targetId) {
            // 전체 팝업을 담는  컨테이너 생성
            if ($("#popupContainer").length == 0) {
                $("body").append('<div id="popupContainer"></div>');
            }
            else {
                $("#popupContainer").show();
            }
            var dimmedCover = setDimmedPopup();
            dimmedCover.append($("#" + targetId + " > div").clone().attr("id", targetId + "Popup").show());
            
            var popup = $("#" + targetId + "Popup");
            popup.find(".popup-contents").css({
                maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - 70 // 160901 수정 : 팝업 컨텐츠 최대 높이 계산식 수정
            })
            popup.css({
                left: ($("body").width() - popup.outerWidth(true)) / 2 > 0 ? ($("body").width() - popup.outerWidth(true)) / 2 : 0,
                top: ($("body").height() - popup.outerHeight(true)) / 2 > 0 ? ($("body").height() - popup.outerHeight(true)) / 2 : 0,
            });
            popup.draggable({ handle: ".popup-header", containment: "parent", scroll: false });
            
            $("html").css("overflow-y", "visible");
            $("body").css("overflow", "hidden");
            
            // 160923 추가 : 팝업 2번 이상 오픈시 input 포커스 안되는 이슈 해결
            if (popup.find("input[type=text]").length > 1) {
                popup.find("input[type=text]").focus();
                popup.focus();
            }
        },
        customPopupClose: function(targetId) {
            console.log("customPopupClose", targetId);
            var cover = $("#" + targetId + "Popup").parent();
            var parent = cover.parent();
            cover.remove();
            if (parent.children().length == 0) {
                parent.hide();
            }
            
            $("html").css("overflow-y", "scroll");
            $("body").css("overflow", "visible");
        }
    };
    
    /**
     * @private
     * Window 객체 리사이징 이벤트 헨들러
     */
    function windowResizeHandler() {
        setContentsHeight();
        setContentWingPosition();
    }
    
    /**
     * @private
     * 컨텐츠 영역 높이값 정의 함수
     */
    function setContentsHeight() {
        var caclHeight = $(window).outerHeight(true) - $(".footer-wrap").outerHeight(true);
        $(".content-wrap.sub-wrap").css("min-height", caclHeight - parseInt($(".content-wrap").css("padding-top")));
    }
    
    /**
     * @private
     * 컨텐츠 영역 좌/우측 영역 위치 조정
     */
    function setContentWingPosition() {
        if ($(".wrap > .content-right").length > 0) {
            //console.log($(".content-wrap").offset().left + $(".content-wrap").outerWidth());
            // 160621 수정 : position을 fixed로 변경하도록 수정
            $(".wrap > .content-right").css({
                position: "fixed",
                // 160706 수정 : 파이어폭스에서 $(".content-wrap").css("margin-left") 값이 auto일때 0을 return하여 offset()으로 수정
                left: parseInt($(".content-wrap").offset().left) + $(".content-wrap").outerWidth() + 10,
            });
            
            $(".wrap > .content-right").find(".btn-top").on("click", function (event){
                $(document).scrollTop(0);
            });
            $(".wrap > .content-right").find(".btn-bottom").on("click", function (event){
                $(document).scrollTop($(document).height());
            });
        }
        
        // 20180523 main 일때 content-right 위치 변경
        if ($(".wrap").hasClass("main_new")) {
			$(".wrap .content-right").css({
				position: "absolute",
				left: parseInt($(".gnb_wrap").offset().left) + $(".gnb_wrap").outerWidth() + 10,
				top: $(".inner").height() + 20,
			});
			
			// sticky right wing
			if (jQuery('.content-right').offset()) {
				var rightWing = jQuery('.content-right').offset().top;

				jQuery(window).scroll(function(){
					var windowTopNew = jQuery(window).scrollTop() ;
					if (rightWing < windowTopNew){
						jQuery('.content-right').css({position:"fixed",top:20});
					} else {
						jQuery('.content-right').css({position:"absolute",top:$(".inner").height() + 20});
					}
				});
			}
		}
    }
    
    
    /**
     * @private
     * 탭 생성 함수
     */
    function setTab(selector) {
        var tabButtons = $(selector).find("ul li a");
        var tabContainers = $(selector).find("> div");
        var tabIndex = 0;
        var tabList = $(selector).find("> ul").addClass("tab-list");
        tabList.height(tabList.find("li").eq(0).outerHeight(true));
        tabContainers.addClass("tab-container");
        tabContainers.hide();
        tabContainers.eq(tabIndex).show();
        $(selector).data("selectedIndex", tabIndex);
        
        $(selector).find("ul li:eq("+tabIndex+")").addClass("active");
        
        if ($(selector).hasClass("tab-justify")) {
            var tabButtonCnt = tabButtons.length;
            tabButtons.each(function (index) {
                $(this).width(Math.floor($(selector).outerWidth(true) / tabButtonCnt
                    - (parseInt($(this).css("padding-left")) * 2)
                    - parseInt($(this).parent().css("border-left-width"))
                    - parseInt($(this).parent().css("border-right-width"))
                    )
                );
            });
        }
        
        // return 할 객체
        var tabObject = {
            // 각각의 탭 Jquery Object
            target: $(selector),
            // 탭 선택을 index 값으로 핸들링하는 함수
            setTabByIndex: function (index) {
                if (tabIndex == index) return;
                if (index > tabButtons.length - 1) {
                    throw RangeError("index값은 탭 버튼 갯수를 넘을 수 없습니다.");
                }
                tabObject.setTabByTargetId(tabButtons.eq(index).attr("href"));
            },
            // 탭 선택을 컨테이너 ID 값으로 핸들링하는 함수
            setTabByTargetId: function (targetId) {
                var targetElement = $(selector).find(targetId);
            
                if (targetElement == undefined) {
                    throw Error("타겟이 없습니다.");
                }
                else if (!targetElement.is("div")) {
                    throw Error("타겟은 Tab Container이어야 합니다.");
                }
                if (tabIndex == tabContainers.index(targetElement))
                    return;
               
                tabContainers.eq(tabIndex).hide();
                $(selector).find("ul li:eq("+tabIndex+")").removeClass("active");
               
                targetElement.show();
                tabIndex = tabContainers.index(targetElement);
                $(selector).data("selectedIndex", tabIndex);
                $(selector).find("ul li:eq("+tabIndex+")").addClass("active");
                $(selector).trigger("change");
            }
        }
        
        function setTabByBtnClick(btn) {
            if (tabContainers.length != tabButtons.length) {
                $(selector).find("ul li:eq("+tabIndex+")").removeClass("active");
                
                tabIndex = $(selector).find("ul li").index($(btn).parent());
                $(selector).data("selectedIndex", tabIndex);
                $(selector).find("ul li:eq("+tabIndex+")").addClass("active");
                $(selector).trigger("change");
            }
            else {
                tabObject.setTabByTargetId($(btn).attr("href"));
            }
        }
        
        tabButtons.off("click");
        tabButtons.on("click", function (event){
           event.preventDefault();
           setTabByBtnClick(this);
        });
        
        return tabObject;
    }
    
    /**
     * @private
     * 버튼 그룹 생성 함수
     */
    function setButtonGroup(selector) {
        var buttonList = $(selector).find("button");
        
        // 최초 선택 된 버튼이 있는 경우 해당 value 설정
        buttonList.each(function (index){
           if ($(this).hasClass("selected")) {
               $(selector).data("value", $(this).data("value"));
           }
        });
        
        var btnGroupObject = {
            // 각각의 버튼 그룹 Jquery Object
            target: $(selector)
        }
        
        // 버튼 선택 시 selected 변경경
        buttonList.on("click", function (event){
            // 선택 되어있지 않은 버튼에 대해서만 처리
            if (!$(event.currentTarget).hasClass("selected")) {
                $(selector).data("value", $(event.currentTarget).data("value"));
                $(selector).data("selectedIndex", buttonList.index($(event.currentTarget)));
                buttonList.removeClass("selected");
                $(event.currentTarget).addClass("selected");
                // 선택 변경에 대한 이벤트 발생 시킴
                $(selector).trigger("change");
            }
        });
        
        return btnGroupObject;
    }
    
    /**
     * Jquery Datepicker 기본 설정 및 생성
     * 160603 추가
     */
    function setDatepicker() {
        if ($(".datepicker").length > 0) {
            
            var imgRoot = (window.shop != undefined && window.shop.serverImg != undefined) ? "//" + shop.serverImg : "";
            
            // datepicker 기본 설정 override
            
            $.datepicker.setDefaults({
                dateFormat: 'yy.mm.dd',
                /*
                monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
                dayNamesMin: ['일','월','화','수','목','금','토'],
                showMonthAfterYear: true,
                */
                showOn: "button",
                buttonImage : imgRoot + "/resources/images/jquery-ui/ui_datepicker_button.png",
                buttonImageOnly: true,
                buttonText: "날짜선택",
                currentText: "현재일"
            });
            
            // datepicker 생성
            $(".datepicker").datepicker();
            
            // 기본 날짜 설정
            /*
            var date = new Date();
            var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            $(".datepicker").datepicker("setDate", date);
            $(".date-from").datepicker("setDate", firstDay);
            $(".date-to").datepicker("setDate", lastDay);
            */
        }
    }
    
    /**
     * 상품 퀵뷰, 장바구니, 찜하기 버튼 설정
     */
    function setProdUtilButton() {
        // 160603 TODO 개발 전달시 주석처리 필요
        // 퀵뷰 팝업
        
        if (window.shop != undefined) return;
        
        if ($(".btn-quickview").length > 0) {
            $(".btn-quickview").on("click", function(){
                if ($(this).data("url") == undefined) {
                    $(this).data("url", "/html/popup/popup_quickview.html");
                }
                comp.popup($(this),
                    function(){$(".zoomContainer").remove();},
                    function(){$(".zoomContainer").remove();});
            });
        }
        // 장바구니 등록 팝업
        if ($(".btn-cart").length > 0) {
            $(".btn-cart").on("click", function(){
                
                if ($(this).data("url") == undefined) {
                    $(this).data("url", "/html/popup/popup_add_cart.html");
                }
                comp.popup($(this), null, function (){
                    console.log("장바구니로 이동");
                });
            });
        }
        // 찜한 상품 추가 팝업
        if ($(".btn-favorite").length > 0) {
            $(".btn-favorite").on("click", function(){
                
                if ($(this).data("url") == undefined) {
                    $(this).data("url", "/html/popup/popup_add_favorite.html");
                }
                comp.popup($(this), null, function (){
                    console.log("찜리스트로 이동");
                });
            });
        }
    }
    /**
     * @private
     * Dimmed 팝업 커버 생성
     */
    function setDimmedPopup() {
        var dimmedCover;
        //if ($("body").find(".dimmed-cover").length == 0) {
            $("#popupContainer").append("<div id='popup" + popupIdCnt + "' class='dimmed-cover'></div>");
            dimmedCover = $("#popup"+popupIdCnt);
            popupIdCnt++;
        //}
        return dimmedCover;
    }
    
    /**
     * @private
     * Dimmed 팝업 커버 삭제
     */
    function closeDimmedPopup(id) {
        if ($("body").find("#"+id).length > 0) {
            $("#"+id).find(".btn").off("click");
            $("#"+id).remove();
            $("html").css("overflow-y", "scroll"); // 160906 추가 : 페이지 스크롤 항상 노출되도록 함
            $("body").css("overflow", "visible");
            // 160617 추가 : 팝업 닫을 시 body 스크롤 안되도록 스크립트 추가
            $("#popupContainer").parent("body").css("overflow", "visible");
            if ($("#popupContainer").children().length == 0) {
                $("#popupContainer").hide();
            }
        }
    }
    
    /**
     * @private
     * IFrame에서 Dimmed 팝업 커버 삭제
     * 160603 추가
     */
    function closeDimmedPopupSelf(cover, type) {
        var popupData, coverId = cover.attr("id");
        // iFrame 상위(팝업을 생성한) Window 객체의 popupDictionary 참조
        var dic = window.parent.window.nepa.popupDictionary;
        for (var i = 0, n = dic.length; i < n; i++) {
            var item = dic[i];
            if (item.id == coverId) {
                popupData = item;
                window.parent.window.nepa.popupDictionary.splice(i, 1);
                break;
            }
        }
        if (type != undefined && type != null && popupData != null) {
            switch (type) {
                case "confirm":
                    popupData.callbackConfirm();
                    break;
                case "cancel":
                    popupData.callbackCancel();
                    break;
            }
        }
        
        var parent = cover.parent();
        cover.find(".btn").off("click");
        cover.remove();
        // 160617 추가 : 팝업 닫을 시 body 스크롤 안되도록 스크립트 추가
        // 160629 수정 : $(parent) => parent로 변경(IE 에러 이슈)
        parent.parent("html").css("overflow-y", "scroll"); // 160906 추가 : 페이지 스크롤 항상 노출되도록 함
        parent.parent("body").css("overflow", "visible");
        if (parent.children().length == 0) {
            parent.hide();
        }
    }
    
    /**
     * @private
     * Jquery UI 플러그인 중 특정 input[type=text]에 대해
     * 숫자만 입력 가능하도록 하는 플러그인 셋팅
     */
    function setNumericInput() {
        if ($("input[type=text][data-role=numeric]").length > 0 && $.fn.numeric != undefined) {
            $("input[type=text][data-role=numeric]").numeric();
        }
    }
    
    
    /**
     * @private
     * GNB 메뉴 구성
     */
    /*
    160901 삭제
    function setGnbMenuList() {
        if ($(".menu-list") && $(".menu-list li").length > 0) {
            // 1뎁스 메뉴 사이즈에 맞게 2뎁스 리스트 width 조정
            $(".menu-list li").each(function (index){
                $(".menu-sub-list > li").eq(index).width($(this).width());
            });
            $(".menu-sub-list > li").on("mouseover", function(event){
                $(".menu-list li").removeClass("here");
                $(".menu-list li").eq($(this).index()).addClass("here");
            });
            $(".menu-sub-list > li").on("mouseout", function(event){
                $(".menu-list li").removeClass("here");
            });
        }
    }
    */
    
    // Document ready Event
    $(document).ready(function (event){
        /*
        // Anchor 태그 #id 스크롤 이동시 모션으로 이동
        $('a[href*="#"]:not([href="#"])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 250);
                    return false;
                }
            }
        });
        */
        /*
            class="btn"인 Anchor, Button에 대해 기본 기능을 중지시킴
            ex) <a href="#" class="btn">인 경우
            #으로 인해 브라우저 스크롤이 Top 가는것을 막음
        */
        $(".btn").on("click", function (event){
            event.preventDefault();
        });
        comp.initialize();
    });
    
    // 160603 코드 위치 조정
    /**
     * 천단위 콤마가 찍혀있는 숫자형 문자열에 대해
     * 콤마를 제거한 후 Integer 값으로 반환
     */
    $.removeSeparator = function (data) {
        var rtnValue = NaN;
        if (data != undefined) {
            rtnValue = parseInt(data.replace(/(\d+),(?=\d{3}(\D|$))/g, "$1"));   
        }
        return rtnValue;
    }
    /**
     * Integer 값을 문자열로 변환, 천단위 콤마를 찍어주는 함수
     */
    $.thousandsSeparator = function (number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // 160603 코드 위치 조정

    return comp;
}(jQuery));


// window.console Object가 없는 브라우저의 에러 발생 방지 코드
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());