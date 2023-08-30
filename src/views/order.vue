<template>
    <div class="housing">
        <div class="content">
            <div class="inner">
                <h2 class="view">
                    <span></span>
                    查看订单
                </h2>
                <ul>
                    <li @click="gotoOrderlist()"><span></span>订单</li>
                    <li><span></span>退货</li>
                </ul>
            </div>
            <div class="account">
                <h2>
                    <span></span>
                    账户

                </h2>
                <ul>
                    <li><span></span>账户设置</li>
                    <li @click="gotoAddress()"><span></span>地址</li>
                </ul>
            </div>
            <div class="service">
                <h2>
                    <span></span>
                    服务

                </h2>
                <ul>
                    <li><span></span>我的优惠卷</li>
                    <li @click="gotoCollect()"><span></span>我的收藏</li>
                </ul>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
import {useRouter} from 'vue-router'
const router=useRouter()
let gotoOrderlist=()=>{
    router.push({path:'/order/'})
}
let gotoAddress=()=>{
    router.push({path:'/order/address'})

}
let gotoCollect=()=>{
    router.push({path:'/order/collect'})

}
</script>
<style scoped>
* {
    padding: 0;
    list-style: none;
}

.housing {
    display: flex;

    .content {
        width: 200px;
        height: 600px;
        border: 1px solid #ccc;
        margin-right: 50px;
        padding: 10px;

        >div {
            >h2 {
                display: flex;
                border-bottom: 1px solid #ccc;

                >span {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                }

            }

            >ul {
                >li {
                    display: flex;
                    line-height: 30px;
                    >span {
                        display: inline-block;
                        width: 30px;
                        height: 26px;
                        background: url(../image/sprites_account.png)1px -132px no-repeat;

                    }
                }
            }
        }

        .inner {
            >h2 {
                >span {
                    background: url(../image/sprites_account.png)1px -8px no-repeat;

                }
            }
        }

        .account {
            >h2 {
                >span {
                    background: url(../image/sprites_account.png)1px -52px no-repeat;

                }
            }
        }

        .service {
            >h2 {
                >span {
                    background: url(../image/sprites_account.png)1px -95px no-repeat;

                }
            }
        }
    }
}
</style>