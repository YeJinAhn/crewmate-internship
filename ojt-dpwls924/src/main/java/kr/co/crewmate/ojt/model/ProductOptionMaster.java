package kr.co.crewmate.ojt.model;

import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductOptionMaster extends BaseModel {
    private String prdtCode;// 상품코드
    private String optnMstrId;// 옵션마스터아이디
    private String optnMstrName;// 옵션아이디
    private String optnMstrOrder;// 재고순번
    private List<String> optnMstrIds;//
    private List<String> optnMstrNames;// 옵션분류명
    private List<String> optnMstrOrders;// 순서
    private List<String> OptnMstrOrderKeys;

    public ProductOptionMaster() {
        super();
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public String getOptnMstrId() {
        return optnMstrId;
    }

    public void setOptnMstrId(String optnMstrId) {
        this.optnMstrId = optnMstrId;
    }

    public String getOptnMstrName() {
        return optnMstrName;
    }

    public void setOptnMstrName(String optnMstrName) {
        this.optnMstrName = optnMstrName;
    }

    public String getOptnMstrOrder() {
        return optnMstrOrder;
    }

    public void setOptnMstrOrder(String optnMstrOrder) {
        this.optnMstrOrder = optnMstrOrder;
    }

    public List<String> getOptnMstrIds() {
        return optnMstrIds;
    }

    public void setOptnMstrIds(List<String> optnMstrIds) {
        this.optnMstrIds = optnMstrIds;
    }

    public List<String> getOptnMstrNames() {
        return optnMstrNames;
    }

    public void setOptnMstrNames(List<String> optnMstrNames) {
        this.optnMstrNames = optnMstrNames;
    }

    public List<String> getOptnMstrOrders() {
        return optnMstrOrders;
    }

    public void setOptnMstrOrders(List<String> optnMstrOrders) {
        this.optnMstrOrders = optnMstrOrders;
    }

    public List<String> getOptnMstrOrderKeys() {
        return OptnMstrOrderKeys;
    }

    public void setOptnMstrOrderKeys(List<String> optnMstrOrderKeys) {
        OptnMstrOrderKeys = optnMstrOrderKeys;
    }

}
