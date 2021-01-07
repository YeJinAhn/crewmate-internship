<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core"%>

<body>
    <h3 class="table-title" id="">Button</h3><br>
    <div class="btn-wrap">
        <button type="button" class="btn btn-primary">btn btn-primary</button>
        <button type="button" class="btn btn-cancel">btn btn-cancel</button>
        <button type="button" class="btn btn-fold">btn btn-fold</button>
    </div>
    <h3 class="table-title" id="">Sample</h3>
    <div class="table-form-wrap">
        <%--
        <button type="button" class="btn btn-primary" onclick="location.href='/sample/sampleList';">Sample List</button>
        <br><br>
        <button type="button" class="btn btn-primary" onclick="location.href='/sample/sampleForm';">Sample Form</button>
        <br><br>
        <button type="button" class="btn btn-primary" onclick="location.href='/admin/adminListExcel';">Sample Excel</button>
        <br><br>
        <button type="button" class="btn btn-primary" onclick="location.href='/sample/fileSampleForm';">Sample File Upload</button>
        <br><br>
        --%>
        <button type="button" class="btn btn-primary" onclick="loadingBarTest();">Sample Loading Bar</button>
        <br><br>
        <button type="button" class="btn btn-primary" onclick="toJson();">Obj To Json</button>
        <div id="jsonDiv"></div>
        <br><br>
        <div class="tab-wrap">
            <ul>
                <li><a href="#tab1">tab1</a></li>
                <li><a href="#tab2">tab2</a></li>
                <li><a href="#tab3">tab3</a></li>
            </ul>
            <div id="tab1">
                <p>First tab is active by default:</p>
                <!-- common.js에 이미 아래와 같이 선언되어있음. 사용하는 곳에서는 탭영역에 class="tab-wrap"을 지정하고 id값으로 영역을 지정해주면 된다. function setTabs() 참고.-->
                <pre><code>$( ".tab-wrap" ).tabs();</code></pre>
            </div>
            <div id="tab2">
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.<br>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.<br>
            </div>
            <div id="tab3">
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.<br>
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.<br>
               Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
            </div>
        </div>
        <br><br>
        <%--
        <crew:select target="menuList" name="select1" selectedValue="3" key="ctgSeq" value="ctgNm" title="선택하세요"/>
        <br><br>
        <crew:radio target="ctgList" name="radio1" selectedValue="100" key="ctgSeq" value="ctgNm" exceptValues="4,5,6" title="전체"/>
        <br><br>
        <!-- 해당카테고리의 상위카테고리 명을 노출한다. -->
        <crew:ctgPathNm ctgSeq="1470" />
        <br><br>
        <crew:checkbox target="adminList" name="checkbox1" key="adminId" value="adminNm" selectedValue="20"  exceptValues="10,30" title="체크하세요"/>
        <br><br>
        <crew:radio target="USER_STAT_CD" name="radio2" selectedValue="3" exceptValues="4,5,6" title="전체"/>
        <br><br>
        <crew:checkbox target="USER_STAT_CD" name="checkbox2" exceptValues="10,30" title="전체"/>
        <br><br>
        <crew:codeNm code="10" codeMst="VNDR_STAT_CD"/>
        <crew:codeNm code="20" codeMst="VNDR_STAT_CD"/>
        <crew:codeNm code="30" codeMst="VNDR_STAT_CD"/>
        <br><br>
        <div>
            <crew:select target="ctgList" name="ctgSeq" selectedValue="3" key="ctgSeq" value="ctgNm" title="선택하세요" addAttr="onChange=common.setCtgSelect(this);"/>
        </div>
        <div>
            <crew:select target="menuList" name="ctgSeq" selectedValue="3" key="ctgSeq" value="ctgNm" title="선택하세요" addAttr="onChange=common.setCtgSelect(this,'menu');"/>
        </div>
        <div>
            <crew:select target="notiInfoList" name="notiseq" selectedValue="3" key="ctgSeq" value="ctgNm" title="선택하세요" addAttr="onChange=common.setCtgSelect(this,'infoNoti');"/>
        </div>
        <div>
            <crew:select target="faqList" name="ctgSeq" selectedValue="3" key="ctgSeq" value="ctgNm" title="선택하세요" addAttr="onChange=common.setCtgSelect(this,'faq');"/>
        </div>
        --%>
    </div>
<!--
[공통팝업 코딩 가이드]
1. 공통팝업은 url에 /popup 으로 추가하여 사용.
2. 동일한 jsp를 사용중인 경우, popupYn으로 컨트롤 하여 사용.
3. boCommonScript에 함수 정의.
4. 사용할 콜백함수이름 및 필요한 파라미터는 예시와 같이 사용 ex) openAdminPopup('callback=callbackAdminPopup&userStatCd=10');
5. 선택하여 부모창에 내리는 로직 있는 경우 param값과 선택한 값을 jsonObject 타입으로 리턴. (ex) adminList.jsp)
  -->
<h3 class="table-title" id="">공통 팝업</h3>
<div class="table-form-wrap">
    <table class="table-form">
        <tbody>
            <tr>
                <td class="tl btn_td">
                    <!-- 공통팝업 샘플 -->
                    <!--
                    <button class="btn btn-mint" onclick="openAdminPopup('callback=callbackAdminPopup&userStatCd=10');">관리자 검색 팝업(다중 선택)</button>
                    -->
                    <!-- //공통팝업 샘플 -->
                    <!-- 
                    <button class="btn btn-mint" onclick="openVndrPopup('callback=popupCallback&multYn=Y')">벤더 공통팝업</button>
                    <button class="btn btn-mint" onclick="openBrand()">브랜드 공통팝업</button>
                    <button class="btn btn-mint" onclick="openBnrPopup('callback=callbackBnrPopup');">배너 공통팝업</button>
                    <button class="btn btn-mint" onclick="openContPopup('callback=callbackContPopup');">컨텐츠 공통팝업</button>
                    <button class="btn btn-mint" onclick="openDispAreaPopup('callback=callbackDispAreaPopup');">전시영역 공통팝업</button>
                    <button class="btn btn-mint" onclick="openPrdPopup('callback=callbackPrdPopup&multYn=Y')">상품 공통팝업</button>
                    -->
                    <button class="btn btn-mint" onclick="openSamplePopup('callback=callbackSamplePopup&multYn=N')">sample 공통팝업 (단일 선택)</button>
                    <button class="btn btn-mint" onclick="openSamplePopup('callback=callbackSamplePopup&multYn=Y')">sample 공통팝업 (복수 선택)</button>
                </td>
            </tr>
            <tr><td><textArea id="testArea" style="width: 95%;height: 200px;"></textArea></td></tr>
        </tbody>
    </table>
</div>

<h3 class="table-title" id="">우편번호 조회</h3>
<div class="table-form-wrap">
    <table class="table-form">
        <tbody>
            <tr>
                <td class="tl">
                    <input type="text" name="zipcode" id="zipcode" value="" class="txt required" title="우편 번호" maxlength="6"/>
                    <button class="btn btn-mint" onclick="openJuso(completeCallback);">주소조회팝업</button><br>
                    <input type="text" name="baseAddr" id="baseAddr" value="" class="txt required" title="기본 주소" maxlength="100" style="width:300px"/>
                    <input type="text" name="addrDtl" id="addrDtl" value="" class="txt required" title="주소 상세" maxlength="250" style="width:300px"/>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</body>

<script type="text/javascript" src="/js/crewshop.js"></script>
<script>


//소속 벤더 콜백
function popupCallback(data){
    console.log(data);
    alert('callback');
}

//주소 우편번호 콜백
function completeCallback(addr,zip){
    $('#zipcode').val(zip);
    $('#baseAddr').val(addr);
}

//object to json
function toJson() {
    var htmlArr = [];
    htmlArr.push('============toJson 전===========<br>');
    htmlArr.push('${ctgList}');
    htmlArr.push('<br>');
    htmlArr.push('================================<br><br>');
    htmlArr.push('============toJson 후===========<br>');
    htmlArr.push(${core:toJson(ctgList) });
    htmlArr.push('<br>');
    htmlArr.push('================================<br><br>');
    htmlArr.push('============toJson된 실제 데이터 값===========<br>');
    htmlArr.push('${core:toJson(ctgList) }');
    htmlArr.push('<br>');
    htmlArr.push('================================<br>');
    $('#jsonDiv').html(htmlArr.join());
}

// 브랜드 콜백
function callbackBrand(jsonData) {
    console.log(jsonData);
    console.log(jsonData.brandNm);
}

/**
 * 로딩바 샘플
 * 보통 ajax 통신 전에 로딩바를 노출시킨 후
 * ajax 통신 완료가 끝나면 숨김
 */
function loadingBarTest(){
    // 로딩바 생성
    showLoadingBar();

    // 숨김 테스트를 위하여.. 시간차 줌
    setTimeout(function(){
        hideLoadingBar();
    },500);
}

// 배너 콜백
function callbackBnrPopup(data) {
    var param = decodeURIComponent(data.param);
    var test = "";
    for (var i in data.list) {
        console.log(data.list[i]);
        test += (data.list[i].dispItemSeq + ", " + data.list[i].title + "\n")
    }

    $("#testArea").val("param=" + param + "\n" + test);
    $("#testArea").focus();
}

// 컨텐츠 콜백
function callbackContPopup(data) {
    var param = decodeURIComponent(data.param);
    var test = "";
    for (var i in data.list) {
        console.log(data.list[i]);
        test += (data.list[i].dispItemSeq + ", " + data.list[i].title + "\n")
    }

    $("#testArea").val("param=" + param + "\n" + test);
    $("#testArea").focus();
}

// 전시 영역 콜백
function callbackDispAreaPopup(data) {
    var param = decodeURIComponent(data.param);
    var test = "";
    for (var i in data.list) {
        console.log(data.list[i]);
        test += (data.list[i].dispAreaId + ", " + data.list[i].dispAreaTypeNm + "\n")
    }

    $("#testArea").val("param=" + param + "\n" + test);
    $("#testArea").focus();
}

// 관리자 콜백함수
function callbackAdminPopup(data){
    var param = decodeURIComponent(data.param);
    var test = "";
    for (var i in data.list) {
        console.log(data.list[i]);
        test += (data.list[i].adminId + ", " + data.list[i].adminNm + "\n")
    }

    $("#testArea").val("param=" + param + "\n" + test);
    $("#testArea").focus();
}

// 상품 콜백함수
function callbackPrdPopup(data){
    var test = "";
    for (var i in data.list) {
        console.log(data.list[i]);
        test += (data.list[i].prdMstSeq + ", " + data.list[i].prdNm + "\n")
    }

    $("#testArea").val(test);
    $("#testArea").focus();
}

// sample callback function
function callbackSamplePopup(data) {
    let test = "";
    data.list.forEach((data) => {
        test += (data.boardArtclSeq + ' / ' + data.boardArtclTitle + '\n');
    });
    $("#testArea").val(test);
    $("#testArea").focus();
}
</script>