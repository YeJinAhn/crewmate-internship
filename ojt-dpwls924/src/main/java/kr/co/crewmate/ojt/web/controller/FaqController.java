package kr.co.crewmate.ojt.web.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.crewmate.ojt.model.Code;
import kr.co.crewmate.ojt.model.Content;
import kr.co.crewmate.ojt.service.FaqService;

@Controller
public class FaqController {

    private static final Logger log = LoggerFactory.getLogger(FaqController.class);

    @Autowired
    private FaqService faqService;

    @RequestMapping("/nepa/faqList")
    public String faqList(Model model, Content content, Code code) {
        List<Code> codeList = faqService.getFaqCodeList();
        model.addAttribute("codeList", codeList);

//        if (content.getContentGroup() == null && content.getKeyword() == null) {
//            content.setContentGroup("");
//            content.setKeyword("");
//        }
        List<Content> contentList = faqService.getFaqContentList(content);
        for(int i =0; i<contentList.size(); i++) {
            contentList.get(i).setContent(contentList.get(i).getContent().replace("\n", "<br>"));
        }
        model.addAttribute("list", contentList);
        log.info(model + "");

        return "/nepa/faqList";
    }

}
