
	var filter = "win16|win32|win64|mac";
function  checkDevice(){
	if( navigator.platform  ){
	    if( filter.indexOf(navigator.platform.toLowerCase())< 0 ){
	        return true;
	    }else{
	        return false;
	    }
	}
}


//if( location.href.indexOf("http://www.nepa.co.kr") != -1 ) {
//	document.location.replace(location.href.toString().replace("http://www.nepa.co.kr", "http://nepa.co.kr"))
//}

//if( location.href.indexOf("http://nepa.co.kr") != -1 ) 	document.location.replace(location.href.toString().replace("http://nepa.co.kr", "http://www.nepa.co.kr"))


var SNS = function(title, url, summary, image) {
	//this._param.title	= title;
	//this._param.url		= url;
	//this._param.summary = summary;
	//this._param.image	= image;
	this.__init();
}
SNS.prototype = {

	// 설정
	_config : {
	}

	// 링크 정보
	, _param : {
		summary : ''
		, url	: 'http://nepa.co.kr'
		, surl	: ''
		, title : ''
		, image : ''
	}
	, __init : function() {
		// @todo URL, TITLE init
	}

	, setParam : function(key, value) {
		if (typeof this._param[key] != 'undefined') {
			this._param[key] = value;
		}
	}

	// 단축URL 만들기
	, makeShortURL : function() {
		// @todo dev
		this._param.surl = this._param.url;
	}

	// 아이콘 나열
	, spread : function(sites) {
	}

	, _setOption : function(opt) {
		if (typeof opt == 'object') {
			for (prop in opt) {
				this.setParam(prop, opt[prop]);
			}
		} else if (typeof opt == 'string') {
			this.setParam(title, opt);
		}
	}

	// SNS Sites..
	, snsSite : [ 'facebook', 'twitter', 'me2day', 'yozm', 'Mypeople', 'iMagnet' ]
	, postToFacebook : function(opt) { 
		this._setOption(opt);
		this._popup("http://www.facebook.com/sharer.php?s=100&u=" + escape(this._param.url) + "&p[url]=" + encodeURI(this._param.url) + "&p[images][0]=" + this._param.image + "&p[title]=" + this._param.title, 981, 580);
		//this._popup("http://www.facebook.com/sharer.php?s=100&u=", 981, 580);
	}
	, postToTwitter : function(opt) { 
		if (false == this._setOption(opt)) {
			return false;
		}
		if(checkDevice()){
			//this._blank("http://mobile.twitter.com/home?status=" + this._param.title + " " + encodeURI(this._param.url)); 
			this._blank("https://twitter.com/intent/tweet?text=" + this._param.title +"&url="+ encodeURI(this._param.url)); 			
			}else{
			this._blank("http://twitter.com/home/?status=" + this._param.title + " " + encodeURI(this._param.url));
			}
		
		
	}
	, postToMe2day : function(opt) { 
		if (false == this._setOption(opt)) {
			return false;
		}
		this._blank("http://me2day.net/posts/new?new_post[body]=" + this._param.title + "++" + encodeURI(this._param.url));
	}
	, postToYozm : function(opt) { 
		if (false == this._setOption(opt)) {
			return false;
		}
		this._blank("https://yozm.daum.net/home?m=" + this._param.title + " " + encodeURI(this._param.url));
	}
	, postToMypeople : function(opt) { 
		if (false == this._setOption(opt)) {
			return false;
		}

		this._popup("https://mypeople.daum.net/mypeople/web/share.do?source_id=none&prefix=" + this._param.title + "&link=" + encodeURI(this._param.url), 700, 650);
	}
	/*, postToMagnet : function(opt) { 
		if (false == this._setOption(opt)) {
			return false;
		}

		var serverUrl = "http://www.imagnet.com/api/add";
		var media = "?u=" + encodeURIComponent(this._param.image);
		var httpUrl = "&r=" + encodeURIComponent(this._param.url);
		var des = "&t=" + encodeURIComponent(this._param.title);
		var board = "&b=" + encodeURIComponent("Wemakeprice FairArt"); // 보드가 없는 경우에만 생성됨.
		var url = serverUrl + media + httpUrl + board + des;

		var specs = " height=580, width=460, status=no, toolbar=no, menubar=no, location=no, resizable=no, scrollbars=no ";
		try {
			var obj = window.open(url, "IMAGNET_API_POPUP", specs);
			if (obj) { obj.focus(); }
		} catch (e) { }
		//this._popup(url, 580, 460);
	}
	 */
	// open popup
	, _popup : function(url, w, h) {
		//window.open(encodeURI(url), 'WMPSHARETOSNS','width='+ w +',height='+ h +', scrollbars=no, status=no, left='+ ((screen.width-w)/2) +', top='+ ((screen.height-h)/2));
		window.open(encodeURI(url), 'NEPA','width='+ w +',height='+ h +', scrollbars=no, status=no, left=0, top=0');
	}
	// open blank
	, _blank : function(url) {
		window.open(encodeURI(url), '_blank');
	}

}
