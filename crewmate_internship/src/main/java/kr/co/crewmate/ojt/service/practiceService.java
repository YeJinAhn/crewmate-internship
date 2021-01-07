package kr.co.crewmate.ojt.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.crewmate.ojt.dao.practiceDao;
import kr.co.crewmate.ojt.model.FAQ;

@Service
public class practiceService {
    
    @Autowired
    private practiceDao practiceDao;

    public List<FAQ> getFAQprntFaq() {
        return practiceDao.selectFAQprntFaq();
    }

    public List<FAQ> getFAQchildFaq(FAQ faq) {
        return practiceDao.selectFAQchildFaq(faq);
    }

}
