package kr.co.crewmate.ojt.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.BaseDao;
import kr.co.crewmate.ojt.model.FAQ;

@Repository
public class FaqManageDao extends BaseDao {

    public Page<FAQ> selectFaqList(FAQ faq) {
        return super.selectPageList("FAQ.selectFaqList", faq);
    }

    public List<FAQ> selectFaqCnslPrntList(FAQ cnslPrnt) {
        return super.selectList("FAQ.selectFaqCnslPrntList", cnslPrnt);
    }

    public List<FAQ> selectFaqCnslChildList(FAQ cnslChild) {
        return super.selectList("FAQ.selectFaqCnslChildList", cnslChild);
    }

    public FAQ selectFaqOne(int faqSeq) {
        return super.selectOne("FAQ.selectFaqOne", faqSeq);
    }

    public void insertFaqReply(FAQ faq) {
        super.insert("FAQ.insertFaqReply", faq);
    }

    public void updateFaq(FAQ faq) {
        super.update("FAQ.updateFaq", faq);
    }

    public void updateFaqHits(FAQ faq) {
        super.update("FAQ.updateFaqHits", faq);
    }

}
