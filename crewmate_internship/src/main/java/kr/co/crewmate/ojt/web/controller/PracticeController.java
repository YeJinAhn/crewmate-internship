package kr.co.crewmate.ojt.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.crewmate.ojt.model.FAQ;
import kr.co.crewmate.ojt.model.base.Result;
import kr.co.crewmate.ojt.service.practiceService;

@Controller
public class PracticeController {

    @Autowired
    private practiceService practiceService;

    @RequestMapping("/practice/jQuerySelector")
    public String practiceList(Model model, FAQ faq) {

        /*
         * List<FAQ> prntFaq = practiceService.getFAQprntFaq();
         * model.addAttribute("prntFaq", prntFaq);
         */

        return "/practice/jQuerySelector";
    }

    @ResponseBody
    @RequestMapping("/practice/faqclass")
    public Result faqClassList(Model model, FAQ faq) {
        Result result = new Result();
        List<FAQ> prntFaq = practiceService.getFAQprntFaq();
        result.putInfo("prntFaq", prntFaq);
        
        List<FAQ> childFaq = practiceService.getFAQchildFaq(faq);
        result.putInfo("childFaq", childFaq);

        return result;
    }

}
