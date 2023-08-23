<template>
    <div class="inner">
        <div class="login">
            <div>
                <span>手机</span>
                <input @blur="cPhone" v-model="account.phone" type="text" placeholder="请输入手机号啊">
            </div>
            <p :class="{ redText: isActive }">请输入正确的手机号</p>
            <div>
                <span>账户密码</span>
                <input v-model="account.password" @blur="cPass()" type="text" placeholder="输入密码">
            </div>
            <p :class="{redText:isPass}">请输入正确的手机号</p>

            <div>
                <span>验证码</span>
                <input @blur="cText" v-model="account.test" type="text" placeholder="验证码">
                <p class="code">{{ random }}</p>
                <span class="change" @click="change()">换一张</span>
            </div>
            <p :class="{ redText: isTest }">验证码错误</p>

            <div class="rule">
                <div>
                    <input v-model="checkbox" type="checkbox" @click="checBox()">
                </div>
                <p>
                    我已经阅读并同意匡威的 《使用规则》和《隐私政策》
                </p>
            </div>
            <div class="logNow" @click="login()">
                立即登录
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
const router=useRouter()
let {ctx:that,proxy}=getCurrentInstance()
let random = ref(Math.floor(Math.random() * 9000) + 1000)
let change = () => {
    random.value = Math.floor(Math.random() * 9000) + 1000
}
let account = reactive({
    phone: '',
    password: '',
    test: ''
})
let isActive = ref(false)
let cPhone = () => {
    const phoneNumberRegex = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/
    if (phoneNumberRegex.test(account.phone)) {
        isActive.value = false
    } else {
        isActive.value = true
    }
}
let isPass=ref(false)
let cPass=()=>{
    if(account.password==undefined){
        isPass.value=true
    }else{
        isPass.value=false
    }
}
let isTest = ref(false)
let cText = () => {
    if (account.test == random.value) {
        isTest.value = false
    } else {
        isTest.value = true
    }
}
let checkbox = reactive(false)
let checBox = () => {
    checkbox = !checkbox
}
let login = () => {
    if (isActive.value == false&&account.password!=''&&isTest.value==false&&checkbox==true) {
        localStorage.setItem('login',JSON.stringify(account))
        console.log(account);
        router.push({name:"home",query:{t:Date.now()}})
        that.$forceUpdate();

    }
}
</script>
<style scoped>
.tran {
    color: transparent;
}

.redText {
    color: red !important;
}

.inner {
    display: flex;
    justify-content: center;
    margin: 100px 0;
}

.login {
    width: 500px;
    display: flex;
    flex-flow: column;

    >p {
        color: transparent;
        user-select: none;
        font-size: 12px;
        margin: 30px 0;
    }

    >div {
        border-bottom: 1px solid black;
        /* margin-bottom: 30px; */
        display: flex;

        >span {
            width: 100px;
        }

        >input {
            width: 100%;
            border: 0;
            outline: none;
            background-color: white;
        }

        .code {
            margin: 0;
            width: 180px;
            text-align: center;
            position: relative;
            background-color: white;
            top: 3px;
        }

        .change {
            font-size: 12px;
            cursor: pointer;
            /* position: relative;
            top: 14px; */
            text-align: center;
            width: 70px;
        }
    }

    .rule {
        border: 0;

        >div {
            display: flex;
        }
    }

    .logNow {
        border: 0;
        height: 70px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: black;
    }
}
</style>