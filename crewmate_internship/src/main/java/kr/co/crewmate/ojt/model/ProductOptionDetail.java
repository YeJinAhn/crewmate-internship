package kr.co.crewmate.ojt.model;

import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductOptionDetail extends BaseModel {

    private String prdtCode;// 상품코드
    private String optnMstrId;// 옵션마스터아이디
    private String optnId;// 옵션아이디
    private String optnValue;// 옵션값
    private int optnOrder;// 옵션순서
    private int optnAmt;// 옵션금액
    private List<String> optnMstrIds;
    private List<String> optnDetailIds;
    private List<String> optnDetailValues;
    private List<Integer> optnDetailMstrOrders;
    private List<Integer> optnDetailAmts;

    public ProductOptionDetail() {
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

    public String getOptnId() {
        return optnId;
    }

    public void setOptnId(String optnId) {
        this.optnId = optnId;
    }

    public String getOptnValue() {
        return optnValue;
    }

    public void setOptnValue(String optnValue) {
        this.optnValue = optnValue;
    }

    public int getOptnOrder() {
        return optnOrder;
    }

    public void setOptnOrder(int optnOrder) {
        this.optnOrder = optnOrder;
    }

    public int getOptnAmt() {
        return optnAmt;
    }

    public void setOptnAmt(int optnAmt) {
        this.optnAmt = optnAmt;
    }

    public List<String> getOptnMstrIds() {
        return optnMstrIds;
    }

    public void setOptnMstrIds(List<String> optnMstrIds) {
        this.optnMstrIds = optnMstrIds;
    }

    public List<String> getOptnDetailIds() {
        return optnDetailIds;
    }

    public void setOptnDetailIds(List<String> optnDetailIds) {
        this.optnDetailIds = optnDetailIds;
    }

    public List<String> getOptnDetailValues() {
        return optnDetailValues;
    }

    public void setOptnDetailValues(List<String> optnDetailValues) {
        this.optnDetailValues = optnDetailValues;
    }

    public List<Integer> getOptnDetailMstrOrders() {
        return optnDetailMstrOrders;
    }

    public void setOptnDetailMstrOrders(List<Integer> optnDetailMstrOrders) {
        this.optnDetailMstrOrders = optnDetailMstrOrders;
    }

    public List<Integer> getOptnDetailAmts() {
        return optnDetailAmts;
    }

    public void setOptnDetailAmts(List<Integer> optnDetailAmts) {
        this.optnDetailAmts = optnDetailAmts;
    }

}
