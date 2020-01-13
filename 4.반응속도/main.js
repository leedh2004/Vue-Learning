import Vue from 'vue';
import ResponseCheck from './ResponseCheck' //webpack config의 resolve 옵션때문에 확장자 .vue를 붙이지 않아도 된다.
new Vue(ResponseCheck).$mount('#root'); // el 역할