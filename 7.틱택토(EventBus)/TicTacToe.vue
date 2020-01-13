<template>
    <div>
        <table-component :table-data = "tableData"></table-component>
        <div>{{turn}}님의 턴입니다.</div>
        <div>{{result}}</div>
    </div>
</template>

<script>
    import TableComponent from './TableComponent'
    import EventBus from './EventBus'
    export default{
        components:{
            TableComponent
        },
        data(){
            return{
                tableData:[
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                turn:'O',
                result:'',
            }
        },
        methods:{
            onClickTd(rowIndex, cellIndex){
                this.$set(this.tableData[rowIndex], cellIndex, this.turn );
                let win = false;
                const t = this.tableData;
                console.dir(t);
                console.log(t[0][0], t[0][1], t[0][2]);
                if(t[rowIndex][0] === t[rowIndex][1] && t[rowIndex][1] === t[rowIndex][2] && t[rowIndex][0] != ''){
                    win = true;
                }else if(t[0][cellIndex] === t[1][cellIndex] && t[1][cellIndex] === t[2][cellIndex] && t[0][cellIndex] != ''){
                    win = true;
                }else if(t[0][0] === t[1][1] && t[1][1] === t[2][2] && t[0][0] != ''){
                    win = true;
                }else if(t[0][2] === t[1][1] && t[1][1] === t[2][0] && t[0][2] != ''){
                    win = true;
                }
                if(win){
                    this.result = `${this.turn}님의 승리입니다`;
                    this.turn = 'O';
                    this.tableData = [ ['','',''],  ['','',''], ['','',''] ]
                }else{
                    let all = true;
                    t.forEach((row)=>{
                        row.forEach((cell) => {
                            if (!cell) all = false;
                        })
                    })
                    if(all){
                        this.result = `무승부입니다. 게임을 다시 시작합니다.`
                        this.turn = 'O';
                        this.tableData = [ ['','',''],  ['','',''], ['','',''] ]
                    }
                }
                this.turn === 'O' ? this.turn = 'X' : this.turn = 'O';
            }
        },
        created(){
            EventBus.$on('clickTd', this.onClickTd);
        }
    }
</script>
<style>
    table {
        border-collapse: collapse;
        width:300px;
        height:300px;
    }
    td {
        border:1px solid black;
        text-align: center;
        width:100px;
        height:100px;
    }
</style>