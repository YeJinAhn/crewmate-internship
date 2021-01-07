package kr.co.crewmate.ojt.web.controller;

import java.util.List;

import org.apache.commons.codec.binary.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.crewmate.ojt.constants.Constants;
import kr.co.crewmate.ojt.model.FAQ;
import kr.co.crewmate.ojt.model.base.Result;
import kr.co.crewmate.ojt.service.FaqManageService;
import kr.co.crewmate.ojt.util.Util;
import kr.co.crewmate.ojt.web.exception.BadRequestException;

@Controller
public class FaqManageController {
    @Autowired
    private FaqManageService faqManageService;

    @RequestMapping("/faq/faqList")
    public String faqList(Model model, FAQ faq) {
        if (faq.getFaqClass() != null) {
            faq.setCnslClassId(faq.getFaqClass().get(faq.getFaqClass().size() - 1));
        }
        Page<FAQ> faqList = faqManageService.getfaqList(faq);
        model.addAttribute("list", faqList);

        List<FAQ> cnslPrntList = faqManageService.getFaqCnslPrntList(faq);
        model.addAttribute("cnslPrntList", cnslPrntList);

        return "/faq/faqList";
    }

    @ResponseBody
    @RequestMapping("/faq/cnslChild")
    public Result faqCnslChildList(Model model, FAQ faq) {
        Result result = new Result();
        List<FAQ> cnslChildList = faqManageService.getFaqCnslChildList(faq);
        result.putInfo("cnslChildList", cnslChildList);

        return result;
    }

    @RequestMapping({ "/faq/faqFormReg", "/faq/faqFormMod" })
    public String faqForm(Model model, FAQ faq, @RequestParam(value = "faqSeq", required = false) Integer faqSeq) {
        FAQ faqOne = new FAQ();
        if (StringUtils.equals(Constants.Mode.UPDATE, Util.getMode())) {
            faq.setWriteAdminId("admin");
            if (faqSeq == null) {
                throw new BadRequestException(Constants.ExMsg.DATA_EMPTY);
            }
            faqOne = faqManageService.getFaqOne(faq.getFaqSeq());
            if (faqOne == null) {
                throw new BadRequestException(Constants.ExMsg.DATA_EMPTY);
            }
            faqManageService.updateFaqHits(faq);
        }

        List<FAQ> cnslPrntList = faqManageService.getFaqCnslPrntList(faq);
        model.addAttribute("cnslPrntList", cnslPrntList);

        model.addAttribute("faqOne", faqOne);
        return "/faq/faqForm";
    }

    @ResponseBody
    @RequestMapping({ "/faq/faqCreate", "/faq/faqUpdate" })
    public Result saveFaq(FAQ faq) {
        Result result = new Result();

        faq.setWriteAdminId("admin");
        if (StringUtils.equals(Constants.Mode.CREATE, faq.getMode())) {
            result = this.faqManageService.createFaq(faq);
        }
        if (StringUtils.equals(Constants.Mode.UPDATE, faq.getMode())) {
            result = this.faqManageService.updateFaq(faq);
        }
        return result;
    }

    @RequestMapping("/faq/uploadImageForm/popup")
    public String uploadImageForm() {
        return "/faq/uploadImageForm";
    }
}
