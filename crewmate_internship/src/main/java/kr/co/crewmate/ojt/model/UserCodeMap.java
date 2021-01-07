package kr.co.crewmate.ojt.model;

public class UserCodeMap {

    private int userNo;// 회원고유번호
    private String codeGroup;// 회원코드 매핑유형
    private String code;// 회원코드
    private String codeDesc;// 회원코드 상세

    public UserCodeMap() {
        super();
        // TODO Auto-generated constructor stub
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public String getCodeGroup() {
        return codeGroup;
    }

    public void setCodeGroup(String codeGroup) {
        this.codeGroup = codeGroup;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getCodeDesc() {
        return codeDesc;
    }

    public void setCodeDesc(String codeDesc) {
        this.codeDesc = codeDesc;
    }

}
