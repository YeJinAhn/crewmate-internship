package kr.co.crewmate.ojt.web.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor.HSSFColorPredefined;
import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import kr.co.crewmate.ojt.model.Addr;
import kr.co.crewmate.ojt.model.test.ExcelData;
import kr.co.crewmate.ojt.service.UserService;

@Controller
public class ExcelController {
    @Autowired
    UserService userService;
    //엑셀 웹화면에 띄우기
    @RequestMapping("/excel")
    public String main() {
        return "/practice/excel";
    }
    
    @PostMapping("/excel/read")//@RequestParam을 이용해서 파일을 전달받는다. 자료형은 MultiPartFile을 사용한다.
    public String readExcel(@RequestParam("file") MultipartFile file, Model model) throws IOException {
        
        //List<ExcelData> dataList = new ArrayList<>();
        List<Addr> dataList = new ArrayList<>();
        
        String extension = FilenameUtils.getExtension(file.getOriginalFilename());
        // commons-io에 있는 파일 확장자 가져오기 기능을 이용해서 확장자를 가져오고 엑셀파일이 아닌경우에는 예외를 던진다.
        if(!extension.equals("xlsx")&& !extension.equals("xls")) {
            throw new IOException("엑셀파일만 업로드 해주세요.");
        }
        
        Workbook workbook = null;
      //XSSFWorkbook은 엑셀파일 전체 내용을 담고 있는 객체
        if(extension.equals("xlsx")) {
            workbook = new XSSFWorkbook(file.getInputStream());
        }else if(extension.equals("xls")) {
            workbook = new HSSFWorkbook(file.getInputStream());
        }
        //시트 수는 첫번째에만 존재하므로 0을 준다. 만약 각 시트를 읽기위해서는 for문을 한번더 돌려준다.
        Sheet worksheet = workbook.getSheetAt(0);
        //행 개수만큼 반복문을 돌며 데이터를 가져온다.
        for(int i = 1; i<worksheet.getPhysicalNumberOfRows(); i++) {
            Row row = worksheet.getRow(i);
          /*  
            ExcelData data = new ExcelData();
            //getCell(열번호)를 통해 가져오며, 아래와 같은 메소드를 제공한다.
            // .getNumericCellValue() : 실수 데이터 가져오기
            // .getStringCellValue() : 문자열 데이터 가져오기
            // .getBooleanCellValue() :논리 데이터 가져오기
            data.setId(row.getCell(0).getStringCellValue());
            data.setName(row.getCell(1).getStringCellValue());
            data.setAge((int)row.getCell(2).getNumericCellValue());
            data.setEmail(row.getCell(3).getStringCellValue());
            // 엑셀 데이터들을 넣어놓은 객체 리스트들을 반환한다.
            dataList.add(data);*/
            
            Addr data = new Addr();
            data.setAddrNo((int)row.getCell(0).getNumericCellValue());
            data.setUserNo((int)row.getCell(1).getNumericCellValue());
            data.setAddrNm(row.getCell(2).getStringCellValue());
            data.setRecvNm(row.getCell(3).getStringCellValue());
            data.setHp(row.getCell(4).getStringCellValue());
            data.setZipcode(row.getCell(5).getStringCellValue());
            data.setAddress(row.getCell(6).getStringCellValue());
            data.setAddressDetail(row.getCell(7).getStringCellValue());
            data.setDefaultYn(row.getCell(8).getStringCellValue());
            data.setRegDt(row.getCell(9).getStringCellValue());
            dataList.add(data);
        }
        model.addAttribute("data", dataList);
        return "/practice/excelList";
    }
    
    @RequestMapping("/addrList")
    public String addrList(Model model) {
        List<Addr> list = userService.getAddr();
        model.addAttribute("list", list);
        return "/practice/excelOut";
    }
    //db에 있는 데이터 엑셀로 다운로드
    @RequestMapping(value="/excelDown")//HttpServletResponse 웹브라우저에게 응답을 돌려줄 객체 생성
    public void excelDown(HttpServletResponse response) throws IOException {
        //게시판 목록조회
        List<Addr> list = userService.getAddr();
       
        
        //워크북 생성
        // HSSF로 하고 싶으면 아래workbook을 바꿔주고 확장자를 xls로 바꿔주면된다.
        // pom.xml에 poi-3.17버전 추가 해주면 됨
        // XSSF는 poi-ooxml-3.17버전(최근버전으로 추가해주면 된다)
        Workbook wb = new XSSFWorkbook();
        Sheet sheet = wb.createSheet("게시판");
        Row row = null;
        Cell cell = null;
        int rowNo = 0;
        
        //테이블 헤더용 스타일
        CellStyle headStyle = wb.createCellStyle();
        //가는 경계선을 가집니다
        headStyle.setBorderTop(BorderStyle.THIN);
        headStyle.setBorderBottom(BorderStyle.THIN);
        headStyle.setBorderLeft(BorderStyle.THIN);
        headStyle.setBorderRight(BorderStyle.THIN);
        
        //배경
        headStyle.setFillForegroundColor(IndexedColors.AQUA.getIndex());
        //headStyle.setFillForegroundColor(HSSFColorPredefined.AQUA.getIndex());
        headStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        
        //데이터는 가운데 정렬
        headStyle.setAlignment(HorizontalAlignment.CENTER);
        
        //데이터용 경계 스타일 테두리만 지정
        CellStyle bodyStyle = wb.createCellStyle();
        bodyStyle.setBorderTop(BorderStyle.THIN);
        bodyStyle.setBorderBottom(BorderStyle.THIN);
        bodyStyle.setBorderLeft(BorderStyle.THIN);
        bodyStyle.setBorderRight(BorderStyle.THIN);
        
        //헤더 생성
        row = sheet.createRow(rowNo++);
        cell = row.createCell(0);
        cell.setCellStyle(headStyle);
        cell.setCellValue("주소록 고유번호");//int
        cell = row.createCell(1);
        cell.setCellStyle(headStyle);
        cell.setCellValue("회원 고유번호");//int
        cell = row.createCell(2);
        cell.setCellStyle(headStyle);
        cell.setCellValue("배송지명");
        cell = row.createCell(3);
        cell.setCellStyle(headStyle);
        cell.setCellValue("수취인명");
        cell = row.createCell(4);
        cell.setCellStyle(headStyle);
        cell.setCellValue("핸드폰번호");
        cell = row.createCell(5);
        cell.setCellStyle(headStyle);
        cell.setCellValue("우편번호");
        cell = row.createCell(6);
        cell.setCellStyle(headStyle);
        cell.setCellValue("주소-기본");
        cell = row.createCell(7);
        cell.setCellStyle(headStyle);
        cell.setCellValue("주소-상세");
        cell = row.createCell(8);
        cell.setCellStyle(headStyle);
        cell.setCellValue("배송여부");
        cell = row.createCell(9);
        cell.setCellStyle(headStyle);
        cell.setCellValue("등록일시");
        
        //데이터 부분 생성
        for(Addr vo : list) {
            row = sheet.createRow(rowNo++);
            cell = row.createCell(0);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getAddrNo());
            cell = row.createCell(1);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getUserNo());
            cell = row.createCell(2);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getAddrNm());
            cell = row.createCell(3);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getRecvNm());
            cell = row.createCell(4);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getHp());
            cell = row.createCell(5);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getZipcode());
            cell = row.createCell(6);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getAddress());
            cell = row.createCell(7);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getAddressDetail());
            cell = row.createCell(8);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getDefaultYn());
            cell = row.createCell(9);
            cell.setCellStyle(bodyStyle);
            cell.setCellValue(vo.getRegDt());
        }
        
        //컨텐츠 타입과 파일명 지정-HttpServletResponse객체
        response.setContentType("ms-vnd/excel");
        response.setHeader("Content-Disposition", "attachment;filename=test2.xlsx");
        // Content-Disposition에 attachment를 줄 때, filename과 함께 주게되면 Body에 오는값을 다운로드 받으라는 뜻이다.
        
        //엑셀 출력
        wb.write(response.getOutputStream());
        wb.close();
        
        
    }

}
