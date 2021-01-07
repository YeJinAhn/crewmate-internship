package kr.co.crewmate.ojt.model;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductColor extends BaseModel{
    private String StringprdtCode;//상품코드
    private String StringcolorId;//색상아이디

    public ProductColor() {
        super();
    }

    public ProductColor(String stringprdtCode, String stringcolorId) {
        super();
        StringprdtCode = stringprdtCode;
        StringcolorId = stringcolorId;
    }

    public String getStringprdtCode() {
        return StringprdtCode;
    }

    public void setStringprdtCode(String stringprdtCode) {
        StringprdtCode = stringprdtCode;
    }

    public String getStringcolorId() {
        return StringcolorId;
    }

    public void setStringcolorId(String stringcolorId) {
        StringcolorId = stringcolorId;
    }

}
