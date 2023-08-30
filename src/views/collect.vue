<template>
    <div class="housing">
        <div class="inner">
            <div class="header">
                <h2>收藏</h2>
            </div>
            <hr>
            <div class="content" v-for="(item,index) in collect" :key="item">
                <div class="cont_left">
                    <img :src="item.src" alt="">
                </div>
                <div class="cont_right">
                    <div class="cont_top">
                        <div>
                            <p>{{ item.title }}</p>
                        </div>
                        <div>
                            <p @click="del(item,index)">
                                <span></span>
                                删除
                            </p>
                            <p>￥{{ item.newPrice }}.00</p>
                        </div>
                    </div>
                    <div class="cont_bottom">
                        <p @click="gotoShop(item)">添加到购物车</p>
                    </div>
                </div>

            </div>
            <div v-if="collect==''">
                无收藏
            </div>
        </div>
        
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import{useRouter} from 'vue-router'
const router=useRouter()
let collect =reactive( JSON.parse(localStorage.getItem('collect')))
console.log(collect=='');
let shopCart
let gotoShop = (item) => {
    console.log(item);
        if (JSON.parse(localStorage.getItem('cart')) == null) {
            localStorage.setItem('cart', JSON.stringify([item]))
            shopCart = reactive(JSON.parse(localStorage.getItem('cart')))
            router.push({ name: 'shopCart' })
        } else {

            shopCart = reactive(JSON.parse(localStorage.getItem('cart')))
            shopCart.forEach(items => {
                if (items.id != item.id) {
                    shopCart.push(item)
                } else {
                    items.num++
                }
            });
            localStorage.setItem('cart', JSON.stringify(shopCart))

            router.push({ name: 'shopCart' })

        }
    
}
let del=(item,index)=>{
collect.splice(index,1)
localStorage.setItem('collect',JSON.stringify(collect))
}
</script>
<style scoped>
.hide {
    display: none;

}

.housing {
    display: flex;
    justify-content: center;

    .inner {
        width: 700px;

        .content {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ccc;

            .cont_left {
                flex-grow: 2;

                >img {
                    width: 160px;
                    height: 160px;
                }
            }

            .cont_right {
                flex-grow: 5;
                display: flex;
                flex-flow: column;

                .cont_top {
                    display: flex;
                    justify-content: space-between;

                    >div:nth-child(2) {
                        >p:nth-child(1) {
                            display: flex;
                            cursor: pointer;

                            >span {
                                display: inline-block;
                                width: 30px;
                                height: 30px;
                                background: url(/src/image/sprites_account.png) 1px -283px no-repeat;
                                background-size: 25px;
                            }
                        }
                    }
                }

                .cont_bottom {
                    display: flex;
                    justify-content: end;

                    >p {
                        margin: 0;
                        width: 180px;
                        height: 40px;
                        color: white;
                        text-align: center;
                        line-height: 40px;
                        background-color: brown;
                    }
                }
            }
        }

    }
}
</style>