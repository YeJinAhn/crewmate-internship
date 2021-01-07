<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<!doctype html>
<html lang="ko">
<head>
<meta name="viewport"
	content="user-scalable=yes, maximum-scale=1.0, width=1280">
<!-- 160905 수정 : 메타 태그 값 수정 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 160905 추가 : IE 호환성 모드 추가 -->
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title>네파 포털 | 고객센터</title>
<link rel="stylesheet" href="/resources/css/default_front.css" type="text/css" />
<link rel="stylesheet" href="/resources/css/layout_front.css" type="text/css" />
<link rel="stylesheet" href="/resources/css/common_front.css" type="text/css" />
<link rel="stylesheet" href="/resources/css/sub_front.css" type="text/css" />

<script type="text/javascript" src="/resources/vendors/jquery/jquery-1.11.0.min.js"></script>
<script type="text/javascript" src="/resources/vendors/jquery/jquery-ui.min.js"></script>
<script type="text/javascript" src="/resources/vendors/jquery/jquery.dotdotdot.min.js"></script>
<script type="text/javascript" src="/resources/vendors/jquery/jquery.numeric.min.js"></script>
<script type="text/javascript" src="/resources/js/common_front.js"></script>
<tiles:insertDefinition name="boCommonScript" />
</head>
<body>
	<div class="wrap">
		<tiles:insertAttribute name="header" />
		<div class="content-wrap sub-wrap cs-wrap">
			<div class="content-inner">
			
				<tiles:insertAttribute name="body" />
			</div>
		</div>
	</div>
	<tiles:insertAttribute name="footer" />
</body>
</html>