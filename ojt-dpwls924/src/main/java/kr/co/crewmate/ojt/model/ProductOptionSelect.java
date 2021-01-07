package kr.co.crewmate.ojt.model;

import java.util.List;

public class ProductOptionSelect {

    private String prdtCode;// 상품코드
    private String optnMstrId;// 옵션마스터아이디
    private String optnId;// 옵션아이디
    private int stockSeq;// 재고순번
    private List<String> selectedOptnDtlId;
    private List<String> selectedOptnDtlIds;
    private List<Integer> selectStockIndex;// 사용여부(체크된거)
    private List<String> selectStockCounts;// 재고
    private List<String> stockSeqs;
    private List<String> optnUseYn;// 옵션사용여부

    public ProductOptionSelect() {
        super();
        // TODO Auto-generated constructor stub
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

    public int getStockSeq() {
        return stockSeq;
    }

    public void setStockSeq(int stockSeq) {
        this.stockSeq = stockSeq;
    }

    public List<String> getSelectedOptnDtlIds() {
        return selectedOptnDtlIds;
    }

    public void setSelectedOptnDtlIds(List<String> selectedOptnDtlIds) {
        this.selectedOptnDtlIds = selectedOptnDtlIds;
    }

    public List<Integer> getSelectStockIndex() {
        return selectStockIndex;
    }

    public void setSelectStockIndex(List<Integer> selectStockIndex) {
        this.selectStockIndex = selectStockIndex;
    }

    public List<String> getSelectStockCounts() {
        return selectStockCounts;
    }

    public void setSelectStockCounts(List<String> selectStockCounts) {
        this.selectStockCounts = selectStockCounts;
    }

    public List<String> getOptnUseYn() {
        return optnUseYn;
    }

    public void setOptnUseYn(List<String> optnUseYn) {
        this.optnUseYn = optnUseYn;
    }

    public List<String> getStockSeqs() {
        return stockSeqs;
    }

    public void setStockSeqs(List<String> stockSeqs) {
        this.stockSeqs = stockSeqs;
    }

    public List<String> getSelectedOptnDtlId() {
        return selectedOptnDtlId;
    }

    public void setSelectedOptnDtlId(List<String> selectedOptnDtlId) {
        this.selectedOptnDtlId = selectedOptnDtlId;
    }

}
