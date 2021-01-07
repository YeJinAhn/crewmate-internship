/*******************************************************************************
 ******************************************************************************/

var tableListSettingSample = {
	// 기본설정
	listSize : 10,							// 목록 개수 지정
	page : 1, 								// 현재 페이지
	listSizes : [10, 20, 30, 40, 50], 		// 목록 개수 항목들...
	pageSize : 10, 							// 페이지 번호 개수

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
	header : {
		header1 : {
			title : "헤더1"
		}, 
		header2 : {
			title : "헤더2", 
			css : {},					// 특정 헤더의 스타일을 별도로 지정하는 경우
			render : function(idx, data){	// 별도의 랜더링을 하고 싶은 경우에 함수로 처리함.
				return "[" + data.header2 + "]";
			}
		}, 
		header3 : {}, 
		header4 : "제목4"				// 헤더 타이틀만 지정하는 경우
	}, 
	data : [
		{ header1 : "내용1", header2 : "내용2", header3 : "내용3" }, 
		{ header1 : "내용2", header2 : "내용2", header3 : "내용3", header4 : "내용4" }, 
		{ header1 : "내용3", header2 : "내용2", header3 : "내용3" },
		{ header1 : "내용4", header2 : "내용2", header3 : "내용3" },
		{ header1 : "내용5", header2 : "내용2", header3 : "내용3" },
		{ header1 : "내용6", header2 : "내용2", header3 : "내용3" },
		{ header1 : "내용7", header2 : "내용2", header3 : "내용3" },
		{ header1 : "내용8", header2 : "내용2", header3 : "내용3" },
		{ header1 : "내용9", header2 : "내용2", header3 : "내용3" }
	], 
	
	// 내부에서 사용하는 변수들...
	listData : [],		// 실제 목록용 데이터
	totalPage : 0,		// 전체 페이지 번호
	keyword : ""		// 검색어
};