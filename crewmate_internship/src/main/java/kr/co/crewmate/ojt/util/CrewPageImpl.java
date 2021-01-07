package kr.co.crewmate.ojt.util;

import java.util.List;

import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

/**
 * 
 * 클래스명: <code>CrewPageImpl</code><br/><br/>
 *
 * 기존 PageImpl<T>을 사용할 경우에 현재 페이지를 나타내는 getNumber()가 0부터 시작함
 * getNumber()을 1부터 맞춰주기 위해 최소한으로 오버라이드함
 *
 * @since 2019. 12. 12.
 * @author kjh8877
 *
 * @param <T>
 */
public class CrewPageImpl<T> extends PageImpl<T> {
    private static final long serialVersionUID = -6564241316855223930L;

    public CrewPageImpl(List<T> content, Pageable pageable, long total) {
        super(content, pageable, total);
    }

    public CrewPageImpl(List<T> content, int page, int listSize, long total) {
        super(content, PageRequest.of(page - 1, listSize), total);
    }

    @Override
    public boolean hasNext() {
        return getNumber() < getTotalPages();
    }

    @Override
    public int getNumber() {
        return super.getNumber() + 1;
    }
}
