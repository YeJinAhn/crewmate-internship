<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Popup:Demomall:브랜드 조회 팝업</title>
</head>
<body class="wrap-popup">
	<div class="container-wrap-inner">
		<div class="container">
			<article class="contents">
				<section class="contents-inner">
					<h4 class="mb10">
						<i class="awesome-reorder"></i>브랜드목록조회
					</h4>
					<div class="form-group table">
						<form id="brandSearchForm" name="brandSearchForm" method="get" action="/product/popupBrandList/popup">
							<input type="hidden" name="decorator" value="adminPopup" />
							<input type="hidden" name="multiYn" value="N" />
							<table>
								<colgroup>
									<col width="15%" />
									<col width="*" />
								</colgroup>
								<tr>
									<th>국문 브랜드명</th>
									<td><input type="text" name="brandName" value="<c:out value='${paramMap.brandName}'/>" class="search" maxlength="50" /></td>
								</tr>
								<tr>
									<th>영문 브랜드명</th>
									<td><input type="text" name="brandEngName" value="<c:out value='${paramMap.brandEngName}'/>" class="search" maxlength="50" /></td>
								</tr>
								<tr>
									<th>브랜드 ID</th>
									<td><input type="text" name="brandId" value="<c:out value='${paramMap.brandId}'/>" class="search" maxlength="20" /></td>
								</tr>
							</table>
							<div class="grid-box">
								<div class="fl-r">
									<input type="submit" class="btn btn-blue btn-icon btnSearch btn-submit" value="검색" />
									<a href="javascript://" class="btn btn-danger btnReset" id="btnReset" style="color: white;">초기화</a>
								</div>
							</div>
						</form>
					</div>
					<div class="form-group table list mt30">
						<table class="group-center">
							<colgroup>
								<col width="5%" />
								<col width="20%" />
								<col width="*" />
								<col width="20%" />
								<col width="20%" />
							</colgroup>
							<tr>
								<th>번호</th>
								<th>국문 브랜드명</th>
								<th>영문 브랜드명</th>
								<th>브랜드 ID</th>
								<th>프리미엄 여부</th>
							</tr>
							<c:if test="${!empty list.content}">
								<c:forEach items="${list.content}" var="brand" varStatus="status">
									<tr>
										<td><c:out value="${status.count}" /></td>
										<td><a href="javascript://" onclick="setBrand('${brand.brandName}','${brand.brandId}');"
											class="fc-02 bold link" style="color:blue; text-decoration:underline"><c:out value="${brand.brandName}" /></a></td>
										<td><c:out value="${brand.brandEngName}" /></td>
										<td><c:out value="${brand.brandId}" /></td>
										<td><c:out value="${brand.prmmYn eq 'Y'? '네' : '아니오'}" /></td>
									</tr>
								</c:forEach>
							</c:if>
						</table>
						
							<div class="table-pagination">
									<core:pagination listResultName="list" />
							</div>
				
					</div>
				</section>
			</article>
		</div>
	</div>
</body>
<script type="text/javascript">
function setBrand(brandName, brandId){
	opener.setBrandVal(brandName,brandId);
	window.close();	
}
</script>
</html>