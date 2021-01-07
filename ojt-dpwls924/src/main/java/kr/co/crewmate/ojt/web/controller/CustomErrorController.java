package kr.co.crewmate.ojt.web.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * 
 * 클래스명: <code>CustomErrorController</code><br/><br/>
 *
 * 404 페이지 처리용 컨트롤러
 *
 * @since 2020. 10. 28.
 * @author kjh8877
 *
 */
@Controller
public class CustomErrorController implements ErrorController {

    private final String VIEW_PATH = "/error/";

    @RequestMapping("/error")
    public String handleError(HttpServletRequest request) {

        Object status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE);
        if (status != null) {
            int statusCode = Integer.valueOf(status.toString());
            
            if (statusCode == HttpStatus.NOT_FOUND.value()) {
                return VIEW_PATH + "404";
            }
            
        }

        return "error";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
