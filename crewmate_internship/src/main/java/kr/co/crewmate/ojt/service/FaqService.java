package kr.co.crewmate.ojt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import kr.co.crewmate.ojt.dao.FaqDao;
import kr.co.crewmate.ojt.model.Code;
import kr.co.crewmate.ojt.model.Content;

@Service
public class FaqService {

    @Autowired
    private FaqDao faqDao;

    public List<Code> getFaqCodeList() {
        return faqDao.selectFaqCodeList();
    }

    public List<Content> getFaqContentList(Content content) {
        return faqDao.selectFaqContentList(content);
    }

}
