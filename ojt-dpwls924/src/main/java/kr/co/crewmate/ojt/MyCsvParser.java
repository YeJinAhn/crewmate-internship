package kr.co.crewmate.ojt;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.Reader;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

public class MyCsvParser implements CsvParser {

    @Override
    public List<CsvData> parse(Reader reader) throws IOException {
        List<CsvData> value = new ArrayList<CsvData>();
        // 한글자씩 읽으면 bufferedReader 필요X 파라메터로받은 reader로도 충분하다.
        // BufferedReader bufferedReader = new BufferedReader(reader);
        // Charset.forName("utf-8");
        CsvData item = new CsvData();// 객체 생성
        StringBuilder str = new StringBuilder(); // 문자열 결합
        int ch =  reader.read();
        int next =  reader.read();
        int count = 0;
        // char ',' = ',';
        // char '"' = '"';
        while (ch != -1) {//true
            if (ch == '"') {
                count++;
            }
            if (ch == '"' && next != '"' && count % 2 == 0) {//count가 짝수면 단어끝
                count = 0;
                // 연달아 """ 있으니 계속 단어 읽어온다.
            } else if ((ch == '"' && next == '"' && count % 2 == 0) || (ch == '"' && count == 1)) {
                // do nothing // ex) "7""", 88,8 일경우 -> "7""","88,8이 되어버린다. 그래서 위에 코드가 필요함
            } else if (ch == ',' && count == 0) {// 단어 끝났으니 csvData에 담아주고, 새로운 builder 생성
                item.add(str.toString());
                str = new StringBuilder();

                // for (int i = 0; i < chars.length; i++) {
                // char c = chars[i];
            } else if ('\r' == ch && count == 0) {// 라인끝나서 다음줄로 넘어가는 부분
                // continue;
            } else if ('\n' == ch && count == 0) {// 라인끝나서 다음줄로 넘어가는 부분
                item.add(str.toString());
                value.add(item);
                str = new StringBuilder();
                item = new CsvData();
            } else {
                str.append((char) ch);
            }
            ch = next;
            next = reader.read();
        }
        return value;
    }
}
