package kr.co.crewmate.ojt;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class Test {
    public void hashMapTest() {
        Map<String, Integer> map = new MyHashMap<>();
        map.put("강남", 1);
        map.put("동대문", 5);
        map.put("명동", 2);
        map.put("영등포", 4);
        map.remove("동대문");
        // map.clear();
        MyHashMap<String, Integer> map2 = new MyHashMap<String, Integer>();
        map2.put("논현", 2);
        map2.put("중구", 7);
        map.putAll(map2);
        // System.out.println(map.size());
        // System.out.println(map.get("명동"));
        // System.out.println(map.isEmpty());
        // System.out.println(map.containsKey(null));
        // System.out.println(map.containsValue(6));
        // System.out.println(map.containsValue(4));
        // System.out.println(map.values());
        // System.out.println(map.get("동대문"));
        // System.out.println(map.values());
        // System.out.println("keySet():" + map.keySet());
        // System.out.println(map.toString());
        // for(Map.Entry<String, Integer> entry : map.entrySet()) {
        // System.out.println(entry.getKey() + entry.getValue());
        // }
    }

    public void treeMapValuesTest() {
        Map<Integer, Object> map = new TreeMap<>();
        Map<Integer, Object> map2020 = new MyTreeMap<>();
        map.put(50, "50");
        map.put(60, "60");
        map.put(25, "25");
        map.put(30, "30");
        map.put(35, "35");
        map.put(34, "34");
        map2020.put(50, "50");
        map2020.put(60, "60");
        map2020.put(25, "25");
        map2020.put(30, "30");
        map2020.put(35, "35");
        map2020.put(34, "34");
        Map<Integer, Object> hm = new HashMap<Integer, Object>();
        for (int i = 1; i < 5; i++) {
            int act = i * ((i % 2 == 0) ? 1 : -1) * 100;
            hm.put(act, String.valueOf(act));
        }
        map.putAll(hm);
        System.out.println("map test_F");
        System.out.println("key  ->  " + map.keySet());
        System.out.println("value -> " + map.values());
        System.out.println("map2020 test_F");
        map2020.putAll(hm);
        System.out.println("key  ->  " + map2020.keySet());
        System.out.println("value -> " + map2020.values());
    }

    public void treeMapTest() {
        Map<Integer, Integer> map = new MyTreeMap<Integer, Integer>();
        map.put(10, 1);
        map.put(1, 2);
        map.put(20, 3);
        map.put(35, null);
        map.put(34, 5);
        map.put(26, 7);
        map.put(2, 9);
        map.put(3, null);
        // map.clear();
        Map<Integer, Integer> map2 = new TreeMap<Integer, Integer>();
        map2.put(1, 2);
        map2.put(2, 3);
//        System.out.println(map.isEmpty());
//        System.out.println(map.containsKey(2));
//        System.out.println(map.containsValue("3"));
//        System.out.println(map.containsValue(null));
//        System.out.println(map.get(3));
        // map.remove(4);
        map.remove(2);
        map.remove(34);
        map.remove(35);
        map.remove(10);
        map.remove(26);
        map.remove(20);
//        map.remove(5);
//       map.remove(5);
        map.remove(3);
        map.remove(1);
//       map.remove(2);
//        map.remove(2);
//        map.remove(2);
//        map.remove(7);
//        map.remove(3);
//        map.remove(null);
        System.out.println(map.get(26));
        System.out.println(map.size());
//         System.out.println(map.keySet());
//         System.out.println(map.values());

    }

    public void hashMap2Test() {
        Map<String, String> map2 = new MyHashMap<>();

        map2.put("A", "B");
        System.out.println(map2.put("A", "C"));
        // System.out.println(map2.get("A"));

        Map<String, Integer> map = new MyHashMap<>();
        map.put("A", 1);
        map.put("A", 2);
        System.out.println(map.get("A"));

        Map<Integer, String> map3 = new MyHashMap<>();
        // map3.put("A", "A");
        // map3.put("Q", "Q");
        // System.out.println(map3.get("Q"));
        map3.put(1, "A");
        map3.put(17, "B");
        map3.put(null, "C");
        System.out.println(map3.get(null));

        Map<Integer, String> map4 = new MyHashMap<>();
        map4.put(null, "A");
        // map4.put(null, "5");
        map4.put(0, "B");
        // System.out.println(map4.get(null));
        System.out.println(map4.containsKey(null));

    }

    public void lastIndexOfTest() {
        List<Object> list = new MyLinkedList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        // System.out.println(list.lastIndexOf(3));
        System.out.println(list.indexOf(3));
    }

    public void containsTest() {
        List<Object> list = new MyLinkedList<>();
        list.add(1);
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        System.out.println(list.contains(5));
    }

    public void addTest() {
        List<Object> list = new ArrayList<>();
        // List<Object> list = new MyLinkedList<>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(4);
        // list.set(0, 3);
        List<Object> list2 = new ArrayList<>();
        list2.add(5);
        list2.add(6);
        list2.add(7);
        // list.addAll(2,list2);
        // list.clear();
        // System.out.println(list.containsAll(list2));
        System.out.println(list.toString());
        // System.out.println(list.get(2));
        // System.out.println(list.get(0));
        // System.out.println(list.subList(5, 2));
        // list.retainAll(list2);
        // System.out.println(list.addAll(list2));
    }

    public void removeTest() {
        // Map<String, Integer> map = new TreeMap<>();
        // List<Object> list = new MyLinkedList<Object>();
        List<Object> list = new MyArrayList<Object>();
        list.add(3);
        list.add(2);
        list.add(1);
        list.add(4);
        list.add(5);
        list.add(null);
        // list.remove(null);
        // list.clear();
        List<Object> list2 = new MyLinkedList<Object>();
        list2.add(1);
        list2.add(2);
        // System.out.println(list.size());
        // System.out.println(list.removeAll(list2));
        // System.out.println(list.size());
        // list.remove(1);
        // System.out.println(list.remove(2));
        // System.out.println(list.size());
        // System.out.println(list.get(3));
        // System.out.println(list.contains(null));
        // System.out.println(list.remove(null));
        // System.out.println(list.remove(5));

    }

    public void retainAllTest() {
        List<Object> list = new ArrayList<>();
        list.add(2);
        list.add(4);
        list.add(6);
        list.add(null);

        List<Object> list2 = new ArrayList<>();
        list2.add(5);
        list2.add(9);
        list2.add(3);
        list2.add(8);
        list2.add(null);

        boolean result = list.retainAll(list2);
        System.out.println(result);
        System.out.println(list.toString());
    }

    public void removeAllTest() {
        List<Object> list = new MyArrayList<Object>();
        list.add(1);
        list.add(2);
        list.add(3);
        list.add(3);

        List<Object> list2 = new MyArrayList<Object>();
        list2.add(3);
        list2.add(4);
        // System.out.println(list.remove(1));// 인덱스를 가지고 그 방에 위치한 값을 꺼낸다.
        list.removeAll(list2);
        System.out.println(list.removeAll(list2));
        // System.out.println(list.toString());
    }

    public void listIteratorTest() {
        List<Object> list = new LinkedList<Object>();
        list.add(1);
        list.add(2);
        list.add(3);
        // iterator 메소드를 호출하여 Iterator 객체 얻기
        Iterator<Object> iterator = list.iterator();

        while (iterator.hasNext()) {
            Object obj = iterator.next();
            System.out.println(obj);
        }
    }

    public void iteratorTest() {
        List<Object> list = new MyArrayList<>();
        list.add("A");
        list.add(0, "0");
        list.add(list.size(), "a1");
        list.add(list.size(), "a2");
        list.add(list.size(), "a3");
        list.add(list.size(), "a4");
        list.add(list.size(), "a5");
        list.add(list.size(), "a6");
        list.add(1, "a00");
        System.out.println(Arrays.toString(list.toArray()));
        for (Object o : list) {
            System.out.println(o);
        }
    }

    public static void main(String[] args) {
        // List<String> list = new MyLinkedList<>();
        // list.add("A");
        // System.out.println(list.contains(new String("A")));
//        for(int i =1, j=5; i<=3; i++, j--) {
//            System.out.println("i : "+ i+  "j : "+j);
//        }
        Test text = new Test();
        text.treeMapTest();
        // text.iteratorTest();
        // text.hashMap2Test();
        // text.hashMapTest();
        // text.lastIndexOfTest();
        // text.containsTest();
        // text.removeTest();
        // text.addTest();
        // text.retainAllTest();
        // text.removeAllTest();
        // text.listIteratorTest();

        // System.out.println("Hello World");

        // new Exam1().Exam1();
        // new Exam2().Exam2();
        // new Exam3().Exam3();
        // new Exam4().Exam4();
        // new Exam5().Exam5();

        // List<String> list = new ArrayList<>();

        // List<Object> list = new ArrayList<>();

        // System.out.println(list.size());

//        list.add("2");
//        list.add("4");
//        list.indexOf(null);
//        list.contains(null);
//		list.add("3");
//		list.add("4");
//		list.add("5");
//        System.out.println(list.listIterator());

        // System.out.println("사이즈는?" + list.size());

        // List<Object> list1 = new ArrayList<>();
        // list1.add("6");
        // list1.add("3");
//		list1.add("10");
//		list1.add("6");
//		list1.add("7");

//		System.out.println("이건 뭐야??" + list1.toString());
//		
//		list.addAll(list1);
//		System.out.println("넌 누구야" + list.toString());
//		
//		
//        List<Object> list2 = new MyArrayList<>();
//        list2.add("4");
//        list2.add("2");
//		list2.add("3");
//		list2.add("5");
//		list2.add("6");
//		
//		System.out.println("1321   "+ list.subList(1, 4));
//		
//		System.out.println("5번째" + list.indexOf("first") );
//		list.toArray();
//		System.out.println("6번째" + list.toString() );

//		System.out.println("2번째" + list.contains("3"));
//        System.out.println("7번째" + list.containsAll(list1));
//		System.out.println("10번째" + list.lastIndexOf("3"));
//		
//		list.removeAll(list1);
//		System.out.println(list.removeAll(list1));
//		System.out.println("list.removeAll(list1)" + list1.toString());
//		System.out.println(list2.size());
//		list.retainAll(list2);
        // System.out.println("list.retainAll" + list.toString());

//		boolean result = list.contains("3");
//		System.out.println(result);

//		boolean result1 = list.retainAll(list2);
//		System.out.println(result1);

//		list.clear();
//		System.out.println("clear" + list);

        // Object[] item = new Object[10];
        // List<Object> list2 = new MyArrayList<>();
        // list.add("111");
        // list.add(null);
        // item = list2.toArray();

        // System.out.println(Arrays.toString(item));

        // System.out.println(list.removeAll(list1));
//        boolean result = list.removeAll(list2);
//       System.out.println(result);

//        System.out.println(list.indexOf(null));
//        System.out.println(list.contains(null));
//        System.out.println(list.subList(0, 2));
//          System.out.println("|\\_/|");
//          System.out.println("|q p|   /}");
//          System.out.println("( 0 )\"\"\" \\");
//          System.out.println("|\"^\"`     |");
//          System.out.println("| |_/=\\\\__|");
//        System.out.println("\\     /\\");
//        System.out.println(" )   ( ')");
//        System.out.println("(   /  )");
//        System.out.println(" \\ (__)|");
//        Scanner sc = new Scanner(System.in);
//        int num1 = sc.nextInt();
//        int num2 = sc.nextInt();
//        int num3 = sc.nextInt();
//        System.out.println((num1+num2)%num3);
//        System.out.println((num1%num3)+(num2%num3)%num3);
//        System.out.println((num1*num2)%num3);
//        System.out.println((num1%num3)*(num2%num3)%num3);
//        int A = sc.nextInt();
//        int B = sc.nextInt();
//        if (A > B) {
//            System.out.println(">");
//        } else if (A < B) {
//            System.out.println("<");
//        } else if (A == B) {
//            System.out.println("==");
//        }
//         String str = "Information!";
//         int n = str.length();// 12를 n에다 넣음
//         char[] st = new char[n];// 배열에 한글자씩 집어넣는 st생성
//         n--;// 배열의 자리는 0부터 시작이므로 하나 뺴고 시작
//         for(int k =n; k>=0; k--) {
//             st[n-k]= str.charAt(k); // str.charAt =>문자열에서 문자를 뽑는 함수
//             //System.out.println(st);
//             System.out.println(str.charAt(k));
//             System.out.println(st[n-k]);
//         }
//         for(char k : st) {
//             System.out.printf("%c",k);
//         }
    }
}
