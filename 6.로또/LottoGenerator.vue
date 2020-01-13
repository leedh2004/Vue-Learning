<template>
    <div>
        <div>당첨 숫자</div>
        <div id="결과창">
            <lotto-ball :key="ball" v-for="ball in winBalls" :number="ball"></lotto-ball>
        </div>
        <div>보너스</div>
        <lotto-ball v-if="bonus" :number="bonus"></lotto-ball>
        <button v-if="redo" @click="onClickRedo">한번 더</button>
    </div>
</template>

<script>
    import LottoBall from './LottoBall';
    const timeouts = [];
    function getNumbers() {
        const candidate = Array(45).fill().map((v, i) => i + 1);
        const shuffle = [];
        while (candidate.length > 0) {
            shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
        }
        const bonusNumber = shuffle[shuffle.length - 1];
        const winNumbers = shuffle.slice(0, 6).sort((a, b) => a - b);
        return [winNumbers, bonusNumber];
    }
    export default{
        components:{
            'lotto-ball' : LottoBall,
        },
        data(){
           return{
               winNumbers:getNumbers(),
               winBalls:[],
               redo:false,
               bonus: null,
           }
       },
       mounted(){
           this.showBalls();
       },
       beforeMount() {
           timeouts.forEach((t)=>{
               clearTimeout(t);
           })
       },
       methods: {
           showBalls(){
                for(let i=0; i<this.winNumbers[0].length; i++){
                    timeouts[i] = setTimeout(()=>{
                        this.winBalls.push(this.winNumbers[0][i]);
                    },(i+1)*1000);
                }
                timeouts[6] = setTimeout(()=>{
                    this.bonus = this.winNumbers[1];
                    this.redo = true;
                }, 7000);
            },
            onClickRedo(){
                this.winNumbers=getNumbers()
                this.winBalls=[]
                this.redo=false
                this.bonus=null
            }
       },
       watch:{
           winBalls(val, oldVal){
               if(val.length === 0){
                   this.showBalls();
               }
           }
       }
    }
</script>
<style scoped>
    
</style>