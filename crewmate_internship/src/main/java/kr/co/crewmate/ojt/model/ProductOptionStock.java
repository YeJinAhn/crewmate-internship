package kr.co.crewmate.ojt.model;

import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductOptionStock extends BaseModel {

    private String prdtCode;// 상품코드
    private int stockSeq;// 재고순번
    private String stockCount;// 재고수량
    private String sellCount;// 판매수량
    private String dispYn;// 전시여부
    private String delYn;// 삭제여부
    private List<String> selectedOptnDispYns;// 전시여부체크
    private List<String> selectedStockCounts;//재고
    private List<Integer> stockSeqs;
    

    public ProductOptionStock() {
        super();
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public int getStockSeq() {
        return stockSeq;
    }

    public void setStockSeq(int stockSeq) {
        this.stockSeq = stockSeq;
    }

    public String getStockCount() {
        return stockCount;
    }

    public void setStockCount(String stockCount) {
        this.stockCount = stockCount;
    }

    public String getSellCount() {
        return sellCount;
    }

    public void setSellCount(String sellCount) {
        this.sellCount = sellCount;
    }

    public String getDispYn() {
        return dispYn;
    }

    public void setDispYn(String dispYn) {
        this.dispYn = dispYn;
    }

    public String getDelYn() {
        return delYn;
    }

    public void setDelYn(String delYn) {
        this.delYn = delYn;
    }

    public List<String> getSelectedOptnDispYns() {
        return selectedOptnDispYns;
    }

    public void setSelectedOptnDispYns(List<String> selectedOptnDispYns) {
        this.selectedOptnDispYns = selectedOptnDispYns;
    }

    public List<String> getSelectedStockCounts() {
        return selectedStockCounts;
    }

    public void setSelectedStockCounts(List<String> selectedStockCounts) {
        this.selectedStockCounts = selectedStockCounts;
    }

    public List<Integer> getStockSeqs() {
        return stockSeqs;
    }

    public void setStockSeqs(List<Integer> stockSeqs) {
        this.stockSeqs = stockSeqs;
    }

}
