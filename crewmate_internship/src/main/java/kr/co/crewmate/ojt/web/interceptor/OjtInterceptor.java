package kr.co.crewmate.ojt.web.interceptor;

import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.co.crewmate.ojt.constants.Constants;
import kr.co.crewmate.ojt.util.Util;

public class OjtInterceptor extends HandlerInterceptorAdapter {
    private final Logger log = LoggerFactory.getLogger(OjtInterceptor.class);
    
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        /**
         * 클라이언트에서 컨트롤러로 요청할 때
         */
        // 컨트롤러에 대한 요청인 경우를 처리함. 일반 이미지나 HTML 요청은 스킵
        if (handler instanceof HandlerMethod) {
            log.debug("[BaseInterceptor preHandle]");
            log.debug("[Request URI] " + request.getRequestURI());
        }

        return super.preHandle(request, response, handler);
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        /**
         * 컨트롤러에서 클라이언트로 요청할 때
         */
        if (handler instanceof HandlerMethod) {
            Method method = ((HandlerMethod) handler).getMethod();
            ResponseBody responseBody = method.getAnnotation(ResponseBody.class);
            if (responseBody == null && StringUtils.endsWith(request.getRequestURI(), "/popup")) {
                // uri 기반에서 팝업으로 요청된 경우 tiles의 popup 템플릿을 적용하기 위해서 뒤에 /popup을 추가함.
                modelAndView.setViewName(modelAndView.getViewName() + "/popup");
                request.setAttribute("popupYn", Constants.Y);
            }

            // request에 있는 parameter 정보를 변환
            this.setParamToParamMap(request, modelAndView);

            // mode값 설정
            this.setModeInfo(request);
        }

        super.postHandle(request, response, handler, modelAndView);
    }

    /**
     * request에 있는 parameter 정보를 변환하는 메서드
     * 
     *
     * @since 2019. 12. 16.
     * @author kjh8877
     *
     * @param request
     * @param modelAndView
     */
    private void setParamToParamMap(HttpServletRequest request, ModelAndView modelAndView) {
        Map<String, String> paramMap = new HashMap<>();

        System.out.println("!! " + request.getParameterMap());
        // request parameterMap과 modelAndView가 존재하는 경우에 실행
        
        if (request.getParameterMap() != null && modelAndView != null) {
            for (Map.Entry<String, String[]> e : request.getParameterMap().entrySet()) {
                paramMap.put(e.getKey(), StringUtils.join(e.getValue(), ","));
            }

            modelAndView.addObject("paramMap", paramMap);
        }
     
    }

    /**
     * 기본 모드값 설정
     * @param request
     */
    private void setModeInfo(HttpServletRequest request) {
        request.setAttribute("mode", Util.getMode());
    }
}
