package kr.co.crewmate.ojt.util;

import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.apache.commons.lang3.time.FastDateFormat;
import org.joda.time.DateTime;
import org.joda.time.format.DateTimeFormat;
import org.joda.time.format.DateTimeFormatter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.co.crewmate.ojt.constants.Constants;
import kr.co.crewmate.ojt.model.base.BaseModel;
import kr.co.crewmate.ojt.web.exception.BadRequestException;

public class Util {

    private final static Logger log = LoggerFactory.getLogger(Util.class);

    private Util() {
        throw new IllegalStateException("util class");
    }

    /**
     * 해당 값이 비어 있는지를 점검함.
     * @param val
     * @return
     */
    public static int isEmpty(String... val) {
        for (int i = 0; i < val.length; i++) {
            if (StringUtils.isEmpty(val[i])) { return i; }
        }

        return -1;
    }

    /**
     * 해당 값이 비어 있는지를 점검함.
     * @param val
     * @return
     */
    public static int isBlank(String... val) {
        for (int i = 0; i < val.length; i++) {
            if (StringUtils.isBlank(val[i])) { return i; }
        }

        return -1;
    }

    /**
     * 해당 값이 null인지를 점검함.
     * @param val
     * @return
     */
    public static int isNull(Object... val) {
        for (int i = 0; i < val.length; i++) {
            if (val[i] == null) { return i; }
        }

        return -1;
    }

    /**
     * 해당 값들이 모두 0인지를 체크함. - 0인 항목의 index값을 반환함. - 모두 0이 아닌경우 -1값을 리턴시킴.
     * @param val : 체크할 값들...
     * @return
     */
    public static int isZero(int... val) {
        for (int i = 0; i < val.length; i++) {
            if (val[i] == 0) { return i; }
        }

        return -1;
    }

    /**
     * 해당 값들이 모두 0인지를 체크함. - 0인 항목의 index값을 반환함. - 모두 0이 아닌경우 -1값을 리턴시킴.
     * @param val : 체크할 값들...
     * @return
     */
    public static int isZero(long... val) {
        for (int i = 0; i < val.length; i++) {
            if (val[i] == 0) { return i; }
        }

        return -1;
    }

    /**
     * 
     * 입력한 값이 유효한 날짜 패턴인지 검증
     * 기본 비교 패턴 - yyyyMMddHHmmss
     *
     * @since 2020. 1. 21.
     * @author kjh8877
     *
     * @param pattern
     * @param source
     * @return
     */
    public static int isDateFormat(String pattern, String ... val) {
        String chkPattern = StringUtils.defaultIfEmpty(pattern, "yyyyMMddHHmmss");
        FastDateFormat format = FastDateFormat.getInstance(chkPattern);

        for (int i = 0; i < val.length; i++) {
            try {
                // 날짜 패턴의 길이와 체크할 날짜의 길이를 비교
                if (chkPattern.length() == val[i].length()) {
                    format.parse(val[i]);
                } else {
                    return i;
                }
            } catch (ParseException e) {
                return i;
            }
        }

        return -1;
    }

    /**
     * 해당 값이 null인지를 점검함.
     * @param val
     * @return
     */
    public static void checkNull(Object... val) {
        for (int i = 0; i < val.length; i++) {
            if (val[i] == null) { throw new BadRequestException(Constants.ExMsg.NULL + i, Constants.ExCode.NULL); }
        }
    }

    /**
     * 해당 값이 비어있는지를 점검함.
     * @param val
     * @return
     */
    public static void checkBlank(String... val) {
        for (int i = 0; i < val.length; i++) {
            if (StringUtils.isBlank(val[i])) { throw new BadRequestException(Constants.ExMsg.BLANK + i, Constants.ExCode.BLANK); }
        }
    }

    /**
     * 해당 값이 비어있는지를 점검함.
     * @param val
     * @return
     */
    public static void checkEmpty(String... val) {
        for (int i = 0; i < val.length; i++) {
            if (StringUtils.isEmpty(val[i])) { throw new BadRequestException(Constants.ExMsg.EMPTY + i, Constants.ExCode.EMPTY); }
        }
    }

    /**
     * 해당 값들이 모두 0인지를 체크한.
     * @param values
     * @return
     */
    public static void checkZero(Number... values) {
        for (int i = 0; i < values.length; i++) {
            Number val = values[i];

            // null 체크
            if (val == null) { throw new BadRequestException(Constants.ExMsg.NULL + i, Constants.ExCode.NULL); }

            // 0 체크
            if (val instanceof Long && ((Long) val).compareTo(0L) == 0) { throw new BadRequestException(Constants.ExMsg.ZERO + i, Constants.ExCode.ZERO); }
            if (val instanceof Integer && ((Integer) val).compareTo(0) == 0) { throw new BadRequestException(Constants.ExMsg.ZERO + i, Constants.ExCode.ZERO); }
            if (val instanceof Float && ((Float) val).compareTo(0F) == 0) { throw new BadRequestException(Constants.ExMsg.ZERO + i, Constants.ExCode.ZERO); }
            if (val instanceof Double && ((Double) val).compareTo(0D) == 0) { throw new BadRequestException(Constants.ExMsg.ZERO + i, Constants.ExCode.ZERO); }
        }
    }

    /**
     * 해당 값들이 모두 0이하인지를 검증함.
     * @param values
     */
    public static void checkNum(Number... values) {
        for (int i = 0; i < values.length; i++) {
            Number val = values[i];

            // null 체크
            if (val == null) { throw new BadRequestException(Constants.ExMsg.NULL + i, Constants.ExCode.NULL); }

            // 0 체크
            if (val instanceof Long && ((Long) val).compareTo(0L) <= 0) {
                throw new BadRequestException(Constants.ExMsg.ZERO_MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
            if (val instanceof Integer && ((Integer) val).compareTo(0) <= 0) {
                throw new BadRequestException(Constants.ExMsg.ZERO_MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
            if (val instanceof Float && ((Float) val).compareTo(0F) <= 0) {
                throw new BadRequestException(Constants.ExMsg.ZERO_MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
            if (val instanceof Double && ((Double) val).compareTo(0D) <= 0) {
                throw new BadRequestException(Constants.ExMsg.ZERO_MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
        }
    }

    /**
     * 해당 값들이 모두 0미만인지를 검증함.
     * @param values
     */
    public static void checkMinus(Number... values) {
        for (int i = 0; i < values.length; i++) {
            Number val = values[i];

            // null 체크
            if (val == null) { throw new BadRequestException(Constants.ExMsg.NULL + i, Constants.ExCode.NULL); }

            // 0 체크
            if (val instanceof Long && ((Long) val).compareTo(0L) < 0) {
                throw new BadRequestException(Constants.ExMsg.MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
            if (val instanceof Integer && ((Integer) val).compareTo(0) < 0) {
                throw new BadRequestException(Constants.ExMsg.MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
            if (val instanceof Float && ((Float) val).compareTo(0F) < 0) {
                throw new BadRequestException(Constants.ExMsg.MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
            if (val instanceof Double && ((Double) val).compareTo(0D) < 0) {
                throw new BadRequestException(Constants.ExMsg.MINUS + i, Constants.ExCode.ZERO_MINUS);
            }
        }
    }

    /**
     * 문자열 길이 체크
     * @param length 최소길이값
     * @param val 길이 체크할 문자열
     */
    public static void checkMaxLength(int length, String... val) {
        for (int i = 0; i < val.length; i++) {
            if (!StringUtils.isBlank(val[i]) && val[i].length() > length) {
                throw new BadRequestException(Constants.ExMsg.MAX_LENGTH + "(" + i + "/" + length + ")", Constants.ExCode.MAX_LENGTH);
            }
        }
    }

    /**
     * 문자열 길이 체크
     * <pre>
     * 반드시 최소길이값과, 길이 체크할 문자열을 번갈아 삽입해야 함.
     * (ex. checkMaxLength("20", "코드값", "30", "이름");)
     * </pre>
     * @param str 최소길이값과, 길이 체크할 문자열.
     */
    public static void checkMaxLength(String... str) {
        //짝수로 파라미터가 들어왔는지 체크
        if (str.length % 2 != 0) { throw new BadRequestException(Constants.ExMsg.DATA_EMPTY, Constants.ExCode.DATA_EMPTY); }


        //문자열 길이 체크
        for (int i = 0; i < str.length; i++) {
            if (i % 2 == 0) {
                if (!NumberUtils.isCreatable(str[i])) { throw new BadRequestException(Constants.ExMsg.NOT_NUMBER + i, Constants.ExCode.NOT_NUMBER); }
                int length = Integer.parseInt(str[i]);
                if (!StringUtils.isBlank(str[i + 1]) && str[i + 1].length() > length) {
                    throw new BadRequestException(Constants.ExMsg.MAX_LENGTH + "(" + (i + 1) + "/" + length + ")", Constants.ExCode.MAX_LENGTH);
                }
            }
        }
    }

    /**
     * 문자열이 'Y' 또는 'N'인지 체크
     * @param val Y혹은 N인지 체크할 문자열
     */
    public static void checkYn(String... val) {
        String[] arrYn = new String[] { Constants.Y, Constants.N };

        for (int i = 0; i < val.length; i++) {
            if (!ArrayUtils.contains(arrYn, val[i])) { throw new BadRequestException(Constants.ExMsg.NOT_YN + i, Constants.ExCode.NOT_YN); }
        }
    }

    /**
     * 
     * 해당 값이 입력받은 날짜 패턴인지 검증
     *
     * @since 2020. 1. 21.
     * @author kjh8877
     *
     * @param pattern
     * @param val
     */
    public static void checkDateFormat(String pattern, String... val) {
        int idx = isDateFormat(pattern, val);
        if (idx != -1) {
            throw new BadRequestException(Constants.ExMsg.NOT_DATE_FORMAT + idx, Constants.ExCode.INVALID_VALUE);
        }
    }

    /**
     * 해당 오브젝트를 JSON 문자열로 반환함.
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
     * 해당 값들이 모두 숫자인지 체크
     *  - 2019.12.30 : 김기석
     *      - NumberUtils.isNumber(str) 사용하면 됨.
     *      - 추후 삭제 예정임.
     *
     * @deprecated
     * @param val
     * @return
     */
    @Deprecated
    public static boolean isNumeric(String... val) {
        for (int i = 0; i < val.length; i++) {
            if (!val[i].matches("[0-9]+")) { return false; }
        }
        return true;
    }


    /**
     *
     * 날짜 문자열을 해당 패턴의 날짜 형식으로 리턴
     *
     * @since 2020. 1. 6.
     * @author akam8801
     *
     * @param val
     * @param patternTgt
     * @return
     */
    public static String stringDateFormat(String val, String patternTgt) {
        return stringDateFormat(val, patternTgt, "yyyyMMddHHmmss");
    }

    public static String stringDateFormat(String val, String patternTgt, String patternOrg) {

        DateTimeFormatter dtf = DateTimeFormat.forPattern(patternOrg);
        // Parsing the date
        DateTime jodatime = dtf.parseDateTime(val);
        // Format for output
        DateTimeFormatter dtfOut = DateTimeFormat.forPattern(patternTgt);
        // Printing the date
        System.out.println(dtfOut.print(jodatime));
        // 날짜를 문자로 변경
        return dtfOut.print(jodatime);
    }

    /**
     * 전화번호 변환 (xx-xxx-xxx, xxx-xxx-xxxx, xxx-xxxx-xxxx)
     * @param value
     * @return
     */
    public static String telNumFormat(String value, String pattern) {
        if (StringUtils.isEmpty(value)) { return ""; }
        return value.replaceAll("^(01\\d{1}|02|0\\d{1,2})(\\d{3,4})(\\d{4})", "$1" + pattern + "$2" + pattern + "$3");
    }

    /**
     * 숫자를 ###,### 패턴으로 반환
     * @param value
     * @return
     */
    public static String numberFormat(Object obj) {
        if (obj instanceof String) {
            try {
                return NumberFormat.getInstance().format(Integer.parseInt((String) obj));
            } catch (Exception e) {
                return obj.toString();
            }
        } else {
            return NumberFormat.getInstance().format(obj);
        }

    }

    /**
     * 문자열을 마스킹 처리를 한다. Util.mask("20181231121212", "####.##.## ##:##:##"); ->
     * 2018.12.31 12:12:12 결과를 반환함.
     * @param val
     * @param pattern
     * @return
     */
    public static String mask(String val, String pattern) {
        // 필수값 체크
        Util.checkEmpty(val, pattern);

        // masking 처리
        StringBuilder sb = new StringBuilder();
        String[] valArr = val.split("");
        String[] patArr = pattern.split("");
        int patCnt = 0;

        for (int i = 0; i < patArr.length; i++) {
            String pat = patArr[i];

            // 패턴의 길이가 값이 길이보다 크면 종료
            if (i - patCnt >= valArr.length) {
                break;
            }

            // 문자열 구성
            if (StringUtils.equals(pat, "#")) {
                sb.append(valArr[i - patCnt]);
            } else {
                sb.append(pat);
                patCnt++;
            }
        }

        // 리턴
        return sb.toString();
    }

    /**
     * 파일 크기를 문자열로 반환한다.
     *
     * <pre>
     * toStringFileSize(100000L) = 97.7 KB
     * toStringFileSize(1000L) = 1,000 Bytes
     * </pre>
     *
     * @since 2019. 12. 16.
     * @author jhbang
     *
     * @param fileSize 파일 크기
     * @return 사람이 읽기 편하게 변환된 문자열
     */
    public static String toStringFileSize(long fileSize) {
        DecimalFormat df = null;
        double number = fileSize;

        if (1024 * 1024 * 1024 * 1024L < fileSize) {
            df = new DecimalFormat("#,###.0 TB");
            number = number / (1024 * 1024 * 1024 * 1024.0d);
        } else if (1024 * 1024 * 1024L < fileSize) {
            df = new DecimalFormat("#,###.0 GB");
            number = number / (1024 * 1024 * 1024.0d);
        } else if (1024 * 1024L < fileSize) {
            df = new DecimalFormat("#,###.0 MB");
            number = number / (1024 * 1024.0d);
        } else if (1024L < fileSize) {
            df = new DecimalFormat("#,###.0 KB");
            number = number / 1024.0d;
        } else {
            df = new DecimalFormat("#,### Bytes");
        }

        return df.format(number);
    }

    /**
     * URI, parameter 기반으로 mode값을 반환함.
     * @return
     */
    public static String getMode() {
        // request 객체 정보 획득
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();

        // mode값 판단
        String mode = request.getParameter("mode");
        if (StringUtils.isBlank(mode)) {
            // uri기반에서 mode값 추출
            String requestUri = request.getRequestURI();

            if (StringUtils.containsIgnoreCase(requestUri, "FormReg")) {
                mode = Constants.Mode.CREATE;
            }
            if (StringUtils.containsIgnoreCase(requestUri, "FormMod")) {
                mode = Constants.Mode.UPDATE;
            }

            if (StringUtils.containsIgnoreCase(requestUri, "Save")) {
                mode = Constants.Mode.CREATE;
            }
            if (StringUtils.containsIgnoreCase(requestUri, "Update")) {
                mode = Constants.Mode.UPDATE;
            }

            // 그래도 값이 할당되지 않은 경우에는 기본값 설정
            if (StringUtils.isBlank(mode)) {
                mode = Constants.Mode.CREATE;
            }
        }

        return mode;
    }

    /**
     *
     * 패턴으로 마스킹 처리 (문자 표현 : '#')
     * <li> making("abcde", "#*")   -> a****  </li>
     * <li> making("abcde", "*#")   -> ****e </li>
     * <li> making("abcde", "###*") -> abc** </li>
     * <li> making("abcde", "*")    -> ***** </li>
     * <li> making("abcde", "##*#") -> ab**e </li>
     * <li> making("abcde", "#.")   -> a.... </li>
     *
     * @since 2020. 1. 13.
     * @author 김형기
     *
     * @param str
     * @param pattern
     * @return
     */
    public static String masking(String str, String pattern) {
        return Util.masking(str, pattern, false);
    }

    /**
     *
     * 패턴으로 마스킹 처리 (문자 표현 : '#')
     * <li> making("abcde", "#*", false)   -> a****  </li>
     * <li> making("abcde", "*#", false)   -> ****e </li>
     * <li> making("abcde", "###*", false) -> abc** </li>
     * <li> making("abcde", "*", false)    -> ***** </li>
     * <li> making("abcde", "##*#", false) -> ab**e </li>
     * <li> making("abcde", "#.", false)   -> a.... </li>
     *
     * @since 2020. 1. 13.
     * @author 김형기
     *
     * @param str
     * @param pattern
     * @param isEncrypt
     * @return
     */
    public static String masking(String str, String pattern, boolean isEncrypt) {
        // 필수 값 검사
        Util.checkBlank(str, pattern);
        Util.checkMaxLength(String.valueOf(str.length()), pattern);

        // 복호화
        if (isEncrypt) { str = HashUtil.aes256Decrypt(str); }

        // 마스킹
        StringBuilder sb = new StringBuilder();
        int index = 0;
        int strIndex = 0;

        while (index < pattern.length()) {
            if (StringUtils.equals(String.valueOf(pattern.charAt(index)), "#")) {
                sb.append(String.valueOf(str.charAt(strIndex++)));
            } else {
                while (sb.length() <= (str.length() - (pattern.length() - index))) {
                    sb.append(String.valueOf(pattern.charAt(index)));
                    strIndex++;
                }
            }
            index++;
        }

        return sb.toString();
    }


    /**
     * 난수를 발생시킨다. (length: 난수길이)
     * <pre>
     * getRandom(length)
     * </pre>
     *
     * @since 2020. 1. 13.
     * @author 김샛별
     *
     * @param length
     * @return
     */
    public static String getRandom(int length) {
        return Util.getRandom(length, null);
    }

    /**
     * 난수를 발생시킨다. (length: 난수길이, except: 제외할 String 배열)
     * <pre>
     * getRandom(length, except)
     * </pre>
     *
     * @since 2020. 1. 14.
     * @author 김샛별
     *
     * @param length
     * @param except
     * @return
     */
    public static String getRandom(int length, String[] except) {
        StringBuilder builder = new StringBuilder();
        SecureRandom sr = new SecureRandom();
        String str = "";

        int index = 0;
        while (index <= length) {
            int num = sr.nextInt(3);

            if (num == 0) { // A-Z
                str = String.valueOf((char) (sr.nextInt(26) + 97));
            } else if (num == 1) { // a-z
                str = String.valueOf((char) (sr.nextInt(26) + 65));
            } else { // 0-9
                str = String.valueOf(sr.nextInt(10));
            }

            // 제외 문자열 체크
            if (!ArrayUtils.contains(except, str)) {
                builder.append(str);
                index++;
            }
        }

        return builder.toString();
    }

    /**
     * 수정자 정보 변경
     * @param <T>
     * @param target
     * @param source
     * @return
     */
    public static <T extends BaseModel> T convertModInfo(T target, Object source) {

        if (!(source instanceof BaseModel)) {
            throw new BadRequestException(Constants.ExCode.WRONG_TYPE, Constants.ExMsg.WRONG_TYPE);
        }

        try {
            long modSeq = (long) source.getClass().getMethod("getModSeq").invoke(source);
            target.getClass().getMethod("setModSeq", Long.TYPE).invoke(target, modSeq);
        } catch (Exception e) {
            log.info(e.getMessage());
        }

        try {
            String modDt = (String) source.getClass().getMethod("getModDt").invoke(source);
            target.getClass().getMethod("setModDt", String.class).invoke(target, modDt);
        } catch (Exception e) {
            log.info(e.getMessage());
        }

        try {
            String modIp = (String) source.getClass().getMethod("getModIp").invoke(source);
            target.getClass().getMethod("setModIp", String.class).invoke(target, modIp);

        } catch (Exception e) {
            log.info(e.getMessage());
        }

        return target;
    }
}