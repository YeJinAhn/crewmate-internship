<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<head>
<script src="/resources/ckeditor/ckeditor.js"></script> 
<script type="text/javascript" src="/js/form.js"></script>
</head>
<div class="container">
	<article class="contents">
		<header class="contents-header">
			<h3 class="heading-title">FAQ 관리</h3>
		</header>
		<section class="contents-inner">
			<div class="form-group table">
				<form name="form" id="saveForm">
				<input type="hidden" name="mode" value="${mode}" />
				<input type="hidden" name="faqSeq" value="${faqOne.faqSeq}" />
					<table>
						<colgroup>
							<col width="15%">
							<col width="*">
							<col width="15%">
							<col width="25%">
						</colgroup>
						<tbody>
							<tr>
								<th colspan="1" class="important">FAQ유형</th>
								<td colspan="3">
								<div id="listFaqSelectCnsl">
									<c:if test="${empty faqOne.writeAdminId}">
									<select name="" class="faqClass" id="faqClass">
										<option value="">------선택------</option>
										<c:forEach items="${cnslPrntList}" var="list">
										<option value="${list.cnslClassId}"><c:out value="${list.cnslClassName}" /></option>
										</c:forEach>
									</select>
									</c:if>
									<c:if test="${!empty faqOne.writeAdminId}">
									<select name="faqClassId" id="faqClass">
										<option value="${faqOne.faqClassId}">${faqOne.cnslClassName}</option>
									</select>
									</c:if>
									</div>
								</td>
							</tr>
							<tr>
								<th colspan="1">Top 10 순위</th>
								<td colspan="3">
									<input type="text" id="mainOrder" class="inputNumberText" style="text-align:right;width:10%;ime-mode:disabled;" name="mainOrder" value="${faqOne.mainOrder}"/>순위
								</td>
							</tr>
							<tr>
								<th colspan="1" class="important">질문</th>
								<td colspan="3">
									<input type="text" maxlength="40" style="width:80%" name="faqTitle" value="${faqOne.faqTitle}" />
								</td>
							</tr>
							<tr>
								<th colspan="1" class="important">답변</th>
								<td colspan="3">
									<textarea name="faqCont" cols="60" rows="8" style="visibility: hidden; display:none;"><c:out value="${faqOne.faqCont}"></c:out></textarea>
									<script>
										/*var ckeditor_config = {
												resize_enaleb : false,
												enterMode : CKEDITOR.ENTER_BR,
												shiftEnterMode : CKEDITOR.ENTER_P,
												filebrowserUploadUrl : "/board/image2"
												};*/
											 CKEDITOR.replace("faqCont");
									</script>
								</td>
							</tr>
							<tr>
								<th>파일찾기</th>
								<td colspan="3">
									<p>
										<input type="text" name="filePath" style="width:300px" id="shtctUrl" value="${faqOne.filePath}" style="display:none;"/>
										<button type="button" onclick="openImageUpload()" title="새창에서 열림" class="btn btn-blue btn-icon">찾아보기</button>
										<button type="button" class="btn btn-danger btn-search" id="imgDelete">삭제</button>
									</p>
								</td>
								<!-- <th>조회수</th>
								<td>
									<span></span>
								</td> -->
							</tr>
							<c:if test="${!empty faqOne.writeAdminId}">
							<tr>
								<th>등록자ID/ 등록일시</th>
								<td>${faqOne.writeAdminId} / ${faqOne.rgstDtm}</td>
								<th>수정자ID/ 수정일시</th>
							<c:if test="${empty faqOne.lastModAdminId}">
								<td></td>
							</c:if>
							<c:if test="${!empty faqOne.lastModAdminId}">
								<td>${faqOne.lastModAdminId} / ${faqOne.lastModDtm}</td>
							</c:if>		
							</tr>
							</c:if>
						</tbody>
					</table>
					<div class="grid-box">
						<p class="fl-r">
						<c:if test="${!empty faqOne.writeAdminId}">
							<button type="button" class="btn btn-primary" id="update" onclick="saveCont()">수정</button>
							<button type="button" class="btn btn-danger" id="delete">삭제</button>
						</c:if>
						<c:if test="${empty faqOne.writeAdminId}">
							<button type="button" class="btn btn-primary" id="create" onclick="saveCont()">저장</button>
						</c:if>	
							<button type="button" class="btn btn-cancel list" onclick="location.href='/faq/faqList'">취소</button>
						</p>
					</div>
				</form>
			</div>
		</section>
	</article>
</div>
<script type="text/javascript">
	$(document).on('change', 'select[id=faqClass]' ,function(){
		$(this).next().remove();
		var value=$('select[id=faqClass]').last().val();
		
		$.ajax({
			   url : "/faq/cnslChild"
			 , data : {prntCnslClassId : value}
		   , dataType : 'json'
		   , success : function(data){
			   
			   var html ='';
			   if(data.infoMap.cnslChildList.length >0){
			   html += "<select id='selectCnslChild' name='faqClass'>"
			        +  "<option value=''>-----선택-----</option>";
			        for(var i =0; i<data.infoMap.cnslChildList.length; i++){
			        	html += "<option value='"+data.infoMap.cnslChildList[i].cnslClassId+"'>"+ data.infoMap.cnslChildList[i].cnslClassName+"</option>";
			        }
			        html += '</select>';
			        $('#listFaqSelectCnsl').append(html);
			   }     
		   }, error : function(error, req, code){
			   	alert("error");
		   }
		});
	})
	
	function openImageUpload(){
		var imageOpen = window.open("/faq/uploadImageForm/popup","imagePopup","width=987,height=876, scrollbars=yes, resizable=yes");
	}
	function saveCont(){
		var param = $("#saveForm").serializeObject();
		console.log(param)
		
		$("textarea[name='faqCont']").val(CKEDITOR.instances.faqCont.getData());
			$("form#savaForm").ajaxSubmit({
				 url : param.mode == "create"? "/faq/faqCreate" : "/faq/faqUpdate"
			 , type : "post"
			 , dataType : "json"
			 , success : function(data){
				 if(param.mode ==='create'){
					 alert("등록되었습니다.");
					 location.href ="/faq/faqList";
				 }else if(param.mode === 'update'){
					 alert("수정되었습니다.");
				 }else{
					 alert("실패하였습니다.");
				 }
			 }, error : function(request, status, error){
				 alert("시스템 오류가 발생했습니다. 관리자에게 문의하세요.");
			 }
			});
	}
</script>
<script src="http://malsup.github.com/jquery.form.js"></script>