package kr.co.crewmate.ojt;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
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

public class HttpServer {
    public static void main(String[] args) throws IOException {
        try (ServerSocket serverSocket = new ServerSocket(9090)) {
            System.out.println("Listening...");

            while (true) {
                Socket socket = serverSocket.accept();
                Thread thread = new Thread(new HttpThread(socket));
                thread.start();
            }
        }
    }
}

class HttpThread implements Runnable {
    private Socket socket;
    private static final String DIR_PATH = "C:/Users/CREWMATE/git/ojt2020/dpwls924/";

    HttpThread(Socket socket) {
        this.socket = socket;
    }

    @Override
    public void run() { // 서버에게서 받은 데이터 처리
        try (InputStream io = socket.getInputStream(); OutputStream os = socket.getOutputStream()) {
            BufferedReader reader = new BufferedReader(new InputStreamReader(io, "UTF-8"));
            PrintWriter pw = new PrintWriter(os, true);// 모니터로 출력

            String fileName = reader.readLine();
            String[] arr = fileName.split(" ");// 공백으로 잘라서 배열에다가 넣는다.
            String fileNamePath = DIR_PATH + arr[1];
            // String fileNamePath = arr[1].replaceFirst("/", DIR_PATH);// 파일명
            // System.out.println("ss: "+fileNamePath);
            File file = new File(fileNamePath);
            // long fileLength = file.length();// 파일 사이즈

            // Mime타입으로 명시
            Path path = Paths.get(file.getPath());
            String mime = Files.probeContentType(path);
            // 해당 파일을 읽어와서 소켓의 (os)출력스트림으로 내보낸다.
            try (FileInputStream fin = new FileInputStream(file)) {
                for (String line = reader.readLine(); line != null; line = reader.readLine()) {
                    System.out.println(line);
                    if ("".equals(line)) {
                        break;
                    }
                }
                // HTML 파일의 응답헤더 구성
                //pw.println("301 Moved Permanently");
                //pw.println("Location:");
                pw.println("HTTP/1.1 200 OK");
                pw.println("Connection: close");
                pw.println("Transfer-Encoding: chunked");
                // pw.println("Content-Length: " + fileLength);
                if (mime.contains("text")) {
                    pw.println("Content-Type: " + mime + ";charset=UTF-8");
                } else {
                    pw.println("Content-Type: " + mime);
                }
                pw.println();
                // 이미지 출력하기 위해서
                // 버퍼사이즈 : 1024 / 8192
                byte[] buffer = new byte[8192];// 1024자 글자를 한번에 배열에다가 저장
                                               // ex)파일에다 1024자를 쓰면 while문을 1024번 돌아야하기때문에(한글자 읽고, stream넣고, read로 빼는과정)
                int read = 0;
                while ((read = fin.read(buffer)) != -1) {// 파일의 내용을 fin의 stream에 두었다.그리고 stream에 있는것은 buffer 배열에 저장한다.
                                                         // 그래서 배열에 저장된 파일의 내용을 출력한다.
                    pw.println(Integer.toHexString(read));//16진수
                    os.write(buffer, 0, read);// byte배열 buffer의 index위치에서 read만큼 출력한다.
                    pw.println();
                }
                pw.println(0);//데이터 끝
                pw.println();
                pw.flush();
                os.flush();

            } catch (FileNotFoundException e) {
                pw.println("HTTP/1.1 404 NotFound");
                pw.println("Connection: close");
                //content-Type은 body영역에 
                pw.println();
            } catch (Exception e) {
                pw.println("HTTP/1.1 500 Internal Server Error");
                pw.println("Connection: close");
            }
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                socket.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
