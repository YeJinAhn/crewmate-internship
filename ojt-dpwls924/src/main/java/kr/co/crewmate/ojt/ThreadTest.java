package kr.co.crewmate.ojt;

import java.io.IOException;
import java.util.Random;

public class ThreadTest extends Thread {
    private static int index = 0;
    private int id = -1;

    public ThreadTest(int id) {
        this.id = id;
    }

    public void run() {
        System.out.println(id + "번 쓰레드 동작중...");
        Random r = new Random(System.currentTimeMillis());// 현재시간구하기
        long s = r.nextInt(3000);// 3초
        try {
            Thread.sleep(s);
            index++;
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        System.out.println(id + "번 쓰레드 동작 종료..");
    }

    public static void main(String[] args) throws IOException {
// 쓰레드        
//        System.out.println("메인 메소드 시작");
//        
//        for(int i =0; i<10; i++) {
//            ThreadTest ts = new ThreadTest(i);
//            ts.start();
//        }
//아스키코드 구하기
//        Scanner sc = new Scanner(System.in);
//        int ch = sc.next().charAt(0);
//        
//        System.out.println(ch);
//      // ↕ ==
//        int a = System.in.read();
//        System.out.println(a);
// 단어의 개수        
//        Scanner sc = new Scanner(System.in);
//        String input = sc.nextLine().trim();
//        
//        if(input.isEmpty()) {
//            System.out.println(0);
//        }else {
//            System.out.println(input.split(" ").length);
//        }
// 상수        
//        Scanner sc = new Scanner(System.in);
//        
//        int A = sc.nextInt();
//        int B = sc.nextInt();
//        
//        A = Integer.parseInt(new StringBuilder().append(A).reverse().toString());
//        B = Integer.parseInt(new StringBuilder().append(B).reverse().toString());
//        
//        System.out.println(A>B ? A:B );
// 덩치
//        Scanner sc = new Scanner(System.in);
//        int n = sc.nextInt();
//        int[][] arr = new int[n][2];
//        for(int i =0; i<n; i++) {
//            arr[i][0] = sc.nextInt();
//            arr[i][1] = sc.nextInt();
//        }
//        
//        for(int i =0; i<n; i++) {
//            int rank = 1;
//            
//            for(int j =0; j<n; j++) {
//                if(i ==j) continue;
//                if(arr[i][0] < arr[j][0] && arr[i][1] < arr[j][1]) {
//                    rank++;
//                }
//            }
//            System.out.println(rank + " ");
//        }
// 이중 배열
//        Random random = new Random();
//        int[][] practice = new int[3][3];
//
//        for (int i = 0; i < practice.length; i++) {
//            for (int j = 0; j < practice.length; j++) {
//                practice[i][j] = -1;// 0~8을 출력하기 위해 모든 값 -1로 초기화(기본 초기화가 0이기 때문)
//            }
//        }
//        int num;// 랜던값 변수
//        boolean condition = false;// 중복이 있을 시 반복문을 처음부터 돌리기 위함
//
//        for (int i = 0; i < practice.length; i++) {
//            for (int j = 0; j < practice.length; j++) {
//                num = random.nextInt(9);// 0~8사이 랜덤 값 가져오기
//                System.out.println(i + " ," + j);
//                if (!(i == 0 && j == 0)) {// 제일 처음 항목일 경우 비교할 필요가 없기때문에
//                    for (int k = 0; k < practice.length; k++) {
//                        int l = 0;
//                        while (l < practice.length) {
//                            if (num == practice[k][l]) {// 중복일 경우
//                                num = random.nextInt(9);// 새로운 랜덤 값
//                                condition = true;// 중복임을 표시
//                            } else {
//                                condition = false;// 중복이 아님을 표시
//                            }
//                            l++;
//                            if (condition == true) {
//                                k = 0;
//                                l = 0;
//                            }
//                        }
//                    }
//                }
//                practice[i][j] = num; // 중복되지 않은 최종 값을 배열에 저장
//                System.out.println("index(" + i + "," + j + ")" + practice[i][j]);
//            }
//        }
// 상속
        // 부모 클래스
        //character marin = new character();
        
    }

}
   