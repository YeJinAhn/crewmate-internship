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
    <title>네파 포털 | 고객센터</title>
</head>
<body>

            	<form name="searchForm" action="/nepa/faqList" method="get">
                <div class="indicator-wrap">
                    <ul class="indicator-list">
                        <li><a href="#"><img src="/resources/images/common/front_home_indicator.png" alt="홈 아이콘" /> 홈</a></li>
                        <li><a href="#">고객센터</a></li>
                        <li class="last">FAQ</li>
                    </ul> 
                </div>
                <!-- 구조 변경 20160628 -->
                <div class="cs-content-left">
                    <div class="cs-header">
                        <p class="title">고객센터</p>
                        <p class="subtext">Customer Center</p>
                    </div>
                    <div class="cs-left-menu">
                        <ul class="left-menu">
                            <li><a href="#">1:1 문의</a></li>
                            <li class="here"><a href="/nepa/faqList">FAQ</a></li>
                            <li><a href="#">대리점 개설안내</a></li>
                            <li><a href="#">상품권 구매문의</a></li>
                            <li><a href="#">단체주문 구매문의</a></li>
                            <li><a href="#">멤버십 카드</a></li>
                            <li><a href="#">개인정보취급방침</a></li>
                            <li class="last"><a href="#">이용약관</a></li>
                        </ul>
                    </div>
                </div>
                <div class="cs-content-right">
                    <!-- TITLE -->
                    <div class="title">
                        FAQ
                    </div>
                    <!-- //TITLE -->
                    <!-- Search -->
                    <div class="faq-search-wrap">
                        <input type="text" id="keyword" value="${paramMap.keyword }">
												<button type="button" class="btn btnx-xmd btn-gray" onclick="changeTap($('#keyword').val(), '')">검색</button>
                    </div>
                    <!-- //Search -->
                    <!-- 분류 -->
                    <div class="faq-type-list-wrap">
                    	<%-- <c:forEach var ="code" items="${codeList}"> --%>
                        <ul class="faq-type-list">
                            <li<c:if test="${empty paramMap.contentGroup and empty paramMap.keyword}">
															class="here"
														</c:if>>
													<a href="#" class="btn" onclick="changeTap('','')">FAQ BEST 10</a>
												<c:forEach items="${codeList}" var="code" varStatus="status">
												<li <c:if test="${paramMap.contentGroup eq code.code }">
															class="here"
														</c:if>>
														<a href="#" class="btn" onclick="changeTap('${paramMap.keyword}','${code.code}');"><c:out value="${code.name }"/></a></li>
													</c:forEach>
                        </ul>
                       <%-- </c:forEach>  --%> 
                    </div>
                    <!-- //분류 -->
                    <!-- 리스트 -->
                    <div class="faq-list-wrap">
					<span class="faq-type-name">
						FAQ <span class="text-mint">
								<c:if test="${empty paramMap.contentGroup and empty paramMap.keyword}">
								BEST 10
								</c:if>
								<c:if test="${!empty paramMap.contentGroup }">
								<c:forEach items="${codeList }" var="code" varStatus="status">
									<c:if test="${paramMap.contentGroup eq code.code }">
									<c:out value="${code.name }"/>
									</c:if>
								</c:forEach>
								</c:if>
								</span>
					</span>
					
					<span class="faq-search-result" <c:if test="${empty paramMap.keyword }">style="display:none;"</div></c:if>>
						<span class="text-red bold">'<c:out value="${paramMap.keyword }"/>'</span> 의 검색결과 <span class="text-black bold">(<c:out value="${list.size()}"/>)</span>
					</span>	
                        <!-- //검색 결과 -->
                        <div class="faq-list-wrap-inner">
                          <c:forEach var="content" items="${list}">
                            <dl class="faq-list fold-list">
                                <dt class="">
                                    <a href="#" class="btn">
                                        <span class="faq-type"><c:out value="${content.title}"/></span>
                                    </a>
                                </dt>
                                <dd>
                                  ${content.content}
                                </dd>
                                
                            </dl>
                          </c:forEach> 
                        </div>
                    </div>
                    <!-- // -->
                </div>
                <!-- //구조 변경 20160628 -->
              </form>  

    <script type="text/javascript">
        $(document).ready(function (){
            $(".faq-type-list li a").on("click", function (event){
                if (!$(this).parent().hasClass("here")) {
                    $(".faq-type-list li").removeClass("here");
                    $(this).parent().addClass("here");
                    console.log($(this).text());
                }
            });
            
            $(".faq-list dt a").on("click", function(event){
                var isOpened = $(this).parent().hasClass("opened");
                $(".faq-list dt").removeClass("opened");
                if (!isOpened) {
                    $(this).parent().addClass("opened"); 
                }
            });

        
        /*if ($('input[name="searchWord"]').val() != '') {
      		$('.faq-search-result').attr('style', "display: ;");
      	}*/
      	
      	
      	if ($(".faq-type-list").find('li.here').index() == 0) {
      		$(".text-mint").text("BEST 10");
      	} else {
      		$(".text-mint").text($(".faq-type-list").find('li.here').text());
      	}
        
        });

      //탭변경
      function changeTap(keyword, contentGroup){
	       /* if(typeof keyword == undefined){
	       } */
	       if (contentGroup != '') {
				keyword = $('#keyword').val();
			}
	       location.href = "/nepa/faqList"+"?keyword=" + keyword + "&contentGroup=" + contentGroup;
      }
    </script>
</body>
</html>