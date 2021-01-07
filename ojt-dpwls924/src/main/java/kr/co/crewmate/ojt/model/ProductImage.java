package kr.co.crewmate.ojt.model;

import java.sql.Date;
import java.util.List;

import kr.co.crewmate.ojt.model.base.BaseModel;

public class ProductImage extends BaseModel {

    private String prdtCode;// 상품코드
    private String prdtImageCode;// 상품이미지코드
    private String prdtImagePath;// 상품이미지경로
    private Date rgstDtm;// 등록일시
    private List<String> prdtImageCodes;
    private List<String> prdtImagePaths;
    private List<String> imageCode;

    public ProductImage() {
        super();
    }

    public String getPrdtCode() {
        return prdtCode;
    }

    public void setPrdtCode(String prdtCode) {
        this.prdtCode = prdtCode;
    }

    public String getPrdtImageCode() {
        return prdtImageCode;
    }

    public void setPrdtImageCode(String prdtImageCode) {
        this.prdtImageCode = prdtImageCode;
    }

    public String getPrdtImagePath() {
        return prdtImagePath;
    }

    public void setPrdtImagePath(String prdtImagePath) {
        this.prdtImagePath = prdtImagePath;
    }

    public Date getRgstDtm() {
        return rgstDtm;
    }

    public void setRgstDtm(Date rgstDtm) {
        this.rgstDtm = rgstDtm;
    }

    public List<String> getPrdtImageCodes() {
        return prdtImageCodes;
    }

    public void setPrdtImageCodes(List<String> prdtImageCodes) {
        this.prdtImageCodes = prdtImageCodes;
    }

    public List<String> getPrdtImagePaths() {
        return prdtImagePaths;
    }

    public void setPrdtImagePaths(List<String> prdtImagePaths) {
        this.prdtImagePaths = prdtImagePaths;
    }

    public List<String> getImageCode() {
        return imageCode;
    }

    public void setImageCode(List<String> imageCode) {
        this.imageCode = imageCode;
    }

}
