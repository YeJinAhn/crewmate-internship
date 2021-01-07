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
<meta charset="UTF-8">
<title>Title</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
</head>
<body>
	<%-- <table class="table table-striped">
		<thead>
			<tr>
				<th scope="col">아이디</th>
				<th scope="col">이름</th>
				<th scope="col">나이</th>
				<th scope="col">이메일</th>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${data}" var="data" varStatus="status">
			<tr> 
				<td scope="row">${data.id}</td>
				<td>${data.name}</td>
				<td>${data.age}</td>
				<td>${data.email}</td>
			</tr>
		</c:forEach>	
		</tbody>
	</table> --%>
	<table class="table table-striped">
		<thead>
			<tr><!-- scope는 th에 사용하는 속성으로 , 제목과 내용을 연결해주는 기능이다 -->
				<th scope="col">주소록번호</th>
				<th scope="col">회원번호</th>
				<th scope="col">배송지명</th>
				<th scope="col">수취인명</th>
				<th scope="col">핸드폰번호</th>
				<th scope="col">우편번호</th>
				<th scope="col">주소-기본</th>
				<th scope="col">주소-상세</th>
				<th scope="col">배송지여부</th>
				<th scope="col">등록일시</th>
			</tr>
		</thead>
		<tbody>
		<c:forEach items="${data}" var="data" varStatus="status">
			<tr>
				<td>${data.addrNo}</td>
				<td>${data.userNo}</td>
				<td>${data.addrNm}</td>
				<td>${data.recvNm}</td>
				<td>${data.hp}</td>
				<td>${data.zipcode}</td>
				<td>${data.address}</td>
				<td>${data.addressDetail}</td>
				<td>${data.defaultYn}</td>
				<td>${data.regDt}</td>
			</tr>
		</c:forEach>
		</tbody>
	</table>
<script type="text/javascript">
//변수 선언
//let name = 'monkey'
//let은 선언하고 나중에 값을 할당해도 가능하지만(그러나 값을 할당하기전에 변수가 선언되어있어야함)
let dd
dd = 'test'
//const는 선언과 동시에 값을 할당 해야한다.(변수 재선언, 재할당 X)
const aa =i;
//상수 선언
// const 
function hello(name){
	console.log();
}
const  superheroes = ['1','2','3','4'];
const index = superheroes.indexof('1');
console.log(index);
</script>
</body>
</html>