<template>
    <section class="panel-main" :style="styles">
        <el-tabs v-model="active_name" @tab-click="tabChange">
            <el-tab-pane label="商务合同信息" name="business-contract"> 
                <el-table :data="list">
                    <el-table-column prop="index" label="序号" width="90">
                        <template slot-scope='scope'>{{scope.$index+1}}</template>
                    </el-table-column>
                    <el-table-column prop="providerName" label="供应商名称"></el-table-column>
                    <el-table-column prop="productCompanyName" label="项目公司"></el-table-column>
                    <el-table-column prop="productCompanyArea" label="所属区域"></el-table-column>
                    <el-table-column prop="contractType" label="合同类别"></el-table-column>
                    <el-table-column prop="productName" label="项目名称"></el-table-column>
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
                <el-table :data="list">
                    <el-table-column label="资产编号" prop='assetsId'></el-table-column>
                    <el-table-column prop="status" label="资产状态">
                        <template slot-scope="scope">
                            <el-tag :type="(scope.row.status == '已匹配' || scope.row.status == '已还款' || scope.row.status == '已结算') ? 'success' : 'warning'" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="receiveableMoney" label="应收账款金额"></el-table-column>
                    <el-table-column prop="transferPrice" label="转让折价"></el-table-column>
                    <el-table-column prop="submitTime" label="提交日期"></el-table-column>
                    <el-table-column prop="loanTime" label="放款日期"></el-table-column>
                    <el-table-column prop="publishTime" label="资产发行日期"></el-table-column>
                    <el-table-column prop="receiveableMoneyEndTime" label="应收账款到期日"></el-table-column>
                </el-table>
            </el-tab-pane> 
            <el-tab-pane label="单据信息" name="bills-info" >
                <el-row>
                    <el-table @select='tableSelect' :data="list" class='table-list table-expand' @select-all='tableSelectAll'  @expand='tableExpand'>                        
                        <el-table-column prop="orderReceiptsId" label="应付单号" align='center'></el-table-column>
                        <el-table-column prop="orderReceiptsType" label="应付类型" align='center'></el-table-column>
                        <el-table-column prop="money" label="应付金额（元）" align='center' ></el-table-column>
                        <el-table-column prop="receiptsTime" label="单据日期" align='center' ></el-table-column>         
                        <el-table-column prop="invoiceTotalMoney" label="发票总金额（元）" align='center'></el-table-column> 
                        <el-table-column label="应付单附件" align='center'>
                            <template slot-scope='scope'>
                                <el-button size='small'>下载</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="附件上传" align='center'>
                            <template slot-scope='scope'>
                                <el-button size='small' type='primary'>上传</el-button>
                            </template>
                        </el-table-column> 
                        <el-table-column label="进度款申请支付表附件" align='center' width='200'>
                            <template slot-scope='scope'>
                                <el-button size='small'>下载</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column label="附件上传" align='center'>
                            <template slot-scope='scope'>
                                <el-button size='small' type='primary'>上传</el-button>
                            </template>
                        </el-table-column> 
                        <el-table-column label="展开" type="expand">
                            <template slot-scope="props">
                                <ul class="abs-table">
                                    <li class="abs-table-header">
                                        <div class="cell" :style="`width:${100/5}%;`">发票号</div>
                                        <div class="cell" :style="`width:${100/5}%;`">发票金额</div>
                                        <div class="cell" :style="`width:${100/5}%;`">发票日期</div>
                                        <div class="cell" :style="`width:${100/5}%;`">发票附件</div>
                                        <div class="cell" :style="`width:${100/5}%;`">附件上传</div>
                                    </li>
                                    <li v-for="(item,idx) in props.row.fp_list" :key="idx">
                                        <div class="cell" :style="`width:${100/5}%;`">{{item.invoiceId}}</div>
                                        <div class="cell" :style="`width:${100/5}%;`">{{item.money}}</div>
                                        <div class="cell" :style="`width:${100/5}%;`">{{item.invoiceTime}}</div>
                                        <div class="cell" :style="`width:${100/5}%;`">
                                            <el-button size='small'>下载</el-button>
                                        </div>
                                        <div class="cell" :style="`width:${100/5}%;`">
                                            <el-button size='small'>上传</el-button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="cell" :style="`width:${100/5}%;`">合计</div>
                                        <div class="cell" :style="`width:${100/5}%;`">{{props.row.fp_sum}}</div>
                                        <div class="cell" :style="`width:${100/5}%;`">-</div>
                                        <div class="cell" :style="`width:${100/5}%;`">-</div>
                                        <div class="cell" :style="`width:${100/5}%;`">-</div>
                                    </li>
                                </ul>
                            </template>
                        </el-table-column>     
                    </el-table>
                    <el-pagination v-if='pageTotal > 0' class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="[10, 20,50,100]" :page-size="pageSize" :total="pageTotal"></el-pagination>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="资产转让信息" name="property-transfer-info" >
                <el-form :model='propertyTransferInfo' label-width='180px' class='item-list'>
                    <el-form-item label='中登网登记文件' class='item-inner'>
                        <div class="float-left info">
                            <el-button size="small" type="primary" @click.native='getFile(propertyTransferInfo.pdfFile)'>点击查看</el-button>
                        </div>
                    </el-form-item>
                    <el-form-item label='应收账款债权转让协议' class='item-inner'>
                        <div class="float-left info">
                            <el-button size="small" type="primary" @click.native='getFile(propertyTransferInfo.transferFile)'>点击查看</el-button>
                        </div>
                    </el-form-item>

                    <el-form-item label='应收账款转让通知函及回执' class='item-inner'>
                        <div class="float-left info">
                            <el-button size="small" type="primary" @click.native='getFile(propertyTransferInfo.notifyFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary"  @click.native='getFile(propertyTransferInfo.paymentProject)'>点击查看</el-button>
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
                            <el-button size="small" type="primary"  @click.native='getFile(propertyTransferInfo.transferFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary"  @click.native='getFile(propertyTransferInfo.partnerFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary" @click.native='getFile(propertyTransferInfo.baseFile)'>点击查看</el-button>
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
                            <el-button size="small" type="primary" @click.native='getFile(propertyTransferInfo.serverFile)'>点击查看</el-button>
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
        <el-dialog class='preview-dialog file-img' size="normal" top='60px' title="文件预览" v-model="dialogFormVisible">
            <img :src='filePath' v-show='fileType=="jpg"||fileType=="jpeg"||fileType=="png"||fileType=="gif"'/> 
            <canvas v-show='fileType=="pdf"' id="the-canvas"></canvas>           
        </el-dialog>        
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'  
    import workerSrc from '../../../static/js/pdf.worker.js' 
    import Assets from '@/api/assets/assets' 
    export default {
        data() {
            return {
                dialogFormVisible:false,
                fileType:'',
                params:{},
                filePath:'',
                pageTotal:0,
                assetsId:'',
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
                propertyStatus:ABS_STATUS.propertyStatus,
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
                ],
                propertyTransferInfo:{
                    assignFile:'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf',
                    transferFile:'http://dl.download.csdn.net/down10/20120426/beb6100216430e63822e5a3cbf5861f4.doc?response-content-disposition=attachment%3Bfilename%3D%22%E5%AD%A6%E6%9C%AF%E4%B8%8D%E7%AB%AF%E6%A3%80%E6%B5%8B%E7%B3%BB%E7%BB%9F%E8%AF%95%E7%94%A8%E5%8D%8F%E8%AE%AE.doc%22&OSSAccessKeyId=9q6nvzoJGowBj4q1&Expires=1509269834&Signature=v3wh3zA3Q9efxozH3GJvD%2BBy8BE%3D&user=qq_39795732&sourceid=4257684',
                    notifyFile:'http://pic2.ooopic.com/12/22/94/37bOOOPICc7_1024.jpg',
                    paymentProject:'http://www.taopic.com/uploads/allimg/140107/234764-14010F0310582.jpg',
                    paymentBase:'http://pic.58pic.com/58pic/13/74/51/99d58PIC6vm_1024.jpg',
                    partnerFile:'http://pic71.nipic.com/file/20150610/13549908_104823135000_2.jpg',
                    baseFile:'http://img01.tooopen.com/Downs/images/2010/4/8/sy_20100408112256193519.jpg',
                    serverFile:'http://www.danielpeng.me/file/ABS资产管理.rar',
                    pdfFile:'https://cdn.mozilla.net/pdfjs/tracemonkey.pdf'
                },
                list:[
                    // {
                    //     orderReceiptsId:'123456',
                    //     orderReceiptsType:'',
                    //     money:'1000万',
                    //     receiptsTime:'2017/10/31',
                    //     invoiceTotalMoney:'1000万',
                    //     fp_list:[
                    //         {
                    //             invoiceId:'2',
                    //             money:'100万',
                    //             invoiceTime:'2014/10/30',
                    //         }
                    //     ]
                    // }
                ] 
            }
        },
        methods: {
            handlePreview(){

            },
            handleRemove(){

            },
            tabChange(tab){
                const self = this;
                self.active_name = tab.name;
                sessionStorage.setItem('assets_tname',tab.name);
                self.getData(tab.name)
            },
            handleChange(key){
            },
            cancelReset(){},
            getFile(url){
                const self = this;
                self.fileType =  (url.substr((url.lastIndexOf('.'))+1)).toLowerCase();
                
                //图片文件                
                if(self.fileType == 'jpg' || self.fileType == 'jpeg' || self.fileType == 'png' || self.fileType == 'gif' ){
                    self.dialogFormVisible = true;
                    self.filePath = url;
                }else if(self.fileType=='pdf'){
                    self.$nprogress.start();
                    self.setState({
                        attr:'onLoading',
                        val:true
                    });
                    var url = url;
                    // PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.10.93/pdf.worker.min.js';
                    PDFJS.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/1.10.93/pdf.worker.min.js';
                    var loadingTask = PDFJS.getDocument(url);
                    loadingTask.promise.then(function(pdf) {
                        self.dialogFormVisible = true;

                        console.log('PDF loaded');
                      
                      // Fetch the first page
                      var pageNumber = 1;
                      pdf.getPage(pageNumber).then(function(page) {
                        console.log('Page loaded');
                        
                        var scale = 1.5;
                        var viewport = page.getViewport(scale);

                        // Prepare canvas using PDF page dimensions
                        var canvas = document.getElementById('the-canvas');
                        var context = canvas.getContext('2d');
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;

                        // Render PDF page into canvas context
                        var renderContext = {
                          canvasContext: context,
                          viewport: viewport
                        };
                        var renderTask = page.render(renderContext);
                        renderTask.then(function () {
                          // console.log('Page rendered');
                            self.$nprogress.done();
                            self.setState({
                                attr:'onLoading',
                                val:false
                            });
                        });
                      });
                    }, function (reason) {
                      // PDF loading error
                      console.error(reason);
                    });
                }                    
            },
            imgError(){
                
            },
            tableSelect(selection,row){
                const self = this;
                // self.orderReceiptsIds = selection;
            },
            tableSelectAll(selection){
                const self = this;
                // self.orderReceiptsIds = selection;
            },
            tableExpand(row,expanded){
                console.log('id:',row.id)
                if(expanded){
                    const self = this;
                    if(row.orderReceiptsId&&row.orderReceiptsId!=''){
                        self.getReceipts({orderReceiptsId:row.id});
                    }
                }                    
            },
            getData(active_name){
                const self = this;
                self.params.assetsId = self.assetsId
                switch(active_name){
                    case 'business-contract':
                        //商务合同信息
                        self.params.type = 1;
                        self.getAssetsDetail(self.params);
                        break;
                    case 'property-info':
                        //资产详情
                        self.params.type = 2;
                        self.getAssetsDetail(self.params);
                        break;  
                    case 'bills-info':
                        //单据信息
                        self.params.type = 3;
                        self.getAssetsDetail(self.params);
                        break; 
                    case 'property-transfer-info':
                        //资产转让信息
                        self.params.type = 4;
                        self.getAssetsDetail(self.params);
                        break;   
                    default:
                        break;
                }
            },
            
        },
        watch: {
            
        },
        destroyed() {
            document.removeEventListener("keyup", self.enterKeyup, false);
            sessionStorage.removeItem('assets_tname');                
        },
        mixins:[Common,Assets],
        mounted() {
            const self = this;            
            self.$nextTick(()=>{
                const expandTables = document.querySelectorAll('.table-expand');
                expandTables.forEach((item)=>{
                    item.querySelector('th.el-table__expand-column').innerHTML = '<div class="cell">展开</div>';
                });

                if(sessionStorage.getItem('assetsId')){
                    self.assetsId = sessionStorage.getItem('assetsId');                    
                }   

                if(sessionStorage.getItem('assets_tname')){
                    self.active_name = sessionStorage.getItem('assets_tname');
                    self.getData(self.active_name);   
                    console.log('assetsId:',self.assetsId)                  
                }else{
                    self.getData('business-contract')
                }
                
            })          
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
    .preview-dialog .el-dialog__body{text-align: center;}
</style>