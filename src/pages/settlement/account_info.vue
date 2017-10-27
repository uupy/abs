<template>
    <section class="panel-main" :style="styles">
        <el-row>
            <el-col class="toolbar toolbar-top">
                <span class="title">托管账户信息</span>
            </el-col>
            <el-col :span="18">
                <table class="table-info">
                    <tbody>
                        <tr v-for="(item,index) in accountInfos" :key="index">
                            <td class="label" width="18%">{{item.label}}</td> 
                            <td class="value">{{item.value}}</td>
                        </tr>
                    </tbody>
                </table>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    export default {
        data(){
            return {
                accountInfos:[
                    {label:'开户名称',value:'abc有限公司'},
                    {label:'开户银行',value:'中国工商银行'},
                    {label:'账号',value:'123456'},
                ]
            } 
        },
        mixins:[Common],
        methods:{
            
        },
        mounted(){
            const self = this;
            self.$nextTick(()=>{
                
            });
        },
        watch:{
            
        },
        destroyed(){
        }
    }
</script>

