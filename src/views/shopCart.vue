<template>
    <div class="under" v-if="cartShop == null">
        暂无商品
    </div>
    <div class="housing" v-else>
        <div class="inner">
            <div class="header">
                <h2>您的购物车:{{ sum.lenght }}件商品</h2>
                <p class="allSelect" @click="allSelect()">
                    <span :class="{ bac: allSel }"></span>
                    <span>全选</span>
                </p>
            </div>
            <hr>
            <div class="content" v-for="item in cartShop" :key="item">
                <div class="select">
                    <div @click="select(item)" :class="{ bac: item.switch, bac_check: !item.switch }"></div>
                    <div style="cursor: pointer;" @click="del(item, index)">
                        <span></span>
                        <span>删除</span>
                    </div>
                </div>
                <div class="shopping">
                    <div class="image">
                        <img :src="item.src" alt="">
                    </div>
                    <div class="title">
                        <p>{{ item.title }}</p>
                        <p>型号：A00868C281</p>
                        <p>颜色：白色</p>
                        <p>尺码：{{ item.size }}</p>
                    </div>
                    <div class="price">
                        <p>
                            ￥{{ item.newPrice * item.num }}.00
                        </p>
                        <p>
                            <span>数量 </span>
                            <el-input-number @change="add()" style="width: 80px;" v-model="item.num" :min="1" :max="5"
                                size="small" />
                        </p>

                    </div>
                </div>
            </div>
            <hr>
            <div class="total">
                <p>总计:<span>￥{{ sum.num }}.00</span></p>
                <p @click="settlement()">提交订单</p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import router from '../router';

let cartShop = reactive(JSON.parse(localStorage.getItem('cart')))
let sum = reactive({ num: 0, lenght: 0 })
let price = []
// watch(cartShop, () => {
//     if (cartShop == '') {
//         sum.lenght = reactive(0)
//         localStorage.removeItem('cart')
//     } else {
//        
//     }

// })
let totalPrice = () => {
    sum.num = 0
    sum.lenght = 0
    let x = reactive([])
    cartShop.forEach(item => {
        sum.lenght++
        if (item.switch == true) {
            x.push(item.num * item.newPrice)
        }
    });
    x.forEach((item) => {
        sum.num += item
    })
    // console.log(sum.num);
}
if (cartShop != null) { totalPrice() }


let add = () => {
    totalPrice()
}
const del = (item, index) => {
    cartShop.splice(index, 1)
    if (cartShop != '') {
        localStorage.setItem('cart', JSON.stringify(cartShop))
    } else {
        localStorage.removeItem('cart')
    }
}
let select = (item) => {
    item.switch = !item.switch
    console.log(item.switch);
    let shop = ref(0)
    cartShop.forEach(item => {
        if (item.switch == true) {
            shop.value++
        }
        if (shop.value == sum.lenght) {
            allSel = true
        } else {
            allSel = false

        }
    })
    totalPrice()
}

let allSel = ref(false)
let allSelect = () => {
    allSel = !allSel
    cartShop.forEach(item => {
        if (allSel == true) {
            item.switch = true

        } else {
            item.switch = false
        }
    })
    totalPrice()
}
let order
let ordList = reactive([])
let allprice
let settlement = () => {
    //结算
    let address = JSON.parse(localStorage.getItem('address'))
    let edit
    let ordList = reactive([])
    if (address == null) {
        alert('请添加地址')
        router.push({ path: 'order/address' })
    } else {
        totalPrice()

        if (JSON.parse(localStorage.getItem('order')) == null) {
            order = reactive([])
        } else {
            order = reactive(JSON.parse(localStorage.getItem('order')))
        }
        if (JSON.parse(localStorage.getItem('sum')) == null) {
            allprice = reactive([])
        } else {
            allprice = reactive(JSON.parse(localStorage.getItem('sum')))

        }
        let date = new Date().getFullYear() + ' ' + new Date().getMonth() + ' ' + new Date().getDate()
        allprice.push({ sum: sum.num, time: date, model: Date.now() })
        console.log(allprice);

        cartShop.forEach((item, index) => {
            if (item.switch == true) {
                ordList.push(item)
            }
        })
        ordList.forEach((item) => {
            let index = cartShop.indexOf(item)
            cartShop.splice(index, 1)
            if (cartShop != '') {
                localStorage.setItem('cart', JSON.stringify(cartShop))

            } else {
                localStorage.removeItem('cart')
            }

        })
        address.forEach((item) => {
            if (item.default) {
                edit = item
            }
        })
        ordList[0].address = edit
        console.log(ordList);
        console.log(edit);
        order.push(ordList)
        if (ordList != '') {
            localStorage.setItem('order', JSON.stringify(order))
            localStorage.setItem('sum', JSON.stringify(allprice))


            router.push({ path: '/order/' })

        } else {
            alert('请选择商品')
        }
        
    }
}


</script>
<style scoped>
.under {
    display: flex;
    justify-content: center;
    margin: 100px 0 500px 0;
    font-size: 22px;
    font-weight: 600;
}

.bac {

    background: url(../image/checked.png) no-repeat !important;

}

.bac_check {
    background: url(../image/check.png) no-repeat;
}

.housing {
    display: flex;
    justify-content: center;
}

.inner {
    width: 1000px;

    >.content:nth-last-of-type(1) {
        border: 0;
    }
}

.allSelect {
    display: flex;

    >span:nth-of-type(1) {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(../image/check.png) no-repeat;
        margin-right: 10px;
    }

}


.content {
    border-bottom: 1px dashed #ccc;
    margin-bottom: 40px;

    .select {
        display: flex;
        justify-content: space-between;

        >div:nth-of-type(1) {
            width: 20px;

        }

        >div:nth-of-type(2) {
            display: flex;

            >span:nth-of-type(1) {
                display: inline-block;
                width: 20px;
                height: 20px;
                background: url(../image/cart.png) -25px -117px no-repeat;
                margin-right: 10px;
            }
        }
    }

    .shopping {
        display: flex;
        justify-content: space-between;

        .image {
            flex-grow: 1;
            text-align: center;

            >img {
                width: 150px;
                height: 150px;
            }
        }

        .title {
            flex-grow: 1;

        }

        .price {
            flex-grow: 2;
            display: flex;
            flex-flow: column;
            align-items: end;


        }
    }


}

.total {
    display: flex;
    flex-flow: column;
    align-items: end;

    >p:nth-of-type(1) {
        font-size: 22px;
        font-weight: 600;

        /* padding-right: 30px; */
        >span {
            display: inline-block;
            width: 200px;
            text-align: end;
            color: #b63330;
        }
    }

    >p:nth-of-type(2) {
        width: 200px;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
        background: #b63330;
    }
}
</style>