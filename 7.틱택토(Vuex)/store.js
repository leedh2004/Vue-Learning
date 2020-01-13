import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex); //반드시 연결해주어야 함.

export const SET_WINNER = 'SET_WINNER'; // import { SET_WINNER, NO_WINNER } from './store' *** export const로 부르면 이름을 바꿀 수 없다.
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({ // import store from './store' *** export default로 부르면 이름을 바꿀 수 있다.
    state: { //vue의 data와 비슷
        tableData: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        turn: 'O',
        winner: '',
    },
    getters: { //vue의 computed와 비슷

    },
    mutations: { //state를 수정할때 사용, 동기적으로
        [SET_WINNER](state, winner) { //대문자 사용이 Community 규칙
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {
            Vue.set(state.tableData[row], cell, state.turn);
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O';
        },
        [RESET_GAME](state) {
            state.tableData = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            state.turn = 'O';
        },
        [NO_WINNER](state) {
            state.winner = '';
        }
    },
    actions: { //비동기를 사용할 때, 또는 여러 mutation을 사용할때

    }
})