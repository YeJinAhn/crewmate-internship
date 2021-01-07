package kr.co.crewmate.ojt.util;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.RegExUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.crewmate.ojt.model.base.Files;
import kr.co.crewmate.ojt.prop.Prop;

/**
 * 클래스명: <code>StringUtil</code><br/>
 * <br/>
 *
 * 문자열 관련 유틸 모음
 *
 * @since 2020. 1. 2.
 * @author kjh8877
 *
 */
public class StringUtil {

    private final static Logger log = LoggerFactory.getLogger(StringUtil.class);

    private StringUtil() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * 
     * 해당 오브젝트를 JSON 문자열로 반환함.
     *
     * @since 2020. 1. 2.
     * @author kjh8877
     *
     * @param obj
     * @return
     */
    public static String getJsonStr(Object obj) {
        ObjectMapper om = new ObjectMapper();
        try {
            return om.writeValueAsString(obj);
        } catch (JsonProcessingException e) {
            log.error("JsonProcessingException : {}", e.getMessage());
            return null;
        }
    }

    /**
     * 
     * 해당 파일 경로문자열에서 파일 확장자 문자열을 반환함
     *
     * @since 2020. 1. 2.
     * @author kjh8877
     *
     * @param path
     * @return
     */
    public static String getFileExt(String path) {
        if (StringUtils.isEmpty(path)) {
            return "";
        }

        if (StringUtils.lastIndexOf(path, ".") != -1) {
            return StringUtils.substringAfterLast(path, ".");
        }

        return "";
    }

    /**
     * 
     * 에디터에 작성된 이미지 경로 변환
     *
     * @since 2020. 1. 09.
     * @author kjh8877
     *
     * @param editorContent
     * @param editorAttFileList
     * @param nextImagePath
     * @param serverScheme
     * @return
     * @throws Exception
     */
    public static Map<String, Object> convertFromEditorContent(String editorContent, List<Files> editorAttFileList, String nextImagePath,
            String serverScheme) {
        // 글 내용 유효성 체크
        Util.checkNull(editorContent);

        // 첨부 파일 리스트가 없는 경우는 emptyList 처리
        if (editorAttFileList == null) {
            editorAttFileList = Collections.emptyList();
        }

        List<Files> editorFileList = new ArrayList<>();

        String imgUrl = Prop.getValue("server.name.image");

        String servicePort = StringUtils.equals(serverScheme, "https") ? Prop.getValue("admin.ssl.port") : Prop.getValue("admin.base.port");
        servicePort = (StringUtils.equals(servicePort, "80") || StringUtils.equals(servicePort, "443")) ? "" : ":" + servicePort;
        String imagePort = StringUtils.equals(serverScheme, "https") ? Prop.getValue("img.ssl.port") : Prop.getValue("img.base.port");
        imagePort = (StringUtils.equals(imagePort, "80") || StringUtils.equals(imagePort, "443")) ? "" : ":" + imagePort;

        editorContent = editorContent.replace(imgUrl + servicePort + "/common/file/imageView?", imgUrl + imagePort + "/resources/image" + nextImagePath);
        editorContent = editorContent.replace("/common/file/imageView?", "//" + imgUrl + imagePort + "/resources/image" + nextImagePath);

        for (Files info : editorAttFileList) {
            if (info == null) {
                continue;
            }

            if (editorContent.indexOf(info.getTempFile()) > -1) { // 에디터에 있는 파일만 저장
                editorFileList.add(info);
            }

            // 신규 생성인 경우에만 확장자를 적용함. 기존 파일은 정보에 이미 확장자가 존재함.
            String ext = NumberUtils.isCreatable(info.getKey()) ? "" : "." + StringUtil.getFileExt(info.getOrgFileNm());
            editorContent = editorContent.replace(info.getTempFile(), info.getTempFile() + ext); // tempFile명에 확장자 추가
            editorContent = editorContent.replace("orgFileNm=" + info.getOrgFileNm() + "&amp;tempFile=", ""); // filename삭제
        }
        editorContent = RegExUtils.replacePattern(editorContent, "(orgFileNm=)[\\S\\s*]+(&amp;tempFile=)", "");
        // 익스 10 이하일 경우 해당 값 &amp;flag=temp 치환
        editorContent = StringUtils.replace(editorContent, "&amp;flag=temp", "");

        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("fileInfoList", editorFileList);
        resultMap.put("content", editorContent);

        return resultMap;
    }
}
