package kr.co.crewmate.ojt;



import java.io.IOException;
import java.io.Reader;
import java.util.List;

public interface CsvParser {
    
    List<CsvData> parse(Reader reader) throws IOException;
}
