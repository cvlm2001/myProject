<template>
    <div class="housing">
        <div class="inner">
            <div class="header">
                <h2>您的购物车:0件商品</h2>
                <p>
                    <span>全选</span>
                    <span>您已选中0件商品</span>
                </p>
            </div>
            <hr>
            <div class="content" v-for="item in [1, 2, 3, 4]" :key="item">
                <div class="select">
                    <div></div>
                    <div>
                        <span></span>
                        <span>删除</span>
                    </div>
                </div>
                <div class="shopping">
                    <div class="image">
                        <img src="../image/shoe.png" alt="">
                    </div>
                    <div class="title">
                        <p>【男女同款】Run Star Legacy CX男女夹心厚底鞋</p>
                        <p>型号：A00868C281</p>
                        <p>颜色：白色</p>
                        <p>尺码：43</p>
                    </div>
                    <div class="price">
                        <p>
                            ￥123.00
                        </p>
                        <p>
                            <span>数量 </span>
                            <el-input-number style="width: 80px;" v-model="num" :min="1" :max="5" size="small" />
                        </p>

                    </div>
                </div>
            </div>
            <hr>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
let num = ref(1)
let content = reactive([])
let cart = localStorage.getItem('cart')
content.push(cart)

</script>
<style scoped>
.bac {
    background: url(../image/checked.png) no-repeat;

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

.content {
    border-bottom: 1px dashed #ccc;
    margin-bottom: 40px;

    .select {
        display: flex;
        justify-content: space-between;

        >div:nth-of-type(1) {
            width: 20px;
            background: url(../image/check.png) no-repeat;
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
</style>