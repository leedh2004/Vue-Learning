import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex); //반드시 연결해주어야 함.

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICK_MINE: -6,
    OPENED: 0, // 0 이상이면 다 OPENED
}
const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((arr, v) => v);
    let shuffle = [];
    while (candidate.length > row * cell - mine) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const data = [];
    for (let i = 0; i < row; i++) {
        const rowdata = [];
        for (let j = 0; j < cell; j++) {
            rowdata.push(CODE.NORMAL);
        }
        data.push(rowdata);
    }
    for (let i = 0; i < shuffle.length; i++) {
        let col = shuffle[i] % 10;
        let row = Math.floor(shuffle[i] / 10);
        data[col][row] = CODE.MINE;
    }
    return data;
}

export default new Vuex.Store({ // import store from './store' *** export default로 부르면 이름을 바꿀 수 있다.
    state: { //vue의 data와 비슷
        tableData: [],
        data: {
            row: 0,
            cell: 0,
            mine: 0,
        },
        timer: 0,
        halted: true,
        result: '',
        opened: 0,
    },
    getters: { //vue의 computed와 비슷
    },
    mutations: { //state를 수정할때 사용, 동기적으로
        [START_GAME](state, { row, cell, mine }) {
            state.data = { row, cell, mine }; // 구조체 안에 값을 일일이 바꾸면 배열값을 바꾸는것처럼 적용안될수도 있다.
            state.tableData = plantMine(row, cell, mine);
            state.timer = 0;
            state.halted = false;
        },
        [OPEN_CELL](state, { row, cell }) {
            const checked = [];

            function checkAround(row, cell) {
                checked.push(row + '/' + cell);

                let ret = 0;
                let dy = [-1, -1, -1, 0, 0, 1, 1, 1];
                let dx = [0, 1, -1, 1, -1, 0, 1, -1];

                for (let i = 0; i < 8; i++) {
                    let ny = row + dy[i];
                    let nx = cell + dx[i];
                    if (ny >= 0 && nx >= 0 && ny < state.data.row && nx < state.data.cell) {
                        if (state.tableData[ny][nx] === CODE.MINE) {
                            ret += 1;
                        }
                    }
                }

                if (ret == 0) {
                    for (let i = 0; i < 8; i++) {
                        let ny = row + dy[i];
                        let nx = cell + dx[i];
                        if (ny >= 0 && nx >= 0 && ny < state.data.row && nx < state.data.cell) {
                            if (!checked.includes(ny + '/' + nx))
                                checkAround(ny, nx);
                        }
                    }
                }
                if (state.tableData[row][cell] === CODE.NORMAL) state.opened++;
                return Vue.set(state.tableData[row], cell, ret);
            }
            checkAround(row, cell);
            console.log(state.opened, state.data.row * state.data.cell - state.data.mine);
            if (state.opened === state.data.row * state.data.cell - state.data.mine) {
                state.halted = true;
                state.result = `${state.timer}초만에 승리하셨습니다.`;
            }
        },
        [CLICK_MINE](state, { row, cell }) {
            Vue.set(state.tableData[row], cell, CODE.CLICK_MINE);
        },
        [FLAG_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.MINE)
                Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
            else
                Vue.set(state.tableData[row], cell, CODE.FLAG);
        },
        [QUESTION_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE)
                Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
            else
                Vue.set(state.tableData[row], cell, CODE.QUESTION);
        },
        [NORMALIZE_CELL](state, { row, cell }) {
            if (state.tableData[row][cell] === CODE.FLAG_MINE)
                Vue.set(state.tableData[row], cell, CODE.MINE)
            else
                Vue.set(state.tableData[row], cell, CODE.NORMAL)
        },
        [INCREMENT_TIMER](state) {
            state.timer += 1;
        }
    },
    actions: { //비동기를 사용할 때, 또는 여러 mutation을 사용할때
    }
})