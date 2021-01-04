## Project

- 카테고리 별로 목표를 관리할 수 있는 웹 어플리케이션입니다.

- 생산성 도구인 크롬 확장 프로그램 [Momentum](https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=ko)을 사용하던 중 할일 목록을 여러개의 카테고리로 나누어서 관리할 수 없다는 점이 불편해서 [Notion Templage](https://www.notion.so/Notion-Template-Gallery-181e961aeb5c4ee6915307c0dfd5156d)을 참고하여 필요한 기능을 추가해 만든 Todo 어플리케이션 입니다.

- https://ibtg.github.io/todo/

---

### Skill Stack

- HTML
- CSS
- JavaScript

---

## Features

- 반응형으로 웹을 만들었고 local storage에 입력한 정보들을 저장해서 새로고침 하더라고 입력한 정보가 유지되도록 하였습니다.

- 다음과 같은 웹 브라우저 환경에서 동작합니다.

  - Chrome (87.0)

  - Microsoft Edge (87.0)

  - Firebox (83.0)

  - Naver Whale (2.8)

- 아래는 해당 어플리케이션에 구현된 기능에 대한 상세 설명입니다.

### ToDo

- 할 일을 최대 10개까지 입력할 수 있습니다.

- 네모 박스를 눌러 완료한 일을 체크하거나 삭제 버튼을 눌러 입력한 목록 삭제할 수 있습니다.

### Darkmode

- 오른쪽 상단의 버튼을 눌러서 다크모드를 활성화 시킬 수있습니다

### Drag and Drop

- 추가한 목록을 드래그해서 다른 카테고리로 이동시킬 수 있습니다.

### Quotes

- [https://type.fit/api/quotes](https://type.fit/api/quotes) API 사용
- 매일 새로운 명언을 가져와서 해당 명언의 저자와 함께 화면에 표시해줍니다

### Weather

- [https://openweathermap.org/api](https://openweathermap.org/api) API 사용

- 사용자의 위치를 파악해서 섭씨 온도를 표시하고 날씨에 따라 다른 모양의 아이콘 표시합니다.

### Time

- 오늘의 요일, 월, 일과 AM, PM으로 시간, 분, 초가 오른쪽 하단에 표시됩니다

### Search

- 왼쪽 상단에 키워드를 입력하면 검색 결과가 구글 검색 결과가 새 창에서 표시됩니다
