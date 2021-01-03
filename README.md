# crewmate-internship
# 상품등록
-(v체크 되어있는것은 필수값으로, 미입력 시 insert되지 않는다.)
## 상품기본정보
![tb_product](https://github.com/YeJinAhn/crewmate-internship/blob/main/productForm1.gif)
- 셀렉트박스를 누르면 해당리스트가 나온다(해당리스트는 DB조회를 거친다-데이터가 바뀔 수 있기 때문에)
- 브랜드 옆 돋보기를 클릭하면 브랜드조회 팝업창이 열린다.찾고자하는 브랜드명(혹은 브랜드ID)를 입력하면 관련된 목록이 출력된다.
- 아이콘은 상/하단 합쳐서 2개까지만 가능하다. 2개초과시 insert할 때, 유효성체크를 거쳐 alert이 뜬다.
- 키워드는 insert시 콤마(,)로 짤라서 테이블에 넣는다.
## 상품분류정보
![tb_product2](https://github.com/YeJinAhn/crewmate-internship/blob/main/productForm2.gif)
- 필수값으로, 최소 하나의 상품분류는 등록되어 있어야한다.기준상품분류 라디오버튼 미체크 시 insert할 때, 유효성체크를 거쳐 alert이 뜬다.
## 상품가격정보
![tb_price](https://github.com/YeJinAhn/crewmate-internship/blob/main/productForm3.gif)
- 정상가와 판매가 입력 시 두 금액의 차를 계산해서 할인율을 알려준다.
## 상품옵션정보
![tb_option](https://github.com/YeJinAhn/crewmate-internship/blob/main/productForm4.gif)
- 예시를 들자면,
-같은 신발이지만 사이즈별, 색상별이 있고     사이즈, 색상의 조합만큼 재고가 생성됩니다. 
-재고별로 수량이 있습니다.
-쿼리-TB_PRODUCT_OPTION_MASTER    사이즈, 색상
-쿼리-TB_PRODUCT_OPTION_DETAIL    빨강, 파랑, 250, 255 등
-쿼리-TB_PRODUCT_OPTION_STOCK      빨강:250 10개,   파랑:255 20개 
위와 같이 insert된다.
## 관련상품정보
![tb_connection_product](https://github.com/YeJinAhn/crewmate-internship/blob/main/productForm5.gif)
- 관련상품(있음)을 체크하면 관련상품목록조회 팝업창을 띄울수 있는 관련상품추가 버튼이 생성된다.
- <검색 시> -분류선택,업체,상품명,상품코드,브랜드,판매상태,상품가격,전시여부,승인기간, 업체중지상품제외 검색조건에 따라 관련된 목록이 출력된다.
- 여러 개 체크가 가능하다.
## 정보고시정보
![tb_ftc_information](https://github.com/YeJinAhn/crewmate-internship/blob/main/productForm6.gif)
-
-
-
## 상품이미지정보 & 상품상세정보
![tb_product_image](https://github.com/YeJinAhn/crewmate-internship/blob/main/productForm7.gif)
- 필수값인 대표이미지는 첫번째 이미지와 같다.

# 공지사항 관리
## 검색조건
![tb_board1](https://github.com/YeJinAhn/crewmate-internship/blob/main/board1(검색조건).gif)
- 제목 혹은 내용을 선택해서 검색하고 싶은 단어를 입력하면 관련된 제목(혹은 내용)이 출력된다.
- 등록일자는 시작일자가 종료일자보다 기간이 뒤면 검색이 되지 않는다.
## insert
![tb_board2](https://github.com/YeJinAhn/crewmate-internship/blob/main/board2(insert).gif)
## update
![tb_board3](https://github.com/YeJinAhn/crewmate-internship/blob/main/board3(update).gif)
- 수정하고자 하는 공지사항을 누르면 등록자ID/등록일시가 보여지고, 조회수가 1 증가한다.
## delete
![tb_board4](https://github.com/YeJinAhn/crewmate-internship/blob/main/board4(delete).gif)

#네파 홈페이지
#FAQ관리
![faqList](https://github.com/YeJinAhn/crewmate-internship/blob/main/FAQ.jpg)
#회원가입
