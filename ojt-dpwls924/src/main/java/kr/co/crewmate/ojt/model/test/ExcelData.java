package kr.co.crewmate.ojt.model.test;

public class ExcelData {// 엑셀을 업로드하면 html 뷰로보여주기

    private String id;// 고객ID
    private String name;// 고객명
    private int age;// 고객나이
    private String email;// 고객이메일

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
