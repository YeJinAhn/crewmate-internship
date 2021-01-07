package kr.co.crewmate.ojt.model;

/**
 * 원산지 조회
 * 
 * @author CREWMATE
 *
 */
public class Origin {
    /**
     *   
     */
    private String codeName;
    private String codeValue;
    private int codeOrder;

    public String getCodeName() {
        return codeName;
    }

    public void setCodeName(String codeName) {
        this.codeName = codeName;
    }

    public String getCodeValue() {
        return codeValue;
    }

    public void setCodeValue(String codeValue) {
        this.codeValue = codeValue;
    }

    public int getCodeOrder() {
        return codeOrder;
    }

    public void setCodeOrder(int codeOrder) {
        this.codeOrder = codeOrder;
    }

}
