<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<div class="container">
	<article class="contents">
		<section class="contents-inner">
			<form name="searchForm" action="/faq/faqList" method="get">
			<input type="hidden" name="multiYn" value="Y">
				<div class="form-group table">
					<table>
						<colgroup>
							<col width="15%">
							<col width="*">
						</colgroup>
						<tbody>
							<tr>
								<th>FAQ유형</th>
									<td>
									<div id="listFaqSelectCnsl">	
										<select name="faqClass" id="faqClass">
										<option value="">------선택------</option>
										<c:forEach items="${cnslPrntList}" var="list">
										<option value="${list.cnslClassId}"><c:out value="${list.cnslClassName}"></c:out></option>
										</c:forEach>
										</select>
										</div>
										<!--<span id="faqClassSecond"></span>-->
									</td>
							</tr>
							<tr>
								<th>Top 10 여부</th>
									<td>
										<input type="radio" name="mainOrder" value checked="checked" id="mainOrder" />
										<label for="fixedYn">전체</label>
										<input type="radio" name="mainOrder" value="true" id="mainOrder1"/>
										<label for="fixedYn1">예</label>
										<input type="radio" name="mainOrder" value="false" id="mainOrder2" />
										<label for="fixedYn2">아니오</label>
									</td>
							</tr>
							<tr>
								<th>
									<select name="condition">
										<option value="all">질문+답변</option>
										<option value="title">질문</option>
										<option value="content">답변</option>
									</select>
								</th>
								<td>
									<input type="text" id="search" name="searchWord" style="width:80%" value="${paramMap.searchWord}"/>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="grid-box">
						<div class="fl-r">
							<tiles:insertDefinition name="boSearchBtn" />
						</div>
					</div>
				</div>
				<!-- 검색테이블 끝-->
				<div class="form-group table list mt30">
					<div class="grid-box mb5">
						<!-- 전체 건 (페이지) -->
						<tiles:insertDefinition name="boListSizeSelect" />
					</div>
					<div class="fl-r">
						<a href="/faq/faqFormReg" class="btn btn-primary btn-sm">FAQ 등록</a>
					</div>
					<table class="group-center">
						<colgroup>
							<col width="8%">
							<col width="10%">
							<col width="10%">
							<col width="20%">
							<col width="*">
							<col width="10%">
							<col width="15%">
						</colgroup>
						<tbody>
							<tr>
								<th>번호</th>
							  <th>Top10여부</th>
								<th>Top10순위</th>
							  <th>FAQ 유형</th>
								<th>질문</th>
								<th>등록자Id</th>
								<th>등록일시</th>
							</tr>
							<c:if test="${empty list.content}">
								<tr>
									<td colspan="${popupYn eq 'Y' ? 7:6 }">검색결과 없습니다.</td>
								</tr>
							</c:if>
							<c:forEach items="${list.content}" var="faq" varStatus="status">
							<tr>
								<td>
									<c:out value="${list.totalElements -((list.number -1) * list.size) - status.index}"/><!-- 번호 -->
								</td>
								
								<td>
									<c:out value="${faq.mainOrder eq '0'? '아니오':'예'}"></c:out>
								</td>
								<td>
									<c:out value="${faq.mainOrder}"></c:out>
								</td>
								<td>
									<c:out value="${faq.cnslClassName}"></c:out>
								</td>
								<td class="align/left">
									<a href="/faq/faqFormMod?faqSeq=${faq.faqSeq}&searchData=<core:param encode="true"/>" style="color:blue; text-decoration:underline"><c:out value='${faq.faqTitle}'/></a>
								</td>
								<td>
									<c:out value="${faq.writeAdminId}"></c:out>
								</td>
								<td>
									<c:out value="${faq.rgstDtm}"></c:out>
								</td>
							</tr>
							</c:forEach>
						</tbody>
					</table>
					<div class="pagination clearfix align-center">
						<div class="table-pagination">
						<core:pagination listResultName ="list"/>
						</div>
					</div>
				</div>
			</form>
		</section>
	</article>
</div>
<script type="text/javascript">
	$(document).on('change', 'select[name=faqClass]' ,function(){
		$(this).nextAll().remove();
		var value = $('select[name=faqClass]').last().val();
		
		$.ajax({
			  url : "/faq/cnslChild"
			, data: {prntCnslClassId : value}
		  , dataType:'json'
		  , async : false
		  , success : function(data){
			  
			  var html = '';
			  var list = data.infoMap.cnslChildList;
			  if(list.length > 0){
				  html += "<select id='selectCnslChild' name='faqClass'>"
				  		 +  "<option value=''>"+'------선택-------'+"</option>"	;
				  for(var i =0; i < list.length; i++){
					  html += "<option value='"+list[i].cnslClassId+"'>"+ list[i].cnslClassName+"</option>";
				  }
				  html += '</select>';
				  $('#listFaqSelectCnsl').append(html);
			  }
		  }, error :  function(error, req, code){
				alert("error");
			}
		});//ajax
	})
	
	
	$(document).ready(function(){
		const faqClass = "${paramMap.faqClass}";
		const faqClassList = faqClass.split(",");
		for(var i=0; i<faqClassList.length; i++){
			$("select[name='faqClass']").eq(i).val(faqClassList[i]).change();
		}
	});
	
	
	
	
	
	
	
	
</script>