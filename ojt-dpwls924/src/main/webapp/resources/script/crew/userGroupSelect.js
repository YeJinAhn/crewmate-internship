/******************************************************************************
	작성자 : 김은미

	작성일 : 2016.04.28
	기능 : 회원그룹유형/명> 회원그룹유형명 셀렉트박스
******************************************************************************/

var userGroupList = {
		
	/** 
	 * 회원그룹유형 셀렉트박스가 change 이벤트가 일어날 때
	 * 이 함수를 수행하면 회원그룹 셀렉트박스를 생성해준다.
	 * 
	 * @param selector	: 회원그룹유형 셀렉트박스
	 * @param type		: 선택한 상담스크립트 구분값
	 */
	setUserGroupSelectBox : function(selector, type, group) {
		var userGroupSelectBox = $(selector);
		
		$.ajax({
	        type		: 'post',
	        data		: {'userGroupType' : type},
	        url			: '/user/userGroupSelectboxList.json',
	        dataType	: 'json',
	        success		: function(data) {
	        	var html = "";
	        	html += "<select name='userGroup' disabled>";
				
				$.each(data.list, function() {
					var selectedStr = "";
					if(group == this.userGroup){
						selectedStr = "selected='selected'";
					}
					html += "<option value='" + this.userGroup + "' " + selectedStr + ">" + this.userGroupNm + "</option>";
				});
				
				html += "</select>";
				
				userGroupSelectBox.html(html);
	        }
	    });
	}
	
};