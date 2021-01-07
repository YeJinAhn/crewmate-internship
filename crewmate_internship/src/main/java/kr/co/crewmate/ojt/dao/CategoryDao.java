package kr.co.crewmate.ojt.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import kr.co.crewmate.ojt.dao.base.BaseDao;
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

@Repository
public class CategoryDao extends BaseDao {
    /**
     * 업체
     * 
     * @return
     */
    public List<Vendor> selectVendorList() {
        return super.selectList("Category.selectVendorList");
    }

    /**
     * 원산지 리스트
     * 
     * @return
     */
    public List<Origin> selectOriginList() {
        return super.selectList("Category.selectOriginList");
    }

    /**
     * 상품 분류정보(상위)
     * 
     * @return
     */
    public List<Category> selectCategoryParentInfo() {
        return super.selectList("Category.selectCategoryParentInfo");
    }

    /**
     * 상품 분류정보(하위)
     * 
     * @param category
     * @return
     */
    public List<Category> selectCategoryChildInfo(Category category) {
        return super.selectList("Category.selectCategoryChildInfo", category);
    }

    /**
     * 상품 분류정보 추가
     * 
     * @param category
     * @return
     */
    public List<Category> selectCategoryAddList(Category category) {
        return super.selectList("Category.selectCategoryAddList", category);
    }

    /**
     * 정보고시정보
     * 
     * @return
     */
    public List<FtcInfomation> selectFtcInfo() {
        return super.selectFtcInfo("Category.selectFtcInfo");
    }

    /**
     * 브랜드팝업
     * 
     * @return
     */
    public Page<Brand> selectPopupBrandList(Brand brand) {
        return super.selectPageList("Category.selectBrandPopupList", brand);
    }

    public Brand selectBrandName(String brandId) {
        return super.selectBrandName("Category.selectBrandName", brandId);
    }

    /**
     * 관련상품 목록조회
     * 
     * @param product
     * @return
     */
    public Page<Product> selectPopupProductList(Product product) {
        return super.selectPageList("Category.selectProductPopupList", product);
    }

    public List<Product> selectPopupProductVendorList(Product product) {
        return super.selectList("Category.selectProductPopupList", product);
    }

    public Product selectProductSearch(String prdtCode) {
        return super.selectProductSearch("Category.selectProductSearch", prdtCode);
    }

    /**
     * 정보고시정보 하위
     * 
     * @param seq
     * @return
     */
    public List<FtcInfomation> selectFtcInfoChild(FtcInfomation seq) {
        return super.selectList("Category.selectFtcInfoChild", seq);
    }

//-----------------------------------insert 부분 시작------------------------------------------//
    /*
     * public String getSelectPrdtCode(String prdtCode) { return null; }
     */

    public void insertProduct(Product product) {
        super.insert("Category.insertProduct", product);

    }

    /* 아이콘설정 */
    public void insertProductIcon(ProductIcon productIcon) {
        super.insert("Icon.insertProductIcon", productIcon);

    }

    /* 카테고리 */
    public void insertProductCategory(ProductCategory productCategory) {
        super.insert("ProductCategory.insertProductCategory", productCategory);

    }

    /* 키워드설정 */
    public void insertProductSearchWord(ProductSearchWord productSearchWord) {
        super.insert("SearchWord.insertProductSearchWord", productSearchWord);

    }

    /* 정보고시정보 */
    public void insertProductFtcInfo(ProductFtcInfo productFtcInfo) {
        super.insert("FtcInfo.insertProductFtcInfo", productFtcInfo);

    }

    /* 관련상품 */
    public void insertConnectionProduct(ConnectionProduct connectionProduct) {
        super.insert("ConnectionProduct.insertConnectionProdcut", connectionProduct);
    }

    /* 상품가격시퀀스 */
    /*
     * public int prdtPriceSeq() { return
     * super.selectOne("Price.selectProductPriceSeq"); }
     */

    /* 상품가격정보 */
    public void insertProductPrice(ProductPrice productPrice) {
        super.insert("Price.insertProductPrice", productPrice);

    }

    /* 옵션재고 */
    public void insertProductOptionStock(ProductOptionStock productOptionStock) {
        super.insert("Option.insertProductOptionStock", productOptionStock);

    }

    /* 옵션마스터 */
    public void insertProductOptionMaster(ProductOptionMaster productOptionMaster) {
        super.insert("Option.insertProductOptionMaster", productOptionMaster);

    }

    /* 옵션디테일 */
    public void insertProductOptionDetail(ProductOptionDetail productOptionDetail) {
        super.insert("Option.insertProductOptionDetail", productOptionDetail);

    }

    public int selectProdcutCodeSeq() {
        return super.selectOne("Category.selectProductCodeSeq");
    }

    /* 옵션셀렉트 */
    public void insertProductOptionSelect(ProductOptionSelect productOptionSelect) {
        super.insert("Option.insertProductOptionSelect", productOptionSelect);
    }

    /* 상품이미지 */
    public void insertProductImage(ProductImage productImage) {
        super.insert("Image.insertProductImage", productImage);
    }

}
