package kr.co.crewmate.ojt.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.crewmate.ojt.dao.UserDao;
import kr.co.crewmate.ojt.model.Addr;
import kr.co.crewmate.ojt.model.Code;
import kr.co.crewmate.ojt.model.UserCodeMap;
import kr.co.crewmate.ojt.model.Users;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    public void getInsertUserJoin(Model model, Users user, Addr addr, UserCodeMap code, Code codes) {

        Date date = new Date();
        String format = DateFormatUtils.format(date, "yyyyMMddhhmmss");
        // 유저
        user.setModDt(format);
        user.setRegDt(format);
        user.setModDt(format);
        user.setLastPwChangeDt(format);

        user.setUpdateType("USER");
        user.setUserPwInitYn("N");
        user.setUserGroup("COMMON");
        user.setBlackConsumerYn("N");
        user.setUserStat("10");
        user.setMailAddr(user.getMailAddr() + "@" + user.getMailAddrNext());
        user.setBirthDt(user.getYear() + user.getMonth() + user.getDay());
        user.setHp(user.getHp1() + "-" + user.getHp2() + "-" + user.getHp3());
        user.setUserPw(encryptSHA512(user.getUserPw()));
        user.setSmsYn("N");
        user.setMailYn("N");
        user.setAddInfoYn(user.getAddInfoYn());
        user.setMarketingYn(user.getMarketingYn());

        // 마케팅 수신여부
        if ("Y".equals(user.getSmsYn())) {
            user.setSmsYn("Y");
            // user.setMarketingYn("Y");
        }
        if ("Y".equals(user.getMailYn())) {
            user.setMailYn("Y");
            // user.setMarketingYn("Y");
        }

        // 결혼여부 "Y"일시 기념일 날짜 붙이기
        if ("Y".equals(user.getWeddingYn())) {
            user.setWeddingDt(user.getWeddingDtYear() + user.getWeddingDtMonth() + user.getWeddingDtDay());
        }
        userDao.insertUser(user);

        int userNo = userDao.selectUserNo();// userNo생성
        user.setModNo(userNo);

        // 주소
        addr.setUserNo(userNo);
        addr.setAddrNm("기본배송지");
        addr.setDefaultYn("Y");
        addr.setRecvNm(user.getUserNm());
        addr.setHp(user.getHp1() + "-" + user.getHp2() + "-" + user.getHp3());
        userDao.insertAddr(addr);

        code.setUserNo(userNo);
        code.setCodeGroup("JOB");
        code.setCode(user.getJob());
        if (user.getJob() != null && user.getJob() != "") {
            if ("09".equals(user.getJob())) {
                code.setCodeDesc(user.getJobDesc());
            }
            userDao.insertUserCodeMap(code);
        }
        if (user.getHobbies() != null && user.getHobbies().length > 0) {
            for (String hobby : user.getHobbies()) {
                if ("15".equals(hobby)) {
                    code.setCodeDesc(user.getHobbyDesc());
                }
                code.setCodeGroup("HOBBY");
                code.setCode(hobby);
                userDao.insertUserCodeMap(code);
            }
        }

    }

    public int getJoinYnCheck(Users user) {
        return userDao.selectJoinYnCheck(user);
    }

    public int getIdCheck(Users user) {
        return userDao.selectIdCheck(user);
    }

    public List<Code> getUserCodeMapFromCode(Code codes) {
        return userDao.selectUserCodeMapFromCode(codes);
    }

    public String encryptSHA512(String data) {
        String afterData = StringUtils.EMPTY;

        try {
            MessageDigest sha512 = MessageDigest.getInstance("SHA-512");
            sha512.update(data.getBytes());
            StringBuffer sb = new StringBuffer();
            for (byte b : sha512.digest()) {
                sb.append(Integer.toHexString(0xff & b));
            }

            afterData = sb.toString();
        } catch (NoSuchAlgorithmException e) {
        }

        return afterData;
    }
    //엑셀용 출력리스트
    public List<Addr> getAddr() {
        return userDao.selectAddr();
    }

}
