<template>
    <div>
        <table-component></table-component>
        <div>{{turn}}님의 턴입니다.</div>
        <div v-if="winner">{{winner}}님의 승리입니다.</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import TableComponent from './TableComponent'
    import store from './store' // Vuex를 사용하려면 최상위 컴포넌트와 연결해주어야 함.
    export default{
        store, // Vuex를 사용하려면 최상위 컴포넌트와 연결해주어야 함.
        components:{
            TableComponent
        },
        data(){
            return{
            }
        },
        computed:{
            ...mapState(['winner', 'turn']), //밑에처럼 일일이 주석처리하면 귀찮잖아.
            // ...mapState({
            //     winner(state){
            //         return state.winner + 1; 참고로 화살표함수에서는 this 못쓴다.
            //     },
            //     turnState:'turn'
            // }) 이런식으로 변형도 가능,

            // turn(){
            //     return this.$store.state.turn;
            // },
            // winner(){
            //     return this.$store.state.winner;
            // }
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