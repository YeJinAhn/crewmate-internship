package kr.co.crewmate.ojt.dao;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.BaseDao;
import kr.co.crewmate.ojt.model.Notice;

@Repository
public class NoticeDao extends BaseDao {

    public Page<Notice> selectNoticeList(Notice notice) {
        return super.selectPageList("Notice.selectNoticeList", notice);
    }

    public Notice selectNoticeOne(int notcSeq) {
        return super.selectOne("Notice.selectNoticeOne", notcSeq);
    }

    public int updateNoticeHits(Notice notice) {
        return super.update("Notice.updateNoticeHits", notice);

    }

    public int insertNoticeReply(Notice notice) {
        return super.insert("Notice.insertNoticeReply", notice);

    }

    public int updateNotice(Notice notice) {
        return super.update("Notice.updateNotice", notice);
    }

    public int deleteNotice(int notcSeq) {
        return super.delete("Notice.deleteNotice", notcSeq);

    }

}
