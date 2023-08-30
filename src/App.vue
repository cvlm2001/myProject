<script setup>
import { ref, reactive, watch, onBeforeUpdate, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
import Cookies from 'js-cookie'
// import commod from './views/commodity.vue'
import cartImage from '@/assets/icon-cart.png'
let intValue = ref('')
const router = useRouter()
const route = useRoute()

const instan = getCurrentInstance()
const intDate = instan.appContext.config.globalProperties
let cook = reactive({ user: intDate.$cookies.get("token") })


let title = [{
    name: "FUN肆爱 甜出圈"
}, {
    name: "当季新品"
}, {
    name: "人气热销"
}, {
    name: "男子"
}, {
    name: "女子"
}, {
    name: "儿童"
}]
let backGround = [{
    img: '/src/image/icon-profile.png',
}, {
    img: cartImage,
}, {
    img: '/src/image/icon-cs.png'
}]
let user = reactive(JSON.parse(localStorage.getItem('login')))

watch(route, () => {
    if (intDate.$cookies.get("token") != null) {
        cook.user = intDate.$cookies.get("token")
        // console.log(cook.user);
    }
    num=0
    if (localStorage.getItem('cart') == null) {
        num = 0
    } else {
        JSON.parse(localStorage.getItem('cart')).forEach(() => {
            num++
        })
    }
})
const login = () => {
    router.push({ name: 'login' })
}
const goHome = () => {
    router.push({ name: 'home' })
}
let search = reactive([])

const goCommodity = () => {
    search = reactive([])

    if (intValue == '') {
        alert('请重新输入')
    } else {
        sessionStorage.clear('search')
        let com = JSON.parse(localStorage.getItem('commod'))
        com.forEach(item => {
            if (item.title.indexOf(intValue.value) != -1) {
                search.push(item)
            }
        });
        sessionStorage.setItem("search", JSON.stringify(search));
        router.push({ path: 'commodity', query: { t: Date.now() } })

    }
    intValue.value = ''
    // console.log(JSON.parse(sessionStorage.getItem('search')))
}
let gotoShop = (index) => {
    if (index == 1) {
        router.push({ name: 'shopCart' })

    } else if (index == 0) {
        router.push({ path: '/order/' })


    }
}
let num = reactive(0)

let gotoCom = () => {
    router.push({ name: 'commodity' })
}
</script>

<template>
    <div class="content" style="user-select: none;">
        <div class="header">
            <div class="head_left">
                <div>
                    <ul class="h_left_nav">
                        <li @click="goHome()" class="bacImage"></li>
                        <li class="title" v-for="(item, index) in title" @click="gotoCom()" :key="item">{{ item.name }}</li>
                    </ul>
                </div>
            </div>
            <div class="head_right">
                <ul class="right">
                    <li v-if="cook.user == null">
                        <span style="cursor: pointer;">注册</span>
                        <span>|</span>
                        <span style="cursor: pointer;" @click="login()">登录</span>
                    </li>
                    <li v-else>
                        欢迎
                    </li>
                    <li class="shopCart" v-for="(item, index) in backGround" :key="item"
                        :style="{ backgroundImage: 'url(' + item.img + ')' }" @click="gotoShop(index)">{{ index == 1 ? num :
                            '' }}</li>
                    <li>
                        <input v-model="intValue" @keyup.enter.native="goCommodity()" type="text" />
                    </li>

                </ul>

            </div>
        </div>
        <div>
            <commod style="display: none;" :info="search"></commod>
            <RouterView></RouterView>
        </div>

        <div class="footer">
            <hr>
            <div class="footCont">
                <div class="tail" v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" :key="item">
                    <h1>男的</h1>
                    <p class="cont" v-for="items in [1, 2, 3, 4, 5, 6, 7]" :key="items">内容</p>
                </div>
            </div>

        </div>
    </div>
</template>

<style scoped>
* {
    list-style: none;
    margin: 0;
    padding: 0;
}

.content {
    width: 1200px;
    margin: auto;

    .header {
        display: flex;
        justify-content: space-between;
        line-height: 64px;

        .head_left {
            .h_left_nav {
                display: flex;
                cursor: pointer;

                .bacImage {
                    width: 120px;
                    height: 14px;
                    margin: auto;
                    background: url(./image/icon-logo.png) no-repeat;
                    background-size: 120px, 14px;
                }

                .title {
                    font-weight: 600;
                    margin: 0 10px;
                }
            }

        }

        .head_right {
            .right {
                display: flex;

                .shopCart {
                    width: 64px;
                    height: 64px;
                    text-align: center;
                    background: 16px 17px no-repeat;
                    background-size: 32px 32px;
                    margin: auto;
                }
            }


        }
    }

    .footer {
        margin-top: 40px;

        .footCont {
            margin-top: 30px;
            display: flex;
            flex-wrap: wrap;

            .tail {
                width: 230px;
                margin-right: 10px;
                margin-bottom: 20px;
                text-align: center;

                .cont {}
            }
        }

    }
}
</style>
