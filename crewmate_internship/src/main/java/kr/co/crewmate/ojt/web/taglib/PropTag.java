package kr.co.crewmate.ojt.web.taglib;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import kr.co.crewmate.ojt.prop.Prop;

/**
 * 
 * <pre>
 *  Package : kr.co.crewmate.core.web.taglib 
 *  Name : PropTag.java
 * </pre>
 *
 * @Author : akam8801
 * @Date : 2019. 12. 6.
 * @Desc : 프로퍼티 정보를 반환함.
 *
 */
public class PropTag extends TagSupport {
    /**
     * 
     */
    private static final long serialVersionUID = 6748560104412936324L;

    private String key;

    private String defaultValue;

    public void setKey(String key) {
        this.key = key;
    }

    public void setDefaultValue(String defaultValue) {
        this.defaultValue = defaultValue;
    }

    @Override
    public int doStartTag() throws JspTagException {
        return SKIP_BODY;
    }

    @Override
    public int doEndTag() throws JspTagException {
        try {
            pageContext.getOut().print(Prop.getValue(key, defaultValue));
        } catch (Exception e) {
            throw new JspTagException(e);
        }

        return EVAL_PAGE;
    }
}
