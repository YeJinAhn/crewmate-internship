package kr.co.crewmate.ojt.model.test;

import java.util.List;

public class MainApplication {

    public static void main(String[] args) {
        
        CustomerExcelReader excelReader = new CustomerExcelReader();
        List<CustomerVo> xlsxList = excelReader.xlsxToCustomerVoList("C://test.xlsx");
        printList(xlsxList);

    }

    private static void printList(List<CustomerVo> list) {
        CustomerVo vo;
        
        for(int i =0; i<list.size(); i++) {
            vo = list.get(i);
            System.out.println(vo.toString());
        }
        
    }

}
