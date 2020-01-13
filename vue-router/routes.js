import Vue from 'vue';
import VueRouter from 'vue-router'

import NumberBaseball from '../3.숫자야구/NumberBaseball';
import ResponseCheck from '../4.반응속도/ResponseCheck';
import RockScissorPaper from '../5.가위바위보/RockScissorPaper';
import LottoGenerator from '../6.로또/LottoGenerator';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        { path: '/number-baseball', component: NumberBaseball },
        { path: '/response-check', component: ResponseCheck },
        { path: '/rock-scissor-paper', component: RockScissorPaper },
        { path: '/lotto-generator', component: LottoGenerator },
    ]
});