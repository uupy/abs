<template>
    <section class="panel-main">
        <!-- <el-row class="toolbar">
            <span class="title" style="font-size:16px;">{{protocol.name}}</span>
        </el-row> -->
        <el-row>
            <span class="title" style="font-size:16px;">商务合同信息</span>
            <!-- <el-table :data="businessInfo" class="table-list">
                <el-table-column prop="supplier" label="供应商名称"></el-table-column>
                <el-table-column prop="company" label="项目公司"></el-table-column>
                <el-table-column prop="area" label="所属区域"></el-table-column>         
                <el-table-column prop="projectName" label="项目名称"></el-table-column>         
                <el-table-column prop="contractName" label="商务合同名称"></el-table-column>         
                <el-table-column prop="contractNo" label="商务合同编号"></el-table-column>         
                <el-table-column prop="contractType" label="合同类别"></el-table-column>         
            </el-table> -->

            <el-form label-width='120px' class='item-list'>
                <el-form-item label='供应商名称'>{{businessInfo.supplier}}</el-form-item>
                <el-form-item label='项目公司'>{{businessInfo.company}}</el-form-item>
                <el-form-item label='所属区域'>{{businessInfo.area}}</el-form-item>
                <el-form-item label='合同类别'>{{businessInfo.contractType}}</el-form-item>
                <el-form-item label='项目名称'>{{businessInfo.projectName}}</el-form-item>
                <el-form-item label='商务合同名称'>{{businessInfo.contractName}}</el-form-item>
                <el-form-item label='商务合同编号'>{{businessInfo.contractNo}}</el-form-item>
            </el-form>
        </el-row>
        <el-row>
            <span class="title" style="font-size:16px;">资产信息</span>

            <el-table :data="propertyInfo" border>
                <el-table-column prop="id" label="资产编号"  align='center'></el-table-column>
                <el-table-column prop="status" label="资产状态" align='center'></el-table-column>
                <el-table-column prop="sum" label="应收账款金额" align='center'></el-table-column>         
                <el-table-column prop="sum1" label="保理融资金额" align='center'></el-table-column>         
                <el-table-column prop="submitDate" label="提交数据日期" align='center'></el-table-column>         
                <el-table-column prop="deadline" label="应收账款到期日" align='center'></el-table-column>         
                <el-table-column prop="kuanxian" label="宽限期到期日" align='center'></el-table-column>         
                <el-table-column prop="huaikuanri" label="还款日" align='center'></el-table-column>         
                <el-table-column prop="days" label="融资天数" align='center'></el-table-column>         
            </el-table>
        </el-row>

        <el-row>
            <span class="title" style="font-size:16px;">单据信息</span>
             <el-form label-width='180px' class='item-list'>
                <el-form-item label='单据编号' class='item-inner'>
                    <div class="float-left info">{{billsInfo.id}}</div>
                    <div class="float-left">
                        <!-- <el-button type='primary' size='small'>查看</el-button> -->
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='单据号' class='item-inner'>
                    <div class="float-left info">{{billsInfo.no}}</div>
                    <div class="float-left">
                        <!-- <el-button type='primary' size='small'>查看</el-button> -->
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='ERP审批表/支付申请书' class='item-inner'>
                    <div class="float-left info">{{billsInfo.no}}</div>
                    <div class="float-left">
                        <!-- <el-button type='primary' size='small'>查看</el-button> -->
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
        </el-row>

        <el-row>
            <span class="title" style="font-size:16px;">资产转让信息</span>
             <el-form label-width='180px' class='item-list'>
                <el-form-item label='中登网登记文件' class='item-inner'>
                    <div class="float-left info">{{billsInfo.no}}</div>
                    <div class="float-left">
                        <!-- <el-button type='primary' size='small'>查看</el-button> -->
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                    
                </el-form-item>
                <el-form-item label='资产转让合同（保理公司）' class='item-inner'>
                    <div class="float-left info">{{billsInfo.no}}</div>
                    <div class="float-left">
                        <!-- <el-button type='primary' size='small'>查看</el-button> -->
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>

                <el-form-item label='资产转让合同（专项计划）' class='item-inner'>
                    <div class="float-left info">{{billsInfo.no}}</div>
                    <div class="float-left">
                        <!-- <el-button type='primary' size='small'>查看</el-button> -->
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                protocolId:'',
                protocol:
                {
                    index:'1',
                    id:'pt1001',
                    type:'主合同',
                    name:'协议名称',
                    signatory:'深圳xx公司',
                    sum:'1000万',
                    status:'签约中',   
                    signDate:'2017-10-16',
                    deadline:'2027-10-16'
                },
                businessInfo:{
                    supplier:'深圳xx公司',
                    company:'深圳大唐公司',
                    area:'深圳市宝安区',
                    projectName:'大唐公司签约项目',
                    contractName:'大唐公司签约项目',
                    contractNo:'001',
                    contractType:'工程类',
                },
                propertyInfo:[
                    {
                        id:'110',
                        name:'',
                        sum:'100万',
                        sum:'20万',
                        status:'冻结',
                        submitDate:'2017-10-16',
                        loanDate:'2017-11-16',
                        deadline:'2018-11-16',
                        kuanxian:'2018-11-26',
                        huaikuanri:'2018-11-30',
                        days:'60天'
                    },
                     {
                        id:'110',
                        name:'',
                        sum:'100万',
                        sum:'20万',
                        status:'冻结',
                        submitDate:'2017-10-16',
                        loanDate:'2017-11-16',
                        deadline:'2018-11-16',
                        kuanxian:'2018-11-26',
                        huaikuanri:'2018-11-30',
                        days:'60天'
                    }, 
                    {
                        id:'110',
                        name:'',
                        sum:'100万',
                        sum:'20万',
                        status:'冻结',
                        submitDate:'2017-10-16',
                        loanDate:'2017-11-16',
                        deadline:'2018-11-16',
                        kuanxian:'2018-11-26',
                        huaikuanri:'2018-11-30',
                        days:'60天'
                    }
                ],
                billsInfo:{
                    id:'001',
                    no:'billsx101'
                }        
            }
        },
        methods: {
           handlePreview(){

           },
           handleRemove(){

           }
        },
        watch: {
            
        },
        mixins:[Common,Clients],
        mounted() {
            const self = this;
            console.log('protocolId:',self.$route.params.protocolId)
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>

<style scoped>
    .title{border-bottom: 1px solid #e0e0e0;display: inline-block;padding-bottom: 5px;text-align: left;margin-bottom: 15px;margin-top: 15px;padding-left: 10px;padding-right: 10px;}
    .item-list>div{margin-bottom: 5px !important}
    .item-list .el-form-item__content{display: flex;}
    .float-left{float: left;margin-left: 15px;}
    .item-inner .info{width: 120px;}
</style>