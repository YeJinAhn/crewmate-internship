package kr.co.crewmate.ojt.model.base;

import java.io.Serializable;

public class Files extends BaseModel implements Serializable {
    private static final long serialVersionUID = 7639203956514158890L;

    /** 파일 고유번호 */
    private long fileSeq;

    /** 파일 유형 코드 */
    private String fileTypeCd;

    /** 참조 고유번호 */
    private long refSeq;

    /** 원본 파일 이름 */
    private String orgFileNm;

    /** 실제 파일 이름 */
    private String realFileNm;

    /** 파일 크기 */
    private long fileSize;

    /** 경로  */
    private String path;

    /** 전시 순서 */
    private long dispNo;

    /** alt */
    private String alt;

    /** 키값 fileSeq  */
    private String key;

    /** 임시파일 */
    private String tempFile;

    /** 사용여부 */
    private String useYn;

    /** flag */
    private String flag;

    /** fileType */
    private String fileType;

    public long getFileSeq() {
        return fileSeq;
    }

    public void setFileSeq(long fileSeq) {
        this.fileSeq = fileSeq;
    }

    public String getFileTypeCd() {
        return fileTypeCd;
    }

    public void setFileTypeCd(String fileTypeCd) {
        this.fileTypeCd = fileTypeCd;
    }

    public long getRefSeq() {
        return refSeq;
    }

    public void setRefSeq(long refSeq) {
        this.refSeq = refSeq;
    }

    public String getOrgFileNm() {
        return orgFileNm;
    }

    public void setOrgFileNm(String orgFileNm) {
        this.orgFileNm = orgFileNm;
    }

    public String getRealFileNm() {
        return realFileNm;
    }

    public void setRealFileNm(String realFileNm) {
        this.realFileNm = realFileNm;
    }

    public long getFileSize() {
        return fileSize;
    }

    public void setFileSize(long fileSize) {
        this.fileSize = fileSize;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public long getDispNo() {
        return dispNo;
    }

    public void setDispNo(long dispNo) {
        this.dispNo = dispNo;
    }

    public String getAlt() {
        return alt;
    }

    public void setAlt(String alt) {
        this.alt = alt;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getTempFile() {
        return tempFile;
    }

    public void setTempFile(String tempFile) {
        this.tempFile = tempFile;
    }

    public String getUseYn() {
        return useYn;
    }

    public void setUseYn(String useYn) {
        this.useYn = useYn;
    }

    public String getFlag() {
        return flag;
    }

    public void setFlag(String flag) {
        this.flag = flag;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }
}
