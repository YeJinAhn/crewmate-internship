<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
    <h1>나는 메인</h1>
    <table>
        <tr>
            <th>a</th>
        </tr>
	    <c:forEach items="${list}" var="l">
	        <tr>
	           <td>${l.brandNm}</td>
	        </tr>
	    </c:forEach>
    </table>
</body>
</html>