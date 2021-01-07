<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>

<%-- 검색 영역 시작 --%>
<div class="table-form-wrap">
    <form name="searchForm" action=${popupYn eq 'Y' ? "/sample/boardList/popup" : "/sample/boardList"} method="get">
    <table class="table-form">
        <colgroup>
            <col style="width: 121px">
            <col>
            <col style="width: 121px">
            <col>
        </colgroup>
        <tbody>
            <tr>
                <th>제목</th>
                <td class="tl form-100p">
                    <input type="text" name="boardArtclTitle" value="<c:out value='${paramMap.boardArtclTitle}'/>" />
                    <input type="hidden" name="multYn" value="${paramMap.multYn }"/>
                </td>
                <th>작성자</th>
                <td class="tl form-100p">
                    <input type="text" name="wrtrName" value="<c:out value='${paramMap.wrtrName}'/>" />
                </td>
            </tr>
            <tr>
                <th>내용</th>
                <td class="tl form-100p" colspan="3">
                    <input type="text" name="boardArtclCont" value="<c:out value='${paramMap.boardArtclCont}'/>" />
                </td>
            </tr>
            <tr>
                <th>등록일자</th>
                <td class="tl form-100p" colspan="3">
                    <tiles:insertDefinition name="boDateSelect" />
                </td>
            </tr>
        </tbody>
    </table>
        <tiles:insertDefinition name="boSearchBtn" />
    </form>
</div>
<%-- 검색 영역 종료 --%>

<%-- 목록 영역 시작 --%>
<div class="table-list-wrap">

    <div class="table-header">
        <c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'Y'}">
            <button type="button" class="btn btn-primary" onclick="selectBoard();" style="float: left; margin-right: 10px; width: 100px; height: 26px;">추가</button>
        </c:if>
        <tiles:insertDefinition name="boListSizeSelect" />
    </div>

    <table class="table-list">
        <colgroup>
            <c:if test="${popupYn eq 'Y'}"><col style="width: 10%;"/></c:if>
            <col class="seq">
            <col />
            <col style="width: 10%;" />
            <col style="width: 15%;" />
            <col style="width: 15%;" />
            <col style="width: 5%;" />
        </colgroup>
        <thead>
            <tr>
                <c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'Y'}"><th scope="col"><input type="checkbox" onclick="checkAll(this, 'chkBoard');"/></th></c:if>
                <c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'N'}"><th scope="col"></th></c:if>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>수정일시</th>
                <th>등록일시</th>
                <th>조회수</th>
            </tr>
        </thead>
        <tbody>
            <c:if test="${empty list.content }">
                <tr>
                    <td colspan="${popupYn eq 'Y'? 7 : 6 }">등록된 데이터가 없습니다.</td>
                </tr>
            </c:if>
            <c:forEach items="${list.content}" var="board" varStatus="status">
                <tr>
                    <c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'Y'}">
                       <td>
                            <input type="checkbox" name="chkBoard" value="<c:out value='${status.index}'/>"/>
                        </td>
                    </c:if>
                    <c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'N' }">
                        <td>
                            <button type="button" class="btn btn-primary" onclick="(${status.index})">선택</button>
                        </td>
                    </c:if>
                    <td>
                        <c:out value="${list.totalElements - ((list.number - 1) * list.size) - status.index }" /> 
                    </td>
                    <td>
                        <c:choose>
                            <c:when test="${popupYn ne 'Y'}">
                                    <a href="/sample/boardFormMod?boardArtclSeq=${board.boardArtclSeq}&searchData=<core:param encode="true" />"><c:out value='${board.boardArtclTitle}'/></a>
                            </c:when>
                            <c:otherwise>
                                <c:out value="${board.boardArtclTitle}"/>
                            </c:otherwise>
                        </c:choose>
                    </td>
                    <td>
                        <c:out value="${board.wrtrName}" />
                    </td>
                    <td>
                        <fmt:formatDate value="${board.mdfDtm}" pattern="yyyy-MM-dd kk:mm:ss"/>
                    </td>
                    <td>
                        <fmt:formatDate value="${board.rgstDtm}" pattern="yyyy-MM-dd kk:mm:ss"/>
                    </td>
                    <td>
                        <c:out value="${board.hits}"/>
                    </td>
                </tr>
            </c:forEach>
        </tbody>
    </table>
    <div class="table-footer">
        <div class="table-pagination">
            <core:pagination listResultName="list" />
        </div>
        <c:if test="${popupYn ne 'Y' }">
            <div class="btn-wrap">
                <button type="button" class="btn btn-primary" onclick="location.href='/sample/boardFormReg';">등록</button>
            </div>
        </c:if>
    </div>
</div>
<%-- 목록 영역 종료 --%>

<script type="text/javascript" src="/js/form.js"></script>
<script>
var jsonList = ${core:toJson(list.content)};
var callbackFn = null;

// 검색카테고리 브랜드 고유번호 선택시(onchange) 이벤트 생성 및 해제
function searchConditionEvent(val) {
    "brandSeq" == val ? searchKeywordSetEvent() : $("#searchKeyword").unbind("keyup");
}

//브랜드 고유번호 선택시 키워드 keyup 이벤트 생성 (숫자만 입력)
function searchKeywordSetEvent() {
    $("#searchKeyword").on('keyup', function() {
        $(this).val($(this).val().replace(/[^0-9]/g, ""));
    });
}

//선택한 브랜드정보 부모창으로 전송
function selectBoard(index) {
    var list = new Array();
    /*
    if(typeof(callbackFn) == "function"){
        callbackFn(jsonList[index]);
    } else if (typeof(opener.callbackSamplePopup) == "function") {
        opener.callbackSamplePopup(jsonList[index]);
    }
    */
    if (typeof index == "undefined") {
        if ($("input[name=chkBoard]:checked").length == 0){
            alert('선택한 항목이 없습니다.');
            return;
        }
        $.each($("input[name=chkBoard]:checked"), function() {
            list.push(jsonList[$(this).val()]);
        });
    } else {
        list.push(jsonList[index]);
    }

    var data = new Object();
    data.list = list;
    /*
    var callback = opener.${paramMap.callback};
    if (opener && typeof callback == "function") {
        new Function(callback(data));
    }*/
    if(typeof(callbackFn) == "function"){
        callbackFn(data);
    } else if (typeof(opener.callbackSamplePopup) == "function") {
        opener.callbackSamplePopup(data);
    }
    window.close();
}

$(document).ready(function(event){
    // 검색 폼 전송 이벤트 재생성
    $("#btnSearch").unbind('click');
    $("#btnSearch").bind('click', function() {
        $('#searchCondition').val() == 'brandSeq' ? (isNaN($('#searchKeyword').val()) == true ? $('#searchKeyword').val(0) : true) : true;
        $("form[name=searchForm]").submit();
    });

    // 날짜 검색 유효성체크
    $(".date-from").on("change", function() {
        if ($(".date-to").val() == '') {
            $(".date-to").val($(this).val());
        } else {
            if ($(this).val() > $(".date-to").val()){
                alert("시작일은 종료일보다 클 수 없습니다.")
                $(this).val($(".date-to").val());
            }
        }
    });

    // 날짜 검색 유효성체크
    $(".date-to").on("change", function() {
        if ($(".date-from").val() == '') {
            $(".date-from").val($(this).val());
        } else {
            if ($(this).val() < $(".date-from").val()){
                alert("시작일은 종료일보다 클 수 없습니다.");
                $(this).val($(".date-from").val());
            }
        }
    });

    // 날짜 검색조건 readonly
    $("input[name$=Dt]").attr('readonly','readonly');

    // boCommonScript datepicker 인식하지 못하여 잠시 추가..
    $("#btnSearch").click(function(event){
        // int형 search의 경우 값이 없으면 0으로 대체
        $(".defaultZero").each(function(idx){
            if($(this).val().length == 0){
                $(this).val(0);
            }
        });

        $(".datepicker").each(function(idx){
            var str = $(this).val().replace(/\./g,"");
            $(this).val(str);
        });
        $("form[name=searchForm]").submit();
    });
});
</script>