# command test
1. --port
CLI: parcel --port {number}
정의한 포트로 호스팅.
2. --host
CLI: parcel --host {0.0.0.0}
정의한 호스트만 연결을 허용?함.
3. --open
CLI: parcel --open {"firefox"|"safari"}
기본 브라우저가 아닌 다른 브라우저를 default로 지정함.
chrome과 edge는 듣지 않음.

# compile n bundle
- import() 구문을 사용할 수 있음. 
- 컴파일한 번들 파일에서는 commonJS 모듈 문법인 require로 자동으로 바꾸어 놓음. 
>exam
* app.js
[File code => Bundle code]
require('./main.css') => require('./main.css')
import('./main.css') => require('./main.css')
## SASS
@Link[https://parceljs.org/languages/sass/]
webpack과 달리 트랜스파일링, 로더등의 기능이 번들러 자체에 내장되어 있어서 기본적인 설정조차 필요없음.
1. html에서 직접 참조가 가능.
>exam
`<link rel="stylesheet" href="style.scss">
2. js에서 아래의 예와 같이 참조 가능하다 하나 최신버전 - 2.2.1 - 에서 확인해보니 제대로 동작하지 않음.
>exam
import * as style from 'style.module.scss|css'; /or/ import style from 'style.module.scss|css';
document.body.className = style.body;

3. 번들러 커맨드로 직접 css로 컴파일도 가능함. .sassrc 파일을 만들어 관련 설정하는 것을 권장. 
## Image asset
### SVG
