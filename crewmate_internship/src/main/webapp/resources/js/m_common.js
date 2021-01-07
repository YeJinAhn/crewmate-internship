/* global jQuery, $, navigator */

var nepa_m = (function ($){
    // 팝업 id 증가용 integer
    var popupIdCnt = 0;
    
    var comp = {
        // 검색조건 가격 Slider 공통 최소 값
        priceMin: 0,
        // 검색조건 가격 Slider 공통 최대 값
        priceMax: 2000000,
        // 검색조건 가격 Slider 공통 스탭
        priceStep: 100,
        popupDictionary: [],
        initialize: function (){
            setNumericInput();
            // 160912 추가 : 통합몰 메인 레이어 팝업 버튼 기능 추가
            setMainLayerPopupBtnHandler();
            setBrandListPopupBtnHandler();
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
         * Modal Popup 노출 함수
         * @param {Object}      target          타겟이 되는 버튼 JQuery 객체
         * @param {Function}    callbackConfirm 확인 버튼 클릭 콜백 함수
         * @param {Function}    callbackCancel  취소/닫기 버튼 클릭 콜백 함수
         * @param {String}      popupClass      .popup-wrap에 추가할 클래스명
         */
        popup: function (target, callbackConfirm, callbackCancel, popupClass) {
            comp.popupByData(target.data("url"), callbackConfirm, callbackCancel, popupClass);
        },
        /**
         * Modal Popup 노출 함수
         * @param {String}      url             IFrame에 load할 팝업 URL 경로
         * @param {Function}    callbackConfirm 확인 버튼 클릭 콜백 함수
         * @param {Function}    callbackCancel  취소/닫기 버튼 클릭 콜백 함수
         * @param {String}      popupClass      .popup-wrap에 추가할 클래스명
         */
        popupByData: function (url, callbackConfirm, callbackCancel, popupClass) {
            // 전체 팝업을 담는  컨테이너 생성
            if ($("#popupContainer").length == 0) {
                $("body").append('<div id="popupContainer"></div>');
            }
            else {
                $("#popupContainer").show();
            }
            var dimmedCover = setDimmedPopup();
            dimmedCover.append('<iframe id="' + dimmedCover.attr("id") + 'Frame" src="'+ url + '" class="iframe-popup" frameborder="0" allowtransparency="true"></iframe>');
            // 160617 추가 : 팝업 노출시 body 스크롤 안되도록 스크립트 추가
            $("html, body").css("overflow", "hidden");
            $("body").css("top", -$("body").scrollTop());   // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            $("html, body").css("position", "fixed");       // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            // 160603 closePopupSelf 함수에서 callback 함수 사용하기 위해 추가
            var popupData = {
                id: dimmedCover.attr("id"),
                frameId: dimmedCover.attr("id") + "Frame",
                callbackConfirm: callbackConfirm,
                callbackCancel: callbackCancel
            }

            window.nepa_m.popupDictionary.push(popupData);
            
            
            var iframe = dimmedCover.find(".iframe-popup");
            iframe.load(function(){
                // 160616 추가 : IE서 플리커링 나는 이슈 해결을 위해 iframe 로드 완료후 노출 되도록 수정.
                //iframe.show();
                iframe.css("display", "block");
                // 160607 iFrame에 포커스 옮김 추가
                iframe.focus();
                var popup = iframe.contents().find(".popup-wrap");
                popup.attr("data-id", dimmedCover.attr("id"));
                
                console.log(iframe.contents().find("body").width(), iframe.contents().find("body").height());
                
                if (popupClass != undefined) {
                    popup.addClass(popupClass);
                    // 160610 changePopupType 함수 undefined 체크
                    if (iframe[0].contentWindow.changePopupType != undefined) {
                        iframe[0].contentWindow.changePopupType();
                    }
                }
                
                iframe.contents().find(".btn[data-role=popup-close]").on("click", function (event){
                    if ($(event.target).hasClass("btn-confirm") && callbackConfirm != undefined && callbackConfirm != null) {
                        callbackConfirm();
                    }
                    if ($(event.target).hasClass("btn-cancel") && callbackCancel != undefined && callbackCancel != null) {
                        callbackCancel();
                    }
                    
                    /*
                    $("html, body").css("overflow", "visible");
                    var scrollTop = Math.abs(parseInt($("body").css("top")));
                    $("html, body").css({
                        "position": "relative",
                        "top": "inherit"
                    });    // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
                    setTimeout(function(){$("body").scrollTop(scrollTop)}, 1);
                    */
                    closeDimmedPopup(dimmedCover.attr("id"));
                    $(window).off("resize");    // 161007 추가
                });
                
                //popup.draggable({ handle: ".popup-header", containment: "parent", scroll: false });
                
                popup.find(".btn").on("click", function (event){
                    event.preventDefault();
                });
                
                // 160603 팝업 컨텐츠 영역 최대 높이 값 계산
                // 160616 수정 : popup_front.js에서 옮겨옴. 화면 로드 후 중앙 정렬한 뒤 노출되도록 수정
                /*
                161007 삭제 : 함수로 변경
                popup.find(".popup-contents").css({
                    maxHeight: iframe.contents().find("body").height() - popup.find(".popup-header").outerHeight(true) - 24
                });
                //alert(iframe.contents().find("body").width() + " / " + popup.parent().css("width") + popup.css("width") + popup.outerWidth(true));
                popup.css({
                    left: (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 > 0 ? (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 : 0,
                    top: (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 > 0 ? (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 : 0,
                });
                */
                setIFramePopupPositionSize(iframe, popup);  // 161007 추가
                popup.show();
                
                // 160810 추가 : iOS의 경우 팝업 노출 전 위치 조정이 안되는 현상 처리를 위해 한번 더 위치 조정
                if ($("html").hasClass("ios")) {
                    popup.css({
                        left: (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 > 0 ? (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 : 0,
                        top: (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 > 0 ? (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 : 0,
                    });
                }
                
                // 160810 추가 : 팝업 로드 완료 함수 호출
                if (iframe[0].contentWindow.onLoadComplete != undefined) {
                    iframe[0].contentWindow.onLoadComplete();
                }
                // 160616 팝업 로드 완료 후 노출 되도록 수정
                
                // 161007 추가 : 이벤트 추가
                $(window).on("resize", function(){setTimeout(function(){setIFramePopupPositionSize(iframe, popup)}, 100)});
            });
            return popupData;
        },
        /**
         * Modal 매장안내 Popup 노출 함수
         * @param {String}      url             IFrame에 load할 팝업 URL 경로
         * @param {Function}    callbackConfirm 확인 버튼 클릭 콜백 함수
         * @param {Function}    callbackCancel  취소/닫기 버튼 클릭 콜백 함수
         * @param {String}      popupClass      .popup-wrap에 추가할 클래스명
         */
        popupByShopInfo: function (url, callbackConfirm, callbackCancel, callbackClose, popupClass) {
            // 전체 팝업을 담는  컨테이너 생성
            if ($("#popupContainer").length == 0) {
                $("body").append('<div id="popupContainer"></div>');
            }
            else {
                $("#popupContainer").show();
            }
            var dimmedCover = setDimmedPopup();
            dimmedCover.append('<iframe id="' + dimmedCover.attr("id") + 'Frame" src="'+ url + '" class="iframe-popup" frameborder="0" allowtransparency="true"></iframe>');
            // 160617 추가 : 팝업 노출시 body 스크롤 안되도록 스크립트 추가
            $("html, body").css("overflow", "hidden");
            $("body").css("top", -$("body").scrollTop());   // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            $("html, body").css("position", "fixed");       // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            // 160603 closePopupSelf 함수에서 callback 함수 사용하기 위해 추가
            var popupData = {
                id: dimmedCover.attr("id"),
                frameId: dimmedCover.attr("id") + "Frame",
                callbackConfirm: callbackConfirm,
                callbackCancel: callbackCancel
            }

            window.nepa_m.popupDictionary.push(popupData);
            
            
            var iframe = dimmedCover.find(".iframe-popup");
            iframe.load(function(){
                // 160616 추가 : IE서 플리커링 나는 이슈 해결을 위해 iframe 로드 완료후 노출 되도록 수정.
                //iframe.show();
                iframe.css("display", "block");
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
                
                iframe.contents().find(".btn[data-role=popup-close]").on("click", function (event){
                    if ($(event.target).hasClass("btn-confirm") && callbackConfirm != undefined && callbackConfirm != null) {
                        callbackConfirm();
                    }
                    if ($(event.target).hasClass("btn-cancel") && callbackCancel != undefined && callbackCancel != null) {
                        callbackCancel();
                    }
                    
                    if (typeof callbackClose == "function") {
                    	callbackClose(dimmedCover.attr("id"));
                    } else {
                        closeDimmedPopup(dimmedCover.attr("id"));
                    }
                    $(window).off("resize");    // 161007 추가
                });
                
                popup.find(".btn").on("click", function (event){
                    event.preventDefault();
                });
                
                setIFramePopupPositionSize(iframe, popup);  // 161007 추가
                popup.show();
                
                // 160810 추가 : iOS의 경우 팝업 노출 전 위치 조정이 안되는 현상 처리를 위해 한번 더 위치 조정
                if ($("html").hasClass("ios")) {
                    popup.css({
                        left: (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 > 0 ? (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 : 0,
                        top: (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 > 0 ? (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 : 0,
                    });
                }
                
                // 160810 추가 : 팝업 로드 완료 함수 호출
                if (iframe[0].contentWindow.onLoadComplete != undefined) {
                    iframe[0].contentWindow.onLoadComplete();
                }
                // 160616 팝업 로드 완료 후 노출 되도록 수정
                
                // 161007 추가 : 이벤트 추가
                $(window).on("resize", function(){setTimeout(function(){setIFramePopupPositionSize(iframe, popup)}, 100)});
            });
            return popupData;
        },
        /**
         * 함수를 호출한 팝업 IFrame을 제거
         * @param {String}  닫을때 실행할 callback 함수 타입(confirm, cancel)
         */
        closePopupSelf: function (type) {
            if (frameElement != null) {
                // 160603 popupDictionary 변수 추가로 팝업 self 닫기 시 callback 함수 호출 가능
                var cover = $(frameElement.parentElement);
                
                $(window).off("resize");    // 161007 추가
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
            /*
            161007 삭제 : 함수로 변경
            popup.find(".popup-contents").css({
                // 161006 수정 : 커스텀 팝업 컨텐츠 영역 최대 높이 계산식 수정
                maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - 36
            });
            //alert(iframe.contents().find("body").width() + " / " + popup.parent().css("width") + popup.css("width") + popup.outerWidth(true));
            popup.css({
                left: ($(window).width() - popup.outerWidth(true)) / 2 > 0 ? ($(window).width() - popup.outerWidth(true)) / 2 : 0,
                top: ($(window).height() - popup.outerHeight(true)) / 2 > 0 ? ($(window).height() - popup.outerHeight(true)) / 2 : 0,
            });
            */
            setCustomPopupPositionSize(popup);  // 161007 추가
            // popup.draggable({ handle: ".popup-header", containment: "parent", scroll: false });
            
            // $("html").css("overflow-y", "visible");
            // $("body").css("overflow", "hidden");
            $("html, body").css("overflow", "hidden");
            $("body").css("top", -$("body").scrollTop());   // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            $("html, body").css("position", "fixed");       // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            
            // 161007 추가 : 이벤트 추가
            $(window).on("resize", function(){setTimeout(function(){setCustomPopupPositionSize(popup)}, 100)});
        },
        customPopupClose: function(targetId) {
            console.log("customPopupClose", targetId);
            var cover = $("#" + targetId + "Popup").parent();
            var parent = cover.parent();
            cover.remove();
            if (parent.children().length == 0) {
                parent.hide();
            }
            
            // $("html").css("overflow-y", "scroll");
            // $("body").css("overflow", "visible");
            $("html, body").css("overflow", "visible");
            var scrollTop = Math.abs(parseInt($("body").css("top")));
            $("html, body").css({
                "position": "relative",
                "top": "inherit"
            });    // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            console.log(scrollTop);
            setTimeout(function(){$("body").scrollTop(scrollTop);}, 1);
            $(window).off("resize");    // 161007 추가
        }
    };
    
    // 161007 추가 : IFrame Popup orientation 변경시 처리함수
    function setIFramePopupPositionSize(iframe, popup) {
        if (window.innerHeight > window.innerWidth){
            popup.find(".popup-contents").css({
                    maxHeight: iframe.contents().find("body").height() - popup.find(".popup-header").outerHeight(true) - 24
                });
            //alert(iframe.contents().find("body").width() + " / " + popup.parent().css("width") + popup.css("width") + popup.outerWidth(true));
            popup.css({
                minWidth: "auto",
                minHeight: "auto"
            });
            popup.css({
                left: (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 > 0 ? (iframe.contents().find("body").width() - popup.outerWidth(true)) / 2 : 0,
                top: (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 > 0 ? (iframe.contents().find("body").height() - popup.outerHeight(true)) / 2 : 0,
            });
                
        }
        else {
            popup.find(".popup-contents").css({
                maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - ($("html").hasClass("ios") ? 95 : 36)
            });
            popup.css({left: 0, top: 0, minWidth: $(window).width() - 2, minHeight: $(window).height() - 2});
        }
    }
    
    // 161007 추가 : Custom Popup orientation 변경시 처리함수
    function setCustomPopupPositionSize(popup) {
        
        if (window.innerHeight > window.innerWidth){
            popup.find(".popup-contents").css({
                // 161006 수정 : 커스텀 팝업 컨텐츠 영역 최대 높이 계산식 수정
                maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - 36
            });
            //alert(iframe.contents().find("body").width() + " / " + popup.parent().css("width") + popup.css("width") + popup.outerWidth(true));
            
            popup.css({
                minWidth: "auto",
                minHeight: "auto"
            });
            popup.css({
                left: ($(window).width() - popup.outerWidth(true)) / 2 > 0 ? ($(window).width() - popup.outerWidth(true)) / 2 : 0,
                top: ($(window).height() - popup.outerHeight(true)) / 2 > 0 ? ($(window).height() - popup.outerHeight(true)) / 2 : 0
            });
        }
        else {
            popup.find(".popup-contents").css({
                maxHeight: $(window).height() - popup.find(".popup-header").outerHeight(true) - ($("html").hasClass("ios") ? 95 : 36)
            });
            popup.css({left: 0, top: 0, minWidth: $(window).width() - 2, minHeight: $(window).height() - 2});
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
        console.log("!");
        if ($("body").find("#"+id).length > 0) {
            
            $("#"+id).find(".btn").off("click");
            $("#"+id).remove();
            
            $("html, body").css("overflow", "visible");
            
            var scrollTop = Math.abs(parseInt($("body").css("top")));
            $("html, body").css({
                "position": "relative",
                "top": "inherit"
            });    // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            console.log(scrollTop);
            setTimeout(function(){$("body").scrollTop(scrollTop);}, 1);
            // 160617 추가 : 팝업 닫을 시 body 스크롤 안되도록 스크립트 추가
            $("#popupContainer").parents("html, body").css("overflow", "visible");
            if ($("#popupContainer").children().length == 0) {
                $("#popupContainer").hide();
            }
            var pScrollTop = Math.abs(parseInt($("#popupContainer").parents("body").css("top")));
            
            if (pScrollTop == 0)    return;
            $("#popupContainer").parents("html, body").css({
                "position": "relative",
                "top": "inherit"
            }); // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
            setTimeout(function(){$("#popupContainer").parents("body").scrollTop(pScrollTop);}, 1);
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
        var dic = window.parent.window.nepa_m.popupDictionary;
        for (var i = 0, n = dic.length; i < n; i++) {
            var item = dic[i];
            if (item.id == coverId) {
                popupData = item;
                window.parent.window.nepa_m.popupDictionary.splice(i, 1);
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
        
        parent.parents("html, body").css("overflow", "visible");
        if (parent.children().length == 0) {
            parent.hide();
        }
        // 2017.09.22 KJH : IOS 11에서 동작 안되서 주석처리
        // var pScrollTop = Math.abs(parseInt(parent.parents("body").css("top")));
        // if (pScrollTop == 0)    return;
        parent.parents("html, body").css({
            "position": "relative",
            "top": "inherit"
        }); // 160818 추가 : 레이어 팝업 노출시 바닥 페이지 스크롤 막음
        setTimeout(function(){parent.parents("body").scrollTop(pScrollTop)}, 1);
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
     * 통합몰 메인 레이어 팝업 버튼 기능 추가
     * 160912 추가
     */
    function setMainLayerPopupBtnHandler() {
    	// 180116 변경 : KJH 이동 메인 레이어팝업 상관없이 메인인 경우 함수 실행(위치 이동)
    	if (window.setMainBanner != undefined)
            setMainBanner();
        if (window.setRealtionProdList != undefined)
            setRealtionProdList();
        if ($(".layer-popup-wrap .layer-btn-wrap .btn").length > 0) {
        	// 180116 KJH 팝업 사이즈 축소로 main-layer-opened 클래스 추가 사용 안함
        	//$("body").addClass("main-layer-opened");    // 160912 수정 : class명 수정
        	// 180116 추가 : 메인 레이어 팝업이 있는 경우 스크롤 고정
        	$("html, body").css("overflow", "hidden");
        	$("html, body").css("position", "fixed");
            $(".layer-popup-wrap .layer-btn-wrap .btn").on("click", function(){
                $(this).parent().parent().remove();
                // 160928 수정 : 개발에서 처리시 필요한 코드로 수정
                if ($(".layer-popup-wrap .layer-popup:visible").length == 0) {
                    $(".layer-popup-wrap").remove();
                    // 180116 추가 : 메인 레이어 팝업이 다 닫힌 경우 스크롤 잠금 해제
                    $("html, body").css("overflow", "visible");
                	$("html, body").css("position", "relative");
                	// 180116 KJH 팝업 사이즈 축소로 main-layer-opened 클래스 추가 사용 안함
                	// $("body").removeClass("main-layer-opened"); // 160912 수정 : class명 수정
                	
                	// 180116 변경 : KJH 코드 위치를 위로 이동 시켜서 사용 안함
                	// 160919 추가 : 통합몰 메인 배너 처리 함수 있는경우(메인인 경우) 함수 실행
                    //if (window.setMainBanner != undefined)
                        // 160923 수정 : iOS에서 배너가 한개인 경우 정상 노출 안되는 이슈 수정
                        // 160926 수정 : 위 이슈 다른 방식으로 해결
                    //    setMainBanner();
                    // 160913 추가 : 베스트 상품 함수 있는경우(메인인 경우) 함수 실행
                    //if (window.setRealtionProdList != undefined)
                    //    setRealtionProdList();
                }
            });
        }
        // 180116 변경 : KJH 코드 위치를 위로 이동 시켜서 사용 안함
        // 160919 추가 : 통합몰 메인 배너 처리 함수 있는경우(메인인 경우) 함수 실행
        /*else {
            if (window.setMainBanner != undefined)
                setMainBanner();
            if (window.setRealtionProdList != undefined)
                setRealtionProdList();
        }*/
    }
    /**
     * @private
     * 하단 브랜드 버튼 클릭 시 팝업 노출 공통 이벤트
     * 160816 추가
     */
    function setBrandListPopupBtnHandler() {
        // 개발에서 사용되는 shop 변수 체크하여 퍼블리싱 화면이 아닌경우 return;
        if (window.shop != undefined)
            return;
        if ($("footer nav button.btn-brand").length > 0) {
            $("footer nav button.btn-brand").on("click", function (event){
                comp.popupByData("/html/m_popup/popup_brand_list.html");
            });
        }
    }
    
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
    
    $(document).ready(function (event){
        comp.initialize();
        
        // Anchor 태그 #id 스크롤 이동시 모션으로 이동
        $('a[href*="#"]:not([href="#"])').click(function(event) {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
                if (target.length == 0)
                    return;
                var scrollTop = target.offset().top - $("header").height() - 10;
                if ($(".affix-top, .affix").length > 0) {
                    scrollTop -= $(".affix-top, .affix").outerHeight(true) - 10;
                    if ($(".affix").length > 0 && $(this).data("scrollOffset")) {
                        scrollTop += $(this).data("scrollOffset");
                    }
                }
                
                if (target.length) {
                    $('html, body').animate({
                        // header 가 position fixed로 되어있기 때문에 scrollTop을 header 높이를 감안하여 이동
                        scrollTop: scrollTop
                    }, 250);
                    return false;
                }
            }
        });
        
        // 단말 체크하여 html 해당 단말명 class 추가
        // 160810 수정 : OS Type 체크 내용 변경
        var osType = String(navigator.userAgent.match(/Android|iPhone|iPad|iPod|BlackBerry|Opera Mini|IEMobile/i)).replace(/ /gi, '').toLowerCase()
        
        // iOS 단말의 경우 통칭하여 ios 추가
        if (osType.match("iphone|ipad|ipod") != null && osType.match("iphone|ipad|ipod").length > 0)
            osType = "ios";
        
        $("html").addClass(osType);
    });
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


$(document).ready(function(){ btnKidsStatus() })
$(window).scroll(function(){ mSkyScraper() })

// skyScraper
var pageBtnTop = $('#qBtnTop');
// top 버튼 이동
pageBtnTop.on('click', function(){
    $( 'html, body' ).animate( { scrollTop : 0 }, 600 );
})
// main만 kids버튼 활성화
function btnKidsStatus() {
    var commonClass = $('.wrap'),
        mainStatus = $('.wrap').hasClass('main_new'),
        skyScraperKids = $('#qBtnKids');

        if(mainStatus){
            skyScraperKids.show();
        }
        else{
            skyScraperKids.hide();
        }
}

// scroll 이벤트 화면 1/2 스크롤시 skyScraper 활성화
function mSkyScraper(){
    var winScrollTop = $(window).scrollTop(),
        winHeight = $(window).height(),
        skyScraperOnPoint = winHeight / 2,
        skyScraperWrap = $('.sky_scraper');

    if(winScrollTop >= skyScraperOnPoint) 
    {
        skyScraperWrap.fadeIn();
    }
    else
    {
        skyScraperWrap.fadeOut();
    }
}
