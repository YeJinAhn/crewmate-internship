var isAction = false;
$(function() {

	$(".dev-number").keyup(function(){ $(this).val($(this).val().replace(/[^0-9]/gi,"") );  }); //숫자만
	$(".dev-datetime").keyup(function(){ $(this).val($(this).val().replace(/[^0-9:\-]/gi,"") );  }); //숫자 및 하이픈(-)
	$(".dev-eng1").keyup(function(){ $(this).val($(this).val().replace(/[^a-zA-Z0-9!@#$%^&*]/gi,'') );  }); //숫자, 하이픈(-), 영문, 언더바(_),한글(X)
	$(".dev-eng2").keyup(function(){ $(this).val($(this).val().replace(/[^a-zA-Z0-9:\-_.]/gi,'') );  }); //숫자, 하이픈(-), 영문, 언더바(_),한글(X)
	$(".dev-koen").blur(function(){ $(this).val($(this).val().replace(/[^가-힣a-zA-Z0-9]/gi,'') );  }); //숫자, 영어, 한글
	//$(".dev-koen").bind("change keyup input", function(){ $(this).val($(this).val().replace(/[^가-힣a-zA-Z0-9]/gi,'') );  }); //숫자, 영어, 한글

	
	$("#cmdText").click(function(){
		if ($(this).val().length==0) {
			$(this).prev().css("display","none");
		}
	});
	$("#cmdText").blur(function(){
		if ($(this).val().length==0) {
			$(this).prev().css("display","block");
		}
	});
	
	// 비로그인에서 댓글 포커스시 로그인 팝업 
	$(".form-cmd").click(function(){
		if(isLogin != "true"){
			alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
			reloadAfTarger = "cmdText";
			$(".btn-dialog-login").trigger("click");
		}
	});
	
	// SNS 기능 삭제 ============
//	$(".wrap-primary footer ul.info-sns2").remove(); // 컨텐츠 하단
	//$(".primary-main .info-sns2 a").on("click", function(){alert("준비중입니다.");}); // 컨텐츠 상단
	$(".wrap-path .sns").html(""); // 페이지 하단
	// 플레이그라운드 상세화면에서는 개별 처리함.
	// SNS 기능 삭제 ============	
	
	
	
	/* 댓글 셀렉트 디자인 */
	$(".select-radio").selectRadio();
	
	// 컨텐츠 댓글 SNS공유하기 FaceBook
	$(".label-check #cmdSNSChk1").click(function(){
		if(this.checked && isLogin != "true"){
			alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.");
			reloadAfTarger = "cmdText";
			$(".btn-dialog-login").trigger("click");
			return false;
		}
	});
	
	// 컨텐츠 댓글 SNS공유하기 Twitter
	$(".label-check #cmdSNSChk2").click(function(){
		if(this.checked && isLogin != "true"){
			alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
			reloadAfTarger = "cmdText";
			$(".btn-dialog-login").trigger("click");
			return false;
		}
		if(this.checked){
			$(".form-cmd .label").html("140자 이내로 작성해 주세요");
		} else {
			$(".form-cmd .label").html("500자 이내로 작성해 주세요");
		}
		
	});
	
	// 댓글달기
	$(".board-cmd #cmdButton").click(function(){
		if(isLogin != "true"){
			alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
			reloadAfTarger = "cmdText";
			$(".btn-dialog-login").trigger("click");
			
			return false;
		}
		
		var maxLeng = 500;
		if($("input:checkbox[id=cmdSNSChk2]").is(":checked")){
			maxLeng = 140;
		}
		
		//등록필수여부, 수정필수여부, 유효성검사(N:숫자, T:전화, M:핸드폰, E:이메일, K:한글1글자),id, 명, 최소길이, 최대길이
		var arrVal = [];
		arrVal = [["Y", "", "K", "cmdText", "댓글내용", 1, maxLeng]];
		if(!cfn_Validation("I", arrVal)) return;
		
		var param = "contents_type="+contentsType+"&contents_seq="+contentsSeq
					+"&comment="+encodeURIComponent($("#cmdText").val())+"&comments_type="+$("input:radio[name='cmdType']:checked").val();
		jQuery.ajax({
			type:"post",
			url: "/CommentReg-ajax",		//URL
			data: param,		//파라미터
			dataType: "json",	//서버 기동 후 자료 형태
			error:function(xhr, sataus, e){
				//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
				alert("댓글달기에 실패하였습니다.");
			},
			success:function(responseData){
				var jsonObject = responseData;
				var map = jQuery.parseJSON(jsonObject.map);
				if(map.resultCode == "00"){
					$("#cmdText").val("");
					cfn_commentsMoreList();
				} else if(map.resultCode == "98"){
					alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
					$(".btn-dialog-login").trigger("click");
				} else {
					alert("댓글달기에 실패하였습니다.");
				}
			}
		});
	});
	
	
	/**********************************************************
	 *   event   comment  작성
	 *********************************************************/ 
	
	
	$(".board-cmd #eventCmdButton").click(function(){		
		if(isLogin != "true"){
			alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
			reloadAfTarger = "cmdText";
			$(".btn-dialog-login").trigger("click");
			
			return false;
		}
		if($("#event_seq").val()=='84' || $("#event_seq").val()=='85'){
			if($("#select_type").val()==""){				
				alert("전지현의 다운 추천을 선택 해주세요");				
				return false;
			}		
		}
			
		if($("#event_seq").val()=='48'){
			if($("input:radio[name='cmdType']:checked").val() == null || $("input:radio[name='cmdType']:checked").val() == ''){
				alert("색상을 선택 하세요");				
				return false;
			}
		}
		
		var maxLeng = 500;
		if($("input:checkbox[id=cmdSNSChk2]").is(":checked")){
			maxLeng = 140;
		}
		
		//등록필수여부, 수정필수여부, 유효성검사(N:숫자, T:전화, M:핸드폰, E:이메일, K:한글1글자),id, 명, 최소길이, 최대길이
		var arrVal = [];
		arrVal = [["Y", "", "K", "cmdText", "댓글내용", 1, maxLeng]];
		if(!cfn_Validation("I", arrVal)) return;

		var param = "contents_type="+1+"&event_seq="+$("#event_seq").val()+"&comment="+encodeURIComponent($("#cmdText").val())+"&comments_type="+$("input:radio[name='cmdType']:checked").val()+"&contents_seq="+1000000+"&event_type=0";

		jQuery.ajax({
			type:"post",
			url: "/CommentReg-ajax",		//URL
			data: param,		//파라미터
			dataType: "json",	//서버 기동 후 자료 형태
			error:function(xhr, sataus, e){
				//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
				alert("댓글달기에 실패하였습니다.");
			},
			success:function(responseData){
				deleteOrInser=true;
				var jsonObject = responseData;
				var map = jQuery.parseJSON(jsonObject.map);
				if(map.resultCode == "00"){
					$("#cmdText").val("");
					commentPageNo=0;
					cfn_commentsMoreList2();
					
					
					
				} else if(map.resultCode == "98"){
					alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
					
					$(".btn-dialog-login").trigger("click");
				} else if(map.resultCode == "88"){
					alert("댓글 등록횟수(20회)를 초과 하였습니다.");					
				} else {
					alert("댓글달기에 실패하였습니다.");
				}
			}
		});
	});
	
	
	/**********************************************************
	 *   스파이더 20150904 이벤트 1 작성
	 *********************************************************/ 
	
	
	$(".board-cmd #eventCmdButton1").click(function(){		
		if(isLogin != "true"){
			alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
			reloadAfTarger = "cmdText1";
			$(".btn-dialog-login").trigger("click");
			
			return false;
		}
		
		var maxLeng = 500;	
		
		//등록필수여부, 수정필수여부, 유효성검사(N:숫자, T:전화, M:핸드폰, E:이메일, K:한글1글자),id, 명, 최소길이, 최대길이
		var arrVal = [];
		arrVal = [["Y", "", "K", "cmdText1", "댓글내용", 1, maxLeng]];
		if(!cfn_Validation("I", arrVal)) return;
		var param = "contents_type="+1+"&event_seq="+$("#event_seq").val()+"&comment="+encodeURIComponent($("#cmdText1").val())+"&comments_type="+$("input:radio[name='cmd1Type']:checked").val()+"&contents_seq="+1000000+"&event_type=1";

		jQuery.ajax({
			type:"post",
			url: "/CommentReg-ajax",		//URL
			data: param,		//파라미터
			dataType: "json",	//서버 기동 후 자료 형태
			error:function(xhr, sataus, e){
				//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
				alert("댓글달기에 실패하였습니다.");
			},
			success:function(responseData){
				deleteOrInser=true;
				var jsonObject = responseData;
				var map = jQuery.parseJSON(jsonObject.map);
				if(map.resultCode == "00"){
					$("#cmdText1").val("");
					commentPageNo=0;
					cfn_commentsMoreList3();				
				} else if(map.resultCode == "98"){
					alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
					
					$(".btn-dialog-login").trigger("click");
				} else {
					alert("댓글달기에 실패하였습니다.");
				}
			}
		});
	});
	/**********************************************************
	 *   스파이더 20150904 이벤트 2 작성
	 *********************************************************/ 
	$(".board-cmd #eventCmdButton2").click(function(){		
		if(isLogin != "true"){
			alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
			reloadAfTarger = "cmdText2";
			$(".btn-dialog-login").trigger("click");
			
			return false;
		}
				
		var maxLeng = 500;
		
		//등록필수여부, 수정필수여부, 유효성검사(N:숫자, T:전화, M:핸드폰, E:이메일, K:한글1글자),id, 명, 최소길이, 최대길이
		var arrVal = [];
		arrVal = [["Y", "", "K", "cmdText2", "댓글내용", 1, maxLeng]];
		if(!cfn_Validation("I", arrVal)) return;

		var param = "contents_type="+1+"&event_seq="+$("#event_seq").val()+"&comment="+encodeURIComponent($("#cmdText2").val())+"&comments_type="+$("input:radio[name='cmd2Type']:checked").val()+"&contents_seq="+1000000+"&event_type=2";

		jQuery.ajax({
			type:"post",
			url: "/CommentReg-ajax",		//URL
			data: param,		//파라미터
			dataType: "json",	//서버 기동 후 자료 형태
			error:function(xhr, sataus, e){
				//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
				alert("댓글달기에 실패하였습니다.");
			},
			success:function(responseData){
				deleteOrInser=true;
				var jsonObject = responseData;
				var map = jQuery.parseJSON(jsonObject.map);
				if(map.resultCode == "00"){
					$("#cmdText2").val("");
					commentPageNo=0;
					cfn_commentsMoreList4();					
				} else if(map.resultCode == "98"){
					alert("로그인 후 이용해 주세요. \n주제와 무관한 의견, 악플은 삭제될 수 있습니다.\n");
					
					$(".btn-dialog-login").trigger("click");
				} else {
					alert("댓글달기에 실패하였습니다.");
				}
			}
		});
	});
	
	
});

/**********************************************************
 * 페이지 재로딩
 *********************************************************/ 
var reloadAfTarger = "";
function cfn_reload() {
	if(param == "member"){
		location.href = contextPath;
	} else {
		var queryString = param.replace("{", "").replace("}", "").replace(/,/g, "&").replace(/ /g, "");
		if(reloadAfTarger != ""){
			queryString += "&reloadAfTarger="+reloadAfTarger;
		}
		
		var json = serializedFormToJSON(queryString);
		var $form = $("<form/>").attr({method:"get",action:window.location});
		for(var key in json) {
			$("<input/>").attr({type:"hidden",name:key}).val(decodeURI(json[key])).appendTo($form); 
		}
		$("body").append($form);
		$form.get(0).submit();
	}
}
/**********************************************************
 * 쿼리스트링(get)을 json형태로 변경
 *********************************************************/ 
function serializedFormToJSON(queryString){
	if(!queryString) {
		return {};
	}
	var json = {};
	$.each(queryString.split("&"), function() {
		var p = this.split("=");
	    if ((typeof p[0] != 'undefined') && (typeof p[1] != 'undefined')) {
	    	var key = p[0];
	    	var value = p[1];
	    	json[key] = value;
	    }
	});
	return json;
};
/***********************************************
 * 리스트 더보기
 ************************************************/
function cfn_moreList(){
	if(!isResult) {
		return;	
	}
	
	var param = $("#frm").serialize()/*+"&pageNo="+ (++cnt) +"&isAjax=true"*/;
	isResult = false;
	jQuery.ajax({
		type:"post",
		url: ajaxURL,		//URL
		data: param,		//파라미터
		dataType: "html",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			cnt --;
			isResult=true;
		},
		success:function(html){
			$("#list").append(html);
			isResult=true;
		}
	});
}

/***********************************************
 * 컨텐츠 리스트 더보기
 ************************************************/
function cfn_contentsMoreList(){
	if(!isResult) {
		return;	
	}
	
	if(cnt == 0){
		$("#list").html("");
	}
	
	var param = $("#frm").serialize()+"&pageNo="+ (++cnt) +"&isAjax=true";
	isResult = false;
	jQuery.ajax({
		type:"post",
		url: ajaxURL,		//URL
		data: param,		//파라미터
		dataType: "html",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			cnt --;
			isResult=true;
		},
		success:function(html){
			if(param.indexOf("justFun=Y")>1){

				$("#list2").append(html);
			}else{
			$("#list").append(html);
			}
		
		isResult=true;
	}
});
}

/***********************************************
 * 컨텐츠 메뉴 이동
 ************************************************/
function cfn_goContentsMenu(cateCode, cateDepth, url){
	$("#menuCateCode").val(cateCode);
	$("#menuCateDepth").val(cateDepth);
	$("#frmMenu").attr("method", "POST")
			 	 .attr("target", "_self")
			 	 .attr("action", url)
			 	 .submit();
}

/***********************************************
 * 컨텐츠 상세 이동
 ************************************************/
function cfn_goContentsView(contentsSeq, cateCode){
	var detailView = "/Contents/View";
	if(cateCode == "0005"){
		detailView = "/LookBook/View";
	}
	location.href =  detailView + "?contentsSeq="+contentsSeq;
	
//	$("#frmMenu #contentsSeq").val(contentsSeq);
//	$("#frmMenu").attr("method", "POST")
//			 	 .attr("target", "_self")
//			 	 .attr("action", contextPath + detailView)
//

}

/***********************************************
 * 메뉴이동
 ************************************************/
function cfn_goMenu(menuPath,menuCode){
	if(menuPath == ""){
		alert("준비중입니다.");
		return;
	}
		
	if ((typeof menuCode != 'undefined')) {
		if (menuCode.length>=2) {
			if (menuCode.substr(0,2)=='00') {
				contextPath="http://www.nepa.co.kr";
			}
		}
	}
	$("#menuCode").val(menuCode);
	$("#frmMenu").attr("method", "POST")
			 	 .attr("target", "_self")
			 	 .attr("action", menuPath)
			 	 .submit();
}

/***********************************************
 * 온라인샵 새창열기
 ************************************************/
function cfn_goOnlineShop(){
	$("#frmMenu").attr("method", "POST")
			 	 .attr("target", "_blank")
			 	 .attr("action", "http://shop.nepa.co.kr")
			 	 .submit();
}

/***********************************************
 * 하단까지 스크롤시 목록 더보기
 ************************************************/
//	$(window).scroll(function(){
//		if(totPageCnt <= cnt || !isResult) {
//			return;	
//		}
//		var scrollHeight = $(window).scrollTop() + $(window).height() + 450;
//		var documentHeight = $(document).height() - $("#footer").height();
//		console.log(scrollHeight + " " + documentHeight);
//		if(scrollHeight > documentHeight){
//			console.log("go addList");
//			cfn_moreList();
//		}
//	})

/***********************************************
 * 로그인 레이어
 ************************************************/
var loginData = "";
loginData += '<form id="loginFrm" name="loginFrm" method="post">';
loginData += '<div class="layer-type1 layer-type1-w2">';
loginData += '<div class="layer-header">';
loginData += '	<h1>로그인</h1>';
loginData += '	<button class="btn-close">로그인 닫기<span></span></button>';
loginData += '</div>';
loginData += '<div class="layer-content">';
loginData += '	<div class="view form-login">';
loginData += '		<!-- 로그인폼 -->';
loginData += '		<div class="form-type1">';
loginData += '			<fieldset>';
loginData += '				<div class="wrap">';
loginData += '					<div class="form">';
loginData += '						<label for="loginID" class="label form-txt">이메일 아이디를 입력해 주세요.</label>';
loginData += '						<input type="text" class="text w100 placeholder" id="loginID" name="login_id" maxlength="50">';
loginData += '					</div>';
loginData += '				</div>';
loginData += '				<div class="wrap">';
loginData += '					<div class="form">';
loginData += '						<label for="loginPWD" class="label form-txt">비밀번호</label>';
loginData += '						<input type="password" class="text w100 placeholder" id="loginPWD" name="login_pwd" maxlength="20">';
loginData += '					</div>';
loginData += '				</div>';
loginData += '			</fieldset>';
loginData += '		</div>';
loginData += '		<div class="btn-center">';
loginData += '			<span class="btn-type1"><a href="javascript:cfn_login();">로그인</a></span>';
loginData += '		</div>';
loginData += '		<ul class="link-list">';
loginData += '			<li><span class="btn-type4 c1"><a href="'+contextPath+'/Member/IdInquiry">아이디 찾기</a></span></li>';
loginData += '			<li><span class="btn-type4 c1"><a href="'+contextPath+'/Member/PwdInquiry">비밀번호 찾기</a></span></li>';
loginData += '			<li><span class="btn-type4 c1"><a href="'+contextPath+'/Member/JoiningGuide">회원가입</a></span></li>';
loginData += '		</ul>';
loginData += '				<p class="mes-note2">';
loginData += '				<strong>회원가입 후 로그인 실패라고 나오는 경우</strong>';
loginData += '				<span>회원가입 후 정상적인 로그인이 불가능한 경우가 간혹 발생하고 있습니다. 비밀번호 찾기를 통해서 다시 한번 입력해주시면 정상적인 이용이 가능합니다.</span>';
loginData += '			</p>';
loginData += '	</div>';
loginData += '</div>';
loginData += '</form>';
$(".btn-dialog-login").modalCon({
	data : loginData, 
	callbackLoad : function(){
							$('.layer-content input').keypress(function(e) {
							    if (e.keyCode == 13) {
							    	cfn_login();
							    	return false;
							    }        
							});
					}
});

/***********************************************
 * 로그인  url: contextPath + "/LoginProc",		//URL
 ************************************************/
function cfn_login(){
	var loginIdVal = $("#loginID").val();
	var loginPwdVal = $("#loginPWD").val();
	
	//등록필수여부, 수정필수여부, 유효성검사(N:숫자, T:전화, M:핸드폰, E:이메일),id, 명, 최소길이, 최대길이
	var arrVal = [
	              ["Y", "", "E", "loginID", "아이디", 1, 50]
	              ,["Y", "", "K", "loginPWD", "비밀번호", 4, 20]
	              ];
	if(!cfn_Validation("I", arrVal)) return;
	document.loginFrm.action = contextSSLPath+"/LoginProc";
	document.loginFrm.submit();
	return;
	/*
	var param = "login_id="+loginIdVal+"&login_pwd="+loginPwdVal;
	jQuery.ajax({
		type:"post",
		url: "${requestScope.pageSSLPath}/LoginProc",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				cfn_reload();
			} else {
				alert("로그인 실패하였습니다.");
			}
		}
	});
	*/
}

/***********************************************
 * 로그아웃 contextPath + "/LogoutProc"
 ************************************************/
function cfn_logout(){
	var param = $("#frmMenu").serialize();
	jQuery.ajax({
		type:"get",
		url: "/LogoutProc",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				//alert("로그아웃 되었습니다.");
				cfn_reload();
			} else {
				alert("로그아웃 실패하였습니다.");
			}
		}
	});
}

/***********************************************
 * 댓글 작성도움말
 ************************************************/
var replyData = "";
replyData += '<div class="layer-type1 layer-type1-w1">';
replyData += '<div class="layer-header">';
replyData += '	<h1>작성 도움말</h1>';
replyData += '	<button class="btn-close">작성 도움말 닫기<span></span></button>';
replyData += '</div>';
replyData += '<div class="layer-content">';
replyData += '	<div class="view list-con2">';
replyData += '		<div>';
replyData += '			<h2 class="tit">댓글 참여 방법</h2>';
replyData += '			<p>';
replyData += '				<strong>NEPA 통합회원으로 로그인 후 작성할 수 있으며 주제와 무관한 의견, 악플은 삭제될 수 있습니다.</strong>';
replyData += '			</p>';
replyData += '		</div>';
replyData += '		<div>';
replyData += '			<h2 class="tit">아래와 같은 경우, 사전 통보 없이 댓글이 삭제될 수 있습니다.</h2>';
replyData += '			<ul>';
replyData += '				<li>';
replyData += '					<strong>1. 개인정보 유포</strong>';
replyData += '					타인의 신상 혹은 개인정보를 직접 게시 혹은 해당 정보가 담겨있는 웹페이지 링크를 게시하는 경우';
replyData += '				</li>';
replyData += '				<li><strong>2. 타인의 권리 침해</strong>확인되지 않은 사실의 유포로 타인의 권리 침해 및 명예훼손 등이 발생할 수 있는 경우</li>';
replyData += '				<li><strong>3. 범죄 행위와 관련</strong>범죄와 관련이 있거나 범죄를 유도하는 행위 및 관련 내용을 게시하는 경우</li>';
replyData += '				<li><strong>4. 욕설,비속어 사용 혹은 특정인 등 비하, 미풍양속 저해</strong>욕설, 비속어, 선정성이나 음란성이 있는 단어의 사용이나 특정인/계층/민족/종교 등을 비하하는 경우</li>';
replyData += '				<li><strong>5. 기사 혹은 컨텐츠와 관련이 없는 글</strong>기사나 컨텐츠, 게시글과 무관한 특정 의견, 주장, 정보를 게시하는 글</li>';
replyData += '				<li><strong>6. 상업성 홍보/광고글, 저작권 위반/침해글, 타인을 사칭하는 글</strong></li>';
replyData += '				<li><strong>7. 기타 관련 법률 및 약관에 위배되는 글</strong></li>';
replyData += '			</ul>';
replyData += '		</div>';
replyData += '	</div>';
replyData += '</div>';
replyData += '</div>';
$(".btn-help").modalCon({
	data : replyData
});

/***********************************************
 * 북마크
 ************************************************/
//function cfn_setBookmark(){
$(".primary-main .info-count .cnt2").click(function(){
	if(isLogin != "true"){
		$(".btn-dialog-login").trigger("click");
		return;
	} 
	var param = "contents_seq="+contentsSeq + "&contents_type=01"; //01:일반컨텐츠, 02:룩북, 03:플레이그라운드
	jQuery.ajax({
		type:"post",
		url:  "/Contents/BookmarkProc",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "01"){ // 북마크설정
				$(".info-count>li .cnt2").addClass("on");
				$(".info-count>li .cnt2>strong").html(map.bookmarkCnt);
			} else if(map.resultCode == "02"){ //북마크 해제
				$(".info-count>li .cnt2").removeClass("on");
				$(".info-count>li .cnt2>strong").html(map.bookmarkCnt);
			}
		}
	});
});
//}

/***********************************************
 * 비밀번호 확인
 ************************************************/
$("#pwdCheck").click(function(){
	if(!cfn_loginCheck()) return;
	
	var arrVal = [["Y", "", "K", "memPw", "비밀번호", 4, 20]];
	if(!cfn_Validation("I", arrVal)) return;
	document.pwdCheckFrm.action = contextSSLPath+"/MyDesk/PwdCheckProc";
	document.pwdCheckFrm.submit();
	return;
	/*
	var param = "login_pwd="+$("#memPw").val();
	jQuery.ajax({
		type:"post",
		url: contextPath+"/MyDesk/PwdCheckProc-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("비빌번호 확인을 실패하였습니다.");
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				cfn_goMenu('/MyDesk/MyInfo', '001');
			} else if(map.resultCode == "01"){
				alert("비밀번호가 일치하지 않습니다.");
			} else if(map.resultCode == "98"){
				cfn_loginRequest();
			} else {
				alert("비빌번호 확인을 실패하였습니다.");
			}
		}
	});
	*/
	$("#memPw").focus();
});
/***********************************************
 * 탈퇴 비밀번호 확인
 ************************************************/
$("#leavePwdCheck").click(function(){
	if(isAction) return;
	if(!cfn_loginCheck()) return;
	
	var arrVal = [["Y", "", "K", "memPw", "비밀번호", 4, 20]];
	if(!cfn_Validation("I", arrVal)) return;

	document.pwdCheckFrm.action = contextSSLPath+"/MyDesk/PwdCheckProc";
	document.pwdCheckFrm.submit();
	return;
/*	
	
	isAction = true;
	var param = "login_pwd="+$("#memPw").val();
	jQuery.ajax({
		type:"post",
		url: "/MyDesk/PwdCheckProc-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			isAction = false;
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("비빌번호 확인을 실패하였습니다.");
		},
		success:function(responseData){
			isAction = false;
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				cfn_goMenu('/MyDesk/LeaveNepa', "005");
			} else if(map.resultCode == "01"){
				alert("비밀번호가 일치하지 않습니다.");
			} else if(map.resultCode == "98"){
				cfn_loginRequest();
			} else {
				alert("비빌번호 확인을 실패하였습니다.");
			}
		}
	});
	*/
	$("#memPw").focus();
});

function cfn_regProc(){
	if(!fn_validationCheck("I")) return;
	//if(!confirm("등록하시겠습니까?")) return;
//	cfn_layerPopup("", 0, 0, "", true);
	$("#frm").attr("method", "POST")
			 	 .attr("target", "actionFrame")
			 	 .attr("action", procURL)
			 	 .submit();
}
function cfn_regProc2(){
	if(!fn_validationCheck("I")) return;
	//if(!confirm("등록하시겠습니까?")) return;
//	cfn_layerPopup("", 0, 0, "", true);
	$("#frm2").attr("method", "POST")
			 	 .attr("target", "actionFrame")
			 	 .attr("action", procURL)
			 	 .submit();
}
/*******************************************************************************
 * 등록/수정 시 유효성 검사
 ******************************************************************************/
function cfn_Validation(mode, arrVal){
	for(var i = 0; i < arrVal.length ; i++){
	 	var chkVal = arrVal[i];
	 	var chkObj = $("#"+chkVal[3]);
		var chkYn = chkVal[0];
	 	if(mode != "I") chkYn = chkVal[1];
	 		
		var objValue = chkObj.val();
		var objaa = chkObj.attr("tag");
		var objType = chkObj.attr("type");
		var msg = "입력";
		
		//console.log("Obj : "+chkVal[3]+", Type : "+objType+", Value : "+objValue + " "+objaa);
		if (objType == "text" || objType == "hidden") {
			objValue = trim(objValue);
		} else if (objType == "password") {
			objValue = trim(objValue);
			$("#"+chkVal[3]).bind("focus",function() { $("#"+chkVal[3]).select(); });
		} else if (objType == "textarea") {
			objValue = trim(objValue);
		} else if (objType == "checkbox") {
			objValue = $(':checkbox[name="' + chkVal[3] + '"]:checked').val();
			msg = "선택";
		} else if (objType == "select-one") {
			objValue = $('#' + chkVal[3] + ' > option:selected').val();
			msg = "선택";
		} else {
			objValue = trim(objValue);
			objType = "else";
		}
			
		//console.log("objValue >> "+objValue);
		
	 	// 필수 값 확인
		if (chkYn == "Y") {
			// alert("obj >> " +obj);
			if (objValue == "") {
				alert(chkVal[4] + "을(를) " + msg + "하세요.");
				chkObj.focus();
				return false;
			}
		}
		if(objType != "checkbox" && objType != "radio"){
			// 최소 길이 확인
			if(chkVal[2] != "N" && chkVal[5] != 0 && chkVal[5] != ""){
				if(objValue.length > 0 && objValue.length < chkVal[5]){
					alert(chkVal[4]+"은(는) " + chkVal[5] + "자 이상 입력하여야 합니다.");
					chkObj.focus();
					return false;
				}
			}
			if(chkVal[2] == "N" && chkVal[5] != 0 && chkVal[5] != ""){
				if(objValue.replace(/,/g,"") < chkVal[5]){
					alert(chkVal[4]+"은(는) " + chkVal[5] + " 이상의 값이 입력되어야 합니다.");
					chkObj.focus();
					return false;
				}
			}
			
			
			
			// 최대 길이 확인
			/*
			 * if(chkVal[5]!="" && objValue.length > chkVal[6]){
			 * alert(chkVal[4]+"이(가) " + chkVal[5] + "Byte를 초과하였습니다.");
			 * chkObj.focus(); return false; }
			 */
			if(chkVal[2] != "N" && chkVal[6] != 0 && chkVal[6] != ""){
				if(chkVal[2] == "K"){
					if(!MaxLimit(chkObj, chkVal[4], chkVal[6])) return false;
				} else {
					if(!MaxByteLimit(chkObj, chkVal[4], chkVal[6])) return false;
				}
			}
			if(chkVal[2] == "N" && chkVal[6] != 0 && chkVal[6] != ""){
				if(objValue.replace(/,/g,"") > chkVal[6]){
					alert(chkVal[4]+"은(는) " + chkVal[6] + " 미만의 값이 입력되어야 합니다.");
					chkObj.focus();
					return false;
				}
			}
		}

 	 	// 유효성 확인
 		if(chkVal[2] == "I" && objValue != "" && !CheckId(objValue) ){
 	 		alert(chkVal[4]+" 형식이 올바르지 않습니다.");
 	 		chkObj.focus();
			return false;
 	 	} else if(chkVal[2] == "P" && objValue != "" && !CheckPwd(objValue) ){
 	 		alert(chkVal[4]+" 형식이 올바르지 않습니다.");
			chkObj.focus();
			return false;
 	 	} else if((chkVal[2] == "N" || chkVal[2] == "NS") && objValue != "" && isNaN(objValue.replace(/,/g,""))){
 	 		alert(chkVal[4]+"은(는) 숫자만 입력 가능합니다.");
 	 		chkObj.focus();
 	 		return false;
 	 	} else if(chkVal[2] == "T" && objValue != "" && !CheckPhone(objValue.replace(/-/g,""))){
 	 		alert("전화 번호 형식이 잘못 되었습니다.");
			chkObj.focus();
			return false;
 	 	} else if(chkVal[2] == "M" && objValue != "" && !CheckHandphone(objValue.replace(/-/g,""))){
 	 		alert("핸드폰 번호 형식이 잘못 되었습니다.");
			chkObj.focus();
			return false;
 	 	} else if(chkVal[2] == "E" && objValue != "" && !CheckEmail(objValue)){
 	 		//alert("올바른 이메일 형식이 아닙니다. 이메일 아이디를 입력해주세요.");
 	 		var msg = "올바른 이메일 형식이 아닙니다. 이메일 아이디를 확인해 주세요.";
 	 		msg += "\n\n이전 회원 가입자이신가요?";
 	 		msg += "\n2014년 9월 3일 부터 네파 통합 회원 가입으로";
 	 		msg += "\n회원가입 서비스가 변경되어 운영됩니다.";
 	 		msg += "\n회원가입 여부 확인 후, 통합회원 전환 페이지로 이동합니다. ";
 	 		if(confirm(msg)){
 	 	 		location.href="/Member/MemberCheck";
 				return false; 	 			
 	 		}else{
 	 			chkObj.focus();
 				return false; 	 			
 	 		}
	 	}
	} // end for
	return true;
}
function trim(value) {
	//console.log(value);
	return value.replace(/^\s+|\s+$/g,"");
}
function byteCheck(text){
	var codeByte = 0;
	var i        = 0;
	var oneChar  = "";
	
	//console.log("byteCheck >> "+text);
	
	for(i = 0; i < text.length; i++){
		oneChar = escape(text.charAt(i));
		
		if(oneChar.length == 1){
			codeByte++;
		}
		else if(oneChar.indexOf("%u") != -1){
			codeByte = codeByte + 3; // utf-8은 한글을 3byte로 설정
		}
		else if(oneChar.indexOf("%") != -1){
			codeByte = codeByte + (oneChar.length / 3);
		}
	}
	
	return codeByte;
}
/**
 * 
 *onkeyup ="MaxByteLimit(this,'컬럼명', 제한바이트 크기)
 */
function MaxByteLimit(obj, description, limitByte) {
	var strByte =  byteCheck(obj.val());
	var str = obj.val();
    if (strByte > limitByte) {
        alert(description + "이(가) 너무 깁니다.\r" + limitByte + "Byte(한글 "
                + Math.floor(limitByte/3) + "자 또는 영문 " + limitByte  // utf-8은 한글을 3byte로 설정
                + "자)이내로 입력해 주세요.\r(현재 " + strByte
                + "Byte)");
        if(str.length >1){
        	obj.val(str.substring(0,str.length-1));
        }
       	obj.focus();
        return false;
    }
    return true;
} 

/**
 * 
 *onkeyup ="MaxByteLimit(this,'컬럼명', 제한바이트 크기)
 */
function MaxLimit(obj, description, limitByte) {
	var strByte =  obj.val().length;
	var str = obj.val();
    if (strByte > limitByte) {
        alert(description + "을(를) " + limitByte + "자 이내(공백포함)로 작성해 주세요");
        if(limitByte > 1){
        	obj.val(str.substring(0,limitByte));
        }
       	obj.focus();
        return false;
    }
    return true;
} 
/**
 * trim
 * 이메일 패턴 체크
 */
var PATTERN_Mail =/^[_a-zA-Z0-9-.]+@[._a-zA-Z0-9-]+\.[a-zA-Z]+$/;
function CheckEmail(str) {
	patten = eval(PATTERN_Mail); 
	if(!patten.test(str)){  
		return false; 
	} 
	return true;
}

/***********************************************
 * 플레이그라운드 사진올리기
 ************************************************/
var playgroundData1 = "";
playgroundData1 += '<form id="playgroundFrm" name="playgroundFrm" enctype="multipart/form-data">';
playgroundData1 += '<div class="layer-type1 layer-type1-w1">';
playgroundData1 += '<input type="hidden" id="contents_seq" name="contents_seq">';
playgroundData1 += '	<div class="layer-header">';
playgroundData1 += '		<h1>사진올리기</h1>';
playgroundData1 += '		<button class="btn-close">사진올리기 닫기<span></span></button>';
playgroundData1 += '	</div>';
playgroundData1 += '	<div class="layer-content">';
playgroundData1 += '		<div class="view">';
playgroundData1 += '			<div class="form-photo">';
playgroundData1 += '				<div class="img"><span id="updatePreview"><img/></span></div>';
playgroundData1 += '				<div class="form">';
playgroundData1 += '					<label for="img_path" class="btn-upphoto"><span>사진올리기</span></label>';
playgroundData1 += '					<span class="file_w"><input type="file" id="img_path" class="upload" name="img_path"></span>';
playgroundData1 += '					<ul class="txt-type4">';
playgroundData1 += '						<li>사진은 5MB 이하로 1장만 첨부 가능합니다.(jpg, png, gif)</li>';
playgroundData1 += '						<li>본 게시판의 주제에 적합하지 않거나 다른 사람의 권리 침해, 명예를 훼손하는 이미지는 동의 없는 삭제 및 법률에 의거하여 제재를 받으실 수 있습니다.</li>';
playgroundData1 += '					</ul>';
playgroundData1 += '				</div>';
playgroundData1 += '			</div>';
playgroundData1 += '			<div class="insert">';
playgroundData1 += '			</div>';
playgroundData1 += '			<div class="form-type1">';
playgroundData1 += '				<fieldset>';
playgroundData1 += '					<div class="wrap">';
playgroundData1 += '						<label class="label" for="photoTitle">제목<em class="txt-star">필수항목</em></label>';
playgroundData1 += '						<div class="form">';
//playgroundData1 += '							<label for="title" class="label form-txt">30자 이내로 작성해 주세요</label>';
playgroundData1 += '							<label for="title" class="label form-txt">[작성예] 지금, 나 ,아차산 정상!</label>';
playgroundData1 += '							<input type="text" class="text w100 placeholder" id="title" name="title" maxlength="30">';
playgroundData1 += '						</div>';
playgroundData1 += '					</div>';
playgroundData1 += '					<div class="wrap">';
playgroundData1 += '						<label class="label" for="formReason">내용</label>';
playgroundData1 += '						<div class="form">';
playgroundData1 += '							<label for="contents" class="label form-txt">140자 이내로 내용을 입력해 주세요.<br>상세한 내용이 더 많은 분들의 공감을 얻을 수 있습니다.</label>';
playgroundData1 += '							<textarea rows="4" cols="10" class="textarea w100 placeholder" id="contents" name="contents"></textarea>';
playgroundData1 += '						</div>';
playgroundData1 += '					</div>';
playgroundData1 += '					<div class="wrap">';
playgroundData1 += '						<label class="label" for="photoTag">태그<em class="txt-star">필수항목</em></label>';
playgroundData1 += '						<div class="form">';
//playgroundData1 += '							<label for="tag_arr" class="label form-txt">태그를 쉼표(,)로 구분하여 입력해주세요(최대30자)</label>';
playgroundData1 += '							<label for="tag_arr" class="label form-txt">[작성예]아차산,등산</label>';
playgroundData1 += '							<input type="text" class="text w100 placeholder" id="tag_arr" name="tag_arr" maxlengt="30">';
playgroundData1 += '						</div>';
playgroundData1 += '					</div>';
playgroundData1 += '				</fieldset>';
playgroundData1 += '			</div>';
playgroundData1 += '			<div class="btn-center">';
playgroundData1 += '				<span class="btn-type1 c1"><button type="reset" onclick="javascript:modalClose();">취소</button></span>';
playgroundData1 += '				<span class="btn-type1"><button type="button" id ="regBut" onclick="javascript:cfn_playgroundUpload();">등록</button></span>';
playgroundData1 += '				<span class="btn-type1"><button type="button" id ="delBut" onclick="javascript:cfn_playgroundDelete();">삭제</button></span>';
playgroundData1 += '			</div>';
playgroundData1 += '		</div>';
playgroundData1 += '	</div>';
playgroundData1 += '</div>';
playgroundData1 += '</form>';

var uploadRegPop = true;
$(function(){
	$("body").on("change",".upload",function(e){
		$(".insert").text($(this).val());
	});
});

// 사진 올리기
$(".btn-upphoto").modalCon({
	data : playgroundData1,
	callbackLoad : function (){
						if(uploadRegPop){
							$(".layer-type1 .img").remove();
							$("#delBut").remove();
							if(!cfn_loginCheck()) return;
						}
						uploadRegPop = true;
					}
});
/***********************************************
 * PLAYGROUND 사진수정팝업열기
 ************************************************/
function cfn_playgroundUpdate(contentsSeq, imgContext){
	if(!cfn_loginCheck()) return;
	var param = "contentsSeq="+contentsSeq;
	jQuery.ajax({
		type:"post",
		url: "/Playground/View-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "98"){ 
				$(".btn-dialog-login").trigger("click");
			} else if(map.resultCode == "00"){ //북마크 해제
				uploadRegPop = false;
				$(".btn-upphoto").trigger("click");
				$(".layer-type1 #contents_seq").val(map.result.contents_seq).trigger("focus");
				$(".layer-type1 #contents").val(map.result.contents).trigger("focus");
				$(".layer-type1 #tag_arr").val(map.result.tag_arr).trigger("focus");
				$(".layer-type1 img").attr("src", imgContext + map.result.img_path);
				$(".layer-type1 #title").val(map.result.title).trigger("focus"); // 포커스 유지
				$("#regBut").html("수정");
			} else {
				alert("수정페이지 호출에 실패하였습니다.");
			}
		}
	});
}
/***********************************************
 * PLAYGROUND 사진올리기 - 등록/수정
 ************************************************/
function cfn_playgroundUpload(){
	$("#tag_arr").val($('#tag_arr').val().trim().replace(/ /g, ""));
	
	//등록필수여부, 수정필수여부, 유효성검사(N:숫자, T:전화, M:핸드폰, E:이메일),id, 명, 최소길이, 최대길이
	var arrVal = [["Y", "N", "", "img_path", "사진", 1, 200]
					,["Y", "Y", "K", "title", "제목", 1, 30]	
					,["N", "N", "K", "contents", "내용", 0, 140]
					,["Y", "Y", "K", "tag_arr", "태그", 1, 50]
					];
	if($("#contents_seq").val()==""){
		if(!cfn_Validation("I", arrVal)) return;
	} else {
		if(!cfn_Validation("U", arrVal)) return;
	}
	
	$("#playgroundFrm").attr("method", "POST")
						.attr("target", "actionFrame")
						.attr("action", "/Playground/Proc")
						.submit();
}
/***********************************************
 * PLAYGROUND 사진올리기 - 삭제
 ************************************************/
function cfn_playgroundDelete(){
	if(!confirm("사진을 삭제하시겠습니까?")) return;
	
	var param = $("#playgroundFrm").serialize();
	jQuery.ajax({
		type:"post",
		url: "/Playground/Delete-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("사진 삭제 실패하였습니다.");
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			
			if(map.resultCode == "98"){ 
				cfn_loginRequest();
			} else if(map.resultCode == "00"){
				alert("사진 삭제하였습니다.");
				cfn_goMenu('/Playground/List', ''); // 목록으로 이동
			} else {
				alert("사진 삭제 실패하였습니다.");
			}
		}
	});
}
/***********************************************
 * PLAYGROUND 내 사진만 보기
 ************************************************/
$("#myList").click(function(event){
	$("#search_keyword").val($("#searchKeyword").val());
	if(this.checked && isLogin != "true"){
		$("#myList").attr("checked", "");
		cfn_loginRequest();
 		return false;
	}
	 
	if(this.checked ){
		$("#my_list").val("Y");
	} else {
		$("#my_list").val("N");
	}
	cnt = 0;
	cfn_contentsMoreList();
});
/***********************************************
 * PLAYGROUND 검색
 ************************************************/
$("#playground-button").click(function(event){
	if($("#search_keyword").val()==""){
		alert("검색어를 입력하여 주세요");
	}
	$("#search_keyword").val($("#searchKeyword").val());
	if(this.checked && isLogin != "true"){
		$("#myList").attr("checked", "");
		cfn_loginRequest();
 		return false;
	}
	 
	if(this.checked ){
		$("#my_list").val("Y");
	} else {
		$("#my_list").val("N");
	}
	cnt = 0;
	cfn_contentsMoreList();	
});
/***********************************************
 * PLAYGROUND 상세이동
 ************************************************/
function cfn_goPlaygroundView(contentsSeq){
	$("#contentsSeq").val(contentsSeq);
	$("#frmMenu").attr("method", "POST")
			 	 .attr("target", "_self")
			 	 .attr("action", "/Playground/View")
			 	 .submit();
}
/***********************************************
 * PLAYGROUND 공감
 ************************************************/
function cfn_playgroundSympathy(contentsSeq){
	if(isLogin != "true"){
		$(".btn-dialog-login").trigger("click");
		return;
	} 
	var param = "contents_seq="+contentsSeq;
	jQuery.ajax({
		type:"post",
		url: "/Playground/SympathyProc",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "01"){ // 북마크설정
				$(".info-count>li .cnt2").addClass("on");
			} else if(map.resultCode == "02"){ //북마크 해제
				$(".info-count>li .cnt2").removeClass("on");
			}
		}
	});
}
/***********************************************
 * PLAYGROUND 북마크
 ************************************************/
function cfn_playgroundBookmark(contentsSeq, obj){
	if(isLogin != "true"){
		$(".btn-dialog-login").trigger("click");
		return;
	} 
	var param = "contents_seq="+contentsSeq + "&contents_type=03"; //01:일반컨텐츠, 02:룩북, 03:플레이그라운드
	jQuery.ajax({
		type:"post",
		url: "/Contents/BookmarkProc",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "01"){ // 북마크설정
				$("#bookmark"+contentsSeq).addClass("on");
			} else if(map.resultCode == "02"){ //북마크 해제
				$("#bookmark"+contentsSeq).removeClass("on");
			}
		}
	});
}
/***********************************************
 * 댓글 리스트 더보기
 ************************************************/
function cfn_commentsMoreList(){
	var param = "contents_type="+contentsType+"&contents_seq="+contentsSeq;
	jQuery.ajax({
		type:"post",
		url: "/CommentList-ajax",		//URL
		data: param,		//파라미터
		dataType: "html",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(html){
			$("#commentslist").html(html);
		}
	});
}

/***********************************************
 * 이벤트 댓글 리스트 더보기
 ************************************************/
var deleteOrInser=false;
var commentPageNo=1;
function cfn_commentsMoreList2(){
	commentPageNo=commentPageNo+1;
	var param = "contents_type="+1000000+"&event_seq="+$("#event_seq").val()+"&isEvent=Y"+"&commentPageNo="+commentPageNo;
	jQuery.ajax({
		type:"post",
		url: "/CommentList-ajax",		//URL
		data: param,		//파라미터
		dataType: "html",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(html){
			if (deleteOrInser) {
				$("#commentslist").html(html);
				if ($(".nodata").size()==0) {
					if ($(".btn-more").size()==0) {
						$("#commentslist").append("<div class='btn-more'><a href='javascript:cfn_commentsMoreList2();'><strong></strong>5개 더보기<span></span></a></div>");
					}
				}
				deleteOrInser=false;
			}else{
				$("#commentslist").append(html);
			}
			
			
		}
	});
}
function cfn_commentsMoreList3(){
	commentPageNo=commentPageNo+1;
	var param = "contents_type="+1000000+"&event_seq="+$("#event_seq").val()+"&isEvent=1&commentPageNo="+commentPageNo;

	jQuery.ajax({
		type:"post",
		url: "/CommentList-ajax",		//URL
		data: param,		//파라미터
		dataType: "html",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(html){
			if (deleteOrInser) {
				$("#commentslist1").html(html);
				if ($(".nodata").size()==0) {
					if ($(".btn-more.btn-more1").size()==0) {
						$("#commentslist1").append("<div class='btn-more btn-more1'><a href='javascript:cfn_commentsMoreList3();'><strong></strong>5개 더보기<span></span></a></div>");
					}
				}
				deleteOrInser=false;
			}else{
				$("#commentslist1").append(html);
			}
			
			
		}
	});
}
function cfn_commentsMoreList4(){
	commentPageNo=commentPageNo+1;
	var param = "contents_type="+1000000+"&event_seq="+$("#event_seq").val()+"&isEvent=2&commentPageNo="+commentPageNo;

	jQuery.ajax({
		type:"post",
		url: "/CommentList-ajax",		//URL
		data: param,		//파라미터
		dataType: "html",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
		},
		success:function(html){
			if (deleteOrInser) {
				$("#commentslist2").html(html);
				if ($(".nodata").size()==0) {
					if ($(".btn-more.btn-more2").size()==0) {
						$("#commentslist2").append("<div class='btn-more btn-more2'><a href='javascript:cfn_commentsMoreList4();'><strong></strong>5개 더보기<span></span></a></div>");
					}
				}
				deleteOrInser=false;
			}else{
				$("#commentslist2").append(html);
			}
			
			
		}
	});
}
/***********************************************
 * 댓글 삭제하기
 ************************************************/
function cfn_deleteComment(commentsSeq){
	if(!confirm("댓글을 정말로 삭제하시겠습니까?")){
		return false;
	}
	if(isLogin != "true"){
		cfn_loginRequest();
 		return false;
	} 
	var param = "contents_seq="+contentsSeq + "&contents_type="+contentsType + "&comments_seq="+commentsSeq  ; //01:일반컨텐츠, 02:룩북, 03:플레이그라운드
	jQuery.ajax({
		type:"post",
		url: "/CommentDelete-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("댓글삭제에 실패하였습니다.");
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				$(".info-count>li .cnt3").removeClass("on");
				cfn_commentsMoreList();
			} else if(map.resultCode == "98"){
				cfn_loginRequest();
			} else {
				alert("댓글삭제에 실패하였습니다.");
			}
		}
	});
}

/***********************************************
 * 댓글 삭제하기 2
 ************************************************/
function cfn_deleteComment2(commentsSeq){
	if(!confirm("댓글을 정말로 삭제하시겠습니까?")){
		return false;
	}
	if(isLogin != "true"){
		cfn_loginRequest();
 		return false;
	} 
	var param = "comments_seq="+commentsSeq +"&isEvent=Y" ; //01:일반컨텐츠, 02:룩북, 03:플레이그라운드
	jQuery.ajax({
		type:"post",
		url: "/CommentDelete-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("댓글삭제에 실패하였습니다.");
		},
		success:function(responseData){
			deleteOrInser=true;
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				$(".info-count>li .cnt3").removeClass("on");
				commentPageNo=0;
				cfn_commentsMoreList2();
			} else if(map.resultCode == "98"){
				cfn_loginRequest();
			} else {
				alert("댓글삭제에 실패하였습니다.");
			}
		}
	});
}


/***********************************************
 * 스파이더 이벤트 1 뎃글 삭제 
 ************************************************/
function cfn_deleteComment3(commentsSeq){
	if(!confirm("댓글을 정말로 삭제하시겠습니까?")){
		return false;
	}
	if(isLogin != "true"){
		cfn_loginRequest();
 		return false;
	} 
	var param = "comments_seq="+commentsSeq +"&isEvent=1" ; //01:일반컨텐츠, 02:룩북, 03:플레이그라운드
	jQuery.ajax({
		type:"post",
		url: "/CommentDelete-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("댓글삭제에 실패하였습니다.");
		},
		success:function(responseData){
			deleteOrInser=true;
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				$(".info-count>li .cnt3").removeClass("on");
				commentPageNo=0;
				cfn_commentsMoreList3();
			} else if(map.resultCode == "98"){
				cfn_loginRequest();
			} else {
				alert("댓글삭제에 실패하였습니다.");
			}
		}
	});
}

/***********************************************
 * 스파이더 이벤트 2 뎃글 삭제 
 ************************************************/
function cfn_deleteComment4(commentsSeq){
	if(!confirm("댓글을 정말로 삭제하시겠습니까?")){
		return false;
	}
	if(isLogin != "true"){
		cfn_loginRequest();
 		return false;
	} 
	var param = "comments_seq="+commentsSeq +"&isEvent=2" ; //01:일반컨텐츠, 02:룩북, 03:플레이그라운드
	jQuery.ajax({
		type:"post",
		url: "/CommentDelete-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("댓글삭제에 실패하였습니다.");
		},
		success:function(responseData){
			deleteOrInser=true;
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				$(".info-count>li .cnt3").removeClass("on");
				commentPageNo=0;
				cfn_commentsMoreList4();
			} else if(map.resultCode == "98"){
				cfn_loginRequest();
			} else {
				alert("댓글삭제에 실패하였습니다.");
			}
		}
	});
}


/***********************************************
 * 좋아요/싫어요/공감
 ************************************************/
function cfn_support(contentsSeq, contentsType, commentsSeq, type){
	if(isLogin != "true"){
		cfn_loginRequest();
		return;
	} 
	var msgTitle = "";
	if(type == "01"){
		msgTitle = "댓글 추천 ";
	} else if(type == "02"){
		msgTitle = "댓글 비추천 ";
	} else if(type == "03"){
		msgTitle = "공감 ";
	}
	var param = "contents_seq="+contentsSeq + "&contents_type="+contentsType 
				+ "&comments_seq="+commentsSeq + "&support_type="+type;
	jQuery.ajax({
		type:"post",
		url: "/Support-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert(msgTitle +"실패하였습니다.");
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "00"){
				if(type == "03"){
					$("#heart" + contentsSeq).addClass("on");
				} else {
					cfn_commentsMoreList();
				}
				
			} else if(map.resultCode == "98"){
				cfn_loginRequest();
			} else {
				alert(msgTitle+"실패하였습니다.");
			}
		}
	});
}
/***********************************************
 * 신고하기
 ************************************************/
var reportData1 = "";
reportData1 += '<form id="reportFrm" name="reportFrm">';
reportData1 += '<div class="layer-type1 layer-type1-w1">';
reportData1 += '<input type="hidden" id="report_contents_seq" name="contents_seq">';
reportData1 += '<input type="hidden" id="report_contents_type" name="contents_type">';
reportData1 += '<input type="hidden" id="report_comments_seq" name="comments_seq">'; 
reportData1 += '	<div class="layer-header">';
reportData1 += '		<h1>신고하기</h1>';
reportData1 += '		<button class="btn-close">신고하기 닫기<span></span></button>';
reportData1 += '	</div>';
reportData1 += '	<div class="layer-content">';
reportData1 += '		<div class="view">';
reportData1 += '			<div class="form-type1">';
reportData1 += '				<fieldset>';
reportData1 += '					<div class="wrap">';
reportData1 += '						<label class="label" for="formReason">신고사유</label>';
reportData1 += '						<div class="form">';
reportData1 += '							<label for="formReason" class="label form-txt">신고 사유를 입력해 주세요<br/>신고 사유는 1,000자까지 작성할 수 있습니다.</label>';
reportData1 += '							<textarea rows="12" cols="10" class="textarea w100 placeholder" id="formReason" name="report_reson"></textarea>';
reportData1 += '						</div>';
reportData1 += '					</div>';
reportData1 += '				</fieldset>';
reportData1 += '			</div>';
reportData1 += '			<div class="btn-center">';
reportData1 += '				<span class="btn-type1 c1"><button type="reset" onclick="javascript:modalClose();">취소</button></span>';
reportData1 += '				<span class="btn-type1"><button type="button" onclick="javascript:cfn_reportProc();">등록</button></span>';
reportData1 += '			</div>';
reportData1 += '		</div>';
reportData1 += '	</div>';
reportData1 += '</div>';
reportData1 += '</form>';
$(".btn-report").modalCon({
	data : reportData1, 
	callbackLoad : function(){
							if(!cfn_loginCheck()) return;
							$("#report_contents_seq").val(contentsSeq);
							$("#report_contents_type").val(contentsType);
							$('.layer-content input').keypress(function(e) {
							    if (e.keyCode == 13) {
							    	cfn_login();
							    	return false;
							    }        
							});
							
					}
});
function cfn_reportPop(contentsSeq, contentsType, commentsSeq ){
	$(".btn-report").trigger("click");
	setTimeout(function(){
		$("#report_comments_seq").val(commentsSeq);
	},500);
}
/***********************************************
 * 신고하기 등록
 ************************************************/
function cfn_reportProc(){
	var arrVal = [["Y", "", "K", "formReason", "사진", 1, 1000]];
	if(!cfn_Validation("I", arrVal)) return;
	
	var param = $("#reportFrm").serialize();
	jQuery.ajax({
		type:"post",
		url: "/Report-ajax",		//URL
		data: param,		//파라미터
		dataType: "json",	//서버 기동 후 자료 형태
		error:function(xhr, sataus, e){
			//console.log( xhr.status +":"+ xhr.statusText +":"+ xhr.readyState +":"+ e  );
			alert("신고 실패하였습니다.");
		},
		success:function(responseData){
			var jsonObject = responseData;
			var map = jQuery.parseJSON(jsonObject.map);
			if(map.resultCode == "98"){ 
				modalClose();
				cfn_loginRequest();
			} else if(map.resultCode == "00"){
				modalClose();
				alert("신고하였습니다.");
			} else {
				alert("신고 실패하였습니다.");
			}
		}
	});
}
/***********************************************
 * 로그인 요청
 ************************************************/
function cfn_loginRequest(){
	if(!confirm("로그인 후 사용 가능 합니다.\n로그인 하시겠습니까?")){
		return false;
	}
	$(".btn-dialog-login").trigger("click");
}
/***********************************************
 * 로그인 체크
 ************************************************/
function cfn_loginCheck(){
	if(isLogin != "true"){
		cfn_loginRequest();
		return false;
	}
	return true;
}
// 태그 검색
function searchTag(str) {
	document.tfrm.searchText.value = str;
	document.tfrm.submit();
}
function createUrlCopyHtml(url){
	var  urlCopyHtml='';
	urlCopyHtml+='<div class="layer-type1 layer-type1-w1">';
	urlCopyHtml+='<div class="layer-header">';
	urlCopyHtml+='	<h1>URL 복사</h1>';
	urlCopyHtml+='	<button class="btn-close">URL 복사 닫기<span></span></button>';
	urlCopyHtml+='</div>';
	urlCopyHtml+='<div class="layer-content">';
	urlCopyHtml+='	<div class="view">';
	urlCopyHtml+='		<div class="form-type1">';
	urlCopyHtml+='			<fieldset>';
	urlCopyHtml+='			<div class="wrap">';
	urlCopyHtml+='					<label class="label" for="pageUrlValue">아래의 URL을 길게 누르면 복사할 수 있습니다.</label>';
	urlCopyHtml+='				<div class="form">';
	urlCopyHtml+='					<input type="text" class="text w100" value="'+url+'">';
	urlCopyHtml+='					</div>';
	urlCopyHtml+='				</div>';
	urlCopyHtml+='			</fieldset>';
	urlCopyHtml+='		</div>';
	urlCopyHtml+='		<!-- 버튼 -->';
	urlCopyHtml+='		<div class="btn-center">';
	urlCopyHtml+='		<span class="btn-type1"><a href="#none" class="btn-close">닫기</a></span>';
	urlCopyHtml+='	</div>';
	urlCopyHtml+='		<!-- //버튼 -->';
	urlCopyHtml+='	</div>';
	urlCopyHtml+='</div>';
	urlCopyHtml+='</div>';
	return urlCopyHtml;
}

function getToDay()
{
    var date = new Date(); 

    var year  = date.getFullYear();
    var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
    var day   = date.getDate();

    if (("" + month).length == 1) { month = "0" + month; }
    if (("" + day).length   == 1) { day   = "0" + day;   }

    return (year +"-"+ month +"-"+  day);
}

function calDate(dt, day){
	 
	 var caledmonth, caledday, caledYear;
	 var loadDt = dt.replace(/-/g, '/'); 
	 var v = new Date(Date.parse(loadDt) + day*1000*60*60*24);
	 
	 caledYear = v.getFullYear();
	 
	 if( v.getMonth() < 9 ){
	  caledmonth = '0'+(v.getMonth()+1);
	 }else{
	  caledmonth = v.getMonth()+1;
	 }
	 if( v.getDate() < 9 ){
	  caledday = '0'+v.getDate();
	 }else{
	  caledday = v.getDate();
	 }
	 return caledYear+"-"+caledmonth+'-'+caledday;
}
