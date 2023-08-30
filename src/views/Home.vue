<template>
    <div>
        <div>
            <el-carousel :interval="5000" arrow="always" height="auto">
                <el-carousel-item v-for="item in Carousel" :key="item" style="height: 439px">
                    <img class="carImage" :src="item.img" alt="" />
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="commodity">
            <div class="Single">
                <hr />
                <p class="single_com">热卖单品</p>
            </div>
            <div class="list-box">
                <div class="Product" v-for="(item, index) in commodity" :key="index" @click="gotoDetails(item)">
                    <img :src="item.src" alt="" />
                    <p @click="change()">
                        {{item.title}}
                    </p>
                    <p style="text-decoration: line-through">￥{{ item.oldPrice }}.00</p>
                    <p>￥{{ item.newPrice }}.00</p>
                </div>
            </div>
            <div class="street">
                <div class="strTitle">
                    <img src="../image/logo.png" alt="">
                    <span>街头先型</span>
                </div>
                <div class="strCont">
                    <div class="strList" v-for="item in [1, 2]" :key="item">
                        <img src="../image/toutsbig.jpg" alt="">
                        <p>彩虹系列</p>
                        <p><img src="../image/arrow.png" alt="">查看更多</p>
                    </div>
                </div>
                <div class="strTitle">
                    <img src="../image/logo.png" alt="">
                    <span>至酷精选 玩转潮流</span>
                </div>
                <div class="strCont">
                    <div class="strList" v-for="item in [1, 2, 3]" :key="item">
                        <img src="../image/TOUTS.jpg" alt="">
                        <p>彩虹系列</p>
                        <p><img src="../image/arrow.png" alt="">查看更多</p>
                    </div>
                </div>
            </div>
            <div class="care">
                <h1>关注CONVERSE</h1>
                <p>Converse同时活跃在各类社交网络平台，点击下列你所喜爱的常用社交平台，密切关注Converse的最新产品与资讯。</p>
                <div class="careImage">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import cartImage from '@/image/shoe.png'
import newShoe from '@/image/new.png'
import Bnew from '@/image/1B_NEW.png'
import pink from '@/image/pink.png'
import wonmen from '@/image/wonmen.png'
import man from '@/image/man.png'


const router = useRouter()

let Carousel = [
    {
        img: "/src/image/lb1.png",
    },
    {
        img: "/src/image/lb2.jpg",
    },
    {
        img: "/src/image/lb3.jpg",
    },
];
let commodity = reactive([{
    id: 1,
    src: cartImage,
    size: 36,
    switch:false,
    state:true,
    num:1,
    title: '【小童】Chuck 70经典男高帮帆布童鞋黑',
    oldPrice: 564,
    newPrice: 456
}, {
    id: 2,
    src: Bnew,
    size: 36,
    switch:false,
    state:true,
    num:1,
    title: '【男女同款】1970S男女高帮帆布鞋青提绿苹果绿多巴胺',
    oldPrice: 321,
    newPrice: 234
}, {
    id: 3,
    size: 36,
    switch:false,
    state:true,
    src: newShoe,
    num:1,
    title: '【男女同款】复古76 男女皮质星箭板鞋',
    oldPrice: 456,
    newPrice: 216
}, {
    id: 4,
    size: 36,
    switch:false,
    state:true,
    num:1,
    src: pink,
    title: '【男款】Run Star Legacy CX夹心厚底鞋丹宁风潮',
    oldPrice: 789,
    newPrice: 456
}, {
    id: 5,
    size: 36,
    switch:false,
    state:true,
    num:1,
    src: wonmen,
    title: '【女款】1970S低帮帆布鞋火龙果粉多巴胺色',
    oldPrice: 478,
    newPrice: 356
}, {
    id: 6,
    size: 36,
    switch:false,
    state:true,
    num:1,
    src: man,
    title: '【男女】Chuck 70 Marquis男女厚底鞋',
    oldPrice: 765,
    newPrice: 432
},]);
localStorage.setItem("commod", JSON.stringify(commodity))
const change = () => {
    console.log(1111);
    Vue.$set();
    Carousel[0].img = "/src/image/lb3.jpg";
};
const gotoDetails = (item) => {
    sessionStorage.setItem("key", JSON.stringify(item));
    router.push({ name: 'details' })
}


</script>
<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.carImage {
    width: 100%;
    height: 100%;
}

.commodity {

    margin-top: 60px;
    /* padding: 0 100px; */

    .Single {
        text-align: center;

        .single_com {
            display: inline-block;
            width: 140px;
            position: relative;
            top: -42px;
            background-color: white;
            font-weight: 600;
            font-size: 20px;
        }
    }

    .list-box {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        flex-wrap: wrap;
        flex: 1;
    }

    .Product {
        flex: none;
        width: 290px;
        text-align: center;
        box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        margin-right: 10px;
        
        &:nth-child(4n) {
            margin-right: 0;
        }
    }
    .Product:hover{
        box-shadow: 0px 15px 12px rgba(0, 0, 0, 0.5);
        
        }

    .street {
        .strTitle {
            display: flex;
            background-color: #464646;
            padding: 10px;
            margin-bottom: 20px;

            >span {
                margin-left: 20px;
                color: white;
                font-size: 22px;
                font-weight: 600;
            }
        }

        .strCont {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .strList {
                >p:nth-of-type(1) {
                    font-weight: 600;
                }

                >p:nth-of-type(2) {
                    >img {
                        margin-right: 10px;
                    }
                }
            }
        }
    }

    .care {
        height: 400px;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        background-color: #464646;

        .careImage {
            display: flex;
            justify-content: center;

            >div {
                width: 70px;
                height: 70px;
            }

            >div:nth-of-type(1) {
                background: url(/src/image/share.png) -81px -2px no-repeat;
                margin-right: 30px;
            }

            >div:nth-of-type(1):hover {
                background: url(/src/image/share.png) -4px -2px no-repeat;

            }

            >div:nth-of-type(2) {
                background: url(/src/image/share.png) -81px -75px no-repeat;
            }

            >div:nth-of-type(2):hover {
                background: url(/src/image/share.png) -4px -75px no-repeat;

            }
        }
    }
}
</style>
