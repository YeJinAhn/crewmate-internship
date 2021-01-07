package kr.co.crewmate.ojt.model;

import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductCategory extends BaseModel {
    private String prdtCode;// 상품코드
    private String ctgrId;// 카테고리아이디
    private String stdCtgrYn;// 기준카테고리여부
    private String stdCtgrYnId;// 기준카테고리여부버튼
    private String[] ctgrIds; // 카테고리 여러개추가

    public ProductCategory() {
        super();
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public String getCtgrId() {
        return ctgrId;
    }

    public void setCtgrId(String ctgrId) {
        this.ctgrId = ctgrId;
    }

    public String getStdCtgrYn() {
        return stdCtgrYn;
    }

    public void setStdCtgrYn(String stdCtgrYn) {
        this.stdCtgrYn = stdCtgrYn;
    }

    public String[] getCtgrIds() {
        return ctgrIds;
    }

    public void setCtgrIds(String[] ctgrIds) {
        this.ctgrIds = ctgrIds;
    }

    public String getStdCtgrYnId() {
        return stdCtgrYnId;
    }

    public void setStdCtgrYnId(String stdCtgrYnId) {
        this.stdCtgrYnId = stdCtgrYnId;
    }

}
