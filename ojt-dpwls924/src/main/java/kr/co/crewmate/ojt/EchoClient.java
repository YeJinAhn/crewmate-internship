package kr.co.crewmate.ojt;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class EchoClient {// 요청을 보내는
    // 1. 서버의 IP주소와 서버가 정한 port번호를 매개변수로 하여 클라이언트용 소켓 객체를 생성한다.
    // 2. 서버와의 입출력 스트림을 오픈한다.
    // 3. 보조스트림을 붙여 성능을 개선한다.
    // 4. 스트림을 통해 읽고 쓰기를 한다.
    // 5. 통신을 종료한다.

    public EchoClient() {
        init();
    }

    public void init() {
        try {
            Socket clientSocket = new Socket("localhost", 9090);// 소켓 구하기 ( 자기 IP, 임의포트)
            System.out.println("Server Connect");
            // 네트워크로 받기
            BufferedReader br = new BufferedReader(new InputStreamReader(clientSocket.getInputStream(), "UTF-8"));
            // 모니터로 출력
            PrintWriter pw = new PrintWriter(clientSocket.getOutputStream());// 서버로 데이터를 보낼 준비
            Scanner sc = new Scanner(System.in);// 입력한 데이터를 읽을 준비
            String inputData = "";// 입력한 데이터를 저장할 공간
            while (true) {
                System.out.print("to Server: ");
                String text = sc.next();
                pw.println(text);// 보낼 내용을 읽어와서 서버로 보낸다
                pw.flush();// 프린터 라이터 메모리를 초기화 시켜서 내부에 있던 데이터를 서버로 전송한다
                if (text.equals("exit")) {
                    break;
                }
                System.out.println("from Server: " + br.readLine()); // 서버에서 받은 데이터를 표기한다.
            }
            clientSocket.close();// 연결 종료하면 소켓을 닫는다.
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void main(String[] args) {
        new EchoClient();
    }
}
