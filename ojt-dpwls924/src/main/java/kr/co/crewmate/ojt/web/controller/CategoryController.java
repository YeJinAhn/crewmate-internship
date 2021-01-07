package kr.co.crewmate.ojt.web.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

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
import kr.co.crewmate.ojt.model.base.Result;
import kr.co.crewmate.ojt.service.CategoryService;

@Controller
public class CategoryController {

    private static final Logger log = LoggerFactory.getLogger(CategoryController.class);

    @Autowired
    CategoryService categoryService;

    @RequestMapping("/product/product")
    public String categoryParentList(Model model, Category category) {
        /* 업체 */
        List<Vendor> vendorList = categoryService.getVendorList();

        model.addAttribute("vendorList", vendorList);
        /* 원산지 */
        List<Origin> originList = categoryService.getOriginList();
        model.addAttribute("originList", originList);

        /* 상품 분류정보(상위) */
        List<Category> categoryList = categoryService.getCategoryParentInfo();
        model.addAttribute("categoryList", categoryList);

        /* 정보고시정보 */
        List<FtcInfomation> ftcInfo = categoryService.getFtcInfomation();
        model.addAttribute("ftcInfo", ftcInfo);

        return "/product/productForm";
    }

    /* 정보 고시정보(하위) */
    @ResponseBody
    @RequestMapping("/product/childFtcInfo")
    public Result ftcInfoChild(Model model, FtcInfomation seq) {

        Result result = new Result();
        List<FtcInfomation> ftcInfochild = categoryService.getFtcInfoChild(seq);

        result.putInfo("ftcInfoList", ftcInfochild);
        // System.out.println("이거나오니..?"+ftcInfochild);
        return result;
    }

    /* 상품 분류정보(하위) */
    @ResponseBody
    @RequestMapping("/product/childCategory")
    public Result categoryChildList(Model model, Category category) {

        Result result = new Result();
        List<Category> cagoChildList = categoryService.getCategoryChildInfo(category);

        result.putInfo("cagoList", cagoChildList);

        return result;
    }

    /* 상품 분류정보 추가 */
    @ResponseBody
    @RequestMapping("/product/addList")
    public Result categoryAddList(Model model, Category category) {

        // System.out.println(category.getCtgrId()+"fff");

        Result result = new Result();
        List<Category> cagoAddList = categoryService.getCategoryAddList(category);
        if (cagoAddList != null) {
            System.out.println(cagoAddList.size());
        } else {
            System.out.println("null");
        }

        result.putInfo("cagoAddList", cagoAddList);

        return result;
    }

    /* 브랜드 */
    @RequestMapping({ "/product/popupBrandList/popup", "/product/popupBrandList/popup" })
    public String popupBrandList(Model model, Brand brand) {

        Page<Brand> brandList = categoryService.getPopupBrandList(brand);
        model.addAttribute("list", brandList);

        return "/product/brandPopup";
    }

    /* 브랜드 검색 */
    @ResponseBody
    @RequestMapping(value = "/product/brandNameList", method = RequestMethod.GET)
    public Brand brandNameList(@RequestParam(value = "brandId") String brandId) {

        Brand brandList = categoryService.getBrandName(brandId);

        return brandList;
    }

    /* 관련상품 목록조회 */
    @RequestMapping("/product/popupProductList/popup")
    public String popupProductList(Model model, Product product) {
        // List<Product> vendorList =
        // categoryService.getPopupProductVendorList(product);
        /* 카테고리 */
//        if (product.getCategory() != null && product.getCategory().size() > 0){
        if (product.getCategory() != null){
            product.setCtgrId(product.getCategory().get(product.getCategory().size()-1));//여기부분을 해결해야 list 하나만눌렀을 시 뽑힘
        }
        Page<Product> productList = categoryService.getPopupProductList(product);
        List<Vendor> vendorList = categoryService.getVendorList();
        List<Category> categoryList = categoryService.getCategoryParentInfo();
        model.addAttribute("categoryList", categoryList);
        model.addAttribute("list", productList);
        model.addAttribute("vendorList", vendorList);

        return "/product/productPopup";
    }

    @RequestMapping("/product/popupImage/popup")
    public String popupImage(Model model, HttpServletRequest request) {

        String url = request.getParameter("img");// productPopup.jsp에서 img로 넘겼으니깐
        model.addAttribute("url", url);
        // System.out.println(url+"?????");
        return "/product/imageViewPopup";
    }

    @ResponseBody
    @RequestMapping(value = "/product/productSearchList", method = RequestMethod.GET)
    public Product productSearchList(@RequestParam(value = "prdtCode") String prdtCode) {

        Product productList = categoryService.getProductSearch(prdtCode);

        return productList;
    }

    @ResponseBody
    @RequestMapping("/product/productFormEnd")
    public Result insertProductForm(Model model, Product product, ProductImage productImage,
            ProductOptionMaster productOptionMaster, ProductOptionDetail productOptionDetail,
            ProductOptionStock productOptionStock, ProductOptionSelect productOptionSelect,
            ProductFtcInfo productFtcInfo, ProductCategory productCategory, ProductIcon productIcon,
            ProductPrice productPrice, ProductSearchWord productSearchWord, ConnectionProduct connectionProduct,
            MultipartHttpServletRequest request, Files files) throws IOException {
        Result result = new Result();
        Map<String, Object> map = new HashMap<>();
        map.put("result", "실패");

        // 업체
        if (product.getVndrCntrtId() == null || product.getVndrCntrtId().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 영문상품명
        if (product.getPrdtEngName() == null || product.getPrdtEngName().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 국문상품명
        if (product.getPrdtKorName() == null || product.getPrdtKorName().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 브랜드
        if (product.getBrandId() == null || product.getBrandId().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 원산지
        if (product.getCooCode() == null || product.getCooCode().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 제조사
        if (product.getMnftrName() == null || product.getMnftrName().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        int upIcon = 0;
        int downIcon = 0;
        if (productIcon.getUpIconCode() != null) {
            upIcon = productIcon.getUpIconCode().size();
        }
        if (productIcon.getDownIconCode() != null) {
            downIcon = productIcon.getDownIconCode().size();
        }
        // 상단아이콘설정 // 하단아이콘설정
        if (productIcon.getUpIconCode() != null || productIcon.getDownIconCode() != null) {
            if (upIcon + downIcon > 2) {
//            if ((productIcon.getUpIconCode().size() + productIcon.getDownIconCode().size()) > 2) {
                result.setInfoMap(map);
                return result;
            }
        }
        // 상품분류정보
        if (productCategory.getCtgrIds().length == 0) {
            result.setInfoMap(map);
            return result;
        } else {
            if (productCategory.getStdCtgrYnId().length() == 0) {
                result.setInfoMap(map);
                return result;
            }
        }
        // 정상가
        if (product.getPrdtSellPrice() == null || product.getPrdtSellPrice().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 판매가
        if (productPrice.getDscntErpSellPrice() == null || productPrice.getDscntErpSellPrice().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 최소구매수량
        if (product.getMinBuyCount() == null || product.getMinBuyCount().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 최대구매수량
        if (product.getMaxBuyCount() == null || product.getMaxBuyCount().length() < 1) {
            result.setInfoMap(map);
            return result;
        }
        // 옵션재고수량
        if (product.getOptnUseYn().equals("false")) {
            if ("".equals(productOptionStock.getStockCount())) {
                log.debug(product.getOptnUseYn());
                log.debug(productOptionStock.getSellCount());
                result.setInfoMap(map);
                return result;
            }
        } else {
            if (productOptionSelect.getSelectStockIndex() == null
                    || productOptionSelect.getSelectStockIndex().size() < 1) {
                result.setInfoMap(map);
                return result;
            }
        }
        // 관련상품o, 선택된값X
        if (product.getCntrPrdtUseYn().equals("true")) {
            if (connectionProduct.getPrdtCode().size() < 1) {
                result.setInfoMap(map);
                return result;
            }
        }
        // 정보고시정보
        /*
         * if (productFtcInfo.getFtcInfoSeqs() == null) { result.setInfoMap(map); return
         * result; }
         */
        // 이미지
        if (request.getFile("prdtImageFile01") == null) {
            result.setInfoMap(map);
            return result;
        }
        // 이미지 가져와서 service에서 나눠주기
        MultipartFile imageFile1 = request.getFile("prdtImageFile01");
        MultipartFile imageFile2 = request.getFile("prdtImageFile02");
        MultipartFile imageFile3 = request.getFile("prdtImageFile03");
        MultipartFile imageFile4 = request.getFile("prdtImageFile04");
        MultipartFile imageFile5 = request.getFile("prdtImageFile05");
        MultipartFile imageFile6 = request.getFile("prdtImageFile06");
        MultipartFile imageFile7 = request.getFile("prdtImageFile07");

        List<MultipartFile> fileList = new ArrayList<MultipartFile>();
        // null이 아닌것만 넣어주려고 imageCode만든것
        List<String> imageCode = new ArrayList<>();

        fileList.add(imageFile1);
        fileList.add(imageFile2);
        fileList.add(imageFile3);
        fileList.add(imageFile4);
        fileList.add(imageFile5);
        fileList.add(imageFile6);
        fileList.add(imageFile7);

        if (imageFile1 != null) {
            imageCode.add("0");
        }
        if (imageFile2 != null) {
            imageCode.add("1");
        }
        if (imageFile3 != null) {
            imageCode.add("2");
        }
        if (imageFile4 != null) {
            imageCode.add("3");
        }
        if (imageFile5 != null) {
            imageCode.add("4");
        }
        if (imageFile6 != null) {
            imageCode.add("5");
        }
        if (imageFile7 != null) {
            imageCode.add("6");
        }
        // productCode 생성
        int prdtCodes = categoryService.getProductCodeSeq();
        String prdtCode = String.format("%015d", prdtCodes);// 15자리

        // productImage.setPrdtImageCodes(imageCode);
        product.setPrdtCode(prdtCode);
        connectionProduct.setCntrPrdtMstrCode(prdtCode);
        productCategory.setPrdtCode(prdtCode);
        productIcon.setPrdtCode(prdtCode);
        productSearchWord.setPrdtCode(prdtCode);
        productFtcInfo.setPrdtCode(prdtCode);
        productImage.setPrdtCode(prdtCode);
        productOptionMaster.setPrdtCode(prdtCode);
        productOptionDetail.setPrdtCode(prdtCode);
        productOptionStock.setPrdtCode(prdtCode);
        productOptionSelect.setPrdtCode(prdtCode);
        productPrice.setPrdtCode(prdtCode);

        categoryService.getInsertProduct(model, product, productImage, productOptionMaster, productOptionDetail,
                productOptionStock, productOptionSelect, productFtcInfo, productCategory, productIcon, productPrice,
                productSearchWord, connectionProduct, request, files, fileList);

        map.put("result", "성공");
        result.setInfoMap(map);

        return result;
    }

}
