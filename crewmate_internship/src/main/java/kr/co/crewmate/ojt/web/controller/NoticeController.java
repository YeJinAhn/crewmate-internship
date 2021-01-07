package kr.co.crewmate.ojt.web.controller;

import org.apache.commons.codec.binary.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.crewmate.ojt.constants.Constants;
import kr.co.crewmate.ojt.model.Notice;
import kr.co.crewmate.ojt.model.base.Result;
import kr.co.crewmate.ojt.service.NoticeService;
import kr.co.crewmate.ojt.util.Util;
import kr.co.crewmate.ojt.web.exception.BadRequestException;

@Controller
public class NoticeController {
    /* 메소드이름 시작은 소문자!! */
    /* 메소드이름은 동사로!!! */
    @Autowired
    private NoticeService noticeService;

    private static final Logger log = LoggerFactory.getLogger(NoticeController.class);
    private final String WRITE_ADMIN_ID = "admin";

    @RequestMapping("/notice/noticeList")
    public String noticeList(Model model, Notice notice) {
        notice.setWriteAdminId(WRITE_ADMIN_ID);
        Page<Notice> noticeList = noticeService.getNoticeList(notice);

        model.addAttribute("list", noticeList);
        return "/notice/noticeList";
    }

    /* 공지사항 등록 . 수정페이지 */
    @RequestMapping({ "/notice/noticeFormReg", "/notice/noticeFormMod" }) // util클래스에서 getmode메소드를 통해 create인지 update인지
                                                                          // 판별해서온다.
    public String noticeForm(Model model, Notice notice,
            @RequestParam(value = "notcSeq", required = false) Integer notcSeq) {

        Notice noticeOne = new Notice();
        if (StringUtils.equals(Constants.Mode.UPDATE, Util.getMode())) {
            notice.setWriteAdminId(WRITE_ADMIN_ID);// 수정페이지 들어왔을 때 등록ID입력되어있어야함
            if (notcSeq == null) {// url에 notcSeq= (빈값)으로 들어왔을 때
                throw new BadRequestException(Constants.ExMsg.DATA_EMPTY);
            }
            noticeOne = noticeService.getNoticeOne(notice.getNotcSeq());
            if (noticeOne == null) {
                throw new BadRequestException(Constants.ExMsg.DATA_EMPTY);
            }
            noticeService.updateNoticeHits(notice);// 조회수
        }
        model.addAttribute("noticeOne", noticeOne);
        return "/notice/noticeForm";
    }

    /* 공지사항 등록 . 수정 */
    @ResponseBody
    @RequestMapping({ "/notice/noticeCreate", "/notice/noticeUpdate" })
    public Result saveNotice(Notice notice) {
        Result result = new Result();

        if (notice.getNotcClassCode() == null || notice.getNotcClassCode().length() < 1) {
            result.setMessage("공지유형을 입력하세요");
            result.setResultCode(-1);
            return result;
        }
        if (notice.getNotcTitle() == null || notice.getNotcTitle().length() < 1) {
            result.setMessage("제목을 입력하세요");
            result.setResultCode(-1);
            return result;
        }

        if (notice.getNotcCont() == null || notice.getNotcCont().length() < 1) {
            result.setMessage("내용을 입력하세요");
            result.setResultCode(-1);
            return result;
        }

        notice.setWriteAdminId(WRITE_ADMIN_ID);
        if (StringUtils.equals(Constants.Mode.CREATE, notice.getMode())) {
            result = this.noticeService.createNotice(notice);
            // log.info(notice+"");
        }
        if (StringUtils.equals(Constants.Mode.UPDATE, notice.getMode())) {
            result = this.noticeService.updateNotice(notice);
        }

        return result;
    }

    @ResponseBody
    @RequestMapping("/notice/noticeDelete")
    public Result deleteNotice(Notice notice) {
        Result result = new Result(100);

        noticeService.deleteNotice(notice.getNotcSeq());

        return result;
    }

}
