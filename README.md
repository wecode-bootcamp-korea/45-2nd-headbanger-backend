# 45-2nd-headbanger-backend
<br>

#### Back_End

- <a href="https://github.com/innichang">장인석(Inseok Chang)<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></a>
- <a href="YOUR_GITHUB_LINK_HERE">이지은<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></a>
- <a href="YOUR_GITHUB_LINK_HERE">탁호진<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></a>

#### Front_End <br>
- <a href="YOUR_GITHUB_LINK_HERE">김태원<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></a>
- <a href="YOUR_GITHUB_LINK_HERE">김준섭<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></a>
- <a href="YOUR_GITHUB_LINK_HERE">이수빈<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></a>
- <a href="YOUR_GITHUB_LINK_HERE">이소진<img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white"></a>

-------------
## 사용한 기술 스택

#### [FE]

<img width="390" alt="스크린샷 2023-06-02 오후 5 02 27" src="https://github.com/wecode-bootcamp-korea/45-2nd-headbanger-backend/assets/125236449/b926031c-2134-4372-9b89-e7bf332827ba">

#### [BE]
<div>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> 
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
  <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white">
  <img src="https://img.shields.io/badge/TypeORM-262627?style=for-the-badge&logo=TypeORM&logoColor=white">
</div>

#### [TOOL]

<div>
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white">
  <img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=Trello&logoColor=white">
  <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white">
</div>

--------------

## 팀이름 : HeadBanger

- 개발자로서 능동적인 소통을 중요시하는 팀 !
- 마치 록 가수 처럼 다른 사람이 말하면 잘 듣고 이해하여 고개를 끄덕인다 라는 의미를 담고 있습니다.


- 페이지 이름 : CVG

## CVG : Camping Very Good!

- 매일 매일 반복되는 피곤한 일상에서부터의 getaway

- 잠시 동안만이라도, 평소 boundary에서 벗어나, 휴식을 취할 수 있는 기회를 제공

- <h4>Product</h4> : 캠핑 존, 각 지역 캠핑 존

- <h4>End User</h4> :꼭 휴가철만이 아니더라도, 가족들과 함께 떠나고 싶은 직장인들, 
            친구들과 함께 추억을 쌓으러 오는 대학생들,
            느긋하게 자연을 즐기려는 장년층,
            남녀노소할 것 없이 모두가 즐기는 서비스
            주 고객층(결제를 진행하는 사람): 20중후반부터
            
--------------

#### 로그인 페이지

[FE]

##### <사용자의 편의성 증대를 위한 카카오 소셜 로그인 API 활용>

- 가장 대중적인 카카오 소셜 로그인 REST API를 사용하여 사용자의 편의성을 높힘
- 로그인 과정에서 발생할 수 있는 대기 시간을 적극적으로 활용하기 위해 로딩 마이크로 애니메이션 페이지 추가

[BE]

##### <회사를 위한 여러가지 전략적 이득을 바탕으로 소셜 로그인 API 활용>

- 대중적인 카카오 REST API를 사용한 이유는 바로, 한국 사람이라면 없으면 이상한 카카오톡을 사용하기 때문
- 카카오 계정이 있다면 단순히 키보드로 정보를 입력해서, 또는 정말 간편하게 핸드폰으로 QR Scan으로 바로 로그인 가능
- 로그인 시도 시, 프론트엔드에서 로그인 승인/인증 요청을 보내 받아오느 access_token을 받아 백에서 카카오 서버로 사용자 정보 요청
- 더욱 더 간편해진 회원가입의 접근성을 바탕으로 더 많은 회원 유치 가능. 

---------------

#### 메인페이지 

[FE]

- 캐러셀
- 카테고리별 캠프 노출
- 테마별 캠프 노출
- 제주도 지역 ( 추천 매달 달라질 예정 ) 캠프 노출

[BE]

- 카테고리별 캠프 데이터 반환
- 테마별 캠프 데이터 반환
- 제주도 등 (매달 달라질 데이터) 필요한 데이터 반환

--------------


#### 리스트 페이지

[FE]

##### <사용자 중심의 상품리스트 페이지 설계>

##### 무한 스크롤
- 사용자 인터페이스의 부드러움을 최대화하기 위해 무한 스크롤 기능 구현 </br>
- 페이지의 끝에 도달하면 자동으로 상품이 로드되어 추가적인 클릭이나 페이지 로딩 시간 없이 </br>
  원활하게 컨텐츠 탐색할 수 있어 사용자 경험을 향상 시킴 </br>

##### 체크박스 필터
- 사용자가 체크박스 선택시 실시간으로 필터링 결과를 확인할 수 있게 하였고, </br>
  다중 선택 필터링을 가능하게 하여 사용자가 원하는 상품을 쉽게 찾을 수 있도록 구현 </br>
- 로컬 스토리지를 활용하여 사용자의 체크박스 선택 상태를 기억하고, 해당 상태가 변경될 때마다 </br>
  동적으로 로컬 스토리지와 URL의 검색 파라미터 업데이트 </br>

##### 캠프 이름 검색
- 검색 기능을 제공하여 사용자가 원하는 캠프를 빠르게 찾을 수 있도록 구현 </br>
- 사용자가 검색창에 입력하면 해당 검색어를 포함하는 캠프의 리스트를 필터링하고, 선택된 검색어는 URL의 </br>
  검색 파라미터로 추가되어 상품 리스트 페이지가 적절하게 업데이트 되도록 구현</br>

##### 정렬 기능
- 사용자의 선택에 따라 인기도 또는 가격순에 따라 상품을 정렬하는 기능을 제공하여, </br>
  더욱 개인화된 사용자 경험을 제공하도록 구현 </br>

[BE]

- 동적 필터링(여러가지 테마/지역/카테고리별) 구현
- 정렬이 없거나 가격순, 인기순으로 정렬가능하게 쿼리문 구현

---------------

#### 상품 상세 페이지

[FE]

- 
[BE]

##### <최소한의 정보로 최대한의 효율을 낼 수 있는 페이지 설계 및 데이터 Response>

- 여러가지 인포그래프와 레이더 차트 활용
- 레이더 차트 구현을 위한 Query를 사용한 평균값 계산
- 프론트의 하드 코딩이 아닌, DB에서 보내주는 조감도와, 조감도의 각 좌표를 이용한, 예약 가능/불가능 Zone 표기

--------------

#### 마이 페이지

[FE]
-

[BE]

- 유저의 예약 내역을 예정된 예약, 지난 예약, 취소된 예약으로 분류하여 데이터 반환
- 유저의 프로필 이미지 등록을 위해 S3, Multer로 이미지 업로드 구현

--------------

#### 결제 페이지 

[FE]

-
[BE]

- 카카오 결제 API를 이용하여 결제 구현
- 결제 시, 결제 정보 및 예약 내역 DB에 

-------------

#### 리뷰 페이지

[FE]

-
[BE]

- 각 리뷰점수 데이터 반환
- 리뷰점수 합계 반환
- 각 리뷰점수 평균치 반환

-------------

