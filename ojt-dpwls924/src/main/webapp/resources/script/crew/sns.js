/******************************************************************************
	작성자 : 김세형

	작성일 : 2016.05.30
	기능   : SNS 공유하기
******************************************************************************/

var SNS_Share = (function(window, $, undefined) {
	
	var comp = {
		
		/**
		 * appId : 페이스북 개발자 앱 ID
		 * isMobile : 모바일 앱 여부
		 */
		initFB : function(appId, isMobile, url, osType) {
    		if (!isMobile) { // sdk로딩시 앱일때 오류발생해서 분기처리 -> 앱일때는 sdk방식이아닌 location.href 방식이라 상관없음.
    			window.fbAsyncInit = function() {
    			    FB.init({
    			      appId      : appId,
    			      xfbml      : true,
    			      version    : 'v3.8'
    			    });
    			};
    			
    			(function(d, s, id){
    			    var js, fjs = d.getElementsByTagName(s)[0];
    			    if (d.getElementById(id)) {return;}
    			    js = d.createElement(s); js.id = id;
    			    js.src = "//connect.facebook.net/ko_KR/sdk.js";
    			    fjs.parentNode.insertBefore(js, fjs);
    			}(document, 'script', 'facebook-jssdk'));
    		}
    		
    		$(document).ready(function(event){
				$(".btn-facebook").on("click", function(){
					shareFB(isMobile, url, osType);
				});
			});
		},
		shareFB : shareFB
	}
	
	/**
	 * isMobile -> null(모바일아님), "IOS", "ANDROID"
	 * @param isMobile
	 * @param url
	 */
	function shareFB(isMobile, url, osType) {
		// _AceTM.SNS('페이스북'); 에이스카운터플러스 서비스 종료 2019.07.31
		
		var goUrl = "http://www.facebook.com/sharer/sharer.php?u=" + encodeURI(url == null ? location.href : url);
		if(isMobile === true) {
			if (osType == "IOS") {
				window.parent.location.href = goUrl;
			} else if (osType == "ANDROID") {
				window.open(goUrl);
			}
			
		} else {
			// 2018.10.15 앱이 아닌 경우 공유주소를 goUrl -> url로 변경
			//window.open(goUrl);
			FB.ui({
				method: 'share',
				href: url,
			}, function(response){});
		}
	}
	
	return comp;
	
}(window, jQuery));

