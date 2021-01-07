var hist = {
	// 뒤로가기 관련 설정 정보들...
	config: {
		skipValue: []
	},
	// 현재 요청 경로 정보를 반환함.
	getUrl: function getUrl() {
		var url = [];
		url.push("//");
		url.push(location.host);
		url.push(location.pathname);
		return url.join("");
	},
	// 검색조건을 기반으로 쿼리스트링 구성
	getSearch: function(search) {
		var rv = [];
		for (var key in search) {
			var val = search[key] + "";
			
			if (val != "" && !hist.isSkipValue(val) && key != "scrollTop") {
				rv.push(key + "=" + val);
			}
		}// scrollTop 정보 처리
		
		rv.push("scrollTop=" + $(window).scrollTop());
		return rv.join("&");
	},
	// 스크롤 이동 처리
	moveScrollTopCnt: 0,
	moveScrollTop: function(top) {
		hist.moveScrollTopCnt++;
		$(window).scrollTop(top);
		// 화면상의 이슈로 절대 해당 위치로 이동하지 못하는 경우 재귀 종료 처리
		if (hist.moveScrollTopCnt > 50) {
			hist.moveScrollTopCnt = 0;
			return;
		}
		
		if ($(window).scrollTop() != top) {
			$(window).scrollTop($(window).scrollTop() - 1); // window scroll 이벤트가 초기에 잡히지 않는 현상이 발생해서 스크롤을 강제도 이동시킴.
			
			setTimeout("hist.moveScrollTop(" + top + ")", 80);
		}
	},
	// 쿼리스트링에서 스킵할 문자열인지를 판단함.
	isSkipValue: function(val) {
		for (var i = 0, d; d = hist.config.skipValue[i]; i++) {
			if (val == d) {
				return true;
			}
		}
	
		return false;
	},
	// 쿼리스트링을 기반으로 검색 오브젝트를 생성해서 반환함.
	getSearchObj: function() {
		var rv = {};
		var arr = location.search.substring(1).split("&");
		
		for (var i = 0, d; d = arr[i]; i++) {
			var a = d.split("=");
			rv[a[0]] = a[1];
		}
		
		return rv;
	},
	// 히스토리 생성
	createHistory: function(search) {
		var url = hist.getUrl() + "?" + hist.getSearch(search);
		history.pushState(search, url, url);
	},
	// 히스토리 교체 - scrollTop 정보를 설정하기 위함임.
	replaceHistory: function(search) {
		var search = search || hist.getSearchObj();
		var url = hist.getUrl() + "?" + hist.getSearch(search);
	      history.replaceState(null, url, url);
	},
	// 히스토리 라이브러리 초기화. onpopstate이벤트 핸들러 처리
	init: function(fn, opt) {
		// 옵션 설정
		if (opt) {
			hist.config = $.extend(true, hist.config, opt);
		} // 이벤트 핸들 설정
		/*
		if (typeof fn == "function") {
			window.onpopstate = function (event) {
				var search = event.state;
				console.log(event.state);
				
				if (search == null) {
					search = hist.getSearchObj();
				}
	
				fn(search);
			};
		}
		*/
	},
	// 파라미터에서 scrollTop값이 존재하면 해당 위치로 화면을 이동 시킴. -> $(document).ready에서 이벤트 적용해야 함.
	initScrollTop: function() {
		var search = hist.getSearchObj();
		if (search.scrollTop) {
			hist.moveScrollTop(search.scrollTop);
		}
	},
	link: function(url) {
		hist.replaceHistory();
		location.href = url;
	}
};
$(document).ready(function (evt) {
	hist.initScrollTop();
});