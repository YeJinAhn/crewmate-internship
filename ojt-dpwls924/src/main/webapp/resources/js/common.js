(function (){
    $(document).ready(function (){
    
        // LNB 영역 펼침, 닫침 이벤트
        $(".btn-lnb-ctrl").on("click", function(){
            $(".lnb-wrap").toggleClass("hide"); 
        });
        
        // LNB 2뎁스 펼침, 닫침 이벤트
        $(".lnb-list > li > a").on("click", function(){
            $(this).parent().toggleClass("open");
        });
        
        setDatepicker();
        setTabs();
        setContentsHeight();
        setPopupLinkEvent();
        // 160427 추가
        setFoldButton();
        $(window).resize(onResizeWindow);
    });
    
    // 윈도우 리사이즈 이벤트 핸들러
    function onResizeWindow() {
        setContentsHeight();
    }
    
    // 우측 컨텐츠영역 높이값 조정
    function setContentsHeight() {
        if ($(".contents-wrap").outerHeight() > $(".contents-inner").outerHeight()) {
            var resizeH = $(".contents-inner").height() + $(".contents-wrap").outerHeight() - $(".contents-inner").outerHeight();
            $(".contents-inner").height(resizeH);
        }
    }
    
    // Jquery Datepicker 기본 설정 및 생성
    function setDatepicker() {
        if ($(".datepicker").length > 0) {
            
            // datepicker 기본 설정 override
        	/*
			$.datepicker.setDefaults({
				dateFormat: 'yy.mm.dd',
				monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
				dayNamesMin: ['일','월','화','수','목','금','토'],
				showMonthAfterYear: true,
				showOn: "button",
				buttonImage : "/resources/images/icon/icon_datepicker.png",
				buttonImageOnly: true,
				buttonText: "Select date",
				currentText: "Now"
			});
			*/
			
			// datepicker 생성
            //$(".datepicker").datepicker();
            
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
    
    // jQuery Tab 생성
    function setTabs() {
        if ($(".tab-wrap").length > 0) {
            $(".tab-wrap").tabs();
        }
    }
    
    // 팝업 이벤트 설정
    function setPopupLinkEvent() {
        if ($(".popup-link").length > 0) {
			$(".popup-link").on("click", function(event){
				event.preventDefault();
				var url = $(this).prop("href");
				var target = $(this).prop("target");
				var options =  "width="+$(this).data("popup-width")+", height="+$(this).data("popup-height")+", resizable=0, scrollbars=no, status=no, directories=no;";
				window.open(url, target, options);
			});
        }
    }
    
    // 160427 추가
    // 폴딩 버튼 이벤트 설정
    function setFoldButton() {
        if ($(".btn-fold").length > 0) {
            $(".btn-fold").on("click", function(event){
				event.preventDefault();
				var target = $(this).data("target");
				$("#" + target).toggle();
				$(this).toggleClass("opened");
				if ($("#" + target).css("display") == "none") {
				    $(this).find(".toggle-text").text("열기");
				}
				else {
				    $(this).find(".toggle-text").text("닫기");
				}
            });
        }
    }
})();