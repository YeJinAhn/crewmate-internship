package kr.co.crewmate.ojt.constants;

public class Constants {

    private static final String PRIVATE_MSG = "Constants class";


    private Constants() {
        throw new IllegalStateException(PRIVATE_MSG);
    }




    /** 여부 */
    public static final String Y = "Y";
    public static final String N = "N";

    /**
     * 에러메세지 키 - JSON으로 피드백을 하는 경우
     */
    public static final String ERROR_MSG_KEY = "errorMsg";



    /**
     * 공통 exception code 정의
     * @author 김기석
     *
     */
    public static final class ExCode {
        private ExCode() { throw new IllegalStateException(PRIVATE_MSG); }
        public static final int ZERO            = 8010;     // 값이 0인 경우
        public static final int NULL            = 8020;     // 값이 null인 경우
        public static final int BLANK           = 8030;     // 값이 비어 있는 경우
        public static final int LIMIT_LIST_SIZE = 8040;     // 목록개수의 크기가 너무 큰 경우
        public static final int ZERO_MINUS      = 8050;     // 값이 0이하인 경우
        public static final int MINUS           = 8060;     // 값이 마이너스인 경우
        public static final int DATA_EMPTY      = 8070;     // 데이터 결과값이 없는 경우
        public static final int INVALID_MODE    = 8080;     // mode값이 잘못된 경우
        public static final int EMPTY           = 8090;     // 값이 비어 있는 경우
        public static final int ACCESS          = 8100;     // 관리자 권한이 없는경우
        public static final int MAX_LENGTH      = 8110;     // 값의 길이가 지정된 길이보다 큰 경우
        public static final int NOT_YN          = 8120;     // 값이 'Y'또는 'N' 이 아닌경우
        public static final int NOT_NUMBER      = 8130;     // 값이 숫자가 아닌경우
        public static final int WRONG_TYPE      = 8140;     // 잘못된 타입인경우
        public static final int INVALID_VALUE   = 8150;     // 잘못된 값인 경우
    }


    /**
     * 공통 exception code 정의
     * @author 김기석
     *
     */
    public static final class ExMsg {
        private ExMsg() { throw new IllegalStateException(PRIVATE_MSG); }
        public static final String ZERO             = "required value is zero! idx : ";
        public static final String NULL             = "required value is null! idx : ";
        public static final String BLANK            = "required value is blank! idx : ";
        public static final String LIMIT_LIST_SIZE  = "list size limit";
        public static final String ZERO_MINUS       = "required value is zero or minus! idx : ";
        public static final String MINUS            = "required value is minus! idx : ";
        public static final String DATA_EMPTY       = "data empty";
        public static final String INVALID_MODE     = "invalid mode";
        public static final String EMPTY            = "required value is empty! idx : ";
        public static final String LOGIN            = "admin login required! ";
        public static final String ACCESS           = "access refuse! ";
        public static final String MAX_LENGTH       = "must be less than specific length. (idx/length) : ";
        public static final String NOT_YN           = "required value is not 'Y' or 'N'. idx : ";
        public static final String NOT_NUMBER       = "required value is not a Number. idx : ";
        public static final String NOT_DATE_FORMAT  = "required value is not a Date Format. idx : ";
        public static final String WRONG_TYPE       = "wrong type !";
    }

    /**
     * BO Form 화면에서의 mode 정의
     * @author 김도희
     *
     */
    public static final class Mode {
        private Mode() { throw new IllegalStateException(PRIVATE_MSG); }

        public static final String CREATE = "create";
        public static final String UPDATE = "update";
    }

    /**
     * 생성할 파일 유형
     * @author kjh8877
     */
    public static final class CreateFileType {
        private CreateFileType() {
            throw new IllegalStateException(PRIVATE_MSG);
        }

        public static final String IMAGE    = "image";
        public static final String REAL     = "real";
    }
}
