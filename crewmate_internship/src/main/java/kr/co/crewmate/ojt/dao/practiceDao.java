package kr.co.crewmate.ojt.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.BaseDao;
import kr.co.crewmate.ojt.model.FAQ;

@Repository
public class practiceDao extends BaseDao{

    public List<FAQ> selectFAQprntFaq() {
        return super.selectList("Practice.selectFAQPrntFaq");
    }

    public List<FAQ> selectFAQchildFaq(FAQ faq) {
        return super.selectList("Practice.selectFAQChildFaq", faq);
    }

}
