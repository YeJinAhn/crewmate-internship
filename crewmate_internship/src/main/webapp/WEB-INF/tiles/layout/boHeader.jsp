<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>


<div class="gnb-wrap">
    <span class="ci"><a href="/main"><span style="color: white;">OJT</span></a></span>
    <ul class="gnb-list">
        <c:forEach items="${dispMenuList}" var="i" varStatus="s">
        	<li
                <c:if test="${(empty menuPath1 and s.first) or (i.ctgSeq eq menuPath1.ctgSeq)}">class="active"</c:if>
            >
                <a href="${i.url}">${i.ctgNm}</a>
            </li>
        </c:forEach>
        <li>
            <a href="/sample/sampleMain">Sample</a>
        </li>
    </ul>

    <div class="util-box">
        <span class="login-name"><%-- ${currAdmin.adminNm}님 접속중 --%></span>
        <a href="/auth/adminLogOut" class="btn btn-logout">로그아웃</a>
    </div>
</div>