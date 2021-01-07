package kr.co.crewmate.ojt;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class FileTestMain {

    // 현재 프로젝트 디렉토리(ojt2020)에
    // *.java 파일들에 String이란 키워드가 총 몇개 있는지 세는 프로그램 작성해서 올려주세요.

    public static int file(String path, String word) {
        int result=0;
        File file = new File(path);
        File[] fileList = file.listFiles();

        for (int i = 0; i < fileList.length; i++) {
            if (fileList[i].isDirectory()) {
                result+=file(fileList[i].getPath(),word);
            } else {
                int arr = fileList[i].getPath().lastIndexOf(".");
                if (word.equals(fileList[i].getPath().substring(arr+1))) {// 자바 파일 선택됨
                    result +=count(fileList[i].getPath());
                }
            }
        }
        return result;
    }

    public static int count(String path) {
        File file = new File(path);
        int count =0;
        
        try (BufferedReader br = new BufferedReader(new FileReader(file))){// 파일읽을 버퍼 생성
            
            String txt = br.readLine();
                while(txt!=null) {
                    String[] str = txt.split(" "); 
                    
                    for(int i=0; i<str.length; i++) {// 문자열을 뽑아주는데
                        if(str[i].contains("String")) {// String 이라는 문자열이 몇개인지 카운트 해준다.
                            count++;
                        }
                    }
                    txt =br.readLine();
                }
            } catch (IOException e) {               
                e.printStackTrace();
            }
        return count;
        
    }

    public static void main(String[] args) throws IOException {
        String path = "C:\\Users\\CREWMATE\\git\\ojt2020"; //검색할 디렉토리
        String word ="java";
        System.out.println(file(path, word));
       
//        try {
//            BufferedReader br = new BufferedReader(new FileReader());
//            String str = args[0];
//            String string = "String";
//
//            while ((string = br.readLine()) != null) {
//
//                // if()
//            }
//
//        } catch (FileNotFoundException e) {
//            // TODO Auto-generated catch block
//            e.printStackTrace();
//        }

    }
}
