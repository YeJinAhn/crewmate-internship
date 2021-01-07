<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<!DOCTYPE html>
<html>
<head>
<title>crewshop</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="shortcut icon" href="/images/favicon.ico">
<link rel="stylesheet" type="text/css" href="/css/default.css">
<link rel="stylesheet" type="text/css" href="/css/layout.css">
<link rel="stylesheet" type="text/css" href="/css/common.css">
<link rel="stylesheet" type="text/css" href="/css/popup.css">
<link rel="stylesheet" type="text/css" href="/css/jquery-ui-1.12.1.min.css">

<script type="text/javascript" src="/js/jquery-3.4.1.min.js"></script>
<script type="text/javascript" src="/js/jquery-ui-1.12.1.min.js"></script>
<script type="text/javascript" src="/js/common.js"></script>

<tiles:insertDefinition name="boCommonScript" />
</head>

<body>
  <div class="popup-wrap">
    <tiles:insertAttribute name="header" />
    <tiles:insertAttribute name="left" />
    <div class="popup-contents">
        <div class="popup-title">
            <h2>
	        <c:forEach items="${menuPath}" var="i" varStatus="s">
	            <c:if test="${s.last}">${i.ctgNm}</c:if>
	        </c:forEach>
	        </h2>
        </div>
        <tiles:insertAttribute name="body" />
    </div>
    <tiles:insertAttribute name="footer" />
  </div>
</body>
</html>
