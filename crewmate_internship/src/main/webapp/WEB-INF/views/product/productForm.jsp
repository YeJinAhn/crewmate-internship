<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<head>
<title>상품등록</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="/resources/ckeditor/ckeditor.js"></script> 
	<script type="text/javascript" src="/js/crewshop.js"></script>
	<script type="text/javascript" src="/js/form.js"></script>
</head>
<body>
<div class="container-wrap-inner">
	<div class="container">
		<article class="contents">
			<header class="contents-header">
				<h2 class="heading-title"><i class="fa fa-file"></i>상품등록</h2>
			</header>
			<section class="contents-inner">
				<div id="errorMessagesArea"></div>
			<!-- 	<form id="productForm" name="productForm" method="post"
					enctype="multipart/form-data"> -->
					<form id="modifyProductForm" name="searchForm" action=${popupYn eq 'Y' ? "/product/product/popup" : "/product/product"} method="post" enctype="multipart/form-data">
					<div class="form-group table">
						<input type="hidden" id="edit" name="edit" value="ADD" /> 
						<input type="hidden" name="prdtPrmtCode" value="W" /> 
						<input type="hidden" name="oldPrdtPrmtCode" value="W" /> 
						<input type="hidden" name="prdtPrmtYn" /> <input type="hidden" name="productErpYn" value="false" />
						<div class="grid-box">
							<div class="fl-1">
								<h5><i class="fa fa-plus-square"></i>상품 기본정보</h5>
							</div>
						</div>

						<table>
							<colgroup>
								<col width="15%" />
								<col width="*" />
								<col width="13%" />
								<col width="37%" />
							</colgroup>
							<tbody>
								<tr>
									<th><b>업체</b><i class="fa fa-check"></i></th>
									<td colspan="3">
									<select id="idVndrCntrtId" name="vndrCntrtId">
											<option value="">선택해주세요</option>
											<c:forEach var="vendor" items="${vendorList}">
											<option value="${vendor.vndrCntrtId}"><c:out value="${vendor.vndrName}"></c:out>(수수료:${vendor.vndrCmsnRate}%)</option>
											</c:forEach>
									</select>
									</td>
								</tr>
								<tr>
									<th><b>영문/국문상품명</b><i class="fa fa-check"></i></th>
									<td colspan="3">
									<input type="text" name="prdtEngName" style="width: 35%" maxlength="50" />&nbsp;/&nbsp; 
									<input type="text" name="prdtKorName" style="width: 35%" maxlength="50" />
										</td>
								</tr>
								<tr>
									<th><b>상품코드</b></th>
									<td><span class="bold fc-01">[자동생성]</span> <input
										type="hidden" name="prdtCode" /></td>
									<th><b>브랜드</b><i class="fa fa-check"></i></th>
									<td><input type="text" id="brandName" name="brandName"
										style="width: 100px;" value readonly="readonly" /> 
										<input type="hidden" id="brandId" name="brandId" style="width: 150px;" value="" /> 
										<!-- <a href="javascript://" class="btn btn-blue btn-search" onclick="openBrandPopup();"><i class="fa fa-search-plus"></i></a> -->
										<button type="button" class="btn btn-blue btn-search" onclick="openBrandPopup();"><i class="fa fa-search-plus"></i></button>
									</td>
								</tr>
								<tr>
									<th><b>원산지</b><i class="fa fa-check"></i></th>
									<td>
									<select id="idCooCode" name="cooCode" class="select_class">
										<option value="">선택해주세요</option>
										<c:forEach var="origin" items="${originList}">
										<option value="${origin.codeName}"><c:out value="${origin.codeValue}"></c:out></option>
										</c:forEach>
									</select>
									</td>
									<th><b>판매여부</b></th>
									<td><input type="radio" name="prdtStatCode" value="P"
										checked="checked" id="prdtStatCode1"> <label
										for="prdtStatCode1">판매중&nbsp;</label> <input type="radio"
										name="prdtStatCode" value="S" id="prdtStatCode2"> <label
										for="prdtStatCode2">일시품절&nbsp;</label> <input type="radio"
										name="prdtStatCode" value="F" id="prdtStatCode3"> <label
										for="prdtStatCode3">판매중지&nbsp;</label></td>
								</tr>
								<tr>
									<th><b>제조사</b><i class="fa fa-check"></i></th>
									<td><input type="text" name="mnftrName" style="width: 150px;" value="" maxlength="40"></td>
									<th><b>전시여부</b></th>
									<td>
									<input type="radio" name="dispYn" value="true" checked="checked" id="dispYn1"> 
									<label for="dispYn1">전시&nbsp;</label>
									<input type="radio" name="dispYn" value="false" id="dispYn2">
									<label for="dispYn2">미전시&nbsp;</label>
									</td>
								</tr>
								<tr>
									<th><b>상단아이콘설정</b></th>
									<td colspan="3"><input type="checkbox" name="upIconCode"
										value="01" id="upIconCode1"> <label for="upIconCode1">신상품&nbsp;</label>
										<input type="checkbox" name="upIconCode" value="02"
										id="upIconCode2"> <label for="upIconCode2">추천상품&nbsp;</label>
										<input type="checkbox" name="upIconCode" value="03"
										id="upIconCode3"> <label for="upIconCode3">인기상품&nbsp;</label>
										<input type="checkbox" name="upIconCode" value="04"
										id="upIconCode4"> <label for="upIconCode4">베스트상품&nbsp;</label>
										<input type="checkbox" name="upIconCode" value="05"
										id="upIconCode5"> <label for="upIconCode5">HIT&nbsp;</label>
										<input type="checkbox" name="upIconCode" value="06"
										id="upIconCode6"> <label for="upIconCode6">NEW&nbsp;</label>
									</td>
								</tr>
								<tr>
									<th><b>하단아이콘설정</b></th>
									<td colspan="3"><input type="checkbox" name="downIconCode"
										value="07" id="downIconCode1"> <label
										for="downIconCode1">세일&nbsp;</label> <input type="checkbox"
										name="downIconCode" value="08" id="downIconCode2"> <label
										for="downIconCode2">단독&nbsp;</label> <input type="checkbox"
										name="downIconCode" value="09" id="downIconCode3"> <label
										for="downIconCode3">이벤트&nbsp;</label> <input type="checkbox"
										name="downIconCode" value="10" id="downIconCode4"> <label
										for="downIconCode4">기획&nbsp;</label></td>
								</tr>
								<tr>
									<th><b>키워드설정</b></th>
									<td colspan="3"><input type="text" name="srchWord"
										style="width: 60%;" value="" maxlength="255"
										onkeydown="modifyEnter();"> ※키워들를 쉼표(,)로 구분하여 주세요.</td>
								</tr>
							</tbody>
						</table>
					</div><br>
					<div class="form-group table mt30">
						<h5 class="mb5"><i class="fa fa-plus-square"></i>상품 분류정보</h5>
						<table class="prdtCtgrList group-center">
							<colgroup>
								<col width="12%">
								<col width="*">
								<col width="8%">
							</colgroup>
							<tbody>
								<tr>
									<td colspan="3" class="t1 form">
									<span id="listProductSelectCategory"> 
									<select id="selectParentCategory" name="category">
												<option>---- 선택 ----</option> 
												<c:forEach var="category" items="${categoryList}" varStatus="status">
												<option value="${category.ctgrId}"><c:out value="${category.ctgrName}"></c:out></option>
												</c:forEach>
										</select>
								<%-- 		<select name="" id="selectChildCategory">
										<option>---- 선택 ----</option>
										<c:forEach var="child" items="${cagoChildList}">
										<option value="${child.prntCtgrId}"><c:out value="${child.ctgrName}"></c:out></option>
										</c:forEach>
										</select> --%>
									</span> 
									<a href="javascript://" class="btn btn-blue prdtCategoryAddBtn">추가<i class="fa-fa-list-add"></i></a>
									</td>
								</tr>
								<tr>
									<th><b>기준상품분류</b></th>
									<th><b>상품분류정보</b></th>
									<th><b>삭제</b></th>
								</tr>

							</tbody>
						</table>
					</div><br>
					<div class="form-group table mt30">
						<h5 class="mb5"><i class="fa fa-plus-square"></i>상품 가격정보<br></h5>
						<table>
							<colgroup>
								<col width="15%">
								<col width="*">
								<col width="15%">
								<col width="35%">
							</colgroup>
							<tbody>
								<tr>
									<th><b>정상가</b><i class="fa fa-check"></i></th>
									<td><input type="text" name="prdtSellPrice" value=""
										style="width: 80%; ime-mode: disabled;" maxlength="8"
										class="inputNumberText" onblur="chngErpSellPriceRate();">원
									</td>
									<th><b>판매가</b><i class="fa fa-check"></i></th>
									<td>
									<input type="text" name="dscntErpSellPrice" value="" style="width: 57%; ime-mode: disabled;" maxlength="8"
										class="inputNumberText" onblur="chngErpSellPriceRate();">원
										&nbsp; 할인율 
										<input type="text" name="erpSellPriceRate" style="width: 10%;" value="" readonly="readonly">%</td>
								</tr>
								<tr>
									<th><b>최소구매수량</b><i class="fa fa-check"></i></th>
									<td><input type="text" name="minBuyCount" value="1"
										style="width: 35%;" maxlength="5" class="inputNumberText">
									</td>
									<th><b>최대구매수량</b><i class="fa fa-check"></i></th>
									<td><input type="text" name="maxBuyCount" value="99999"
										style="width: 35%;" maxlength="5" class="inputNumberText">
									</td>
								</tr>
								<tr>
									<th><b>배송비구분</b><i class="fa fa-check"></i></th>
									<td colspan="3"><input type="radio" name="freeDlvyYn"
										value="true" id="freeDlvyYn1"><label for="freeDlvyYn1">무료&nbsp;</label>


										<input type="radio" name="freeDlvyYn" value="false"
										checked="checked" id="freeDlvyYn2"><label
										for="freeDlvyYn2">유료&nbsp;</label></td>
								</tr>
							</tbody>
						</table>
					</div><br>
					<div class="form-group table mt30">
						<h5 class="mb5">
							<i class="fa fa-plus-square"></i>상품 옵션정보
						</h5>
						<table class="group-center">
							<colgroup>
								<col width="15%">
								<col width="*">
								<col width="15%">
								<col width="35%">
							</colgroup>
							<tbody>
								<tr>
									<th><b>옵션사용여부</b><i class="fa fa-check"></i></th>
									<td class="align-left">
									<select name="optnUseYn" class="selectOptnUseYn">
											<option value="true">사용</option>
											<option value="false" selected="">사용안함</option>
									</select>
									</td>
									<th>
									<span style="display:;" class="toggleUseOptnArea"><b>옵션재고</b></span>
									<span style="display: none;" class="toggleUseOptnArea">옵션분류 추가</span><i class="fa fa-check"></i>
									</th>
									<td class="align-left">
										<p style="display:;" class="toggleUseOptnArea">
											<input type="text" name="stockCount" value="0" class="inputNumberText" style="width: 80%">
										</p>

										<p style="display: none;" class="toggleUseOptnArea">
											<!-- <a href="#행추가" id="btnAddOptionMaster" 
												class="btn btn-blue btnAddOptionMaster btnInvisible" style="width:50px; height:25px;">추가+<i class="entypo-list-add"></i></a> -->
											<button type="button" class="btn btn-blue btnAddOptionMaster optionHideBtn" id="btnAddOptionMaster">추가+</button>
										</p>

									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div id="optionMasterArea" class="form-group table"></div>
					<div class="grid-box toggleUseOptnArea" style="display: none">
						<div class="fl-r">
							<a href="#옵션재고추가" id="optionAdd" onclick="optnAddTable()" class="btn btn-blue addOptionStockSelect optionAddDel">옵션재고추가</a>
							<a href="#옵션재고삭제" id="optionDel" onclick="optnDelTable()" class="btn btn-danger respectOptionStockSelect optionAddDel" style="display: none">옵션재고삭제</a>
						</div>
					</div>
					<div id="addOptionSelectArea" class="form-group table"></div>
					<div id="optionSelectArea" class="form-group table"></div>
					<br>

					<div class="form-group table mt30">
						<h5 class="mb5">
							<i class="fa fa-plus-square"></i>관련상품정보
						</h5>
						<table>
							<colgroup>
								<col width="20%">
								<col width="*">
							</colgroup>
							<tbody>
								<tr>
									<th><b>관련상품정보 설정</b></th>
									<td><input type="radio" name="cntrPrdtUseYn" value="true"
										class="cntrPrdtUseYn" id="cntrPrdtUseYn1"><label
										for="cntrPrdtUseYn1">관련상품있음&nbsp;</label> <input type="radio"
										name="cntrPrdtUseYn" value="false" class="cntrPrdtUseYn"
										checked="checked" id="cntrPrdtUseYn2"><label
										for="cntrPrdtUseYn2">관련상품없음&nbsp;</label></td>
								</tr>
							</tbody>
						</table>

						<div id="cntrPrdtList" style="display: none;">
							<div class="grid-box mb5">
								<div class="fl-r">
									<a href="javascript://" onclick="openProductPopup('callback=setProductVal&multYn=Y');"
										title="새창에서 열림" class="btn btn-sm btn-blue">관련상품추가<i class="entypo-popup"></i></a>
								</div>
							</div>
							<table id="tableCntrPrdtList" class="group-center">
								<colgroup>
									<col width="8%">
									<col width="15%">
									<col width="*">
									<col width="15%">
									<col width="20%">
									<col width="8%">
								</colgroup>
								<tbody id="tbodyCntrPrdtList">
									<tr>
										<th>번호</th>
										<th>상품코드</th>
										<th>상품명</th>
										<th>브랜드</th>
										<th>상품분류</th>
										<th>삭제</th>
									</tr>
								</tbody>
							</table>
						</div>
					</div><br>
					<div class="form-group table mt30">
						<h5 class="mb5"><i class="fa fa-plus-square"></i>정보고시정보</h5>
						<p class="mb5">
							<select name="prntFtcInfoSeq">
								<option value="">선택해 주세요</option>
							<c:forEach var="ftcInfo" items="${ftcInfo}">
								<option value="${ftcInfo.ftcInfoSeq}"><c:out value="${ftcInfo.ftcInfoName}"></c:out></option>
							</c:forEach>
							</select>

						</p>
						<div id="ftcInfoList"></div>
					</div>
					<div class="form-group table mt30">
						<!-- start image_register -->
						<br>
						<div class="image_register">
							<h5 class="mb5"><i class="fa fa-plus-square"></i>상품 이미지정보</h5>
							<table>
								<colgroup>
									<col width="41%">
									<col width="*">
								</colgroup>
								<tbody>
									<tr>
										<td>
											<div class="images_view">
												<p class="big_size">
													<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
														alt="hello" id="prdtImagePath" class="lazy-loading"
														width="250" height="250" onerror="imageError(this)">
												</p>
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>

												<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
													alt="hello" id="prdtImagePath1"
													class="lazy-loading smallImage" width="50" height="50"
													onerror="imageError(this)">
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>

												<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
													alt="hello" id="prdtImagePath2"
													class="lazy-loading smallImage" width="50" height="50"
													onerror="imageError(this)">
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>

												<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
													alt="hello" id="prdtImagePath3"
													class="lazy-loading smallImage" width="50" height="50"
													onerror="imageError(this)">
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>

												<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
													alt="hello" id="prdtImagePath4"
													class="lazy-loading smallImage" width="50" height="50"
													onerror="imageError(this)">
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>

												<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
													alt="hello" id="prdtImagePath5"
													class="lazy-loading smallImage" width="50" height="50"
													onerror="imageError(this)">
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>

												<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
													alt="hello" id="prdtImagePath6"
													class="lazy-loading smallImage" width="50" height="50"
													onerror="imageError(this)">
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>

												<img src="//image.crewmate.co.kr/demoshop/noimage.gif"
													alt="hello" id="prdtImagePath7"
													class="lazy-loading smallImage" width="50" height="50"
													onerror="imageError(this)">
												<noscript>
													<img src="//image.crewmate.co.kr" />
												</noscript>
											</div>
											<!-- end images_view -->
										</td>
										<td class="register">
											<ul>
												<li>최적의 이미지 사이즈는 <span class="fc-01">400 x 400pixel</span>입니다.</li>
												<li>파일명은 영문/숫자의 조합만 가능합니다.</li>
												<li>JPG 또는 GIF만 등록 가능합니다.</li>
											</ul>
											<ul class="register">
												<li class="first-child mb5"><span class="fc-01" style="color:red;">필수 </span> 
													1. 대표이미지 
													<input type="text" id="prdtImagePath01" name="prdtImagePaths" style="width: 55%;" value="" class="">
													<input type="hidden" name="prdtImageCodes" value="01">
													<input type="file" id="prdtImageFile01" name="prdtImageFile01" onchange="displayFile(this, 'prdtImagePath01', 'prdtImagePath1');" style="display: none;"> 
													<button type="button" onclick="openFile('prdtImageFile01');" class="btn btn-blue">찾아보기<i class="fa-folder"></i></button> 
													<button type="button" class="btn btn-danger btn-search" onclick="clearImg(1);">X</button></li>
														
												<li class="first-child mb5"><span class="fc-01" style="color:red;">선택</span>
													2. 추가이미지 
													<input type="text" id="prdtImagePath02" name="prdtImagePaths" style="width: 55%;" value="" class="">
													<input type="hidden" name="prdtImageCodes" value="02">
													<input type="file" id="prdtImageFile02" name="prdtImageFile02" onchange="displayFile(this, 'prdtImagePath02', 'prdtImagePath2');" style="display: none;"> 
													<button type="button" onclick="openFile('prdtImageFile02');" class="btn btn-blue">찾아보기<i class="fa-folder"></i></button> 
													<button type="button" class="btn btn-danger" onclick="clearImg(2);">X</button></li>

												<li class="first-child mb5"><span class="fc-01" style="color:red;">선택</span>
													3. 추가이미지 
													<input type="text" id="prdtImagePath03" name="prdtImagePaths" style="width: 55%;" value="" class="">
													<input type="hidden" name="prdtImageCodes" value="03">
													<input type="file" id="prdtImageFile03" name="prdtImageFile03" onchange="displayFile(this, 'prdtImagePath03', 'prdtImagePath3');" style="display: none;"> 
													<button type="button" onclick="openFile('prdtImageFile03');" class="btn btn-blue">찾아보기<i class="fa-folder"></i></button> 
													<button type="button"class="btn btn-danger" onclick="clearImg(3);">X</button></li>

												<li class="first-child mb5"><span class="fc-01" style="color:red;">선택</span>
													4. 추가이미지 
													<input type="text" id="prdtImagePath04" name="prdtImagePaths" style="width: 55%;" value="" class="">
													<input type="hidden" name="prdtImageCodes" value="04">
													<input type="file" id="prdtImageFile04" name="prdtImageFile04" onchange="displayFile(this, 'prdtImagePath04', 'prdtImagePath4');" style="display: none;"> 
													<button type="button" onclick="openFile('prdtImageFile04');" class="btn btn-blue">찾아보기<i class="fa-folder"></i></button> 
													<button type="button" class="btn btn-danger" onclick="clearImg(4);">X</button></li>

												<li class="first-child mb5"><span class="fc-01" style="color:red;">선택</span>
													5. 추가이미지 
													<input type="text" id="prdtImagePath05" name="prdtImagePaths" style="width: 55%;" value="" class="">
													<input type="hidden" name="prdtImageCodes" value="05">
													<input type="file" id="prdtImageFile05" name="prdtImageFile05" onchange="displayFile(this, 'prdtImagePath05', 'prdtImagePath5');" style="display: none;"> 
													<button type="button" onclick="openFile('prdtImageFile05');" class="btn btn-blue">찾아보기<i class="fa-folder"></i></button> 
													<button type="button" class="btn btn-danger" onclick="clearImg(5);">X</button></li>

												<li class="first-child mb5"><span class="fc-01" style="color:red;">선택</span>
													6. 메인이미지 
													<input type="text" id="prdtImagePath06" name="prdtImagePaths" style="width: 55%;" value="" class="">
													<input type="hidden" name="prdtImageCodes" value="06">
													<input type="file" id="prdtImageFile06" name="prdtImageFile06" onchange="displayFile(this, 'prdtImagePath06', 'prdtImagePath6');" style="display: none;"> 
													<button type="button" onclick="openFile('prdtImageFile06');" class="btn btn-blue">찾아보기<i class="fa-folder"></i></button> 
													<button type="button" class="btn btn-danger" onclick="clearImg(6);">X</button></li>

												<li class="first-child mb5"><span class="fc-01" style="color:red;">선택</span>
													7. 목록이미지 
													<input type="text" id="prdtImagePath07" name="prdtImagePaths" style="width: 55%;" value="" class="">
													<input type="hidden" name="prdtImageCodes" value="07">
													<input type="file" id="prdtImageFile07" name="prdtImageFile07" onchange="displayFile(this, 'prdtImagePath07', 'prdtImagePath7');" style="display: none;"> 
													<button type="button" onclick="openFile('prdtImageFile07');" class="btn btn-blue">찾아보기<i class="fa-folder"></i></button> 
													<button type="button" class="btn btn-danger" onclick="clearImg(7);">X</button></li>
													
											</ul><br>
											<p>메인/목록 이미지를 등록하지 않으면 대표이미지가 축소되어 저장됩니다.</p>
											<p>메인이미지의 최적 사이즈는 200 * 200 pixel 입니다.</p>
											<p>목록이미지의 최적 사이즈는 150 * 150 pixel 입니다.</p>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<!-- end image_register -->
					</div>
					<br>
					<div class="form-group table mt30">
						<h5 class="mb5">
							<i class="fa fa-plus-square"></i>상품 상세정보
						</h5>
						텍스트 및 이미지로 제작한 파일을 업로드 해주세요.(동영상은 업로드 불가합니다.)<br><br>
						<table>
							<tbody>
								<tr>
									<td>
											<textarea name="prdtDtlInfo" id="prdtDtlInfo" rows="8" cols="60" style="visibility: hidden; display: none;"></textarea>
											<script type="text/javascript" src="/ckeditor/ckeditor.js?t=B37D54V"></script> 
											<script>
 												var ckeditor_config = {
   												resize_enaleb : false,
   												enterMode : CKEDITOR.ENTER_BR,
   												shiftEnterMode : CKEDITOR.ENTER_P,
   												filebrowserUploadUrl : "/board/image"
 												};
 
												 CKEDITOR.replace("prdtDtlInfo", ckeditor_config);
											</script>
									</td>
								</tr>
							</tbody>
						</table><br>
						<div class="grid-box">
							<p class="fl-r">
								<button type="button" class="btn btn-blue modifyProduct" id="create" style="width:50px; height:25px; float: right;" onclick="editProductForm()">저장</button>
							</p>								
						</div>
					</div>
				</form>
			</section>
		</article>
	</div>
</div>
</body>
<script type="text/javascript">
	
/*브랜드 팝업창 열기*/		
function openBrandPopup(){
	var brandPopup = window.open("/product/popupBrandList/popup","brandPopup","width=987,height=876, scrollbars=yes, resizable=yes");		
}  
	
/*브랜드 팝업 값넣고 창 닫기*/
function setBrandVal(brandName, brandId){
	$("#brandName").val(brandName);
	$("#brandId").val(brandId);
}

/*관련상품정보 팝업창 열기*/
function openProductPopup(){
	var productPopup = window.open("/product/popupProductList/popup","productPopup","width=1014,height=949, resizable=yes");
}

/*상품목록조회 팝업 관련상품정보에 값넣고 창 닫기*/
function setProductVal(data){
	let html = "";
	let cnt = 1;// 번호
	data.list.forEach((data) =>{
	 console.log(data);
	 html += 				"<tr>"
			  +						"<td>" 
			  +            (cnt++)  
			  +            "</td>"
		    +            "<td>"
		    +             data.prdtCode+" <input type='hidden' id='prdtCode' name='prdtCode' style='width: 100px;' value='' readonly='readonly' />"
		    +            "</td>"
		    +            "<td>"
		    +             data.prdtEngName
		    +            "</td>"
		    +            "<td>"
		    +             data.brandName
		    +            "</td>"
		    +            "<td>"
		    +             data.ctgrName
		    +            "</td>"
		    +            "<td>"
		    +                "<a href='javascript://' class='btn btn-sm btn-danger btnCntrPrdtDelete' id='remove'>삭제</a>"
		    +            "</td>"
	      +            "</tr>"
	});
		$("#tbodyCntrPrdtList").append(html);
// 			$("#tableCntrPrdtList").val(html);
		$('#tableCntrPrdtList').focus(); 
	   /*  $("count").val(count);
			$("prdtCode").val(prdtCode);
			$("prdtEngName").val(prdtEngName);
			$("brandName").val(brandName);
			$("ctgrName").val(ctgrName); */
}	

/*할인율*/
function chngErpSellPriceRate() {
   var sellPrice = $('input[name="prdtSellPrice"]').val();//정상가
   var erpSellPrice = $('input[name="dscntErpSellPrice"]').val();//판매가

   if (sellPrice == ''){
       sellPrice = 0;
   }
   if (erpSellPrice == ''){
       erpSellPrice = 0;
   }
       
   var result = 100 - (parseInt(erpSellPrice) / parseInt(sellPrice) * 100);     
   $('input[name="erpSellPriceRate"]').val(parseInt(result));
   $("._dscntSellPrice").html($("input[name='dscntErpSellPrice']").val());    
   return false;
}
	/*상품 분류정보_(자식)*/
/*	function selectChange(prntCtgrId) {
		//var value = $('select[id=selectChildCategory]').last().val();				
		$.ajax({
			url : "/product/childCategory",
			data : { prntCtgrId : prntCtgrId }
		,	dataType : 'json'
		,	success : function(data){

				var html = '';
				var list = data.infoMap.cagoList;
				if(list.length > 0){
					
					html += "<select onChange='selectChange(this.value);'>";
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
	}	*/

	/*상품 분류정보_(부모)*/
/*	$(document).on('change', 'select[id=selectParentCategory]' ,function(){	
			$(this).nextAll().remove();
			var value = $('select[id=selectParentCategory]').last().val();
		
		 $.ajax({
			url : "/product/childCategory",
			data : { prntCtgrId : value },
			dataType : 'json',
			success : function(data){
				
				var html = '';
				var list = data.infoMap.cagoList;
				if(list.length > 0){
					
				html += "<select onChange='selectChange(this.value);'>";
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
	})	 */	
	/*상품 분류정보*/
	$(document).on('change', 'select[name=category]' ,function(){   
        $(this).nextAll().remove();
        var value = $('select[name=category]').last().val();
     
      $.ajax({
        url : "/product/childCategory",
        data : { prntCtgrId : value },
        dataType : 'json',
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
		


	/*정보고시정보 하위(textArea)*/
	$(document).on("change", "select[name='prntFtcInfoSeq']", function(){
			
			var value = $('select[name="prntFtcInfoSeq"]').val();
			var html = '';
		$.ajax({
				type: "get"
			,	url: "/product/childFtcInfo"
			, data: {'prntFtcInfoSeq' : value}
			, dataType: "json"
			, success: function(data){
				
				 var list = data.infoMap.ftcInfoList;
				console.log(list);
				
		 html += "<colgroup>";
		 html +=    "<col width='20%'>";
		 html +=		 "<col width='*'>";
		 html +=	"</colgroup>";
		 html += "<tbody>";
						 
				for(var i=0; i<list.length; i++){
					html += "<tr>";
					html +=     "<th>"+list[i].ftcInfoName+"</th>";
					html +=		 "<td><textarea name='infNotcConts' id='aaa' style='width:60%'></textarea>";
					html +=          "<input type='checkbox' class='expsrYns' id='expsrYns0'>";
					html +=          "<label for='expsrYns0'>해당없음</label>";
					html +=         "<input type='hidden' name='ftcInfoSeqs' value="+list[i].ftcInfoSeq+">";
					html +=         "<input type='hidden' name='expsrYns' value='false'>";
					html +=		 "</td>";
					html += "</tr>";
				}		 
					html +="</tbody>";
					html +="</table>";	 
					
						$("#ftcInfoList").html(html);
			}
	
		});
	});
	
jQuery(function($) {
	$("a.selected").each(function() {
        var parent = $(this).parent("li");
        $(parent).addClass("active");
        $(parent).parent().slideToggle(200);
    });
	
	/*상품 분류정보 추가*/	
	$('a.prdtCategoryAddBtn').click(function(){
			
			var span = document.getElementById("listProductSelectCategory");
			var ctgrId = '';
			ctgrId= $('span').children('select').last().val();
			console.log(ctgrId)				
 			$.ajax({
				url : '/product/addList'
				, data : { ctgrId : ctgrId }
				, dataType : 'json'
				, success : function (data){
								var list = data.infoMap.cagoAddList;
						if(list.length >0){
							if($('input[name="ctgrIds"]').filter('input[value="'+ list[0].ctgrId + '"]').length !=0){
									alert('이미 선택한 카테고리 입니다.');
								}else{
							console.log(list);
								var html = '<tr><td><input type="radio" id="stdCtrgYnId" name="stdCtgrYnId" value="' + list[0].ctgrId + '"/></td><td class="align-left">\n';
								html += list[0].ctgrName + '<input type="hidden" name="ctgrIds" value="' + list[0].ctgrId +'"/>\n';
								html += '</td><td><a href="javascipt://" class="btn btn-danger prdtCategoryDelBtn" id="remove">삭제</a></td></tr>\n';
								
								 $('table.prdtCtgrList').append(html);
								}
						} else {
							alert("없음");
						}
				}
			}); 
	});
	//순서
	var index=1;
	$('.selectOptnUseYn').on("change", function(){
		index=1;
	});
	
	/*옵션 추가*/
	$('#btnAddOptionMaster').on("click", function(){	
		//console.log("22")
		//var index ='';
		var html ='';
		 html += "<table class='optionTable' id='optionTable"+index+"'>";
		 html += "<colgroup>";
		 html += 		"<col width='20%''>";
		 html +=		"<col width='*'>";
		 html += 		"<col width='30%'>";
		 html += 		"<col width='20%'>";
		 html += "</colgroup>";
		 html += "<tbody id='optionDetailArea"+index+"'>";
		 html += 				"<tr>";
		 html +=							"<td colspan='4' class='align-left'>";
		 html +=								"<div class='fl-1'>";
		 html +=									"<input type='hidden' name='optnMstrOrderKeys' value='"+index+"'>&nbsp;순서</input>";
		 html +=									"<i class='fa fa-check'></i>";
		 html +=									"<input type='text' name='optnMstrOrders' value='"+index+"' maxlength='3' class='inputNumberText optnReadOnly' style='width:15%'>&nbsp;옵션분류명</input>";
 		 html +=									"<i class='fa fa-check'></i>";
 		 html +=									"<input type='text' name='optnMstrNames' maxlength='15' style='width:35%' value class='optnReadOnly'/>";
 		 html +=									"<input type='hidden' name='optnMstrIds' value=\"" + String(index).padStart(3,'0') + "\">";
 		 html +=								"</div>";
 		 html +=								"<div class='fl-r'>";
 		 html +=									"<button type='button' class='btn btn-blue btnInvisible optionHideBtn' tableId='optionTable"+index+"' onclick='addOptnLine("+index+")' style='margin-right:10px;' >행추가</button>";
 		 html +=									"<button type='button' class='btn btn-danger btnInvisible optionHideBtn' tableId='optionTable"+index+"' onclick='delOptn(this)'>삭제</button>";//테이블 전체삭제
 		 html +=								"</div>";
 		 html +=							"</td>";
 		 html +=		 		"</tr>";	
 		 html +=				"<tr>";
 		 html +=							"<th>옵션ID<i class='fa fa-check'></i>";
 		 html +=							"</th>";
 		 html +=							"<th>옵션명<i class='fa fa-check'></i>";
 		 html +=							"</th>";
 		 html +=							"<th>추가금액(원)<i class='fa fa-check'></i>";
 		 html +=							"</th>";
 		 html +=							"<th>삭제</th>";
 		 html +=				"</tr>";
 		 html +=				"<tr>";
 		 html +=							"<td>";
 		 html +=								"<input type='text' name='optnDetailIds' maxlength='3' value='01' style='width:90%' class='optnReadOnly'/>";
 		 html +=								"<input type='hidden' name='optnDetailMstrOrders' value='"+index+"'/>";
 		 html +=							"</td>";
 		 html +=							"<td>";
 		 html +=								"<input type='text' name='optnDetailValues' maxlength='15' value style='width:90%' class='optnReadOnly'/>";
 		 html +=							"</td>";
 		 html +=							"<td>";
 		 html +=								"<input type='text' name='optnDetailAmts' maxlength='15' value='0' style='width:90%' class='inputNumberText optnReadOnly'/>";
 		 html +=							"</td>";
 		 html +=							"<td>";
 		 html +=								"<button type='button' class='btn btn-danger btnDeleteOptionDetail btnInvisible optionHideBtn' tableId='optionTable"+index+"' onclick='delOptnLine(this)'>삭제</button>";
 		 html +=							"</td>";
 		 html +=			 "</tr>";
 		 html +="</tbody>";
		 html +="</table>";
									 $("#optionMasterArea").append(html);	 
	    index++;
   });
	
	  /*옵션재고 추가클릭*/
/* 	  $(".addOptionStockSelect").click(function() {
		  console.log("11")
		   var html ='';
		     	html += "<div id='optionSelectArea' class='form-group table'>";
		     	html += "<table id='tableOptionSelecter' class='group-center mt30 optionMasterTables'>";
		     	html += "<colgroup>";
		     	html += "<col width='10%'>";
		     	html += "<col width='*'>";
		     	html += "<col width='18%'>";
		     	html += "<col width='18%'>";
		     	html += "<col width='15%'>";
		     	html += "<col width='15%'>";
		     	html += "</colgroup>";
		     	html += "<tbody><tr>";
		     	html += "<th>사용여부</th>";
		     	html += "<th>옵션명</th>";
		     	html += "<th>판매금액</th>";
		     	html += "<th>추가금액</th>";
		     	html += "<th>재고<i class='fa fa-check'></th>";
		     	html += "<th>전시여부</th></tr>";
		     	html += "<tr>";
		     	html += "<td><input type='checkbox' name='selectStockIndex' value='0'></td>";
		     	html += "<td>";
		     	html += "<input type='hidden' name='stockIndex' value=''>";
		     	html += "<input type='hidden' name='selectedOptnDtlIds' value=''>";
		     	html += "<input type='hidden' name='stockSeqs' value=''>";
		     	html += "</td>";
		     	html += "<td class='align-right'>";
		     	html += "<span class='_dscntSellPrice'></span>원</td>";
		     	html += "<td class=align-right>원</td>";
		     	html += "<td><input type='text' name='selectedStockCounts' value='' style='width:80%' class='inputNumberText'></td>";
		     	html += "<td><select name='selectedOptnDispYns'>;"
		     	html += "<option value='true' selected>예</option>";
		     	html += "<option value='false'>아니오</option></select></td>";
		   	  html += "</tr></tbody></table></div>";
		   				$("#addOptionSelectArea").append(html);
	  }); */
	
		/*옵션재고 추가클릭*///일단 안됨ㅜ
		$(".addOptionStockSelect").click(function() {
		    if ($(".optionTable").length ==0) {
		      alert('옵션는(은) 생략할 수 없습니다.');
		      return false;
		    }		
	 }); 
	
});//jquery 끝나는부분

	 /*행추가*/
	 function addOptnLine(index){
			var tableId = $(index).attr('tableId');
		
		  var html='';
		    	html += "<tr>";
		    	html +=	"<td>";
		    	html +=		"<input type='text' name='optnDetailIds' maxlength='3' value='' class='optnReadOnly' id='optnDetailIds1'/>";
		    	html +=		"<input type='hidden' name='optnDetailMstrOrders' value='"+index+"' />";
		    	html +=	"</td>";
		    	html +=	"<td>";
		    	html +=		"<input type='text' style='width:90%' class='optnReadOnly' name='optnDetailValues' maxlength='15' />";
		    	html +=	"</td>";
		    	html +=	"<td>";
		    	html +=		"<input type='text' style='width:90%' class='inputNumberText optnReadOnly' name='optnDetailAmts' maxlength='15' value='0' />";
		    	html +=	"</td>";
		    	html +="<td>";
		    	html +=		"<button type='button' class='btn btn-danger btnInvisible optionHideBtn' onclick='delOptnLine(this)'>삭제</button>";
		    	html +=	"</td>";
		    	html +="</tr>"
			$("#optionDetailArea"+index).append(html)//tbody부분에 추가   
	 }
	 
	 /*테이블 전체삭제*/
	 function delOptn(index){
		 var tableId = $(index).attr('tableId');
		 $('#'+tableId).remove();
	 }
	 /*상세내용 삭제*/
	 function delOptnLine(element){
			$(element).parents("tr").remove();
	 }
	 /*옵션재고 추가클릭*/
	 function optnAddTable(){	 
		 $(".optionAddDel").toggle();//옵션재고삭제 버튼으로 바뀜
	 //table숫자 구하기
	 var optnArr=[];//전체 테이블
	 var trArr=[]; //tr하나씩 담을 배열[table안 옵션행]
	 optnArr = $("#optionMasterArea").find('tbody');
	 
	 var trCount = 1;// 총 행의갯수	 // tr의 갯수 2*3*2=12
	 for(var i =0; i<optnArr.length; i++){
		 trCount *=optnArr[i].querySelectorAll('tr').length-2;//순서,옵션분류명/옵션Id칸은 빼줘야하니깐
		 trArr.push(optnArr[i].querySelectorAll('tr'));
	 }
		console.log(trCount+":총 행의갯수")
		console.log(trArr+":tr")
		
	 var validation = optionSelectAreaValidation(optnArr,trArr);
	 if(!validation)
		 return false;
	 $(".optionHideBtn").hide();//삭제버튼
	 $("#optionAdd").hide();//행추가버튼
	 $("#optionDel").show();
	 $(".optnReadOnly").prop("readonly", true);//읽기전용으로 속성바꾸기
	 
	 /*옵션재고추가클릭시 */
  var html = '';
     	html += "<table id='tableOptionSelecter' class='group-center mt30 optionMasterTables'>";
     	html += "<colgroup>";
     	html += "<col width='10%'>";
     	html += "<col width='*'>";
     	html += "<col width='18%'>";
     	html += "<col width='18%'>";
     	html += "<col width='15%'>";
     	html += "<col width='15%'>";
     	html += "</colgroup>";
     	html += "<tbody><tr>";
     	html += "<th>사용여부</th>";
     	html += "<th>옵션명</th>";
     	html += "<th>판매금액</th>"; 
     	html += "<th>추가금액</th>";
     	html += "<th>재고<i class='fa fa-check'></th>";
     	html += "<th>전시여부</th></tr>";
     	html += "<tr>";
     	$("#optionSelectArea").append(html);
	 
	 var totalCount = trCount;//최종 총 행의 갯수
	
	 //각각의 행에 있는 옵션Id, 옵션명, 추가금액 담을 배열
	 var optnDetailIds = new Array(trCount);
	 var optnDetailValues =  new Array(trCount);
	 var optnDetailAmts = new Array(trCount);
	 // 각각의 배열(Id, 옵션명, 추가금액)안에 배열
	 for(var i =0; i<trCount; i++){
		 optnDetailIds[i] =  new Array();//아이디
		 optnDetailValues[i] = new Array();//옵션명
		 optnDetailAmts[i] = new Array();//추가금액
		
	 }
		var trIndex = trCount;// 행의 수
		var totalIndex = 0;//전체 행의수
	
		//console.log(optnArr)
	 for(var i=0; i<optnArr.length; i++){
		 var count = 0;
		 var optnMstrOrders = trArr[i][0].querySelector("input[name=optnMstrOrders]").value;//순서 
		 var optnMstrNames = trArr[i][0].querySelector("input[name=optnMstrNames]").value;//옵션분류명
		 optnMstrOrders = optnMstrOrders.padStart(3,'0');//value값에 001 이렇게 들어감 /세자리를 0으로
	 		console.log(optnMstrOrders+"순서")
		 var elementCount = optnArr[i].length-2;
		
		 trIndex = trIndex/(trArr[i].length-2);// 한 테이블내에 -2한 값(2줄빼야해서)
		 totalIndex = totalCount/trIndex;
		 for(var j=0; j<totalIndex; j++){
			 var trArrIndex = j%(trArr[i].length-2);//전체에서 한 테이블을 나누기 한값//12/2하면 2개를 6으로 각각 넣어준다
			 
			 console.log("index i : "+i)
				console.log("index J : "+j)
			//옵션ID	-trArrIndex+2한이유 : 앞서 -2를 했으니깐 그거를 +2해줘야 옵션 Id값을 읽어올수가 있음
			 var optnId = trArr[i][trArrIndex+2].querySelector("input[name='optnDetailIds']").value;
			 console.log("옵션Id: " + optnId)
			//옵션명
			 var optnValue = trArr[i][trArrIndex+2].querySelector("input[name='optnDetailValues']").value;
			//추가금액 
			var optnAmt= trArr[i][trArrIndex+2].querySelector("input[name='optnDetailAmts']").value;
		
		 for(var k =0; k<trIndex; k++){
			 //옵션명
			 optnDetailValues[count].push(optnMstrNames+ ":" + optnValue);
			 //아이디
			 optnDetailIds[count].push(optnMstrOrders+":"+ optnId);//순서:아이디 => 001:01
			 //추가금액
			 optnDetailAmts[count].push(Number(optnAmt));
			 count++;
		 }	 
		 }
	 } 
		
	 for(var i=0; i<totalCount; i++){
		 var html='';
		 var Index = 0;
		 var dscntErpSellPrice = $("[name='dscntErpSellPrice']").val();//상품가격정보에 판매가의 값을 가져옴
			  html += "<tr>";
	     	html += "<td><input type='checkbox' name='selectStockIndex' value='"+i+"' ></td>";
	     	html += "<td>"+optnDetailValues[i].join(",");
	     	html += "<input type='hidden' name='stockIndex' value='1'>";
	     	html += "<input type='hidden' name='selectedOptnDtlIds' value='"+optnDetailIds[i].join("-")+"'>";
	     	html += "<input type='hidden' name='stockSeqs' value='"+i+"'>";
	     	html += "</td>";
	     	html += "<td class='align-right'>";
	     	html += "<span class='_dscntSellPrice'></span>"+dscntErpSellPrice+"원</td>";//판매금액
	     	html += "<td class='align-right'>"+optnDetailAmts[i].reduce((prev, curr) => prev + curr)+"</td>";//추가금액
	     	html += "<td><input type='text' name='selectedStockCounts' value='0' style='width:80%' class='inputNumberText'></td>";//재고
	     	html += "<td><select name='selectedOptnDispYns'>;"//전시여부
	     	html += "<option value='true' selected=''>예</option>";
	     	html += "<option value='false'>아니오</option></select></td>";
	   	  html += "</tr></tbody></table>";
	   	  
	   	  $('#tableOptionSelecter>tbody:last').append(html);
	 }
	 }
	 
	 /*옵션재고 삭제버튼*/
	 function optnDelTable(){
		 let optnDelete = confirm("옵션을 삭제하시겠습니까?");
		  $(".optionHideBtn").show();
			$(".optionAddDel").toggle();
			$(".optnReadOnly").prop("readonly", false);
			$("#tableOptionSelecter").remove();
	 }
	 
	  /*옵션빈칸체크*/
		function optionSelectAreaValidation(optnArr, trArr){
				var tableLength = optnArr.length;
				console.log(tableLength);
				var validation = true;
				var html = '';
				var tableHead = '';
				tableHead += "<table id='tableOptionSelecter' class='group-center mt30 optionMasterTables'>";
				tableHead += "<tbody><tr><td class='align-left'>";
				tableHead += "<p class='mb10 bold fc-01' id='optionFailure' style='color:red'><b>다음과 같은 오류가 발생하였습니다. 확인해주세요.</b></p>";
				for(var i = 0; i< tableLength; i++){
					//옵션분류명	
					if($("input[name=optnMstrNames]").val() == ""){
								html += "<p class='mb5'>옵션분류명은 생략할 수 없습니다.["+i+"]</p>";
								validation = false;
						}
						var tdLength = (trArr[i].length-2);
						for(var j =0; j < tdLength; j++){
								console.log(tdLength)
								//옵션상세아이디
								if($("input[name=optnDetailIds]").val() == ""){
										html += "<p class='mb5'>옵션 상세아이디가 없습니다.["+i+"]["+j+"]</p>";
										validation = false;
								}
								//옵션이름
								if($("input[name=optnDetailValues]").val() == ""){
										html += "<p class='mb5'>옵션 이름이 없습니다.["+i+"]["+j+"]</p>";
										validation = false;
								}
							/* 	if($("input[name=optnDetailIds]").val() == $("input[id=optnDetailIds1]")){
									html += "<p class='mb5'>옵션 상세아이디가 중복되었습니다.</p>";
									validation = false;
								} */	
						}
				}

				if(!validation){
						$("#optionMasterArea").append(tableHead + html);
						$(".optionAddDel").toggle();
				}
				return validation;
	}
		/*이미지 미리보기*/
		function displayFile(index, imageId, uploadPath){	
			$('#' + imageId).val(index.value);
			if(index.files && index.files[0]){
			var reader = new FileReader();
			
				reader.onload = function(e){
					if(uploadPath == 'prdtImagePath1'){
							$('#prdtImagePath').attr('src', e.target.result);//대표이미지
							$('#prdtImagePath1').attr('src', e.target.result);//첫번째이미지 				
					}else{
						$('#'+uploadPath).attr('src', e.target.result);
					}
				}	
					reader.readAsDataURL(index.files[0]);
				}
			}
</script>	
<script type="text/javascript">		
/*jQuery(function($) {
    $("a.selected").each(function() {
        var parent = $(this).parent("li");
        $(parent).addClass("active");
        $(parent).parent().slideToggle(200);
    });
});*///jQuery 끝
	</script>
	<script type="text/javascript">
	
   var update = 'ADD' == 'MOD';
   function callbackAdminMemoLoad() {
       loadListAdminMemo('productMemoArea', '', paramHistory);
   }

   function loadListAdminMemo(areaId, productCode, param) {
       var newParam = isEmpty(param) ? "1" : param;
       paramHistory = param;
       $.ajax({
           type: "post"
           ,url: "/admin/common/listAdminMemo"
           ,data: {
               'productCode' : productCode,
               'page' : newParam
           }
           ,dataType: "html"
           ,success : function(html) {
               $('div#' + areaId).html(html);
           }
       });
   }

   function loadListAdminMemoByPage(param) {
       loadListAdminMemo('productMemoArea', '', param);
   }

   /*이미지*/
   function setUploadImage(uploadPath, imgIndex){
       var imageSrc = "http://image.crewmate.co.kr" + uploadPath;
       var imageId = imgIndex;
       switch(imageId){
           case '0' :
               $('#prdtImagePath').attr('src', imageSrc);//썸네일(메인이미지)
               $('#prdtImagePath1').attr('src', imageSrc);//등록이미지
               $('#prdtImagePath01').val(uploadPath);//이미지 등록경로
               break;
           case '1' :
               $('#prdtImagePath2').attr('src', imageSrc);
               $('#prdtImagePath02').val(uploadPath);
               break;
           case '2' :
               $('#prdtImagePath3').attr('src', imageSrc);
               $('#prdtImagePath03').val(uploadPath);
               break;
           case '3' :
               $('#prdtImagePath4').attr('src', imageSrc);
               $('#prdtImagePath04').val(uploadPath);
               break;
           case '4' :
               $('#prdtImagePath5').attr('src', imageSrc);
               $('#prdtImagePath05').val(uploadPath);
               break;
           case '5' :
               $('#prdtImagePath6').attr('src', imageSrc);
               $('#prdtImagePath06').val(uploadPath);
               break;
           case '6' :
               $('#prdtImagePath7').attr('src', imageSrc);
               $('#prdtImagePath07').val(uploadPath);
               break;
           default:
              alert('이미지업로드시 오류가 발생했습니다.');
       }
   }

   
/*    function callbackBrandPopup(obj, multiYn){
       //단일객체
       $('#brandId').val(obj.brandId);
       $('#brandName').val(obj.brandName);
   } */
		
   /*유효성검사*/
   function validateCheck(){
	   console.log('second');
      var editStat = $("input[name='edit']").val();
      var prdtForm = document.getElementById("modifyProductForm");

      console.log($("#idVndrCntrtId").val());
  	
  	  if(($("#idVndrCntrtId").val()=="")){
          alert("업체를 선택하셔야 합니다.");
          $("#idVndrCntrtId").focus();
       
          return false;
  	  }
	
      if((prdtForm.prdtEngName.value)==""){
         alert("영문상품명을 입력하셔야 합니다.");
         prdtForm.prdtEngName.focus();
      
         return false;
      }
      
      if((prdtForm.prdtKorName.value)==""){
    	  alert("국문상품명을 입력하셔야 합니다.");
    	  prdtForm.prdtKorName.focus();
    	  
    	  return false;
      }
      
      if((prdtForm.brandId.value)==""){
         alert("브랜드를 조회후 입력하셔야 합니다.");
         prdtForm.brandName.focus();
      
         return false;
      }
      
      if(($("#idCooCode").val()=="")){
    	   alert("원산지를 선택하셔야 합니다.");
    	   $("#idCooCode").focus();
    	  
    	   return false;
      }
   
      if((prdtForm.mnftrName.value)==""){
         alert("제조사는 입력하셔야 합니다.");
         prdtForm.mnftrName.focus();
      
         return false;
      }
   
      if(($("input:checkbox[name='upIconCode']:checked").length > 0) || ($("input:checkbox[name='downIconCode']:checked").length > 0)){
         var upIcon = $("input:checkbox[name='upIconCode']:checked").length;
         var lowIcon = $("input:checkbox[name='downIconCode']:checked").length;
         if(parseInt(upIcon + lowIcon) > 2){
            alert('아이콘은 2개만 가능합니다.');
             $("input:checkbox[name='upIconCode']").focus();
          
             return false;    
         }
      }
   
     if($("input[name='ctgrIds']").length == 0){
         alert("상품분류는 1개 이상이어야 합니다.");      
         $("select[name='category']").focus();   
         
         return false;         
      }else{
         if($("input[id='stdCtrgYnId']:checked").length == 0){
            alert("기준상품분류가 있어야 합니다.");
            $("input[id='stdCtrgYnId']").focus();
         
            return false;
         }
      }
   
      if((prdtForm.prdtSellPrice.value)==""){
         alert("정상가는 입력하셔야 합니다.");
         prdtForm.prdtSellPrice.focus();
      
         return false;
      }
      if(editStat == 'ADD'){
         if((prdtForm.dscntErpSellPrice.value)==""){
            alert("판매가는 입력하셔야 합니다.");
            prdtForm.dscntErpSellPrice.focus();
         
            return false;
         }
      }
      if((prdtForm.minBuyCount.value)==""){
         alert("최소구매수량은 입력하셔야 합니다.");
         prdtForm.minBuyCount.focus();
      
         return false;
      }
      
      if((prdtForm.maxBuyCount.value)=="") {
         alert("최대구매수량은 입력하셔야 합니다.");
         prdtForm.maxBuyCount.focus();
      
         return false;
      }
   
     /* if(prdtForm.freeGiftUseYn.value == 'true'){
           if($("a.btnFreeGiftDelete").length == 0){
               alert("사은품정보 있음 상태에서 추가정보가 없습니다.");
               prdtForm.freeGiftUseYn.focus();
            
               return false;
           }
      }*/
      var imgPath = '';
      var imgExt = '';//.jpg
      for(var i =0; i<$('input[name=prdtImagePaths]').length; i++){//이미지 있는거길이만큼 뽑는데
    	  imgPath = $('input[name=prdtImagePaths]').eq(i).val()//i번째값을 imgPath에 넣어준다
    	  if(imgPath !=""){
    		  //이미지경로가 123456789.jpg라면 .+1 .을 포함하지 않는 다음문자를 찾아 대문자로 변경한 후 slice로 .을 기준으로 자른다.(jpg)
    		  imgExt = imgPath.slice(imgPath.indexOf(".")+1).toUpperCase();
    		  imgPath.slice(imgPath.indexOf(".")+1).toUpperCase();//indexOf로 몇번째 위치에 있는지 찾아주고 slice로 잘라준다.
    		  if(imgExt != 'JPG' && imgExt != 'GIF'){
    			  alert("JPG또는 GIF만 등록가능합니다.")
    			  $("#prdtImagePath01").focus();
    			  return false;
    		  }
    	  }
      }
      
      if (prdtForm.cntrPrdtUseYn.value == 'true'){
         if($("a.btnCntrPrdtDelete").length == 0){
            alert("관련상품정보 있음 상태에서 추가정보가 없습니다.");
            prdtForm.cntrPrdtUseYn.focus();
         
            return false;
         }
      }
   		/*이미지*/
      if(($("#prdtImagePath01").val())==""){
          alert("메인이미지는 필수 입니다.");
          $("#prdtImagePath01").focus();
          return false;
       }
      
       if ('false' == $("select[name='optnUseYn']").val() || 'false' == $("input[name='optnUseYn']").val()) {
    	    if (($("input[name='stockCount']").val())=="") { 
    	    	alert("재고수량은 생략할 수 없습니다.");
    	    	$("input[name='stockCount']").focus();
    	    	return false;
    	    }
       } else {
    	   console.log("4");
    	   if ($("input:checkbox[name='selectStockIndex']:checked").length == 0) {
    		   alert("최소 하나의 옵션은 생성하여 재고를 등록/선택 하여야 합니다.");
    		   return false;
    	   }
       }

       //var errorMessage = ''; 
        $("input[name='optnDetailAmts']").each(function() {
    	    if (($(this).val())=="") {
    	    	$(this).val(0);
    	    }
       }); 
       
       $("input[name='optnDetailValues']").each(function() {
            if (($(this).val())=="") {
                $(this).focus();
                errorMessage = "옵션명는(은) 생략할 수 없습니다.";
            }
       }); 

        $("input[name='optnDetailIds']").each(function() {
            if (($(this).val())=="") {
                $(this).focus();
                errorMessage = "옵션아이디는(은) 생략할 수 없습니다.";
            }
       }); 
       
//         if ((errorMessage)!=null) {
//     	    alert(errorMessage);
//     	    return false;
//        } 
    
      return true; 
   }//End validateCheck

   
   function editProductForm(){
	   console.log('first');
	   //console.log(validateCheck());
      if(validateCheck()){
          if (!confirm("상품정보를 저장하시겠습니까?")) {
              return false; 
          }
         
          $("textarea[name='prdtDtlInfo']").val(CKEDITOR.instances.prdtDtlInfo.getData());
          $(".expsrYns").each(function() {
        	 $(this).parent().find("input[name='expsrYns']").val(!$(this).is(":checked")); 
          });
          
          $("form#modifyProductForm").ajaxSubmit({
              url: "/product/productFormEnd"
              , type: "post"
              , dataType: "json"
            	, processData: false
          		, contentType: false
              , success: function(data) {
            	  console.log(data);
            	  	//== 은 숫자1 문자열1 같다고 나옴 //===은 type까지 비교해줌
                  // if (data.resultCode ==='1') {
                       if(data.infoMap.result === '성공'){
                    	   alert('저장성공');
                          /* window.location.href="/product/productFormEnd";*/
                       }else if(data.infoMap.result === '실패'){
                    	  	   alert('저장실패 하였습니다');
                    	 	
                           /*document.location.reload();*/
                     //  }
                //   } //else {
                     //  alert('저장실패 하였습니다. 상단에 오류메시지를 확인하세요');
                      /* var errorMessages = data.errorMessages;
                       $("div#errorMessagesArea").html("");
                       for (var i = 0; i < errorMessages.length; i++) {
                           $('div#errorMessagesArea').append('<strong style="color:red">' + errorMessages[i] + '</strong>' + '<br/>');
                       }
                   
                      document.location.href = "#";*/
                   }
              }
              , error: function(xhr, status, error) {
                  alert("시스템 오류가 발생 했습니다. 관리자에게 문의하세요.");
              }
          });
      }
   } 

   /*이미지 삭제*/
   function clearImg(obj){
      if(obj == 1){
         $("#prdtImagePath").attr("src", "");
         $("#prdtImagePath1").attr("src", "");
         //$("#prdtImagePath01").attr("value", "");
         $("#prdtImagePath01").val("");
      }else{
          $("#prdtImagePath" + obj).attr("src", "");
          //$("#prdtImagePath0" + obj).attr("value", "");
          $("#prdtImagePath0" + obj).val("");
      }
    
       return false;
   }

   
   function openDscntHistoryPopup(prdtCode){
       window.open("/admin/product/popupDiscountHistory?prdtCode="+prdtCode, 'popupDscntHistory', 'width=500 ,height=300 ,scrollbars=yes');
       return false;
   } 
   
   function openProductDisplayAreaPopup(prdtCode){
      window.open("/admin/product/popupProductDisplay?prdtCode="+prdtCode, 'popupProductDisplay', 'width=500 ,height=300 ,scrollbars=yes');
       return false;
   }

   function loadListProductHistory(areaId, prdtCode, param) {
       var newParam = isEmpty(param) ? "1" : param;
       $.ajax({
           type: "post"
           ,url: "/admin/product/listProductHistory"
           ,data: {
               'prdtCode' : prdtCode,
               'page' : newParam
           }
           ,dataType: "html"
           ,success : function(html) {
               $('div#' + areaId).html(html);
           }
       });
   }

   function loadListProductHistoryByPage(param) {
       loadListProductHistory('productHistoryArea', '', param);
   }

   function ynBooleanString(flag){
      if(flag == 'Y'){
         return "예";
      }else{
         return "아니오";
      }
   }

   function modifyEnter(){
       var event = window.event;
    
       if (event.keyCode == 13) {
         editProductForm();
       }
   }

   jQuery(function($) {
       
       $(document).ready(function(){
           
           var freeGiftUseYn = 'false';
           if(freeGiftUseYn == 'true'){
               $('div#freeGiftList').show();
           }else{
               $('div#freeGiftList').hide();
           }
        
           
           var cntrPrdtUseYn = 'false';
           if(cntrPrdtUseYn == 'true'){
               $('div#cntrPrdtList').show();
           }else{
               $('div#cntrPrdtList').hide();
           }

           if (update) {
               loadListAdminMemo('productMemoArea', '');
               
               // 상품키워드리스트 문자열로 변환
               //<input type="text" name="srchWord" style="width:60%;" value="" maxlength="255" onkeydown="modifyEnter();"/>
               var list = new Array();
               
               
               $("input[name=srchWord]").val(list.join(","));
               if (false) {
                   $(".toggleUseOptnArea").toggle();
                   optnItemReadOnly();
               }
           }
        
           $("input[name='optnName']").val("사이즈");
           
           /* getFtcInformationForPrdtCode($("select[name='prntFtcInfoSeq']").val()); */
       });
   
       /*상품 분류정보*/
       $(document).on("click", "a.prdtCategoryDelBtn", function(){
         var btnLength = $('a.prdtCategoryDelBtn').length;

         if(btnLength == 1){
            alert("최소 하나의 상품분류는 등록되어 있어야 합니다.");
            return false;
         }
         if(confirm("삭제하시겠습니까?")){
              $(this).unbind('click');
              $(this).parent().parent().remove();
         }
       });
    
       
       $('.freeGiftUseYn').click(function(){
           var freeGiftUseYn = $(this).val();
           if(freeGiftUseYn == 'true'){
               $('div#freeGiftList').show();
           }else{
               $('div#freeGiftList').hide();
           }
       });

       
       $('.cntrPrdtUseYn').click(function(){
           var cntrPrdtUseYn = $(this).val();
           if(cntrPrdtUseYn == 'true'){
               $('div#cntrPrdtList').show();
           }else{
               $('div#cntrPrdtList').hide();
           }
       });
        
       
       $(document).on("click", "a.btnCntrPrdtDelete", function(){
         if(confirm("관련상품정보를 삭제하시겠습니까?")){
              $(this).unbind('click');
              $(this).parent().parent().remove();
         }
       });
    
       /*이미지*/     
       $('.smallImage').click(function(){
           $('#prdtImagePath').attr('src', $(this).attr('src'));
       });
    
       
       $('a.modifyProduct').click(function(){
           editProductForm();
       });
    
       
       $('a.permitProduct').click(function(){
           $("input[name='prdtPrmtCode']").val("P");
           $("input[name='prdtPrmtYn']").val("Y");
           editProductForm();
       });
    
       $('a.cancleProductDetail').click(function(){
           window.close();
       });
    
       $('a.selectAdminMemo').click(function() {
           $(this).parent().attr('class', 'current');
           $('a.selectProductHistory').parent().attr('class', '');
        
           $('div.productHistoryArea').hide();
           $('div.adminMemoArea').show();
       });
    
       $('a.deleteMemo').click(function() {
    	   $('textArea#memoContents').val("");
           $('textArea#memoContents').focus();
       });
    
       $('a.saveMemo').click(function() {
           $.ajax({
               type: "post"
               ,url: "/admin/common/saveAdminMemo"
               ,data: {
                   'memoContents' : $('textArea#memoContents').val(),
                   'productCode' : ''
               }
               ,dataType: "json"
               ,success : function(data) {
                   if (data.save) {
                       alert('저장하였습니다.');
                       loadListAdminMemo('productMemoArea', '');
                       $('textArea#memoContents').attr('value', '');
                       $('textArea#memoContents').focus();
                   } else {
                       alert(data.errorMessage);
                   }
               }
               ,error: function(data) {
                   alert('시스템 오류가 발생 했습니다. 관리자에게 문의하세요.');
               }
           });
       });
    
       $('a.selectProductHistory').click(function() {
           $(this).parent().attr('class', 'current');
           $('a.selectAdminMemo').parent().attr('class', '');
        
           $('div.productHistoryArea').show();
           $('div.adminMemoArea').hide();
        
           loadListProductHistory('productHistoryArea', '');
       });
       
        $("input[name='addInfoContsTemp']:radio").each(function(){
        	if($(this).is(":checked")){
            	$("input[name='addInfoConts']:hidden").val($(this).val());
         	}
      	});
       
		/* $("select[name='prntFtcInfoSeq']").change(function() {
			getFtcInformationForPrdtCode($(this).val());
		});
		 */
		$(document).on("click", ".expsrYns", function() {
			if($(this).is(":checked")) {
				$(this).parent().find("textarea[name='infoNotcConts']").val("해당없음").attr("readonly", "readonly");
			}
			else {
				$(this).parent().find("textarea[name='infoNotcConts']").val("").removeAttr("readonly");
			}
		});
		
		$("#idVndrCntrtId").change(function() {
			$(".btnFreeGiftDelete").parent().parent().remove();
		});
        /*옵션사용여부 (사용함/사용안함)*/
         $(".selectOptnUseYn").change(function() {
            $(".toggleUseOptnArea").toggle();
            $("#optionMasterArea").html("");
            $(".respectOptionStockSelect").hide();
            $(".addOptionStockSelect").show();
            $(".btnInvisible").show();
            $("#optionSelectArea").html("");
            optnCount = 0;
        }); 
        
     /*   $(".optnNameChange").click(function() {
            if (confirm("옵션분류명 변경하시겠습니까? 재고정보는 다시 입력하셔야 합니다.")) {
                $.ajax({
                    type: "get"
                   ,url: "/admin/product/modifyProductOptionMaster"
                   ,data: {'prdtCode' : '', 'optnMstrId' : $(this).parent().find("input[name='optnMstrIds']").val(), 'optnMstrName' : $(this).parent().find("input[name='optnMstrNames']").val()}
                   ,dataType: "json"
                   ,success : function(data) {
                	   rebuldOptionSelectArea();
                   }
               });
            }
        });
        
        $(".optnValueChange").click(function() {
            if (confirm("옵션명을 변경하시겠습니까? 재고정보는 다시 입력하셔야 합니다.")) {
                $.ajax({
                    type: "get"
                   ,url: "/admin/product/modifyProductOptionDetailValue"
                   ,data: {
                            'prdtCode' : '', 
                            'optnMstrId' : $(this).attr("optnMstrId"), 
                            'optnId' : $(this).parent().parent().find("input[name='optnDetailIds']").val(), 
                            'optnValue' : $(this).parent().parent().find("input[name='optnDetailValues']").val()
                          }
                   ,dataType: "json"
                   ,success : function(data) {
                	   rebuldOptionSelectArea();
                   }
               });
            }
        });
        
        $(".optnAmtChange").click(function() {
            if (confirm("추가금액을 변경하시겠습니까? 재고정보는 다시 입력하셔야 합니다.")) {
                $.ajax({
                    type: "get"
                   ,url: "/admin/product/modifyProductOptionDetailAmt"
                   ,data: {
                            'prdtCode' : '', 
                            'optnMstrId' : $(this).attr("optnMstrId"), 
                            'optnId' : $(this).parent().parent().find("input[name='optnDetailIds']").val(), 
                            'optnAmt' : $(this).parent().parent().find("input[name='optnDetailAmts']").val()
                          }
                   ,dataType: "json"
                   ,success : function(data) {
                	   rebuldOptionSelectArea();
                   }
               });
            }
        });*/
        
        var optnCount = $(".optionMasterTables").length;
     /*    $(".btnAddOptionMaster").click(function() {
            $.ajax({
                 type: "get"
                ,url: "/admin/product/addOptionMaser"
                ,data: {'optnCount' : ++optnCount}
                ,dataType: "html"
                ,success : function(html) {
                    $("#optionMasterArea").append(html);
                }
            });
        }); */
        /*옵션 추가 삭제부분*/
       /*  $(document).on("click", "a.btnDeleteOptionMaster", function() {
            if (confirm("옵션을 삭제하시겠습니까?")) {
                optnCount--;
                $("#" + $(this).attr("tableId")).remove();
            }
        }); */

       /*  $(document).on("click", "a.btnDeleteOptionDetail", function() {
            $(this).parent().parent().remove();
        }); */
				/*행추가*/
       /*  $(document).on("click", "a.btnAddOptionDetail", function() {
            var html = '';
            var tableId = $(this).attr("tableId");
            html += '<tr>';
            html += '<td><input type="hidden" name="optnDetailMstrOrders" value="' + $("#" + tableId).attr("keyIndex") + '"><input type="text" name="optnDetailIds" value="" style="width:90%" class="optnReadOnly"></td>';
            html += '<td><input type="text" name="optnDetailValues" value="" style="width:90%" class="optnReadOnly"></td>';
            html += '<td><input type="text" name="optnDetailAmts" value="0" style="width:90%" class="inputNumberText optnReadOnly"></td>';
            html += '<td><a href="#삭제" class="btn btn-sm btn-danger btnDeleteOptionDetail btnInvisible">삭제</a></td>';
            html += '</tr>';
            $("#" + tableId).append(html);
        }); */
        
        /*옵션재고추가 클릭부분*/
        /*  $(".addOptionStockSelect").click(function() {
            if (optnCount == 0) {
                alert('옵션는(은) 생략할 수 없습니다.');
                return false;
            } 

            $("form#modifyProductForm").ajaxSubmit({
                url: "/admin/product/addOptionStockSelect"
                , dataType: "html"
                , success: function(html) {
                    $("#optionSelectArea").html(html);
                    $("._dscntSellPrice").html($("input[name='dscntErpSellPrice']").val()); 
                    if ($("#optionFailure").attr("id") != 'optionFailure') {
                        optnItemReadOnly();
                    }
                }
                , error: function(xhr, status, error) {
                    alert("시스템 오류가 발생 했습니다. 관리자에게 문의하세요.");
                }
            });
        }); */
        
        $(".respectOptionStockSelect").click(function() {
        	optnItemClearReadOnly();
        });
        
         /*$(".addAddOptionStockSelect").click(function() {
            $("form#modifyProductForm").ajaxSubmit({
                url: "/admin/product/addAddOptionStockSelect"
                , dataType: "html"
                , success: function(html) {
                    $("#addOptionSelectArea").html(html);
                    $("._dscntSellPrice").html($("input[name='dscntErpSellPrice']").val()); 
                    if ($("#optionFailure").attr("id") != 'optionFailure') {
                        $(".optnReadOnly").attr("readonly", "readonly");
                        $(".btnInvisible").hide();
                        $(".addAddOptionStockSelect").hide();
                        $(".respectAddOptionStockSelect").show();
                    }
                }
                , error: function(xhr, status, error) {
                    alert("시스템 오류가 발생 했습니다. 관리자에게 문의하세요.");
                }
            });
        }) */
        
        $(".respectAddOptionStockSelect").click(function() {
            $(".optnReadOnly").removeAttr("readonly");
            $(".btnInvisible").show();
            $(".addAddOptionStockSelect").show();
            $(".respectAddOptionStockSelect").hide();
            $("#addOptionSelectArea").html("");
        })
    });// End jQuery
    
    function optnItemReadOnly() {
        $(".respectOptionStockSelect").show();
        $(".addOptionStockSelect").hide();
        $(".optnReadOnly").attr("readonly", "readonly");
        $(".btnInvisible").hide();
    }
    
    function optnItemClearReadOnly() {
        $(".respectOptionStockSelect").hide();
        $(".addOptionStockSelect").show();
        $(".optnReadOnly").removeAttr("readonly");
        $(".btnInvisible").show();
        $("#optionSelectArea").html("");
    }

    function rebuldOptionSelectArea() {
        $.ajax({
            type: "get"
           ,url: "/admin/product/rebuldOptionSelectArea"
           ,data: {'prdtCode' : '', 'prdtPrmtCode' : 'W', 'dscntSellPrice' : $("input[name='dscntErpSellPrice']").val()}
           ,dataType: "html"
           ,success : function(html) {
               $("#optionSelectArea").html(html);
           }
        });
    }


    function setAddInfoConts(value){
      $("input[name='addInfoConts']:hidden").val(value);
    }
    
    /*function displayFile(obj, imageId){
    	$('#' + imageId).val(obj.value);
    }*/

    function openFile(fileId){
    	$('#' + fileId).click();
    }
    
/*     function getFtcInformationForPrdtCode(ftcInfoSeq) {
    	if(ftcInfoSeq == "") {
    		$("#ftcInfoList").html("");
    	}
    	else {
	    	$.ajax({
	           	type: "post"
	          	,url: "/admin/product/getFtcInformationForPrdtCode"
	           	,data: {'ftcInfoSeq' : ftcInfoSeq, 'prdtCode' : ''}
	           	,dataType: "html"
	           	,success : function(html) {
	           		$("#ftcInfoList").html(html);
	           	}
	        });
    	}
    } */
    
    
/*     function callbackProduct(obj, multiYn) {
        if(multiYn == "Y"){
            //리스트형식일때
            var html = "";
            var cnt = Number($('table#tableCntrPrdtList tr').length);
         
            for(var i=0; i<obj.length; i++){
                //prdtList.push("["+i+"] 상품코드 : " + obj[i].prdtCode + "\n상품명 : " + obj[i].prdtEngName + "\n브랜드명 : " + obj[i].brandName + "\n카테고리경로 : " + obj[i].ctgrPath + "\n상품상태코드 : " + obj[i].prdtStatCode+"\n");
                if(('' != obj[i].prdtCode) && ($('input[name="cntrPrdtCodes"]').filter('input[value="' + obj[i].prdtCode + '"]').length == 0)){
                    html += '<tr><td>' + cnt++;
                    html += '</td><td>' + obj[i].prdtCode + '<input type="hidden" value="'+ obj[i].prdtCode +'" name="cntrPrdtCodes"/>';
                    html += '</td><td class="align-left">' + obj[i].prdtEngName + '</td><td>' + obj[i].brandName + '</td><td>';
                    html += obj[i].ctgrPath + '</td><td>' + '<a href="javascript://" class="btn btn-sm btn-danger btnCntrPrdtDelete" id="remove">삭제</a>' + '</td></tr>';
                }
            }
            $('table#tableCntrPrdtList').append(html);
        }else{
            //단일일때
            if(obj.prdtCode == ''){
                alert('동일한 상품은 선택할수 없습니다.');
                return;
            }
            if($('input[name="cntrPrdtCodes"]').filter('input[value="' + obj.prdtCode + '"]').length != 0) {
                alert('이미선택한 상품 입니다.');
                return;
            }

            var html = '<tr><td>' + $('table#tableCntrPrdtList tr').length;
               html += '</td><td>' + obj.prdtCode + '<input type="hidden" value="'+obj.prdtCode+'" name="cntrPrdtCodes"/>';
               html += '</td><td>' + obj.prdtEngName + '</td><td>' + obj.brandName + '</td><td>';
               html += obj.ctgrPath + '</td><td>' + '<a href="javascript://" class="btn btn-sm btn-danger btnCntrPrdtDelete" id="remove">삭제</a>' + '</td></tr>';

            $('table#tableCntrPrdtList').append(html);
        }
    }  */
    

</script>
<script src="http://malsup.github.com/jquery.form.js"></script>