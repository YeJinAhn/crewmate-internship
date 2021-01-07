<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="/crewmate/core" prefix="core"%>

<div class="container">
	<article class="contents">
		<section class="contents-inner">
			<!--검색 테이블-->
			<form name="searchForm" action="/notice/noticeList" method="get">
			<input type="hidden" name="multiYn" value="Y">
				<div class="form-group table">
					<table>
						<colgroup>
							<col width="15%">
							<col width="*">
							<col width="15%">
							<col width="35%">
						</colgroup>
						<tbody>
							 <tr>
                <th>등록일자</th>
                <td class="tl form-100p" colspan="3">
                    <tiles:insertDefinition name="boDateSelect" />
                </td>
            	</tr>
							<tr>
								<th>전체공지 설정</th>
								<td colspan="3">
									<input type="radio" name="fixedYn" value="" checked="checked" id="fixedYn">
									<label for="fixedYn">전체&nbsp;</label>
									<input type="radio" name="fixedYn" value="Y" id="fixedYn1">
									<label for="fixedYn1">예&nbsp;</label> 
									<input type="radio" name="fixedYn" value="N" id="fixedYn2">
									<label for="fixedYn2">아니오&nbsp;</label>
								</td>
							</tr>
							<tr>
								<th>공지유형</th>
								<td>
									<select id="idNotcClassCode" name="notcClassCode">
										<option value="">전체</option>
										<option value="01">공지</option>
										<option value="02">안내</option>
									</select>
								</td>
								<th>공지구분</th>
								<td>
									<input type="radio" name="boardCode" id="boardCode" value="" checked="checked">
									<label for="boardCode3">전체</label>
									<input type="radio" name="boardCode" id="boardCode1" value="NOTICE">
									<label for="boardCode1">일반</label> 
									<input type="radio" name="boardCode" id="boardCode2" value="VENDOR">
									<label for="boardCode2">업체</label>
								</td>
							</tr>
							<tr>
								<th>
									<select name="condition">
										<!-- <option value="">선택</option> -->
										<option value="ALL">제목+내용</option>
										<option value="TITL">제목</option>
										<option value="CONT">내용</option>
									</select>
								</th>
								<td colspan="3">
								<input id="search" name="searchWord" type="text" maxlength="40" style="width: 80%" value="${paramMap.searchWord}"></td>
							</tr>
						</tbody>
					</table>
					<div class="grid-box">
						<div class="fl-r">
							<tiles:insertDefinition name="boSearchBtn" />
						</div>
					</div>
				</div>
				<!--//검색 테이블-->

				<!--데이터테이블-->
				<div class="form-group table list mt30">
					<div class="grid-box mb5">
						<div class="fl-l">
							<tiles:insertDefinition name="boListSizeSelect" />
							<!-- <i class="entypo-search"></i> 전체 <span class="fc-01">17</span> 건
							(<span class="fc-01">1</span> 페이지) -->
						</div>
						<div class="fl-r">
							<a href="/notice/noticeFormReg?notcSeq=${notice.notcSeq}&searchData=<core:param encode="true"/>" class="btn btn-primary btn-sm">공지사항 등록</a> 
						</div>
					</div>
					<table class="group-center">
						<colgroup>
							<col width="5%">
							<col width="10%">
							<col width="10%">
							<col width="10%">
							<col width="*">
							<col width="10%">
							<col width="15%">
							<col width="8%">
						</colgroup>
						<tbody>
							<tr>
								<th>번호</th>
								<th>공지구분</th>
								<th>전체공지설정</th>
								<th>공지유형</th>
								<th>제목</th>
								<th>등록자ID</th>
								<th>등록일시</th>
								<th>조회수</th>
							</tr>
							<c:if test="${empty list.content }">
								<tr>
									<td colspan="${popupYn eq 'Y'? 9 : 8 }">등록된 공지사항이 없습니다.</td>
								</tr>
							</c:if>
							<c:forEach items="${list.content}" var="notice" varStatus="status">
								<tr>
									<c:if test="${popupYn eq 'Y' && paramMap.multYn eq 'Y'}">
                       <td>
                            <input type="checkbox" name="chkBoard" value="<c:out value='${status.index}'/>"/>
                        </td>
                   </c:if>
									<td>
										<c:out value="${list.totalElements -((list.number -1) * list.size) - status.index}"/><!-- 번호 -->
									</td>
									<td>
										<c:out value="${notice.boardCode eq 'NOTICE'? '일반' : '업체'}"/>
									</td>
									<td>
										<c:out value="${notice.fixedYn eq 'Y'? '예' : '아니오'}"/>
									</td>
									<td>
										<c:out value="${notice.notcClassCode eq '01'? '공지' : '안내'}"/>
									</td>
									<td class="align-left">
									<a href="/notice/noticeFormMod?notcSeq=${notice.notcSeq}&searchData=<core:param encode="true"/>" style="color:blue; text-decoration:underline"><c:out value='${notice.notcTitle}'/></a>
									</td>
									<td>
										<c:out value="${notice.writeAdminId}"/>
									</td>
									<td>	
									 <fmt:formatDate value="${notice.rgstDtm}" pattern="yyyy-MM-dd kk:mm:ss"/> 
									</td>
									<td>
										<c:out value="${notice.hit}"/>
									</td>
								</tr>
							</c:forEach>
						</tbody>
					</table>
					<div class="pagination clearfix align-center">
						<div class="table-pagination">
						<core:pagination listResultName ="list"/>
							<!-- <a href="javascript://" class="paginate_button current">1</a> -->
						</div>
					</div>
				</div>
				<!-- end list_a_type -->
			</form>
		</section>
	</article>
</div>
<script type="text/javascript">
jQuery(function($){
	/* 날짜 검색 유효성체크 */
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

	/* 날짜 검색 유효성체크 */
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

	/* 날짜 검색조건 readonly */
	$("input[name*=Dt]").attr('readonly', 'readonly');//*은 Dt를 contain하고 있는것만 readonly속성으로 바꿔준다.
	
	$("#btnSearch").click(function(event){
		$(".defaultZero").each(function(idx){
			if($(this).val().length==0){
				$(this).val(0);
			}
		});
		/* 날짜 */
		$(".datepicker").each(function(idx){
																			//'.'문자제거
			var str = $(this).val().replace(/\./g,"");
			$(this).val(str);
		});
		$("form[name=searchForm]").submit();
	});
	
	
	/*공지유형*/
	var notcClassCode = "${paramMap.notcClassCode}";
	console.log(notcClassCode)
	$("select[name='notcClassCode'] option[value='"+notcClassCode+"']").attr("selected", "selected");
	
	/*전체공지 설정*/
	const fixedYn = '${paramMap.fixedYn}';
	if(fixedYn=="Y"){
		$("input:radio[id='fixedYn1']").prop("checked", true);
	}else if(fixedYn=="N"){
		$("input:radio[id='fixedYn2']").prop("checked", true);
	}else{
		$("input:radio[id='fixedYn']").prop("checked", true);
	}
	/*공지구분*/
	const boardCode = '${paramMap.boardCode}';
	if(boardCode=="NOTICE"){
		$("input:radio[id='boardCode1']").prop("checked", true);
	}else if(boardCode=="VENDOR"){
		$("input:radio[id='boardCode2']").prop("checked", true);
	}else{
		$("input:radio[id='boardCode']").prop("checked", true);
	}
	
	/* condition */
  var condition = "${paramMap.condition}";
	$("select[name='condition'] option[value='"+condition+"']").attr("selected", "selected");
	
});
</script>