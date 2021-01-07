package kr.co.crewmate.ojt.service;

import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import javax.imageio.ImageIO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.crewmate.ojt.constants.Constants;
import kr.co.crewmate.ojt.dao.CategoryDao;
import kr.co.crewmate.ojt.model.Brand;
import kr.co.crewmate.ojt.model.Category;
import kr.co.crewmate.ojt.model.ConnectionProduct;
import kr.co.crewmate.ojt.model.FtcInfomation;
import kr.co.crewmate.ojt.model.Origin;
import kr.co.crewmate.ojt.model.Product;
import kr.co.crewmate.ojt.model.ProductCategory;
import kr.co.crewmate.ojt.model.ProductFtcInfo;
import kr.co.crewmate.ojt.model.ProductIcon;
import kr.co.crewmate.ojt.model.ProductImage;
import kr.co.crewmate.ojt.model.ProductOptionDetail;
import kr.co.crewmate.ojt.model.ProductOptionMaster;
import kr.co.crewmate.ojt.model.ProductOptionSelect;
import kr.co.crewmate.ojt.model.ProductOptionStock;
import kr.co.crewmate.ojt.model.ProductPrice;
import kr.co.crewmate.ojt.model.ProductSearchWord;
import kr.co.crewmate.ojt.model.Vendor;
import kr.co.crewmate.ojt.model.base.Files;
import kr.co.crewmate.ojt.web.controller.CategoryController;

@Service
public class CategoryService {

    private static final Logger log = LoggerFactory.getLogger(CategoryService.class);
    @Autowired
    CategoryDao categoryDao;

    /**
     * 업체
     * 
     * @return
     */
    public List<Vendor> getVendorList() {
        return categoryDao.selectVendorList();
    }

    /**
     * 원산지 리스트
     * 
     * @return
     */
    public List<Origin> getOriginList() {
        return categoryDao.selectOriginList();
    }

    /**
     * 상품 분류정보(상위)
     * 
     * @return
     */
    public List<Category> getCategoryParentInfo() {
        return categoryDao.selectCategoryParentInfo();
    }

    /**
     * 상품 분류정보(하위)
     * 
     * @param category
     * @return
     */
    public List<Category> getCategoryChildInfo(Category category) {
        return categoryDao.selectCategoryChildInfo(category);
    }

    /**
     * 상품 분류정보 추가
     * 
     * @param category
     * @return
     */
    public List<Category> getCategoryAddList(Category category) {
        return categoryDao.selectCategoryAddList(category);
    }

    /**
     * 정보 고시정보
     * 
     * @return
     */
    public List<FtcInfomation> getFtcInfomation() {
        return categoryDao.selectFtcInfo();
    }

    /**
     * 브랜드 팝업
     * 
     * @param brand
     * @return
     */
    public Page<Brand> getPopupBrandList(Brand brand) {
        return categoryDao.selectPopupBrandList(brand);
    }

    public Brand getBrandName(String brandId) {
        return categoryDao.selectBrandName(brandId);
    }

    /**
     * 관련상품 목록조회
     * 
     * @param product
     * @return
     */
    public Page<Product> getPopupProductList(Product product) {
        return categoryDao.selectPopupProductList(product);
    }

    public List<Product> getPopupProductVendorList(Product product) {
        return categoryDao.selectPopupProductVendorList(product);
    }

    public Product getProductSearch(String prdtCode) {
        return categoryDao.selectProductSearch(prdtCode);
    }

    /**
     * 정보고시정보 하위
     * 
     * @param seq
     * @return
     */
    public List<FtcInfomation> getFtcInfoChild(FtcInfomation seq) {
        return categoryDao.selectFtcInfoChild(seq);
    }

    public int getProductCodeSeq() {
        return categoryDao.selectProdcutCodeSeq();
    }

    public int getInsertProduct(Model model, Product product, ProductImage productImage,
            ProductOptionMaster productOptionMaster, ProductOptionDetail productOptionDetail,
            ProductOptionStock productOptionStock, ProductOptionSelect productOptionSelect,
            ProductFtcInfo productFtcInfo, ProductCategory productCategory, ProductIcon productIcon,
            ProductPrice productPrice, ProductSearchWord productSearchWord, ConnectionProduct connectionProduct,
            MultipartHttpServletRequest request, Files files, List<MultipartFile> fileList) throws IOException {

        // product.setPrdtCode(product.getPrdtCode());
        // 업체
        product.setVndrCntrtId(product.getVndrCntrtId());
        // 브랜드
        product.setBrandId(product.getBrandId());
        // 영문상품명
        product.setPrdtEngName(product.getPrdtEngName());
        // 정상가
        product.setPrdtSellPrice(product.getPrdtSellPrice());
        // 판매여부
        product.setPrdtStatCode(product.getPrdtStatCode());

        product.setErpColorName("null");
        // 제조사
        product.setMnftrName(product.getMnftrName());
        // 원산지
        product.setCooCode(product.getCooCode());
        // 상품승인코드
        product.setPrdtPrmtCode("P");
        // 상세내용
        product.setPrdtDtlInfo(product.getPrdtDtlInfo());

        product.setFreeGiftUseYn("N");
        product.setLastModAdminId("admin");
        product.setMinBuyCount(product.getMinBuyCount());
        product.setMaxBuyCount(product.getMaxBuyCount());
        product.setPrdtKorName(product.getPrdtKorName());
        // 전시여부
        if (product.getDispYn().equals("true")) {
            product.setDispYn("Y");
        } else {
            product.setDispYn("N");
        }
        product.setSrchWord(productSearchWord.getSrchWord());
        product.setPrdtStyle(null);
        product.setPrdtGbnCode(null);
        product.setSellCount("0");

        // 관련상품사용여부
        if (product.getCntrPrdtUseYn().equals("true")) {
            product.setCntrPrdtUseYn("Y");
        } else {
            product.setCntrPrdtUseYn("N");
        }

        // 배송비
        if (product.getFreeDlvyYn() == "true") {
            product.setFreeDlvyYn("Y");
        } else {
            product.setFreeDlvyYn("N");
        }

        // 옵션사용시
        if (product.getOptnUseYn().equals("Y")) {
            product.setOptnName("사이즈");
        } else {
            product.setOptnName("옵션없음");
        }
        categoryDao.insertProduct(product);

        // 키워드설정
        String[] srchWords = productSearchWord.getSrchWord().split(",");
        int srhWordIdx = 0;
        if (!"".equals(productSearchWord.getSrchWord())) {
            for (String srchWord : srchWords) {
                productSearchWord.setSrchWord(srchWord);
                productSearchWord.setSrchSeq(srhWordIdx);
                categoryDao.insertProductSearchWord(productSearchWord);
                srhWordIdx++;
            }
        }
        log.debug(productSearchWord.getSrchWord());
        // 상품분류정보
        for (int i = 0; i < productCategory.getCtgrIds().length; i++) {
            if (productCategory.getCtgrIds()[i].contains(productCategory.getStdCtgrYnId())) {
                productCategory.setCtgrId(productCategory.getCtgrIds()[i]);
                productCategory.setStdCtgrYn("Y");
            } else {
                productCategory.setCtgrId(productCategory.getCtgrIds()[i]);
                productCategory.setStdCtgrYn("N");
            }

            System.out.println("1" + productCategory.getPrdtCode() + " 2" + productCategory.getCtgrId() + "3 / "
                    + productCategory.getStdCtgrYn());
            categoryDao.insertProductCategory(productCategory);
        }

        // 상단아이콘
        if (productIcon.getUpIconCode() != null && productIcon.getUpIconCode().size() > 1) {
            log.debug(productIcon.getUpIconCode() + "");
            for (String upIcon : productIcon.getUpIconCode()) {
                log.debug(upIcon);
                productIcon.setIconId(upIcon);
                log.debug(productIcon.getIconId());
                categoryDao.insertProductIcon(productIcon);
            }
        }
        log.debug(productIcon.getDownIconCode() + "");
        // 하단아이콘
        if (productIcon.getDownIconCode() != null && productIcon.getDownIconCode().size() > 1) {
            for (String downIcon : productIcon.getDownIconCode()) {
                productIcon.setIconId(downIcon);
                categoryDao.insertProductIcon(productIcon);
            }
        }

        // 상품가격정보
        productPrice.setPrdtPriceSeq(productPrice.getPrdtPriceSeq());
        productPrice.setPrdtDscntPrice(productPrice.getDscntErpSellPrice());
        productPrice.setDscntEndDt("99991231");
        categoryDao.insertProductPrice(productPrice);

        productOptionStock.setSellCount("0");
        productOptionStock.setDelYn("N");
        // 옵션
        // 옵션마스터
        if (productOptionMaster.getOptnMstrNames() != null && productOptionMaster.getOptnMstrNames().size() != 0) {
            for (int i = 0; i < productOptionMaster.getOptnMstrOrders().size(); i++) {
                productOptionMaster.setOptnMstrId(productOptionMaster.getOptnMstrIds().get(i));
                productOptionMaster.setOptnMstrName(productOptionMaster.getOptnMstrNames().get(i));
                productOptionMaster.setOptnMstrOrder(productOptionMaster.getOptnMstrOrders().get(i));
                categoryDao.insertProductOptionMaster(productOptionMaster);
            }
            // 옵션디테일
            for (int i = 0, j = 0, k = 1; i < productOptionDetail.getOptnDetailIds().size(); i++, k++) {
                if (i != 0 && (productOptionDetail.getOptnDetailMstrOrders().get(i - 1) != productOptionDetail
                        .getOptnDetailMstrOrders().get(i))) {
                    j++;
                    k = 1;
                }
                productOptionDetail.setOptnMstrId(productOptionDetail.getOptnMstrIds().get(j));
                productOptionDetail.setOptnId(productOptionDetail.getOptnDetailIds().get(i));
                productOptionDetail.setOptnValue(productOptionDetail.getOptnDetailValues().get(i));
                productOptionDetail.setOptnAmt(productOptionDetail.getOptnDetailAmts().get(i));
                productOptionDetail.setOptnOrder(k);// 순서
                /*
                 * System.out.println("1" + productOptionDetail.getOptnMstrId() + "2" +
                 * productOptionDetail.getOptnId() + "3" + productOptionDetail.getOptnValue() +
                 * "4" + productOptionDetail.getOptnAmt());
                 */
                ;
                categoryDao.insertProductOptionDetail(productOptionDetail);
            }
            // 옵션스탁
            for (int i = 0, j = 0; i < productOptionStock.getSelectedStockCounts().size(); i++) {
                if (j != productOptionSelect.getSelectStockIndex().size()
                        && (i == productOptionSelect.getSelectStockIndex().get(j))) {
                    productOptionStock.setStockSeq(i);
                    productOptionStock.setStockCount(productOptionStock.getSelectedStockCounts().get(i));
                    log.debug(productOptionStock.getSelectedStockCounts().get(i));
                    productOptionStock.setDispYn(changeYn(productOptionStock.getSelectedOptnDispYns().get(i)));
                    categoryDao.insertProductOptionStock(productOptionStock);
                    // 옵션셀렉트 //체크된거 001:01 - 002:02 - 003:01
                    /*
                     * if (j != productOptionSelect.getSelectStockIndex().size() && (i ==
                     * productOptionSelect.getSelectStockIndex().get(j))) { for (int k = 0; k <
                     * productOptionSelect.getSelectedOptnDtlIds().size(); k++) {
                     * 
                     * String[] selectedOptnDtlId =
                     * productOptionSelect.getSelectedOptnDtlIds().get(k).split("-");
                     * 
                     * productOptionSelect.setStockSeq(productOptionSelect.getSelectStockIndex().get
                     * (k)); for (int l = 0; l <selectedOptnDtlId.length; l++) { String[] optnIds =
                     * selectedOptnDtlId[j].split(":");
                     * productOptionSelect.setOptnMstrId(optnIds[0]);
                     * productOptionSelect.setOptnId(optnIds[1]);
                     * categoryDao.insertProductOptionSelect(productOptionSelect); } }
                     * 
                     * 
                     * 
                     * }
                     */
//                        productOptionSelect.setOptnMstrId(productOptionSelect.getSelectedOptnDtlIds().get(j).split(":")[0]);
//                        productOptionSelect.setOptnId(productOptionSelect.getSelectedOptnDtlIds().get(j).split(":")[1]);
//
//                        productOptionSelect.setStockSeq(productOptionStock.getStockSeq());
//                        /*
//                         * System.out.println(productOptionSelect.getPrdtCode() + "????");
//                         * System.out.println("! " + productOptionSelect.getOptnMstrId() + "2 " +
//                         * productOptionSelect.getOptnId() + " 3 " + productOptionSelect.getStockSeq());
//                         */
                    // categoryDao.insertProductOptionSelect(productOptionSelect);
                    j++;
                    // }
                }
            }
            // 옵션셀렉트
            for (int i = 0; i < productOptionSelect.getSelectStockIndex().size(); i++) {

                String[] selectedOptnDtlId = productOptionSelect.getSelectedOptnDtlIds()
                        .get(productOptionSelect.getSelectStockIndex().get(i)).split("-");

                productOptionSelect.setStockSeq(productOptionSelect.getSelectStockIndex().get(i));
                for (int j = 0; j < selectedOptnDtlId.length; j++) {
                    String[] optnIds = selectedOptnDtlId[j].split(":");
                    productOptionSelect.setOptnMstrId(optnIds[0]);
                    productOptionSelect.setOptnId(optnIds[1]);
                    categoryDao.insertProductOptionSelect(productOptionSelect);
                }
            }

//            for (int i = 0; i < productOptionSelect.getSelectedOptnDtlIds().size(); i++) {
//                
//                String[] selectedOptnDtlId = productOptionSelect.getSelectedOptnDtlIds().get(i).split("-");
//                
//                productOptionSelect.setStockSeq(productOptionSelect.getSelectStockIndex().get(i));
//                for (int j = 0; j <selectedOptnDtlId.length;  j++) {
//                    String[] optnIds = selectedOptnDtlId[j].split(":");
//                    productOptionSelect.setOptnMstrId(optnIds[0]);
//                    productOptionSelect.setOptnId(optnIds[1]);
//                    categoryDao.insertProductOptionSelect(productOptionSelect); 
//                }
//            }

        } else {
            productOptionStock.setSellCount("0");
            productOptionStock.setStockCount("0");
            productOptionStock.setStockSeq(1);
            productOptionStock.setDispYn("N");
            productOptionStock.setDelYn("N");

        }

        // 관련상품 여러개일때
        if (connectionProduct.getCntrPrdtCode() != null) {
            for (String cntrPrdtCode : connectionProduct.getCntrPrdtCodes()) {
                connectionProduct.setCntrPrdtCode(cntrPrdtCode);
                categoryDao.insertConnectionProduct(connectionProduct);
            }
        }

        // 정보고시정보
        if (productFtcInfo.getFtcInfoSeq() != null && productFtcInfo.getFtcInfoSeqs().length > 1) {
            for (int i = 0; i < productFtcInfo.getFtcInfoSeqs().length; i++) {
                productFtcInfo.setFtcInfoSeq(productFtcInfo.getFtcInfoSeqs()[i]);
                productFtcInfo.setInfoNotcCont(productFtcInfo.getInfNotcConts()[i]);
                if (productFtcInfo.getExpsrYns()[i].equals("true")) {
                    productFtcInfo.setDispYn("Y");
                } else {
                    productFtcInfo.setDispYn("N");
                }
                categoryDao.insertProductFtcInfo(productFtcInfo);
            }
        }

        // 상품이미지
        // 파일네임 항상 prdtCode +_+title/main/list
        // final String SAVE_DIR =
        // "C:/Users/CREWMATE/git/ojt2020/dpwls924/src/main/resources/static/images/upload/";//
        // 저장경로
        // String path = "/src/main/resources/static/images/image/";
        String path = request.getSession().getServletContext().getRealPath("/");// 절대경로
        File folder = new File(path);
        // File folder = new File(path);
        // File folder = new
        // File(request.getSession().getServletContext().getRealPath(path));
        String fileRenamedName = "";// 파일이름
        String newFileName = ""; // 최종파일이름
        // log.info(folder.exists()+"123123");
        if (!folder.exists()) {
            folder.mkdirs();// 해당위치에 폴더없으면 만들어줌
        }

        for (int i = 0, j = 0; i < productImage.getPrdtImageCodes().size(); i++) {
            /*
             * for (MultipartFile multiFile : fileList) { if (!multiFile.isEmpty()) {
             * fileRenamedName = multiFile.getOriginalFilename(); }
             */
            fileRenamedName = fileList.get(j).getOriginalFilename();
            String ext = fileRenamedName.substring(fileRenamedName.lastIndexOf(".jpg"));// .jpg만남기고 앞에꺼 다 지움
            if (!"".equals(productImage.getPrdtImagePaths().get(i)) || (i == 5 || i == 6)) {
                switch (i) {
                case 0:// 대표이미지
                    newFileName = product.getPrdtCode() + "_title" + ext;
                    BufferedImage resizedImage0 = resize(fileList.get(j).getInputStream(), 400, 400);
                    ImageIO.write(resizedImage0, "jpg", new File(folder + newFileName));// 경로+파일이름

                    break;
                case 1:// 추가이미지1
                    newFileName = product.getPrdtCode() + "_sub1" + ext;
                    BufferedImage resizedImage1 = resize(fileList.get(j).getInputStream(), 400, 400);
                    ImageIO.write(resizedImage1, "jpg", new File(folder + newFileName));
                    break;
                case 2:// 추가이미지2
                    newFileName = product.getPrdtCode() + "_sub2" + ext;
                    BufferedImage resizedImage2 = resize(fileList.get(j).getInputStream(), 400, 400);
                    ImageIO.write(resizedImage2, "jpg", new File(folder + newFileName));
                    break;
                case 3:// 추가이미지3
                    newFileName = product.getPrdtCode() + "_sub3" + ext;
                    BufferedImage resizedImage3 = resize(fileList.get(j).getInputStream(), 400, 400);
                    ImageIO.write(resizedImage3, "jpg", new File(folder + newFileName));
                    break;
                case 4:// 추가이미지4
                    newFileName = product.getPrdtCode() + "_sub4" + ext;
                    BufferedImage resizedImage4 = resize(fileList.get(j).getInputStream(), 400, 400);
                    ImageIO.write(resizedImage4, "jpg", new File(folder + newFileName));
                    break;
                case 5:// 메인이미지
                    newFileName = product.getPrdtCode() + "_main" + ext;
                    // if (!"".equals(productImage.getPrdtImagePaths().get(5))) {
                    BufferedImage resizedImage5 = resize(fileList.get(j).getInputStream(), 200, 200);
                    ImageIO.write(resizedImage5, "jpg", new File(folder + newFileName));
                    /*
                     * } else { BufferedImage resizedImage5 =
                     * resize(fileList.get(0).getInputStream(), 200, 200, file);
                     * ImageIO.write(resizedImage5, "jpg", new File(SAVE_DIR + file)); }
                     */
                    break;
                case 6:// 목록이미지
                    newFileName = product.getPrdtCode() + "_list" + ext;
                    BufferedImage resizedImage6 = resize(fileList.get(j).getInputStream(), 150, 150);
                    ImageIO.write(resizedImage6, "jpg", new File(folder + newFileName));
                    break;
                }
                // String temp = "0";
                // productImage.setPrdtImageCode(temp + (1 +
                // Integer.parseInt(productImage.getPrdtImageCodes().get(i))));
                productImage.setPrdtImageCode(productImage.getPrdtImageCodes().get(i));
                productImage.setPrdtImagePath(folder + newFileName);

                /*
                 * try { if (fileList != null) { ((MultipartFile)
                 * fileList.get(i)).transferTo(new File(SAVE_DIR + "/" + file)); } } catch
                 * (IllegalStateException | IOException e) { e.printStackTrace(); }
                 */

                // }
                if (!"".equals(productImage.getPrdtImagePaths().get(i))) {
                    categoryDao.insertProductImage(productImage);

                } else {

                    if (i == 5) {
                        productImage.setPrdtImageCode("06");
                        newFileName = product.getPrdtCode() + "_main" + ext;
                        BufferedImage resizedImage5 = resize(fileList.get(0).getInputStream(), 200, 200);
                        ImageIO.write(resizedImage5, "jpg", new File(folder + newFileName));
                        categoryDao.insertProductImage(productImage);
                    }
                    if (i == 6) {
                        productImage.setPrdtImageCode("07");
                        newFileName = product.getPrdtCode() + "_list" + ext;
                        BufferedImage resizedImage6 = resize(fileList.get(0).getInputStream(), 150, 150);
                        ImageIO.write(resizedImage6, "jpg", new File(folder + newFileName));
                        categoryDao.insertProductImage(productImage);
                    }
                }

                if (i < 6 && !"".equals(productImage.getPrdtImagePaths().get(i + 1)) && j < fileList.size() - 1) {
                    j++;
                }
            }
        }

        return 1;

    }

    private BufferedImage resize(InputStream inputStream, int width, int height) throws IOException {
        BufferedImage inputImage = ImageIO.read(inputStream);
        BufferedImage outputImage = new BufferedImage(width, height, inputImage.getType());
        Graphics2D graphis2D = outputImage.createGraphics();
        graphis2D.drawImage(inputImage, 0, 0, width, height, null);
        graphis2D.dispose();
        return outputImage;
    }

    // 옵션시 여부
    private String changeYn(String string) {
        if ("true".equals(string)) {
            return Constants.Y;
        } else {
            return Constants.N;
        }
    }

}
