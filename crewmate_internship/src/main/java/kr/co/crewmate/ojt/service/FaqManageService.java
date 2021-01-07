package kr.co.crewmate.ojt.service;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import kr.co.crewmate.ojt.dao.FaqManageDao;
import kr.co.crewmate.ojt.model.FAQ;
import kr.co.crewmate.ojt.model.base.Result;

@Service
public class FaqManageService {
    @Autowired
    private FaqManageDao faqManageDao;

    public Page<FAQ> getfaqList(FAQ faq) {
        return faqManageDao.selectFaqList(faq);
    }

    public List<FAQ> getFaqCnslPrntList(FAQ cnslPrnt) {
        return faqManageDao.selectFaqCnslPrntList(cnslPrnt);
    }

    public List<FAQ> getFaqCnslChildList(FAQ cnslChild) {
        return faqManageDao.selectFaqCnslChildList(cnslChild);
    }

    public FAQ getFaqOne(int faqSeq) {
        return faqManageDao.selectFaqOne(faqSeq);
    }

    public Result createFaq(FAQ faq) {

        /*
         * Date date = new Date(); String format = DateFormatUtils.format(date,
         * "yy/MM/dd");
         * 
         * faq.setRgstDtm(format);
         */
        faqManageDao.insertFaqReply(faq);

        return new Result();
    }

    public Result updateFaq(FAQ faq) {
        faq.setLastModAdminId("admin");
        faqManageDao.updateFaq(faq);
        return new Result();
    }

    public void updateFaqHits(FAQ faq) {
        faqManageDao.updateFaqHits(faq);
    }

}
