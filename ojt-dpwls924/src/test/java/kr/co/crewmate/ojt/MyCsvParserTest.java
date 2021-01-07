package kr.co.crewmate.ojt;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;

import org.junit.jupiter.api.Test;

public class MyCsvParserTest {

    @Test
    public void testBasic() throws IOException {
        MyCsvParser myCsv = new MyCsvParser();
        String path = "C:\\Users\\CREWMATE\\Documents\\test1.csv";
        File file = new File(path);
        //BufferedReader reader = new BufferedReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
        FileReader reader = new FileReader(file);
        List<CsvData> data = myCsv.parse(reader);
        System.out.println(data.get(0).getItems());
        System.out.println(data.get(1).getItems());
        System.out.println(data.get(2).getItems());
        // System.out.println(data.get(0).getItems().get(0));
        // System.out.println(data.get(0).getItems().get(1));
        // System.out.println(data.get(0).getItems().get(2));
        // System.out.println(data.get(1).getItems().get(0));// 3 줄바꿈한것이 아래 다음줄로 내려감
        // System.out.println(data.get(2).getItems().get(0));
        // System.out.println(data.get(2).getItems().get(1));
        // System.out.println(data.get(2).getItems().get(2));
        // assertEquals("11", data.get(0).getItems().get(0));

//        assertEquals("22",data.get(0).getItems().get(1));
//        String csv = "a,b,c";
//        CsvParser csvParser = new MyCsvParser();
//        List<CsvData> data = csvParser.parse(new StringReader(csv));
//        assertEquals("a", data.get(0).getItems().get(0));
//        assertEquals("b", data.get(0).getItems().get(1));
    }
}
