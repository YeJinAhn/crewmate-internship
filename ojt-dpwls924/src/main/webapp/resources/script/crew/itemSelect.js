/******************************************************************************
	작성자 : 김세형

	작성일 : 2016.08.18
	기능   : 연관상품 등록 공통 스크립트
******************************************************************************/

var itemSelect = (function(window, $, undefined) {
	
	// 선택상품 나타나는 영역
	var itemSelectArea = "#itemSelectArea";
	
	// 추가된 상품목록
	var itemList = [];
	
	// 삭제된 상품목록
	var removeArr = [];
	
	// 정렬 기준
	var sortCriteria = "dispNo";
	
	// 상품선택 팝업
	var popup = null;
	
	// 전시순서 최대값
	var maxDispNo = 0;
	
	var comp = {
		
		/** 초기화 함수 **/
		/**
		 * itemList (Array) 필수값
		 * itemSelectArea (string) 선택
		 * 
		 * **/
		init : function(options) {
			setOptions(options);
			refresh();
		},
		
		addItem : addItem,
		
		// 추가된 상품목록 가져오기
		// 파라미터는 {"itemId", "dispNo"} 와 같이 가져오고 싶은 데이터를 넣어주면 됨, 넣지않으면 전부 가져옴 (자바단에서 Object로 변환할 때 에러발생할 수 있음)
		getItemList : function(filterArr) {
			var filterList = [];
			var obj, fLen, i;
			applyDispNo();
			if(typeof filterArr === "object" && Array.isArray(filterArr)) {
				fLen = filterArr.length;
				$.each(itemList, function(){
					obj = {};
					for(i = 0 ; i < fLen ; i++) {
						obj[filterArr[i]] = this[filterArr[i]];
					}
					filterList.push(obj);
				});
				return filterList;
			} else {
				return setOrder(itemList);
			}
		},
		
		// 삭제한 상품데이터 목록 가져오기
		getRemoveArr : function() {
			return removeArr;
		},
		
		// 상품목록을 전시순서에 따라 정렬하여 반환
		setOrder : setOrder,
		
		// 상품선택 팝업호출 함수
		openPopup : function() {
			popup = openItem("itemSelect.addItem", "Y");
		}
		
	}
	
	function setOptions(options) {
		if(options === undefined) { throw Error("itemList 옵션은 필수값입니다."); }
		if( !(typeof options.itemList === "object" && Array.isArray(options.itemList)) ) { throw Error("올바른 itemList 값을 넣어주세요."); }
		itemList = options.itemList;
		if(options.itemSelectArea) { itemSelectArea = options.itemSelectArea; }
	}
	
	// 삭제버튼 이벤트 바인딩 함수
	function bindRemoveBtn() {
		$removeBtn = $(this.itemSelectArea).find(".remove");
		$removeBtn.off("click");
		$removeBtn.on("click", function() {
			removeItem($removeBtn.index(this), this);
		});
	}
	
	// 연관상품 추가
	function addItem(list) {
		var $itemSelectArea = $(itemSelectArea);
		var html = [];
		var tempList = [];
		applyDispNo();
		$.each(list, function() {
			if(containsId(this.itemId)) { return true; }
			html.push("<tr>");
			html.push("<td>" + getItemImgTag(this.itemImagePath, 66, 66, this.itemNmShop, null, null, null) + "</td>");
			html.push("<td>" + this.itemCd + "</td>");
			html.push("<td>" + this.itemNmShop + "</td>");
			html.push("<td><input type='text' class='tc input-order-num onlynum' value='" + ++maxDispNo + "' maxlength='4' /></td>");
			html.push("<td><button type='button' class='btn-gray remove'>삭제</button></td>");
			html.push("</tr>");
			
			tempList.push(this);
		});
		$itemSelectArea.append(html.join(""));
		
		// IE에서 팝업창 닫을시 객체에 접근할 수 없었던 것 수정
		// (IE는 팝업에서 opener에 객체형 변수를 전달할 때 값이 아닌 참조형으로 전달해서 생기는 문제)
		itemList = JSON.parse(JSON.stringify(itemList.concat(tempList)));
		
		bindRemoveBtn();
		
		popup.close();
	}
	
	// 연관상품 삭제
	function removeItem(index, element) {
		var $row = $(element).parent().parent();
		var tempList = [];
		
		tempList.push(itemList[index].itemId);
		removeArr = removeArr.concat(tempList);
		itemList.splice(index, 1);
		$row.remove();
		
		bindRemoveBtn();
	}
	
	// 연관상품 영역 새로고침 함수
	function refresh() {
		var $itemSelectArea = $(itemSelectArea);
		var html = [];
		itemList = setOrder(itemList);
		$itemSelectArea.children().remove();
		$.each(itemList, function() {
			html.push("<tr>");
			html.push("<td>" + getItemImgTag(this.itemImagePath, 66, 66, this.itemNmShop, null, null, null) + "</td>");
			html.push("<td>" + this.itemCd + "</td>");
			html.push("<td>" + this.itemNmShop + "</td>");
			html.push("<td><input type='text' class='tc input-order-num onlynum' value='" + this.dispNo + "' maxlength='4' /></td>");
			html.push("<td><button type='button' class='btn-gray remove'>삭제</button></td>");
			html.push("</tr>");
			if(this.dispNo > maxDispNo) { maxDispNo = this.dispNo; }
		});
		$itemSelectArea.append(html.join(""));
		
		bindRemoveBtn();
	}
	
	// 리스트 정렬 함수
	function setOrder(list) {
		var $textBoxes = $(itemSelectArea).find(".input-order-num");
		
		if(typeof list === "object" && Array.isArray(list)) {
			$textBoxes.each(function(index){
				list[index][sortCriteria] = Number(this.value);
			});
			list.sort(function(a, b){return a[sortCriteria] - b[sortCriteria];});
			return list;
		} else {
			return [];
		}
	}
	
	// 텍스트박스에 입력한 전시순서 적용 함수
	function applyDispNo() {
		var $textBoxes = $(itemSelectArea).find(".input-order-num");
		var dispNo;
		$textBoxes.each(function(index){
			dispNo = Number(this.value);
			itemList[index].dispNo = dispNo;
			if(maxDispNo < dispNo) { maxDispNo = dispNo; }
		});
	}
	
	// 파라미터로 받은 ID가 현재 리스트에 포함되어 있는지 확인
	function containsId(itemId) {
		var iLen = itemList.length;
		var result = false;
		var i;
		for(i = 0 ; i < iLen ; i++) {
			if(itemList[i].itemId === itemId) {
				result = true;
				break;
			}
		}
		return result;
	}
	
	return comp;
	
}(window, jQuery));