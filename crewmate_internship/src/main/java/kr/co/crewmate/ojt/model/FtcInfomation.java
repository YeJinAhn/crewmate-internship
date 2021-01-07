package kr.co.crewmate.ojt.model;

import java.sql.Date;

public class FtcInfomation {
    /**
     * 공정위정보 일련번호
     */
    private String ftcInfoSeq;
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
    private int ftcOrder;
    /**
     * 관리자 아이디
     */
    private String adminId;

    public FtcInfomation() {
        super();
        // TODO Auto-generated constructor stub
    }

    public FtcInfomation(String ftcInfoSeq, String prntFtcInfoSeq, String ftcInfoName, String useYn, Date rgstDtm,
            int ftcOrder, String adminId) {
        super();
        this.ftcInfoSeq = ftcInfoSeq;
        this.prntFtcInfoSeq = prntFtcInfoSeq;
        this.ftcInfoName = ftcInfoName;
        this.useYn = useYn;
        this.rgstDtm = rgstDtm;
        this.ftcOrder = ftcOrder;
        this.adminId = adminId;
    }

    public String getFtcInfoSeq() {
        return ftcInfoSeq;
    }

    public void setFtcInfoSeq(String ftcInfoSeq) {
        this.ftcInfoSeq = ftcInfoSeq;
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

    public int getFtcOrder() {
        return ftcOrder;
    }

    public void setFtcOrder(int ftcOrder) {
        this.ftcOrder = ftcOrder;
    }

    public String getAdminId() {
        return adminId;
    }

    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }

}
