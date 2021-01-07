package kr.co.crewmate.ojt.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.BaseDao;
import kr.co.crewmate.ojt.model.Addr;
import kr.co.crewmate.ojt.model.Code;
import kr.co.crewmate.ojt.model.UserCodeMap;
import kr.co.crewmate.ojt.model.Users;

@Repository
public class UserDao extends BaseDao {

    public int selectIdCheck(Users user) {
        return super.selectOne("User.selectIdCheck", user);
    }

    public int selectJoinYnCheck(Users user) {
        return super.selectOne("User.selectJoinYnCheck", user);
    }

    public int selectUserNo() {
        return super.selectOne("User.selectUserNo");
    }

    public void insertUser(Users user) {
        super.insert("User.insertUser", user);
        
    }

    public void insertAddr(Addr addr) {
        super.insert("User.insertAddr", addr);
        
    }

    public void insertUserCodeMap(UserCodeMap code) {
       super.insert("User.insertUserCodeMap", code); 
    }

    public List<Code> selectUserCodeMapFromCode(Code codes) {
        return super.selectList("User.selectCodeMapFromCode", codes);
    }

    public List<Addr> selectAddr() {
        return super.selectList("User.selectAddr");
    }

}
