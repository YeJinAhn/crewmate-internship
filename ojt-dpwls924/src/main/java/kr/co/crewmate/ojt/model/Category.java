package kr.co.crewmate.ojt.model;

import java.util.List;

//쿼리 결과랑 vo랑 맞추기
/**
 * 상품 분류 정보
 * 
 * @author CREWMATE
 *
 */
public class Category {
    /**
     * 카테고리 아이디
     */
    private String ctgrId;
    /**
     * 부모 카테고리 아이디
     */
    private String prntCtgrId;
    /**
     * 카테고리 이름
     */
    private String ctgrName;
    /**
     * 전시순서
     */
    private String dispOrder;

    public Category() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Category(String ctgrId, String prntCtgrId, String ctgrName, String dispOrder) {
        super();
        this.ctgrId = ctgrId;
        this.prntCtgrId = prntCtgrId;
        this.ctgrName = ctgrName;
        this.dispOrder = dispOrder;
    }

    public String getCtgrId() {
        return ctgrId;
    }

    public void setCtgrId(String ctgrId) {
        this.ctgrId = ctgrId;
    }

    public String getPrntCtgrId() {
        return prntCtgrId;
    }

    public void setPrntCtgrId(String prntCtgrId) {
        this.prntCtgrId = prntCtgrId;
    }

    public String getCtgrName() {
        return ctgrName;
    }

    public void setCtgrName(String ctgrName) {
        this.ctgrName = ctgrName;
    }

    public String getDispOrder() {
        return dispOrder;
    }

    public void setDispOrder(String dispOrder) {
        this.dispOrder = dispOrder;
    }

}
