package kr.co.crewmate.ojt;


import java.util.ArrayList;
import java.util.List;

public class CsvData {
    
    private List<String> items = new ArrayList<>();

    public List<String> getItems() {
        return items;
    }

    public void setItems(List<String> items) {
        this.items = items;
    }

    public void add(String e) {
        this.items.add(e);
    }
}
