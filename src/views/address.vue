<template>
    <div class="housing">
        <div class="inner">
            <div class="header">
                <h2>地址</h2>
            </div>
            <hr>
            <div class="middle" v-for="(item, index) in site" :key="item">
                <div class="head" v-if="site != ''">
                    <div class="which">
                        <span>{{ index + 1 }}</span>
                    </div>
                    <div class="edit">
                        <span @click="edit(item, index)"><span></span>编辑</span>
                        <span @click="del(index)"><span></span>移除</span>
                    </div>
                </div>
                <div class="content" v-if="site != ''">
                    <p>
                        <span>收货人</span>
                        <span>: {{ item.person }}</span>
                    </p>
                    <p>
                        <span>收货地</span>
                        <span>: {{ item.city[0] + item.city[1] + item.city[2] + item.detail }}</span>
                    </p>
                    <p>
                        <span>手机号码</span>
                        <span>: {{ item.phone }}</span>
                    </p>
                    <p>
                        <span>邮箱</span>
                        <span>: {{ item.mail }}</span>
                    </p>
                </div>
                <div class="footer" v-if="site != ''">
                    <p class="default">
                        <span @click="change(item, index)" :class="{ bac: item.default, bac_check: !item.default }"></span>
                        设置为默认收货地址
                    </p>
                </div>
            </div>
            <div class="address" v-show="swit.kg">
                <p>
                    <span>收货人</span>
                    <input v-model="addredd.person" type="text">
                </p>
                <p>
                    <span>手机号码</span>
                    <input v-model="addredd.phone" type="text">
                </p>
                <p>
                    <span>邮箱</span>
                    <input v-model="addredd.mail" type="text">
                </p>
                <p class="select">
                    <span>所在省市</span>
                <div>
                    <el-dropdown trigger="click" @command="handleCommand" :hide-on-click="true">
                        <span class="el-dropdown-link">
                            {{ addredd.city[0] == '' ? '请选择省' : addredd.city[0] }}<el-icon
                                class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in town" :key="item" :command="item.province">{{ item.province
                                }}</el-dropdown-item>

                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div v-if="addredd.city[0] != ''">
                    <el-dropdown trigger="click" @command="handcity" :hide-on-click="true">
                        <span class="el-dropdown-link">
                            {{ addredd.city[1] == '' ? '请选择市' : addredd.city[1] }}<el-icon
                                class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in town[cityIndex].market" :key="item" :command="item.city">{{
                                    item.city }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                <div v-if="addredd.city[1] != ''">
                    <el-dropdown trigger="click" @command="county" :hide-on-click="true">
                        <span class="el-dropdown-link">
                            {{ addredd.city[2] == '' ? '请选择县' : addredd.city[2] }}<el-icon
                                class="el-icon--right"><arrow-down /></el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item v-for="item in town[cityIndex].market[countyIndex].county" :key="item"
                                    :command="item">{{ item }}</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
                </p>
                <p>
                    <span>详细地址</span>
                    <input v-model="addredd.detail" type="text">
                </p>
                <p class="save">
                    <span @click="cancel()">取消</span>
                    <span @click="save()">保存</span>
                </p>
            </div>
            <div class="add" @click="add()">
                <p>
                    添加新地址
                </p>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
let swit = reactive({ kg: false, switch: false, editIndex: '' })
const add = () => {//添加
    swit.kg = reactive(true)
}
const cancel = () => {//取消
    swit.kg = reactive(false)
    addredd = reactive(
        {
            person: '',
            phone: '',
            mail: '',
            default: false,
            city: ['', '', ''],
            detail: ''
        }
    )
}
let town = reactive([{//地址
    province: '江西',
    market: [{
        city: '南昌',
        county: ['南昌县', '高新区', '新建区']
    }, {
        city: '九江',
        county: ['柴桑区', '濂溪区', '浔阳区']
    }]
}, {
    province: '江苏',
    market: [{
        city: '南京',
        county: ['鼓楼区', '玄武区', '江宁区']
    }, {
        city: '常州',
        county: ['天宁区', '钟楼区',]
    },
    {
        city: '苏州',
        county: ['姑苏区', '虎丘区', '吴中区']
    }]
}

])
let site = reactive([])
if (localStorage.getItem('address') == null) {
    site = reactive([])
} else {
    site = reactive(JSON.parse(localStorage.getItem('address')))
}
let addredd = reactive(
    {
        person: '',
        phone: '',
        mail: '',
        default: false,
        city: ['', '', ''],
        detail: ''
    }
)
let cityIndex = ref(0)
const handleCommand = (command) => {//省份
    addredd.city[0] = command
    addredd.city[1] = ''
    addredd.city[2] = ''
    town.forEach((item, index) => {
        if (item.province == command) {
            cityIndex.value = index
        }
    })
}
let countyIndex = ref(0)
let handcity = (command) => {//市区
    addredd.city[1] = command
    addredd.city[2] = ''
    // console.log(town[cityIndex.value].market);
    town[cityIndex.value].market.forEach((item, index) => {
        if (item.city == command) {
            countyIndex.value = index
        }
    })
}
let county = (command) => {//县
    addredd.city[2] = command
}
const edit = (item, index) => {//编辑地址
        console.log(item);
        addredd.person = item.person,
        addredd.phone = item.phone,
        addredd.mail = item.mail,
        addredd.default = item.default,
        addredd.city = [item.city[0], item.city[1], item.city[2]],
        addredd.detail = item.detail
        swit.switch=true
        swit.editIndex=index
    add()
}
const del = (index) => {//删除
    site.splice(index,1)
    let num=0
    site.forEach((item)=>{
        if(item.default==false){
            num++
        }
    })
    console.log(num);
    if(num==site.length&&num!=0){
        site[0].default=true
    }
    localStorage.setItem('address',JSON.stringify(site))
}
const change = (item, index) => {//默认地址
    site.forEach((items) => {
        items.default = false
    })
    site[index].default = !site[index].default
    localStorage.setItem('address', JSON.stringify(site))
    site = reactive(JSON.parse(localStorage.getItem('address')))


}
const save = () => {
    if (addredd.person == '') {
        alert('姓名不能为空')
    } else if (addredd.phone == '') {
        alert('手机号不能为空')
    } else if (addredd.mail == '') {
        alert('邮箱不能为空')
    } else if (addredd.city[0] == '') {
        alert('省份不能为空')
    } else if (addredd.city[1] == '') {
        alert('市区不能为空')
    } else if (addredd.city[2] == '') {
        alert('县区不能为空')
    } else if (addredd.detail == '') {
        alert('地址不能为空')
    } else {
        if(!swit.switch){
        site.push(addredd)
        if(site.length==1){
            site[0].default=true
        }
        console.log(11);
    }else{
        console.log(22);
        swit.switch=false
        
        site[swit.editIndex]=addredd
    }
        localStorage.setItem('address', JSON.stringify(site))
        addredd = reactive(
            {
                person: '',
                phone: '',
                mail: '',
                default: false,
                city: ['', '', ''],
                detail: ''
            }
        )
        swit.kg = reactive(false)
    }
}
</script>
<style scoped>
.example-showcase .el-dropdown+.el-dropdown {
    margin-left: 15px;
}

.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}

.bac {
    background: url(../image/checked.png) no-repeat !important;
}

.bac_check {
    background: url(../image/check.png) no-repeat !important;
}

.housing {
    display: flex;
    justify-content: center;

    .inner {
        width: 700px;

        .hearder {}

        .middle {
            border-bottom: 1px dashed #ccc;

            .head {
                display: flex;
                justify-content: space-between;
                margin: 10px 0;

                .which {
                    >span {
                        color: #333;
                        font-size: 18px;
                        font-weight: 600;
                    }
                }

                .edit {
                    >span {
                        font-size: 13px;
                    }

                    >span:nth-child(1) {
                        margin-right: 30px;
                        display: inline-flex;

                        >span {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            margin-right: 10px;
                            background: url(../image/sprite1.png) -2px -120px no-repeat;
                        }
                    }

                    >span:nth-child(2) {
                        display: inline-flex;

                        >span {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            margin-right: 10px;
                            background: url(../image/sprite1.png) -25px -117px no-repeat;
                        }
                    }
                }
            }

            .content {
                background-color: #333;
                padding: 10px 30px;

                >p {
                    font-size: 12px;
                    color: white;

                    >span:nth-of-type(1) {
                        display: inline-block;
                        width: 100px;
                    }
                }
            }

            .footer {
                .default {
                    display: flex;

                    >span {
                        display: inline-block;
                        width: 30px;
                        height: 30px;
                        /* background: url(../image/check.png) no-repeat; */
                    }
                }
            }
        }

        .address {
            margin-bottom: 100px;

            >p {

                >span {
                    display: inline-block;
                    width: 80px;
                    font-size: 12px;
                }

                >input {
                    border: 1px solid #ccc;
                    outline: none;
                    width: 300px;
                    height: 25px;
                    background-color: white;
                    color: #666;
                }
            }

            .select {
                display: flex;

                >div {
                    margin-right: 20px;

                    >span {}
                }
            }

            .save {
                margin-top: 50px;

                >span {
                    display: inline-block;
                    width: 150px;
                    height: 40px;
                    cursor: pointer;

                    color: white;
                    text-align: center;
                    line-height: 40px;
                }

                >span:nth-child(1) {
                    background-color: #ccc;
                    margin-right: 10px;

                }

                >span:nth-child(2) {
                    background-color: black;

                }
            }
        }

        .add {

            >p {
                cursor: pointer;
                background-color: black;
                width: 160px;
                color: white;
                height: 35px;
                text-align: center;
                line-height: 35px;
            }
        }
    }
}
</style>