package kr.co.crewmate.ojt.model;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class Content extends BaseModel {

    private String contentNo;
    private String contentType;
    private String parentContentNo;
    private String replyStep;
    private String useYn;
    private String dispYn;
    private String regNo;
    private String regDt;
    private String modNo;
    private String modDt;
    private String bestYn;
    private String viewCnt;
    private String voteCnt;
    private String contentGroup;
    private String dispNo;
    private String title;
    private String content;
    private String topFixYn;
    private String keyword;// 검색

    public Content() {
        super();
        // TODO Auto-generated constructor stub
    }

    public String getContentNo() {
        return contentNo;
    }

    public void setContentNo(String contentNo) {
        this.contentNo = contentNo;
    }

    public String getContentType() {
        return contentType;
    }

    public void setContentType(String contentType) {
        this.contentType = contentType;
    }

    public String getParentContentNo() {
        return parentContentNo;
    }

    public void setParentContentNo(String parentContentNo) {
        this.parentContentNo = parentContentNo;
    }

    public String getReplyStep() {
        return replyStep;
    }

    public void setReplyStep(String replyStep) {
        this.replyStep = replyStep;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getDispYn() {
        return dispYn;
    }

    public void setDispYn(String dispYn) {
        this.dispYn = dispYn;
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

    public String getBestYn() {
        return bestYn;
    }

    public void setBestYn(String bestYn) {
        this.bestYn = bestYn;
    }

    public String getViewCnt() {
        return viewCnt;
    }

    public void setViewCnt(String viewCnt) {
        this.viewCnt = viewCnt;
    }

    public String getVoteCnt() {
        return voteCnt;
    }

    public void setVoteCnt(String voteCnt) {
        this.voteCnt = voteCnt;
    }

    public String getContentGroup() {
        return contentGroup;
    }

    public void setContentGroup(String contentGroup) {
        this.contentGroup = contentGroup;
    }

    public String getDispNo() {
        return dispNo;
    }

    public void setDispNo(String dispNo) {
        this.dispNo = dispNo;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTopFixYn() {
        return topFixYn;
    }

    public void setTopFixYn(String topFixYn) {
        this.topFixYn = topFixYn;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

}
