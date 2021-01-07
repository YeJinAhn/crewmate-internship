package kr.co.crewmate.ojt.model;

import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ConnectionProduct extends BaseModel {
    private String cntrPrdtMstrCode;// 관련상품마스터코드
    private String cntrPrdtCode;// 관련상품코드
    private List<String> cntrPrdtCodes; // 관련상품코드들
    private List<String> prdtCode;// 관련상품추가

    public ConnectionProduct() {
        super();
    }

    public ConnectionProduct(String cntrPrdtMstrCode, String cntrPrdtCode) {
        super();
        this.cntrPrdtMstrCode = cntrPrdtMstrCode;
        this.cntrPrdtCode = cntrPrdtCode;
    }

    public String getCntrPrdtMstrCode() {
        return cntrPrdtMstrCode;
    }

    public void setCntrPrdtMstrCode(String cntrPrdtMstrCode) {
        this.cntrPrdtMstrCode = cntrPrdtMstrCode;
    }

    public String getCntrPrdtCode() {
        return cntrPrdtCode;
    }

    public void setCntrPrdtCode(String cntrPrdtCode) {
        this.cntrPrdtCode = cntrPrdtCode;
    }

    public List<String> getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(List<String> prdtCode) {
        this.prdtCode = prdtCode;
    }

    public List<String> getCntrPrdtCodes() {
        return cntrPrdtCodes;
    }

    public void setCntrPrdtCodes(List<String> cntrPrdtCodes) {
        this.cntrPrdtCodes = cntrPrdtCodes;
    }

}
