package kr.co.crewmate.ojt.model;

import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class FAQ extends BaseModel {
 
    private Integer faqSeq;
    private String faqTitle;
    private String faqCont;
    private String rgstDtm;
    private String hit;
    private String mainOrder;
    private String shtctName;
    private String shtctUrl;
    private String lastModDtm;
    private String writeAdminId;
    private String lastModAdminId;
    private String faqClassId;
    private String filePath;
    private String cnslClassId;
    private String prntCnslClassId;
    private String cnslClassName;
    private String useYn;
    private String dispOrder;
    private List<String> faqClass;// 검색
    private String condition;// 검색
    private String searchWord;// 검색

    public FAQ() {
        super();
        // TODO Auto-generated constructor stub
    }

    public Integer getFaqSeq() {
        return faqSeq;
    }

    public void setFaqSeq(Integer faqSeq) {
        this.faqSeq = faqSeq;
    }

    public String getFaqTitle() {
        return faqTitle;
    }

    public void setFaqTitle(String faqTitle) {
        this.faqTitle = faqTitle;
    }

    public String getFaqCont() {
        return faqCont;
    }

    public void setFaqCont(String faqCont) {
        this.faqCont = faqCont;
    }

    public String getRgstDtm() {
        return rgstDtm;
    }

    public void setRgstDtm(String rgstDtm) {
        this.rgstDtm = rgstDtm;
    }

    public String getHit() {
        return hit;
    }

    public void setHit(String hit) {
        this.hit = hit;
    }

    public String getMainOrder() {
        return mainOrder;
    }

    public void setMainOrder(String mainOrder) {
        this.mainOrder = mainOrder;
    }

    public String getShtctName() {
        return shtctName;
    }

    public void setShtctName(String shtctName) {
        this.shtctName = shtctName;
    }

    public String getShtctUrl() {
        return shtctUrl;
    }

    public void setShtctUrl(String shtctUrl) {
        this.shtctUrl = shtctUrl;
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

    public String getFaqClassId() {
        return faqClassId;
    }

    public void setFaqClassId(String faqClassId) {
        this.faqClassId = faqClassId;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public String getCnslClassId() {
        return cnslClassId;
    }

    public void setCnslClassId(String cnslClassId) {
        this.cnslClassId = cnslClassId;
    }

    public String getPrntCnslClassId() {
        return prntCnslClassId;
    }

    public void setPrntCnslClassId(String prntCnslClassId) {
        this.prntCnslClassId = prntCnslClassId;
    }

    public String getCnslClassName() {
        return cnslClassName;
    }

    public void setCnslClassName(String cnslClassName) {
        this.cnslClassName = cnslClassName;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getDispOrder() {
        return dispOrder;
    }

    public void setDispOrder(String dispOrder) {
        this.dispOrder = dispOrder;
    }

    public List<String> getFaqClass() {
        return faqClass;
    }

    public void setFaqClass(List<String> faqClass) {
        this.faqClass = faqClass;
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

}
