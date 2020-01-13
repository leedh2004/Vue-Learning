<template>
    <div>
        <mine-form />
        <div>{{timer}}</div>
        <table-component></table-component>
        <div>{{result}}</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import store, { INCREMENT_TIMER } from './store' // Vuex를 사용하려면 최상위 컴포넌트와 연결해주어야 함.
    import TableComponent from './TableComponent'
    import MineForm from './MineForm'
    let interval;

    export default{
        store, // Vuex를 사용하려면 최상위 컴포넌트와 연결해주어야 함.
        components:{
            TableComponent,
            MineForm,
        },
        computed:{
            ...mapState(['timer', 'result', 'halted']),
        },
        watch:{
            halted(value, oldValue) {
                if(value === false){
                    //게임 시작
                    interval = setInterval( () => {
                        this.$store.commit(INCREMENT_TIMER);
                    }, 1000);
                }else{ //게임중단
                    clearInterval(interval);
                }
            }
        }
    }
</script>
<style>
    table {
        border-collapse: collapse;
    }
    td {
        border:1px solid black;
        text-align: center;
        width:40px;
        height:40px;
    }
</style>