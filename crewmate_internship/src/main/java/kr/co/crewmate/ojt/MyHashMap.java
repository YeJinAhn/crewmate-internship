package kr.co.crewmate.ojt;

import java.util.AbstractMap;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class MyHashMap<K, V> implements Map<K, V> {

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
                if (node.key == key || (key != null && key.equals(node.key))) {
                    // if (node.hash == hash && (node.key == key || node.key.equals(key))) {
                    V oldValue = node.value;
                    node.value = value;
                    return oldValue;
                }
                if (node.next == null) {
                    break;
                }
                node.next = node; // 만약 두개의 다른 객체가 같은 hashcode를 가진다면 충돌이 일어나기 때문에
                                  // 이를 방지하기 위해 next 속성을 가진다.
                                  // 같은 hashcode를 가지는 객체들은 서로 옆에 위치한다.
                                  // 충돌이 나면 next 속성의 값을 체크하고 만약 null이면 그 위치에 Entry객체를 넣고,
                                  // null이 아니면 next 객체의 next를 다시 불러 null일때까지 확인하고 객체를 저장한다.
            }
            node.next = newNode;
        }
        size++;
        return null;
    }

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
        if (table[hash] != null) {
            Node<K, V> node = table[hash];
            Node<K, V> prevNode = null;
            while (node != null) {
                if (node.key == key || (key != null && key.equals(node.key))) {
                    // if (node.hash == hash && (node.key == key || node.key.equals(key))) {
                    if (prevNode == null) {// 이전노드가 null이면
                        table[hash] = node.next;// 지금 노드 다음이 table에 담긴다.
                    } else if (node.next == null) {// 노드 다음이 널이면
                        prevNode.next = null;// 이전노드 다음은 널이다.
                    } else {
                        prevNode.next = node.next;
                    }
                    size--;
                    return result = node.value;
                }
                prevNode = node;
                node = node.next;
            }
        }
        return result;
    }

    @Override
    public V get(Object key) {// key값에 대한 엘리먼트를 가져옴
        int hash = hash(key);
        V result = null;
        if (size == 0) {
            return null;
        }
        for (Node<K, V> node = table[hash]; node != null; node = node.next) {
            if (node.key == key || (key != null && key.equals(node.key))) {
                // 1.key와 입력하려는 key가 동일한 객체인가?(null이 key일때는 주소값으로 비교해야되니깐
                // 2.key가 null이아닌가
                // 3.key값이 입력하는 key값과 동일한가
                // if (node.hash == hash && (node.key == key || node.key.equals(key))) {
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
       // Object allValue = null;
        for (int i = 0; i < table.length; i++) {
            for (Node<K, V> node = table[i]; node != null; node = node.next) {
                value= node.value;
                if (node.value == value || value != null && value.equals(node.value)) {

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
                    result.add(node.key);
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
                // if (node != null) { //이미 for문에서 node!=null이 조건식으로 있기때문에 필요X
                result.add(node.value);
            }
        }
        return result;
    }

}
//do {
//    parent = node.parent;
//    cmp = comp.compareTo(node.key);
//    System.out.println(node.key + "/" + cmp);
//    if (cmp > 0) {
//        node = node.right;
//    } else if (cmp < 0) {
//        node = node.left;
//    } else {
//        if (node.right != null && node.left != null) { // 삭제 노드의 자식이 양쪽 모두 있을 경우
//            Node<K, V> lastNode = getLast(node);
//            if (cmpResult > 0)
//                parent.right = lastNode;
//            else
//                parent.left = lastNode;
//            lastNode.left = node.left; // 새롭게 열결된 lastNode는 node와 연결되어있던 left, right와 연결해준다.
//            if (!lastNode.equals(node.right))
//                lastNode.right = node.right;
//        } else if (node.right != null) { // 삭제 노드의 자식이 오른쪽만 있을 경우
//            if (cmpResult > 0)
//                parent.right = node.right;
//            else
//                parent.left = node.right;
//        } else if (node.left != null) { // 삭제 노드의 자식이 왼쪽만 있을 경우
//            if (cmpResult > 0)
//                parent.right = node.left;
//            else
//                parent.left = node.left;
//        } else {
//            if (cmpResult > 0)
//                parent.right = null;
//            else
//                parent.left = null;
//        }
//        node = null;
//        size--;
//        break;
//    }
//    cmpResult = cmp;
//} while (node != null);
//return null;
//}
//
