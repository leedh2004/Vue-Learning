<template>
    <div class="ball" :style="styleFunc">{{number}}</div>
</template>
<script>
export default {
    props:{
        number: Number,
    },
    computed: {
        styleFunc() {
            let background;
            if(this.number<10){
                background = 'red';
            }
            else if(this.number<20){
                background = 'orange'
            }
            else if(this.number<30){
                background = 'yellow'
            }
            else if(this.number<40){
                background = 'green'
            }else{
                background = 'blue'
            }
            return{ 
                background
            }
        }
    },
}
</script>
<style scoped>
    .ball{
        display: inline-block;
        width:40px;
        height:40px;
        border : 1px solid black;
        border-radius: 50%;
        line-height: 40px;
        font-size:20px;
        text-align: center;
        margin-right:20px;
    }
</style>