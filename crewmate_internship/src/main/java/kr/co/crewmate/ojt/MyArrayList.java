package kr.co.crewmate.ojt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class MyArrayList<T> implements List<T> {
    private Object[] item = new Object[10];
    private int size = 0;
    public int modCount;

    @Override
    public boolean add(T arg0) {
        item[size] = arg0;
        size++;
        return true;
    }

    @Override
    public void add(int arg0, T arg1) {
        if (arg0 > size) {
            throw new IndexOutOfBoundsException();
        }
        for (int i = size - 1; i >= arg0; i--) {
            item[i + 1] = item[i];
        }
        item[arg0] = arg1;
        size++;
    }

    // 컬렉션 객체의 모든 아이템을 리스트에 추가하는 함수
    @Override
    public boolean addAll(Collection<? extends T> arg0) {
        Iterator<? extends T> iter = arg0.iterator();
        while (iter.hasNext()) {
            add(iter.next());
        }
        return true;
    }

    @Override
    public boolean addAll(int arg0, Collection<? extends T> arg1) {
        if (arg0 > size || arg0 < 0) {
            throw new IndexOutOfBoundsException();
        }
        Iterator<? extends T> iter = arg1.iterator();
        while (iter.hasNext()) {
            add(arg0, iter.next());
            arg0++;
        }

//        int arg0Size = arg1.size();
//        if (arg0Size == 0) {
//            
//        }
        return true;
    }

    // 리스트의 객체를 모두 삭제하는 메소드
    @Override
    public void clear() {
        for (int i = 0; i < size; i++) {
            item[i] = null;

        }
        size = 0;
    }

    // 특정 문자열이 포함되어 있는지 확인하는 함수
    @Override
    public boolean contains(Object arg0) {
//        if (arg0 == null) {
//            for (int i = 0; i < size; i++) {
//                if (item[i] == null) {
//                    return true;
//                }
//            }
//        } else {
//            for (int i = 0; i < size; i++) {
//                if (arg0.equals(item[i])) {
//                    return true;
//                }
//            }
//        }
        return indexOf(arg0) >= 0;
    }

    // 또 다른 리스트(컬랙션)arg0이 포함한 객체들을 포함하는지 확인하는 함수
    @Override
    public boolean containsAll(Collection<?> arg0) {

        Object[] arr = arg0.toArray();

        for (int i = 0; i < arr.length; i++) {
            for (int j = 0; j < item.length; j++) {
                if (arr[i].equals(item[j])) {
                    return true;
                }
            }
        }
        return false;
    }

    // get메소드를 통해 element 하나를 가지고 오는 방식
    @SuppressWarnings("unchecked")
    @Override
    public T get(int arg0) {
        if (arg0 < 0 || arg0 >= size) {
            throw new IndexOutOfBoundsException();
        }
        return (T) item[arg0];
    }

    @Override
    // 해당 값이 ArrayList에 존재하면 위치에 따라 숫자로 반환하는 함수
    // 메소드에 문자열을 입력하면 위치에 따라 숫자로 반환한다.
    public int indexOf(Object arg0) {
        // Object 클래스는 java.lang패키지 내의 최상위 클래스로 자바의 모든 클래스들은 Object클래스로부터 상속받는다.
        // 즉, Object 클래스의 모든 메소드와 변수는 다른 모든 클래스에서도 사용이 가능하다.
        if (arg0 == null) {
            for (int i = 0; i < size; i++) {
                if (item[i] == null) {
                    return i;
                }
            }
        } else {
            for (int i = 0; i < size; i++) {
                if (arg0.equals(item[i])) {
                    return i;
                }
            }
        }
        return -1;
    }

    // 해당 리스트가 비어있는지 유무를 확인하는 함수
    @Override
    public boolean isEmpty() {
        return size == 0;
    }

    // lastIndexOf는 오른쪽부터 문자열을 센다.
    // 마지막으로 나오는 값의 인덱스를 반환하는 함수
    @Override
    public int lastIndexOf(Object arg0) {
        if (arg0 == null) {
            // 배열사이즈 한칸씩 앞으로 당겨주고 i가 0보다크거나 같으면 루프도는데, 만약 item[i]가 널이라면 그 i의 인덱스 리턴한다.
            for (int i = size - 1; i >= 0; i--) {
                if (item[i] == null) {
                    return i;
                }
            }
        } else {
            for (int i = size - 1; i >= 0; i--) {
                if (arg0.equals(item[i])) {
                    return i;
                }
            }
        }
        return -1;
    }

    @Override
    public boolean remove(Object arg0) {
        int findIndex = indexOf(arg0);

        if (findIndex >= 0) {
            Object result = remove(findIndex);
            if (result != null) {
                return true;
            }
        }
        return false;
    }

    @Override
    public T remove(int arg0) {
        // 접근제한자(public) 타입(T) 메소드명(remove) (매개변수 타입int / 매개변수 명arg0(index)
        ArrayList<Object> result = new ArrayList<>();// 새로담아줄 공간(객체) 생성

        if (arg0 > item.length || arg0 < 0) {
            throw new ArrayIndexOutOfBoundsException();
        } else {
            T removed = get(arg0); // (2)번방꺼 일단 가져옴 (값)

            for (int i = 0; i < size; i++) { // i 0부터 1,2,3
                if (i != arg0) {
                    result.add(item[i]);
                } else {

                }
            }
            item = result.toArray();
            size = result.size();

            return removed;
        }
    }

    @Override
    public boolean removeAll(Collection<?> arg0) {// 두 리스트를 비교하여 겹치는 항목을 모두 삭제하는 메소드
        Object[] arr = arg0.toArray(); // 객체를 배열로 바꿔주고
        ArrayList<Object> result = new ArrayList<>();// 결과저장할 객체 생성해주고

        for (int i = 0; i < size; i++) { // item[10]
            boolean passed = true;
            for (int j = 0; j < arr.length; j++) { // arg0
                if (item[i].equals(arr[j])) { // 값이 같은 경우 -> 통과 아님

                    passed = false;
                } else { // 통과
//                        result.add(item[i]);
                }
            }
            if (passed) { // j를 한바퀴 돈 다음에 통과 했을 경우
                result.add(item[i]);// 삭제 안된 항목들을 result에 넣어준다
            }
        }
        item = result.toArray();
        size = result.size();
        return false;
    }

    // 두개의 리스트에서 같은것만 새로운 리스트에 담는 함수(교집합)
    @Override
    public boolean retainAll(Collection<?> arg0) {// 객체를 어레이로 바꿔줘야함

        Object[] arr = arg0.toArray();
        ArrayList<Object> temp = new ArrayList<Object>();

        for (int i = 0; i < size; i++) {
            for (int j = 0; j < arr.length; j++) {
                if (item[i].equals(arr[j]) || item[i] == (arr[j])) {
                    temp.add(item[i]);
                }
            }
        }
        item = temp.toArray();
        size = temp.size();
        return true;
    }

    @Override
    public T set(int arg0, T arg1) {

        T val = get(arg0);
        item[arg0] = arg1;
        return val;
    }

    @Override
    public int size() {
        return size;
    }

    // 리스트를 잘라서 사용해야 할 때 쓰는 함수
    @Override
    public List<T> subList(int arg0, int arg1) {// from, to
        // ex) 1,3 -> arg1앞까지의 해당하는 element까지만 반환한다.
        List<T> temp = new MyArrayList<>();

        if (arg0 < 0) {
            throw new IndexOutOfBoundsException();
        }
        if (arg1 >= size) {
            throw new IndexOutOfBoundsException();
        }
        if (arg0 > arg1) {
            throw new IllegalArgumentException();
        }

        if (arg0 <= arg1) {
            for (int i = arg0; i < arg1; i++) {
                temp.add(this.get(i));
            }
        }
        return temp;
    }

    // 오브젝트안에 인스턴스를 배열로 만드는 함수
    @Override
    public Object[] toArray() {

        Object[] copy = new Object[this.size];// 메소드 내에서 지역변수가 아닌것들 앞에는 this를 전부 삽입해서 수행해야한다.

        for (int i = 0; i < copy.length; i++) {
            copy[i] = item[i];
        }
        return copy;
    }
    // Arrays클래스 : 배열 조작 기능
    // return Arrays.copyOf(item, size);

    @SuppressWarnings("hiding")
    @Override
    public <T> T[] toArray(T[] arg0) {

        if (arg0.length > size) {
            arg0[size] = null;
        }
        return arg0;
    }

    @Override
    public String toString() {
        String str = "[";

        for (int i = 0; i < size; i++) {
            str += item[i];
            if (i < size - 1)
                str += ", ";
        }
        return str + "]";
    }

    @Override
    public Iterator<T> iterator() {// 단방향 탐색
        return new Iterator<T>() {
            private int cursor = 0;

            @Override
            public boolean hasNext() {// 해당 iteration이 다음요소를 가지고 있으면 true반환 아니면 false반환
                return cursor < size;
            }

            @SuppressWarnings("unchecked")
            @Override
            public T next() {// iteration의 다음 요소를 반환
                return (T) item[cursor++];
            }
        };
    }

    // 순서대로 저장된 컬렉션에서 요소를 순차적으로 검색할 때
    @Override
    public ListIterator<T> listIterator() {// 양방향 탐색
        return this.listIterator(0);
    }

    @Override
    public ListIterator<T> listIterator(int arg0) {
        if (arg0 < 0 || arg0 > size) {
            throw new IndexOutOfBoundsException("arg0 : " + arg0);
        }
        return new ListIterator<T>() {
            private int cursor = arg0;
            private boolean check = true;

            @Override
            public boolean hasNext() {// 해당 리스트를 순방향으로 순회할 때 다음요소를 가지고 있으면 true/false
                return cursor < size;
            }

            @SuppressWarnings("unchecked")
            @Override
            public T next() {// iteration의 다음요소
                return (T) item[cursor++];
            }

            @Override
            public boolean hasPrevious() {// 해당 리스트를 역방향으로 순회할 때 다음요소를 가지고 있으면 true/false
                return cursor > 0;
            }

            @SuppressWarnings("unchecked")
            @Override
            public T previous() {// 리스트의 이전 요소 반환하고, 커서의 위치를 역방향으로 이동
                int i = cursor - 1;
                cursor = i;

                return (T) item[i];
            }

            @Override
            public int nextIndex() {// 다음next()메소드를 호출하면 반환될 요소의 인덱스를 반환함.
                return cursor + 1;
            }

            @Override
            public int previousIndex() {
                return cursor - 1;
            }

            @Override
            public void remove() {
                if (check)
                    MyArrayList.this.remove(cursor-- - 1);
                else
                    MyArrayList.this.remove(cursor);
            }

            @Override
            public void set(T e) {
                if (check)
                    MyArrayList.this.set(cursor - 1, e);
                else
                    MyArrayList.this.set(cursor, e);
            }

            @Override
            public void add(T e) {
                int i = cursor++;
                MyArrayList.this.add(i, e);
            }
        };
    }
}
