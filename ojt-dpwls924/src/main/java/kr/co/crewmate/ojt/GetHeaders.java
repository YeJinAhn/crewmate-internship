package kr.co.crewmate.ojt;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;


//1. 서버의 포트번호를 정한다.
//2. 서버용 소캣 객체를 생성한다.
//3. 클라이언트쪽에서 접속 요청이 오기를 기다린다.
//4. 접속 요청이 오면 요청을 수락하고 해당 클라이언트에 대한 소켓 객체를 생성한다.
//5. 연결된 클라이언트와 입출력 스트림을 생성한다.
//6. 보조스트림을 통해 성능을 개선시킨다.
//7. 스트림믈 통해 읽고 쓰기를 한다.
//8. 통신을 종료한다.
public class GetHeaders {
    public static void main(String[] args) throws IOException {
//        long time = System.currentTimeMillis();
//        SimpleDateFormat dayTime = new SimpleDateFormat("yyyy-mm-dd hh:mm:ss");
//        String str = dayTime.format(new Date(time));
//        System.out.println(str);
        try (ServerSocket serverSocket = new ServerSocket(9090)) {

            while (true) {
                Socket socket = serverSocket.accept();//4.
                //Thread thread = new Thread(new ThreadPool(socket));
                // == ↕ 같은 코드
                Runnable soc = new ThreadPool(socket);
                Thread thread = new Thread(soc);
                thread.start();
                // start()메소드를 호출하면 run()메소드에 설정된 스레드가 Runnable상태로 진입

            }
        }
    }
}
// Runnable은 Thread를 상속받은 클래스처럼 start()메소드가 없다. 
// 따라서 별도의 쓰레드를 생성해주고 구현한 Runnable인터페이스를 인자로 넘겨주어야 한다.
class ThreadPool implements Runnable {
    private Socket socket;
    private static final String DIR_PATH = "C:/Users/CREWMATE/git/ojt2020/dpwls924/";

    ThreadPool(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() {// inputStream은 클라이언트가 전송한 데이터를 읽어오는것
        try (InputStream is = socket.getInputStream(); OutputStream os = socket.getOutputStream()) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
            PrintWriter pw = new PrintWriter(os, true);

            String fileName = reader.readLine();
            String[] arr = fileName.split(" ");
            String fileNamePath = DIR_PATH + arr[1];
            File file = new File(fileNamePath);

            Path path = Paths.get(file.getPath());
            String mime = Files.probeContentType(path);
            try (FileInputStream fin = new FileInputStream(file)) {
                // 클라이언트가 보내온 데이터를 읽어야 하니깐 BufferedReader를 사용해서 라인 단위로 데이터를 뽑아준다.
                for(String line = reader.readLine(); line !=null; line = reader.readLine()) {
                    if("".equals(line)) {
                        break;// 다읽으면 아무것도 없겠지? 그럼 그만.
                    }
                }
                pw.println("HTTP/1.1 200 ok");
                pw.println("Connection: close");
                pw.println("Transfer-Encoding: chunked");
                if(mime.contains("text")) {
                    pw.println("Content-Type: " + mime + ";charset=UTF-8");
                }else {
                    pw.println("Content-Type: " + mime);
                }
                pw.println();
                
            } catch (FileNotFoundException e) {

            }

        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

    }
}