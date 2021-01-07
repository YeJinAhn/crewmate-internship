/******************************************************************************
	작성자 : 김세형

	작성일 : 2016.04.25
	기능 : 상담스크립트 구분 > 유형 셀렉트박스
******************************************************************************/

var csScript = {
		
	content : [],
	
	/** 
	 * 상담스크립트 구분 셀렉트박스에 change 이벤트가 일어날 때
	 * 이 함수를 수행하면 유형 셀렉트박스를 생성해준다.
	 * 
	 * @param selector	: 유형 셀렉트박스
	 * @param type		: 선택한 상담스크립트 구분값
	 */
	setScriptSelectBox : function(selector, type) {
		var csscriptSelectBox = $(selector);
		
		$.ajax({
	        type		: 'post',
	        data		: {'contentGroup' : type},
	        url			: '/cs/csScriptList.json',
	        dataType	: 'json',
	        success		: function(data) {
	        	
	        	var html = "";
	        	csScript.content = [];
	        	
	        	html += "<select name='titleSub' onchange='csScript.setReply(this)'>";
				html += "<option value=''>선택해주세요</option>";
				
				$.each(data.list, function() {
					html += "<option>" + this.title + "</option>";
					csScript.content.push(this.content);
				});
				
				html += "</select>";
				
	        	csscriptSelectBox.html(html);
	        }
	    });
	},
	
	/**
	 * 유형 셀렉트박스가 change 이벤트가 일어날 때
	 * 이 함수를 수행하면 상담스크립트를 답변에 자동으로 채워준다.
	 * 
	 * @param select 유형 셀렉트박스
	 */
	setReply : function(select) {
		$("textarea[name=contentReply]").val(csScript.content[select.options.selectedIndex - 1]);
	},
	
	
	/** 
	 * 회원정보>tab정보>상담스크립트 구분 셀렉트박스에 change 이벤트가 일어날 때
	 * 이 함수를 수행하면 유형 셀렉트박스를 생성해준다.
	 * 
	 * @param selector	: 유형 셀렉트박스
	 * @param type		: 선택한 상담스크립트 구분값
	 */
	setTabScriptSelectBox : function(selector, type, idx) {
		var csscriptSelectBox = $(selector);
		
		$.ajax({
	        type		: 'post',
	        data		: {'contentGroup' : type},
	        url			: '/cs/csScriptList.json',
	        dataType	: 'json',
	        success		: function(data) {
	        	
	        	var html = "";
	        	csScript.content = [];
	        	
	        	html += "<select name='titleSub' onchange='csScript.setTabReply(this,"+idx+")'>";
				html += "<option value=''>선택해주세요</option>";
				
				$.each(data.list, function() {
					html += "<option>" + this.title + "</option>";
					csScript.content.push(this.content);
				});
				
				html += "</select>";
				
	        	csscriptSelectBox.html(html);
	        }
	    });
	},
	
	/**
	 * 유형 셀렉트박스가 change 이벤트가 일어날 때
	 * 이 함수를 수행하면 상담스크립트를 답변에 자동으로 채워준다.
	 * 
	 * @param select 유형 셀렉트박스
	 */
	setTabReply : function(select, idx) {
		$("#contentReply_"+idx).val(csScript.content[select.options.selectedIndex - 1]);
	}
	
};