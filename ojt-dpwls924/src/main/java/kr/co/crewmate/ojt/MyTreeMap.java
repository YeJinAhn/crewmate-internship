package kr.co.crewmate.ojt;

import java.util.Collection;
import java.util.Deque;
import java.util.LinkedHashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;

public class MyTreeMap<K, V> implements Map<K, V> {

    private Node<K, V> root;
    private int size = 0;

    static final class Node<K, V> {
        K key;
        V value;
        Node<K, V> left;
        Node<K, V> right;
        Node<K, V> parent;

        public Node(K key, V value) {
            super();
            this.key = key;
            this.value = value;
        }

        public Node(K key, V value, Node<K, V> left, Node<K, V> right, Node<K, V> parent) {
            super();
            this.key = key;
            this.value = value;
            this.left = left;
            this.right = right;
            this.parent = parent;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
    }

    private Node<K, V> findNode(Object target) {// containsKey, get
        if (target == null) {
            throw new IllegalArgumentException();
        }
        @SuppressWarnings("unchecked")
        Comparable<? super K> k = (Comparable<? super K>) target;

        Node<K, V> node = root;
        while (root != null) {
            int compare = k.compareTo(node.key);
            if (compare < 0) {
                node = node.left;
            } else if (compare > 0) {
                node = node.right;
            } else {
                return node;
            }
        }
        return null;
    }

    @Override
    public void clear() {
        size = 0;
        root = null;
    }

    @Override
    public boolean containsKey(Object key) {
        return findNode(key) != null;
    }

    @Override
    public boolean containsValue(Object value) {
        return containsValueHelper(root, value);
    }

    private boolean containsValueHelper(Node<K, V> node, Object value) {
        if (node == null) {
            return false;
        }
        if ((node.value == null && value == null) || node.value.equals(value)) {
            return true;
        }
        if (containsValueHelper(node.left, value)) {
            return true;
        }
        if (containsValueHelper(node.right, value)) {
            return true;
        }
        return false;
    }

//    private boolean equals(Object node, V value) {// containsValue
//        if (node == null) {
//            return value == null;
//        }
//        return node.equals(value);
//    }

    @Override // X
    public Set<Entry<K, V>> entrySet() {
//        Set<Entry<K,V>> set = new LinkedHashSet<Entry<K,V>>();
//        inorder2(root, set);
        return null;
    }

//    private void inorder2(Node<K, V> root, Set<Entry<K, V>> set) {
//        if(root !=null) {
//            inorder2(root.left, set);
//            set.add(set);
//        }
//        
//    }

    @Override
    public V get(Object key) {
        Node<K, V> node = findNode(key);
        return node == null ? null : node.value;
    }

    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    @Override
    public Set<K> keySet() {//맵에 Key정보 담은 Set생성 / key값 기준으로 오름차순 정렬
        Set<K> set = new LinkedHashSet<K>();// 순서유지
        inorder(root, set);
        return set;
    }

    private void inorder(Node<K, V> root, Set<K> set) {// keySet 짝꿍
        if (root != null) {
            inorder(root.left, set);// 왼쪽 하위 트리 순서대로 순회
            set.add(root.key);// node.key 추가
            inorder(root.right, set);// 오른쪽 하위 트리 순서대로 순회
        }
    }

    @Override
    public V put(K key, V value) {
        Node<K, V> newNode = root;
        Node<K, V> parent;
        int compare;
        if (key == null) {
            throw new NullPointerException();
        }
        if (root == null) {// root가 없으면 0인상태이므로 넣은node가 처음
            root = new Node<K, V>(key, value, null, null, null);
            size++;
            return null;
        }
        @SuppressWarnings("unchecked")
        Comparable<? super K> k = (Comparable<? super K>) key;// 값 비교
        do {
            parent = newNode;// root -> parent
            compare = k.compareTo(newNode.key);//들어온 키랑 있는 키랑 비교
            if (compare > 0) {// 양수니깐 오른쪽에
                newNode = newNode.right;
            } else if (compare < 0) {// 음수니깐 왼쪽에
                newNode = newNode.left;
            } else {
                newNode.value = value;
                return null;
            }
        } while (newNode != null);
        Node<K, V> node = new Node<K, V>(key, value, null, null, parent);
        if (compare > 0) {
            parent.right = node;
        } else {
            parent.left = node;
        }
        size++;
        return null;
    }

    @Override
    public void putAll(Map<? extends K, ? extends V> map) {
        for (Entry<? extends K, ? extends V> entry : map.entrySet()) {
            put(entry.getKey(), entry.getValue());
        }

    }

    @SuppressWarnings("unchecked")
    @Override
    public V remove(Object key) {
        return (V) checkRemove(root, key);
    }

    @SuppressWarnings("unchecked")
    public Node<K, V> checkRemove(Node<K, V> node, Object key) {
        Node<K, V> parentNode = new Node<K, V>(null, null);
        if (root == null) {
            return null;
        }
        if (node.key.equals(key)) {
            // 양쪽 자식 없을경우
            if (node.left == null && node.right == null) {
                size--;
                if (node.equals(root)) {// 루트와 삭제하려는(입력한) node가 같으면,
                    root = null; // 루트를 삭제한다.
                }
                return null;
                // 오른쪽 자식만 있을 경우
            } else if (node.right != null && node.left == null) {
                size--;
                if (node.equals(root)) {
                    root = node.right;
                }
                return node.right;
                // 왼쪽 자식만 있을 경우
            } else if (node.left != null && node.right == null) {
                size--;
                if (node.equals(root)) {
                    root = node.left;
                }
                return node.left;
                // 양쪽 둘 다 자식 있을 경우
            } else {
                if (node.right != null) {
                    parentNode = node.right;
                } else if (node.left != null) {
                    parentNode = node.left;
                }
                node.key = parentNode.key;
                node.value = parentNode.value;
                node.left = checkRemove(node.left, parentNode.key);
                node.right = checkRemove(node.right, parentNode.key);
            }
        }
        if (node.left != null) {//?
            if (((Comparable<? super K>) key).compareTo((K) node.key) <= 0) {
                node.left = checkRemove(node.left, key);
                return node;
            }
        }
        if (node.right != null) {
            node.right = checkRemove(node.right, key);
        }

        return node;
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public Collection<V> values() {// 저장된 모든 객체를 Collection 타입으로 반환
        Set<V> set = new LinkedHashSet<>();
        getValues(root, set);
        return set;
    }

    private void getValues(Node<K, V> root, Set<V> set) {
        if (root != null) {
            getValues(root.left, set);
            set.add(root.value);
            getValues(root.right, set);
        }
    }
}

//    private Set<V> getValues() {// values짝꿍
//        Set<V> set = new LinkedHashSet<>();
//
//        Deque<Node<K, V>> stack = new LinkedList<>();
//        stack.push(root);
//        while (!stack.isEmpty()) {
//            Node<K, V> node = stack.pop();
//            if (node == null) {
//                continue;
//            }
//            set.add(node.value);
//            stack.push(node.left);
//            stack.push(node.right);
//        }
//        return set;
//    }
