/******************************************************************************
	작성자 : 김기석
	작성일 : 2012.02.08
	기능 : 데이터 채우기 인터페이스 처리
	- 템플릿은 html에서 처리하는 방식으로 구현 
******************************************************************************/

$.crewFillLib = {
	// HTML 치환형식으로 데이터 채우기
	fill : function(options){
		var defaults = {
			data : {}, 					// 채워넣을 데이터 오브젝트
			templete : "", 				// 템플릿 - 값이 없으면 해당 오브젝트의 HTML 내용을 읽어서 사용함.
			prefix : "\\\$\\\[", 		// replace에서 사용할 정규표현식의 접두사
			suffix : "\]"				// replace에서 사용할 정규표현식의 접미사
		};
		
		if($(this).data("crewFillInit") != true){
			options = $.extend(true, {}, defaults, options);
			if(options.templete == ""){ options.templete = $(this).html(); }
		}else{
			options = $.extend(true, {}, $(this).data("crewFillOption"), options);
		}

		$(this).data("crewFillInit", true);
		$(this).data("crewFillOption", options);
		
		
		// 치환 처리
		var data = options.data;
		var html = options.templete;
		for(var key in data){
			var regExp = new RegExp(options.prefix + key + options.suffix, "gi");
			html = html.replace(regExp, "test");
		}
		
		// 적용
		$(this).html(html);
	} 
};


(function($) {
	$.fn.crewFill = $.crewFillLib.fill;
})(jQuery);

