package kr.co.crewmate.ojt;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;

public class EchoServer {// 요청 받는
    //1. 서버의 포트번호를 정한다.
    //2. 서버용 소캣 객체를 생성한다.
    //3. 클라이언트쪽에서 접속 요청이 오기를 기다린다.
    //4. 접속 요청이 오면 요청을 수락하고 해당 클라이언트에 대한 소켓 객체를 생성한다.
    //5. 연결된 클라이언트와 입출력 스트림을 생성한다.
    //6. 보조스트림을 통해 성능을 개선시킨다.
    //7. 스트림믈 통해 읽고 쓰기를 한다.
    //8. 통신을 종료한다.
    public static void main(String[] args) throws IOException {
        try (ServerSocket serverSocket = new ServerSocket(9090)) {// 클라이언트의 응답을 기다리는 기능
            System.out.println("Listening...");

            while (true) {
                // 실제 통신하는 부분
                Socket socket = serverSocket.accept(); // 새로운 소켓을 생성 / 클라이언트가 들어왔을 때,접속했을 때 실행되는 구문
                Thread thread = new Thread(new EchoThread(socket));
                thread.start();
            }
        }
    }
}

class EchoThread implements Runnable {
    private Socket socket;

    EchoThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {                 //클라이언트에게서 받은 데이터 처리를 위한 작업
        try (InputStream io = socket.getInputStream(); OutputStream os = socket.getOutputStream()) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(io, "UTF-8"));//read
            //모니터로 출력
            PrintWriter pw = new PrintWriter(os, true);//autoFlush옵션 -> true로 주었을 때는 println메소드를 사용해야 autoFlush가 작동된다.
            
            for (String line = reader.readLine(); line != null; line = reader.readLine()) {
                System.out.println(line);
                if(line.equals("exit")) {//exit 입력시 종료
                    System.out.println("server close");
                    break;
                }
                pw.println(line);
                pw.flush();//현재 버퍼에 저장되어있는 내용을 클라이언트로 전송하고 버퍼를 비운다.
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}