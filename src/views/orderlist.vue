<template>
    <div class="housing">
        <div class="inner">
            <div class="header">
                <h2>现有订单</h2>
            </div>
            <hr>
            <div class="content" v-for="(item, index) in order" :key="index">
                <div class="head">
                    <p>
                        订单号码
                        <span>{{ allprice[index].model }}</span>
                    </p>
                    <p>
                        订单总计
                        <span>￥{{ allprice[index].sum }}.00</span>
                    </p>
                </div>
                <div class="middle">
                    <div class="mid_left">
                        <p>订单日期:{{ allprice[index].time }}</p>
                        <p>支付状态
                            <span v-if="order[index][0].state">待付款</span>
                            <span v-else>已付款</span>

                        </p>
                    </div>
                    <div class="mid_right" v-if="order[index][0].state">
                        <p @click="payment(index)">现在付款</p>
                        <p @click="del(index)">取消订单</p>
                    </div>

                </div>
                <div class="footer">
                    <div class="order" :class="{ hide: item.lamp }">
                        <div class="order_head">
                            您的订单
                        </div>
                        <div class="order_cont" v-for="items in item" :key="items">
                            <div>
                                <img :src="items.src" alt="">
                            </div>
                            <div>
                                <p>{{ items.title }}</p>
                                <p>型号</p>
                                <p>码数：{{ items.size }}</p>
                                <p>数量：{{ items.num }}</p>
                            </div>
                            <div>
                                ￥{{ items.num * items.newPrice }}.00
                            </div>
                        </div>
                        <div class="price">
                            <span>订单总计</span>
                            <span>￥{{ allprice[index].sum }}.00</span>
                        </div>
                    </div>
                    <div class="more" @click="seeMore(item)">
                        <p :class="{ hide: !item.lamp }">
                            更多细节
                            <span></span>
                        </p>
                        <p :class="{ hide: item.lamp }">
                            关闭
                            <span class="bac"></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
let order = reactive(JSON.parse(localStorage.getItem('order')))
order.forEach(item => {
    item.lamp = true
});
let allprice = reactive(JSON.parse(localStorage.getItem('sum')))
let seeMore = (item) => {
    item.lamp = !item.lamp

}
let payment = (index) => {

    order[index][0].state=false
    localStorage.setItem('order',JSON.stringify(order))

}
let del = (index) => {
    order.splice(index, 1)
    localStorage.setItem('order', JSON.stringify(order))
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

        .hearder {}

        .content {
            border: 1px solid #ccc;
            padding: 20px;
            padding-bottom: 0;
            margin-bottom: 40px;

            .head {
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #ccc;

                >p:nth-of-type(1) {
                    font-size: 22px;
                    font-weight: 600;

                    >span {
                        font-weight: 400;
                    }
                }

                >p:nth-of-type(2) {
                    color: brown;
                    font-size: 12px;

                    >span {
                        font-size: 22px;
                    }
                }
            }

            .middle {
                display: flex;
                justify-content: space-between;

                .mid_left {}

                .mid_right {
                    >p {
                        text-align: center;
                        width: 180px;
                        height: 50px;
                        line-height: 50px;
                    }

                    >p:nth-of-type(1) {
                        background-color: #c62127;
                        color: white;
                    }

                    >p:nth-of-type(2) {
                        background-color: #b7b7b7;
                        color: white;
                    }
                }
            }

            .footer {
                display: flex;
                flex-flow: column;
                align-items: center;

                .order {
                    width: -webkit-fill-available;

                    .order_head {
                        font-weight: 600;
                        font-size: 20px;
                        padding-bottom: 20px;
                        border-bottom: 1px solid #ccc;
                    }

                    .order_cont {
                        display: flex;
                        justify-content: space-between;
                        margin-top: 20px;
                        border-bottom: 1px solid #ccc;

                        >div {
                            >img {
                                width: 160px;
                            }
                        }

                        >div:nth-last-of-type(1) {
                            font-weight: 600;
                        }
                    }

                    .price {
                        display: flex;
                        color: #c62127;
                        justify-content: end;
                        margin-top: 10px;

                        >span:nth-of-type(1) {
                            margin-right: 100px;
                        }
                    }
                }

                .more {
                    display: flex;
                    width: -webkit-fill-available;
                    justify-content: center;
                    font-size: 18px;
                    color: #666;
                    margin: 20px 0;
                    border-top: 1px dashed #ccc;
                    cursor: pointer;

                    >p {
                        width: 180px;
                        height: 50px;
                        border: 1px solid #ccc;
                        text-align: center;
                        line-height: 50px;

                        >span {
                            display: inline-block;
                            width: 35px;
                            height: 20px;
                            background: url(../image/sprites_account.png) 0px -192px no-repeat;
                        }

                        .bac {
                            background: url(../image/sprites_account.png) 0px -218px no-repeat;
                        }
                    }

                }

            }
        }

        .footer {}
    }
}</style>