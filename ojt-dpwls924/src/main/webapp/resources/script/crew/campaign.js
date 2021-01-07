/******************************************************************************
	작성자 : 김세형

	작성일 : 2016.09.20
	기능   : 이벤트페이지 공통 스크립트
******************************************************************************/

var campaign = (function(window, $, undefined) {
	
	var pbModule;
	
	var target = {};
	
	var brand = "nepa";
	
	var contentNo = "0";
	
	var appYn;
	
	var comp = {
			
		init : function(options) {
			setOptions(options);
			hideApp("hideApp");
		},
		
		openReq : openReq,
		
		openCheck : openCheck
		
	};
	
	function setOptions(options) {
		if(options === undefined) { throw Error("옵션은 필수값입니다."); }
		if(options.brand) { brand = options.brand; }
		if(options.contentNo) { contentNo = options.contentNo; }
		if(options.pbModule) { pbModule = options.pbModule; }
		if(options.appYn) { appYn = options.appYn; }
	}
	
	// 각 브랜드 팝업스타일값 반환
	function checkBrand(_brand) {
		if(_brand === "nepa") {
			return "brand-nepa";
		} else if(_brand === "isenberg") {
			return "brand-isen";
		} else if(_brand === "nepakids") {
			return "brand-kids";
		} else {
			throw Error("유효하지 않은 브랜드 값. (유효값 : nepa, isenberg, nepakids)");
		}
	}
	
	// 신청팝업
	function openReq() {
		var style = checkBrand(brand);
		pbModule.popupByData("/" + brand + "/campaign/popup/eventApply.do?contentNo=" + contentNo, null, null, style);
	}

	// 신청확인 팝업
	function openCheck() {
		var style = checkBrand(brand);
		pbModule.popupByData("/" + brand + "/campaign/popup/eventCheck.do?contentNo=" + contentNo, null, null, style);
	}
	
	// 커스텀 팝업
	// _target : 커스텀팝업 div id값
	function openCustom(_target) {
		target[_target] = _target;
		pbModule.customPopup(target[_target]);
	}
	
	// 커스텀 팝업 닫기
	// _target : 커스텀팝업 div id값
	function onClosePopup(_target) {
		pbModule.customPopupClose(target[_target]);
	}
	
	function callAlert(str, fn, arg) {
		if (typeof nepa === "undefined") {
			alert(str);
			if(fn) {
				fn(arg);
			}
		} else {
			if(fn) {
				fnAlert(str, fn(arg));
			} else {
				fnAlert(str, function(){ return; });
			}
		}
	}
	
	function req(_target, _data, _ajaxUrl) {
		
		// 플랫폼 판단
    	var plat;
    	/*if ($("html").hasClass("ios") || $("html").hasClass("android")) {
    		plat = ".use-mobile";
    	} else {
    		plat = ".use-pc";
    	}*/
    	if (typeof nepa === "undefined") {
    		plat = ".use-mobile";
    	} else {
    		plat = ".use-pc";
    	}
    	
    	// 전송 데이터 셋팅 tmplPopupApplyPopup
		/*var data;
		if(_data) {
			data = _data;
		} else {
			data = $("#popup0").find("form" + plat).serializeObject();
		}*/
    	data = $("#popupContainer").find("form" + plat).serializeObject();
		data.contentNo = contentNo;
		
		// 유효성 체크 (이름, 전화번호)
		if(!data.name) {
			callAlert("이름을 입력해주세요.");
			return false;
    	}
		
		if( Array.isArray(data.hp) ) {
			for(var i = 0; i < data.hp.length ; i++) {
	    		if(data.hp[i].trim().length === 0) {
	    			callAlert("번호를 입력해주세요.");
	    			return false;
	    		}
	    	}
			data.hp = data.hp.join("-");
		}
		if(!data.hp) {
			callAlert("번호를 입력해주세요.");
			return false;
    	}
		
		if( Array.isArray(data.mail) ) {
			for(var i = 0; i < data.mail.length ; i++) {
	    		if(data.mail[i].trim().length === 0) {
	    			callAlert("이메일을 입력해주세요.");
	    			return false;
	    		}
	    	}
			data.mail = data.mail.join("@");
		}
		if(!data.mail) {
			callAlert("이메일을 입력해주세요.");
			return false;
    	}
		
		if( data.info1 && Array.isArray(data.info1) ) {
			data.info1 = data.info1.join(".");
		}
		if( data.info2 && Array.isArray(data.info2) ) {
			data.info2 = data.info2.join(".");
		}
		if( data.info3 && Array.isArray(data.info3) ) {
			data.info3 = data.info3.join(".");
		}
		if( data.info4 && Array.isArray(data.info4) ) {
			data.info4 = data.info4.join(".");
		}
		if( data.info5 && Array.isArray(data.info5) ) {
			data.info5 = data.info5.join(".");
		}
		
		// (임시) 문자열 길이체크
		if( data.info1 && data.info1.length > 66 ) {
			callAlert("추가정보1 문자열 길이가 너무 깁니다.");
			return false;
		}
		if( data.info2 && data.info2.length > 66 ) {
			callAlert("추가정보2 문자열 길이가 너무 깁니다.");
			return false;
		}
		if( data.info3 && data.info3.length > 66 ) {
			callAlert("추가정보3 문자열 길이가 너무 깁니다.");
			return false;
		}
		if( data.info4 && data.info4.length > 66 ) {
			callAlert("추가정보4 문자열 길이가 너무 깁니다.");
			return false;
		}
		if( data.info5 && data.info5.length > 66 ) {
			callAlert("추가정보5 문자열 길이가 너무 깁니다.");
			return false;
		}
		
		// 파라미터로 넘긴 문자열이 존재하면 alert 띄움
		if(_data) {
			if(typeof _data === "string") {
				callAlert(_data);
			}
			return false;
		}
    	
    	$.ajax({
    		async		: true,
    		url			: _ajaxUrl,
    		dataType	: "json",
    		type		: "POST",
    		data		: data,
    		success		: function(result, textStatus, jqXHR){
    			if(result.resultCode === 108) { callAlert("죄송합니다. 본 이벤트는 멤버십 회원만 신청이 가능합니다."); return; }
    			if(result.resultCode === 109) { callAlert("이미 신청하였습니다."); return; }
    			if(result.resultCode === 110) { callAlert("죄송합니다. 본 이벤트는 통합몰 회원만 신청이 가능합니다."); return; }
    			if(result.resultCode === 111) {
    				
    				/*
    				var str = "죄송합니다. 본 이벤트는 최우수등급 이상의 통합몰 회원만 신청이 가능합니다. 확인버튼을 누르시면 회원가입 페이지로 이동합니다.";
    				var joinUrl;
    				if (typeof nepa === "undefined") {
    					joinUrl = shop.serverMoOrg === "m.dev.nepamall.com" ? 'http://' + shop.serverMO : 'https://' + shop.serverMoOrg + (shop.sslPort ? shop.sslPort : '');
    					if(confirm(str)) {
    						window.location.href = joinUrl + '/join/userConfirmForm.do';
    					}
    					
    				} else {
    					joinUrl = shop.serverPcOrg === "dev.nepamall.com" ? 'http://' + shop.serverPC : 'https://' + shop.serverPcOrg + (shop.sslPort ? shop.sslPort : '');
    					fnConfirm(str, function() {
    	    				window.location.href = joinUrl + '/join/userConfirmForm.do';
    	    			});
    					pbModule.popupByData("/common/eventConfirm.do", null, null, "eventConfirm");
    				}
    				*/
    				
    				pbModule.popupByData("/common/eventConfirm.do", null, null, "eventConfirm");
    				return;
    			}
    			if(!crew.ajaxValidate(result)){ return; }
    			
    			callAlert("신청하였습니다.", function(arg) {
    				onClosePopup(arg);
    			}, target[_target]);
    		},
    		error		: function() {}
    	});
	}
	
	// 신청하기 (멤버십 회원만)
	function requestEvent(_target, _data) {
		req(_target, _data, "/campaign/campaignReqSave.json");
    }
	// 신청하기 (통합몰 회원만)
	function requestEventForUser(_target, _data) {
		req(_target, _data, "/campaign/campaignReqSaveForUser.json");
    }
	// 신청하기 (모두 신청가능)
	function requestEventForAll(_target, _data) {
		req(_target, _data, "/campaign/campaignReqSaveForAll.json");
    }
	// 신청하기 (최우수등급 이상의 네파몰 회원만)
	function requestEventForUserX(_target, _data) {
		req(_target, _data, "/campaign/campaignReqSaveForUserX.json");
    }
	
	function hideApp(_targetClass) {
		if(appYn === "Y") {
			$("." + _targetClass).hide();
		}
	}
	
	window.openReq = openReq;
	window.openCheck = openCheck;
	window.openCustom = openCustom;
	window.onClosePopup = onClosePopup;
	window.requestEvent = requestEvent;
	window.requestEventForUser = requestEventForUser;
	window.requestEventForAll = requestEventForAll;
	window.requestEventForUserX = requestEventForUserX;
	
	return comp;
	
}(window, jQuery));