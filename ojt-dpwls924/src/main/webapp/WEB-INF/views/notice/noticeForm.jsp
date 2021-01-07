<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="/crewmate/core" prefix="core"%>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<script src="/resources/ckeditor/ckeditor.js"></script> 
<script type="text/javascript" src="/js/crewshop.js"></script>
<script type="text/javascript" src="/js/form.js"></script>
</head>
<div class="container">
	<article class="contents">
		<section class="contents-inner">
			<!-- <h4 class="mb10"><i class="awesome-reorder"></i> 공지사항 등록</h4>-->
			<div id="errorMessagesArea"></div>
			<div class="form-group table">
				<form name="form" id="saveForm">
					<input type="hidden" name="mode" value="${mode}" />
					<input type="hidden" name="notcSeq" value="${noticeOne.notcSeq}" />
					<div>
					<table>
						<colgroup>
							<col width="15%">
							<col width="*">
							<col width="15%">
							<col width="35%">
						</colgroup>
						<tbody>
							<tr>
								<th>전체공지 설정</th>
								<td>
										<input type="radio" name="fixedYn" value="Y" id="fixedYn1">
										<label for="fixedYn1">예&nbsp;</label> 
										<input type="radio" name="fixedYn" value="N" checked="checked" id="fixedYn2">
									<label for="fixedYn2">아니오&nbsp;</label>
								</td>
								<th>공지구분</th>
								<td>
										<input type="radio" name="boardCode" id="boardCode1" value="NOTICE" checked="checked">
										<label for="boardCode1">일반</label> 
										<input type="radio" name="boardCode" id="boardCode2" value="VENDOR">
										<label for="boardCode2">업체</label>
								</td>
							</tr>
							<tr>
								<th>공지유형<i class="fa fa-check"></i></th>
								<td colspan="3">
									<select id="idNotcClassCode" name="notcClassCode">
										<option value="">분류선택</option>
										<option value="01">공지</option>
										<option value="02">안내</option>
									</select>
								</td>
							</tr>
							<tr>
								<th colspan="1">제목<i class="fa fa-check"></i></th>
								<td colspan="3">
									<input maxlength="40" type="text" style="width: 600px;" id="idNotcTitle" name="notcTitle" value="${noticeOne.notcTitle}">
								</td>
							</tr> 
						<tbody>	
							<tr>
								<th colspan="1">내용<i class="fa fa-check"></i></th>
								<td colspan="3">
									<textarea name="notcCont" id="notcCont" rows="8" cols="60" style="visibility: hidden; display: none;" ><c:out value="${noticeOne.notcCont}"/></textarea>
									<script type="text/javascript" src="/ckeditor/ckeditor.js?t=B37D54V"></script>
									<script>
										var ckeditor_config = {
												resize_enaleb : false,
												enterMode : CKEDITOR.ENTER_BR,
												shiftEnterMode : CKEDITOR.ENTER_P,
												filebrowserUploadUrl : "/board/image"
												};

											 CKEDITOR.replace("notcCont", ckeditor_config);
									</script>
								</td>
							</tr>
						</tbody>	
							<c:if test="${!empty noticeOne.writeAdminId}">
							<tr>
								<th>등록자ID / 등록일시</th>
								<td> ${notice.writeAdminId} / <fmt:formatDate value="${noticeOne.rgstDtm}" pattern="yyyy-MM-dd kk:mm:ss"/></td>
								<th>수정자ID / 수정일시</th>
							<c:if test="${empty noticeOne.lastModAdminId}">
								<td></td>
							</c:if>
							<c:if test="${!empty noticeOne.lastModAdminId}">
								<td> ${noticeOne.lastModAdminId} / ${noticeOne.lastModDtm}</td>
							</c:if>
							</tr>
							</c:if>
						</tbody>
					</table>	
					<div class="grid-box">
						<p class="fl-r">
						<c:if test="${empty noticeOne.writeAdminId }"> 
							<button type="button" class="btn btn-primary" id="create" onclick="saveCont()">저장</button>
						</c:if>
						<c:if test="${!empty noticeOne.writeAdminId }">
							<button type="button" class="btn btn-primary" id="update" onclick="saveCont()">수정</button>
							<button type="button" class="btn btn-danger" id="delete" onclick="deleteNotice(this)">삭제</button>
						</c:if>	
							<button type="button" class="btn btn-cancel list" onclick="location.href='/notice/noticeList'">취소</button>
						</p>
					</div>
					</div>
				</form>
			</div>
		</section>
	</article>
</div>
<script type="text/javascript">
  /* 유효성검사 */
  function validateCheck(){
	  var notcForm = document.getElementById("saveForm");
	  var notcCont = CKEDITOR.instances.notcCont.getData();
	  
	 	if(($("#idNotcClassCode").val()=="")){
	 		alert("공지유형을 입력해주세요.");
	 		$("#idNotcClassCode").focus();
	 		
	 		return false;
	 	}
	 	
	 	if(($("#idNotcTitle").val()=="")){
	 		alert("제목을 입력해주세요.");
	 		$("#idNotcTitle").focus();
	 		
	 		return false;
	 	}
	 	
		if(notcCont=="" || notcCont.length == 0){
			alert("내용을 입력해주세요.");
			$("#notcCont").focus();
			
			return false;
		}	
		
		return true;
	}
  
	/* 등록 시 *///이걸 했더니 에디터의 값을 못넣네...
	/*function saveCont(){
		var param = $("#saveForm").serializeObject();
		
		if(!$("#saveForm").validateForm()){
			return;
		}
		if(!confirm("저장하시겠습니까?")){
			return;
		}
		$("textarea[name='notcCont']").val(CKEDITOR.instances.notcCont.getData());
		$.ajax({
				url  : param.mode == "create" ? "/notice/noticeCreate" : "/notice/noticeUpdate",
				type : "post",
				dataType : "json",
				data : param,
				traditional : true,
				success : function(data){
					if(!form.ajaxValidate(data)){
						return;
					}
					if(param.mode == "create"){
						 alert("등록되었습니다.");
						 location.href="/notice/noticeList";
					}else if(param.mode == "update"){
							alert("수정하였습니다.");
							location.href="/notice/noticeList";
					}
				},
				error : function(request, status, error){					
				}
		});
	}*/
  /* 삭제 시 */
  function deleteNotice(obj){
  	
  	var data = $("input[name='notcSeq']").val();
  	console.log(data)
  	if(!confirm("삭제하시겠습니까?")){
  		return;
  	}
  	
  	$.ajax({
  	  url : "/notice/noticeDelete"
  	,	type : "post" //생략 시 기본값은 get
  	,	dataType : "json"
  	,	data : {notcSeq : data}
  	,	success : function(data){
  			alert("삭제되었습니다.");
  			location.href="/notice/noticeList";
  			
  		},
  		error : function(request, status, error){
  			
  		}	
  	});
  }
  
	/* 등록, 수정 */
	function saveCont(){
		var param = $("#saveForm").serializeObject();
		
		if(validateCheck()){
		  if (!confirm("저장하시겠습니까?")) {
		      return false; 
		  }
		
		 $("textarea[name='notcCont']").val(CKEDITOR.instances.notcCont.getData()); 
		 	$("form#saveForm").ajaxSubmit({
		 		url : param.mode == "create" ? "/notice/noticeCreate" : "/notice/noticeUpdate"
		 	, type: "post"	
		 	, dataType:"json"
		 	, success: function(data){
		 		console.log(data)
		 		 if(param.mode === 'create'){
		 			 alert("등록하였습니다.");
		 			 location.href="/notice/noticeList";
		 		 }else if(param.mode === 'update'){
		 			 alert("수정하였습니다.");
		 			 location.href="/notice/noticeList";
		 		 }else{
		 			 alert("실패하였습니다.");
		 		 }
		 	},error: function(request, status, error){
		 			alert("시스템 오류가 발생했습니다. 관리자에게 문의하세요");
		 	}
		 	
		 	});	
		} 	
	}
	
jQuery(function($){

	/* 전체공지 설정 */
	const fixedYn = '${noticeOne.fixedYn}';
	if(fixedYn=="Y"){
		$("input:radio[id='fixedYn1']").prop("checked", true);
	}else if(fixedYn=="N"){
		$("input:radio[id='fixedYn2']").prop("checked", true);
	}else{
		$("input:radio[id='fixedYn']").prop("checked", true);
	}
	
	/* 공지구분 */
	const boardCode = '${noticeOne.boardCode}';
	if(boardCode=="NOTICE"){
		$("input:radio[id='boardCode1']").prop("checked", true);
	}else if(boardCode=="VENDOR"){
		$("input:radio[id='boardCode2']").prop("checked", true);
	}else{
		$("input:radio[id='boardCode']").prop("checked", true);
	}
	/* 공지유형 */
	const notcClassCode = '${noticeOne.notcClassCode}';
	$("select[name='notcClassCode'] option[value='"+notcClassCode+"']").attr("selected", "selected");
	
});  
</script>
<script src="http://malsup.github.com/jquery.form.js"></script>