package kr.co.crewmate.ojt.model;

import java.sql.Date;
import java.util.List;

public class ProductFtcInfo {
    /**
     * 공정위정보 일련번호
     */
    private String ftcInfoSeq;
    /**
     * 일련번호들
     */
    private String[] ftcInfoSeqs;
    /**
     * 부모 공정위정보 일련번호
     */
    private String prntFtcInfoSeq;
    /**
     * 공정위정보 이름
     */
    private String ftcInfoName;
    /**
     * 사용여부
     */
    private String useYn;
    /**
     * 등록일시
     */
    private Date rgstDtm;
    /**
     * 공정위 순서
     */
    private String ftcOrder;
    /**
     * 관리자 아이디
     */
    private String adminId;
    /**
     * 상품코드
     */
    private String prdtCode;

    private String[] expsrYns;
    private String dispYn;
    private String infoNotcCont; // 정보고시내용
    private String[] infNotcConts;// 정보고시내용

    public ProductFtcInfo() {
        super();
        // TODO Auto-generated constructor stub
    }

    public String getPrntFtcInfoSeq() {
        return prntFtcInfoSeq;
    }

    public void setPrntFtcInfoSeq(String prntFtcInfoSeq) {
        this.prntFtcInfoSeq = prntFtcInfoSeq;
    }

    public String getFtcInfoName() {
        return ftcInfoName;
    }

    public void setFtcInfoName(String ftcInfoName) {
        this.ftcInfoName = ftcInfoName;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public Date getRgstDtm() {
        return rgstDtm;
    }

    public void setRgstDtm(Date rgstDtm) {
        this.rgstDtm = rgstDtm;
    }

    public String getFtcOrder() {
        return ftcOrder;
    }

    public void setFtcOrder(String ftcOrder) {
        this.ftcOrder = ftcOrder;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public String getFtcInfoSeq() {
        return ftcInfoSeq;
    }

    public void setFtcInfoSeq(String ftcInfoSeq) {
        this.ftcInfoSeq = ftcInfoSeq;
    }

    public String[] getFtcInfoSeqs() {
        return ftcInfoSeqs;
    }

    public void setFtcInfoSeqs(String[] ftcInfoSeqs) {
        this.ftcInfoSeqs = ftcInfoSeqs;
    }

    public String[] getExpsrYns() {
        return expsrYns;
    }

    public void setExpsrYns(String[] expsrYns) {
        this.expsrYns = expsrYns;
    }

    public String getDispYn() {
        return dispYn;
    }

    public void setDispYn(String dispYn) {
        this.dispYn = dispYn;
    }

    public String[] getInfNotcConts() {
        return infNotcConts;
    }

    public void setInfNotcConts(String[] infNotcConts) {
        this.infNotcConts = infNotcConts;
    }

    public String getInfoNotcCont() {
        return infoNotcCont;
    }

    public void setInfoNotcCont(String infoNotcCont) {
        this.infoNotcCont = infoNotcCont;
    }

}
