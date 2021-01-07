/******************************************************************************
	작성자 : 김기석
	작성일 : 2011.05.03
	기능 : 테이블로 구성하는 목록 인터페이스 처리
		- 현재 시험버전임. 
******************************************************************************/

$.crewTableList = {
	defaults:{
		// 기본설정
		listSize : 10,							// 목록 개수 지정
		page : 1, 								// 현재 페이지
		listSizes : [10, 20, 30, 40, 50], 		// 목록 개수 항목들...
		pageSize : 10, 							// 페이지 번호 개수
		service : "", 							// 데이터 요청을 할 URL 정보
		serviceParam : {}, 						// 데이터 요청시 함께 전송할 파라미터
		crewTableListCallBack : null, 			// 목록 구현후 콜백 함수
		showPage : true, 						// 페이지 번호 노출 여부
		showInfo : true, 						// 목록 정보 노출 여부
		showSearch : true, 						// 결과내 검색 노출 여부
		autoSort : {							// 자동 정렬 칼럼, 순서
			col : "" ,
			sort : ""
			
		},
		autoStart : true,

		// 각 영역별 스타일 정의
		css : {
			tablePage : {							// 페이징 테이블 영역 스타일
				"width" : "100%" 
			}, 
			
			tablePageTbodyTr : {
			}, 
			
			tablePageTbodyTd : {
				"text-align" : "center", 
				"padding-top" : "10px"
			}, 
	
	
			tableInfo : {							// 정보 테이블 영역 스타일
				"width" : "100%"
			}, 
			
			tableInfoTbodyTr : {
			}, 
	
			tableInfoTbodyTd1 : {
			}, 
	
			tableInfoTbodyTd2 : {
				"text-align" : "right"
			}, 
	
			tableList : {							// 목록 테이블 영역 스타일
				"width" : "100%", 
				"border" : "1px solid #7F7F7F", 
				"border-collapse" : "collapse"
			}, 
			tableListTheadTr : {					// 목록 테이블 헤더 TR 영역 스타일
				"background-color" : "#9C9C9C", 
				"text-align" : "center"
			}, 
			tableListTheadTd : {					// 목록 테이블 헤더 TD 영역 스타일
				"border" : "1px solid #7F7F7F", 
				"padding" : "6px", 
				"font-weight" : "bold", 
				"color" : "white", 
				"cursor" : "pointer"
			}, 
			tableListTbodyTr : {					// 목록 테이블 데이터 TR 영역 스타일
				"background-color" : "white"
			}, 
			tableListTbodyTd : {					// 목록 테이블 데이터 TD 영역 스타일
				"border" : "1px solid #7F7F7F", 
				"padding" : "6px"
			}
		}, 
	
		// 테이블 헤더 정보설정
		header : {}, 
		data : [], 
		
		// 내부에서 사용하는 변수들...
		listData : [],		// 실제 목록용 데이터
		totalPage : 0,		// 전체 페이지 번호
		keyword : ""		// 검색어
	},


	// 테이블 목록 시작 함수
	createCrewTableList: function(options){
		options = $.extend(true, {}, $.crewTableList.defaults, options);
		
		// 헤더를 타이틀만 지정한 경우 변환 처리
		for(var k in options.header){
			var h = options.header[k];
			if(typeof(h) == "string"){ options.header[k] = { title : h }; }
		}

		// 실제 목록을 구현할 데이터 셋 설정
		options.listData = options.data;
		this.data("options", options);

		if(options.service != "" && options.autoStart){
			$.crewTableList.serviceRequest(this);
		}else{
			$.crewTableList.checkHeader(this);
			$.crewTableList.createTable(this);
			$.crewTableList.createTableListHeader(this);
			$.crewTableList.createTableListData(this);			
		}
	}, 
	
	// 외부에서 목록 데이터를 신규로 요청하는 경우를 처리함.
	crewTableListRequest : function(serviceParam, service){
		var options = this.data("options");
		options.serviceParam = serviceParam;
		if(typeof(service) == "string"){ options.service = service; } 
		this.data("options", options);
		$.crewTableList.serviceRequest(this);
	}, 
	
	
	// 서비스 경로가 지정되어 있는 경우 서비스 요청을 함
	serviceRequest : function(target){
		var options = target.data("options");
		$.crewAjax({
			url : options.service,
			data : options.serviceParam, 
			target : target, 
			successCallBack : function(result, textStatus, XMLHttpRequest, options){
				if(result.resultCode == "1"){
					var target = options.target;
					var opt = target.data("options");
					
					opt.data = result.data;
					opt.listData = opt.data;
					target.data("options", opt);
					
					$.crewTableList.checkHeader(target);
					$.crewTableList.createTable(target);
					$.crewTableList.createTableListHeader(target);
					
					var sortChk = target.data("options").autoSort;
					
					if(sortChk.col != '' ){
						$(".header_" + sortChk.col).data("sort", sortChk.sort == "asc" ? "desc" : "asc");
						$.crewTableList.resortTableData(target, sortChk.col, sortChk.sort);
					} else {
						$.crewTableList.createTableListData(target);
					}
				}
			}
		});		
	}, 
	
	
	// 헤더 셋팅을 체크한다. - 헤더 셋팅이 없으면 디폴트로 처리함.
	checkHeader : function(target){
		var options = target.data("options");
		var isHeader = false;
		for(var k in options.header){
			if(k){ isHeader = true; break; }
		}
		
		if(!isHeader){
			var h = {};
			var d = options.listData[0];
			for(var k in d){ h[k] = k; }
			options.header = h;
			target.data("options", options);
		}
	}, 
	
	
	
	// 정렬순서를 변경한다.
	resortTableData : function(target, field, sort){
		var options = target.data("options");
		
		options.listData.sort(sort == "asc" ? sortAsc : sortDesc);
		target.data("options", options);
		$.crewTableList.createTableListData(target);

		// 내림차순 정렬 처리 - 한글 숫자 조합의 경우 아스키처리로 되면 문제가 됨. - 별도 구현
		function sortAsc(v1, v2){
			var a = v1[field] ? v1[field] : "";
			var b = v2[field] ? v2[field] : "";

			aS = a.toString(10).toUpperCase(); 
			bS = b.toString(10).toUpperCase(); 
			if(aS == bS) return 0; 

			while(aS|| bS){
				var pattern = /^((\-?\d*)[^\d]*)/;

				pattern.exec(aS);
				aT = RegExp.$1; 
				aN = RegExp.$2; 
			
				pattern.exec(bS);
				bT = RegExp.$1; 
				bN = RegExp.$2; 
				
				aS = aS.replace(pattern,""); 
				bS = bS.replace(pattern,""); 
				
				if(aN && bN && aN != bN){
					return Number(aN) > Number(bN) ? 1 : -1;
				}else if(aT != bT){
					var sort = new Array(aT,bT); 
					sort.sort();
					return (sort[0] == aT) ? -1 : 1; 
				}
			}
		}
		
		// 오름차순 정렬 처리 - 한글 숫자 조합의 경우 아스키처리로 되면 문제가 됨. - 별도 구현
		function sortDesc(v1, v2){
			var a = v1[field] ? v1[field] : "";
			var b = v2[field] ? v2[field] : "";

			aS = a.toString(10).toUpperCase(); 
			bS = b.toString(10).toUpperCase(); 
			if(aS == bS) return 0; 

			while(aS || bS){
				var pattern = /^((\-?\d*)[^\d]*)/;

				pattern.exec(aS);
				aT = RegExp.$1; 
				aN = RegExp.$2; 
			
				pattern.exec(bS);
				bT = RegExp.$1; 
				bN = RegExp.$2; 
				
				aS = aS.replace(pattern,""); 
				bS = bS.replace(pattern,""); 

				if(aN && bN && aN != bN){
					return Number(aN) > Number(bN) ? -1 : 1;
				}else if(aT != bT){
					var sort = new Array(aT,bT); 
					sort.sort();
					return (sort[0] == aT) ? 1 : -1; 
				} 
			}
		}
	}, 
	
	
	// 테이블 구성
	createTable : function(target){
		target.each(function(idx){
			var t = $(this);
			var options = t.data("options");
			var html = [];
			
			
			// 영역별 테이블 구성
			html.push("<table class='tableInfo'><thead></thead><tbody></tbody></table>");
			html.push("<table class='tableList'><thead></thead><tbody></tbody></table>");
			html.push("<table class='tablePage'><thead></thead><tbody></tbody></table>");
			t.html(html.join(""));
			
	
			// 스타일 지정
			t.find(".tableInfo").css(options.css.tableInfo);
			t.find(".tableList").css(options.css.tableList);
			t.find(".tablePage").css(options.css.tablePage);
		});
	}, 

	
	// 페이지 영역 정보를 구성한다.
	createTablePage : function(target){
		target.each(function(idx){
			var t = $(this);
			var html = [];
			var options = t.data("options");
			var totalRows = options.listData.length;
			var currPage = options.page;
			var pageSize = options.pageSize;
			var totalPage = Math.floor((totalRows - 1) / options.listSize) + 1;
			var startPage = Math.ceil(options.page/pageSize - 1) * pageSize + 1;
			
			// 인터페이스 구성
			t.find(".tablePage > tbody").html("");
			html.push("<tr class='tablePageTbodyTr'>");
			html.push("<td class='tablePageTbodyTd'>");

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
			
			html.push("</td>");
			html.push("</tr>");
			t.find(".tablePage > tbody").html(html.join(""));
			

			// 스타일 지정
			t.find(".tablePageTbodyTr").css(options.css.tablePageTbodyTr);
			t.find(".tablePageTbodyTd").css(options.css.tablePageTbodyTd);
			t.find(".tablePageTbodyTd > .pageLink").css("cursor", "pointer");
			

			// 페이지 번호 클릭 이벤트 핸들 처리
			t.find(".tablePageTbodyTd > .pageLink").data("target", t);
			t.find(".tablePageTbodyTd > .pageLink").click(function(event){
				var target = $(this).data("target");
				var options = target.data("options");
				options.page = $(this).attr("page");
				target.data("options", options);
				$.crewTableList.createTableListData(target);
			});
		});
	}, 
	
	
	// 목록 정보 영역을 구성한다.
	createTableInfo : function(target){
		target.each(function(idx){
			var t = $(this);
			var html = [];
			var options = t.data("options");
			var totalRows = options.listData.length;
			var totalPage = Math.floor((totalRows - 1) / options.listSize) + 1;

			t.find(".tableInfo > tbody").html("");
			html.push("<tr class='tableInfoTbodyTr'>");
			html.push("<td class='tableInfoTbodyTd1'>총 " + totalRows + "건, 페이지 : " + options.page + "/" + totalPage + "</td>");
			html.push("<td class='tableInfoTbodyTd2'>");
			
			if(options.showSearch){
				html.push("<input type='text' name='searchListData' />");
			}
			
			html.push("<select name='listSizeChange'>");
			for(var i=0 ; i < options.listSizes.length ; i++){
				html.push("<option value='" + options.listSizes[i] + "' " + (options.listSizes[i] == options.listSize ? "selected" : "") + ">" + options.listSizes[i] + "개씩 보기</option>");
			}
			html.push("</select>");
			
			html.push("</td>");
			html.push("</tr>");
			t.find(".tableInfo > tbody").html(html.join(""));
			
			
			// 스타일 지정
			t.find(".tableInfoTbodyTr").css(options.css.tableInfoTbodyTr);
			t.find(".tableInfoTbodyTd1").css(options.css.tableInfoTbodyTd1);
			t.find(".tableInfoTbodyTd2").css(options.css.tableInfoTbodyTd2);
			
			// 목록 개수 변경 이벤트 핸들 처리
			t.find(".tableInfoTbodyTd2 > select[name=listSizeChange]").data("target", t);
			t.find(".tableInfoTbodyTd2 > select[name=listSizeChange]").change(function(event){
				var target = $(this).data("target");
				var options = target.data("options");
				options.listSize = this.value;
				target.data("options", options);
				$.crewTableList.createTableListData(target);
			});
			
			// 검색어 입력 이벤트 핸들 처리
			t.find(".tableInfoTbodyTd2 > input[name=searchListData]").data("target", t);
			t.find(".tableInfoTbodyTd2 > input[name=searchListData]").keyup(function(event){
				var target = $(this).data("target");
				var options = target.data("options");
				options.keyword = this.value;
				target.data("options", options);
				$.crewTableList.createTableListData(target);
			});
		});
	}, 
	
	
	// 목록 테이블 헤더 영역을 구성한다.
	createTableListHeader : function(target){
		target.each(function(idx){
			var t = $(this);
			var options = t.data("options");
			var html = [];
			
			t.find(".tableList > thead").html("");
			html.push("<tr class='tableListTheadTr'>");
			for(var k in options.header){
				var h = options.header[k];
				html.push("<td class='tableListTheadTd header_" + k + "' style='width:" + h.width + "'>" + (h.title ? h.title : k) + "</td>");
			}
			html.push("</tr>");
			t.find(".tableList > thead").html(html.join(""));
	
			// 헤더 스타일 지정
			t.find(".tableListTheadTr").css(options.css.tableListTheadTr);
			t.find(".tableListTheadTd").css(options.css.tableListTheadTd);
	
			for(var k in options.header){
				if(options.header[k].css){
					t.find(".header_" + k).css(options.header[k].css);
				}
			}
			
			// 이벤트 핸들 구성 - 헤더클릭시 소팅 처리
			for(var k in options.header){
				if(!options.header[k].sort){ options.header[k].sort = "Y"; }
				if(options.header[k].sort == "Y"){
					t.find(".header_" + k).data("sort", "asc");
					t.find(".header_" + k).data("field", k);
					t.find(".header_" + k).data("target", t);
				}
			}
			t.find(".tableListTheadTd").click(function(event){
				var sort = $(this).data("sort");
				if(typeof(sort) == "string"){
					$(this).data("sort", sort == "asc" ? "desc" : "asc");
					$.crewTableList.resortTableData($(this).data("target"), $(this).data("field"), sort);
				}
			});
		});
	}, 
	
	
	
	// 목록 테이블에 데이터를 채워 넣는다.
	createTableListData : function(target){
		var options = target.data("options");
		var data = options.listData;
		var html = [];
		var startIdx = (options.page - 1) * options.listSize;
		var endIdx = options.page * options.listSize;

		// 목록 정보 적용
		if(options.showInfo){ $.crewTableList.createTableInfo(target); }
		
		
		// 검색어가 존재하는 경우
		if(options.keyword != ""){
			var newData = [];
			
			for(var i=0 ; i < data.length ; i++){
				var d = data[i];

				for(var k in options.header){
					var h = options.header[k];
					var text = typeof(h.render) == "function" ? h.render(i, d) : (d[k] ? d[k] : "");
					if(text.indexOf(options.keyword) >= 0){ newData.push(d); break; }
				}
			}
			data = newData;
		}

		// 목록 인터페이스 구성
		target.find(".tableList > tbody").html("");
		for(var i=startIdx ; i < data.length && i < endIdx ; i++){
			var d = data[i];

			html.push("<tr class='tableListTbodyTr'>");
			var cellIdx = 0;
			for(var k in options.header){
				var h = options.header[k];
				var text = typeof(h.render) == "function" ? h.render(i, d) : (d[k] ? d[k] : "");
				html.push("<td class='tableListTbodyTd body_" + k + " row_" + i + " cell_" + cellIdx + "'>" + text + "</td>");
				cellIdx++;
			}
			html.push("</tr>");
		}
		target.find(".tableList > tbody").html(html.join(""));

		target.find(".tableListTbodyTr").css(options.css.tableListTbodyTr);
		target.find(".tableListTbodyTd").css(options.css.tableListTbodyTd);
		
		// 페이징 적용
		if(options.showPage){ $.crewTableList.createTablePage(target); }
		
		// 콜백 실행
		if(typeof(options.crewTableListCallBack) == "function"){ options.crewTableListCallBack(target, options); }
	}, 
	
	
	// 데이터 반환 처리
	crewTableListGetData : function(){
		var target = this;
		var options = target.data("options");
		return options.data;
	}, 
	
	
	// 마지막에 데이터 추가처리 - 합계등의 정보를 노출하는 경우에 사용함.
	crewTableListAddData : function(data){
		//tableListTbodyTr
		var target = this;
		var options = target.data("options");
		var html = [];
		var rowIdx = target.find(".tableList > tbody > tr").size();
		var cellIdx = 0;
		
		html.push("<tr class='tableListTbodyTr'>");
		for(var k in options.header){
			var h = options.header[k];
			var text = typeof(h.render) == "function" ? h.render(rowIdx, data) : (data[k] ? data[k] : "");

			if(data.colspan){
				if(cellIdx == 0) html.push("<td class='tableListTbodyTd body_" + k + " row_" + rowIdx + " cell_" + cellIdx + "' colspan='"+data.colspan+"'>" + text + "</td>");
				if(cellIdx >= data.colspan) html.push("<td class='tableListTbodyTd body_" + k + " row_" + rowIdx + " cell_" + cellIdx + "' >" + text + "</td>");
			} else{
				html.push("<td class='tableListTbodyTd body_" + k + " row_" + rowIdx + " cell_" + cellIdx + "' >" + text + "</td>");
			}
			
			
			
			cellIdx++;
		}
		html.push("</tr>");
		target.find(".tableList > tbody").append(html.join(""));
		
		target.find(".tableListTbodyTr").css(options.css.tableListTbodyTr);
		target.find(".tableListTbodyTd").css(options.css.tableListTbodyTd);		
	}
};


(function($) {
	$.fn.crewTableList = $.crewTableList.createCrewTableList;
	$.fn.crewTableListAddData = $.crewTableList.crewTableListAddData;
	$.fn.crewTableListGetData = $.crewTableList.crewTableListGetData;
	$.fn.crewTableListRequest = $.crewTableList.crewTableListRequest;
})(jQuery);