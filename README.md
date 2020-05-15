# Login-SignIn Project

회원가입&로그인 과정을 구현하고, 세션 DB를 통해 로그인 세션을 유지하도록 만든 프로젝트.

모든 페이지가 SPA로 동작하도록 구현하였으며, 세션 DB와 유저 DB는 간단한 과정만 구현하기위해 DBMS를 사용하지 않고 lowdb를 활용해 파일로 저장하였습니다. 

## Update News, Version 2!

리팩토링을 거친 Version 2가 개발 중에 있습니다. Version 2는 리팩토링 진행 후 아래 기능을 추가할 예정입니다.

- 사용자 비밀번호 암호화 후 저장
- 서버에서 유저의 회원가입 입력값 검증
- RESTful API로 API 형태 변경
- API 문서화
- 파일 모듈화
- ...

각 기능에 대한 자세한 내용은 [#1 이슈](https://github.com/2ssue/login-project/issues/1)를 통해 확인하실 수 있습니다😀.

## [🏠Version 1 배포 페이지](https://pacific-beyond-61707.herokuapp.com/)

## Install

```bash
$ npm install
```

## Usage

```bash
$ npm start
```

## Tech
module name|description|
---|---|
[Express](https://expressjs.com/)|Fast, unopinionated, minimalist web framework for Node.js|
[lowdb](https://www.npmjs.com/package/lowdb)|⚡️ lowdb is a small local JSON database powered by Lodash (supports Node, Electron and the browser)|
[uuid](https://www.npmjs.com/package/uuid)|Simple, fast generation of RFC4122 UUIDS.|

## Author
Sujeong Lee
- Github: [@2ssue](https://github.com/2ssue)
