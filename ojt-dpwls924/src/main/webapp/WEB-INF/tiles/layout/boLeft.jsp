<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="/crewmate/core" prefix="core"%>

<div class="lnb-wrap">
	<div class="lnb-inner">
		<ul class="lnb-list">
			<li class="open"><a href="javascript://">게시판</a>
				<ul class="lnb-sub">
					<li>
					<a href="/sample/boardList">- <span class="menu-name">게시판 sample</span></a>
					</li>
					<li>
					<a href="/board/boardList">- <span class="manu-name">안예진 게시판</span></a>
					</li>
					<li>
					<a href="/product/product">- <span class="menu-name">상품 등록</span></a>
					</li>
					<li>
					<a href="/notice/noticeList">- <span class="menu-name">공지사항 관리</span></a>
					</li>
					<li>
					<a href="/nepa/faqList">- <span class="menu-name">네파[FAQ]</span></a>
					</li>
					<li>
					<a href="/excel">- <span class="menu-name">엑셀</span></a>	
					</li>
					<li>
					<a href="/addrList">- <span class="menu-name">엑셀2</span></a>
					</li>
					<li>
					<a href="/faq/faqList">- <span class="menu-name">FAQ 관리</span></a>
					</li>
					<!-- <li>
					<a href="/practice/jQuerySelector">==</a>
					</li> -->
				</ul>
			</li>
		</ul>
	</div>
	<a href="javascript://" class="btn-lnb-ctrl"></a>
</div>