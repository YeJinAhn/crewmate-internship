package kr.co.crewmate.ojt.web.resolver;

import java.util.Locale;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.view.AbstractUrlBasedView;
import org.springframework.web.servlet.view.tiles3.TilesViewResolver;

/**
 * 
 * <pre>
 *  Package : kr.co.crewmate.core.web.resolver 
 *  Name : TilesViewResolver.java
 * </pre>
 *
 * @Author : akam8801
 * @Date : 2019. 12. 3.
 * @Desc : tiles를 적용하지 않고 그냥 다음 resolver를 사용하기 휘애서 재정의
 *
 */
public class CrewTilesViewResolver extends TilesViewResolver {
    /**
     * 여기가 재정의한 내용임. - 여기에서 null을 리턴하면 다음 resolver를 찾아감.
     */
    @Override
    protected View loadView(String viewName, Locale locale) throws Exception {
        if (StringUtils.startsWith(viewName, "no-tiles")) {
            return null;
        }
        String realViewName = StringUtils.contains(viewName, ":") ? StringUtils.substringAfter(viewName, ":") : viewName;

        // 여기는 원래 loadView의 기능 내용임.
        AbstractUrlBasedView view = buildView(realViewName);
        View result = (View) getApplicationContext().getAutowireCapableBeanFactory().initializeBean(view, realViewName);
        return (view.checkResource(locale) ? result : null);
    }
}
