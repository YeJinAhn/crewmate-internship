package kr.co.crewmate.ojt.model;

import java.util.Date;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class BoardArticle extends BaseModel {
    /**
     * 게시물일련번호
     */
    private int boardArtclSeq;
    
    /**
     * 게시물제목
     */
    private String boardArtclTitle;
    
    /**
     * 게시물내용
     */
    private String boardArtclCont;
    
    /**
     * 조회수
     */
    private int hits;
    
    /**
     * 등록일시
     */
    private Date rgstDtm;
    
    /**
     * 그룹일련번호
     */
    private int groupSeq;
    
    /**
     * 답변순서
     */
    private int replyOrder;
    
    /**
     * 답변깊이
     */
    private int replyDepth;
    
    /**
     * 부모글일련번호
     */
    private int prntArtclSeq;
    
    /**
     * 작성자이름
     */
    private String wrtrName;
    
    /**
     * 게시판아이디
     */
    private String boardId;
    
    /**
     * 수정일시
     */
    private Date mdfDtm;
    
    /**
     * 삭제여부
     */
    private String delYn;
    
    /**
     * 검색시작날짜
     */
    private String strtDt;

    /**
     * 검색종료날짜
     */
    private String endDt;

    public int getBoardArtclSeq() {
        return boardArtclSeq;
    }

    public void setBoardArtclSeq(int boardArtclSeq) {
        this.boardArtclSeq = boardArtclSeq;
    }

    public String getBoardArtclTitle() {
        return boardArtclTitle;
    }

    public void setBoardArtclTitle(String boardArtclTitle) {
        this.boardArtclTitle = boardArtclTitle;
    }

    public String getBoardArtclCont() {
        return boardArtclCont;
    }

    public void setBoardArtclCont(String boardArtclCont) {
        this.boardArtclCont = boardArtclCont;
    }

    public int getHits() {
        return hits;
    }

    public void setHits(int hits) {
        this.hits = hits;
    }

    public Date getRgstDtm() {
        return rgstDtm;
    }

    public void setRgstDtm(Date rgstDtm) {
        this.rgstDtm = rgstDtm;
    }

    public int getGroupSeq() {
        return groupSeq;
    }

    public void setGroupSeq(int groupSeq) {
        this.groupSeq = groupSeq;
    }

    public int getReplyOrder() {
        return replyOrder;
    }

    public void setReplyOrder(int replyOrder) {
        this.replyOrder = replyOrder;
    }

    public int getReplyDepth() {
        return replyDepth;
    }

    public void setReplyDepth(int replyDepth) {
        this.replyDepth = replyDepth;
    }

    public int getPrntArtclSeq() {
        return prntArtclSeq;
    }

    public void setPrntArtclSeq(int prntArtclSeq) {
        this.prntArtclSeq = prntArtclSeq;
    }

    public String getWrtrName() {
        return wrtrName;
    }

    public void setWrtrName(String wrtrName) {
        this.wrtrName = wrtrName;
    }

    public String getBoardId() {
        return boardId;
    }

    public void setBoardId(String boardId) {
        this.boardId = boardId;
    }

    public Date getMdfDtm() {
        return mdfDtm;
    }

    public void setMdfDtm(Date mdfDtm) {
        this.mdfDtm = mdfDtm;
    }

    public String getDelYn() {
        return delYn;
    }

    public void setDelYn(String delYn) {
        this.delYn = delYn;
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
}
