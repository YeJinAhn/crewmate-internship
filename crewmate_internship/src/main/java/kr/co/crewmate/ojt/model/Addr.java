package kr.co.crewmate.ojt.model;

public class Addr {

    private int addrNo;
    private int userNo;
    private String addrNm;
    private String recvNm;
    private String tel;
    private String hp;
    private String zipcode;
    private String address; // 주소 - 기본
    private String addressDetail;// 주소 - 상세
    private String defaultYn;
    private String regDt;

    public Addr() {
        super();
        // TODO Auto-generated constructor stub
    }

    public int getAddrNo() {
        return addrNo;
    }

    public void setAddrNo(int addrNo) {
        this.addrNo = addrNo;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public String getAddrNm() {
        return addrNm;
    }

    public void setAddrNm(String addrNm) {
        this.addrNm = addrNm;
    }

    public String getRecvNm() {
        return recvNm;
    }

    public void setRecvNm(String recvNm) {
        this.recvNm = recvNm;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getHp() {
        return hp;
    }

    public void setHp(String hp) {
        this.hp = hp;
    }

    public String getZipcode() {
        return zipcode;
    }

    public void setZipcode(String zipcode) {
        this.zipcode = zipcode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getAddressDetail() {
        return addressDetail;
    }

    public void setAddressDetail(String addressDetail) {
        this.addressDetail = addressDetail;
    }

    public String getDefaultYn() {
        return defaultYn;
    }

    public void setDefaultYn(String defaultYn) {
        this.defaultYn = defaultYn;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    @Override
    public String toString() {
        return "Addr [addrNo=" + addrNo + ", userNo=" + userNo + ", addrNm=" + addrNm + ", recvNm=" + recvNm + ", tel="
                + tel + ", hp=" + hp + ", zipcode=" + zipcode + ", address=" + address + ", addressDetail="
                + addressDetail + ", defaultYn=" + defaultYn + ", regDt=" + regDt + "]";
    }

}
