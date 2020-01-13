<template>
    <div>
        <div>{{answer}}</div>
        <form @submit.prevent="onSubmit"> <!-- prevent는 prevent.default -->
            <input type="text" v-model="value" ref="answer" maxlength="4" minlength="4">
            <button type="submit">제출</button>
        </form>
        <div>
            시도: {{tries.length}}
        </div>
        <ul>
            <li :key= "idx" v-for="(t,idx) in tries">
                <div>{{t.try}}</div>
                <div>{{t.result}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
    const getNumbers = () => {
        const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9]
        const array = []
        for(let i=0; i<4; i+=1){
            const chosen = candidates.splice(Math.floor(Math.random()*(9-i)), 1)[0]
            array.push(chosen)
        }
        return array;
    };

    export default {
        data(){
            return {
                answer: getNumbers(),
                value : "",
                tries : [],
            }
        },
        methods:{
            onSubmit(e){
                let result;

                if(this.value === this.answer.join('')){
                    result = '홈런';
                    this.tries = [];
                    this.answer = getNumbers();
                }else{
                    let strike = 0;
                    let ball = 0;
                    let vArray = this.value.split('').map((v)=>parseInt(v));
                    for(let i=0; i<4; i+=1){
                        if(vArray[i] === this.answer[i]) strike +=1;
                        else if (this.answer.includes(vArray[i])) ball +=1;
                    }
                    result = strike + 'S ' + ball + 'B'
                    this.tries.push({
                    try : this.value,
                    result : result,
                    });
                }
                this.value='';
                this.$refs.answer.focus();
            }
        }
    };
</script>
<style>

</style>