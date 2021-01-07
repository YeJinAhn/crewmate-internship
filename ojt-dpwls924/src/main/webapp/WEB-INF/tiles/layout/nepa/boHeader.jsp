<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>

 <div class="gnb-wrap">
            <div class="gnb-header">
                <div class="gnb-inner">
                    <div class="login-list-wrap">
                        <ul class="login-list">
                            <li><a href="#" class="btn-link"><i class="ico-login"></i>로그인</a></li>
                            <li><a href="/nepa/user/join1_1" class="btn-link"><i class="ico-join"></i>회원가입</a></li>
                        </ul>
                    </div>
                    <div class="util-wrap">
                        <ul>
                            <li><a href="#" class="btn-link">장바구니</a></li>
                            <li><a href="#" class="btn-link">공지사항</a></li><!-- 160923 추가 : 공지사항 버튼 추가 -->
                            <li><a href="#" class="btn-link">고객센터</a></li>
                            <li class="last"><a href="#" class="btn-link">매장찾기</a></li><!-- 160823 수정 : 버튼명칭 변경-->
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="gnb-sub">
                <div class="gnb-sub-wrap">
                    <div class="gnb-inner">
                        <span class="brand-logo nepa-mall"><a href="#none"></a></span><!-- 160722 수정 : 로고에 링크 추가 -->
                        <div class="menu-list-wrap">
                            <!-- 160901 수정 : 하단 ul.menu-sub-list에 있던 서브매뉴 ul을 menu-list쪽으로 옮김 -->
                            <ul class="menu-list">
                                <li>
                                    <a href="#" class="btn-link">MAN</a>
                                    <ul>
                                        <li>
                                            <a href="#">Outer</a>
                                        </li>
                                        <li>
                                            <a href="#">Tops</a>
                                        </li>
                                        <li>
                                            <a href="#">Bottoms</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="btn-link">WOMAN</a>
                                    <ul>
                                        <li>
                                            <a href="#">Outer</a>
                                        </li>
                                        <li>
                                            <a href="#">Tops</a>
                                        </li>
                                        <li>
                                            <a href="#">Bottoms</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="btn-link">KIDS</a>
                                    <ul>
                                        <li>
                                            <a href="#">Outer</a>
                                        </li>
                                        <li>
                                            <a href="#">Tops</a>
                                        </li>
                                        <li>
                                            <a href="#">Bottoms</a>
                                        </li>
                                        <li>
                                            <a href="#">Footwear</a>
                                        </li>
                                        <li>
                                            <a href="#">Backpack</a>
                                        </li>
                                        <li>
                                            <a href="#">Hat&amp;Cap</a>
                                        </li>
                                        <li>
                                            <a href="#">Acc&amp;Etc</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="btn-link">FOOTWEAR</a>
                                    <ul>
                                        <li>
                                            <a href="#">남성화</a>
                                        </li>
                                        <li>
                                            <a href="#">여성화</a>
                                        </li>
                                        <li>
                                            <a href="#">공용화</a>
                                        </li>
                                        <li>
                                            <a href="#">시즌별</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="btn-link">BACKPACK</a>
                                    <ul>
                                        <li>
                                            <a href="#">소형배낭</a>
                                        </li>
                                        <li>
                                            <a href="#">중형배낭</a>
                                        </li>
                                        <li>
                                            <a href="#">대형배낭</a>
                                        </li>
                                        <li>
                                            <a href="#">보조백</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="btn-link">ACC&amp;ETC</a>
                                    <ul>
                                        <li>
                                            <a href="#">모자</a>
                                        </li>
                                        <li>
                                            <a href="#">장갑</a>
                                        </li>
                                        <li>
                                            <a href="#">스틱</a>
                                        </li>
                                        <li>
                                            <a href="#">Inner Wear</a><!-- 160804 수정 : 오타 수정 "Ware" => "Wear" -->
                                        </li>
                                        <li>
                                            <a href="#">방한용품</a>
                                        </li>
                                        <li>
                                            <a href="#">기타소품</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="#" class="btn-link">OUTLET</a>
                                    <ul>
                                        <li>
                                            <a href="#">의류</a>
                                        </li>
                                        <li>
                                            <a href="#">용품</a>
                                        </li>
                                        <li>
                                            <a href="#">Camping</a>
                                        </li>
                                    </ul>
                                </li>
                                <li class="brand">
                                    <a href="#" class="btn btn-link text-brand">BRAND</a>
                                    <ul>
                                        <li>
                                            <a href="#">
                                                <span class="brand-nepa">NEPA</span><!-- 160823 수정 : 브랜드 버튼 변경 -->
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="brand-isen">ISENBERG</span><!-- 160823 수정 : 브랜드 버튼 변경 -->
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                <span class="brand-kids">NEPAKIDS</span><!-- 160823 수정 : 브랜드 버튼 변경 -->
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        <div class="search-wrap">
                            <input type="text" placeholder="봄날 등산에는 익스트림 자켓">
                            <button class="btn btn-search"></button>
                        </div>
                    </div>
                </div>
                <div class="menu-sub-wrap">
                    <div class="menu-sub-inner">
                        <!-- 160901 삭제 : ul.menu-sub-list 삭제 -->
                        <div class="best-product">
                            <div class="item-list-wrap">
                                <span class="title"><span class="best">Best</span> Product</span>
                                <ul class="item-list">
                                    <li class="first-row">
                                        <div class="image-wrap">
                                            <img class="front" src="/resources/images/temp/front_temp_item_thumb01.png" alt="프로바 3L 방수자켓(여성)">
                                            <img class="back" src="/resources/images/temp/front_temp_item_thumb02.png" alt="프로바 3L 방수자켓(여성)">
                                            <!--
                                            <div class="util-wrap">
                                                <div class="util-wrap-inner">
                                                    <button type="button" class="btn btn-quickview"></button>
                                                    <span class="divider"></span>
                                                    <button type="button" class="btn btn-preview"></button>
                                                    <span class="divider"></span>
                                                    <button type="button" class="btn btn-favorite"></button>
                                                </div>
                                            </div>
                                            -->
                                        </div>
                                        <div class="item-detail">
                                            <span class="brand-name nepa">NEPA</span>
                                            <span class="item-name" title="프로바 3L 방수자켓(여성)"><a href="#">프로바 3L 방수자켓(여성) 프로바 3L 방수자켓(여성) 프로바 3L 방수자켓(여성)</a></span>
                                            <div class="cost-wrap">
                                                <span class="cost">79,000원</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>