<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring" %>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="/crewmate/core" prefix="core" %>

<script>

// console.log('${pageSize}');
// console.log('${size}');
// console.log('${number}');

var shop = {
    serverJs        : "<c:out value="${SERVER_JS}"/>",
    serverImg       : "<c:out value="${SERVER_IMG}"/>"
};


$(document).ready(function(event){

    initDatepicker();

    $("#btnReset").click(function(event){
        formClear($("form[name=searchForm]"));
    });

 // 목록 검색 영역의 검색 버튼 클릭 이벤트 핸들
    $("#btnSearch").click(function(event){
        // int형 search의 경우 값이 없으면 0으로 대체
        $(".defaultZero").each(function(idx){
            if($(this).val().length == 0){
                $(this).val(0);
            }
        });

        $(".datepicker").each(function(idx){
            var str = $(this).val().replace(/\./g,"");
            $(this).val(str);
        });
        $("form[name=searchForm]").submit();
    });

    // 상세화면의 목록 버튼 클릭 이벤트 헨들
    if($('button.list').length > 0){
        var searchParam = "${paramMap.searchData}";
        if (searchParam) {
            var fnString = $('button.list').prop('onclick').toString();
            var listUrl = fnString.substring(fnString.indexOf("'") + 1, fnString.lastIndexOf("'"));
            if(listUrl){
                $('button.list').click(function(){
                    location.href = listUrl + (listUrl.indexOf('?') > 0 ? '&' + searchParam : '?' + searchParam);
                });
            }
        }
    }

});

/**
 * 달력선택 인터페이스를 구성함.
 */
function initDatepicker(){
	$(".datepicker").removeClass('hasDatepicker');
	$(".datepicker").attr('id','');
	$(".ui-datepicker-trigger").remove();
    $(".datepicker").datepicker({
        showOn      : "both",
        buttonImage : "/images/icon/icon_datepicker.png",
        buttonImageOnly : true,
        dateFormat  : "yy.mm.dd",
        monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
        dayNames: ['일','월','화','수','목','금','토'],
        dayNamesShort: ['일','월','화','수','목','금','토'],
        dayNamesMin: ['일','월','화','수','목','금','토'],
        showMonthAfterYear: true,
        yearSuffix: '년'
    }).keyup(function(e) {
        if(e.keyCode == 8 || e.keyCode == 46) {
            $.datepicker._clearDate(this);
        }
    });
}

// 해당 기간의 날짜를 설정한다. - 목록 검색 조건의 기간 조건 처리용임.
function dateRangeSelect(obj, day){
    if (day == 100) {
        $(obj).parent().parent().find(".datepicker").each(function(idx){
            $(this).val('');
        });
        return;
    }

    var endDt   = new Date();
    var startDt = new Date();
    startDt.setTime(endDt.getTime() - day * 24 * 60 * 60 * 1000);

    var startDtStr  = startDt.getFullYear() + "." + (startDt.getMonth() + 1 < 10 ? "0" + (startDt.getMonth() + 1) : startDt.getMonth() + 1) + "." + (startDt.getDate() < 10 ? "0" + startDt.getDate() : startDt.getDate());
    var endDtStr    = endDt.getFullYear() + "." + (endDt.getMonth() + 1 < 10 ? "0" + (endDt.getMonth() + 1) : endDt.getMonth() + 1) + "." + (endDt.getDate() < 10 ? "0" + endDt.getDate() : endDt.getDate());

    $(obj).parent().parent().find(".datepicker").each(function(idx){
        $(this).val(idx == 0 ? startDtStr : endDtStr);
    });
}




function formClear(obj){
    $.each(obj.find('input,select,textarea'), function(name){
        if(this.tagName == 'INPUT'){
            if($(this).prop('type').toUpperCase() == 'TEXT')$(this).val('');
            if($(this).prop('type').toUpperCase() == 'CHECKBOX')$(this).prop("checked", false);
            if($(this).prop('type').toUpperCase() == 'RADIO') {
            $(this).prop("checked", false);
            $(obj).find("[name='" + $(this).attr("name") + "']").first().prop("checked", true);
            }
            if($(this).prop('type').toUpperCase() == 'HIDDEN'){ if(!$(this).data("except"))$(this).val(''); }
        }else if(this.tagName == 'SELECT'){
            if ($(this).attr('class') == 'ctgSel') {
                // 동적으로 생성된 카테고리 셀렉트인경우 제거
                $(this).remove();
            } else{
                $(this).children().first().prop('selected',true);
            }
        }else if(this.tagName == 'TEXTAREA'){
            $(this).val('');
        }
    });
}

// 목록 개수 변경 이벤트 처리용 함수
function listSizeSelectChange(sel){
    var listSize    = sel.value;
    var param       = "<core:param skip='listSize,page' />";
    location.href   = (param == "" ? "?" + param : "?" + param + "&") + "listSize=" + listSize;
}

// 체크박스 전체 체크
function checkAll(chk, name){
    $("input[type=checkbox][name=" + name + "]").prop("checked", chk.checked);
}

//브랜드 팝업 호출
function openBrand(callbackFn) {
    var win = window.open('/brand/brandList/popup', 'brand', 'width=1400px, height=800px, resizable=no, location=no, top=100px, left=300px;')

    // callback 함수 지정
    if(typeof(callbackFn) == "function"){
        win.callbackFn = callbackFn;

        // 위에서 onload 이벤트 발생전에 윈도우가 활성화 되었다면 onload에서 다시 적용해준다.
        win.onload = function(){
            win.callbackFn = callbackFn;
        }
    }
}

// 로딩바가 존재하는 경우 노출, 없는 경우 새로 생성
function showLoadingBar(){
    if($('#loadingBar').length == 0){
        var html = [];
        html.push('<div class="loading" id="loadingBar">');
        html.push('    <div class="img_wrap">');
        html.push('        <img src="/images/common/loading_bar.gif">');
        html.push('        <span>Loading...</span>');
        html.push('    </div>');
        html.push('</div>');
        $('body').append(html.join(''));
    }

    $('#loadingBar').show();
}

// 로딩바가 존재하는 경우 숨김
function hideLoadingBar(){
    if($('#loadingBar').length > 0){
        $('#loadingBar').hide();
    }
}

//주소 검색 팝업 호출
function openJuso(callbackFn) {
    var win = window.open('/common/popup/searchJusoPopup', 'juso', 'width=500px, height=600px, resizable=no, location=no, top=100px, left=300px;')

    // callback 함수 지정
    if(typeof(callbackFn) == "function"){
        win.callbackFn = callbackFn;

        // 위에서 onload 이벤트 발생전에 윈도우가 활성화 되었다면 onload에서 다시 적용해준다.
        win.onload = function(){
            win.callbackFn = callbackFn;
        }
    }
}
/*
 * 관리자 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openAdminPopup('callback=callbackAdminPopup&userStatCd=10')
 */
function openAdminPopup(param) {
   var url = '/admin/adminList/popup';
   if (param != null && param != "" && typeof param != 'undefined') {
      url += '?' + param;
   }
   window.open(url, 'adminPopup', 'width=800px, height=780px, resizable=no, location=no, top=150px, left=150px;');
}

/*
 * 전시영역 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openDispAreaPopup('callback=callbackDispAreaPopup')
 */
function openDispAreaPopup(param) {
    var url = '/dispTmpl/dispAreaList/popup';
    if (param != null && param != "" && typeof param != 'undefined') {
        url += '?' + param;
    }
    window.open(url, 'dispAreaPopup', 'width=1200px, height=850px, resizable=no, location=no, top=50px, left=150px;');
}

/*
 * 벤더 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openAdminPopup('callback=callbackAdminPopup&userStatCd=10')
 */
function openVndrPopup(param) {
    var url = '/vndr/vndrList/popup';
    if (param != null && param != "" && typeof param != 'undefined') {
        url += '?' + param;
    }
    window.open(url, 'vndrPopup', 'width=800px, height=780px, resizable=no, location=no, top=150px, left=150px;');
}

/*
 * 배너 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openBnrPopup('callback=callbackBnrPopup')
 */
function openBnrPopup(param) {
    var url = '/dispItem/bnrList/popup';
    if (param != null && param != "" && typeof param != 'undefined') {
        url += '?' + param;
    }
    window.open(url, 'bnrListPopup', 'width=1100px, height=640px, resizable=no, location=no, top=150px, left=150px;');
}

/*
 * 배너 등록팝업 호출
 */
function openBnrFormRegPopup() {
    var url = '/dispItem/bnrFormReg/popup';
    window.open(url, 'bnrFormRegPopup', 'width=1100px, height=600px, resizable=no, location=no, top=150px, left=150px;');
}

/*
 * 컨텐츠 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openContPopup('callback=callbackContPopup')
 */
function openContPopup(param) {
    var url = '/dispItem/contList/popup';
    if (param != null && param != "" && typeof param != 'undefined') {
        url += '?' + param;
    }
    window.open(url, 'contPopup', 'width=1100px, height=640px, resizable=no, location=no, top=150px, left=150px;');
}

/**
 * 날짜적용
 */
function getDateTimeVal(id){
    if(!id){
        id = 'dateTime';
    }

    var strtDtm = $('div[id="'+id+'"]').find('input[name="strtDtm"]').val();
    if(strtDtm){
        strtDtm = strtDtm.replace(/\./g,"");
    }
    var strtHour = $('div[id="'+id+'"]').find('select[name="strtHour"] option:selected').val();
    var strtMin = $('div[id="'+id+'"]').find('select[name="strtMin"] option:selected').val();
    var strtsSecnd = $('div[id="'+id+'"]').find('select[name="strtsSecnd"] option:selected').val();
    var strtDt = strtDtm + strtHour + strtMin +strtsSecnd;

    var endDtm = $('div[id="'+id+'"]').find('input[name="endDtm"]').val();
    if(endDtm){
        endDtm = endDtm.replace(/\./g,"");
    }
    var endHour = $('div[id="'+id+'"]').find('select[name="endHour"] option:selected').val();
    var endMin = $('div[id="'+id+'"]').find('select[name="endMin"] option:selected').val();
    var endsSecnd = $('div[id="'+id+'"]').find('select[name="endsSecnd"] option:selected').val();

    var endDt = endDtm + endHour + endMin +endsSecnd;

    var result = {
        strtDt : strtDt
        , endDt : endDt
    }
    return result;
}

/*
 * 상품 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openAdminPopup('callback=callbackAdminPopup&userStatCd=10')
 */
function openPrdPopup(param) {
    var url = '/prd/prdList/popup';
    if (param != null && param != "" && typeof param != 'undefined') {
        url += '?' + param;
    }
    window.open(url, 'prdPopup', 'width=1500px, height=900px, resizable=no, location=no, top=50px, left=300px;');
}

/*
 * sample 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openSamplePopup('callback=callbackSamplePopup')
 */
function openSamplePopup(param) {
   var url = '/sample/boardList/popup';
   if (param != null && param != "" && typeof param != 'undefined') {
      url += '?' + param;
   } 
   window.open(url, 'samplePopup', 'width=800px, height=780px, resizable=no, location=no, top=150px, left=150px;');
}

/*
 * board 검색팝업 호출
 * param 에는 호출할 화면에서 사용할 콜백함수명 등 필요한 값을 보냄
 * ex. openBoardPopup('callback=callbackBoardPopup')
 */
function openBoardPopup(param) {
   var url = '/board/boardList/popup';
   if (param != null && param != "" && typeof param != 'undefined') {
      url += '?' + param;
   }
   window.open(url, 'boardPopup', 'width=800px, height=780px, resizable=no, location=no, top=150px, left=150px;');
}

function openProductPopup(param) {
	   var url = '/product/product/popup';
	   if (param != null && param != "" && typeof param != 'undefined') {
	      url += '?' + param;
	   }
	   window.open(url, 'productPopup', 'width=800px, height=780px, resizable=no, location=no, top=150px, left=150px;');
	}
	
/* function openBrandPopup(param) {
	   var url = '/product/popupBrandList/popup';
	   if (param != null && param != "" && typeof param != 'undefined') {
	      url += '?' + param;
	   }
	   window.open(url, 'productPopup', 'width=987px, height=876px, resizable=yes, location=no, top=150px, left=150px;');
	}	 */
</script>