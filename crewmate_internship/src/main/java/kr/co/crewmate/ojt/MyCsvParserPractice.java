package kr.co.crewmate.ojt;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class MyCsvParserPractice implements CsvParser {

    @Override
    public List<CsvData> parse(Reader reader) throws IOException {
        List<CsvData> value = new ArrayList<CsvData>(); // CsvData안에 담은 chars들을 리스트안에 라인단위로 담는다.
        // CsvData item = new CsvData();
        // 한글자씩 읽으면 bufferedReader 필요X 파라메터로받은 reader로도 충분하다.
        BufferedReader bufferedReader = new BufferedReader(reader);
        // Charset.forName("utf-8");
        // StringBuilder str = new StringBuilder("");
        String line = "";
        char comma = ',';
        char quote = '"';
        while ((line = bufferedReader.readLine()) != null) {
            value.add(readLine(line, comma, quote));
        }
        return value;
    }

    public CsvData readLine(String line, char comma, char quote) {
        // CsvData value = new CsvData();
        // List<CsvData> value = new ArrayList<CsvData>();
        CsvData item = new CsvData();// 객체 생성
        char[] chars = line.toCharArray();// 문자열을 문자배열로

        StringBuilder str = new StringBuilder(""); // 문자열 결합
        boolean quoted = false;
        for (int i = 0; i < chars.length; i++) {
            char c = chars[i];
            if ('\r' == c) {// 라인끝나서 다음줄로 넘어가는 부분
                continue;
            }
            if ('\n' == c && i ==chars.length-1) {// 라인끝나서 다음줄로 넘어가는 부분
                item.add(str.toString());
                str = new StringBuilder();
                // value.add(item);
                break;
            }
            if (quoted) {// 첫글자부터 읽음
                if ('"' == c) {
                    // 지금(i)의 다음글자(i+1)가 라인의 마지막 글자인지 그리고 다음글자가 ""인지 확인
                    if ((i + 1) < chars.length && chars[i + 1] == '"') {
                        str.append('"');
                        i++;
                    } else {
                        quoted = false;
                    }
                } else if (',' == c) {
                    str.append(c);
                } else {
                    str.append(c);
                }
            } else {
                if ('"' == c) {
                    quoted = true; // "22", -> "다음글자가 , 인지 / 앞에 단어가 있으면 0보다 클테니깐 아직 단어가안끝났다는 의미
                    if (((i + 1) < chars.length && chars[i + 1] == ',') && ((i - 1) >= 0 && chars[i - 1] != ',')) {
                        quoted = false;
                        str.append(c);
                    }
                } else if (',' == c) {
                    item.add(str.toString());
                    str = new StringBuilder(); // 다음 문자열 받은 새로운 builder생성
                    // value.add(item);
                } else {
                    str.append(c);
                }
            }
        }
      
        if (str.length() > 0) {
            item.add(str.toString());
            // value.add(item);
        }
        return item;
    }
}
//@Override
//public List<CsvData> parse(Reader reader) throws IOException {
//    
//    List<CsvData> data = new ArrayList<>();
//    
//    try(BufferedReader bufferedReader = new BufferedReader(reader)) {
//       for(String line = bufferedReader.readLine(); line != null; line = bufferedReader.readLine()) {
//           CsvData row = new CsvData();
//           for(String item : line.split(",")) {
//               row.add(item);
//           }
//           data.add(row);
//       }
//       return data;
//    } catch(IOException e) {
//        throw e;
//    }
//}
