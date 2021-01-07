<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="/crewmate/core" prefix="core"%>
<title>DOM 엘리먼트 접근하기</title>
<div class="form-group table">
	<table>
		<colgroup>
			<col width="15%">
			<col width="35%">
			<col width="15%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th>문의일자</th>
				<td colspan="3"><input id="startDt" name="startDt" type="text"
					value="" style="width: 100px;" maxlength="8" onkeydown="onlyNum();"
					class="hasDatepicker"><img class="ui-datepicker-trigger"
					src="//image.crewmate.co.kr/demoshop/ico_calander.gif" alt="..."
					title="..."> ~<input id="endDt" name="endDt" type="text"
					value="" style="width: 100px;" maxlength="8" onkeydown="onlyNum();"
					class="hasDatepicker"><img class="ui-datepicker-trigger"
					src="//image.crewmate.co.kr/demoshop/ico_calander.gif" alt="..."
					title="..."> <a href="javascript://"
					class="btn btn-sm setSearchTermToday"><span>오늘</span></a> <a
					href="javascript://" class="btn btn-sm setSearchTermWeek"><span>1주일</span></a>
					<a href="javascript://" class="btn btn-sm setSearchTermMonth"><span>한달</span></a>
					<a href="javascript://"
					class="btn btn-sm btn-blue setSearchTermAll"><span>전체</span></a></td>
			</tr>
			<tr>
				<th>문의유형</th>
				<td><select name="faqClass" id="faqClass">
						<option value="">---- 선택 ----</option>
						<%-- <c:forEach var="cnsl" items="${prntFaq}" varStatus="status">
						<option value="${cnsl.cnslClassId}"><c:out value="${cnsl.cnslClassName}"></c:out>
						</option>
						</c:forEach> --%>
						</select> 
						<span id="faqClassSecond"> &nbsp;&gt;&nbsp;
						<select name="faqClassId" id="faqClassId">
							<option value="">---- 선택 ----</option>
							<!--<option value="000100">ON/OFF 통합서비스</option>
							<option value="000101">교환</option>
							<option value="000102">반품</option>
							<option value="000103">환불</option>
							<option value="000104">오프라인 교환/환불</option>-->
					</select>

				</span>
				</td>
				<th>답변상태</th>
				<td><input type="radio" name="aswrYn" value=""
					checked="checked" id="aswrYn"><label for="aswrYn">전체&nbsp;</label>

					<input type="radio" name="aswrYn" value="false" id="aswrYn1"><label
					for="aswrYn1">미답변&nbsp;</label> <input type="radio" name="aswrYn"
					value="true" id="aswrYn2"><label for="aswrYn2">답변완료&nbsp;</label>


				</td>
			</tr>
			<tr>
				<th>회원ID</th>
				<td><input id="searchData" name="userId" type="text"
					style="width: 80%;" value=""></td>
				<th>회원명</th>
				<td><input id="searchData" name="userName" type="text"
					style="width: 80%;" value=""></td>
			</tr>
			<tr>
				<th>답변자ID</th>
				<td colspan="3"><input type="text" name="aswrAdminId"
					style="width: 45%;" value=""></td>
			</tr>
			<tr>
				<th><select name="scope">
						<option value="all" selected="">제목+내용</option>
						<option value="title">제목</option>
						<option value="content">내용</option>
				</select></th>
				<td colspan="3"><input id="searchWord" name="searchWord"
					type="text" style="width: 45%;" value=""></td>
			</tr>
		</tbody>
	</table>
	<div class="grid-box">
		<div class="fl-r">
			<input type="submit"
				class="btn btn-blue btn-icon btnSearch btn-submit" value="검색">
			<a href="#초기화" class="btn btn-danger btnReset ">초기화</a>
		</div>
	</div>
</div>
<%--<div id="draggable">
		<p>Drag me around</p>
		<br><br>
	</div>
	<div id="draggable2">
		<p>Drag me around</p>
	</div>--%>
<%-- <div class="container">
	<article class="contents">
		<section class="contents-inner">
			<!--검색 테이블-->
			<form name="searchForm" action="/practice/jQuerySelector"
				method="get">
				<div class="tab-wrap">
					<ul>
						<li><a href="#tab1">문자 보내기</a></li>
						<li><a href="#tab2">문자 템플릿</a></li>
						<li><a href="#tab3">문자 발송내역</a></li>
					</ul>
					<div id="tab1"></div>
					<h5 class="mb5">
						회원 검색| <span id="small">문자 메시지를 발송할 회원을 검색하세요</span>
					</h5>
					<!-- <form action="/" id=""> -->
					<input type="hidden" />
					<div class="form-group table">
						<table>
							<colgroup>
								<col width="10%" />
								<col width="35%" />
								<col width="10%" />
								<col width="*" />
							</colgroup>
							<tbody>
								<tr>
									<th>회원ID</th>
									<td><input type="text" name="userId" style="width: 80%"
										value="" /></td>
									<th>회원명</th>
									<td><input type="text" name="userId" style="width: 90%"
										value="" /></td>
								</tr>
								<tr>
									<td colspan="3" class="t1 form"><span id="faqClass">
											<select name="faq" id="faqParentClass">
												<option value="">----선택----</option>

										</select>
									</span></td>
								</tr>
								<tr>
									<div class="day">
										<div class="datepicker-wrap">
											<input type="text" name="${endDt}" class="datepicker date-to"
												onkeydown="return false;"
												value="<core:mask pattern="####.##.##"><c:out value="${endDtVal}" /></core:mask>" />
										</div>
									</div>
								</tr>
							</tbody>
						</table>
					</div>
					<!-- </form>	 -->
					<!-- tab1종료 -->
					<div id="tab2">
						<div id="el">
							<ul>
								<li class="first">2-1</li>
								<li>2-2</li>
								<li>2-3</li>
								<li class="end">2-4</li>
								<li class="end">2-5</li>
							</ul>
							<br>
						</div>
					</div>
					<div id="tab3">
						<p>First tab is active by default:</p>
						<!-- common.js에 이미 아래와 같이 선언되어있음. 사용하는 곳에서는 탭영역에 class="tab-wrap"을 지정하고 id값으로 영역을 지정해주면 된다. function setTabs() 참고.-->
						<pre>
							<code>$( ".tab-wrap" ).tabs();</code>
						</pre>
				</div>
				</div>
			</form>
		</section>
	</article>
</div> --%>
<script type="text/javascript">
    jQuery(function($) {
        $(document).ready(function() {
            $('#createFaqArticle').click(function() {
                location.href = "/admin/manage/createFaqForm";
            });
            $('select[name=faqClass]').change(function(){
                ajax(this.value);
            });
            if('0000'){
                var second = '0000';
                var first = second.substring(0, 4);
                ajax(first,second);
                $('select[name=faqClass]').val(first).attr("selected", "selected");
            }
            $('#listSize').change(function(){
                var listSize = $('select[name=listSize]').attr('selected', true).val();
                $('form').attr('action','/admin/manage/listFaq?listSize='+listSize);
                $('form').submit();
            });
            $('#changeRanking').click(function(){
                window.open(
                        "/admin/manage/getRankingFaq",
                        'Top10', 'width=1024 ,height=768 ,scrollbars=yes'
                        );
            });
            $(".btnSearch").click(function() {
                $('form').submit();
            });
        });
        
        
        $("input[name='searchWord']").focus();
        
        
        $(".btnReset").click(function() {
        	$('select[name=faqClass]').val("");
        	$('select[name=faqClassId]').val("");
            return false; 
        });
    });
    
    function ajax(first,second){
        $.ajax({
            type:'post'
            , data:{ prntFaqClassId:first, cnslClassId:second }
            , url:'/practice/faqclass'
            , dataType: 'json'
            , success:function(data){
                $('#faqClassSecond').html("");
                $('#faqClassSecond').html(data);
                if(second != null && second.length <= 4){
                    $('select.faqClassId').attr('value', "");
                }else{
                    $('select.faqClassId').attr('value', second);
                }
            }
        });
    }
</script>

<script>
	$(document)
			.on(
					'change',
					'select[name=faq]',
					function() {
						var value = $('select[name=faq]').last().val();

						$
								.ajax({
									url : "/",
									data : {
										prntCnslClassId : value
									},
									dataType : 'json',
									success : function(data) {

										var html = '';
										var list = data.infoMap.list;
										if (list.length > 0) {
											html += "<select id='faqParentClass' name='faq'>";
											html += "<option value=''>"
													+ '----선택----'
													+ "</option>";

											for (var i = 0; i < list.length; i++) {
												html += "<option value='"+list[i].cnslClassId+"'>"
														+ list[i].cnslClassName
														+ "</option>";
											}
											html += '</select>';

											$('#faqClass').append(html);
										}
									},
									error : function(error, req, code) {
										alert("error");
									}
								});
					})

	$(document).ready(function() {
		/*$('#draggable').draggable();
		$('#draggable').draggable({
			drop:function(){
				$(this).addClass('drop').text('Drop Success');
			}
		});*/
		/*$('#draggable').draggable({revert:true});
		$('#draggable2').draggable({revert:true, helper:'clone'});*/
		/*$('#draggable').draggable({axis:'x'});
		$('#draggable2').draggable({axis:'y'});
		$('#draggable3').draggable({containment: "#containment"});*/
		//$('#draggable').draggable();
		//$('[title=attr]').css('color', 'red');
		//var el = $('#el> ul> li');
		//el = el.slice(2, 5); // * even :짝수
		//el.css('color', 'red'); //    odd :홀수
		//	first :첫번째 / last :마지막
		/* $('#el>ul>li').each(function(i){
				console.log(this);
				console.log($(this));
			$(this).css('color', 'red');
		}); */

		/* var el = $('#el>ul').children();
		el.css('color', 'blue'); */

		//var el = $('#el>ul>.first').nextUntil('.end').css('color','yellow');
		/*$.ajax({
			 url:"/",
			 type: "get",
			 dataType :'json',
			 async : false,
			 error:function(){
				 console.log("데이터 불러오기 실패");
			 }, success:function(data){
				 $('body').append("<div>데이터 전송 완료</div>");
			 }
		});
		$('body').append('<div>동기식 처리</div>');*/
	});
</script>