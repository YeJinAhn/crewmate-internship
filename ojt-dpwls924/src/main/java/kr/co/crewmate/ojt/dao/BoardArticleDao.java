package kr.co.crewmate.ojt.dao;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.BaseDao;
import kr.co.crewmate.ojt.model.BoardArticle;

@Repository
public class BoardArticleDao extends BaseDao {

    public Page<BoardArticle> selectBoardArticleList(BoardArticle boardArticle) {
        return super.selectPageList("BoardArticle.selectBoardArticleList", boardArticle);
    }
    
    public BoardArticle selectBoardOne(int seq) {
        return super.selectOne("BoardArticle.selectBoardOne", seq);
    }
    
    public void updateBoardArticleHits(BoardArticle boardArticle) {
        super.update("BoardArticle.updateBoardArticleHits", boardArticle);
    }
    
    public void insertBoardReply(BoardArticle boardArticle) {
        super.insert("BoardArticle.insertBoardReply", boardArticle);
    }
    
    public void updateBoard(BoardArticle boardArticle) {
        super.update("BoardArticle.updateBoard", boardArticle);
    }
}
