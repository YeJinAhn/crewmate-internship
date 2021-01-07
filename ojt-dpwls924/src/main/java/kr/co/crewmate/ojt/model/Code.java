package kr.co.crewmate.ojt.model;

public class Code {

    private String codeGroup;// 코드 그룹
    private String code;// 코드
    private String dispNo;// 전시순서
    private String useYn;// 사용여부
    private String regNo;// 등록자고유번호
    private String regDt;// 등록일시
    private String modNo;// 수정자고유번호
    private String modDt;// 수정일시
    private String content;// 내용
    private String name;// 코드명

    public Code() {
        super();
        // TODO Auto-generated constructor stub
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

    public String getDispNo() {
        return dispNo;
    }

    public void setDispNo(String dispNo) {
        this.dispNo = dispNo;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getModNo() {
        return modNo;
    }

    public void setModNo(String modNo) {
        this.modNo = modNo;
    }

    public String getModDt() {
        return modDt;
    }

    public void setModDt(String modDt) {
        this.modDt = modDt;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
