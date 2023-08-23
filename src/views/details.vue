<template>
    <div v-if="commodity != ''" class="details">
        <div class="details_left">
            <h2>{{ commodity.title }}

            </h2>
            <h2 class="price">
                <p>价格</p>
                <p style="text-decoration: line-through">￥{{ commodity.oldPrice }}.00</p>
                <p>￥{{ commodity.newPrice }}.00</p>
            </h2>
            <img :src="commodity.src" alt="">
            <div class="shoe_img">
                <img :src="commodity.src" alt="">
                <img :src="commodity.src" alt="">
                <img :src="commodity.src" alt="">
                <img :src="commodity.src" alt="">
                <img :src="commodity.src" alt="">
            </div>
        </div>
        <div class="details_right">
            <img :src="commodity.src" alt="">
            <p>颜色:黑色</p>
            <p>型号:A0705C001</p>
            <hr>
            <h3>尺码换算器</h3>
            <p class="size">
                <span>尺码</span>
                <el-input-number style="width: 80px;" v-model="sizeNum" :min="36" :max="45" size="small" />
            </p>
            <p class="number">
                <span>数量</span>
                <el-input-number style="width: 80px;" v-model="num" :min="1" :max="5" size="small" />
            </p>
            <p class="buy">立即购买</p>
            <p class="shopCart" @click="gotoShop()">加入购物车</p>
        </div>
    </div>
    <div v-else>
        暂无商品
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router';
let router = useRouter()
const num = ref(1)
const sizeNum = ref(36)
let commodity = reactive()
commodity = JSON.parse(sessionStorage.getItem("key"))
let shopCart = reactive([JSON.parse(localStorage.getItem('cart'))])
let gotoShop = () => {
        localStorage.setItem('cart', JSON.stringify(commodity))
    router.push({ name: 'shopCart' })
}



</script>
<style scoped>
.details {
    display: flex;
    justify-content: center;

    .details_left {
        margin-right: 100px;
        display: flex;
        flex-flow: column;
        align-items: center;

        .price {
            display: flex;
        }

        >img {
            width: 400px;
        }

        .shoe_img {
            display: flex;

            >img {
                width: 80px;
                border: 1px solid #ccc;
                margin-right: 40px;
            }

            :nth-last-of-type(1) {
                margin-right: 0;
            }
        }
    }

    .details_right {
        width: 200px;

        >img {
            width: 80px;
            border: 1px solid #ccc;
        }

        .size,
        .number {
            display: flex;
            justify-content: space-between;

            >input {
                width: 50px !important;
            }
        }

        .buy,
        .shopCart {
            height: 50px;
            text-align: center;
            line-height: 50px;
            cursor: pointer;
        }

        >p {
            margin-top: 30px;
        }

        .buy {
            background-color: black;
            color: white;

        }

        .shopCart {
            border: 1px solid black;
            color: black;
        }

    }

}
</style>
