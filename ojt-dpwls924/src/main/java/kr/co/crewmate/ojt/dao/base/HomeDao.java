package kr.co.crewmate.ojt.dao.base;

import java.util.Collections;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.domain.Page;

import kr.co.crewmate.ojt.model.base.BaseModel;
import kr.co.crewmate.ojt.util.CrewPageImpl;

public class HomeDao {

    protected SqlSessionTemplate sqlSession;

    @Autowired
    protected void setSqlSession(@Qualifier("ojtSqlSessionTemplate") SqlSessionTemplate sqlSession) {
        this.sqlSession = sqlSession;
    }

    protected <T> List<T> selectList(String statement, Object parameter) {
        return this.sqlSession.selectList(statement, parameter);
    }

    protected <T> List<T> selectList(String statement) {
        return this.sqlSession.selectList(statement);
    }

    protected <T> Page<T> selectPageList(String listStatement, String countStatement, Object parameter) {
        // 조건에 맞는 전체 카운트를 조회
        int totalCount = Integer.parseInt(this.selectOne(countStatement, parameter).toString());
        // BaseDto의 page, size값을 가져오기
        BaseModel baseDto = (BaseModel) parameter;

        // 조회 건수가 0인 경우 비어 있는 리스트를 반환
        if (totalCount == 0) {
            return new CrewPageImpl<>(Collections.<T>emptyList(), baseDto.getPage(), baseDto.getListSize(), totalCount);
        }

        // 페이징된 목록을 조회
        List<T> list = this.sqlSession.selectList(listStatement, parameter);
        // Page 생성
        return new CrewPageImpl<>(list, baseDto.getPage(), baseDto.getListSize(), totalCount);
    }

    protected <T> Page<T> selectPageList(String listStatement, Object parameter) {
        return this.selectPageList(listStatement, listStatement + "Count", parameter);
    }

    protected <T> T selectOne(String statement) {
        return this.sqlSession.selectOne(statement);
    }

    protected <T> T selectOne(String statement, Object parameter) {
        return this.sqlSession.selectOne(statement, parameter);
    }

    protected int update(String statement) {
        return this.sqlSession.update(statement);
    }

    protected int update(String statement, Object parameter) {
        return this.sqlSession.update(statement, parameter);
    }

    protected int insert(String statement, Object parameter) {
        return this.sqlSession.insert(statement, parameter);
    }

    protected int delete(String statement, Object parameter) {
        return this.sqlSession.delete(statement, parameter);
    }

}
