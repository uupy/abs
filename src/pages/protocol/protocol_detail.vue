<template>
    <section class="panel-main" :style="styles">
        <el-tabs v-model="active_name" @tab-click="tabChange">
            <el-tab-pane label="商务合同信息" name="business-contract"> 

                <el-form label-width='100px'> 
                    <el-form-item label='供应商名称'>
                        {{businessContract.supplier}}
                    </el-form-item>
                    <el-form-item label='项目公司'>
                        {{businessContract.projectCompany}}
                    </el-form-item>
                    <el-form-item label='所属区域'>
                        {{businessContract.area}}
                    </el-form-item>
                    <el-form-item label='合同类别'>
                        {{businessContract.contractType}}
                    </el-form-item>
                    <el-form-item label='项目名称'>
                        {{businessContract.projectName}}
                    </el-form-item>
                    <el-form-item label='商务合同名称'>
                        {{businessContract.contractName}}
                    </el-form-item>
                    <el-form-item label='商务合同编号'>
                        {{businessContract.contractNo}}
                    </el-form-item>
                    <el-form-item label='附件'>
                        <el-upload 
                            class="upload-demo"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :on-preview="handlePreview"
                            :on-remove="handleRemove">
                            <el-button size="small" type="primary">上传附件</el-button>
                        </el-upload>
                    </el-form-item>                    
                </el-form>
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
                <el-table
                    :data="tableData5"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template scope="props">   
                            <el-table :data='props.row.fpTable'>
                                <el-table-column label='发票号' prop='no'></el-table-column>
                                <el-table-column prop='sum' label='发票金额'></el-table-column>
                                <el-table-column prop='date' label='发票日期'></el-table-column>
                                <el-table-column label='发票附件'>
                                    <template slot-scope='scope'>
                                        <el-upload v-if='scope.row.file==""'
                                            class="upload-demo"
                                            action="https://jsonplaceholder.typicode.com/posts/"
                                            :on-remove="handleRemove">
                                            <el-button size="small" type="primary">上传附件</el-button>
                                        </el-upload>  
                                        <el-button v-else type='primary' size='small'>下载</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column
                      label="应付单号"
                      prop="id">
                    </el-table-column>
                    <el-table-column
                      label="应付类型"
                      prop="yflx">
                    </el-table-column>
                    <el-table-column
                      label="应付金额"
                      prop="yfje">
                    </el-table-column>
                    <el-table-column
                      label="单据日期"
                      prop="djrq">
                    </el-table-column>
                    <el-table-column
                      label="发票总金额"
                      prop="fpje">
                    </el-table-column>
                    <el-table-column
                      label="应付单附件"
                      >
                        <template slot-scope='scope'>
                            <el-upload v-if='scope.row.yfdfile!=""'
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-remove="handleRemove">
                                <el-button size="small" type="primary">上传证件</el-button>
                            </el-upload>
                            <span v-else>
                                <el-button size="small" type="primary">下载</el-button>
                            </span>                           
                        </template>
                    </el-table-column>
                    <el-table-column
                      label="进度款申请支付表附件"
                      >
                      <template slot-scope='scope'>
                            <el-upload 
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-remove="handleRemove">
                                <el-button size="small" type="primary">上传附件</el-button>
                            </el-upload>                    
                        </template>
                    </el-table-column>                    
                  </el-table>
            </el-tab-pane>
            <el-tab-pane label="资产转让信息" name="property-transfer-info" >
                <el-form :model='propertyTransferInfo' label-width='180px' class='item-list'>
                    <el-form-item label='中登网登记文件' class='item-inner'>
                        <div class="float-left info">
                            <el-button size="small" type="primary" @click.native='imgPreview(propertyTransferInfo.assignFile)'>点击查看</el-button>
                        </div>
                        <div class="float-left">
                            <el-upload
                                class="upload-demo"
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :on-change='handleChange()'>
                                <el-button size="small" type="warning">点击上传</el-button>
                            </el-upload>
                        </div>
                    </el-form-item>
                    <el-form-item label='应收账款债权转让协议' class='item-inner'>
                        <div class="float-left info">
                            <el-button size="small" type="primary" @click.native='imgPreview(propertyTransferInfo.transferFile)'>点击查看</el-button>
                        </div>
                        <div class="float-left">
                            <el-upload
                              class="upload-demo"
                              action="https://jsonplaceholder.typicode.com/posts/"
                              :on-preview="handlePreview"
                              :on-remove="handleRemove">
                              <el-button size="small" type="warning">点击上传</el-button>
                            </el-upload>
                        </div>
                    </el-form-item>

                    <el-form-item label='应收账款转让通知函及回执' class='item-inner'>
                        <div class="float-left info">
                            <el-button size="small" type="primary" @click.native='imgPreview(propertyTransferInfo.notifyFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary"  @click.native='imgPreview(propertyTransferInfo.paymentProject)'>点击查看</el-button>
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
                            <el-button size="small" type="primary"  @click.native='imgPreview(propertyTransferInfo.transferFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary"  @click.native='imgPreview(propertyTransferInfo.partnerFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary" @click.native='imgPreview(propertyTransferInfo.baseFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary" @click.native='imgPreview(propertyTransferInfo.serverFile)'>点击查看</el-button>
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
        <el-dialog size="full" title="编辑联系方式" v-model="dialogFormVisible" class="file-img">
            <img :src='fileImgUrl' />
        </el-dialog>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                dialogFormVisible:false,
                fileImgUrl:'',
                tableData5: [{
                  id: '12987122',
                  name: '好滋好味鸡蛋仔',
                  category: '江浙小吃、小吃零食',
                  desc: '荷兰优质淡奶，奶香浓而不腻',
                  address: '上海市普陀区真北路',
                  shop: '王小虎夫妻店',
                  shopId: '10333',
                  yflx:'',
                  yfje:'1000万',
                  djrq:'2017-10-11',
                  fpje:'1000万',
                  yfdfile:'',
                  jdsqfile:'sss',
                  fpTable:[
                    {
                        no:'223',
                        sum:'100万',
                        date:'2017-10-11',
                        file:''
                    }
                  ]
                },
                ],
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
                businessContract:{
                    index:1,
                    supplier:'深圳xx公司',
                    projectCompany:'深圳大唐公司',
                    area:'深圳宝安',
                    contractType:'工程类',
                    projectName:'大唐公司签约项目',
                    contractName:'大唐公司签约项目',
                    contractNo:'21',
                    file:'' 
                },
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
                ],
                propertyTransferInfo:{
                    assignFile:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1508689556093&di=9f946fc7aa1515d2c2bcf8e8902e9e9e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F9a504fc2d5628535b9bcc6329aef76c6a7ef6340.jpg',
                    transferFile:'http://img5.imgtn.bdimg.com/it/u=3191256922,1392369155&fm=27&gp=0.jpg',
                    notifyFile:'http://a3.topitme.com/1/21/79/1128833621e7779211o.jpg',
                    paymentProject:'http://img1.50tu.com/meinv/xinggan/2013-11-16/e65e7cd83f37eed87067299266152807.jpg',
                    paymentBase:'http://a3.topitme.com/f/d1/4b/11292760524e84bd1fo.jpg',
                    partnerFile:'http://img1.imgtn.bdimg.com/it/u=4235859327,2792662286&fm=214&gp=0.jpg',
                    baseFile:'http://pic5.nipic.com/20100302/2177138_084003138452_2.jpg',
                    serverFile:'http://a3.topitme.com/b/4f/67/1128623636b9c674fbo.jpg',
                }   
            }
        },
        methods: {
           handlePreview(file){
                console.log('file:',file)
           },
           handleRemove(){

           },
           tabChange(){

           },
           handleChange(key){
                console.log(key)
           },
           cancelReset(){},
           imgPreview(url){
                const self = this;
                let fileType =  url.substr((url.lastIndexOf('.'))+1);

                //图片文件
                if(fileType == 'jpg' || fileType == 'jpeg' || fileType == 'png' || fileType == 'gif' ){
                    self.dialogFormVisible = true;
                    self.fileImgUrl = url;
                }else{

                }                    
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

<style>
    .title{border-bottom: 1px solid #e0e0e0;display: inline-block;padding-bottom: 5px;text-align: left;margin-bottom: 15px;margin-top: 15px;padding-left: 10px;padding-right: 10px;}
    .item-list>div{margin-bottom: 5px !important}
    .item-list .el-form-item__content{display: flex;}
    .float-left{float: left;margin-left: 15px;}
    .item-inner .info{width:80px;}
     .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .file-img img{width: 100%;}
</style>