# *crewmate-internship*
# 상품등록
- (v체크 되어있는것은 필수값으로, 미입력 시 insert되지 않는다.)
### [상품기본정보]
![tb_product](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/productForm1.gif)
- 셀렉트박스를 누르면 해당리스트가 나온다(해당리스트는 DB조회를 거친다-데이터가 바뀔 수 있기 때문에)
- 브랜드 옆 돋보기를 클릭하면 브랜드조회 팝업창이 열린다.찾고자하는 브랜드명(혹은 브랜드ID)를 입력하면 관련된 목록이 출력된다.
- 아이콘은 상/하단 합쳐서 2개까지만 가능하다. 2개초과시 insert할 때, 유효성체크를 거쳐 alert이 뜬다.
- 키워드는 insert시 콤마(,)로 짤라서 테이블에 넣는다.

### [상품분류정보]
![tb_product2](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/productForm2.gif)
- 필수값으로, 최소 하나의 상품분류는 등록되어 있어야한다.기준상품분류 라디오버튼 미체크 시 insert할 때, 유효성체크를 거쳐 alert이 뜬다.

### [상품가격정보]
![tb_price](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/productForm3.gif)
- 정상가와 판매가 입력 시 두 금액의 차를 계산해서 할인율을 알려준다.

### [상품옵션정보]
![tb_option](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/productForm4.gif)
- 예시를 들자면,
-같은 신발이지만 사이즈별, 색상별이 있고     사이즈, 색상의 조합만큼 재고가 생성됩니다. 
-재고별로 수량이 있습니다.
-쿼리-TB_PRODUCT_OPTION_MASTER    사이즈, 색상
-쿼리-TB_PRODUCT_OPTION_DETAIL    빨강, 파랑, 250, 255 등
-쿼리-TB_PRODUCT_OPTION_STOCK      빨강:250 10개,   파랑:255 20개 
위와 같이 insert된다.

### [관련상품정보]
![tb_connection_product](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/productForm5.gif)
- 관련상품(있음)을 체크하면 관련상품목록조회 팝업창을 띄울수 있는 관련상품추가 버튼이 생성된다.
- <검색 시> -분류선택,업체,상품명,상품코드,브랜드,판매상태,상품가격,전시여부,승인기간, 업체중지상품제외 검색조건에 따라 관련된 목록이 출력된다.
- 여러 개 체크가 가능하다.

### [정보고시정보]
![tb_ftc_information](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/productForm6.gif)
-
-
-
### [상품이미지정보 & 상품상세정보]
![tb_product_image](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/productForm7.gif)
- 필수값인 대표이미지는 첫번째 이미지와 같다.

# 공지사항 관리
### [검색조건]
![tb_board1](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/board1(검색조건).gif)
- 제목 혹은 내용을 선택해서 검색하고 싶은 단어를 입력하면 관련된 제목(혹은 내용)이 출력된다.
- 등록일자는 시작일자가 종료일자보다 기간이 뒤면 검색이 되지 않는다.
### [등록-insert]
![tb_board2](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/board2(insert).gif)
### [수정-update]
![tb_board3](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/board3(update).gif)
- 수정하고자 하는 공지사항을 누르면 등록자ID/등록일시가 보여지고, 조회수가 1 증가한다.
### [삭제-delete]
![tb_board4](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/board4(delete).gif)

# 네파 홈페이지
## FAQ관리
### [메인화면]
![faqList](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/FAQ.jpg)
- 1.고객센터 메인화면
- FAQ의 TOP10리스트 노출
- 2.FAQ 유형을 선택하면 해당 유형에 대한 FAQ리스트가 나타난다.
- 선택한 분류유형명이 아래 표시
- 3.FAQ리스트를 선택하면 해당 리스트가 펼쳐져 답변을 볼 수 있다.
- 다시 Tab하면 닫힘 

### [검색결과]
![faqSearch](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/FAQ(search).jpg)
- 검색창에 입력한 키워드에 대한 검색결과 리스팅
- 검색결과 및 건수 표시
- 검색결과 시 tab 버튼은 전체로 고정

## 회원가입
### [통합회원 가입 여부 확인]
![totalLoginYn](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/회원가입여부.jpg)
- 통합회원가입 첫 화면으로 기존 회원 가입여부를 체크할 수 있는 화면
<br />
1.이름 입력란
<br />
2.휴대폰번호 입력란
<br />
3.이름 입력란이 비어있을 경우 alert
<br />
4.휴대폰번호가 비어있을 경우 alert
<br />
5.[확인]버튼 클릭 시, 통합회원으로 가입되어 있거나, 가입정보가 없을 경우 화면에서 결과정보가 나타난다.
<br />
6.[확인] 버튼 클릭 시, 통합회원이 아닌 기존회원가입 정보로 확인이 되면 '기존 회원 가입 확인'화면이 나타난다.

### [회원가입 여부 확인 결과] (기존 회원 정보가 없을 경우)
![newLoginYn1](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/신규가입1.jpg)
- 통합회원가입 첫 화면에서 기존 회원 가입여부 결과 화면으로 체크시 동일한 정보가 없을 경우, 화면
<br /> 
1.회원정보가 모두 입력되어 있고 일치하는 회원정보가 없을 경우 나타나는 정보를 [다시 조회]하거나, [통합회원 신규가입]으로 유도할 수 있다. 
<br />
2.[통합회원 신규가입] 버튼을 누르면 회원가입의 첫 화면인 1. 회원 약관 동의 화면으로 이동한다.


### [회원가입 여부 확인 결과] (회원 정보가 통합회원인 경우)
![newLoginYn2](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/신규가입3.jpg)
- 입력한 회원정보가 이미 통합회원으로 가입되어 있는 경우, NEPA 통합회원으로 로그인 유도하는 화면이 나타난다.
<br /> 
4.[로그인] 통합회원 로그인 화면으로 이동
<br />
5.[아이디찾기] 회원 아이디 찾기 화면으로 이동
<br />
6.[비밀번호 찾기] 회원 비밀번호 찾기 화면으로 이동

### [약관동의]
![agreement1](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/agreement1.jpg)
- 통합회원 가입 시 1. 회원약관 동의화면으로 회원이용약관, 개인정보동의 체크 화면이 함께 나타나는 화면
<br /> 
1.네파몰 쇼핑몰 이용약관
<br />
2.개인정보 취급방침
<br />
3.멤버십 카드 이용약관 

![agreement2](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/agreement2.jpg)
- 멤버십카드 이용약관 
- 개인정보 수집 및 이용 동의
- 마케팅 개인정보 활용 동의 
- “전체 약관에 동의합니다” 체크 시 상단에 있는 모든 체크박스 체크 처리됨. 
- 전체 체크 후 각 개별 체크박스 수정 가능
- [취소] 버튼을 누르면 메인화면으로 이동한다. 
- [다음] 버튼을 누르면 “2. 본인인증” 화면으로 넘어간다.  
- 각 필수 동의 항목에 체크를 하지 않고 [다음] 버튼 클릭 시 각 항목별 체크에 대한 Alert 창 나타남 

*확인 사항 : 마케팅 개인정보 활용 동의(선택)문구 확인

### [본인인증]
![본인인증](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/본인인증.jpg)
- 본인인증은 아직 구현되지 않아, 본인인증 클릭 시 3.회원정보 입력 페이지로 이동한다. 

### [회원정보 입력]
![signup1](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/signup1.jpg)
- 통합회원 가입 시 3. 회원정보입력 화면으로 회원의 기본정보를 입력할 수 있는 화면  
- 필수 정보 : 아이디, 비밀번호, 비밀번호 확인, 주소
- 선택정보 : 이메일 
- 부가정보 : 결혼 여부, 결혼기념일, 직업, 관심분야 

### [가입완료]
![success](https://github.com/YeJinAhn/crewmate-internship/blob/main/file/signup2.jpg)
- 통합회원 가입 시 3. 회원정보입력이 정상적으로 완료되어 회원가입이 완료되면 나타나는 화면 
- [NEPA Mall 홈으로 가기] 버튼을 누르면 네파 메인 페이지로 이동한다. 
- [로그인하기] 버튼을 누르면 로그인 페이지로 이동한다. 