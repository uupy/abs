<template>
    <section class="panel-main" :style="styles">
        <el-tabs v-model="active_name" @tab-click="tabChange">
            <el-tab-pane label="商务合同信息" name="business-contract"> 
                <el-table :data="businessContracts" border>
                    <el-table-column prop="index" label="序号" width="90"></el-table-column>
                    <el-table-column prop="supplier" label="供应商名称"></el-table-column>
                    <el-table-column prop="projectCompany" label="项目公司"></el-table-column>
                    <el-table-column prop="area" label="所属区域"></el-table-column>
                    <el-table-column prop="contractType" label="合同类别"></el-table-column>
                    <el-table-column prop="projectName" label="项目名称"></el-table-column>
                    <el-table-column prop="contractName" label="商务合同名称"></el-table-column>
                    <el-table-column prop="contractNo" label="商务合同编号"></el-table-column>
                    <el-table-column inline-template :context="_self" label="附件" width="140">
                        <span>
                            <el-button size='small'>预览</el-button>
                            <el-button size='small'>上传</el-button>
                        </span>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="资产详情" name="property-info" >
                <el-table :data="propertyInfos" border>
                    <el-table-column prop="no" label="资产编号" width="90"></el-table-column>
                    <el-table-column prop="status" label="资产状态">
                        <template slot-scope="scope">
                            <el-tag :type="(scope.row.status == '已匹配' || scope.row.status == '已还款' || scope.row.status == '已结算') ? 'success' : 'warning'" close-transition>{{scope.row.status}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="yszk" label="应收账款金额"></el-table-column>
                    <el-table-column prop="zrzj" label="转让折价"></el-table-column>
                    <el-table-column prop="submitDate" label="提交日期"></el-table-column>
                    <el-table-column prop="loanDate" label="放款日期"></el-table-column>
                    <el-table-column prop="fxdate" label="资产发行日期"></el-table-column>
                    <el-table-column prop="zkdeadline" label="应收账款到期日"></el-table-column>
                </el-table>
            </el-tab-pane> 
            <el-tab-pane label="单据信息" name="bills-info" >
                <el-table :data="billsTable" border>
                <el-table-column prop="id" label="发票号"  align='center'></el-table-column>
                <el-table-column prop="sum" label="发票金额" align='center'></el-table-column>
                <el-table-column prop="date" label="发票日期" align='center'></el-table-column>         
                <el-table-column label="单据附件" align='center'>
                    <template slot-scope='scope'>
                        <el-button size='small'>预览</el-button>
                    </template>                        
                </el-table-column>         
                <el-table-column label="附件上传" align='center'>
                    <template slot-scope='scope'>
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove">
                            <el-button size="small" type="primary">上传</el-button>
                        </el-upload>
                    </template>
                </el-table-column>         
                <el-table-column prop="fangkuanri" label="单据号" align='center'></el-table-column>  
                <el-table-column label="附件" align='center'>
                    <template slot-scope='scope'>
                        <el-button size='small'>预览</el-button>
                    </template>                        
                </el-table-column>         
                <el-table-column label="附件上传" align='center'>
                    <template slot-scope='scope'>
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove">
                            <el-button size="small" type="primary">上传</el-button>
                        </el-upload>
                    </template>
                </el-table-column>        
                <el-table-column prop="book" label="ERP审批表/支付申请书" align='center'></el-table-column> 
                <el-table-column label="附件" align='center'>
                    <template slot-scope='scope'>
                        <el-button size='small'>预览</el-button>
                    </template>                        
                </el-table-column>         
                <el-table-column label="附件上传" align='center'>
                    <template slot-scope='scope'>
                        <el-upload
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove">
                            <el-button size="small" type="primary">上传</el-button>
                        </el-upload>
                    </template>
                </el-table-column>        
            </el-table>
            </el-tab-pane>
            <el-tab-pane label="资产转让信息" name="property-2-info" >
                <el-form label-width='180px' class='item-list'>
                <el-form-item label='中登网登记文件' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                          <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='应收账款债权转让协议' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                        </el-upload>
                    </div>
                </el-form-item>

                <el-form-item label='应收账款转让通知函及回执' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='付款确认书（项目公司）' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='付款确认书（总部）' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='股东会决议' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='基础资产买卖协议' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                        </el-upload>
                    </div>
                </el-form-item>
                <el-form-item label='服务协议' class='item-inner'>
                    <div class="float-left info">
                        <el-button size="small" type="primary">点击查看</el-button>
                    </div>
                    <div class="float-left">
                        <el-upload
                          class="upload-demo"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :on-preview="handlePreview"
                          :on-remove="handleRemove">
                        </el-upload>
                    </div>
                </el-form-item>
            </el-form>
            </el-tab-pane>           
        </el-tabs>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                active_name:'business-contract',
                protocolId:'',
                protocol:{
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
                businessContracts:[
                    {
                        index:1,
                        supplier:'深圳xx公司',
                        projectCompany:'深圳大唐公司',
                        area:'深圳宝安',
                        contractType:'工程类',
                        projectName:'大唐公司签约项目',
                        contractName:'大唐公司签约项目',
                        contractNo:'21',
                        file:'' 
                    }
                ],
                business_infos:[
                    {
                        label1:'供应商名称',
                        value1:'供应商1',
                        label2:'项目公司',
                        value2:'深圳xx公司'
                    },
                    {
                        label1:'所属区域',
                        value1:'深圳宝安',
                        label2:'合同类别',
                        value2:'工程类'
                    },
                    {
                        label1:'项目名称',
                        value1:'大唐公司签约项目',
                        label2:'商务合同名称',
                        value2:'大唐公司签约项目'
                    },
                    {
                        label1:'商务合同编号',
                        value1:'1',
                        label2:'附件',
                        value2:'上传'
                    },
                    
                ],
                propertyInfos:[
                    {
                        no:'111',
                        status:'待结算',
                        yszk:'2,000,000',
                        zrzj:'2,000,000',
                        submitDate:'2017-10-11',
                        loanDate:'2017-10-11',
                        fxdate:'2017-10-11',
                        zkdeadline:'2017-10-11',
                    }
                ],
                billsInfo:{
                    id:'001',
                    no:'billsx101'
                },
                billsTable:[
                    {
                        id:'1',
                        sum:'8555.00',
                        date:'2017-10-11',
                        fujian:'ss',
                        danjuhao:'101',
                        book:''
                    }
                ]     
            }
        },
        methods: {
           handlePreview(){

           },
           handleRemove(){

           },
           tabChange(){

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
    .item-inner .info{width:80px;}
</style>