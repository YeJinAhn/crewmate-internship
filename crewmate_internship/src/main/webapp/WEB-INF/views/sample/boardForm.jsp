<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>

<%-- 등록폼 시작 --%>
<div class="table-form-wrap">
    <form name="form" id="saveForm" onsubmit="return false;">
        <input type="hidden" name="mode" value="${mode}">
        <input type="hidden" name="boardArtclSeq" value="${data.boardArtclSeq}">
        <table class="table-form">
            <colgroup>
                <col style="width: 10%">
                <col style="width: 40%">
                <col style="width: 10%">
                <col style="width: 40%">
            </colgroup>
            <tbody>
                <tr>
                    <th>제목<span class="require">*</span></th>
                    <td class="tl form-100p" colspan="3">
                        <input type="text" name="boardArtclTitle" value="<c:out value='${data.boardArtclTitle}' />" class="txt required" title="제목" maxlength="60"/>
                    </td>
                </tr>
                <tr>
                    <th>내용<span class="require">*</span></th>
                    <td class="tl form-100p" colspan="3">
                        <textarea name="boardArtclCont" class="txt required" title="내용"><c:out value="${data.boardArtclCont}"/></textarea>
                    </td>
                </tr>
                <tr>
                    <th>작성자<span class="require">*</span></th>
                    <td class="tl form-100p" colspan="3">
                        <input type="text" name="wrtrName" value="<c:out value='${data.wrtrName}' />" class="txt required" title="작성자" maxlength="60"/>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="table-footer">
            <div class="btn-wrap">
                    <button type="button" class="btn btn-primary" onclick="saveCont()">저장</button>
                    <button type="button" class="btn btn-cancel list" onclick="location.href='/sample/boardList';">목록</button>
            </div>
        </div>
    </form>
</div>
<%-- 등록폼 종료 --%>
<script type="text/javascript" src="/js/crewshop.js"></script>
<script type="text/javascript" src="/js/form.js"></script>
<script>
//중복 저장 방지
var doubleSubmitFlag = false;

function doubleSubmitCheck(){
    
    if (doubleSubmitFlag) {
        return doubleSubmitFlag;
        
    } else {
        doubleSubmitFlag = true;
        return false;
    }
}

//저장
function saveCont(){
    
    var param = $("#saveForm").serializeObject();
    
    if (!$("#saveForm").validateForm()) { return; }
    
    if (!confirm("저장하시겠습니까?")) { return; }
    
    if (doubleSubmitCheck()) { return; }
    
    $.ajax({
        url         : param.mode == "create" ? "/sample/boardCreate" : "/sample/boardUpdate",
        type        : "post",
        dataType    : "json",
        data        : param,
        traditional : true,
        success     : function(data) {
            if (!form.ajaxValidate(data)) { return; }
            if (param.mode == "create") {
                alert("등록하였습니다.");
                location.href="/sample/boardList";
                
            } else {
                alert("수정하였습니다.");
                location.href="/sample/boardFormMod?boardArtclSeq=" + param.boardArtclSeq;
            }
        },
        error : function(request, status, error) {
        }
    });
}

$(document).ready(function(event){

});
</script>
