<template>
    <section class="panel-main" :style="styles">
        <el-row>
            <el-col class="toolbar toolbar-top">
                <span class="title">结算详情</span>
            </el-col>
            <el-col :span="18">
                <table class="table-info">
                    <tbody>
                        <tr v-for="(item,index) in settledInfos" :key="index">
                            <td class="label" width="18%">{{item.label1}}</td> 
                            <td class="value">{{item.value1}}</td>
                            <td class="label" width="18%">{{item.label2}}</td> 
                            <td class="value">{{item.value2}}</td>
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
                settledInfos:[
                    // {label1:'资产编号',value1:'ZCA01171019001',label2:'应收账款金额',value2:'2,000,000'},
                    // {label1:'供应商',value1:'供应商1',label2:'项目公司',value2:'项目公司1'},
                    // {label1:'发行日期',value1:'2017-10-10',label2:'到期日',value2:'2017-10-10'},
                    // {label1:'回款日期',value1:'2017-10-10',label2:'回款金额',value2:'2,000,000'},
                    // {label1:'融资天数',value1:'300',label2:'',value2:''},
                    // {label1:'发行利率',value1:'0.786',label2:'利息',value2:'0.5%'},
                    // {label1:'税金',value1:'1,500',label2:'其他费用',value2:'300'},
                    // {label1:'余款',value1:'0',label2:'息费状态',value2:'已结清'},
                    // {label1:'余款状态',value1:'已清算',label2:'',value2:''},

                    {label1:'资产编号',value1:'ZCA01171019001',label2:'发行利率',value2:'0.786'},
                    {label1:'供应商',value1:'供应商1',label2:'利息',value2:'0.5%'},
                    {label1:'项目公司',value1:'项目公司1',label2:'税金',value2:'1,500'},
                    {label1:'应收账款金额',value1:'2,000,000',label2:'其他费用',value2:'300'},
                    {label1:'发行日期',value1:'2017-10-10',label2:'余款',value2:'0'},
                    {label1:'到期日',value1:'2017-10-10',label2:'息费状态',value2:'已结清'},
                    {label1:'回款日期',value1:'2017-10-10',label2:'余款状态',value2:'已清算'},
                    {label1:'回款金额',value1:'2,000,000',label2:'',value2:''},
                    {label1:'融资天数',value1:'300',label2:'',value2:''},
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

