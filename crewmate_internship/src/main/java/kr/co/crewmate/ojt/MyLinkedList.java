package kr.co.crewmate.ojt;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.NoSuchElementException;

public class MyLinkedList<T> implements List<T> {
    private Node<T> head;// 첫번째 노드
    private Node<T> tail;// 마지막 노드
    private int size = 0;// 노드의 크기

    private static class Node<T> {// 데이터가 저장될 필드
        T item;
        Node<T> next;
        Node<T> prev;

        Node(Node<T> prev, T element, Node<T> next) {
            this.item = element;
            this.next = next;
            this.prev = prev;
        }
    }

    @Override
    public int size() {
        return size;
    }

    @Override
    public boolean isEmpty() {
        if (size == 0) {
            return true;
        }
        return false;
    }

    @Override
    public boolean contains(Object o) {// o를 포함하고 있으면 true / 아니면, false

//            Node<T> node =head;
//            if(o!=null) {
//                for(int i =0; i<size; i++) {
//                    if(o.equals(node.item)) {
//                        return true
//                    }node = node.next;
//                }
//            }else {
//                for(int i=0; i<size; i++) {
//                    if(o == (node.item)) {
//                        return ture;
//                    }
//                }node= node.next;
//               
//            }
//                return false;
        return indexOf(o) >= 0;
    }

    @Override
    public Object[] toArray() {// 리스트를 배열로
        Object[] copy = new Object[size];
        int i = 0;
        for (Node<T> x = head; x != null; x = x.next) {
            copy[i++] = x.item;
            // System.out.println(copy[i]);
        }
        return copy;
    }

    @SuppressWarnings({ "unchecked", "hiding" })
    @Override
    public <T> T[] toArray(T[] a) {
        if (a.length < size) {
            a = (T[]) java.lang.reflect.Array.newInstance(a.getClass().getComponentType(), size);
        }
        int i = 0;
        Object[] result = a;
        for (Node<T> n = (Node<T>) head; n != null; n = n.next) {
            result[i++] = n.item;
            n = n.next;
        }
        return null;
    }

    @Override
    public boolean add(T e) {
        Node<T> copy = tail;
        Node<T> node = new Node<T>(copy, e, null);
        tail = node;
        if (copy == null) {
            head = node;
            size++;// 처음값을 ++안해줘서 건너뛰고 다음값이 찍힘
        } else {
            copy.next = node;
            size++;
        }
        return true;
    }

    @Override
    public boolean remove(Object o) {
//            List<T> list = new MyLinkedList<>();
//            boolean find =false;
//            int findNode = -1;
//            for(int i =0; i<size-1; i++) {
//                if(contains(o)) {
//                    findNode = i
//                    find = true;
//                    
//                    break;
//                }
//                for(int i=0; i<size-1; )
//                
//            }
//            return find;
        if (o == null) {// 지우는 요소가 null일 떄
            for (Node<T> i = head; i != null;) {// head가 null이 아닐동안 실행하는데
                if (i.item == null)
                    unlink(i);
                i = i.next;
            }
        } else {
            for (Node<T> i = head; i != null;) {// i는 head인데, i가 null이 아닌 동안에 루프 돈다.
                if (i.equals(i.item))
                    unlink(i);
                i = i.next;
            }
        }
        return true;
    }

    // i(node)를 매개변수로 보내면 prev와 next를 이어서 자기는 삭제됨/
    private T unlink(Node<T> i) {// remove에서 사용
        T element = i.item;
        Node<T> next = i.next;
        Node<T> prev = i.prev;
        if (prev == null) { // 지우는 요소의 이전노드가 없을 경우
            head = next;
        } else {
            prev.next = next;
            i.prev = null;// ?
        }
        if (next == null) { // 지우는 요소의 다음노드가 없을 경우
            tail = prev;
        } else {
            next.prev = prev;
            i.next = null;// ?
        }
        i.item = null;
        size--;
        return element;
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        Iterator<?> iter = c.iterator();// Iterator를 활용해서 list의 모든 값을 가져온다.
        boolean findAll = true;
        while (iter.hasNext()) {// 읽어올 요소가 있니?
            findAll = contains(iter.next());
            if (!findAll) {
                break;
            }
        }
        return findAll;
    }

    @Override
    public boolean addAll(Collection<? extends T> c) {// 컬렉션 객체에 모든 아이템을 리스트에 추가
        Iterator<? extends T> iter = c.iterator();
        while (iter.hasNext()) {
            add(iter.next());
        }
        return true;
    }

    @Override
    public boolean addAll(int index, Collection<? extends T> c) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException();
        }

        Iterator<? extends T> iter = c.iterator();
        while (iter.hasNext()) {// boolean hasNext-읽어올 요소가 남아있는지/
            add(index, iter.next());// Object next
            index++;
        }
        return true;
    }

    @Override
    public boolean removeAll(Collection<?> c) {// 겹치는 요소 모두 다 삭제하는 메소드
        Iterator<?> iter = c.iterator();
        boolean check = true;
        while (iter.hasNext()) {
            if (c.contains(iter.next())) {
                iter.remove();
                if (!check) {
                    break;
                }
                // return check;
            }
        }
        return check;
    }

    // 두개의 리스트에서 같은것만 새로운 리스트에 담는 함수(교집합)
    @Override
    public boolean retainAll(Collection<?> c) {
        // LinkedList<T> node = new LinkedList<T>();
        Iterator<?> iter = c.iterator();
        while (iter.hasNext()) {
            if (!c.contains(iter.next())) {// 서로 공통요소가 아니면 제거
                iter.remove();
                // node=(LinkedList<T>) iter;
                return true;
            }
        }
        return false;
    }

    @Override
    public void clear() {
        this.size = 0;
        this.head = null;
        this.tail = null;
        // removeFirst();
    }

    @Override
    public T get(int index) {// 입력받은 해당번째에 들어있는 값을 리턴해야하는데
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException();
        }
        Node<T> node = head;// 헤드를 노드에 넣었어
        for (int i = 0; i < index; i++) {// i가 index보다 작을 동안만 실행하여 i를 하나씩 꺼내주는데
            node = node.next;
        }
        return node.item;// 노드는 T타입에 들어있으니깐 그 안에 들은 item(값) return
    }

    private Node<T> node(int index) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException();
        }
        Node<T> node = head;
        for (int i = 0; i < index; i++) {
            node = node.next;
        }
        return node;
    }

    @Override
    public T set(int index, T element) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException();
        }
        Node<T> node = node(index);
        T result = node.item;
        node.item = element;
        return result;
    }

    @Override
    public void add(int index, T element) {// ?번째 인덱스에 element를 add
        if (index == size) {// 그냥 뒤에 이어 추가하면 된다.
            add(element);
        } else {
            Node<T> nextNode = node(index);
            Node<T> prevNode = nextNode.prev;
            Node<T> newNode = new Node<T>(prevNode, element, nextNode);
            nextNode.prev = newNode;
            if (prevNode == null) {
                head = newNode;
//                } else {
//                    prevNode.next = newNode;
            }
            size++;
        }
    }

    @Override
    public T remove(int index) {
        if (index < 0 || index > size) {
            throw new IndexOutOfBoundsException();
        }
        Node<T> temp = node(index);
        if (index == 0) {// index가 0번째면
            head = temp.next;// 0번째 노드 다음이 헤드다.
        } else if (index == size - 1) {
            head = temp.prev;
        } else {
            Node<T> next = node(index + 1);
            Node<T> prev = node(index - 1);
            next.prev = prev;
            prev.next = next;
        }
        size--;
        return temp.item;//
    }
//            if (index > 0 || index < size) {           
//            }
//            Node<T> temp = node(index - 1);// 0
//            Node<T> nextNode = temp.next;
//            temp.next = temp.next.next;
//            Object returnData = nextNode.item;
//            if (nextNode == tail) {
//                tail = temp;
//            }
//            nextNode = null;
//            size--;
//            return (T) returnData;
    //
//        }
//        public T removeFirst() {//remove에서 사용
//            Node<T> temp = head;
//            head = head.next;
//            Object item = temp.item;
//            temp = null;
//            size--;
//            return (T) item;
//        }

    @Override
    public int indexOf(Object o) {
        Node<T> node = head;// head를 node공간에 넣는다
        if (o != null) {
            for (int i = 0; i < size; i++) {
                if (o.equals(node.item)) {
                    return i;
                }
                node = node.next;
            }
        } else {
            for (int i = 0; i < size; i++) {
                if (o == (node.item)) {
                    return i;
                }
                node = node.next;
            }
        }
        return -1;
    }

    // 리스트 내에서 지정된 요소가 마지막에 검출된 위치의 인덱스를 리턴한다.
    @Override
    public int lastIndexOf(Object o) {// Object o : 모든 타입을 받겠다.
        if (o != null) {
            for (int i = size - 1; i >= 0; i--) {
                Node<T> node = node(i);
                if (o.equals(node.item)) {
                    return i;
                }
            }
        }
        for (int i = size - 1; i >= 0; i--) {
            Node<T> node = node(i);
            if (o == node.item) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public Iterator<T> iterator() {
        return null;
    }

    @Override
    public ListIterator<T> listIterator() {
        return null;
    }

    @Override
    public ListIterator<T> listIterator(int index) {
        return null;
    }

    @Override
    public List<T> subList(int fromIndex, int toIndex) {// 리스트를 잘라서 사용해야 할 때 쓰는 함수
        if (fromIndex < 0) {
            throw new IndexOutOfBoundsException();
        }
        if (toIndex >= size) {
            throw new IndexOutOfBoundsException();
        }
        if (fromIndex > toIndex) {
            throw new IndexOutOfBoundsException();
        }

        List<T> temp = new MyLinkedList<T>();// 잘라놓은거 담을 공간
        if (fromIndex <= toIndex) {// ~로부터 ,까지
            for (int i = fromIndex; i < toIndex; i++) {
                temp.add(this.get(i));
            }
        }
        return temp;
    }
}