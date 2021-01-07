package kr.co.crewmate.ojt.model.base;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 
 * <pre>
 *  Package : kr.co.crewmate.core.model.dto 
 *  Name : Result.java
 * </pre>
 *
 * @Author : akam8801
 * @Date : 2019. 12. 4.
 * @Desc : 일반 처리 결과에 대한 정보 모델
 *
 */
public class Result {
    private int resultCode;

    private String message;

    // 추가 정보가 필요한 경우 사용할 목적으로 생성한 멤버임.
    private Map<String, Object> infoMap;

    public int getResultCode() {
        return resultCode;
    }

    public void setResultCode(int resultCode) {
        this.resultCode = resultCode;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Map<String, Object> getInfoMap() {
        return infoMap;
    }

    public void setInfoMap(Map<String, Object> infoMap) {
        this.infoMap = infoMap;
    }

    public Result() {
        this.setResultCode(1);
    }

    public Result(int resultCode) {
        this.setResultCode(resultCode);
    }

    public Result(int resultCode, String message) {
        this.setResultCode(resultCode);
        this.setMessage(message);
    }

    public Result(int resultCode, String message, Object info) {
        this.setResultCode(resultCode);
        this.setMessage(message);
        this.putInfo("info", info);
    }

    public Result(Object info) {
        this.setResultCode(1);

        if (info instanceof List) {
            this.putInfo("list", info);
        } else if (info instanceof BaseModel) {
            this.putInfo("data", info);
        } else {
            this.putInfo("info", info);
        }
    }

    public Result(String msg) {
        this.setResultCode(1);
        this.setMessage(msg);
    }

    public void putInfo(String key, Object obj) {
        if (this.infoMap == null) {
            this.infoMap = new HashMap<>();
        }
        this.infoMap.put(key, obj);
    }

    public Object getInfo(String key) {
        return (this.infoMap != null && this.infoMap.containsKey(key)) ? this.infoMap.get(key) : null;
    }

}
