package kr.co.crewmate.ojt.model;

import java.sql.Date;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductPrice extends BaseModel {

    private int prdtPriceSeq;// 상품가격일련번호
    private String prdtDscntPrice;// 상품할인가격
    private Date dscntStartDt;// 할인시작일자
    private String dscntEndDt;// 할인종료일자
    private Date rgstDtm;// 등록일시
    private String prdtCode;// 상품코드
    private String dscntErpSellPrice; //
    

    public ProductPrice() {
        super();
    }

    public int getPrdtPriceSeq() {
        return prdtPriceSeq;
    }

    public void setPrdtPriceSeq(int priceSeq) {
        this.prdtPriceSeq = priceSeq;
    }

    public String getPrdtDscntPrice() {
        return prdtDscntPrice;
    }

    public void setPrdtDscntPrice(String prdtDscntPrice) {
        this.prdtDscntPrice = prdtDscntPrice;
    }

    public Date getDscntStartDt() {
        return dscntStartDt;
    }

    public void setDscntStartDt(Date dscntStartDt) {
        this.dscntStartDt = dscntStartDt;
    }

    public String getDscntEndDt() {
        return dscntEndDt;
    }

    public void setDscntEndDt(String dscntEndDt) {
        this.dscntEndDt = dscntEndDt;
    }

    public Date getRgstDtm() {
        return rgstDtm;
    }

    public void setRgstDtm(Date rgstDtm) {
        this.rgstDtm = rgstDtm;
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public String getDscntErpSellPrice() {
        return dscntErpSellPrice;
    }

    public void setDscntErpSellPrice(String dscntErpSellPrice) {
        this.dscntErpSellPrice = dscntErpSellPrice;
    }

}
