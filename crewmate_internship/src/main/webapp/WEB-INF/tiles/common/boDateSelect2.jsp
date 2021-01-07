<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="/crewmate/core" prefix="core" %>


<c:if test="${empty strDt}">
	<c:set var="strDt">strDt</c:set>
</c:if>

<c:if test="${empty endDt}">
	<c:set var="endDt">endDt</c:set>
</c:if>
<c:if test="${empty strDtVal}">
    <c:set var="strDtVal">${paramMap.strDt}</c:set>
</c:if>

<c:if test="${empty endDtVal}">
    <c:set var="endDtVal" >${paramMap.endDt}</c:set>
</c:if>

<c:if test="${empty rangeSelectYn}">
	<c:set var="rangeSelectYn"><tiles:getAsString name="rangeSelectYn" defaultValue="Y" /></c:set>
</c:if>


<%-- 시작/종료일자 기본값 처리 로직 추가 --%>
<div class="day" >
	<div class="datepicker-wrap">
		<input type="text" name="${strDt}" class="datepicker date-from" onkeydown="return false;" value="<core:mask pattern="####.##.##"><c:out value="${strDtVal}" /></core:mask>" />
	</div>
	~
	<div class="datepicker-wrap">
		<input type="text" name="${endDt}" class="datepicker date-to" onkeydown="return false;" value="<core:mask pattern="####.##.##"><c:out value="${endDtVal}" /></core:mask>" />
	</div>

	<c:if test="${rangeSelectYn eq 'Y'}">
		<div class="datepicker-util">
			<button type="button" data-option="today" onclick="dateRangeSelect(this, 0);">오늘</button>
			<button type="button" data-option="7d" onclick="dateRangeSelect(this, 7);">7일</button>
			<button type="button" data-option="30d" onclick="dateRangeSelect(this, 30);">30일</button>
			<button type="button" data-option="90d" onclick="dateRangeSelect(this, 90);">90일</button>
			<button type="button" data-option="1y" onclick="dateRangeSelect(this, 365);">365일</button>
		</div>
	</c:if>
</div>

