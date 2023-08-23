<template>
    <div class="inner">
        <div class="commod">
            <div class="content">
                <h1>搜索的内容为</h1>
            </div>
            <div class="Single">
                <hr />
                <p class="single_com">产品</p>
            </div>
            <div class="list-box">
                <div class="Product" v-for="(item, index) in commodity" :key="index" @click="gotoDetails(item)">
                    <img :src="item.src" alt="" />
                    <p>
                        {{item.title}}
                    </p>
                    <p style="text-decoration: line-through">￥{{item.oldPrice}}.00</p>
                    <p>￥{{ item.newPrice }}.00</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {  reactive,onBeforeUpdate } from "vue";
import { useRouter } from "vue-router";
const props=defineProps(['info'])
console.log(props.info);
const router =useRouter()
let commodity = reactive('');

commodity=JSON.parse(sessionStorage.getItem("search"))
onBeforeUpdate(()=>{
commodity=JSON.parse(sessionStorage.getItem("search"))
    console.log(1);
})
const gotoDetails=(item)=>{
    sessionStorage.setItem("key",JSON.stringify(item));
    router.push({name:'details'})
}
</script>
<style scoped>
.inner{
    display: flex;
    justify-content: center;
    .commod{
        width: 900px;
        .content{
            text-align: center;
            margin: 80px 0;
        }
    }
    
}
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

        &:nth-child(3n) {
            margin-right: 0;
        }
    }
</style>