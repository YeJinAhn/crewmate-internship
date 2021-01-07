package kr.co.crewmate.ojt.model;

public class Users {

    private int userNo;// 회원 고유번호
    private String userId;// 회원 아이디
    private String userPw;// 회원비밀번호
    private String userGroup;// 회원그룹 아이디
    private String cusCd;
    private String blackConsumerYn;
    private String userStat;
    private String lastLoginDt;
    private String lastPwChangeDt;
    private String withdrawDesc;
    private String memo;
    private String hp;// 핸드폰번호
    private String regDt;
    private String withdrawDt;
    private int modNo;
    private String modDt;
    private String smsYn;
    private String mailYn;
    private String addInfoYn;
    private String marketingYn;
    private String userNm;// 회원 이름
    private String blackConsumerType;
    private String refundNm;
    private String refundVactBankcode;
    private String refundNum;
    private String userPwInitYn;
    private String updateType;
    private String blackConsumerDesc;
    private String mNoNpc;
    private String mNoIbk;
    private String weddingYn;// 결혼여부
    private String weddingDt;// 결혼기념일
    private String mailAddr;// 이메일주소
    private String birthDt; // 생년월일
    private String solarYn; // 양/음력
    private String sex; // 성별
    private String mailAddrNext;// 이메일주소 @다음꺼
    private String year;// 년
    private String month;// 월
    private String day;// 일
    private String hp1;// 010
    private String hp2;// 1111
    private String hp3;// 2222
    private String weddingDtYear;// 결혼기념일 년
    private String weddingDtMonth;// 월
    private String weddingDtDay;// 일
    private String job;// 직업
    private String[] hobbies;// 취미 여러개
    private String hobbyDesc;// 코드취미상세
    private String jobDesc;// 코드직업기타상세

    public Users() {
        super();
        // TODO Auto-generated constructor stub
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserPw() {
        return userPw;
    }

    public void setUserPw(String userPw) {
        this.userPw = userPw;
    }

    public String getUserGroup() {
        return userGroup;
    }

    public void setUserGroup(String userGroup) {
        this.userGroup = userGroup;
    }

    public String getCusCd() {
        return cusCd;
    }

    public void setCusCd(String cusCd) {
        this.cusCd = cusCd;
    }

    public String getBlackConsumerYn() {
        return blackConsumerYn;
    }

    public void setBlackConsumerYn(String blackConsumerYn) {
        this.blackConsumerYn = blackConsumerYn;
    }

    public String getUserStat() {
        return userStat;
    }

    public void setUserStat(String userStat) {
        this.userStat = userStat;
    }

    public String getLastLoginDt() {
        return lastLoginDt;
    }

    public void setLastLoginDt(String lastLoginDt) {
        this.lastLoginDt = lastLoginDt;
    }

    public String getLastPwChangeDt() {
        return lastPwChangeDt;
    }

    public void setLastPwChangeDt(String lastPwChangeDt) {
        this.lastPwChangeDt = lastPwChangeDt;
    }

    public String getWithdrawDesc() {
        return withdrawDesc;
    }

    public void setWithdrawDesc(String withdrawDesc) {
        this.withdrawDesc = withdrawDesc;
    }

    public String getMemo() {
        return memo;
    }

    public void setMemo(String memo) {
        this.memo = memo;
    }

    public String getHp() {
        return hp;
    }

    public void setHp(String hp) {
        this.hp = hp;
    }

    public String getRegDt() {
        return regDt;
    }

    public void setRegDt(String regDt) {
        this.regDt = regDt;
    }

    public String getWithdrawDt() {
        return withdrawDt;
    }

    public void setWithdrawDt(String withdrawDt) {
        this.withdrawDt = withdrawDt;
    }

    public int getModNo() {
        return modNo;
    }

    public void setModNo(int modNo) {
        this.modNo = modNo;
    }

    public String getModDt() {
        return modDt;
    }

    public void setModDt(String modDt) {
        this.modDt = modDt;
    }

    public String getSmsYn() {
        return smsYn;
    }

    public void setSmsYn(String smsYn) {
        this.smsYn = smsYn;
    }

    public String getMailYn() {
        return mailYn;
    }

    public void setMailYn(String mailYn) {
        this.mailYn = mailYn;
    }

    public String getAddInfoYn() {
        return addInfoYn;
    }

    public void setAddInfoYn(String addInfoYn) {
        this.addInfoYn = addInfoYn;
    }

    public String getMarketingYn() {
        return marketingYn;
    }

    public void setMarketingYn(String marketingYn) {
        this.marketingYn = marketingYn;
    }

    public String getUserNm() {
        return userNm;
    }

    public void setUserNm(String userNm) {
        this.userNm = userNm;
    }

    public String getBlackConsumerType() {
        return blackConsumerType;
    }

    public void setBlackConsumerType(String blackConsumerType) {
        this.blackConsumerType = blackConsumerType;
    }

    public String getRefundNm() {
        return refundNm;
    }

    public void setRefundNm(String refundNm) {
        this.refundNm = refundNm;
    }

    public String getRefundVactBankcode() {
        return refundVactBankcode;
    }

    public void setRefundVactBankcode(String refundVactBankcode) {
        this.refundVactBankcode = refundVactBankcode;
    }

    public String getRefundNum() {
        return refundNum;
    }

    public void setRefundNum(String refundNum) {
        this.refundNum = refundNum;
    }

    public String getUserPwInitYn() {
        return userPwInitYn;
    }

    public void setUserPwInitYn(String userPwInitYn) {
        this.userPwInitYn = userPwInitYn;
    }

    public String getUpdateType() {
        return updateType;
    }

    public void setUpdateType(String updateType) {
        this.updateType = updateType;
    }

    public String getBlackConsumerDesc() {
        return blackConsumerDesc;
    }

    public void setBlackConsumerDesc(String blackConsumerDesc) {
        this.blackConsumerDesc = blackConsumerDesc;
    }

    public String getmNoNpc() {
        return mNoNpc;
    }

    public void setmNoNpc(String mNoNpc) {
        this.mNoNpc = mNoNpc;
    }

    public String getmNoIbk() {
        return mNoIbk;
    }

    public void setmNoIbk(String mNoIbk) {
        this.mNoIbk = mNoIbk;
    }

    public String getWeddingYn() {
        return weddingYn;
    }

    public void setWeddingYn(String weddingYn) {
        this.weddingYn = weddingYn;
    }

    public String getWeddingDt() {
        return weddingDt;
    }

    public void setWeddingDt(String weddingDt) {
        this.weddingDt = weddingDt;
    }

    public String getMailAddr() {
        return mailAddr;
    }

    public void setMailAddr(String mailAddr) {
        this.mailAddr = mailAddr;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getSolarYn() {
        return solarYn;
    }

    public void setSolarYn(String solarYn) {
        this.solarYn = solarYn;
    }

    public String getBirthDt() {
        return birthDt;
    }

    public void setBirthDt(String birthDt) {
        this.birthDt = birthDt;
    }

    public String getMailAddrNext() {
        return mailAddrNext;
    }

    public void setMailAddrNext(String mailAddrNext) {
        this.mailAddrNext = mailAddrNext;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public String getDay() {
        return day;
    }

    public void setDay(String day) {
        this.day = day;
    }

    public String getHp1() {
        return hp1;
    }

    public void setHp1(String hp1) {
        this.hp1 = hp1;
    }

    public String getHp2() {
        return hp2;
    }

    public void setHp2(String hp2) {
        this.hp2 = hp2;
    }

    public String getHp3() {
        return hp3;
    }

    public void setHp3(String hp3) {
        this.hp3 = hp3;
    }

    public String getWeddingDtYear() {
        return weddingDtYear;
    }

    public void setWeddingDtYear(String weddingDtYear) {
        this.weddingDtYear = weddingDtYear;
    }

    public String getWeddingDtMonth() {
        return weddingDtMonth;
    }

    public void setWeddingDtMonth(String weddingDtMonth) {
        this.weddingDtMonth = weddingDtMonth;
    }

    public String getWeddingDtDay() {
        return weddingDtDay;
    }

    public void setWeddingDtDay(String weddingDtDay) {
        this.weddingDtDay = weddingDtDay;
    }

    public String getJob() {
        return job;
    }

    public void setJob(String job) {
        this.job = job;
    }

    public String[] getHobbies() {
        return hobbies;
    }

    public void setHobbies(String[] hobbies) {
        this.hobbies = hobbies;
    }

    public String getHobbyDesc() {
        return hobbyDesc;
    }

    public void setHobbyDesc(String hobbyDesc) {
        this.hobbyDesc = hobbyDesc;
    }

    public String getJobDesc() {
        return jobDesc;
    }

    public void setJobDesc(String jobDesc) {
        this.jobDesc = jobDesc;
    }

    @Override
    public String toString() {
        return "Users [userNo=" + userNo + ", userId=" + userId + ", userPw=" + userPw + ", userGroup=" + userGroup
                + ", cusCd=" + cusCd + ", blackConsumerYn=" + blackConsumerYn + ", userStat=" + userStat
                + ", lastLoginDt=" + lastLoginDt + ", lastPwChangeDt=" + lastPwChangeDt + ", withdrawDesc="
                + withdrawDesc + ", memo=" + memo + ", hp=" + hp + ", regDt=" + regDt + ", withdrawDt=" + withdrawDt
                + ", modNo=" + modNo + ", modDt=" + modDt + ", smsYn=" + smsYn + ", mailYn=" + mailYn + ", addInfoYn="
                + addInfoYn + ", marketingYn=" + marketingYn + ", userNm=" + userNm + ", blackConsumerType="
                + blackConsumerType + ", refundNm=" + refundNm + ", refundVactBankcode=" + refundVactBankcode
                + ", refundNum=" + refundNum + ", userPwInitYn=" + userPwInitYn + ", updateType=" + updateType
                + ", blackConsumerDesc=" + blackConsumerDesc + ", mNoNpc=" + mNoNpc + ", mNoIbk=" + mNoIbk
                + ", weddingYn=" + weddingYn + ", weddingDt=" + weddingDt + ", mailAddr=" + mailAddr + ", birthDt="
                + birthDt + ", solarYn=" + solarYn + ", sex=" + sex + ", mailAddrNext=" + mailAddrNext + ", year="
                + year + ", month=" + month + ", day=" + day + ", hp1=" + hp1 + ", hp2=" + hp2 + ", hp3=" + hp3
                + ", weddingDtYear=" + weddingDtYear + ", weddingDtMonth=" + weddingDtMonth + ", weddingDtDay="
                + weddingDtDay + "]";
    }

}
