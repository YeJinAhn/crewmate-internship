package kr.co.crewmate.ojt.web.resolver;

import java.lang.reflect.Method;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import kr.co.crewmate.ojt.web.exception.BadRequestException;
/**
*
* 클래스명: <code>BoExceptionResolver</code><br/><br/>
*
* BO에서 Exception이 발생 시 handling을 위한 resolver
*
* @since 2019. 12. 4.
* @author hasd1004
*
*/
public class BoExceptionResolver implements HandlerExceptionResolver {
    
    private final Logger log = LoggerFactory.getLogger(BoExceptionResolver.class);
    
    @Override
    public ModelAndView resolveException(HttpServletRequest req, HttpServletResponse res, Object handler, Exception ex) {
        ModelAndView mav = new ModelAndView();

        String viewType = this.getViewType(handler, req);

        // JSON형식인 경우
        if (StringUtils.equals(viewType, "json")) {
            // JSON형식으로 보여줄 데이터 세팅 필요
            MappingJackson2JsonView jsonView = new MappingJackson2JsonView();
            jsonView.setPrettyPrint(true);
            mav.setView(jsonView);
            mav.addObject("resultCode", 1000);
        }

        if (ex instanceof BadRequestException) {
            // 잘못된 요청으로 보여줄 데이터 세팅 필요
            if (StringUtils.equals(viewType, "html")) {
                mav.setViewName("/exception/badRequestException");
            }

            mav.addObject("resultCode", ((BadRequestException) ex).getCode());
            mav.addObject("message", ex.getMessage());
        } else if (ex instanceof NoHandlerFoundException) {
            if (StringUtils.equals(viewType, "html")) {
                mav.setViewName("/error/404");
            }
        } else if (ex instanceof EmptyResultDataAccessException) {
            // 없는 값을 조회했을경우
        } else {
            if (StringUtils.equals(viewType, "html")) {
                mav.setViewName("/exception/commonException");
            }
        }

        log.error("exception", ex);

        return mav;
    }

    /**
     * view type 확인 현재는 html, json만 체크하지만 추후에 다른 타입들이 추가될 가능성이 있으므로 따로 메서드로 빼는 게
     * 좋음
     * @param handler
     * @return String
     */
    private String getViewType(Object handler, HttpServletRequest req) {

        String viewType = "html";

        if (handler != null) {
            // 요청 method 획득
            Method method = ((HandlerMethod) handler).getMethod();
            // responseBody 어노테이션이 달려있는지
            ResponseBody responseBody = method.getAnnotation(ResponseBody.class);
            if (responseBody != null || StringUtils.contains(req.getHeader("Accept"), MediaType.APPLICATION_JSON_VALUE)) {
                viewType = "json";
            }
        }

        return viewType;
    }

}
