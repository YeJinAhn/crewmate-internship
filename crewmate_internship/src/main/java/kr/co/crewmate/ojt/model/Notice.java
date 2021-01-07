package kr.co.crewmate.ojt.model;

import java.util.Date;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class Notice extends BaseModel {

    private Integer notcSeq;// 공지사항일련번호
    private String notcTitle;// 공지사항제목
    private String notcCont;// 공지사항내용
    private Date rgstDtm;// 등록일시
    private String hit;// 조회수
    private String fixedYn;// 고정여부
    private String boardCode;// 게시판코드
    private String lastModDtm;// 최종수정일시
    private String writeAdminId;// 작성관리자아이디
    private String lastModAdminId;// 최종수정관리자아이디
    private String notcClassCode;// 공지유형코드
    private String strtDt;// (검색)등록일자 시작
    private String endDt; // (검색)등록일자 끝
    private String condition; // (검색)제목,내용 검색조건판별
    private String searchWord; // (검색) 검색단어

    public Notice() {
        super();
    }

    public Integer getNotcSeq() {
        return notcSeq;
    }

    public void setNotcSeq(Integer notcSeq) {
        this.notcSeq = notcSeq;
    }

    public String getNotcTitle() {
        return notcTitle;
    }

    public void setNotcTitle(String notcTitle) {
        this.notcTitle = notcTitle;
    }

    public String getNotcCont() {
        return notcCont;
    }

    public void setNotcCont(String notcCont) {
        this.notcCont = notcCont;
    }

    public Date getRgstDtm() {
        return rgstDtm;
    }

    public void setRgstDtm(Date rgstDtm) {
        this.rgstDtm = rgstDtm;
    }

    public String getHit() {
        return hit;
    }

    public void setHit(String hit) {
        this.hit = hit;
    }

    public String getFixedYn() {
        return fixedYn;
    }

    public void setFixedYn(String fixedYn) {
        this.fixedYn = fixedYn;
    }

    public String getBoardCode() {
        return boardCode;
    }

    public void setBoardCode(String boardCode) {
        this.boardCode = boardCode;
    }

    public String getLastModDtm() {
        return lastModDtm;
    }

    public void setLastModDtm(String lastModDtm) {
        this.lastModDtm = lastModDtm;
    }

    public String getWriteAdminId() {
        return writeAdminId;
    }

    public void setWriteAdminId(String writeAdminId) {
        this.writeAdminId = writeAdminId;
    }

    public String getLastModAdminId() {
        return lastModAdminId;
    }

    public void setLastModAdminId(String lastModAdminId) {
        this.lastModAdminId = lastModAdminId;
    }

    public String getNotcClassCode() {
        return notcClassCode;
    }

    public void setNotcClassCode(String notcClassCode) {
        this.notcClassCode = notcClassCode;
    }

    public String getStrtDt() {
        return strtDt;
    }

    public void setStrtDt(String strtDt) {
        this.strtDt = strtDt;
    }

    public String getEndDt() {
        return endDt;
    }

    public void setEndDt(String endDt) {
        this.endDt = endDt;
    }

    public String getCondition() {
        return condition;
    }

    public void setCondition(String condition) {
        this.condition = condition;
    }

    public String getSearchWord() {
        return searchWord;
    }

    public void setSearchWord(String searchWord) {
        this.searchWord = searchWord;
    }

    @Override
    public String toString() {
        return "Notice [notcSeq=" + notcSeq + ", notcTitle=" + notcTitle + ", notcCont=" + notcCont + ", rgstDtm="
                + rgstDtm + ", hit=" + hit + ", fixedYn=" + fixedYn + ", boardCode=" + boardCode + ", lastModDtm="
                + lastModDtm + ", writeAdminId=" + writeAdminId + ", lastModAdminId=" + lastModAdminId
                + ", notcClassCode=" + notcClassCode + ", strtDt=" + strtDt + ", endDt=" + endDt + ", condition="
                + condition + ", searchWord=" + searchWord + "]";
    }

}
