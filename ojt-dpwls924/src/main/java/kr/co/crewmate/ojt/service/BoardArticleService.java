package kr.co.crewmate.ojt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import kr.co.crewmate.ojt.dao.BoardArticleDao;
import kr.co.crewmate.ojt.model.BoardArticle;
import kr.co.crewmate.ojt.model.base.Result;

@Service
public class BoardArticleService {

    @Autowired
    BoardArticleDao boardArticleDao;

    public Page<BoardArticle> getBoardArticleList(BoardArticle boardArticle) {
        return boardArticleDao.selectBoardArticleList(boardArticle);
    }

    public BoardArticle getBoardOne(int seq) {
        return boardArticleDao.selectBoardOne(seq);
    }

    public void updateBoardArticleHits(BoardArticle boardArticle) {
        boardArticleDao.updateBoardArticleHits(boardArticle);
    }

    public Result createBoard(BoardArticle board) {
        boardArticleDao.insertBoardReply(board);

        return new Result();
    }

    public Result updateBoard(BoardArticle board) {
        boardArticleDao.updateBoard(board);

        return new Result();
    }
}
