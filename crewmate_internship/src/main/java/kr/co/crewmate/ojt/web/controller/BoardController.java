package kr.co.crewmate.ojt.web.controller;

import org.apache.commons.codec.binary.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.crewmate.ojt.constants.Constants;
import kr.co.crewmate.ojt.model.Board;
import kr.co.crewmate.ojt.model.base.Result;
import kr.co.crewmate.ojt.service.BoardService;
import kr.co.crewmate.ojt.util.Util;
import kr.co.crewmate.ojt.web.exception.BadRequestException;

@Controller
public class BoardController {

    private final String BOARDID = "ayj";

    @Autowired
    BoardService boardService;

    /**
     * 게시판 리스트
     * 
     * @param model
     * @param board
     * @return
     */
    @RequestMapping({ "/board/boardList", "/board/boardList/popup" })
    public String boardList(Model model, Board board) {

        board.setBoardId(BOARDID);
        Page<Board> list = boardService.getBoardList(board);

        model.addAttribute("list", list);

        return "/board/board";
    }

    /**
     * 들어오는 입구는 등록일때는 …/boardFormReg 를 통해서 들어오고 수정일때는 …/boardFormMod 를 통해서 들어온다. 중간에
     * 만약 "update"면 service.getBoardOne을 호출해서 기존 게시글 정보를 data에 덮어쓴다. 리턴은 model에
     * data를 addAttribute해서 리턴하게 되고 리턴은 /sample/boardForm 으로 리턴
     * 
     * board 게시판 등록 / 수정 페이지
     * 
     * @param model
     * @param board
     * @return
     */
    @RequestMapping({ "/board/boardFormReg", "/board/boardFormMod" })
    public String boardForm(Model model, Board board) {
        Board data = new Board();// 등록인 경우,새로운 board 생성

        // 수정인 경우, 해당 게시글 조회 및 조회 수 증가
        if (StringUtils.equals(Constants.Mode.UPDATE, board.getMode())) {
            // StringUtils클래스에 equals함수를 사용해서 Constants.Mode.Update랑 board.getMode가 같니
            board.setBoardId(BOARDID);
            // 가져온boardSeq(게시판일련번호)를 data변수에 넣어준다
            data = boardService.getBoardOne(board.getBoardArtclSeq());
            // 만약 가져올 boardSeq가 없다면 잘못된 요청임으로 에러 메세지 응답
            if (data == null) {
                throw new BadRequestException(Constants.ExMsg.DATA_EMPTY);
            }
            boardService.updateBoardHits(board);// 업데이트하고 조회수 증가

        }
        model.addAttribute("data", data);

        return "/board/boardForm";
    }

    /**
     * board 게시판 등록/수정
     * 
     * @param board
     * @return
     */
    @ResponseBody
    @RequestMapping({ "/board/boardCreate", "/board/boardUpdate" })
    public Result boContSave(Board board) {

        // 유효성 체크
        Util.checkEmpty(board.getBoardArtclTitle(), board.getBoardArtclCont(), board.getwriter());
        board.setBoardId(BOARDID);
        Result result = new Result(100);

        // 공지사항 등록
        if (StringUtils.equals(Constants.Mode.CREATE, board.getMode())) {
            result = this.boardService.createBoard(board);
        }

        // 공지사항 수정
        if (StringUtils.equals(Constants.Mode.UPDATE, board.getMode())) {
            result = this.boardService.updateBoard(board);
        }
        return result;
    }

    @ResponseBody
    @RequestMapping("/board/boardDelete")
    public String boardDelete(Board board, @RequestParam int boardArtclSeq) {
        boardService.deleteBoard(boardArtclSeq);

        return "/board/board";
    }
}
