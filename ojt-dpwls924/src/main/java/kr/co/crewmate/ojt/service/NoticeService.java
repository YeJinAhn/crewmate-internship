package kr.co.crewmate.ojt.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import kr.co.crewmate.ojt.dao.NoticeDao;
import kr.co.crewmate.ojt.model.Notice;
import kr.co.crewmate.ojt.model.base.Result;

@Service
public class NoticeService {

    private static final Logger log = LoggerFactory.getLogger(NoticeService.class);
    @Autowired
    private NoticeDao noticeDao;

    public Page<Notice> getNoticeList(Notice notice) {
        return noticeDao.selectNoticeList(notice);
    }

    public Notice getNoticeOne(int notcSeq) {
        return noticeDao.selectNoticeOne(notcSeq);
    }

    public void updateNoticeHits(Notice notice) {
        noticeDao.updateNoticeHits(notice);

    }

    public Result createNotice(Notice notice) {
        notice.setHit("0");
        noticeDao.insertNoticeReply(notice);

        return new Result();
    }

    public Result updateNotice(Notice notice) {
        notice.setLastModAdminId("admin");
        noticeDao.updateNotice(notice);

        return new Result();
    }

    public void deleteNotice(int notcSeq) {
        noticeDao.deleteNotice(notcSeq);

    }

}
