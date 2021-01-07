package kr.co.crewmate.ojt.web.controller;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.crewmate.ojt.constants.Constants;
import kr.co.crewmate.ojt.model.BoardArticle;
import kr.co.crewmate.ojt.model.base.Result;
import kr.co.crewmate.ojt.service.BoardArticleService;
import kr.co.crewmate.ojt.util.Util;
import kr.co.crewmate.ojt.web.exception.BadRequestException;

@Controller
public class SampleController {

    private static final Logger log = LoggerFactory.getLogger(SampleController.class);
    private final String BOARDID = "lkj";

    @Autowired
    BoardArticleService boardArticleService;

    @GetMapping("/") // 브라우저에서 요청할때 /로 들어올수도
    public String main(Model model) {
        return sample(model);
    }

    @RequestMapping("/sample/sampleMain") // url주소를 치고 들어올수도 있기 때문에 둘다 작성해준다.
    public String sample(Model model) {

        /*
         * model.addAttribute("adminList", this.adminService.getAdminList(new
         * AdminDto()).getContent()); model.addAttribute("adminGrpList",
         * this.adminService.getAdminGrpUseList(0)); model.addAttribute("menuList",
         * this.ctgService.getCtgSubList(1, Constants.Y)); model.addAttribute("ctgList",
         * this.ctgService.getCtgSubList(2, Constants.Y));
         * model.addAttribute("notiInfoList", this.ctgService.getCtgSubList(3,
         * Constants.Y)); model.addAttribute("faqList",
         * this.ctgService.getCtgSubList(ApiConstants.CtgSeq.FAQ, Constants.Y));
         */

        return "/sample/sampleMain";
    }

    /**
     * 
     * sample 게시판 목록
     *
     * @since 2020. 10. 28.
     * @author kjh8877
     *
     * @param model
     * @param boardArticle
     * @return
     */
    @RequestMapping({ "/sample/boardList", "/sample/boardList/popup" })
    public String boardList(Model model, BoardArticle boardArticle) {

        boardArticle.setBoardId(BOARDID);
        Page<BoardArticle> list = boardArticleService.getBoardArticleList(boardArticle);

        model.addAttribute("list", list);

        return "/sample/boardList";
    }

    /**
     * 
     * sample 게시판 등록/수정 페이지
     *
     * @since 2020. 10. 28.
     * @author kjh8877
     *
     * @param model
     * @param boardArticle
     * @return
     */
    @RequestMapping({ "/sample/boardFormReg", "/sample/boardFormMod" })
    public String boardForm(Model model, BoardArticle boardArticle) {

        BoardArticle data = new BoardArticle();

        // 수정인 경우, 해당 게시글 조회 및 조회 수 증가
        if (StringUtils.equals(Constants.Mode.UPDATE, boardArticle.getMode())) {
            boardArticle.setBoardId(BOARDID);
            data = boardArticleService.getBoardOne(boardArticle.getBoardArtclSeq());
            if (data == null) {
                throw new BadRequestException(Constants.ExMsg.DATA_EMPTY);
            }
            boardArticleService.updateBoardArticleHits(boardArticle);
        }

        model.addAttribute("data", data);

        return "/sample/boardForm";
    }

    /**
     * 
     * sample 게시판 등록/수정
     *
     * @since 2020. 10. 28.
     * @author kjh8877
     *
     * @param board
     * @return
     */
    @ResponseBody
    @RequestMapping({ "/sample/boardCreate", "/sample/boardUpdate" })
    public Result boContSave(BoardArticle board) {

        // 유효성 체크
        Util.checkEmpty(board.getBoardArtclTitle(), board.getBoardArtclCont(), board.getWrtrName());
        board.setBoardId(BOARDID);
        Result result = new Result(100);

        // 공지사항 등록
        if (StringUtils.equals(Constants.Mode.CREATE, board.getMode())) {
            result = this.boardArticleService.createBoard(board);
        }

        // 공지사항 수정
        if (StringUtils.equals(Constants.Mode.UPDATE, board.getMode())) {
            result = this.boardArticleService.updateBoard(board);
        }

        return result;
    }
}
