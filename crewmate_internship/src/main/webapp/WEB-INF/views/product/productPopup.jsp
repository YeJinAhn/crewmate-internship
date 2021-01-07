<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
<title>상품목록조회</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<!-- external css style -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body class="wrap-popup">
			<div class="container-wrap-inner">
				<div class="container">
					<article class="contents">
						<section class="contents-inner">
							<h4 class="mb10">상품목록조회</h4>
							<div class="form-group table">
							<form id="productSearchForm" name="searchForm" method="get" action="/product/popupProductList/popup">
								<input type="hidden" name="sortType" value="${paramMap.sortType}">
								<input type="hidden" name="decorator" value="adminPopup">
								<input type="hidden" name="multiYn" value="Y">
								<input type="hidden" name="excelRowCount" value="129">
								<table>
									<colgroup>
										<col width="12%">
										<col width="*">
										<col width="12%">
										<col width="15%">
										<col width="12%">
										<col width="25%">
									</colgroup>
									<tbody>
									<tr>
										<th><b>분류선택</b></th>
											<td colspan="3" class="t1 form">
											<div id="listProductSelectCategory">
											<%--<span id="listProductSelectCategory">--%> 
										 <select id="selectParentCategory" name="category">
													<option value>---- 선택 ----</option> 
													<c:forEach var="category" items="${categoryList}" varStatus="status">
													<option value="${category.ctgrId}"><c:out value="${category.ctgrName}"></c:out>
													</option>
													</c:forEach>
											</select>
											<%--</span>--%>
											</div>
											</td>
										<th><b>업체</b></th>
											<td>
										  <%-- <select id="idVndrCntrtId" name="vndrCntrtId">
											  <option value="">선택해주세요</option>
												<c:forEach var="vendor" items="${vendorList}">
												<option value="${vendor.vndrId}"><c:out value="${vendor.vndrName}"/></option>
												</c:forEach>
											</select> --%>
										  <select id="idVndrCntrtId" name="vndrCntrtId">
											  <option value="">선택해주세요</option>
												<option value="0001001">에이비씨마트코리아</option>
												<option value="0031018">crewcrew</option>
											</select>
											</td>
									</tr>
									<tr>
										<th><b>상품명</b></th>
											<td>
												<input type="text" name="prdtEngName" value="<c:out value='${paramMap.prdtEngName}'/>" class="search" maxlength="50" style="width:80%;"/>
												<input type="hidden" name="multYn" value="${paramMap.multYn }"/>
											</td>
										<th><b>상품코드</b></th>
											<td>
												<input type="text" name="prdtCode" value="<c:out value='${paramMap.prdtCode}'/>" maxlength="15" class="search" style="ime-mode: disabled;width:80%;"/>	
											</td>	
										<th><b>브랜드</b></th>
											<td>
												<input type="text" id="brandName" name="brandName" value="<c:out value='${paramMap.brandName}'/>" class="search" maxlength="30" style="width:60%;"/>
												<input type="hidden" id="brandId" name="brandId" value="<c:out value='${paramMap.brandId}'/>" class="search"/>
												<!-- <a href="javascript://" onclick="openBrandPopup();" title="새창에서 열림" class="btn btn-blue btn-search"><i class="fa fa-search-plus"></i></a> -->
												<button type="button" onclick="openBrandPopup();" title="새창에서 열림" class="btn btn-blue btn-search"><i class="fa fa-search-plus"></i>검색</button>
											</td>	
									</tr>
									<tr>
										<th>판매상태</th>
											<td>
												<input type="checkbox" name="prdtStatCodes" value="" class="check_class"   checked="checked" id="prdtStatCode"/>
												<label for="prdtStatCode">전체&nbsp;</label>
												<input type="checkbox" name="prdtStatCodes" value="P" class="check_class"  id="prdtStatCode1"/>
												<label for="prdtStatCode1">판매중&nbsp;</label>
												<input type="checkbox" name="prdtStatCodes" value="S" class="check_class"  id="prdtStatCode2"/>
												<label for="prdtStatCode2">일시품절&nbsp;</label>
												<input type="checkbox" name="prdtStatCodes" value="F" class="check_class"  id="prdtStatCode3"/>
												<label for="prdtStatCode3">판매중지&nbsp;</label>												
											</td>
										<th>상품가격</th>
											<td>
												<input type="text" name="dscntStartSellPrice" value="<c:out value='${paramMap.dscnStartSellPrice}'/>" class="inputNumberText" style="ime-mode: disabled;width:35%;" maxlength="10"/>원 ~
												<input type="text" name="dscntEndSellPrice" value="<c:out value='${paramMap.dscntEndSellPrice}'/>" class="inputNumberText" style="ime-mode; disabled; width:35%;" maxlength="10" />원
											</td>
										<th>전시여부</th>
											<td>
												<input type="radio" name="dispYn" value="" class="search" checked="checked" id="dispYn">
												<label for="dispYn">전체&nbsp;</label>
												<input type="radio" name="dispYn" value="Y" class="search" checked="checked" id="dispYn1">
												<label for="dispYn1">전시&nbsp;</label>
												<input type="radio" name="dispYn" value="N" class="search" checked="checked" id="dispYn2">
												<label for="dispYn2">미전시&nbsp;</label>
											</td>	
									</tr>
									<tr>
										<th>상품승인기간</th>
											<td colspan="3">
												<tiles:insertDefinition name="boDateSelect" />
											</td>
										<th>업체중지상품제외</th>
											<td>
												<input type="radio" name="vndrStopPrdtEscp" value="true" class="search" checked="checked" id="vndrStopPrdtEscp1"/>
												<label for="vndrStopPrdtEscp1">예&nbsp;</label>
												<input type="radio" name="vndrStopPrdtEscp" value="false" class="search" id="vndrStopPrdtEscp2" />
												<label for="vndrStopPrdtEscp2">아니오&nbsp;</label>
											</td>	
									</tr>
									</tbody>
								</table>
								<div class="grid-box">
									<div class="fl-1">
										<tiles:insertDefinition name="boSearchBtn" />
										<!-- <button type="submit" class="btn btn-blue btn-icon btnSearch btn-submit" value="검색">검색</button>
										<a href="#초기화" class="btn btn-danger btnReset">초기화</a>
										<button type="button" class="btn btn-cancel" id="btnReset">초기화</button>		 -->							
									</div>
								</div>
								</form>
								<div class="form-group table mt30 product_a_list list">
									<div class="grid-box mb5">
										<br>
										<div class="fl-r">
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortA">
													정상가<i class="entypo-up-open"></i>
												</span>
											</a>
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortB">
													할인율<i class="entypo-up-open"></i>
												</span>
											</a>
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortC">
													온라인할인율<i class="entypo-up-open"></i>
												</span>
											</a>
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortD">
													판매가<i class="entypo-up-open"></i>
												</span>
											</a>
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortE">
													재고<i class="entypo-up-open"></i>
												</span>
											</a>
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortF">
													판매상태<i class="entypo-up-open"></i>
												</span>
											</a>
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortG">
													전시여부<i class="entypo-up-open"></i>
												</span>
											</a>
											<a href="javascript://" class="btn btn-blue btn-xs" style="color:white; margin:2px;">
												<span id="sortH">
													승인일<i class="entypo-up-open"></i>
												</span>
											</a>
										</div>
									</div>
									</div>
									<div class="form-group table list mt30">
									<div class="table-header">
											<tiles:insertDefinition name="boListSizeSelect"/><!-- 10개씩읽기 -->
									</div>
									<table class="group-center">
										<colgroup>
											<col width="5%">
											<col width="*">
											<col width="*">
											<col width="17%">
											<col width="6%">
											<col width="5%">
											<col width="5%">
											<col width="6%">
											<col width="5%">
											<col width="7%">
											<col width="5%">
											<col width="5%">
											<col width="9%">
										</colgroup>
										<tbody>
											<tr>
												<c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'Y' }"><th scope="col"><input type="checkbox" onclick="checkAll(this, 'chkBoard');"/></th></c:if>
												<c:if test="${popupYn eq 'N' && paramMap.multYn eq 'N' }"><th scope="col"></th></c:if>
											  <th> 
													<input type="checkbox" id="prdtPopupAllChecked" name="headCheck"> 
											  </th> 
												<th>상품코드</th>
												<th>상품명</th>
												<th>카테고리</th>
												<th>정상가</th>
												<th>ERP할인율</th>
												<th>온라인할인율</th>
												<th>판매가</th>
												<th>재고</th>
												<th>판매상태</th>
												<th>전시여부</th>
												<th>고시여부</th>
												<th>승인일</th>
											</tr>
											<c:if test="${empty list.content}">
													<tr>
															<td colspan="${popupYn eq 'Y'? 13 : 12 }">등록된 데이터가 없습니다.</td>
													</tr>
											</c:if>
											<c:if test="${!empty list.content}">
												<c:forEach items="${list.content}" var="product" varStatus="status">
													<tr>
													 <c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'Y' }"></c:if>
														<td><input type="checkbox" name="chkBoard" value="<c:out value="${status.index}"/>"<c:out value="${product.prdtCode}"/>/></td>
														<td><a href="javascript://"><c:out value="${product.prdtCode}" /></a></td>
														<td class="product_info align-left">
															<a href="javascript://" onclick="ProductImagePopup('${product.prdtImagePath}');">
															<img data-original="//image.crewmate.co.kr/${product.prdtImagePath}" src="//image.crewmate.co.kr/${product.prdtImagePath}" alt="" class="lazy-loading smallImage" width="50" height="50" onerror="imageError(this)" style="display: inline;"><noscript><img src="//image.crewmate.co.kr/${product.prdtImagePath}"/></noscript>
															</a>
															<a href="javascript://" onclick="ProductImagePopup('${product.prdtImagePath}');">
															>[${product.prdtKorName}],${product.prdtEngName}
															</a>
														</td>

														<td><c:out value="${product.ctgrName}" /></td>
														<td><c:out value="${product.prdtSellPrice}" /></td>
														<td>0</td>
														<td>0</td>
														<td><c:out value="${product.prdtSellPrice}" /></td>
														<td><c:out value="${product.laveCount}" /></td>
														<td><c:out value="${product.prdtStatCode eq 'P'? '판매중' :product.prdtStatCode eq 'F'? '판매중지':'일시품절'}"/><br><c:out value="${paramMap.vndrStopPrdtEscp eq '03'? '일시정지' :paramMap.vndrStopPrdtEscp eq '04'? '기간만료': ''}"></c:out></td>
														<td><c:out value="${product.dispYn eq 'Y'? '전시' : '미전시'}" /></td>
														<td><c:out value="${product.ftcInfoYn}" /></td>
														<td><c:out value="${product.prmtDtm}" /></td>	
													</tr>
												</c:forEach>
											</c:if>
										</tbody>
									</table>
									    <div class="table-footer pagination clearfix align-center">
        							<div class="table-pagination">
           						 <core:pagination listResultName="list" />
        							</div>
       							 <%-- <c:if test="${paramMap.multYn eq 'Y'}"> --%>
               					 <button type="button" class="btn btn-blue" onclick="setProduct();" style="float:right;">입력</button>
            					</div>
       							<%-- </c:if> --%>
   										 </div>
										<!-- 	 <p class="grid-box">
											 		<a href="javascript://" class="btn btn-blue" onclick="setProductList('Y');">입력</a>
											 </p> -->
								</div>	
						</section>
					</article>
				</div>
			</div>
</body>
<script type="text/javascript">
function init() {
  var prdtStatCodeCheckLength = $("input[name='prdtStatCodes']:checked").length;
  var prdtStatCodeLength = $("input[name='prdtStatCodes']").length;

   if((prdtStatCodeLength-1 == prdtStatCodeCheckLength) || ($("input[name='prdtStatCodes']:checked").val() == "")) {
      $("input[name='prdtStatCodes']").prop("checked", true);
   }    
}

/*상품목록조회 이미지 팝업창 열기*/
function ProductImagePopup(url){
	 var img = "//image.crewmate.co.kr"+url;
	 var imagePopup = window.open("/product/popupImage/popup?img="+img, "imagePopup", "width=184,height=282, scrollbars=no, resizable=yes");
}

/*브랜드 팝업창 열기*/		
function openBrandPopup(){
	var brandPopup = window.open("/product/popupBrandList/popup","brandPopup","width=987,height=876, scrollbars=yes, resizable=yes");		
}  
	
/*브랜드 팝업 값넣고 창 닫기*/
function setBrandVal(brandName, brandId){
	$("#brandName").val(brandName);
	$("#brandId").val(brandId);
}
	
	
	var jsonList = ${core:toJson(list.content)};
	var callbackFn = null;
/*상품목록조회 값 부모창으로 넘기고 창닫기*/	
function setProduct(index){
	var list = new Array();
		
		if(typeof index == "undefined"){
			if($("input[name=chkBoard]:checked").length == 0){
				alert('선택한 항목이 없습니다.');
				return;
			}
			$.each($("input[name=chkBoard]:checked"), function(){
				list.push(jsonList[$(this).val()]);
			});
		}else{
			list.push(jsonList[index]);
		}		
		var data = new Object();
		data.list = list;
		if(typeof(callbackFn) == "function"){
			callbackFn(data);
			console.log(data);
		} else if(typeof(opener.setProductVal) == "function"){
			opener.setProductVal(data);
		}
		window.close();
}	
	
/*상품 분류정보*/
$(document).on('change', 'select[name=category]' ,function(){   
    $(this).nextAll().remove();
    var value = $('select[name=category]').last().val();
 
  $.ajax({
    url : "/product/childCategory",
    data : { prntCtgrId : value },
    dataType : 'json',
    async: false,//동기식으로 작동하기 위해서 (순서!)
    success : function(data){
       
       var html = '';
       var list = data.infoMap.cagoList;
       if(list.length > 0){          
       html += "<select id='selectChildCategory' name='category'>";
       html += "<option value=''>" + '---- 선택 ----' + "</option>";
       
       for(var i = 0; i < list.length; i++){
          html += "<option value='"+list[i].ctgrId + "'>" + list[i].ctgrName + "</option>";               
       }        
       html += '</select>';       
       $('#listProductSelectCategory').append(html);          
       } 
    }, error : function(error, req, code){
       alert("error");
    }         
 });    
})   

$(document).ready(function(){
	/*분류선택*/
	const category = "${paramMap.category}";
	const categoryList = category.split(",");
	for(var i=0; i<categoryList.length; i++){
		$("select[name='category']").eq(i).val(categoryList[i]).change();
		//$("select[name='category']").val(categoryList[1]);
		//$("select[name='category']").val(categoryList[2]);
		/* $("select[name='category']").val(categoryList[i]).change();
 		$("select[name='category']").val(categoryList[1]).change();
		$("select[name='category']").val(categoryList[2]).change();  */
	}	
	
	/*날짜 검색 유효성체크*/
	$(".date-from").on("change", function(){
		if($(".date-to").val()==''){
			 $(".date-to").val($(this).val());
		}else{
				if($(this).val() > $(".date-to").val()){
					alert("시작일은 종료일보다 클 수 없습니다.")
					$(this).val($(".date-to").val());
				}
		}
	});
	/*날짜 검색 유효성체크*/
  $(".date-to").on("change", function() {
       if ($(".date-from").val() == '') {
           $(".date-from").val($(this).val());
       }else {
           if ($(this).val() < $(".date-from").val()){
               alert("시작일은 종료일보다 클 수 없습니다.");
               $(this).val($(".date-from").val());
           }
       }
  });
  /*날짜 검색조건 readonly*/
  $("input[name$=Dt]").attr('readonly','readonly');
});	

jQuery(function($){	
	init();
	/*전체선택*/
	$('#prdtPopupAllChecked').change(function(){
		$("input[name='chkBoard']").each(function(){
			$(this).prop("checked", $('#prdtPopupAllChecked').is(":checked"));
		});
	});
	
	/*업체 검색*/
	var vndrCntrtId = "${paramMap.vndrCntrtId}";
	$("select[name='vndrCntrtId'] option[value='"+vndrCntrtId+"']").attr("selected", "selected");
		
	/*판매상태 체크유지*/
	var prdtStatCode = "${paramMap.prdtStatCodes}";
	if(prdtStatCode==''){
	$("input[name='prdtStatCodes']").prop("checked", true);		
	}else{
		var prdtStatCodeList = new Array();
	  prdtStatCodeList = prdtStatCode.split(",");
		if(prdtStatCodeList.length == 4){
	    $("input[name='prdtStatCodes']").prop("checked", true);			
		}else{
			$("input[name='prdtStatCodes']").prop("checked", false);
	    for(var i =0; i<prdtStatCodeList.length; i++){
		    $(".check_class[value="+prdtStatCodeList[i]+"]").prop("checked", true);	
	    }
		//console.log(prdtStatCodeList)
	  }			
	}
	
	/*판매상태*/
  $("input[name='prdtStatCodes']").click(function(){
		 if($(this).val()== ""){
			 $("input[name='prdtStatCodes']").prop("checked", this.checked);
		 }else{
			/*$("input[name='prdtStatCodes']:eq(0)").prop("checked", true);*/
		 }
	});
	
	/*전시여부*///--검색을 누르면 submit하게 되고 그러면 interceptor에서 paramMap으로 정보를 가지고 있다가 split기준으로 뿌려준다.
	const dispYn = '${paramMap.dispYn}';
		if(dispYn=="Y"){
			$("input:radio[id='dispYn1']").prop("checked", true);
		}else if(dispYn=="N"){
			$("input:radio[id='dispYn2']").prop("checked", true);
		}else{
			$("input:radio[id='dispYn']").prop("checked", true);
		}
		
  /*업체중지상품제외*/
  const vndrStopPrdtEscp = '${paramMap.vndrStopPrdtEscp}';
  	 if(vndrStopPrdtEscp=="true"){
  		$("input[id='vndrStopPrdtEscp1']").prop("checked", true);
  	}else{
  		$("input[id='vndrStopPrdtEscp2']").prop("checked", true);
  	} 
	
	/* 전시여부 radio */
	/*$("#dispYn[value = '${paramMap.dispYn}']").attr("checked",true);*/
			
	/* 업체중지상품제외 radio */
	/*$("#vndrStopPrdtEscp[value = '${paramMap.vndrStopPrdtEscp}']").attr("checked",true);*/
		
		 /*정렬*/	
	   var sortType = '${paramMap.sortType}';
       if(sortType == "orderByType1Asc"){
           $("#sortA").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType1Desc"){
           $("#sortA").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }else if(sortType == "orderByType2Asc"){
           $("#sortB").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType2Desc"){
           $("#sortB").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }else if(sortType == "orderByType3Asc"){
           $("#sortC").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType3Desc"){
           $("#sortC").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }else if(sortType == "orderByType4Asc"){
           $("#sortD").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType4Desc"){
           $("#sortD").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }else if(sortType == "orderByType5Asc"){
           $("#sortE").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType5Desc"){
           $("#sortE").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }else if(sortType == "orderByType6Asc"){
           $("#sortF").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType6Desc"){
           $("#sortF").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }else if(sortType == "orderByType7Asc"){
           $("#sortG").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType7Desc"){
           $("#sortG").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }else if(sortType == "orderByType8Asc"){
           $("#sortH").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-down-open");
       }else if(sortType == "orderByType8Desc"){
           $("#sortH").css("color", "yellow").css("font-weight", "bold").find("i").attr("class", "entypo-up-open");
       }
         
       $("#sortA").click(function(){ 	   
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType1Asc"){
               $("input[name='sortType']").val("orderByType1Desc");
           }else if(sortType == "orderByType1Desc"){
               $("input[name='sortType']").val("orderByType1Asc");
           }else{
               $("input[name='sortType']").val("orderByType1Asc");
           }
           $("#productSearchForm").submit();
       });
       
       $("#sortB").click(function(){        
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType2Asc"){
               $("input[name='sortType']").val("orderByType2Desc");
           }else if(sortType == "orderByType2Desc"){
               $("input[name='sortType']").val("orderByType2Asc");
           }else{
               $("input[name='sortType']").val("orderByType2Asc");
           }
       
           $("#productSearchForm").submit();
       });
       
       $("#sortC").click(function(){       
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType3Asc"){
               $("input[name='sortType']").val("orderByType3Desc");
           }else if(sortType == "orderByType3Desc"){
               $("input[name='sortType']").val("orderByType3Asc");
           }else{
               $("input[name='sortType']").val("orderByType3Asc");
           }
       
           $("#productSearchForm").submit();
       });
       
       $("#sortD").click(function(){         
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType4Asc"){
               $("input[name='sortType']").val("orderByType4Desc");
           }else if(sortType == "orderByType4Desc"){
               $("input[name='sortType']").val("orderByType4Asc");
           }else{
               $("input[name='sortType']").val("orderByType4Asc");
           }
       
           $("#productSearchForm").submit();
       });
       
       $("#sortE").click(function(){        
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType5Asc"){
               $("input[name='sortType']").val("orderByType5Desc");
           }else if(sortType == "orderByType5Desc"){
               $("input[name='sortType']").val("orderByType5Asc");
           }else{
               $("input[name='sortType']").val("orderByType5Asc");
           }
       
           $("#productSearchForm").submit();
       });
       
       $("#sortF").click(function(){       
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType6Asc"){
               $("input[name='sortType']").val("orderByType6Desc");
           }else if(sortType == "orderByType6Desc"){
               $("input[name='sortType']").val("orderByType6Asc");
           }else{
               $("input[name='sortType']").val("orderByType6Asc");
           }
       
           $("#productSearchForm").submit();
       });
       
       $("#sortG").click(function(){         
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType7Asc"){
               $("input[name='sortType']").val("orderByType7Desc");
           }else if(sortType == "orderByType7Desc"){
               $("input[name='sortType']").val("orderByType7Asc");
           }else{
               $("input[name='sortType']").val("orderByType7Asc");
           }
       
           $("#productSearchForm").submit();
       });
       
       $("#sortH").click(function(){           
           var sortType = $("input[name='sortType']").val();
           if(sortType == "orderByType8Asc"){
               $("input[name='sortType']").val("orderByType8Desc");
           }else if(sortType == "orderByType8Desc"){
               $("input[name='sortType']").val("orderByType8Asc");
           }else{
               $("input[name='sortType']").val("orderByType8Asc");
           }      
           $("#productSearchForm").submit();
       });//End 정렬
});		
</script>
</html>
