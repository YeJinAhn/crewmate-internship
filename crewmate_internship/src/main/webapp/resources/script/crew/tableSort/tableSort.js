/******************************************************************************
	작성자	: 김기석
	작성일	: 2018.07.18
	기능	: 테이블 정렬기능 제공
		적용클래스
			tableSort	: 플러그인이 중복정용되는 상황을 방지하지 위한 내부 클래스
			sort		: 헤더 th에 정렬기능 적용을 판단하는 클래스
			number		: 헤더 th에 정렬기능 적용시 적용데이터의 데이터 유형이 숫자임을 지정
			string		: 헤더 th에 정렬기능 적용시 적용데이터의 데이터 유형이 문자임을 지정
		커스텀 데이터 
			data-target	: 데이터가 되는 td의 인덱스를 별도로 지정함.
			data-value	: 데이터가 되는 td의 값을 사용하지 않고 별도의 정렬값을 사용할 경우에 지정함.
	참고사항 :
		2018.07.25 : td안의 값을 그대로 사용하지 않고 별도정의 정렬기준을 처리하기 위해서 data-value 속성 추가
******************************************************************************/
$.crewTableSortLib = {
	tableSort : function(options){
		var obj = this;
		
		// 대상이 테이블이 아니면 그냥 리턴
		if(obj.prop("tagName").toUpperCase() != "TABLE"){ return; }
		
		// 이미 플러그인이 적용되었으면 리턴
		if(obj.hasClass("tableSort")){ return; }
		
		// 플러그인 적용 클래스 추가
		obj.addClass("tableSort");
		
		
		// 옵션정보 구성
		var defaults = {
			sortIconAsc		: "▲", 
			sortIconDesc	: "▼"
		};
		options = $.extend(true, defaults, options);
		
		obj.data("options", options);
		
		// 해더 th에 아이콘 추가, sort 클래스가 존재하는 항목이 소트 대상임.
		obj.find("thead").find("th.sort").append("<span class='sortIcon sortIconAsc' style='cursor:pointer;'>" + options.sortIconAsc + "</span>");
		obj.find("thead").find("th.sort").append("<span class='sortIcon sortIconDesc' style='cursor:pointer;'>" + options.sortIconDesc + "</span>");
		
		// 소트 아이콘 클릭 이벤트 추가
		obj.find(".sortIcon").on("click", function(evt){
			// 정렬옵션 확인
			var sortType = ($(this).hasClass("sortIconAsc") ? "asc" : false) || ($(this).hasClass("sortIconDesc") ? "desc" : false) || "asc";
			
			// 정렬순번 확인 - th의 index 또는 data-target으로 지정한 index
			var index	= -1;
			
			var thList	= $(this).closest("tr").find("th");
			var thCurr	= $(this).closest("th");
			
			
			// 타겟이 존재하는 경우에는 타겟값을 사용. 없으면 동일 순번을 타겟으로 지정
			if(typeof(thCurr.data("target")) != "undefined"){
				index = thCurr.data("target") * 1;
			}else{
				for(var i=0, o ; o = thList[i] ; i++){
					if(o == thCurr[0]){
						index = i;
						break;
					}
				}
			}
			
			// 정렬데이터 유형 정보 획득
			var dataType = thCurr.hasClass("number") ? "number" : (thCurr.hasClass("string") ? "string" : "string");
			
			// 대상 테이블 획득
			var table = $(this).closest("table")[0];
			
			// 소팅 처리 호출
			$.crewTableSortLib.sort(table, sortType, dataType, index);
		});
	}, 
	
	// 실제 테이블 소팅 처리
	sort : function(table, sortType, dataType, index){
		var nextLoop = true;
		
		// 전체 정렬이 진행되도록 루프 처리
		while(nextLoop){
			var table	= $(table);
			var trList	= table.find("tbody").find("tr");
			
			// 위치변화가 없으면 루프 종료
			nextLoop = false;

			// tr의 개수만큼 루프를 돌면서 값을 비교해 이전 위치로 이동 처리
			for(var i=1 ; i < trList.length ; i++){
				var trCurr	= trList[i-1];
				var trNext	= trList[i];
				
				// 값 획득 - 문자열 비교를 위해서 모두 대문자로 변환 - data-value로 td에 정렬을 위한 값을 지정했으면 해당값을 사용. 아니면 td의 텍스트를 그대로 사용
				var td1 = $(trCurr).find("td:eq(" + index + ")");
				var td2 = $(trNext).find("td:eq(" + index + ")");
				var val1 = typeof(td1.data("value")) != "undefined" ? $.trim(td1.data("value")).toUpperCase() : $.trim(td1.text()).toUpperCase();
				var val2 = typeof(td2.data("value")) != "undefined" ? $.trim(td2.data("value")).toUpperCase() : $.trim(td2.text()).toUpperCase();
				

				// dataType이 number이면 숫자로 변환 - 콤마제거
				if(dataType == "number"){
					val1 = $.crewTableSortLib.getNumber(val1);
					val2 = $.crewTableSortLib.getNumber(val2);
				}
				
				// 위치 조정 처리 - nextLoop를 true로 변경해서 다시 처음부터 위치조정 루틴을 타도록 함.
				if(sortType == "desc" && val1 < val2){
					$(trCurr).before(trNext);
					nextLoop = true;
				}else if(sortType == "asc" && val1 > val2){
					$(trCurr).before(trNext);
					nextLoop = true;
				}
			}
		}

	}, 
	
	// 문자열에서 숫자만 반환함.
	getNumber : function(val){
		var rv = [];
		
		for(var i=0 ; i < val.length ; i++){
			var v = val.substring(i, i+1);
			
			// 소수점 처리
			if(v == "."){ rv.push(v); }
			
			// 숫자처리
			if(!isNaN(v)){ rv.push(v); }
		}
		
		return rv.join("") * 1;
	}
};


(function($) {
	$.fn.tableSort	= $.crewTableSortLib.tableSort;
})(jQuery);