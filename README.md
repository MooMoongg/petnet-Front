# 펫네트워크(Pet-Netwrok)
![image](https://github.com/user-attachments/assets/fd792e67-41ae-45bd-9b8c-83a0bb7be8d1)


## 목차
- [개요](#개요)
- [시스템 구성도](#시스템-구성도)
- [ERD](#ERD)
- [Back-End 개발](#Back-End 개발)
- [리뷰](#리뷰)
- [트러블슈팅 & 피드백](#트러블슈팅--피드백)
- [느낀 점](#느낀-점)
- [API 문서](#API-문서)
- [구현 기능](#구현-기능)
- [배포](#배포)

## 개요
펫네트워크(PET-NETWORK)는 분산되어 있던 반려동물 쇼핑몰, 가계부, 커뮤니티, 동반 지도, 포인트 상점 등 다수의 서비스를 하나로 통합하여 사용자가 더욱 편리하고 폭넓은 경험을 누릴 수 있도록 기획된 올인원 플랫폼입니다. 
기존에 쇼핑몰은 쇼핑몰대로, 커뮤니티는 커뮤니티대로 따로 접근해야 했던 번거로움을 해소하고, 지출 내역 역시 쇼핑 정보를 기반으로 자동 기록함으로써 반려동물을 위한 소비 패턴을 체계적으로 관리할 수 있게 하였습니다. 또한 정보 공유에 적극적인 반려인들이 커뮤니티를 통해 자유롭게 의견을 주고받고, 동반 지도 기능으로 반려동물과 함께 갈 수 있는 장소를 간편하게 확인하도록 지원합니다. 나아가 플랫폼 내 활동을 통해 적립한 포인트로 편의점상품을 구매할 수 있도록 하여 유저의 참여도를 높이는 동시에 혜택을 제공하는 선순환 구조를 구축하고자 하였습니다. 

## 아키텍처 구조
![image](https://github.com/user-attachments/assets/e64aa413-80d6-4e52-9f14-d208c779e437)

## ERD
![image](https://github.com/user-attachments/assets/2a38a0b0-4ba6-4655-a79d-912a60c7e056)


## Back-End 개발
Back-End 요청/응답 흐름
기본적인 Back-End 요청/응답의 흐름은 Controller - Service - Mapper 로 이어지는 구조입니다.
![image](https://github.com/user-attachments/assets/c7cb0a0d-5629-4e5d-a4ae-736ed307e440)

더 자세한 흐름은,

1.User <-> React
사용자가 React 프론트엔드에서 특정 작업(예: 버튼 클릭, 데이터 요청 등)을 수행합니다.
React는 Axios나 Fetch API 등을 사용하여 백엔드로 HTTP 요청을 보냅니다.

2.React <-> RestController
React에서 보낸 HTTP 요청은 백엔드의 RestController로 전달됩니다.
예를 들어, /api/cashbook/expense 경로에 대해 요청이 오면 해당 컨트롤러의 메서드가 실행됩니다.
요청 데이터를 기반으로 적절한 작업을 수행할 수 있도록 Service 계층에 위임합니다.

3.RestController <-> Service
RestController는 비즈니스 로직 처리를 위해 Service를 호출합니다.
이 단계에서는 데이터를 가공하거나 요청의 유효성을 검사합니다.
Service는 세부 로직 처리를 위해 ServiceImpl로 작업을 위임합니다.

4.Service <-> ServiceImpl
Service는 인터페이스 역할을 하며, 구체적인 비즈니스 로직은 ServiceImpl에서 처리됩니다.
데이터베이스 작업이 필요하면 Mapper를 호출합니다.

5.ServiceImpl <-> Mapper
ServiceImpl은 Mapper(Java 인터페이스)를 호출하여 SQL 쿼리를 실행합니다.
MyBatis가 Mapper(Java 인터페이스)와 Mapper(XML)를 연결하여 실제 SQL 쿼리를 실행합니다.

6.Mapper <-> DB
Mapper(XML)에 작성된 SQL이 실행되어 데이터베이스와 통신합니다.
데이터베이스에서 데이터를 조회하거나 삽입/수정/삭제 작업을 수행합니다.
DB에서 반환된 결과는 Mapper를 통해 ServiceImpl로 전달됩니다.

7.ServiceImpl -> Service -> RestController
ServiceImpl에서 처리된 결과가 Service를 거쳐 RestController로 반환됩니다.
이 과정에서 비즈니스 로직이 완료되고, 사용자 요청에 맞는 응답 데이터가 준비됩니다.

8.RestController -> React
RestController는 준비된 데이터를 JSON 형식으로 React에 반환합니다.
예를 들어, 조회된 데이터 리스트나 작업 성공 여부를 응답합니다.

9.React -> User
React는 백엔드에서 전달받은 데이터를 화면에 렌더링합니다.
사용자는 화면을 통해 데이터를 확인하거나 결과를 확인합니다.
