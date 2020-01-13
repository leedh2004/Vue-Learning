<template>
    <div>
       <div id=computer :style=computedStyleObject></div>
       <div>
           <button @click="onButtonClick('바위')">바위</button>
           <button @click="onButtonClick('가위')">가위</button>
           <button @click="onButtonClick('보')">보</button>
       </div>
       <div>{{result}}</div>
       <div>{{score}}점</div>
    </div>
</template>

<script>
    let interval = null;
    const scores = {
        '가위' : 1,
        '바위' : 0,
        '보' : -1 
    };
    const rspCoords = {
        '바위' : '0px',
        '가위' : '-142px',
        '보' : '-284px'
    };
    const computerChoice = (imgCoord) => {
        return Object.entries(rspCoords).find(function(v){
            return v[1] === imgCoord;
        })[0];
    }
    export default{
        data(){
            return{
                imgCoord : rspCoords.바위,
                result : '',
                score : 0,
            };
        },
        computed:{
            computedStyleObject(){
                return {
                    background: `url(http://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`
                };
            }
        },
        methods:{
             start() {
                interval = setInterval(()=>{
                    if(this.imgCoord === rspCoords.바위){
                        this.imgCoord = rspCoords.가위;
                    }
                    else if(this.imgCoord === rspCoords.가위){
                        this.imgCoord = rspCoords.보;
                    }
                    else if(this.imgCoord === rspCoords.보){
                        this.imgCoord = rspCoords.바위;
                    }
                }, 100);
            },
            onButtonClick(choice){
                clearInterval(interval);
                let myChoice = scores[choice];
                let cpuChoice = scores[computerChoice(this.imgCoord)];
                // console.log(choice, computerChoice(this.imgCoord));
                let diff = myChoice - cpuChoice;
                if (diff === 0){
                    this.result = '비겼습니다';
                }else if ([-1, 2].includes(diff)){
                    this.result = '이겼습니다';
                    this.score += 1;
                }else{
                    this.result = '졌습니다';
                    this.score -= 1;
                }
                setTimeout(()=>{
                    this.start();
                } ,1000)
            },
        },
        created(){
            console.log('created');
        },
        mounted() {
            console.log('mounted');
            this.start();
        },
        updated() {
        },
        beforeDestroy() {
            console.log('beforeDestroy');
            clearInterval(interval);
        },
        destroyed() {
            
        },
    }
</script>
<style scoped>
    #computer{
        width: 142px;
        height: 200px;
        background-position: 0 0;
    }
</style>