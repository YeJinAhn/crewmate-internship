/* global jQuery, $ */

(function ($){
    $(document).ready(function(){
        return;
        // 팝업 가운데 정렬
        var popup = $(".popup-wrap");
        /*
        // 160603 팝업 컨텐츠 영역 최대 높이 값 계산
        // 160616 수정 : common_front.js에서 옮김
        popup.find(".popup-contents").css({
            maxHeight: $("body").height() - $(".popup-header").outerHeight(true) - 8
        })
        popup.css({
            left: ($("body").width() - popup.outerWidth(true)) / 2 > 0 ? ($("body").width() - popup.outerWidth(true)) / 2 : 0,
            top: ($("body").height() - popup.outerHeight(true)) / 2 > 0 ? ($("body").height() - popup.outerHeight(true)) / 2 : 0,
        });
        */
    });
})(jQuery);