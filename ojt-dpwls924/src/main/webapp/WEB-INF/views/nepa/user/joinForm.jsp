<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="/crewmate/core" prefix="core"%>
<!doctype html>
<html lang="ko">
<head>
<meta name="viewport"
	content="user-scalable=yes, maximum-scale=1.0, width=1280">
<!-- 160905 수정 : 메타 태그 값 수정 -->
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<!-- 160905 추가 : IE 호환성 모드 추가 -->
<meta http-equiv="content-type" content="text/html; charset=utf-8">
<title>네파 포털 | 통합회원가입</title>
<link rel="stylesheet" href="/resources/css/default_front.css"
	type="text/css" />
<link rel="stylesheet" href="/resources/css/layout_front.css"
	type="text/css" />
<link rel="stylesheet" href="/resources/css/common_front.css"
	type="text/css" />
<link rel="stylesheet" href="/resources/css/sub_front.css"
	type="text/css" />

</head>
<body>
	<div class="wrap">
		<div class="content-wrap sub-wrap">
			<div class="content-inner">
				<div class="indicator-wrap">
					<ul class="indicator-list">
						<li><a href="#"><img src="/resources/images/common/front_home_indicator.png" alt="홈 아이콘" /> 홈</a></li>
						<!-- 160628 추가 : 홈 아이콘 추가 -->
						<li class="last">회원가입</li>
					</ul>
				</div>
				<h2 class="title">NEPA 통합회원가입</h2>
				<div class="step-wrap mgt-30">
					<ul class="step-list step-4 step-join">
						<li>
							<div class="step-inner step1">
								<span>STEP 01. 회원약관동의</span>
							</div>
						</li>
						<li>
							<div class="step-inner step2">
								<span>STEP 02. 본인인증</span>
							</div>
						</li>
						<li class="here">
							<div class="step-inner step3">
								<span>STEP 03. 회원정보 입력</span>
							</div>
						</li>
						<li class="last">
							<div class="step-inner step4">
								<span>STEP 04. 가입완료</span>
							</div>
						</li>
					</ul>
				</div>
				<!-- 인증 폼 -->
				<form name="form" id="saveForm">
				<input type="hidden" name="addInfoYn" value="${paramMap.addInfoYn}" />
				<input type="hidden" name="marketingYn" value="${paramMap.marketingYn}" />
					<h3 class="sub-title">
						<span class="text-red">[필수]</span> 회원가입 정보 
						<span class="sub-txt">입력하신	개인정보는 "마이페이지&gt;회원정보확인"에서 확인 및 수정이 가능합니다. </span>
					</h3>
					<div class="table-wrap">
						<table class="table-form">
							<colgroup>
								<col style="width: 160px;" />
								<col style="width: auto;" />
							</colgroup>
							<tbody>
								<tr>
									<th scope="row" class="req">이름</th>
									<td>
										<input type="text" name="userNm" id="userNm" placeholder="이름" required maxlength="10" class="form-control">
									</td>
								</tr>
								<tr>
									<th scope="row" class="req">생년월일</th>
									<td>
										<select id="birthDt" name="year" title="생년월일" class="tbl-select-year required">
											<option value="1920">1920</option>
											<option value="1921">1921</option>
											<option value="1922">1922</option>
											<option value="1923">1923</option>
											<option value="1924">1924</option>
											<option value="1925">1925</option>
											<option value="1926">1926</option>
											<option value="1927">1927</option>
											<option value="1928">1928</option>
											<option value="1929">1929</option>
											<option value="1930">1930</option>
											<option value="1931">1931</option>

											<option value="1932">1932</option>

											<option value="1933">1933</option>

											<option value="1934">1934</option>

											<option value="1935">1935</option>

											<option value="1936">1936</option>

											<option value="1937">1937</option>

											<option value="1938">1938</option>

											<option value="1939">1939</option>

											<option value="1940">1940</option>

											<option value="1941">1941</option>

											<option value="1942">1942</option>

											<option value="1943">1943</option>

											<option value="1944">1944</option>

											<option value="1945">1945</option>

											<option value="1946">1946</option>

											<option value="1947">1947</option>

											<option value="1948">1948</option>

											<option value="1949">1949</option>

											<option value="1950">1950</option>

											<option value="1951">1951</option>

											<option value="1952">1952</option>

											<option value="1953">1953</option>

											<option value="1954">1954</option>

											<option value="1955">1955</option>

											<option value="1956">1956</option>

											<option value="1957">1957</option>

											<option value="1958">1958</option>

											<option value="1959">1959</option>

											<option value="1960">1960</option>

											<option value="1961">1961</option>

											<option value="1962">1962</option>

											<option value="1963">1963</option>

											<option value="1964">1964</option>

											<option value="1965">1965</option>

											<option value="1966">1966</option>

											<option value="1967">1967</option>

											<option value="1968">1968</option>

											<option value="1969">1969</option>

											<option value="1970">1970</option>

											<option value="1971">1971</option>

											<option value="1972">1972</option>

											<option value="1973">1973</option>

											<option value="1974">1974</option>

											<option value="1975">1975</option>

											<option value="1976">1976</option>

											<option value="1977">1977</option>

											<option value="1978">1978</option>

											<option value="1979">1979</option>

											<option value="1980">1980</option>

											<option value="1981">1981</option>

											<option value="1982">1982</option>

											<option value="1983">1983</option>

											<option value="1984">1984</option>

											<option value="1985">1985</option>

											<option value="1986">1986</option>

											<option value="1987">1987</option>

											<option value="1988">1988</option>

											<option value="1989">1989</option>

											<option value="1990">1990</option>

											<option value="1991">1991</option>

											<option value="1992">1992</option>

											<option value="1993">1993</option>

											<option value="1994">1994</option>

											<option value="1995">1995</option>

											<option value="1996">1996</option>

											<option value="1997">1997</option>

											<option value="1998">1998</option>

											<option value="1999">1999</option>

											<option value="2000">2000</option>

											<option value="2001">2001</option>

											<option value="2002">2002</option>

											<option value="2003">2003</option>

											<option value="2004">2004</option>

											<option value="2005">2005</option>

											<option value="2006">2006</option>

											<option value="2007">2007</option>

											<option value="2008">2008</option>

											<option value="2009">2009</option>

											<option value="2010">2010</option>

											<option value="2011">2011</option>

											<option value="2012">2012</option>

											<option value="2013">2013</option>

											<option value="2014">2014</option>

											<option value="2015">2015</option>

											<option value="2016">2016</option>

											<option value="2017">2017</option>

											<option value="2018">2018</option>

											<option value="2019">2019</option>

											<option value="2020">2020</option>
									</select> 
									<select id="birthDt" name="month" title="생년월일" class="tbl-select-month required">

											<option value="01">1</option>

											<option value="02">2</option>

											<option value="03">3</option>

											<option value="04">4</option>

											<option value="05">5</option>

											<option value="06">6</option>

											<option value="07">7</option>

											<option value="08">8</option>

											<option value="09">9</option>

											<option value="10">10</option>

											<option value="11">11</option>

											<option value="12">12</option>

									</select> 
									<select id="birthDt" name="day" title="생년월일" class="tbl-select-day required">

											<option value="01">1</option>

											<option value="02">2</option>

											<option value="03">3</option>

											<option value="04">4</option>

											<option value="05">5</option>

											<option value="06">6</option>

											<option value="07">7</option>

											<option value="08">8</option>

											<option value="09">9</option>

											<option value="10">10</option>

											<option value="11">11</option>

											<option value="12">12</option>

											<option value="13">13</option>

											<option value="14">14</option>

											<option value="15">15</option>

											<option value="16">16</option>

											<option value="17">17</option>

											<option value="18">18</option>

											<option value="19">19</option>

											<option value="20">20</option>

											<option value="21">21</option>

											<option value="22">22</option>

											<option value="23">23</option>

											<option value="24">24</option>

											<option value="25">25</option>

											<option value="26">26</option>

											<option value="27">27</option>

											<option value="28">28</option>

											<option value="29">29</option>

											<option value="30">30</option>

											<option value="31">31</option>
									</select> &nbsp;&nbsp;&nbsp; 
									<label class="ui-radio first-row">
									<input type="radio" name="solarYn" value="Y" checked>
									<span class="icon"></span> 양력</label> 
									<label class="ui-radio first-row">
									<input type="radio" name="solarYn" value="N">
									<span class="icon"></span> 음력</label> <!-- //음력 양력 추가 20160623 --></td>
								</tr>
								<tr>
									<th scope="row" class="req">성별</th>
									<td>
										<label class="ui-radio first-row">
										<input type="radio" name="sex" value="MAN" checked="checked"><span class="icon"></span> 남자</label> 
										<label class="ui-radio first-row">
										<input type="radio" name="sex" value="WOMAN" checked=""><span class="icon"></span> 여자</label>
									</td>
								</tr>
								<tr>
									<th scope="row" class="req">휴대폰번호</th>
									<td>
										<div>
											<select class="tbl-select-phone1" name="hp1">
												<option value="010">010</option>
												<option value="011">011</option>
												<option value="016">016</option>
												<option value="017">017</option>
												<option value="019">019</option>
											</select> 
											<input type="text" class="tbl-input-phone2" name="hp2" maxlength="4">
											<input type="text" class="tbl-input-phone3" name="hp3" maxlength="4">
										</div> <!-- 인증번호 추가 20160623 --> <!-- 
                                    timer class로 남은입력시간 구분
                                    20160624
                                    -->
										<div class="timer">
											<button type="button" class="btn btn-sm btn-white bold">인증번호 받기</button>
											<input type="text" class="text-confirm-number">
											<button type="button" class="btn btn-sm btn-lite-gray bold">확인</button>
											<span class="timer-text">남은입력시간<span
												class="text-black bold">2분57초</span></span>
											<!-- 인증번호 타이머 추가 20160624 -->
										</div> <!-- //인증번호 추가 20160623 -->
										<div>
											<label class="ui-check first-row"> 
											<input type="checkbox" name="smsYn" value="Y"> 
											<span class="text-dark-gray bold">이벤트/상품정보 문자(SMS) 수신 동의</span> 
											<span class="text-lite-gray">(주문 관련 정보는 수신동의 여부와 관계 없이 발송됩니다.)</span>
											</label>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row" class="req">아이디</th>
									<td>
										<label id="idYn" for="idYn"></label>
										<div class="input-wrap">
											<input class="tbl-id" type="text" name="userId" id="userId"	placeholder="아이디"> 
											<input type="button" id="btnCheckId" class="btn btn-sm btn-lite-gray bold" onclick="idCheck();" value="중복확인">
										</div>
										<div class="desc">
											<span class="text-red">* 아이디 신규 입력 시, 6자~16자 사이 입력
												(대소문자 구분, 한글/공백 입력 불가)</span> <span>* 이메일 ID를 사용하실 경우, 이메일
												주소 변경이 제한될 수 있으니, 이 점 유의하여 주시기 바랍니다.</span>
										</div>
								 </td>
								</tr>
								<tr>
									<th scope="row" class="req">비밀번호</th>
									<td>
										<div class="input-wrap" id="pwCheck">
											<input class="tbl-pw" type="password" name="" id="userPw" placeholder="비밀번호"> 
											<label id="passCheck" for="passCheck"></label>
										</div>
										<div class="desc">
											<span class="text-red">* 비밀번호는 6자~16자 사이 입력 (대소문자 구분, 한글/공백 입력 불가)</span> 
											<span>* 타인이 쉽게 알아낼 수 있는 아이디, 전화번호, 생일 등 개인정보와 연관된 숫자/문자 등은 사용하지 않는 것이 좋습니다.</span>
										</div>

									</td>
								</tr>
								<tr>
									<th scope="row" class="req">비밀번호 확인</th>
									<td>
										<div class="input-wrap" id="pwCheck">
											<input class="tbl-pw" type="password" name="userPw"	id="userPwCheck" placeholder="비밀번호 확인"> 
											<label id="passpassCheck" for="passpassCheck"></label>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">이메일</th>
									<td>
										<div>
											<input type="text" name="mailAddr" id="mailAddr" placeholder="이메일"> @ 
											<input type="text" placeholder="직접입력" id="mail2" name="mailAddrNext" title="이메일" onkeyup="noKorean(this);" maxlength="50"	value=""> 
											<select name="mailSelect" onchange="setMailDomain(this.value);">
												<option value="">선택</option>
												<option value="naver.com">naver.com</option>
												<option value="daum.net">daum.net</option>
												<option value="hotmail.com">hotmail.com</option>
												<option value="nate.com">nate.com</option>
												<option value="gmail.com">gmail.com</option>
												<option value="hanmir.com">hanmir.com</option>
											</select>

										</div>
										<div>
											<label class="ui-check first-row"> 
											<input type="checkbox" name="mailYn" value="Y"> <!-- 160603 수정 : 텍스트 수정 -->
												<span class="text-dark-gray bold">이벤트/상품정보 이메일 수신 동의</span>
												<span class="text-lite-gray">(주문 관련 정보는 수신동의 여부와 관계
													없이 발송됩니다.)</span>
											</label>
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row" class="req">주소</th>
									<td class="address">
										<div class="zip-code">
											<input type="text" name="zipcode" id="zipcode" readonly>
											<button type="button" class="btn btn-sm btn-white bold"	onclick="openAddrPopup();">주소찾기</button>
										</div>
										<div class="address-wrap">
											<input type="text" name="address" id="address" class="address-pre" readonly> 
											<input type="text" class="address-etc" name="addressDetail" id="addressDetail"	placeholder="나머지 주소">
										</div>
									</td>
								</tr>

							</tbody>
						</table>
					</div>
					<h3 class="sub-title">
						<span class="text-red">[선택]</span> 회원가입 정보
					</h3>
					<div class="table-wrap">
						<table class="table-form">
							<colgroup>
								<col style="width: 160px;" />
								<col style="width: auto;" />
							</colgroup>
							<tbody>
								<tr>
									<th scope="row">결혼 여부</th>
									<td class="info-weddingYn" onchange="changeWeddingYn(this.value)">
										<label class="ui-radio first-row">
										<input type="radio"	name="weddingYn" value="Y" checked=""><span class="icon"></span> 기혼</label> 
										<label class="ui-radio first-row">
										<input type="radio" name="weddingYn" value="N" checked="checked"><span class="icon"></span> 미혼</label> 
										<!--  <select name="weddingYn" onchange="changeWeddingYn(this.value)">
							                     		<option value="">선택 안함</option>
							                     		<option value="N">미혼</option>
							                     		<option value="Y">기혼</option>
							                     	</select> --> 
							      <span>* 결혼기념일 입력 시 관련 혜택을 받으실 수 있습니다.</span>
							    <!-- 160706 추가 -->
							    </td>
								</tr>
								<tr>
									<th scope="row">결혼기념일</th>
									<td class="info-anniversary">
									<select class="tbl-select-year" name="weddingDtYear" id="wedding1" disabled>
											<option value="2020">2020</option>
											<option value="2019">2019</option>
											<option value="2018">2018</option>
											<option value="2017">2017</option>
											<option value="2016">2016</option>
											<option value="2015">2015</option>
											<option value="2014">2014</option>
											<option value="2013">2013</option>
											<option value="2012">2012</option>
											<option value="2011">2011</option>
											<option value="2010">2010</option>
											<option value="2009">2009</option>
											<option value="2008">2008</option>
											<option value="2007">2007</option>
									</select> 
									<select class="tbl-select-month" name="weddingDtMonth" id="wedding2" disabled>
											<option value="01">01</option>
											<option value="02">02</option>
											<option value="03">03</option>
											<option value="04">04</option>
											<option value="05">05</option>
											<option value="06">06</option>
											<option value="07">07</option>
											<option value="08">08</option>
											<option value="09">09</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
									</select> 
									<select class="tbl-select-day" name="weddingDtDay" id="wedding3" disabled>
											<option value="01">01</option>
											<option value="02">02</option>
											<option value="03">03</option>
											<option value="04">04</option>
											<option value="05">05</option>
											<option value="06">06</option>
											<option value="07">07</option>
											<option value="08">08</option>
											<option value="09">09</option>
											<option value="10">10</option>
											<option value="11">11</option>
											<option value="12">12</option>
											<option value="13">13</option>
											<option value="14">14</option>
											<option value="15">15</option>
											<option value="16">16</option>
											<option value="17">17</option>
											<option value="18">18</option>
											<option value="19">19</option>
											<option value="20">20</option>
											<option value="21">21</option>
											<option value="22">22</option>
											<option value="23">23</option>
											<option value="24">24</option>
											<option value="25">25</option>
											<option value="26">26</option>
											<option value="27">27</option>
											<option value="28">28</option>
											<option value="29">29</option>
											<option value="30">30</option>
									</select>
								 </td>
								</tr>
								<tr>
									<th scope="row">직업</th>
									<td>
										<label class="first-row ui-radio">
										<input type="radio" name="job" value="02"><span class="icon"></span>자영업</label> 
										<label class="first-row ui-radio">
										<input type="radio" name="job" value="03"><span class="icon"></span>회사원</label> 
										<label class="first-row ui-radio">
										<input type="radio" name="job" value="05"><span class="icon"></span>주부</label> 
										<label class="first-row ui-radio">
										<input type="radio" name="job" value="07"><span class="icon"></span>학생</label> <!-- 160607 수정 : 기타 체크/라디오와 인풋 같이 개행되도록 div 추가 -->
										<div class="has-input-wrap">
											<label class="first-row ui-radio has-input">
											<input type="radio" name="job" value="09" id="jobEtc"><span class="icon"></span> 기타</label> 
											<input type="text" name="jobDesc"	id="jobDesc" value="">
										</div>
									</td>
								</tr>
								<tr>
									<th scope="row">관심분야</th>
									<td>
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="07"> 여행</label> 
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="03"> 등산</label> 
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="01"> 골프</label> 
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="02"> 스키</label> 
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="06"> 낚시</label> 
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="05"> 캠핑</label> 
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="11"> 영화</label> 
										<label class="first-row ui-check">
										<input type="checkbox" name="hobbies" value="08"> 쇼핑</label>
									<!-- first-row 추가 20160623 --> 
									<label class="first-row ui-check">
									<input type="checkbox" name="hobbies" value="09"> 요리</label>
									<!-- first-row 추가 20160623 --> 
									<label class="ui-check">
									<input type="checkbox" name="hobbies" value="10"> 음악</label> 
									<label class="ui-check"><input type="checkbox" name="hobbies" value="13"> 사진</label> <!-- 160607 수정 : 기타 체크/라디오와 인풋 같이 개행되도록 div 추가 -->
										<div class="has-input-wrap">
											<label class="ui-check has-input">
											<input type="checkbox" name="hobbies" id="hobbyEtc" value="15">기타</label> 
											<input type="text" name="hobbyDesc" value="">
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="btn-wrap">
						<button type="button" class="btn btn-lg btn-white" style="width: 150px;">취소</button>
						<button type="button" class="btn btn-lg btn-gray" style="width: 150px;" onclick="nextCompleteJoin();">가입완료</button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<script type="text/javascript"
		src="/resources/vendors/jquery/jquery-1.11.0.min.js"></script>
	<script type="text/javascript"
		src="/resources/vendors/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript" src="/resources/js/common_front.js"></script>
	<script
		src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	|<%
		String strReferer = request.getHeader("referer");

	if (strReferer == null) {
	%>
	<script language="javascript">
		alert("URL 주소창에 주소를 직접 입력해서 접근하셨습니다.\n\n정상적인 경로를 통해 다시 접근해 주십시오.");
		document.location.href = "/nepa/user/agreeForm";
	</script>
	<%
		return;
	}
	%>
	<script>
		let addInfoYn = '${paramMap.addInfoYn}';
		let marketingYn = '${paramMap.marketingYn}';
		//아이디 중복체크
		//let idChk = 0;
		let isAllowId = true;
		$('#userId').keyup(function(e) {//blur도 가능
			//console.log("키가 눌림")
			isAllowId = true;
		//	idChk = 0;
		});
		function idCheck() {
			var data = $("input[name='userId']").val();

			$.ajax({
				url : "/nepa/idCheck",
				type : "get",
				dataType : "json",
				data : {
					userId : data
				},
				success : function(data) {
					var result = data.infoMap.idCheck;
					if (result >= 1) {
						alert("중복된 아이디가 있습니다.");
						isAllowId = true;
					} else if (result == 0) {
						alert("사용가능한 아이디입니다.");
						isAllowId = false;
					//	idChk = 1;
					}
				},
				error : function(request, status, error) {

				}
			});
		};
		/*let joinYnChk = 0;
		function joinYnCheck() {
			var userNm = $("input[name='userNm']").val();
			var hp1 = $("select[name=hp1]").val();
			var hp2 = $(".tbl-input-phone2").val();
			var hp3 = $(".tbl-input-phone3").val();
			var hp = hp1 + "-" + hp2 + "-" + hp3;
			$.ajax({
				 url : "/nepa/joinYnCheck"
				,type : "get"
				,dataType : "json"
				,data : {userNm : userNm, hp : hp}
				,success : function(data) {
					var result = data.infoMap.check;
					if (result >= 1) {
						//alert("이미 가입된 회원입니다.");
					} else if (result == 0) {
						joinYnChk = 1;
					}
				},
				error : function(request, status, error) {
				}
			});
		};*/

		/*유효성체크*/
		function validateCheck() {
			//이름
			if ($("input[name='userNm']").val() == "") {
				alert("이름을 입력해주세요");
				$("input[name='userNm']").focus();
				return false;
			}
			//생년월일
			if ($(".tbl-select-year").val() == "" || $(".tbl-select-month").val() == "" || $(".tbl-select-day").val() == "") {
				alert("생년월일을 선택해주세요");
				$("#birthDt1").focus();
				return false;
			}
			//휴대폰번호
			if ($(".tbl-input-phone2").val() === ""	|| $(".tbl-input-phone3").val() === "") {
				alert("전화번호를 입력해주세요.");
				$(".phone-number2").focus();
				return false;
			}
			//아이디
			if (($("#userId").val() == "")) {
				alert("아이디를 입력해주세요");
				$("#userId").focus();
				return false;
			}
			if (isAllowId === true) {
				alert("아이디중복체크를 해주세요");
				return false;
			}

			/*if(joinYnChk ===0){
				alert("이미 가입된 회원입니다");
				return false;
			} */

			//비밀번호
			if ($("#userPw").val() === "") {
				alert("비밀번호를 입력해주세요");
				$("#userPw").focus();
				return false;
			}
			//주소
			if ($("#address").val() === "") {
				alert("주소를 입력해주세요");
				$("#address").focus();
				return false;
			}
			if ($("input:radio[id='jobEtc']").is(":checked")) {
				if ($('input[name="jobDesc"]').val() === "") {
					alert("기타내용을 작성해주세요");
					$('input[name="jobDesc"]').focus();
					return false;
				}
			}

			if ($("input:checkbox[id='hobbyEtc']").is(":checked")) {
				if ($('input[name="hobbyDesc"]').val() === "") {
					alert("기타내용을 작성해주세요");
					$('input[name="hobbyDesc"]').focus();
					return false;
				}
			}
			return true; //확인이 완료되었을 때
		}
		/*회원가입*/
		function nextCompleteJoin() {
			if (!validateCheck()) {
				return false;
			}

			$("form#saveForm").ajaxSubmit({
				url : "/nepa/user/joinFormReg",
				type : "post",
				dataType : "json",
				success : function(data) {
					if (data.resultCode === 1) {
						alert("회원가입 축하드립니다.");
						location.href = "/nepa/user/completeJoin";
					} else if (data.resultCode === -1) {
						alert("실패");
					} else if (data.resultCode === 2){
						alert("이미 가입한 회원입니다.");
					}
				},
				error : function(request, status, error) {
					alert("시스템 오류가 발생했습니다. 관리자에게 문의하세요");
				}
			});

		}//End nextCompleteJoin

		function setMailDomain(value) {
			document.getElementById("mail2").value = value;
		}

		/*주소팝업*/
		function openAddrPopup() {
			new daum.Postcode({
				oncomplete : function(data) {
					// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

					// 각 주소의 노출 규칙에 따라 주소를 조합한다.
					// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
					var addr = ''; // 주소 변수

					//사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
					if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
						addr = data.roadAddress;
					} else { // 사용자가 지번 주소를 선택했을 경우(J)
						addr = data.jibunAddress;
					}

					// 우편번호와 주소 정보를 해당 필드에 넣는다.
					document.getElementById('zipcode').value = data.zonecode;
					document.getElementById("address").value = addr;
					// 커서를 상세주소 필드로 이동한다.
					document.getElementById("addressDetail").focus();
				}
			}).open();
		}

		jQuery(function($) {
			// $("input[name='weddingYn']:checked").each(function(){
			// }); 
			/*아이디 유효성 체크*/
			$('#userId')
					.change(
							function() {
								var reg1 = /^[a-z]+[a-z0-9]{5,15}$/g;
								var id = $('#userId').val();

								if (!reg1.test($('#userId').val())) {
									$('#idYn')
											.html(
													"<p style='color:red'>영문자로 시작하는 6자이상 영문자 또는 숫자이어야 합니다.")
											.fadeIn(500);
									$("#idYn").delay(2000);
									$("#idYn").fadeOut(500);
									$('#userId').val("");
									$('#userId').focus();
								}
							});
			/* 비밀번호 유효성체크  */
			$('#userPw')
					.change(
							function() {

								var reg2 = /^[A-Za-z0-9_-]{6,16}$/;

								if (!reg2.test($('#userPw').val())) {
									$('#passCheck')
											.html(
													"<p style='color:red'>영문대소문자+숫자 6~16자리로 작성해주세요.</p>")
											.fadeIn(500);
									$("#passCheck").delay(2000);
									$("#passCheck").fadeOut(500);
									$('#userPw').val('');
									$('#userPw').focus();
								}
								this.setCustomValidity('');
							});

			/* 비밀번호와 비밀번호가 같은지 유효성체크  */
			$('#userPwCheck').change(
					function() {
						if ($('#userPw').val() != $('#userPwCheck').val()) {
							$('#passpassCheck').html(
									"<p style='color:red'>비밀번호가 다릅니다.</p>")
									.fadeIn(500);
							$("#passpassCheck").delay(2000);
							$("#passpassCheck").fadeOut(500);
							$('#userPwCheck').val('');
							$('#passpassCheck').focus();
						} else {
							$('#passpassCheck').html(
									"<p style='color:blue'>비밀번호 확인되었습니다.</p>")
									.fadeIn(500);
							$("#passpassCheck").delay(2000);
							$("#passpassCheck").fadeOut(500);
						}
						this.setCustomValidity('');
					});
		});//End jQuery
		$(document).ready(function(event) {
			// 160714 추가 : 직업 기타 선택시 직접 입력 필드 노출 상태 변경 스크립트 추가
			// 직업 셀렉트 체인지 이벤트
			$(".info-job select").on("change", function(event) {
				// 기타인 경우 직접입력란 노출
				if ($(this).val() == "etc") {
					$(".job-etc").show();
				} else {
					$(".job-etc").hide();
				}
			});
			$(".btn-check-postnum").on("click", function(event) {
				nepa_m.popupByData("/html/m_popup/popup_address_search.html");
			});

			/*  $("input:radio[name=weddingYn]").on("click", function(event){
				if($("input:radio[name=weddingYn]:checked").val()=="N"){
					$(".info-annivarsary").attr('disabled' , 'false');
				}else{
					$(".info-annivarsary").attr('disabled', 'true');
				}
			});  */
		});
		function changeWeddingYn(value) {
			if (value == 'N') {
				$("#wedding1").val("");
				$("#wedding2").val("");
				$("#wedding3").val("");
				$("#wedding1").attr("disabled", true);
				$("#wedding2").attr("disabled", true);
				$("#wedding3").attr("disabled", true);
			} else {
				$("#wedding1").removeAttr("disabled", false);
				$("#wedding2").removeAttr("disabled", false);
				$("#wedding3").removeAttr("disabled", false);
			}
		}
	</script>
	<script src="http://malsup.github.com/jquery.form.js"></script>
	<!-- <script type="text/javascript">
        $(document).ready(function(){
            $("#btnCheckId").on("click", function (event){
                // 160603 변경된 popupByData 함수 형식으로 수정
                nepa.popupByData("/html/popup/popup_check_id.html");
            });
            
            $("#btnCheckMail").on("click", function (event){
                // 160603 변경된 popupByData 함수 형식으로 수정
                nepa.popupByData("/html/popup/popup_check_mail.html");
            });
        });
    </script> -->
</body>
</html>