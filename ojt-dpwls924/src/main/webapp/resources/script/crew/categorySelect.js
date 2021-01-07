/******************************************************************************
	작성자 : 정재요

	작성일 : 2016.05.16
	기능 : 카테고리 선택 공통 스크립트.
******************************************************************************/
var categorySelect = {
	ctgNo : 0,		// 현재의 카테고리 번호
	ctgPath : [],	// 카테고리 경로 
	ctgType : "",	// 카테고리 타입
	$area : $("div.cateSelectArea"),	// 카테고리 선택 영역.
	
	/**
	 * 현재의 카테고리 번호 세팅.
	 * @param {Number} categoryNo 카테고리 번호.
	 */
	setCategoryNo : function(categoryNo) {
		if(!categoryNo){ categoryNo = 0; }
		categorySelect.ctgNo = categoryNo;
	},
	
	/**
	 * 카테고리를 구성할 카테고리 타입 설정.
	 *  - BO_MENU			: 백오피스 메뉴
	 *  - DISP				: 전시카테고리
	 *  - PLAN_SHOP			: 기획매장
	 *  - POINT_OCCUR_TYPE	: 포인트 발생 유형
	 *  - STD				: 표준카테고리
	 *  - VIRTUAL_SHOP		: 가상매장
	 */
	setCategoryType : function(categoryType) {
		if(!categoryType){ categoryType = "DISP"; }
		categorySelect.ctgType = categoryType;
	},

	/**
	 * 카테고리를 구성할 영역 이름 설정, default : 'cateSelectArea'
	 */
	setArea : function(areaId) {
		if(!areaId){ areaId = "cateSelectArea"; }
		categorySelect.$area = $("div." + areaId);
	},

	/**
	 * 현재 선택된 카테고리의 전체 경로 설정. 
	 * @param {Array} categoryPath 카테고리 경로 리스트.
	 */
	setCategoryPath : function(categoryPath) {
		if (!categoryPath) {
			categoryPath = [];
		}
		categorySelect.ctgPath = categoryPath;
	},
	
	/**
	 * 카테고리 선택 시 카테고리 번호, 카테고리 경로 재설정.
	 */
	setInfo : function() {
		categorySelect.ctgPath = [];
		$("select.ctgNos").each(function() {
			if ($(this).val() != "") { categorySelect.ctgPath.push($(this).val()); }
		});
		
		categorySelect.ctgNo = categorySelect.ctgPath[categorySelect.ctgPath.length - 1];
		$("input[name='ctgNo']").val(categorySelect.ctgNo);
		$("input[name='ctgPath']").val(categorySelect.ctgPath.join(","));
	},

	/**
	 * 카테고리 영역에 카테고리 정보 생성.
	 * 
	 * @param  {Number}  parentCtgNo	카테고리 목록을 조회하기 위한 부모 카테고리 번호
	 * @param  {Number}  level			현재 처리하고 있는 카테고리 Level
	 */
	createArea : function(parentCtgNo, level, area) {
		var data = { "ctgType" : categorySelect.ctgType, "parentCtgNo" : parentCtgNo };
		
		$.ajax({
			async : true,
			url : "/category/categoryPath.json",
			dataType : "json",
			type : "POST",
			data : data,
			success : function(data, textStatus, jqXHR) {
				if(!crew.ajaxValidate(data)){ return; }

				var ctgNo = categorySelect.ctgPath[level];
				if(data != null && data.list.length > 0){
					var html = "";
					html += "<select class='ctgNos' onchange='categorySelect.change(this.value, " + level + ")'>";
					html += "<option value=''>" + (level + 1) + "차 카테고리</option>";
					$.each(data.list, function(i) {
						var selected = "";
						if(this.ctgNo == ctgNo){ selected = "selected"; }
						html += "<option value='" + this.ctgNo + "'" + selected + ">" + this.name + "</option>";
					});
					html += "</select> "; // Select 태그간 간격을 위해 뒤에 한칸의 공백 필요.
				}
	
				if(area){
					area.append(html);
				}else{
					categorySelect.$area.append(html);
				}
	
				if(categorySelect.ctgPath.length > level && categorySelect.ctgNo > 0){
					categorySelect.createArea(ctgNo, (level + 1));
				}
			}
		});
	},

	/**
	 * 카테고리 영역과 정보 초기화. - select문 선택 해제
	 */
	clear : function() {
		$("input[name='ctgNo']").val("");
		$("input[name='ctgPath']").val("");
		
		categorySelect.ctgNo = 0;
		categorySelect.ctgPath = [];
		
		categorySelect.$area.find("select.ctgNos:eq(0)").find("option").removeAttr("selected");
		categorySelect.change(0, "");
	},
	
	/**
	 * 카테고리 영역과 정보 초기화. - select를 모두 삭제하고 다시 생성.
	 */
	clearDeep : function() {
		$("input[name='ctgNo']").val("");
		$("input[name='ctgPath']").val("");
		
		categorySelect.ctgNo = 0;
		categorySelect.ctgPath = [];
		
		categorySelect.$area.find("select").each(function(i){ $(this).remove(); });
		categorySelect.createArea(0, 0);
	},

	/**
	 * 카테고리 선택.
	 * 
	 * @param  {[type]} parentCtgNo	현재 선택한 카테고리 번호
	 * @param  {[type]} level		선택한 카테고리의 Level
	 */
	change : function(parentCtgNo, level) {
		$("select.ctgNos").each(function(i) {
			if(i > level){ $(this).remove(); }
		});

		if(parentCtgNo != ""){	categorySelect.createArea(parentCtgNo, level + 1); }
		categorySelect.setInfo();
	},

	/**
	 * 선택한 카테고리의 경로 이름을 반환 
	 *  - '1차카테고리명 > 2차카테고리명 > 3차카테고리명' 형식으로 반환함.
	 * 
	 * @return {String} 현재 선택한 카테고리의 경로 이름.
	 */
	getCategoryPathName : function() {
		var pathName = "";
		categorySelect.$area.find("select.ctgNos").each(function(i) {
			if(!$(this).val() || $.trim($(this).val()).length == 0){ return false; }
			if(i > 0){ pathName += " > "; }
			pathName += $.trim($(this).find("option:selected").text());
		});
		return pathName;
	},
	
	/**
	 * 선택한 최종의 카테고리 번호 반환.
	 * @returns {Number} 현재 선택한 카테고리 번호
	 */
	getCategoryNo : function() {
		return categorySelect.ctgNo;
	} 
};