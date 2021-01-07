/******************************************************************************
	작성자 : 김기석
	작성일 : 2011.05.16
	기능 : 목록 인터페이스 처리
		- 현재 시험버전임. - 그다지 효용성이 없음. => 중단. 브라우저의 히스토리는 어떻게 처리해야 하는지?
		- 템플릿은 html에서 처리하는 방식으로 구현 
******************************************************************************/

$.crewListLib = {
	defaults:{
		callBack : null, 						// 목록 생성후 처리 콜백
		listClass : "listArea", 
		pageClass : "pageArea", 
		param : {
			listSize : 10,						// 목록 개수 
			page : 1							// 현재페이지
		}, 
		service : "", 							// 데이터 요청 서비스 경로
		page : 1, 								// 현재 페이지 번호
		pageSize : 10, 							// 페이지 번호 개수
		templete : "", 							// 사용자 지정 템플릿 저장
		templeteStart : "$[", 					// 내부용 - 템플릿 변수 시작 문자열
		templeteEnd : "]", 						// 내부용 - 템플릿 변수 종료 문자열
		data : [],								// 내부용 - 목록 데이터
		totalCount : 0, 						// 내부용 - 전체 데이터 개수
		isInit : false							// 내부용 - 초기화 여부
	},

	// 초기화 - 시작포인트
	init : function(options){
		if($(this).data("crewListInit") != true){
			options = $.extend(true, {}, $.crewListLib.defaults, options);
			options.templete = $(this).find("." + options.listClass).html();
		}else{
			options = $.extend(true, {}, $(this).data("crewListOption"), options);
		}

		$(this).data("crewListInit", true);
		$(this).data("crewListOption", options);
		$.crewListLib.request(this);
	}, 

	
	// 해당 페이지로 이동하기
	goPage : function(page){
		var options = $(this).data("crewListOption");
		options.param.page = page;
		$(this).data("crewListOption", options);
		$.crewListLib.request(this);
	}, 
	
	
	// 서비스 요청
	request : function(target){
		var options = target.data("crewListOption");

		$.crewAjax({
			url : options.service, 
			data : options.param, 
			target : target, 
			successCallBack : function(result, textStatus, XMLHttpRequest, options){
				if(result.resultCode == "1"){
					var opt = options.target.data("crewListOption");
					opt.data = result.data.list;
					opt.totalCount = result.data.count;
					options.target.data("crewListOption", opt);
					$.crewListLib.listMake(options.target);
				}
			}
		});
	}, 
	
	
	// 실제 목록 만들기
	listMake : function(target){
		var options = target.data("crewListOption");
		var html = [];
		var templete = options.templete;
		var start = options.templeteStart;
		var end = options.templeteEnd;
		var data = options.data;

		for(var i=0 ; i < data.length ; i++){
			var d = data[i];

			for(var j=0 ; j < templete.length ; j++){
				if(templete.substring(j, j+start.length) == start){
					var k = templete.substring(j + start.length, templete.indexOf(end, j));
					if(typeof(d[k]) != "undefined"){
						html.push(d[k]);
					}else{
						html.push(start + k + end);
					}
					j = templete.indexOf(end, j);
				}else{
					html.push(templete.substring(j, j+1));
				}
			}
		}

		target.find("." + options.listClass).html(html.join(""));
		
		$.crewListLib.pageMake(target);
		
		if(typeof(options.callBack) == "function"){ options.callBack(target); }
	}, 
	
	
	// 페이지 목록 만들기
	pageMake : function(target){
		var html = [];
		var options = target.data("crewListOption");
		var totalRows = options.totalCount;
		var currPage = options.param.page;
		var pageSize = options.pageSize;
		var totalPage = Math.floor((totalRows - 1) / options.param.listSize) + 1;
		var startPage = Math.ceil(options.page/pageSize - 1) * pageSize + 1;

		// 인터페이스 구성
		target.find("." + options.pageClass).html("");

		if(startPage > 1){ html.push(" <span class='pageLink' page='1'><img src='/images/admin/arrow_first.gif' style='vertical-align:middle;' alt='첫 페이지' /></span> "); }
		if(startPage > 1){ html.push(" <span class='pageLink' page='" + (startPage - pageSize) + "'><img src='/images/admin/arrow_prev.gif' style='vertical-align:middle;' alt='이전 " + pageSize + "페이지 이동' /></span> "); }

		for(var i = startPage ; i < startPage + pageSize && i <= totalPage ; i++){
			html.push(" <span class='pageLink' page='" + i + "'>");
			html.push((i != currPage) ? i : "<span class='pagingOn'>" + i + "</span>");
			html.push("</span> ");

			if(i == totalPage){ break; }
			if(i < startPage + pageSize - 1){ html.push("<span>|</span>"); }				
		}

		if(startPage + pageSize - 1 < totalPage){ html.push(" <span class='pageLink' page='" + (startPage + pageSize) + "'><img src='/images/admin/arrow_next.gif' style='vertical-align:middle;' alt='다음 " + pageSize + "페이지 이동' /></span> "); }
		if(startPage + pageSize - 1 < totalPage){ html.push(" <span class='pageLink' page='" + totalPage + "' ><img src='/images/admin/arrow_last.gif' style='vertical-align:middle;' alt='마지막 페이지' /></span> "); }

		target.find("." + options.pageClass).html(html.join(""));
		
		// 클릭 링크 처리
		target.find("." + options.pageClass).find(".pageLink").data("crewListTarget", target).css("cursor", "pointer");
		target.find("." + options.pageClass).find(".pageLink").click(function(event){
			var target = $(this).data("crewListTarget");
			target.crewListGoPage($(this).attr("page"));
		});
	}


};


(function($) {
	$.fn.crewList = $.crewListLib.init;
	$.fn.crewListGoPage = $.crewListLib.goPage;
})(jQuery);