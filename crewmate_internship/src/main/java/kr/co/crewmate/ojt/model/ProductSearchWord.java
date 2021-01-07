package kr.co.crewmate.ojt.model;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductSearchWord extends BaseModel{
    private String prdtCode;// 상품코드
    private int srchSeq;// 검색일련번호
    private String srchWord;// 검색단어
    

    public ProductSearchWord() {
        super();
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public int getSrchSeq() {
        return srchSeq;
    }

    public void setSrchSeq(int srchSeq) {
        this.srchSeq = srchSeq;
    }

    public String getSrchWord() {
        return srchWord;
    }

    public void setSrchWord(String srchWord) {
        this.srchWord = srchWord;
    }

}
