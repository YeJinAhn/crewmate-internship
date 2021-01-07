package kr.co.crewmate.ojt.model.test;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class CustomerExcelReader {
    
    @SuppressWarnings("resource")
    public List<CustomerVo> xlsxToCustomerVoList(String filePath){
        List<CustomerVo> list = new ArrayList<CustomerVo>();
        
        FileInputStream fis = null;
        XSSFWorkbook workbook = null;
        
        try {
            fis = new FileInputStream(filePath);
        //XSSFWorkbook은 엑셀파일 전체 내용을 담고 있는 객체
            workbook = new XSSFWorkbook(fis);

            //탐색에 사용할 Sheet, Row, Cell 객체
            XSSFSheet curSheet;
            XSSFRow curRow;
            XSSFCell curCell;
            CustomerVo vo;
            
            // Sheet 탐색 for문
            for(int sheetIndex = 0 ; sheetIndex < workbook.getNumberOfSheets(); sheetIndex++) {
                // 현재 Sheet 반환
                curSheet = workbook.getSheetAt(sheetIndex);
                // row 탐색 for문
                for(int rowIndex=0; rowIndex < curSheet.getPhysicalNumberOfRows(); rowIndex++) {
                    // row 0은 헤더정보이기 때문에 무시
                    if(rowIndex != 0) {
                        // 현재 row 반환
                        curRow = curSheet.getRow(rowIndex);
                        vo = new CustomerVo();
                        String value;
                        
                        // row의 첫번째 cell값이 비어있지 않은 경우 만 cell탐색
                        if(!"".equals(curRow.getCell(0).getStringCellValue())) {
                            
                            // cell 탐색 for 문
                            for(int cellIndex=0;cellIndex<curRow.getPhysicalNumberOfCells(); cellIndex++) {
                                curCell = curRow.getCell(cellIndex);
                                
                                if(true) {
                                    value = "";
                                    // cell 스타일이 다르더라도 String으로 반환 받음
                                    switch (curCell.getCellType()){
                                    case HSSFCell.CELL_TYPE_FORMULA:
                                        value = curCell.getCellFormula();
                                        break;
                                    case HSSFCell.CELL_TYPE_NUMERIC:
                                        value = curCell.getNumericCellValue()+"";
                                        break;
                                    case HSSFCell.CELL_TYPE_STRING:
                                        value = curCell.getStringCellValue()+"";
                                        break;
                                    case HSSFCell.CELL_TYPE_BLANK:
                                        value = curCell.getBooleanCellValue()+"";
                                        break;
                                    case HSSFCell.CELL_TYPE_ERROR:
                                        value = curCell.getErrorCellValue()+"";
                                        break;
                                    default:
                                        value = new String();
                                        break;
                                    }
                                    
                                    // 현재 column index에 따라서 vo에 입력
                                    switch (cellIndex) {
                                    case 0: // 아이디
                                        vo.setCustId(value);;
                                        break;
                                        
                                    case 1: // 이름
                                        vo.setCustName(value);;
                                        break;
                                        
                                    case 2: // 나이
                                        vo.setCustAge(value);
                                        break;
                                        
                                    case 3: // 이메일
                                        vo.setCustEmail(value);
                                        break;
        
                                    default:
                                        break;
                                    }
                                }
                            }
                            // cell 탐색 이후 vo 추가
                            list.add(vo);
                        }
                    }
                }
            }
        } catch (FileNotFoundException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
            
        } finally {
            try {
                // 사용한 자원은 finally에서 해제
                if( workbook!= null) workbook.close();
                if( fis!= null) fis.close();
                
            } catch (IOException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        return list;
    }
}
