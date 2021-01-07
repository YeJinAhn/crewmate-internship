package kr.co.crewmate.ojt.web.resolver;

import org.springframework.web.servlet.view.InternalResourceViewResolver;

import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractUrlBasedView;

/**
 *
 * <pre>
 *  Package : kr.co.crewmate.core.web.resolver
 *  Name : InternalResourceViewResolver.java
 * </pre>
 *
 * @Author : akam8801
 * @Date : 2019. 12. 4.
 * @Desc : tiles와 같이 사용하기 위해서 loadView method를 재정의함.
 *
 */
public class CrewInternalResourceViewResolver extends InternalResourceViewResolver {
    /**
     * 여기가 재정의한 내용임. - 여기에서 : 문자을 포함한 앞의 경로를 제거해서 경로정보를 구성함.
     */
    @Override
    protected View loadView(String viewName, Locale locale) throws Exception {
        String realViewName = StringUtils.contains(viewName, ":") ? StringUtils.substringAfter(viewName, ":") : viewName;

        // 여기는 원래 loadView의 기능 내용임.
        AbstractUrlBasedView view = buildView(realViewName);
        View result = (View) getApplicationContext().getAutowireCapableBeanFactory().initializeBean(view, realViewName);
        return (view.checkResource(locale) ? result : null);
    }
}
