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
            <h3 @click="collect()" style="color:brown;">收藏</h3>
            <p class="size">
                <span>尺码</span>
                <el-input-number style="width: 80px;" v-model="commodity.size" :min="36" :max="45" size="small" />
            </p>
            <p class="number">
                <span>数量</span>
                <el-input-number style="width: 80px;" v-model="commodity.num" :min="1" :max="5" size="small" />
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
let commodity = reactive()
commodity = JSON.parse(sessionStorage.getItem("key"))
let shopCart
let gotoShop = () => {
    let shopNum = 0
    let idNum = 0
    let shopId = []
    let shopswit=false
    if (localStorage.getItem('login') != null) {
        if (JSON.parse(localStorage.getItem('cart')) == null) {
            localStorage.setItem('cart', JSON.stringify([commodity]))
            shopCart = reactive(JSON.parse(localStorage.getItem('cart')))
            router.push({ name: 'shopCart' })
        } else {

            shopCart = reactive(JSON.parse(localStorage.getItem('cart')))
            shopCart.forEach(item => {
                shopNum++
                shopId.push(item.id)
                
            });
            shopCart.forEach((item) => {
                if (item.id == commodity.id) {
                    if (item.size == commodity.size) {
                        console.log('尺码=');
                        item.num++
                        item.type = true
                    } else {
                        shopCart.forEach((items,index)=>{
                            if (items.id==commodity.id&&items.size==commodity.size) {
                                items++
                                shopswit=true
                            }
                        })
                        if(!shopswit){
                            console.log('尺码不=');
                            shopCart.push(commodity)
                        }

                    }
                } else {
                    idNum++
                }
            })
            if (idNum == shopNum) {
                console.log(333);
                shopCart.push(commodity)
            }
            localStorage.setItem('cart', JSON.stringify(shopCart))

            router.push({ name: 'shopCart' })

        }
    } else {
        router.push({ name: 'login' })

    }
}
let coll = reactive([])
let collect = () => {//收藏
    if (localStorage.getItem('collect') == null) {
        coll = reactive([])
    } else {
        coll = JSON.parse(localStorage.getItem('collect'))
    }
    coll.push(commodity)
    localStorage.setItem('collect', JSON.stringify(coll))
    router.push({ path: 'order/collect' })
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
