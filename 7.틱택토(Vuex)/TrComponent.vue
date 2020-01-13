<template>
    <tr>
        <td-component v-for="(cellData, idx) in rowData" :key="idx" :cell-index="idx" :row-index="rowIndex"></td-component>
    </tr>
</template>

<script>
    import TdComponent from './TdComponent' 
    export default{
        props:{
            rowData : Array,
            rowIndex : Number,
        },
        components:{
            TdComponent,
        }
    }
</script>
<style scoped>
    
</style>