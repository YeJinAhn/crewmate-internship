//package kr.co.crewmate.ojt;
//
//import java.awt.image.BufferedImage;
//import java.io.File;
//import java.io.FileInputStream;
//import java.io.InputStream;
//import java.io.OutputStream;
//import java.net.ServerSocket;
//import java.net.Socket;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.nio.file.Paths;
//import java.util.Scanner;
//
//import javax.imageio.ImageIO;
//
//public class SimpleWeb {
//
//    private ServerSocket serverSocket;
//
//    public SimpleWeb(int port) throws Exception {
//        serverSocket = new ServerSocket(port);
//    }
//
//    public void runServer() throws Exception {
//        Socket socket = serverSocket.accept();
//        InputStream in = socket.getInputStream();
//        Scanner sc = new Scanner(in);
//        String filename = "";
//        filename = sc.nextLine();
//        System.out.println(filename);// GET/test.html HTTP/1.1
//        String[] arr = filename.split(" ");
//        System.out.println(arr[1]);// 파일명 출력/test.html
//
//        String targetFileName = arr[1].replace("/", "C:\\Users\\CREWMATE\\git\\ojt2020\\dpwls924\\");
//        System.out.println(targetFileName);// ....test.html
//        File file = new File(targetFileName);
//        long fileSize = file.length();// 파일 사이즈 구하기
//
//   
//        
//        OutputStream out = socket.getOutputStream();
//        // 해당 파일을 읽어와서 소켓의 출력스트림으로 내보낸다.
//        FileInputStream fin = new FileInputStream(file);
//
//        Path path = Paths.get(file.getPath());
//        String mime = Files.probeContentType(path);
//        // HTML파일의 응답헤더 구성
          //이상한 것은 길이가 12bytes이고 
          //실제 'data1data2'는 총10bytes이므로 2byte의 오차가 생기는데 
          //이는 눈에 보이지 않는 개행문자로 '\r\n'을 의미하게 됩니다.
//        out.write(new String("HTTP/1.1 200 OK\r\n").getBytes("UTF-8"));
//        out.write(new String("Content-Length:" + fileSize + "\r\n").getBytes("UTF-8"));
//        out.write(new String("Content-Type:"+mime+";charset=UTF-8\r\n\r\n").getBytes("UTF-8"));
//        byte[] buffer = new byte[1024];
//        int read = 0;
//        while((read = fin.read(buffer)) !=-1) {
//            out.write(buffer, 0, read);
//        }
//
//        while (true) {
//            int data = fin.read();
//            if (data == -1)
//                break;
//            out.write(data);
//        }
//        
//
//        out.flush();
//        out.close();
//        sc.close();
//        in.close();
//        socket.close();
//    }
//
//    public static void main(String[] args) throws Exception {
//        SimpleWeb web = new SimpleWeb(9090);
//        web.runServer();
//    }
//}
