package kr.co.crewmate.ojt.model;

import java.sql.Clob;
import java.sql.Date;
import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class Product extends BaseModel {

    private String prdtCode; // 상품코드
    private String vndrCntrtId; // 업체계약아이디
    private String brandId; // 브랜드아이디
    private String prdtEngName; // 상품영문이름
    private String prdtSellPrice; // 상품판매가격
    private String prdtStatCode; // 상품상태코드
    private String optnName; // 옵션이름
    private String erpColorName; // ERP색상이름
    private String mnftrName; // 제조사이름
    private String cooCode; // 원산지코드
    private Date rgstDtm; // 등록일시
    private String prdtPrmtCode; // 상품승인코드
    private String prdtDtlInfo; // 상품상세정보
    private String cntrPrdtUseYn; // 관련상품 사용여부

    private String lastModAdminId; // 최종 수정자아이디
    private Date lastModDtm; // 최종수정일시
    private String minBuyCount; // 최소구매수량
    private String maxBuyCount; // 최대구매수량
    private String prdtKorName; // 상품국문이름
    private String dispYn; // 전시여부
    private String srchWord; // 검색단어
    private String prdtStyle; // 상품스타일
    private String prdtGbnCode; // 상품구분코드
    private Date prmtDtm; // 승인일시
    private String sellCount; // 판매수량
    private String freeDlvyYn; // 무료배송여부
    private int laveCount; // 재고
    private String ctgrName;// (검색)분류선택
    private String ctgrId;
    private String ctgrYn;
    private String ftcInfoYn;// 고시여부
    private String vndrId;// 업체아이디
    private String vndrName;// 업체이름
    private String brandName;// 브랜드이름
    private String dscntStartSellPrice;// (검색)시작금액
    private String dscntEndSellPrice;// (검색)끝금액
    private String strtDt;// (검색)상품승인기간 시작
    private String endDt;// (검색)상품승인기간 끝
    private String vndrStopPrdtEscp;// 업체중지상품제외
    private String prdtImagePath;// 이미지경로
    private String sortType; // 상품목록조회 정렬
    private String[] prdtStatCodes;// (검색)상품상태코드
    private List<String> category;// (검색)분류선택
    private String optnUseYn;// 옵션사용여부
    private String getOptionUseYn;
    private String freeGiftUseYn;// 사은품

    public Product() {
        super();
        // TODO Auto-generated constructor stub
    }

    public List<String> getCategory() {
        return category;
    }

    public void setCategory(List<String> category) {
        this.category = category;
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public String getVndrCntrtId() {
        return vndrCntrtId;
    }

    public void setVndrCntrtId(String vndrCntrtId) {
        this.vndrCntrtId = vndrCntrtId;
    }

    public String getBrandId() {
        return brandId;
    }

    public void setBrandId(String brandId) {
        this.brandId = brandId;
    }

    public String getPrdtEngName() {
        return prdtEngName;
    }

    public void setPrdtEngName(String prdtEngName) {
        this.prdtEngName = prdtEngName;
    }

    public String getPrdtSellPrice() {
        return prdtSellPrice;
    }

    public void setPrdtSellPrice(String prdtSellPrice) {
        this.prdtSellPrice = prdtSellPrice;
    }

    public String getPrdtStatCode() {
        return prdtStatCode;
    }

    public void setPrdtStatCode(String prdtStatCode) {
        this.prdtStatCode = prdtStatCode;
    }

    public String getOptnName() {
        return optnName;
    }

    public void setOptnName(String optnName) {
        this.optnName = optnName;
    }

    public String getErpColorName() {
        return erpColorName;
    }

    public void setErpColorName(String erpColorName) {
        this.erpColorName = erpColorName;
    }

    public String getMnftrName() {
        return mnftrName;
    }

    public void setMnftrName(String mnftrName) {
        this.mnftrName = mnftrName;
    }

    public String getCooCode() {
        return cooCode;
    }

    public void setCooCode(String cooCode) {
        this.cooCode = cooCode;
    }

    public Date getRgstDtm() {
        return rgstDtm;
    }

    public void setRgstDtm(Date rgstDtm) {
        this.rgstDtm = rgstDtm;
    }

    public String getPrdtPrmtCode() {
        return prdtPrmtCode;
    }

    public void setPrdtPrmtCode(String prdtPrmtCode) {
        this.prdtPrmtCode = prdtPrmtCode;
    }

    public String getPrdtDtlInfo() {
        return prdtDtlInfo;
    }

    public void setPrdtDtlInfo(String prdtDtlInfo) {
        this.prdtDtlInfo = prdtDtlInfo;
    }

    public String getCntrPrdtUseYn() {
        return cntrPrdtUseYn;
    }

    public void setCntrPrdtUseYn(String cntrPrdtUseYn) {
        this.cntrPrdtUseYn = cntrPrdtUseYn;
    }

    public String getLastModAdminId() {
        return lastModAdminId;
    }

    public void setLastModAdminId(String lastModAdminId) {
        this.lastModAdminId = lastModAdminId;
    }

    public Date getLastModDtm() {
        return lastModDtm;
    }

    public void setLastModDtm(Date lastModDtm) {
        this.lastModDtm = lastModDtm;
    }

    public String getMinBuyCount() {
        return minBuyCount;
    }

    public void setMinBuyCount(String minBuyCount) {
        this.minBuyCount = minBuyCount;
    }

    public String getMaxBuyCount() {
        return maxBuyCount;
    }

    public void setMaxBuyCount(String maxBuyCount) {
        this.maxBuyCount = maxBuyCount;
    }

    public String getPrdtKorName() {
        return prdtKorName;
    }

    public void setPrdtKorName(String prdtKorName) {
        this.prdtKorName = prdtKorName;
    }

    public String getDispYn() {
        return dispYn;
    }

    public void setDispYn(String dispYn) {
        this.dispYn = dispYn;
    }

    public String getSrchWord() {
        return srchWord;
    }

    public void setSrchWord(String srchWord) {
        this.srchWord = srchWord;
    }

    public String getPrdtStyle() {
        return prdtStyle;
    }

    public void setPrdtStyle(String prdtStyle) {
        this.prdtStyle = prdtStyle;
    }

    public String getPrdtGbnCode() {
        return prdtGbnCode;
    }

    public void setPrdtGbnCode(String prdtGbnCode) {
        this.prdtGbnCode = prdtGbnCode;
    }

    public Date getPrmtDtm() {
        return prmtDtm;
    }

    public void setPrmtDtm(Date prmtDtm) {
        this.prmtDtm = prmtDtm;
    }

    public String getSellCount() {
        return sellCount;
    }

    public void setSellCount(String string) {
        this.sellCount = string;
    }

    public String getFreeDlvyYn() {
        return freeDlvyYn;
    }

    public void setFreeDlvyYn(String freeDlvyYn) {
        this.freeDlvyYn = freeDlvyYn;
    }

    public int getLaveCount() {
        return laveCount;
    }

    public void setLaveCount(int laveCount) {
        this.laveCount = laveCount;
    }

    public String getCtgrName() {
        return ctgrName;
    }

    public void setCtgrName(String ctgrName) {
        this.ctgrName = ctgrName;
    }

    public String getCtgrId() {
        return ctgrId;
    }

    public void setCtgrId(String ctgrId) {
        this.ctgrId = ctgrId;
    }

    public String getCtgrYn() {
        return ctgrYn;
    }

    public void setCtgrYn(String ctgrYn) {
        this.ctgrYn = ctgrYn;
    }

    public String getFtcInfoYn() {
        return ftcInfoYn;
    }

    public void setFtcInfoYn(String ftcInfoYn) {
        this.ftcInfoYn = ftcInfoYn;
    }

    public String getVndrId() {
        return vndrId;
    }

    public void setVndrId(String vndrId) {
        this.vndrId = vndrId;
    }

    public String getVndrName() {
        return vndrName;
    }

    public void setVndrName(String vndrName) {
        this.vndrName = vndrName;
    }

    public String getBrandName() {
        return brandName;
    }

    public void setBrandName(String brandName) {
        this.brandName = brandName;
    }

    public String getDscntStartSellPrice() {
        return dscntStartSellPrice;
    }

    public void setDscntStartSellPrice(String dscntStartSellPrice) {
        this.dscntStartSellPrice = dscntStartSellPrice;
    }

    public String getDscntEndSellPrice() {
        return dscntEndSellPrice;
    }

    public void setDscntEndSellPrice(String dscntEndSellPrice) {
        this.dscntEndSellPrice = dscntEndSellPrice;
    }

    public String getStrtDt() {
        return strtDt;
    }

    public void setStrtDt(String strtDt) {
        this.strtDt = strtDt;
    }

    public String getEndDt() {
        return endDt;
    }

    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }

    public String getVndrStopPrdtEscp() {
        return vndrStopPrdtEscp;
    }

    public void setVndrStopPrdtEscp(String vndrStopPrdtEscp) {
        this.vndrStopPrdtEscp = vndrStopPrdtEscp;
    }

    public String getPrdtImagePath() {
        return prdtImagePath;
    }

    public void setPrdtImagePath(String prdtImagePath) {
        this.prdtImagePath = prdtImagePath;
    }

    public String getSortType() {
        return sortType;
    }

    public void setSortType(String sortType) {
        this.sortType = sortType;
    }

    public String[] getPrdtStatCodes() {
        return prdtStatCodes;
    }

    public void setPrdtStatCodes(String[] prdtStatCodes) {
        this.prdtStatCodes = prdtStatCodes;
    }

    public String getOptnUseYn() {
        return optnUseYn;
    }

    public void setOptnUseYn(String optnUseYn) {
        this.optnUseYn = optnUseYn;
    }

    public String getGetOptionUseYn() {
        return getOptionUseYn;
    }

    public void setGetOptionUseYn(String getOptionUseYn) {
        this.getOptionUseYn = getOptionUseYn;
    }

    public String getFreeGiftUseYn() {
        return freeGiftUseYn;
    }

    public void setFreeGiftUseYn(String freeGiftUseYn) {
        this.freeGiftUseYn = freeGiftUseYn;
    }

}
