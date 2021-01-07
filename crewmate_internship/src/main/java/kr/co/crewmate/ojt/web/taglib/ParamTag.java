package kr.co.crewmate.ojt.web.taglib;

import java.net.URLEncoder;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import kr.co.crewmate.ojt.util.HttpUtil;



/**
 * 파라미터를 하나의 문자열로 조합한다.
 * @author 김기석
 *
 */
public class ParamTag extends TagSupport
{
    private static final long serialVersionUID = 5643037610815068363L;

    private String skip;
    private String addParamStr;
    private boolean encode;

    public void setSkip(String skip){               this.skip           = skip;         }
    public void setAddParamStr(String addParamStr){ this.addParamStr    = addParamStr;  }
    public void setEncode(boolean encode) {         this.encode         = encode;       }
    
    @Override
    public int doStartTag() throws JspTagException
    {
        return SKIP_BODY;
    }

    @Override
    public int doEndTag() throws JspTagException
    {
        try
        {
            String result = HttpUtil.getParamStr(this.pageContext.getRequest(), this.skip, this.addParamStr);
            if(this.encode){ result = URLEncoder.encode(result, "UTF-8"); }
            pageContext.getOut().print(result);
        }
        catch(Exception e)
        {
            throw new JspTagException(e);
        }

        return EVAL_PAGE;
    }
}
