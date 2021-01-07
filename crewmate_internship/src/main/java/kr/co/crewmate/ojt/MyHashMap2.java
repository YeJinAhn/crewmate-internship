package kr.co.crewmate.ojt;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class MyHashMap2<K, V> implements Map<K, V> {

    @SuppressWarnings("unchecked")
    private Node<K, V>[] table = new Node[16];

    private int size;

    static class Node<K, V> {
        int hash;
        K key;
        V value;
        Node<K, V> next;

        Node(int hash, K key, V value, Node<K, V> next) {
            this.hash = hash;
            this.key = key;
            this.value = value;
            this.next = next;
        }
    }

    private int hash(Object key) {
        return (key == null) ? 0 : (key.hashCode() % 16);
    }

    @SuppressWarnings("unchecked")
    private void extendTable() {
        Node<K, V>[] temp = table;
        table = new Node[table.length * 2];

        for (Node<K, V> node : temp) {
            while (node != null) {
                put(node.key, node.value);
                node = node.next;
            }
        }

    }

    @Override
    public V put(K key, V value) {// key와 value 삽입하는 메소드
        if ((double) size / table.length > 0.7) {
            extendTable();
        }

        int hash = hash(key);
        Node<K, V> node = table[hash];
        Node<K, V> newNode = new Node<K, V>(hash, key, value, null);
        if (node == null) {
            table[hash] = newNode;
        } else {
            while (true) {
                if (node.key == key || node != null && node.key.equals(key)) {
                    // 왜 node가 null이 아닐떄도 조건문에 넣어야 할까?
                    // -> 첫번째 if문이 아니라 두번쨰 if문을 타게 되면
                    // null이 들어왔을 때 에러가 발생하므로 두번째 if문에 두가지 조건다 적어줘야한다.
                    V oldValue = value;
                    value = node.value;
                    node.value = oldValue;
                    // map.put("A","B");
                    return oldValue;// system.out.println(map.put("A","C"));
                                    // 한다고 가정했을떄, 결과값은 B가 나와줘야 하기때문에
                }
                if (node.next == null) {
                    break;// node의 다음이 없으면 더이상 넣을 값이 없는 거니깐 break;!!
                }
                node.next = node;
            }
            node.next = newNode;
        }
        size++;
        return null;
    }
//    int hash = hash(key);
//    Node<K, V> node = table[hash];
//    Node<K, V> newNode = new Node<K, V>(hash, key, value, null);
//    if (node == null) {
//        table[hash] = newNode;
//    } else {
//        while (true) {
//            if (node.key == key || (key != null && key.equals(node.key))) {
//                // if (node.hash == hash && (node.key == key || node.key.equals(key))) {
//                V oldValue = node.value;
//                node.value = value;
//                return oldValue;
//            }
//            if (node.next == null) {
//                break;
//            }
//            node.next = node; // 만약 두개의 다른 객체가 같은 hashcode를 가진다면 충돌이 일어나기 때문에 
//                              // 이를 방지하기 위해 next 속성을 가진다.
//                              // 같은 hashcode를 가지는 객체들은 서로 옆에 위치한다.
//                              // 충돌이 나면 next 속성의 값을 체크하고 만약 null이면 그 위치에 Entry객체를 넣고,
//                              // null이 아니면 next 객체의 next를 다시 불러 null일때까지 확인하고 객체를 저장한다.
//        }
//        node.next = newNode;
//    }
//    size++;
//    return null;

    // 하나의 Map을 또 다른 Map에 추가
    @Override
    public void putAll(Map<? extends K, ? extends V> map) {
        Iterator<? extends K> iter = map.keySet().iterator();
        while (iter.hasNext()) {
            K key = iter.next();
            put(key, map.get(key));
        }
    }

    @Override
    public V remove(Object key) {// key를 입력하여 데이터 삭제
        int hash = hash(key);
        V result = null;
        if(table[hash] !=null) {
            Node<K,V> node = table[hash];
            Node<K,V> prevNode = null;
            
            while(node!=null) {
                if(node.key==key || node!=null && node.key.equals(key)) {
                    if(prevNode == null) {
                        table[hash] = node.next;
                    }else if(node.next == null) {
                        prevNode.next = null;
                    }
                }
            }
        }
        return null;
    }

    @Override
    public V get(Object key) {// key값에 대한 엘리먼트를 가져옴
        int hash = hash(key);
        V result = null;
        if (size == 0) {
            return null;
        }
        for (Node<K, V> node = table[hash]; node != null; node = node.next) {
            if (node.key == key || node != null && node.key.equals(key)) {
                result = node.value;
            }
        }
        return result;
    }

    @Override
    public void clear() {
        if (table != null && size > 0) {
            size = 0;
            for (int i = 0; i < table.length; i++) {
                table[i] = null;
            }
        }
    }

    // map의 엘리먼트 중 key를 포함하는지 여부
    @Override
    public boolean containsKey(Object key) {
        int hash = hash(key);
        for (Node<K, V> node = table[hash]; node != null; node = node.next) {
            // key!=null을 적어줘야 하는 이유: 두번째 if를 탈수도 있기 때문에 두번째 if를 탔을 때, null을 찾으면 에러가 발생한다.
            if (node.key == key || (key != null && key.equals(node.key))) {
                // if (node.hash == hash && (node.key == key || node.key.equals(key))) {
                return true;
            }
        }
        return false;
//        int hash = hash(key);
//        for (Node<K, V> node = table[hash]; node != null; node = node.next) {
//            if (node.key == key) {
//                return true;
//            } else {
//                if (key != null && key.equals(node.key)) {
//                    return true;
//                }
//            }
//        }
//        return false;
    }

    @Override
    public boolean containsValue(Object value) {// map의 엘리먼트 중 value를 포함하는지 여부
        Object allValue = null;
        for (int i = 0; i < table.length; i++) {
            for (Node<K, V> node = table[i]; node != null; node = node.next) {
                allValue = node.value;
                if (allValue == value || value != null && value.equals(allValue)) {

                    return true;
                }
            }
        }
        return false;
    }

    @Override // X
    public Set<Entry<K, V>> entrySet() {// key,value값을 (엔트리)합친 형태로 set에 저장하여 반환
        Set<Entry<K, V>> result = new HashSet<>();
        for (int i = 0; i < table.length; i++) {
            for (Node<K, V> node = table[i]; node != null; node = node.next) {
                if (node != null) {
                    Entry<K, V> entry = new AbstractMap.SimpleEntry<K, V>(node.key, node.value);
                    result.add(entry);
                }
            }
        }
        return result;
    }

    @Override
    public boolean isEmpty() {// 엘리먼트의 유무 체크
        return size == 0;
    }

    @Override
    public Set<K> keySet() {// key의 값만 필요한 경우
        Set<K> result = new HashSet<>();
        for (int i = 0; i < table.length; i++) {
            for (Node<K, V> node = table[i]; node != null; node = node.next) {
                if (node != null) {
                    result.add(node.key);
                }
            }
        }
        return result;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public Collection<V> values() {// 저장된 엘리먼트들을 전부 컬렉션 형태로 출력[]
        Collection<V> result = new ArrayList<V>();
        for (int i = 0; i < table.length; i++) {
            for (Node<K, V> node = table[i]; node != null; node = node.next) {
                if (node != null) {
                    result.add(node.value);
                }
            }
        }
        return result;
    }

}
