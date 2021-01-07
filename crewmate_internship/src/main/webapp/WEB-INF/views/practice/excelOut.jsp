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
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<title>Home</title>
</head>
<body>
	<h1>addr List</h1>
	<div>
	[<a href="<c:url value='/boardRegisterForm.do' />">등록</a>]
	[<a href="<c:url value='/excelDown' />">엑셀</a>]
	</div>
	<table border="1">
	<thead>
	<tr>
		<th>주소록 고유번호</th>
		<th>회원 고유번호</th>
		<th>배송지명</th>
		<th>수취인명</th>
		<th>핸드폰번호</th>
		<th>우편번호</th>
		<th>주소-기본</th>
		<th>주소-상세</th>
		<th>기본배송지여부</th>
		<th>등록일시</th>
	</tr>
	</thead>
	<tbody>
		<c:forEach var="addr" items="${list}">
		<tr>
			<td>${addr.addrNo}</td>
			<td>${addr.userNo}</td>
			<td>${addr.addrNm}</td>
			<td>${addr.recvNm}</td>
			<td>${addr.hp}</td>
			<td>${addr.zipcode}</td>
			<td>${addr.address}</td>
			<td>${addr.addressDetail}</td>
			<td>${addr.defaultYn}</td>
			<td>${addr.regDt}</td>
		</tr>
		</c:forEach>
	</tbody>
	</table>
</body>
</html>
