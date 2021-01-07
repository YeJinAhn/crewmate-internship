package kr.co.crewmate.ojt.web.taglib;

import java.io.IOException;

import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.BodyContent;
import javax.servlet.jsp.tagext.BodyTagSupport;

import org.apache.commons.lang3.StringUtils;

import kr.co.crewmate.ojt.util.Util;

/**
*
* 클래스명: <code>MaskTag</code><br/><br/>
*
* 마스킹 처리
*
* @since 2019. 12. 27.
* @author akam8801
*
*/
public class MaskTag extends BodyTagSupport {
    /**
    *
    */
   private static final long serialVersionUID = 1857516127702403618L;

   private String pattern;

   public void setPattern(String pattern) {
       this.pattern = pattern;
   }

   @Override
   public int doAfterBody() throws JspException {
       JspWriter out = getPreviousOut();
       BodyContent body = getBodyContent();
       String value = body.getString();

       if (StringUtils.isNoneEmpty(value)) {

           try {
               out.print(Util.mask(value, pattern));
           } catch (IOException e) {
               throw new JspException(e.getMessage(), e);
           }
       }

       return SKIP_BODY;
   }
}
