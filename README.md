# 45-2nd-headbanger-backend
Back_End : 이지은, 장인석(Product_Manager), 탁호진(Project_Manager)
Front_End : 김준섭, 김태원 , 이수빈 , 이소진

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

- 소셜로그인 api 로 구현
- 

[BE]

- OAuth 2.0의 플로우를 사용한 Kakao RestAPI 방식의 소셜 로그인

---------------

#### 로그인 페이지

[FE]

- 소셜로그인 api 로 구현
- 

[BE]

- OAuth 2.0의 플로우를 사용한 Kakao RestAPI 방식의 소셜 로그인

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

- 무한스크롤을 구현
- 체크박스로 필터링 기능 구현
- 캠프 이름 검색시 포함된 이름이 다 노출되게 구현
- 인기순, 가격순 정렬기능 구현 
- 카카오 외부 api 를 이용해서 맵 기능 구현

[BE]

- 동적 필터링 구현
- theme , region , amenity 기준으로 원하는 데이터를 반환
- 정렬이 없거나 가격순, 인기순으로 정렬가능하게 쿼리문 구현

---------------

#### 상품 상세 페이지

[FE]

- 
[BE]

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

