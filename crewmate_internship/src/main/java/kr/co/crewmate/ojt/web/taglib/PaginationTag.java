package kr.co.crewmate.ojt.web.taglib;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.tagext.TagSupport;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;

import kr.co.crewmate.ojt.util.HttpUtil;

/**
 * 
 * 클래스명: <code>PaginationTag</code><br/><br/>
 *
 * 페이징 처리 태그
 *
 * @since 2019. 12. 6.
 * @author akam8801
 *
 */
public class PaginationTag extends TagSupport {

    private final Logger log = LoggerFactory.getLogger(PaginationTag.class);

    /**
     * 
     */
    private static final long serialVersionUID = -5682185876027446954L;

    private static final String FILE_NAME_NON_FN = "/default.jsp";

    private static final String FILE_NAME_FN = "/defaultFn.jsp";

    private String[] temapatePathArr = {"/WEB-INF", "/views", "/common", "/pagination"};

    private String listResultName;

    private String paramPage = "page";

    private String paramListSize    = "listSize";

    private String paramPageSize    = "pageSize";

    private int pageSize = 10;

    private String addParam = "";

    private String function;

    public void setTemapatePathArr(String[] temapatePathArr) {
        this.temapatePathArr = temapatePathArr;
    }

    public void setListResultName(String listResultName) {
        this.listResultName = listResultName;
    }

    public void setParamPage(String paramPage) {
        this.paramPage = paramPage;
    }

    public void setParamListSize(String paramListSize) {
        this.paramListSize = paramListSize;
    }

    public void setParamPageSize(String paramPageSize) {
        this.paramPageSize = paramPageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public void setAddParam(String addParam) {
        this.addParam = addParam;
    }

    public void setFunction(String function) {
        this.function = function;
    }

    @Override
    public int doStartTag() throws JspTagException {
        return SKIP_BODY;
    }

    @Override
    @SuppressWarnings("rawtypes")
    public int doEndTag() throws JspTagException {
        ServletRequest request = pageContext.getRequest();
        Page listResult = (Page) HttpUtil.lookup(pageContext, this.listResultName, "request");

        if (listResult == null) {
            return EVAL_PAGE;
        }

        Map<String, Object> dataMap = new HashMap<>();
        dataMap.put("listResult", listResult.getPageable());
        dataMap.put("paramPage", this.paramPage);
        dataMap.put("paramListSize",
                StringUtils.isNotEmpty(request.getParameter(this.paramListSize)) ? "&" + this.paramListSize + "=" + request.getParameter(this.paramListSize)
                        : "");
        dataMap.put("paramPageSize",
                StringUtils.isNotEmpty(request.getParameter(this.paramPageSize)) ? "&" + this.paramPageSize + "=" + request.getParameter(this.paramPageSize)
                        : "");
        String paramStr = HttpUtil.getParamStr(request, this.paramPage + "," + this.paramListSize + "," + this.paramPageSize);
        dataMap.put("paramStr", StringUtils.isNotEmpty(paramStr) ? "&" + paramStr  + this.addParam : "" + this.addParam);
        dataMap.put("function", this.function);

        int page = listResult.getNumber();
        int totalPages = listResult.getTotalPages();
        int startPage = (int) ((int) Math.ceil(((double) page / (double) this.pageSize) - 1) * (double) this.pageSize + 1);
        int endPage = (startPage + this.pageSize - 1) > totalPages ? totalPages : (startPage + this.pageSize - 1);

        dataMap.put("totalPages", totalPages);
        dataMap.put("startPage", startPage);
        dataMap.put("endPage", endPage);
        dataMap.put("number", page);
        dataMap.put("numberOfElements", listResult.getNumberOfElements());
        dataMap.put("pageSize", pageSize);

        String path = StringUtils.join(temapatePathArr, "");
        if (StringUtils.isEmpty(this.function)) {
            path += FILE_NAME_NON_FN;
        } else {
            path += FILE_NAME_FN;
        }

        try {
            String result = HttpUtil.dispatch((HttpServletRequest) request, (HttpServletResponse) this.pageContext.getResponse(), dataMap,
                    path);
            pageContext.getOut().print(result);
        } catch (ServletException se) {
            log.error("PaginationTag Exception : ", se.getMessage());
        } catch (IOException e) {
            log.error("PaginationTag Exception : ", e.getMessage());
        }

        return EVAL_PAGE;
    }

}