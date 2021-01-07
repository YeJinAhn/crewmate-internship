<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="/crewmate/core" prefix="core" %>

<c:if test="${empty dateTime}">
    <c:set var="endDt">dateTime</c:set>
</c:if>

<!-- 날짜 값 세팅  -->
<c:if test="${not empty strtVal}">
    <c:set var="strtDtmVal">${fn:substring(strtVal,0,8) }</c:set>
    <c:set var="strtHourVal">${fn:substring(strtVal,8,10) }</c:set>
    <c:set var="strtMinVal">${fn:substring(strtVal,10,12) }</c:set>
    <c:set var="strtSecndVal">${fn:substring(strtVal,12,14) }</c:set>
</c:if>
<c:if test="${not empty endVal}">
    <c:set var="endDtmVal">${fn:substring(endVal,0,8) }</c:set>
    <c:set var="endHourVal">${fn:substring(endVal,8,10) }</c:set>
    <c:set var="endMinVal">${fn:substring(endVal,10,12) }</c:set>
    <c:set var="endSecndVal">${fn:substring(endVal,12,14) }</c:set>
</c:if>

<c:if test="${empty secndSelectYn}">
    <c:set var="secndSelectYn"><tiles:getAsString name="secndSelectYn" defaultValue="N" /></c:set>
</c:if>

<c:if test="${empty onlyStrtYn}">
    <c:set var="onlyStrtYn"><tiles:getAsString name="onlyStrtYn" defaultValue="N" /></c:set>
</c:if>

<c:if test="${empty minUnitYn}">
    <c:set var="minUnitYn"><tiles:getAsString name="minUnitYn" defaultValue="Y" /></c:set>
</c:if>




<%-- 시작/종료일자 기본값 처리 로직 추가 --%>
<div class="day" id="${dateTime}" >
	<div class="datepicker-wrap content">
		<input type="text" name="strtDtm" class="datepicker date-from" onkeydown="return false;" value="<core:mask pattern="####.##.##"><c:out value="${strtDtmVal}" /></core:mask>" />
    </div>

        <div class="datepicker-wrap content">
            <select class="datepicker-time" name="strtHour">
                <c:forEach var="i" begin="0" end="23" step="1">
                    <c:choose>
                        <c:when test="${i < 10}">
                            <option value="0${i}"
                                <c:if test="${'0'+i eq strtHourVal}" >
                                    selected
                                </c:if>
                            >0${i}</option>
                        </c:when>
                        <c:otherwise>
                            <option value="${i}"
                                <c:if test="${i eq strtHourVal}" >
                                    selected
                                </c:if>
                            >${i}</option>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </select>


<c:choose>
    <c:when test="${minUnitYn eq 'N' }">
        <select class="datepicker-time" name="strtMin">
            <c:forEach var="i" begin="0" end="59" step="1">
                <c:choose>
                    <c:when test="${i < 10}">
                        <option value="0${i}"
                            <c:if test="${'0'+i eq strtMinVal}" >
                                selected
                            </c:if>
                        >0${i}</option>
                    </c:when>
                    <c:otherwise>
                        <option  value="${i}"
                            <c:if test="${i eq strtMinVal}" >
                                selected
                            </c:if>
                        ><c:out value="${i}" /></option>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </select>
    </c:when>
    <c:otherwise>
        <select class="datepicker-time" name="strtMin">
            <c:forEach var="i" begin="0" end="50" step="10">
                <c:choose>
                    <c:when test="${i < 10}">
                        <option value="0${i}"
                            <c:if test="${'0'+i eq strtMinVal}" >
                                selected
                            </c:if>
                        >0${i}</option>
                    </c:when>
                    <c:otherwise>
                        <option  value="${i}"
                            <c:if test="${i eq strtMinVal}" >
                                selected
                            </c:if>
                        ><c:out value="${i}" /></option>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </select>
    </c:otherwise>
</c:choose>


            <select class="datepicker-time" name="strtsSecnd"
                <c:if test="${secndSelectYn eq 'N'}" > style="display:none" </c:if>
            >
                <c:forEach var="i" begin="0" end="59" step="1">
                    <c:choose>
                        <c:when test="${i < 10}">
                            <option value="0${i}"
                                <c:if test="${'0'+i eq strtSecndVal}" >
                                    selected
                                </c:if>
                             >0${i}</option>
                        </c:when>
                        <c:otherwise>
                            <option value="${i}"
                                <c:if test="${i eq strtSecndVal}" >
                                    selected
                                </c:if>
                            ><c:out value="${i}"/></option>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </select>


         </div>


    <c:if test="${onlyStrtYn eq 'N'}" >
        <div class="datepicker-wrap content" > ~ </div>


        <div class="datepicker-wrap content">
            <input type="text" name="endDtm" class="datepicker date-from" onkeydown="return false;" value="<core:mask pattern="####.##.##"><c:out value="${endDtmVal}" /></core:mask>" />
        </div>

        <div class="datepicker-wrap content">
            <select class="datepicker-time" name="endHour">
                <c:forEach var="i" begin="0" end="23" step="1">
                    <c:choose>
                        <c:when test="${i < 10}">
                            <option value="0${i}"
                                <c:if test="${'0'+i eq endHourVal}" >
                                    selected
                                </c:if>
                            >0${i}</option>
                        </c:when>
                        <c:otherwise>
                            <option value="${i}"
                                <c:if test="${i eq endHourVal}" >
                                    selected
                                </c:if>
                            >${i}</option>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </select>

<c:choose>
    <c:when test="${minUnitYn eq 'N' }">
        <select class="datepicker-time" name="endMin">
            <c:forEach var="i" begin="0" end="59" step="1">
                <c:choose>
                    <c:when test="${i < 10}">
                        <option value="0${i}"
                            <c:if test="${'0'+i eq endMinVal}" >
                                selected
                            </c:if>
                        >0${i}</option>
                    </c:when>
                    <c:otherwise>
                        <option  value="${i}"
                            <c:if test="${i eq endMinVal}" >
                                selected
                            </c:if>
                        ><c:out value="${i}" /></option>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </select>
    </c:when>
    <c:otherwise>
        <select class="datepicker-time" name="endMin">
            <c:forEach var="i" begin="0" end="50" step="10">
                <c:choose>
                    <c:when test="${i < 10}">
                        <option value="0${i}"
                            <c:if test="${'0'+i eq endMinVal}" >
                                selected
                            </c:if>
                        >0${i}</option>
                    </c:when>
                    <c:otherwise>
                        <option  value="${i}"
                            <c:if test="${i eq endMinVal}" >
                                selected
                            </c:if>
                        ><c:out value="${i}" /></option>
                    </c:otherwise>
                </c:choose>
            </c:forEach>
        </select>
    </c:otherwise>
</c:choose>

            <select class="datepicker-time" name="endsSecnd"
                <c:if test="${secndSelectYn eq 'N'}" > style="display:none" </c:if>
            >
                <c:forEach var="j" begin="0" end="59" step="1">
                    <c:set var="i" value="${59-j}" />
                    <c:choose>
                        <c:when test="${i < 10}">
                            <option value="0${i}"
                                <c:if test="${'0'+i eq endSecndVal}" >
                                    selected
                                </c:if>
                             >0${i}</option>
                        </c:when>
                        <c:otherwise>
                            <option value="${i}"
                                <c:if test="${i eq endSecndVal}" >
                                    selected
                                </c:if>
                            ><c:out value="${i}"/></option>
                        </c:otherwise>
                    </c:choose>
                </c:forEach>
            </select>
         </div>
    </c:if>
</div>

