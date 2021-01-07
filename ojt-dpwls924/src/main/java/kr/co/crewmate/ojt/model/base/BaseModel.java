package kr.co.crewmate.ojt.model.base;


import org.apache.commons.lang3.StringUtils;

import com.fasterxml.jackson.annotation.JsonProperty;

import kr.co.crewmate.ojt.constants.Constants;

public class BaseModel {
    /** 페이지 - 기본값 : 1 */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private int page;

    /** 리스트 사이즈 - 기본값 : 10 */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private int listSize;

    /** 리스트 사이즈 제한 여부 -> AOP에서 사용함. : 기본값 true */
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String limitListSizeYn;

    /** 모드 */
    private String mode;

    /** 등록자 아이피 */
    private String regIp;

    /** 수정자 아이피 */
    private String modIp;

    public String getMode() {
        return mode;
    }

    public void setMode(String mode) {
        this.mode = mode;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public void setListSize(int listSize) {
        this.listSize = listSize;
    }

    public String getRegIp() {
        return regIp;
    }

    public void setRegIp(String regIp) {
        this.regIp = regIp;
    }

    public String getModIp() {
        return modIp;
    }

    public void setModIp(String modIp) {
        this.modIp = modIp;
    }

    /**
     * 페이징 처리시 시작 rownum
     * @return
     */
    public int getStartRow() {
        return (this.getPage() - 1) * this.getListSize() + 1;
    }

    /**
     * 페이징 처리시 시작 rownum
     * @return
     */
    public int getEndRow() {
        return this.getPage() * this.getListSize();
    }

    /**
     * 요청한 페이지 번호를 리턴 0보다 작은 경우는 0으로 고정
     * @return
     */
    public int getPage() {
        return this.page <= 0 ? 1 : this.page;
    }

    public int getListSize() {
        return this.listSize <= 0 ? 10 : this.listSize;
    }

    public String getLimitListSizeYn() {
        return StringUtils.isBlank(this.limitListSizeYn) ? "Y" : this.limitListSizeYn;
    }

    public void setLimitListSizeYn(String limitListSizeYn) {
        this.limitListSizeYn = limitListSizeYn;

        if (!StringUtils.equals(limitListSizeYn, Constants.Y)) {
            this.setPage(1);
            this.setListSize(999999);
        }
    }
}
