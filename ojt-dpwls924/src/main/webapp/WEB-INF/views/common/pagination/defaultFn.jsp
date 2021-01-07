<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>


<ul class="pagination" >

<c:if test="${number le totalPages}">
    <c:if test="${number ne 1}">
        <li class="first" ><a href="javascript:${function}(${1})"><%-- [처음] --%></a></li>
    </c:if>
    
    <%--
    <c:if test="${number ne 1}">
        <a href="?${paramPage}=${number-1}${paramListSize}${paramPageSize}${paramStr}" class="paging_prev">[이전페이지]</a>
    </c:if>
    --%>
    
    <c:if test="${number > pageSize}">
        <li class="prev"><a href="javascript:${function}(${startPage-pageSize})"><%-- [이전 ${pageSize}개 페이지] --%></a></li>
    </c:if>
    
    <c:if test="${totalPages != 1 && totalPages != 0}">
        <c:forEach begin="${startPage}" end="${endPage}" var="i" varStatus="s">
            <li ${number == i ? 'class="current"' : ''}><a href="javascript:${function}(${i})">${i}</a></li>
        </c:forEach>
    </c:if>
    
    <%--
    <c:if test="${endPage < totalPages}">
        <a href="?${paramPage}=${number+1}${paramListSize}${paramPageSize}${paramStr}" class="paging_next">[다음페이지]</a>
    </c:if>
    --%>
    
    <c:if test="${endPage < totalPages}">
        <li class="next"><a href="javascript:${function}(${endPage + numberOfElements})"><%-- [다음 <c:out value="${pageSize}" />개 페이지] --%></a></li>
    </c:if>
    
    <c:if test="${number ne totalPages and totalPages > 1}">
        <li class="last"><a href="javascript:${function}(${totalPages})"><%-- [마지막] --%></a></li>
    </c:if>
</c:if>


</ul>