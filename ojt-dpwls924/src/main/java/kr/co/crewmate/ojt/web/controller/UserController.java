package kr.co.crewmate.ojt.web.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.crewmate.ojt.model.Addr;
import kr.co.crewmate.ojt.model.Code;
import kr.co.crewmate.ojt.model.UserCodeMap;
import kr.co.crewmate.ojt.model.Users;
import kr.co.crewmate.ojt.model.base.Result;
import kr.co.crewmate.ojt.service.UserService;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @RequestMapping("/nepa/user/join1_1")
    public String openUserJoin() {
        return "/nepa/user/join1_1";
    }

    @ResponseBody
    @RequestMapping("/nepa/joinYnCheck")
    public Result selectJoinYnCheck(Model model, Users user) {
        Result result = new Result();
        int check = userService.getJoinYnCheck(user);
        result.putInfo("check", check);
        return result;
    }

    // 약관동의
    @RequestMapping("/nepa/user/agreeForm")
    public String agreeUserJoin() {
        return "/nepa/user/agreeForm";
    }

    // 본인인증
    @RequestMapping("/nepa/user/authForm")
    public String authUserJoin() {
        return "/nepa/user/authForm";
    }

    @ResponseBody
    @RequestMapping("/nepa/user/authFormReg")
    public Result getAuthUserJoin(Model model, Users user) {
        return new Result();
    }

    @ResponseBody
    @RequestMapping("/nepa/idCheck")
    public Result selectIdCheck(Model model, Users user) {
        Result result = new Result();
        int idCheck = userService.getIdCheck(user);
        result.putInfo("idCheck", idCheck);
        return result;
    }

    @RequestMapping("/nepa/user/joinForm")
    public String userJoinForm(Model model, Code codes) {
        return "/nepa/user/joinForm";
    }

    // insert
    @ResponseBody
    @RequestMapping("/nepa/user/joinFormReg")
    public Result insertUserJoin(Model model, Users user, Addr addr, UserCodeMap code, Code codes) {
        /*
         * @RequestParam(value = "addInfoYn") String addInfoYn,
         * 
         * @RequestParam(value = "marketingYn") String marketingYn
         */
        Result result = new Result(1);
        System.out.println(user.toString() + addr.toString() + "이거야");
        if (user.getUserNm() == null || user.getUserNm().length() < 1) {
            result.setMessage("이름을 입력하세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getYear() == null || user.getYear().length() < 1) {
            result.setMessage("생년월일을 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getMonth() == null || user.getMonth().length() < 1) {
            result.setMessage("생년월일을 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getDay() == null || user.getDay().length() < 1) {
            result.setMessage("생년월일을 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getSex() == null || user.getSex().length() < 1) {
            result.setMessage("성별을 선택하세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getHp1() == null || user.getHp1().length() < 1) {
            result.setMessage("핸드폰 번호를 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getHp2() == null || user.getHp2().length() < 1) {
            result.setMessage("핸드폰 번호를 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getHp3() == null || user.getHp3().length() < 1) {
            result.setMessage("핸드폰 번호를 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (user.getUserId() == null || user.getUserId().length() < 1) {
            result.setMessage("아이디를 입력하세요");
            result.setResultCode(-1);
            return result;
        }
        if (user.getUserPw() == null || user.getUserPw().length() < 1) {
            result.setMessage("비밀번호를 입력하세요");
            result.setResultCode(-1);
            return result;
        }
        if (addr.getAddress() == null || addr.getAddress().length() < 1) {
            result.setMessage("주소를 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (addr.getAddressDetail() == null || addr.getAddressDetail().length() < 1) {
            result.setMessage("주소를 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        if (addr.getZipcode() == null || addr.getZipcode().length() < 1) {
            result.setMessage("주소를 입력해주세요");
            result.setResultCode(-1);
            return result;
        }

        Users checkedUser = new Users();//생성자 생성
        checkedUser.setUserNm(user.getUserNm());//생성자에서 바꿔준다 기존에있는 네임을 가져와서 
        checkedUser.setHp(user.getHp1() + "-" + user.getHp2() + "-" + user.getHp3());
        int idChk = userService.getJoinYnCheck(checkedUser);
        if (idChk >= 1) {
            result.setMessage("이미 가입한 회원입니다");
            result.setResultCode(2);
            return result;
        }
        userService.getInsertUserJoin(model, user, addr, code, codes);

        return result;
    }

    // 완료
    @RequestMapping("/nepa/user/completeJoin")
    public String completeUserJoin() {
        return "/nepa/user/completeJoin";
    }

}
