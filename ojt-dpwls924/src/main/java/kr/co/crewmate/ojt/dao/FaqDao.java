package kr.co.crewmate.ojt.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.BaseDao;
import kr.co.crewmate.ojt.model.Code;
import kr.co.crewmate.ojt.model.Content;

@Repository
public class FaqDao extends BaseDao {

    public List<Code> selectFaqCodeList() {
        return super.selectList("Faq.selectFaqCodeList");
    }

    public List<Content> selectFaqContentList(Content content) {
        return super.selectList("Faq.selectFaqContentList", content);
    }

}
