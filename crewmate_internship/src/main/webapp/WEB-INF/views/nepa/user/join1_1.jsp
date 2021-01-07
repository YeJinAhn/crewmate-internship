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
                <h2 class="title">통합회원가입</h2>
                
                <div class="desc-wrap">
                    <img src="/resources/images/join/front_bg_join_welcome.png" alt="NEPAmall 에 오신것을 환영합니다!">
                    <!-- 
                    20160706 
                    "제휴 브랜드" 에서 "패밀리 브랜드" 로 변경
                    -->
                    <ul class="list-bullet mgt-20">
                        <li class="text-black">NEPA Mall 은 “네파몰 통합 회원”으로 가입을 받고 있습니다. </li>
                        <li>네파몰 통합 회원이 되시면 통합된 회원 ID와 비밀번호로 네파몰 및 각 패밀리 브랜드의 다양한 서비스(마일리지 조회, 카드등록, 회원정보변경 서비스 등)을 <br />이용하실 수 있습니다.</li>
                        <li>기존 네파, 이젠벅 브랜드 중 한 개 이상 가입되어 있는 경우 새로운 네파몰 통합 아이디(ID)를 생성하신 후 가입하실 수 있습니다.</li>
                        <li class="text-black bold">Family Brand : NEPA, ISENBERG, NEPAKIDS</li><!-- 160822 수정 : 텍스트 색상 변경을 위한 class 수정 --><!-- 160808 수정 : 브랜드명 영문으로 변경 -->
                    </ul>
                </div>
                <div class="btn-wrap">
                    <button type="button" class="btn btn-lg btn-gray" onclick = "location.href = '/nepa/user/agreeForm'">통합회원 신규가입</button>
                </div>
                
                <h3 class="sub-title">회원가입 여부를 먼저 확인해주세요</h3>
                <div class="table-wrap">
                    <table class="table-form">
                        <colgroup>
                            <col class="form-header" />
                            <col style="width:auto;" />
                        </colgroup>
                        <tbody>
                            <tr>
                                <th scope="row">이름</th>
                                <td class="input">
                                    <input type="text" class="tbl-input-name" name="userNm" id="userNm" placeholder="이름">
                                </td>
                            </tr>
                            
                            <tr>
                                <th scope="row">휴대폰번호</th>
                                <td class="select phone">
                                    <select class="tbl-select-phone1" id="hp" name="hp">
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="019">019</option>
                                    </select>
                                    <input type="text" class="tbl-input-phone2" id="hp">
                                    <input type="text" class="tbl-input-phone3" id="hp">
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <span class="text-info text-black bold">네파 기존고객님 중 회원정보가 확인되지 않으시면, 고객센터로 연락 부탁드립니다. (Tel. 080-854-0114)</span><!-- 160906 추가 : 텍스트 라인 추가 --><!-- 160919 수정 : 고객센터 전화번호 오기 수정 -->
                    <span class="text-info">입력하신 정보는 저장되지 않으며, 기존 회원가입 여부 확인 용도로만 활용됩니다.</span>
                    <div class="btn-wrap">
                        <button type="button" class="btn btn-md btn-white" onclick="joinYnCheck();">확인</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="/resources/vendors/jquery/jquery-1.11.0.min.js"></script>
    <script type="text/javascript" src="/resources/js/common_front.js"></script>
     <script>
     				function validateCheck(){
     					if($("input[name='userNm']").val()==""){
            				alert("이름을 입력해주세요");
            				return false;
            			}
            			if($(".tbl-input-phone2").val()===""|| $(".tbl-input-phone3").val()===""){
            				alert("전화번호를 입력해주세요.");
            				return false;
            			} 
            			return true;
     				}
     
        		function joinYnCheck(){
        			
        		if(!validateCheck()){
        			return false;
        		}	
         		
        			var data = $("input[name='userNm']").val();
        			var hp1 = $("select[name=hp]").val();
        			var hp2 = $(".tbl-input-phone2").val();
        			var hp3 = $(".tbl-input-phone3").val();
        			var phone = hp1+"-"+hp2+"-"+hp3;
        		$.ajax({
        			url : "/nepa/joinYnCheck"
        		, type: "post"
        		, dataType: "json"
        		, data : {userNm : data, hp :phone}
        		, success : function(data){
        			var result = data.infoMap.check;
        			if(result >= 1){
        				 let html = "<button type='button' class='btn btn-md btn-gray'>아이디 찾기</button> "
	            						+"<button type='button' class='btn btn-md btn-gray'>비밀번호 찾기</button> "
	            						+"<button type='button' class='btn btn-md btn-white' style='width: 162px;'>로그인</button>";
	            	$(".sub-title").text("NEPA 통합회원으로 등록되어 있습니다.");
	            	$(".text-info:eq(1)").text("회원님 반갑습니다! 통합회원으로 로그인해주세요");
	            	$(".btn-wrap:eq(1)").html(html); 
        			//alert("기존 회원입니다.");
        			}else if(result == 0){
        				let html = "<button type='button' class='btn btn-md btn-white' onclick='joinYnCheck();'>다시조회</button> "
	           						+ "<button type='button' class='btn btn-md btn-gray'  onclick='nextAgreeForm();'>통합회원 신규가입</button>";
	           	$(".sub-title").text("기존 서비스 회원으로 등록된 정보가 없습니다.");
	           	$(".btn-wrap:eq(1)").html(html); 
        				//alert("회원정보가 없습니다.");
        			}
        		},error: function(request, status, error){
        			
        		}
        		});
        		};
        
           /*  $(document).ready(function(event){
            }); */
            
        	function nextAgreeForm(){
				location.href="/nepa/user/agreeForm";
            }
        </script>
</body>
</html>