package kr.co.crewmate.ojt.model;

import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductIcon extends BaseModel {
    private String prdtCode;// 상품코드
    private String iconId;// 아이콘아이디
    private String upIcon;// 상단아이콘설정
    private String downIcon;// 하단아이콘설정
    private List<String> upIconCode;
    private List<String> downIconCode;

    public ProductIcon() {
        super();
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public String getIconId() {
        return iconId;
    }

    public void setIconId(String iconId) {
        this.iconId = iconId;
    }

    public String getUpIcon() {
        return upIcon;
    }

    public void setUpIcon(String upIcon) {
        this.upIcon = upIcon;
    }

    public String getDownIcon() {
        return downIcon;
    }

    public void setDownIcon(String downIcon) {
        this.downIcon = downIcon;
    }

    public List<String> getUpIconCode() {
        return upIconCode;
    }

    public void setUpIconCode(List<String> upIconCode) {
        this.upIconCode = upIconCode;
    }

    public List<String> getDownIconCode() {
        return downIconCode;
    }

    public void setDownIconCode(List<String> downIconCode) {
        this.downIconCode = downIconCode;
    }

}
