package kr.co.crewmate.ojt.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import kr.co.crewmate.ojt.dao.BoardDao;
import kr.co.crewmate.ojt.model.Board;
import kr.co.crewmate.ojt.model.base.Result;

@Service
public class BoardService {
    
    @Autowired
    BoardDao boardDao;

    public Page<Board> getBoardList(Board board){
        return boardDao.selectBoardList(board);
    }
    
    public Board getBoardOne(int seq) {
        return boardDao.selectBoardOne(seq);
    }
    
    public void updateBoardHits(Board board) {
        boardDao.updateBoardHits(board);
    }
    
    public Result createBoard(Board board) {
        boardDao.insertBoardReply(board);
        return new Result();
    }
    
    public Result updateBoard(Board board) {
        boardDao.updateBoard(board);
        return new Result();
    }
    
    public int deleteBoard(int seq) {
        return boardDao.deleteBoard(seq);
    }
}
