<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>
<!doctype html>
<html lang="ko">
<head>
    <meta name="viewport" content="user-scalable=yes, maximum-scale=1.0, width=1280"><!-- 160905 수정 : 메타 태그 값 수정 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge"><!-- 160905 추가 : IE 호환성 모드 추가 -->
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
    <title>네파 포털 | 통합회원가입</title>
    <link rel="stylesheet" href="/resources/css/default_front.css" type="text/css" />
    <link rel="stylesheet" href="/resources/css/layout_front.css" type="text/css" />
    <link rel="stylesheet" href="/resources/css/common_front.css" type="text/css" />
    <link rel="stylesheet" href="/resources/css/sub_front.css" type="text/css" />
    
</head>
<body>
    <div class="wrap">
        <div class="content-wrap sub-wrap">
            <div class="content-inner">
                <div class="indicator-wrap">
                    <ul class="indicator-list">
                        <li><a href="#"><img src="/resources/images/common/front_home_indicator.png" alt="홈 아이콘" /> 홈</a></li> <!-- 160628 추가 : 홈 아이콘 추가 -->
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
                        <li class="here">
                            <div class="step-inner step2">
                                <span>STEP 02. 본인인증</span>
                            </div>
                        </li>
                        <li>
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
                <!-- 설명 -->
                <ul class="list-bullet mgt-20">
                    <li>휴대폰인증 및 아이핀인증은 방송통신위원회에서 주관하는 주민등록번호 사용제한정책에 의거, 회원님의 주민등록번호 대신 본인인증평가기관인 NICE신용평가정보(주) 로부터 인증키를 발급받아 본인확인을 하는 서비스입니다. </li>
                    <li>인증기관을 통해 실명인증 및 본인인증을 받게 되므로 NEPA에는 회원님의 주민등록번호가 저장되지 않아 보다 안심하고 서비스를 이용하실 수 있습니다.</li>
                </ul>
                
                <!-- // -->
                <!-- 인증 폼 -->
                <div class="confirm-wrap mgt-40">
                    <div class="confirm-box">
                        <h3 class="title">휴대폰 본인인증</h3>
                        <div class="img-box">
                            <img src="/resources/images/join/front_img_join_confirm_phone.gif" alt="" />
                        </div>
                        <p class="desc-txt1">
                            본인명의의 휴대폰 번호로 가입여부 및 본인여부를 확인할 수 있으며,<br />타인명의 / 법인휴대폰 등은 본인인증이 불가합니다.
                        </p>
                        <div class="btn-wrap">
                            <button type="button" id="btnCertPhone" class="btn btn-md btn-gray" onclick="nextJoinForm();">휴대폰 본인인증</button>
                        </div>
                    </div>
                    <div class="confirm-box">
                        <h3 class="title">아이핀(i-PIN) 본인인증</h3>
                        <div class="img-box">
                            <img src="/resources/images/join/front_img_join_confirm_ipin.gif" alt="" />
                        </div>
                        <p class="desc-txt2">
                            본인 명의의 아이핀(i-PIN) 계정으로 인증을 받으실 수 있습니다.
                        </p>
                        <div class="btn-wrap">
                            <button type="button" class="btn btn-md btn-gray" onclick="nextJoinForm();">아이핀(i-PIN) 본인인증</button><!-- 텍스트 변경 20160706 -->
                        </div>
                    </div>
                </div>
                <!-- 하단 설명 -->
                <p class="desc-txt">
                    - 본인인증을 통해 회원인증이 안 되실 경우, 네파 고객센터로 문의하여 주시기 바랍니다. 
                </p>
                <!-- //하단 설명 -->
                
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/resources/vendors/jquery/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="/resources/vendors/jquery/jquery-ui.min.js"></script>
    <script type="text/javascript" src="/resources/js/common_front.js"></script>
    <script type="text/javascript">
    		function nextJoinForm(){
    			var addInfoYn = "${paramMap.addInfoYn}";
    			var marketingYn ="${paramMap.marketingYn}";
    			$.ajax({
        		    url: "/nepa/user/joinFormReg"
        		  , type : "post"
        		  , dataType :"json"
        		  , data:{addInfoYn:addInfoYn, marketingYn:marketingYn}
        	    , success : function(data){
        	    	location.href = "/nepa/user/joinForm?addInfoYn=" + addInfoYn + "&marketingYn=" + marketingYn;
        	    }, error:function(request, status, error){
        	    	
        	    }
        	   });
    		//	location.href = "/nepa/user/joinForm";
    		}
        $(document).ready(function(event){
            $("#btnCertPhone").on("click", function(event){
                // 160603 변경된 popupByData 함수 형식으로 수정
                nepa.popupByData("/html/popup/popup_exist_member.html");
            });
        });
    </script>
</body>
</html>