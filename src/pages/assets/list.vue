<template>
    <section class="panel-main" :style="styles">
        <template v-if="enterprise_type === 3">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未融资数据" name="first">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-right">
                           <el-input size="small" v-model="filter_name" placeholder="请输入项目公司名称" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>  
                            <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i>查询</el-button>           
                            <el-button size="small" type='primary' @click='supply("first")'>签 约</el-button>
                        </div>
                    </el-row>
                    <el-row>
                        <el-table :data="list" class='table-list table-expand'>
                            <el-table-column type="selection" width="40"></el-table-column>
                            <el-table-column prop="orderReceiptsId" label="应付单号" align='center' width="100"></el-table-column>
                            <el-table-column prop="receiptsTime" label="单据日期" align='center' width="110"></el-table-column>         
                            <el-table-column prop="money" label="应付金额（元）" align='center' width="130"></el-table-column>
                            <el-table-column prop="providerName" label="供应商" align='center'></el-table-column>
                            <el-table-column prop="productCompanyName" label="项目公司" align='center'></el-table-column>
                            <el-table-column prop="productCompanyArea" label="所属区域" align='center'></el-table-column>       
                            <el-table-column prop="productName" label="项目名称" align='center'></el-table-column>       
                            <el-table-column prop="contractName" label="合同名称" align='center'></el-table-column>         
                            <el-table-column prop="contractNo" label="合同号" align='center'></el-table-column>         
                            <el-table-column prop="invoiceTotalMoney" label="发票总金额（元）" align='center'></el-table-column> 
                            <el-table-column label="合同附件" align='center' width="110">
                                <template slot-scope='scope'>
                                    <el-button size='small'>下载</el-button>
                                </template>
                            </el-table-column> 
                            <el-table-column label="进度款申请支付表附件" align='center'>
                                <template slot-scope='scope'>
                                    <el-button size='small'>下载</el-button>
                                </template>
                            </el-table-column> 
                            <el-table-column label="展开" type="expand">
                                <template slot-scope="props">
                                    <el-table :data="props.row.fp_list" show-summary border style="width: 100%">
                                        <el-table-column prop="invoiceId" label="发票号" align='center'></el-table-column>
                                        <el-table-column prop="money" label="发票金额" align='center'></el-table-column>
                                        <el-table-column prop="createTime" label="发票日期" align='center'></el-table-column>
                                        <el-table-column label="发票附件" align='center'>
                                            <template slot-scope='scope'>
                                                <el-button size='small'>下载</el-button>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="操作" align='center'>
                                            <template slot-scope='scope'>
                                                <el-button size='small'>上传</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>     
                        </el-table>
                        <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="listSizeChange" @current-change="listCurrentChange" :page-size="list_pagesize" :total="list_total"></el-pagination>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="已融资数据" name="second">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-left">
                           <el-input size="small" v-model="filter_name" placeholder="请输入项目公司名称" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>    
                            <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i>查询</el-button>           
                        </div>
                    </el-row>
                    <el-row>
                        <el-table :data="list" class='table-list table-expand'>
                            <el-table-column prop="orderReceiptsId" label="应付单号" align='center' width="100"></el-table-column>
                            <el-table-column prop="receiptsTime" label="单据日期" align='center' width="110"></el-table-column>         
                            <el-table-column prop="money" label="应付金额（元）" align='center' width="130"></el-table-column>
                            <el-table-column prop="providerName" label="供应商" align='center'></el-table-column>
                            <el-table-column prop="productCompanyName" label="项目公司" align='center'></el-table-column>
                            <el-table-column prop="productCompanyArea" label="所属区域" align='center'></el-table-column>       
                            <el-table-column prop="productName" label="项目名称" align='center'></el-table-column>       
                            <el-table-column prop="contractName" label="合同名称" align='center'></el-table-column>         
                            <el-table-column prop="contractNo" label="合同号" align='center'></el-table-column>         
                            <el-table-column prop="invoiceTotalMoney" label="发票总金额（元）" align='center'></el-table-column> 
                            <el-table-column label="合同附件" align='center' width="110">
                                <template slot-scope='scope'>
                                    <el-button size='small'>下载</el-button>
                                </template>
                            </el-table-column> 
                            <el-table-column label="进度款申请支付表附件" align='center'>
                                <template slot-scope='scope'>
                                    <el-button size='small'>下载</el-button>
                                </template>
                            </el-table-column> 
                            <el-table-column label="展开" type="expand">
                                <template slot-scope="props">
                                    <el-table :data="props.row.fp_list" show-summary border style="width: 100%">
                                        <el-table-column prop="invoiceId" label="发票号" align='center'></el-table-column>
                                        <el-table-column prop="money" label="发票金额" align='center'></el-table-column>
                                        <el-table-column prop="createTime" label="发票日期" align='center'></el-table-column>
                                        <el-table-column label="发票附件" align='center'>
                                            <template slot-scope='scope'>
                                                <el-button size='small'>下载</el-button>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </template>
                            </el-table-column>     
                        </el-table>
                        <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="listSizeChange" @current-change="listCurrentChange" :page-size="list_pagesize" :total="list_total"></el-pagination>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </template>
        <template v-else>
            <el-row class="toolbar toolbar-top">
                <div class="f-right">
                    <template v-if="enterprise_type !== 4">
                        <el-input size="small" v-model="filter_name" placeholder="请输入项目公司名称" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>  
                        <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i>查询</el-button>
                    </template>
                    <el-button size="small" type='primary' @click='supply("second")' v-if="enterprise_type === 2">确 认</el-button>
                </div>
            </el-row>
            <el-row>
                <el-table @select='tableSelect' @select-all='tableSelectAll' :data="list" class='table-list table-expand' @expand='tableExpand'>
                    <el-table-column type="selection" width="40" v-if="enterprise_type === 2"></el-table-column>
                    <el-table-column prop="orderReceiptsId" label="应付单号" align='center'></el-table-column>
                    <el-table-column prop="receiptsTime" label="单据日期" align='center' width="120"></el-table-column>         
                    <el-table-column prop="money" label="应付金额（元）" align='center' width="130"></el-table-column>         
                    <el-table-column prop="providerName" label="供应商" align='center'></el-table-column>
                    <el-table-column prop="productCompanyName" label="项目公司" align='center'></el-table-column>
                    <el-table-column prop="productCompanyArea" label="所属区域" align='center'></el-table-column>       
                    <el-table-column prop="productName" label="项目名称" align='center'></el-table-column>       
                    <el-table-column prop="contractName" label="合同名称" align='center'></el-table-column>         
                    <el-table-column prop="contractNo" label="合同号" align='center'></el-table-column>         
                    <el-table-column prop="invoiceTotalMoney" label="发票总金额（元）" align='center'></el-table-column> 
                    <el-table-column label="应付单附件" align='center' width="110">
                        <template slot-scope='scope'>
                            <el-button size='small'>下载</el-button>
                        </template>
                    </el-table-column> 
                    <el-table-column label="展开" type="expand">
                        <template slot-scope="props">
                            <ul class="abs-table">
                                <li class="abs-table-header">
                                    <div class="cell" :style="`width:${100/3}%;`">发票号</div>
                                    <div class="cell" :style="`width:${100/3}%;`">发票金额</div>
                                    <div class="cell" :style="`width:${100/3}%;`">发票日期</div>
                                </li>
                                <li v-for="(item,idx) in props.row.fp_list" :key="idx">
                                    <div class="cell" :style="`width:${100/3}%;`">{{item.invoiceId}}</div>
                                    <div class="cell" :style="`width:${100/3}%;`">{{item.money}}</div>
                                    <div class="cell" :style="`width:${100/3}%;`">{{item.createTime}}</div>
                                </li>
                                <li>
                                    <div class="cell" :style="`width:${100/3}%;`">合计</div>
                                    <div class="cell" :style="`width:${100/3}%;`">{{props.row.invoiceTotalMoney}}</div>
                                    <div class="cell" :style="`width:${100/3}%;`">-</div>
                                </li>
                            </ul>
                        </template>
                    </el-table-column>     
                </el-table>
                 <el-pagination v-if='pageTotal > 0' class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="[10, 20,50,100]" :page-size="pageSize" :total="pageTotal"></el-pagination>
            </el-row>
        </template>
        <el-dialog size="tiny" title="协议列表" v-model="dialogDisable" @close="cancelAddClient('add_form')" :close-on-click-modal="false">
            <el-form :model="add_form" :rules="rules" ref="add_form" label-width="120px">
                <el-form-item label='1.付款确认书'>
                    <el-button size='small' type='primary' @click.native='filePreview("1")'>查看</el-button>
                    <el-button size='small' type='primary'>签订</el-button>
                </el-form-item>
                <el-form-item label='2.付款确认书'>
                    <el-button size='small' type='primary' @click.native='filePreview("2")'>查看</el-button>
                    <el-button size='small' type='primary'>签订</el-button>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native='confirm'>确认融资</el-button>
                <el-button @click="cancelAddClient('add_form')">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog size="full" title="付款确认书" v-model="dialogDisable2" @close="cancelAddClient('add_form')" :close-on-click-modal="false">
            <img :src='fileImgUrl'/>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '../../mixins/common.js'
    import Assets from '@/api/assets/assets.js'
    export default {
        data() {
            return {
                currentStatus:'',
                dialogDisable2:false,
                currentPage:1,
                fileImgUrl:'',
                pageSize:10,
                pageTotal:0,
                pages:0,
                keyword:'',
                currentType:0,
                filter_name:'',
                currentCompany:'',
                propertyStatus:{},
                currentPage:1,
                pageNum:10,
                pages:0,
                activeName:'first',
                dialog_add_client:false,
                add_form:{},
                dialogDisable:false,
                dialogDisable2:false,
                rules:{},
                orderReceiptsIds:[],
                companyList:[
                    {
                        label:'深圳xx公司',
                        value:'0',
                    },
                    {
                        label:'深圳开胃公司',
                        value:'1',
                    }
                ],
                list:[
                    {
                        orderReceiptsId:'1',
                        supplier:'大疆集团',
                        company:'深圳宝宝公司',
                        area:'深圳宝安',
                        project_name:'项目1',
                        contract_name:'合同1',
                        contract_no:'ht001',
                        yfsum:'4000',
                        djdate:'2017-10-17',
                        fpsum:'4000',
                        fp_list:[
                            {
                               index:'1' ,
                               money:'1000' ,
                               date:'2017-10-17' 
                            },
                            {
                               index:'2' ,
                               money:'1000' ,
                               date:'2017-10-17' 
                            },
                            {
                               index:'3' ,
                               money:'2000' ,
                               date:'2017-10-17' 
                            },
                        ],
                        fp_sum:'4000'
                    },
                    {
                        orderReceiptsId:'2',
                        supplier:'大疆集团',
                        company:'深圳宝宝公司',
                        area:'深圳宝安',
                        project_name:'项目1',
                        contract_name:'合同1',
                        contract_no:'ht001',
                        yfsum:'4000',
                        djdate:'2017-10-17',
                        fpsum:'4000',
                        fp_list:[
                            {
                               index:'1' ,
                               money:'1000' ,
                               date:'2017-10-17' 
                            },
                            {
                               index:'2' ,
                               money:'1000' ,
                               date:'2017-10-17' 
                            },
                            {
                               index:'3' ,
                               money:'2000' ,
                               date:'2017-10-17' 
                            },
                        ],
                        fp_sum:'4000'
                    },
                ],
                list_pagenum:1,
                list_pagesize:10,
                list_total:10,
            }
        },
        mixins:[Common,Assets],
        methods: {
            listSizeChange(){},
            listCurrentChange(){},
            clearFilter(){},
            supply(type){
                 if(this.orderReceiptsIds.length<=0){
                    this.$message.warning('请勾选数据')
                    return;
                }
                this.dialogDisable = true;
            },
            cancelAddClient(){
                this.dialogDisable = false;
            },
            handleClick(){

            },
            clientsSizeChange(){

            },
            clientsCurrentChange(){

            },
            pageSizeChange(e){
                this.pageSize = e;
                this.currentPage = 1;
                this.getAssetsList();
            },
            pageCurrentChange(e){
                this.currentPage = e;
                this.getAssetsList();
            },
            tableExpand(row,expanded){
                console.log('id:',row.orderReceiptsId)
                if(expanded){
                    const self = this;
                    if(row.orderReceiptsId&&row.orderReceiptsId!=''){
                        self.getReceipts({orderReceiptsId:row.orderReceiptsId});
                    }
                }
                    
            },
            search(){
                const self = this;
                self.getAssetsList({productCompanyName:self.filter_name})
            },
            filePreview(id){
                const self = this;
                self.dialogDisable2 = true;
            },
            tableSelect(selection,row){
                const self = this;
                self.orderReceiptsIds = selection;
            },
            tableSelectAll(selection){
                const self = this;
                self.orderReceiptsIds = selection;
            },
            confirm(){
                const self = this;
                let ids = [];
               
                self.orderReceiptsIds.forEach(val=>{
                    ids.push(val.orderReceiptsId)
                });
                
                self.confirmFinancing({orderReceiptsIds:ids.join(',')});
            }

        },
        watch: {
            
        },
        mounted() {
            this.$nextTick(()=>{
                const expandTables = document.querySelectorAll('.table-expand');
                expandTables.forEach((item)=>{
                    item.querySelector('th.el-table__expand-column').innerHTML = '<div class="cell">展开</div>';
                });
            });

            this.getAssetsList()
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>