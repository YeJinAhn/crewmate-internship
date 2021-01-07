package kr.co.crewmate.ojt.web.taglib;

import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import kr.co.crewmate.ojt.util.HttpUtil;

/**
*
* 클래스명: <code>SelectTag</code><br/><br/>
*
* select태그 생성 클래스
* 공통 코드 및 scope에 등록되어있는 list로 생성 가능
*
* @since 2019. 12. 19.
* @author hasd1004
*
*/
@SuppressWarnings("unchecked")
public class SelectTag extends TagSupport {

    private final Logger log = LoggerFactory.getLogger(PaginationTag.class);

    /**
     *
     */
    private static final long serialVersionUID = -6367427218846162016L;

    // 대상이 될 이름 - 공통코드인 경우 code_mst값이며, lookup 해오는 대상인 경우 list의 이름
    private String target;

    // name속성에 정해줄 값
    private String name;

    // 체크된 값을 노출시켜줄 때 값
    private String selectedValue;

    // 속성을 추가하고 싶을 때 값 세팅
    private String addAttr = "";

    // 제외할 코드
    private String exceptValues = "";

    // 최상단에 노출시켜줄 옵션명
    private String title;

    // 실제 코드 값을 바인딩 하고자 하는 필드명
    private String key = "code";

    // 화면에 노출시켜줄 값을 빼오고자 하는 필드명
    private String value = "name";

    @Override
    public int doStartTag() throws JspTagException {
        return SKIP_BODY;
    }

    public void setTarget(String target) {
        this.target = target;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSelectedValue(String selectedValue) {
        this.selectedValue = selectedValue;
    }

    public void setAddAttr(String addAttr) {
        this.addAttr = addAttr;
    }

    public void setExceptValues(String exceptValues) {
        this.exceptValues = exceptValues;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public void setValue(String value) {
        this.value = value;
    }



    @Override
    public int doEndTag() throws JspTagException {

        // common flag값이 true이면 공통코드에서 데이터 조회 false인 경우 lookup하여 조회, default는 true
        List<Object> list = this.getCodeList();

        if (list == null || list.isEmpty()) {
            list = (List<Object>) HttpUtil.lookup(super.pageContext, this.target, null);
        }

        if (list != null && !list.isEmpty()) {
            StringBuilder sb = new StringBuilder();

            // select 태그 생성 시작
            sb.append("<select");
            if (StringUtils.isNotEmpty(this.name)) {
                sb.append(" name=\'").append(this.name).append("\'");
            }
            if (StringUtils.isNotEmpty(this.id)) {
                // id멤버는 TagSupport에 있는 항목을 사용함.
                sb.append(" id=\'").append(this.id).append("\'");
            }
            if (StringUtils.isNotEmpty(this.addAttr)) {
                sb.append(" ").append(this.addAttr);
            }
            sb.append(">");

            // select 태그 내에 맨 위에 생성될 옵션태그
            if (StringUtils.isNotEmpty(this.title)) {
                sb.append("<option value=''>").append(this.title).append("</option>");
            }

            try {
                // 옵션 태그 생성
                for (Object o : list) {
                    sb.append(this.getOptionTag(o));
                }

                sb.append("</select>");

                super.pageContext.getOut().print(sb.toString());
            } catch (IOException e) {
                log.error("SelectTag IOException : {}", e.getMessage());
            } catch (NoSuchMethodException e) {
                log.error("SelectTag NoSuchMethodException : {}", e.getMessage());
            } catch (IllegalAccessException e) {
                log.error("SelectTag IllegalAccessException : {}", e.getMessage());
            } catch (InvocationTargetException e) {
                log.error("SelectTag InvocationTargetException : {}", e.getMessage());
            }
        }

        return EVAL_PAGE;
    }

    /**
     * 리플렉션한 결과값 기반으로 1개 옵션태그 구성데이터 반환
     *
     * @since 2019. 12. 17.
     * @author hasd1004
     *
     * @param obj
     * @return StringBuilder
     * @throws NoSuchMethodException
     * @throws InvocationTargetException
     * @throws IllegalAccessException
     */
    private StringBuilder getOptionTag(Object obj)
            throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        StringBuilder sb = new StringBuilder();

        Class<? extends Object> clazz = obj.getClass();

        // 해당 getter 호출
        Method method = clazz.getMethod("get" + StringUtils.capitalize(this.key));
        String oKey = method.invoke(obj).toString();
        method = clazz.getMethod("get" + StringUtils.capitalize(this.value));
        String oVal = method.invoke(obj).toString();

        // 제외할 코드인 경우 스킵
        if (ArrayUtils.contains(StringUtils.split(this.exceptValues, ','), oKey)) {
            return sb;
        }

        // 옵션태그 생성 시작
        sb.append("<option value=\'").append(oKey).append("\'");
        if (StringUtils.equals(this.selectedValue, oKey)) {
            sb.append(" selected ");
        }
        sb.append(">");
        sb.append(oVal);
        sb.append("</option>");
        // 옵션태그 생성 종료
        return sb;
    }

    /**
     * 공통코드 목록데이터 반환
     *
     * @since 2019. 12. 17.
     * @author hasd1004
     *
     * @return List
     */
    private List<Object> getCodeList() {
        // CodeService codeService = (CodeService) HttpUtil.getBean(super.pageContext.getServletContext(), "codeService");
        return null;// Lists.newArrayList(codeService.getCodeList(this.target, Constants.Y));
    }
}