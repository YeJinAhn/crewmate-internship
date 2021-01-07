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
<title>상품목록조회이미지</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<script type="text/javascript" src="/js/jquery/jquery-1.12.0.min.js"></script>
<script type="text/javascript" src="/js/jquery/jquery.alphanumeric.pack.js"></script>
<script type="text/javascript" src="/js/jquery/jquery.lazyload.min.js"></script>
<script type="text/javascript" src="/js/poshytip/jquery.poshytip.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="/js/plugins/jquery.tablesorter.min.js"></script>
<!-- external css style -->
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="/css/bo/common.css" type="text/css">
<link rel="stylesheet" href="/css/bo/theme_typeA.css" type="text/css">
<link rel="stylesheet" href="/css/font-awesome.css" type="text/css">
<link href="/js/poshytip/tip-violet/tip-violet.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" type="text/css" href="/js/jquery/css/jquery-ui.min.css" />
<link rel="stylesheet" type="text/css" href="/js/jquery/css/jquery-ui.theme.min.css" />
<script type="text/javascript" src="/js/jquery/jquery-ui.min.js"></script>
<script type="text/javascript" src="/js/calendar.js"></script>
<script type="text/javascript" src="/js/categorySelect.js"></script>
<script type="text/javascript" src="/js/script/brandList.js"></script>
</head>
<body class="wrap-popup">
    <div class="wrap">
        <div class="bg-pop">
            <img src="//image.crewmate.co.kr/demoshop/h1_logo.png" alt="crewmate">
            <a href="#닫기" class="btn btn-sm fl-r close">닫기</a>
        </div>    
        <div class="container-wrap">
            <div class="container-wrap-inner">
                <div class="container">
                    <article class="contents">
                        <section class="contents-inner">                           
    											<h4 class="mb10"><i class="fa fa-list"></i> 이미지 상세</h4>
													<img src="${url}">	<!-- controller에서 담아준 key이름이랑 매칭시켜야함 --> 
                        </section>
                    </article>
                </div>
            </div>
        </div>
    </div>
		<div id="loadingBar" style="position: absolute; z-index: 3000; display: none; left: 165px; top: 261px;"><img src="//image.crewmate.co.kr/demoshop/loadingbar2.gif" height="30" width="30" alt="loadingBar">
		</div>
</body>
</html>