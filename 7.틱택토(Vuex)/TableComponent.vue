<template>
    <table>
        <tr-component v-for="(rowData, idx) in tableData" :key="idx" :row-data="rowData" :row-index="idx"></tr-component>
    </table>
</template>

<script>
    import TrComponent from './TrComponent' 
    export default{
        components:{
            TrComponent,
        },
        computed:{
            tableData(){
                return this.$store.state.tableData;
            }
        }
    }
</script>
<style scoped>
    
</style>