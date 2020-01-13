<template>
    <td @click=onClickTd>{{cellData}}</td>
</template>
<script>
import {CLICK_CELL, SET_WINNER, RESET_GAME, NO_WINNER, CHANGE_TURN} from './store';
import { mapState } from 'vuex';
export default {
    props:{
        rowIndex : Number,
        cellIndex : Number,
    },
    computed:{ //Vuex의 state를 쓰기 위해서는 반드시 computed에 연결해주어야 한다.
        ...mapState({
            // tableData:  state.tableData,
            // turn:  state.turn,
            // cellData:  state.tableData[this.rowIndex][this.cellIndex],
             tableData: state => state.tableData,
             turn: state => state.turn,
             cellData(state) { return state.tableData[this.rowIndex][this.cellIndex] },
        }),
        
        tableData(){
            return this.$store.state.tableData;
        },
        turn(){
            return this.$store.state.turn;
        },
        cellData(){
            return this.$store.state.tableData[this.rowIndex][this.cellIndex];
        }
        
    },
    methods:{
        onClickTd(){
            if(this.cellData) return;
            this.$store.commit(CLICK_CELL, {row: this.rowIndex, cell: this.cellIndex});
            let win = false;
            let rowIndex = this.rowIndex;
            let cellIndex = this.cellIndex;
            const t = this.tableData;
            console.dir(t);
            console.log(rowIndex, cellIndex);
            if(t[rowIndex][0] === t[rowIndex][1] && t[rowIndex][1] === t[rowIndex][2] && t[rowIndex][0] != ''){
                win = true;
            }else if(t[0][cellIndex] === t[1][cellIndex] && t[1][cellIndex] === t[2][cellIndex] && t[0][cellIndex] != ''){
                win = true;
            }else if(t[0][0] === t[1][1] && t[1][1] === t[2][2] && t[0][0] != ''){
                win = true;
            }else if(t[0][2] === t[1][1] && t[1][1] === t[2][0] && t[0][2] != ''){
                win = true;
            }
            console.log("here");
            if(win){
                this.$store.commit(SET_WINNER, this.$store.state.turn);
                this.$store.commit(RESET_GAME);
            }else{
                let all = true;
                t.forEach((row)=>{
                    row.forEach((cell) => {
                        if (!cell) all = false;
                    })
                })
                if(all){
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                }else{
                    this.$store.commit(CHANGE_TURN);
                }
            }
        }
    }
}
</script>
<style scoped>

</style>