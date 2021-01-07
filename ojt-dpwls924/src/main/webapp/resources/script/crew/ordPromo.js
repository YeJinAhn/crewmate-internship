/******************************************************************************
	작성자 : 김성완
	작성일 : 2016.07.01
	기능 : 주문적용 프로모션 클레임 처리
	참고사항 :
******************************************************************************/
// 프로모션 유형
var pTypeDc = "RANGE_DC"; // 가격대별 할인
var pTypeGift = "RANGE_GIFT"; // 가격대별 사은품
var pTypeSetDc = "ITEM_SET_DC"; // 상품 세트 할인
var pTypeCondDc = "COND_ITEM_DC"; // 2019.08.31 [조건부 상품할인] by SOO

// 프로모션 대상 상품 유형
var pTgtAll = "ALL"; // 전체
var pTgtAllow = "ALLOW"; // 적용대상

// 적용 프로모션 조회
function getPromo(brand, promoType) {
	if (ordPromoInfo.length == 0) {
		return null;
	}
	for (var k in ordPromoInfo) {
		if (ordPromoInfo[k].brand == brand && ordPromoInfo[k].promoType == promoType) {
			return $.extend({}, ordPromoInfo[k]);
		}
	}
	return null;
}

//적용 프로모션 타입 조회
function getPromoType(promo) {
	if (promo == null) {
		return null;
	}
	return promo.promoType;
}

// 프로모션 가격대별 조회
function getNewPromoPrice(brand, promoType, applyPrice) {
	if (promoPriceInfo.length == 0 || applyPrice == 0) {
		return null;
	}
	for (var k in promoPriceInfo) {
		if (brand == promoPriceInfo[k].brand && promoType == promoPriceInfo[k].promoType) {
			if (applyPrice >= promoPriceInfo[k].startPrice && applyPrice < promoPriceInfo[k].endPrice) {
				return $.extend({}, promoPriceInfo[k]);
			}
		}
	}
	return null;
}

// 프로모션 적용 대상상품 조회
function getPromoTgt(promo, itemId) {
	for (var k in promoTgtInfo) {
		if (promoTgtInfo[k].promoNo == promo.promoNo && promoTgtInfo[k].itemIdTarget == itemId) {
			if (promo.promoTgtItemType == pTgtAllow) {
				return true;
			} 
			else {
				false;
			}
		}
	}
	if (promo.promoTgtItemType == pTgtAllow) {
		return false;
	} 
	else {
		return true;
	}
}

// 프로모션별 금액할인 문자열
function getPromoPriceText(promo, checkedItems) {
	
	if (promo == null || ordPromoInfo.length == 0) {
		return '';
	}
	
	var text = '';
	var varBrand = promo.brand;
	var varPromoType = promo.promoType;
	
	if (varPromoType == 'RANGE_DC') {
		text = priceToKor(promo.startPrice) + ' ' + priceDcStr(promo.dcPrice);
		
		var newPromo = getNewPromoPrice(varBrand, pTypeDc, getPromoApplyPrice(promo));
		if (newPromo != null && promo.promoPriceRangeNo != newPromo.promoPriceRangeNo) {
			text += ' -> ' + priceToKor(newPromo.startPrice) + ' ' + priceDcStr(newPromo.dcPrice);
		}
	}
	if (varPromoType == 'ITEM_SET_DC') {
		text = '상품세트 ' + priceDcStr(promo.dcPrice);
	}
	if (varPromoType == 'COND_ITEM_DC') {
		var nepaCondItemDcCnt = 0;
		var nepaCondItemDcAmt = 0;
		for (var i in checkedItems) {
			if (checkedItems[i].brand == varBrand && checkedItems[i].sno == 'COND_ITEM_DC' && checkedItems[i].condItemYn == 'N') {
				nepaCondItemDcCnt++;
				nepaCondItemDcAmt += (checkedItems[i].itemPromoDcPrice * checkedItems[i].claimCnt);
			}
		}
		
		if (nepaCondItemDcCnt > 0) {
			text = '조건부 상품 ' + priceDcStr(nepaCondItemDcAmt);
		}
	}
	
	return text;
}

// 구매금액대 할인 html
function getPromoPriceHtml(promo, returnPrice) {
	var promoBenefit = [];
	
	promoBenefit.push('<span class="' + (returnPrice == 0 ? 'text-gray' : '') + '">(' + promo.brand + ')');
	
	if (promo.promoType == pTypeDc) {
		promoBenefit.push(getPromoPriceText(promo));
	} else if (promo.promoType == pTypeSetDc) {
		promoBenefit.push(' 상품 세트 ' + priceDcStr(promo.dcPrice));
	} else if (promo.promoType == pTypeCondDc) {
		promoBenefit.push(' 조건부 상품 ' + priceDcStr(promo.dcPrice - promo.cancelDcPrice));
	}
	
	promoBenefit.push('</span>');
	
	return promoBenefit.join('');
}

// 구매금액대 사은품
function getPromoGift(brand) {
	
	if (ordPromoInfo.length == 0) {
		return null;
	}
	
	var gifts = [];
	for (var k in ordPromoInfo) {
		var promo = $.extend({}, ordPromoInfo[k]);
		if (promo.brand == brand && promo.promoType == pTypeGift) {
			var applyPrice = getPromoApplyPrice(promo);
			if (applyPrice < promo.startPrice) {
				promo.mode = "update";
				promo.applyYn = "N";
				promo.cancelDcPrice = promo.dcPrice; // 2019.08.22 할인취소금액
			} 
			else if (applyPrice >= promo.startPrice && applyPrice != promo.applyPrice) {
				promo.mode = "update";
				promo.applyPrice = applyPrice;
			}
			gifts.push(promo);
		}
	}
	return gifts;
}

// 구매금액대 사은품 문자열
function getPromoGiftText(brand) {
	var gifts = getPromoGift(brand);
	if (gifts == null || gifts.length == 0) {
		return '';
	}
	
	var text = [];
	for (var k in gifts) {
		if (gifts[k].applyYn == "N") {
			text.push(gifts[k].itemNmGift);
		}
	}
	return text.join(", ");
}

// 구매금액대 사은품 html
function getPromoGiftHtml(brand) {
	
	var gifts = getPromoGift(brand);
	if (gifts == null || gifts.length == 0) {
		return '';
	}
	
	var html = [];
	var chk = false;
	for (var k in gifts) {
		
		var promo = gifts[k];
		
		var cl = 'text-gray';
		if (promo.applyYn == "N") {
			cl = 'text-red';
			chk = true;
		}
		html.push('<span class="' + (cl == 'text-red' ? '' : cl) + '">' + priceToKor(promo.startPrice) + '</span> <span class="' + cl + '">' + promo.itemNmGift + '</span>');
	}
	
	return '<span class="' + (chk ? '' : 'text-gray') + '">(' + brand + ')</span>' + html.join(", ");
}

// 환수발생금 조회
function getReturnPrice(promo) {
	if (promo == null) {
		return 0;
	}
	
	var promoDcPrice = promo.dcPrice;
	var newPromo = getNewPromoPrice(promo.brand, promo.promoType, getPromoApplyPrice(promo));

	if (promo.promoType == pTypeDc) {
		promoDcPrice -= (newPromo == null ? 0 : newPromo.dcPrice);
	} else {
		promoDcPrice -= getDcPriceByOrdItem(promo);
	}
	
	return promoDcPrice;
}

// 취소불가 초과발생금 조회
function getOverCancelPrice(promo, returnPrice) {
	
	if (promo == null || returnPrice == 0) {
		return 0;
	}
	
	var newPromo = getNewPromoPrice(promo.brand, promo.promoType, getPromoApplyPrice(promo));
	if (newPromo != null) {
		promo = newPromo;
	}
	
	var promoCancelPrice = getPromoCancelPrice(promo);
	if (returnPrice > promoCancelPrice) {
		return returnPrice - promoCancelPrice;
	}
	return 0;
}

// 주문적용 프로모션 가격대 설정 (금액대별 할인)
function setOrdPromoPrice(promo, returnPrice, ordPromos) {
	
	if (promo == null) {
		return;
	}
	
	var checkPromo = getPromo(promo.brand, pTypeDc);
	if (checkPromo == null) {
	    return;
	}
	
	var applyPrice = getPromoApplyPrice(promo);
	
	// 구매금액대별 할인복원 환수발생금 발생 시
	if (returnPrice > 0) {
		
		// 환수금액이 있으므로 프로모션 적용여부 수정
		promo.mode = "update";
		promo.applyYn = "N";
		
		// 변경된 프로모션 가격대
		var newPromo = getNewPromoPrice(promo.brand, pTypeDc, applyPrice);
		if (newPromo != null) {
			promo.cancelDcPrice = promo.dcPrice - newPromo.dcPrice; // 2019.08.22 할인취소금액
			
			newPromo.mode = "create";
			newPromo.applyYn = "Y";
			newPromo.applyPrice = applyPrice;
			ordPromos.push(newPromo);
		} else {
			promo.cancelDcPrice = promo.dcPrice;                    // 2019.08.22 할인취소금액
		}
		
		ordPromos.push(promo);
	}
	else {
		// 프로모션 적용금액 수정
		if (promo.applyPrice != applyPrice) {
			promo.mode = "update";
			promo.applyPrice = applyPrice;
			ordPromos.push(promo);
		}
	}
}

// 주문적용 프로모션 사은품 설정
function setOrdPromoGift(brand, ordPromos) {
	var gifts = getPromoGift(brand)
	if (gifts == null || gifts.length == 0) {
		return;
	}
	for (var k in gifts) {
		if (gifts[k].mode == "update") {
			ordPromos.push(gifts[k]);
		}
	}
}

function priceToKor(val, str) {
	str = str || ' 이상';
	if (val < 10000) {
		return $.number(val) + '원 이상';
	}
	return Math.floor(val / 10000) + '만원' + str;
}

function priceDcStr(val, str) {
	str = str || '원 할인';
	return $.number(val) + str;
}

// 2017.12.16 KJH 반품 또는 클레임 처리시 세트 할인 프로모션 금액 비교
// 2019.05.22 [상품세트가격할인] PRICE 할인타입 추가 by SOO
// 반품 또는 클레임 처리시 프로모션 적용 전체 상품을 반품해야 
function validateItemSetDcClaim(claimItemList, brand) {
	var promoDcPrice = 0;
	var rtnDcPrice = 0;
	var targetItemCnt = 0;
	var ordPromo = getPromo(brand, pTypeSetDc);
	if (ordPromo == null) {
		return true;
	}
	promoDcPrice = ordPromo.dcPrice;
	
	for (var i in claimItemList) {
		// 상품 세트 대상 상품군인지 조회
		if (getPromoTgt(ordPromo, claimItemList[i].itemId)) {
			targetItemCnt++;
			/*rtnDcPrice += (claimItemList[i].lastDcPrice - Math.floor(claimItemList[i].lastDcPrice * (((100 - ordPromo.dcRate) * 0.01 / 100) * 100))) * Number(claimItemList[i].claimCnt);*/
			rtnDcPrice += Number(claimItemList[i].itemPromoDcPrice) * Number(claimItemList[i].claimCnt);
		}
	}
	
	// 상품세트가격할인 해당 상품 갯수가 없으면
	if (targetItemCnt == 0) {
		return true;
	}

	return (promoDcPrice == rtnDcPrice)? true : false;
}

// 2019.08.31 [조건부 상품할인] by SOO
// 조건부 상품할인 프로모션 클레임 처리 : 기준상품 취소 시, 프로모션 적용된 전 상품을 반품해야 
function validateCondItemDcClaim(allItemList, claimItemList, brand) {
	var promoDcPrice = 0;
	var rtnDcPrice = 0;
	var allCondItemYCnt = 0;
	var targetCondItemYCnt = 0;
	
	var ordPromo = getPromo(brand, pTypeCondDc);
	if (ordPromo == null) {
		return true;
	}
	promoDcPrice = ordPromo.dcPrice - ordPromo.cancelDcPrice;
	
	for (var i in allItemList) {
		if (allItemList[i].sno == 'COND_ITEM_DC' && allItemList[i].condItemYn == 'Y') {
			allCondItemYCnt += Number(allItemList[i].ordCnt);
		}
	}
	
	for (var i in claimItemList) {
		// 조건부 상품할인 대상 상품군인지 조회
		if (claimItemList[i].sno == 'COND_ITEM_DC' && claimItemList[i].condItemYn == 'Y') {
			targetCondItemYCnt += Number(claimItemList[i].claimCnt);
		} 
		else if (claimItemList[i].sno == 'COND_ITEM_DC' && claimItemList[i].condItemYn == 'N') {
			rtnDcPrice += Number(claimItemList[i].itemPromoDcPrice) * Number(claimItemList[i].claimCnt);
		}
	}
	/*
	console.log("allCondItemYCnt ==> " + allCondItemYCnt);
	console.log("targetCondItemYCnt ==> " + targetCondItemYCnt);
	*/
	// 기준상품이 클레임 대상이 아니면 부분취소(반품) 가능함
	if (targetCondItemYCnt == 0) {
		return true;
	}
	
	// 기준상품은 전체 취소(반품) 해야함
	if (allCondItemYCnt != targetCondItemYCnt) {
		return false;
	}
	/*
	console.log("promoDcPrice ==> " + promoDcPrice);
	console.log("rtnDcPrice ==> " + rtnDcPrice);
	*/
	return (promoDcPrice == rtnDcPrice) ? true : false;
}

