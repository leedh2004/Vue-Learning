<template>
    <div>
        <div id="screen" :class="state" @click="onClickScreen">{{message}}</div>
        <template v-if="result.length">
            <div>평균 시간 {{average}}ms</div> <!-- message만 바껴도 이 값도 재실행되는데, 이 떄 캐싱된 값을 사용하므로 computed를 쓴다.-->
            <button @click="onReset">리셋</button>
        </template>
    </div>
</template>

<script>
    let start;
    let end;
    let timeout = null;
    export default {
        data(){
            return {
                result : [],
                message : '클릭해서 시작하세요',
                state : 'waiting',
            }
        },
        computed:{
            average(){
                return this.result.reduce((a, c)=>a+c, 0) / this.result.length || 0;
            }
        },
        methods:{
            onReset(){
                this.result = []
            },
            onClickScreen(){
                if(this.state === 'waiting'){
                    this.message = '초록색이 되면 클릭하세요'
                    this.state = 'ready'
                    timeout = setTimeout(()=>{
                        this.state = 'now';
                        this.message = '지금 클릭!';
                        start = new Date();
                    }, Math.random()*1000 + 2000);
                }else if(this.state === 'ready'){
                    clearTimeout(timeout);
                    this.state = 'waiting'
                    this.message = '너무 성급하시군요! 초록색때 클릭하세요.'
                }else{
                    end = new Date();
                    this.result.push(end - start);
                    this.state = 'waiting'
                    this.message = '클릭해서 시작하세요'
                }
            },
        }
    };
</script>
<style scoped>
    #screen{
        width: 300px;
        height:  200px;
        text-align: center;
        user-select: none
    }
    #screen.waiting{
        background-color:aqua
    }
    #screen.ready{
        background-color:red;
        color:white
    }
    #screen.now{
        background-color:greenyellow
    }
</style>