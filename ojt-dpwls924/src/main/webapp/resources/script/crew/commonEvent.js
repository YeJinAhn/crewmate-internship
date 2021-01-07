/*******************************************************************************
 * 작성자 : 김재한
 * 
 * 작성일 : 2018.08.24 기능 : 이벤트응모 공통 스크립트
 ******************************************************************************/

var event = {
	/**
	 * PC, MO alert창 분기 처리
	 * @param str 내용
	 * @param fn callback function
	 */
	callAlert : function(str, fn) {
		if (typeof nepa === "undefined") {
			alert(str);
			if (typeof fn === "function") {
				fn();
			}
		} else {
			if (typeof fn === "function") {
				fnAlert(str, fn);
			} else {
				fnAlert(str, function() {
					return;
				});
			}
		}
	},
	
	/**
	 * 데이터 검증 및 ajax 전송
	 * @param data 전송할 내용
	 * @param ajaxUrl 요청 URL
	 */
	req : function(data, ajaxUrl) {
		$.extend(data, {
			"pathName" : document.location.pathname
		});
		
		$.ajax({
			async : true,
			url : ajaxUrl,
			dataType : "json",
			type : "POST",
			data : data,
			success : function(data, textStatus, jqXHR) {
				if (data.resultCode == 1) {
						event.callAlert(data.message, function() {
						// 페이지 새로고침
						location.href = document.location.pathname;
					});
				} else if (data.resultCode == 400) {
						// 로그인 페이지 redirect
						event.callAlert(data.message, function() {
						goLogin();
					});
				} else {
					event.callAlert(data.message);
				}
			},
			error : function() {
			}
		});
	},
	
	// 신청기간 체크
	/*
	chkEventTerm : function(data) {
		event.req(data, "/event/checkEvent.json");
	},
	*/
	
	/**
	 * 신청하기 (전체)
	 * @param data 전송할 내용
	 */
	joinEventForAll : function(data) {
		event.req(data, "/event/joinAllUser.json")
	},
	
	/**
	 * 신청하기 (네파몰 회원만)
	 * @param data 전송할 내용
	 */
	joinEventMallUser : function(data) {
		event.req(data, "/event/joinMallUser.json");
	}
};