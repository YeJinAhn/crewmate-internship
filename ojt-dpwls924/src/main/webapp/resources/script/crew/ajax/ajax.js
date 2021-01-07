/******************************************************************************
	작성자 : 김기석
	작성일 : 2011.05.03
	기능 : 일반 ajax 요청 처리
******************************************************************************/
$.crewAjaxLib = {
	defaults : {
		// $.ajax에서 기본적으로 사용하는 파라미터
		async : true, 
		url : "",
		dataType : "text", 
		type : "post", 
		data : {}, 

		// 내부적으로 추가되는 파라미터
		debug : false, 
		debugSkip : "success,error,complete,debug,debugSkip",	// 디버그 모드에서 출력하지 않을 항목들... 
		successCallBack : null, 
		errorCallBack : null, 
		completeCallBack : null, 
		responseType : "json",			// 리턴타입. json|string
		responseValidate : true,		// 리턴 데이터가 JSON인 경우 resultCode가 0보다 작은지를 체크한다.
		form : '',						// 특정폼의 데이터를 전송하는 경우. jquery의 selector의 형식을 따른다. 기존의 data는 무시한다.
		resultErrorAlert : true			// 서버로부터 에러코드를 받으면 alert를 보여줄지 여부를 설정
	}, 
	
	// 실제 서비스 요청 처리 함수
	request : function(options){
		options = $.extend(true, {}, $.crewAjaxLib.defaults, options);
		if(options.form != ''){ options.data = $(options.form).formSerialize(); }
		
		// 성공 이벤트 핸들
		options.success = function(data, textStatus, XMLHttpRequest){
			debugView("성공", XMLHttpRequest);
			var result;

			// 요청이 중간에 중단되면 firefox에서는 '' 을 다음 핸들러에 전달한다.
			if(options.responseType == "json" && data != ''){
				try{
					result = $.parseJSON(data);

					if(options.responseValidate){
						if(result.resultCode){
							if(options.resultErrorAlert && result.resultCode < 0){
								alert(result.resultMsg);
							}
						}else{
							alert("정상적인 메세지를 받지 못했습니다. => \n" + data);
						}
					}
				}catch(e){
					alert(options.url + "\n\n응답데이터가 JSON 형식이 아닙니다.\n\n" + e);
				}
			}
			
			if(options.responseType == "string"){ result = data; }
			if(typeof(options.successCallBack) == "function"){ options.successCallBack(result, textStatus, XMLHttpRequest, options); }
		};
		
		// 실패 이벤트 핸들
		options.error = function(XMLHttpRequest, textStatus, errorThrown){
			debugView("실패", XMLHttpRequest);
			if(typeof(options.errorCallBack) == "function"){ options.errorCallBack(options, XMLHttpRequest, textStatus, errorThrown); }
		};
		
		// 종료 이벤트 핸들(성공이나 실패 실행후 실행됨);
		options.complete = function(XMLHttpRequest, textStatus){
			debugView("완료", XMLHttpRequest);
			//alert("complete\n\n" + textStatus);
		};
		
		// 디버그용 함수
		function debugView(msg, XMLHttpRequest){
			if(options.debug){
				var s = options.url + " " + msg + "\n\n";
				for(var k in options){ if(options.debugSkip.indexOf(k) < 0){ s += k + " => " + options[k] + "\n"; } }
				alert(s);
				var s = " 응답결과\n\n";
				for(var k in XMLHttpRequest){ if(options.debugSkip.indexOf(k) < 0){ s += k + " => " + XMLHttpRequest[k] + "\n"; } }
				alert(s);				
			}			
		}

		// ajax call
		$.ajax(options);		
	}
};


(function($) {
	$.crewAjax = $.crewAjaxLib.request;
})(jQuery);