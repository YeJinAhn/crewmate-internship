<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="/crewmate/core" prefix="core" %>

<c:set var="listSizeArray2"><tiles:getAsString name="listSizeArray" defaultValue="10,20,40,60,80,100" /></c:set>
<c:set var="onChangeFun"><tiles:getAsString name="onChangeFun" defaultValue="listSizeSelectChange(this);" /></c:set>
<c:set var="attr"><tiles:getAsString name="attr" defaultValue="" /></c:set>
<span>
        전체 <span class="cnt">${list.totalElements}</span>건, 
    <span class="cnt">${list.numberOfElements eq 0 ? list.numberOfElements : list.number}/${list.totalPages}</span> 페이지
</span>
<div class="util-box">
    <select name="listSize" onchange="${onChangeFun }" ${attr }>
        <c:forEach items="${fn:split(listSizeArray2,',') }" var="i" varStatus="s">
            <option value="${i}" <c:if test="${list.size eq i}">selected</c:if>>${i}개씩 읽기</option>
        </c:forEach>
    </select>
</div>