/******************************************************************************
	작성자 : 김세형

	작성일 : 2016.06.30
	기능   : 더보기 버튼
	설명   : option 필수값으로 ajax 요청할 url, 더보기버튼 jQuery Selector, 데이터가 추가될 영역 jQuery Selector를
			 추가하고 init(options) 함수로 초기화시키면
			 ajax 요청한 서버쪽에서 3가지 데이터 (max, result, resultHtml)를 넘겨주면 된다.
			 
******************************************************************************/

var moreContents = (function(window, $, undefined) {
	
	var location = window.location;
	
	var pageHash = 1;
	
	var listSize = 8;
	
	var callback;
	
	/** 필수값 **/
	var ajaxUrl;		// ajax 요청 URL
	
	var moreBtn;		// 더보기 버튼
	
	var appendArea;		// 데이터가 추가될 영역
	
	function setOptions(options) {
		if(options.listSize) { listSize = options.listSize; }
		ajaxUrl = options.ajaxUrl;
		moreBtn = options.moreBtn;
		appendArea = options.appendArea;
		if(options.callback) { callback = options.callback; }
	}
	
	function seeMore() {
		$(moreBtn).off();
		$.ajax({
			async		: true,
			url			: ajaxUrl,
			dataType	: "json",
			type		: "GET",
			data		: 	{ 
								"page" 		: pageHash + 1,
								"listSize" 	: listSize
							},
			success		: function(data, textStatus, jqXHR) {
				var dLen = data.result.list.length;
				if(dLen != 0) { pageHash++; }
				if(data.max === true) { $(moreBtn).hide(); }
				$(appendArea).append(data.resultHtml);
				if(callback) { callback(); }
				$(moreBtn).on("click", seeMore);
				location.hash = "#" + pageHash;
			},
			error		: function() {}
		});
	}
	
	return {
		init : function(options) {
			setOptions(options);
			var hash = parseInt(location.hash.replace("#", ""));
			if(isNaN(hash) || hash < 1) { hash = 1; }
			$.ajax({
				async		: true,
				url			: ajaxUrl,
				dataType	: "json",
				type		: "GET",
				data		: 	{ "listSize" : hash * listSize },
				success		: function(data, textStatus, jqXHR) {
					var dLen = data.result.list.length;
					if(data.max === true) { $(moreBtn).hide(); }
					$(appendArea).html(data.resultHtml);
					if(callback) { callback(); }
					pageHash = hash;
				},
				error		: function() {}
			});
			$(moreBtn).on("click", seeMore);
		}
	};
	
}(window, jQuery));