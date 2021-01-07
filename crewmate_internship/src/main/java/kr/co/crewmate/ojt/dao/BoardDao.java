package kr.co.crewmate.ojt.dao;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.HomeDao;
import kr.co.crewmate.ojt.model.Board;

@Repository
public class BoardDao extends HomeDao {

    public Page<Board> selectBoardList(Board board){
        return super.selectPageList("Board.selectBoardList", board);
    }
    
    public Board selectBoardOne(int seq) {
        return super.selectOne("Board.selectBoardOne", seq);
    }
    
    public void updateBoardHits(Board board) {
        super.update("Board.updateBoardHits", board);
    }
    
    public void insertBoardReply(Board board) {
        super.insert("Board.insertBoardReply", board);
    }
    
    public void updateBoard(Board board) {
        super.update("Board.updateBoard", board);
    }
    
    public int deleteBoard(int seq) {
        return super.delete("Board.deleteBoard", seq);
    }
}
