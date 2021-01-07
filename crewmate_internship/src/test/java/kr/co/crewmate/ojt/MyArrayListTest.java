package kr.co.crewmate.ojt;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

public class MyArrayListTest {

    @Test
    public void testAdd() {
        MyArrayList<String> list = new MyArrayList<>();
        list.add("A");
        assertEquals(1, list.size());
    }
}
