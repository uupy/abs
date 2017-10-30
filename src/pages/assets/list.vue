<template>
    <section class="panel-main" :style="styles">
        <template v-if="enterprise_type === 3">
            <el-tabs v-model="active_name" @tab-click="tabChange">
                <el-tab-pane label="未融资数据" name="first">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-right">
                           <el-input size="small" v-model="filter_name" placeholder="请输入项目公司名称" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>  
                            <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i>查询</el-button>           
                            <el-button size="small" type='primary'  :disabled='orderReceiptsIds.length<=0?true:false'  @click='finacing'>融 资</el-button>
                        </div>
                    </el-row>
                    <el-row>
                        <el-table @select='tableSelect' :data="list" class='table-list table-expand' @select-all='tableSelectAll'  @expand='tableExpand'>
                            <el-table-column type="selection" width="40"></el-table-column>
                            <el-table-column prop="orderReceiptsId" label="应付单号" align='center' width="100"></el-table-column>
                            <el-table-column prop="receiptsTime" label="单据日期" align='center' width="110"></el-table-column>         
                            <el-table-column prop="money" label="应付金额（元）" align='center' width="130"></el-table-column>
                            <el-table-column prop="providerName" label="供应商" align='center'></el-table-column>
                            <el-table-column prop="productCompanyName" label="项目公司" align='center'></el-table-column>
                            <el-table-column prop="productCompanyArea" label="所属区域" align='center'></el-table-column>       
                            <!-- <el-table-column prop="productName" label="项目名称" align='center'></el-table-column>        -->
                            <!-- <el-table-column prop="contractName" label="合同名称" align='center'></el-table-column>          -->
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
                                    <ul class="abs-table">
                                        <li class="abs-table-header">
                                            <div class="cell" :style="`width:${100/5}%;`">发票号</div>
                                            <div class="cell" :style="`width:${100/5}%;`">发票金额</div>
                                            <div class="cell" :style="`width:${100/5}%;`">发票日期</div>
                                            <div class="cell" :style="`width:${100/5}%;`">发票附件</div>
                                            <div class="cell" :style="`width:${100/5}%;`">操作</div>
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
                <el-tab-pane label="已融资数据" name="second">
                    <el-row class="toolbar toolbar-top">
                        <div class="f-right">
                           <el-input size="small" v-model="filter_name" placeholder="请输入项目公司名称" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>    
                            <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i>查询</el-button>   
                        </div>
                    </el-row>
                    <el-row>
                        <el-table @select='tableSelect' :data="list" class='table-list table-expand'  @select-all='tableSelectAll'  @expand='tableExpand'>
                            <el-table-column prop="orderReceiptsId" label="应付单号" align='center' width="100"></el-table-column>
                            <el-table-column prop="receiptsTime" label="单据日期" align='center' width="110"></el-table-column>
                            <el-table-column prop="money" label="应付金额（元）" align='center' width="130"></el-table-column>
                            <el-table-column prop="providerName" label="供应商" align='center'></el-table-column>
                            <el-table-column prop="productCompanyName" label="项目公司" align='center'></el-table-column>
                            <el-table-column prop="productCompanyArea" label="所属区域" align='center'></el-table-column>       
                            <!-- <el-table-column prop="productName" label="项目名称" align='center'></el-table-column>       
                            <el-table-column prop="contractName" label="合同名称" align='center'></el-table-column>  -->        
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
                                    <ul class="abs-table">
                                        <li class="abs-table-header">
                                            <div class="cell" :style="`width:${100/5}%;`">发票号</div>
                                            <div class="cell" :style="`width:${100/5}%;`">发票金额</div>
                                            <div class="cell" :style="`width:${100/5}%;`">发票日期</div>
                                            <div class="cell" :style="`width:${100/5}%;`">发票附件</div>
                                            <div class="cell" :style="`width:${100/5}%;`">操作</div>
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
            </el-tabs>
        </template>
        <template v-else>
            <el-row class="toolbar toolbar-top">
                <div class="f-right">
                    <template v-if="enterprise_type !== 4">
                        <el-input size="small" v-model="filter_name" placeholder="请输入项目公司名称" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>  
                        <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i> 查询</el-button>
                    </template>
                    <el-button size="small" :disabled='orderReceiptsIds.length<=0?true:false' type='primary' @click='supply' v-if="enterprise_type === 2">确 认</el-button>
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
                    <!-- <el-table-column prop="productName" label="项目名称" align='center'></el-table-column>       
                    <el-table-column prop="contractName" label="合同名称" align='center'></el-table-column>    -->      
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
                                    <div class="cell" :style="`width:${100/3}%;`">{{item.invoiceTime}}</div>
                                </li>
                                <li>
                                    <div class="cell" :style="`width:${100/3}%;`">合计</div>
                                    <div class="cell" :style="`width:${100/3}%;`">{{props.row.fp_sum}}</div>
                                    <div class="cell" :style="`width:${100/3}%;`">-</div>
                                </li>
                            </ul>
                        </template>
                    </el-table-column>     
                </el-table>
                 <el-pagination v-if='pageTotal > 0' class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="[10, 20,50,100]" :page-size="pageSize" :total="pageTotal"></el-pagination>
            </el-row>
        </template>
        <el-dialog size="full" title="付款确认书" v-model="dialogDisable2" @close="cancelAddClient('add_form')" :close-on-click-modal="false">
            <img :src='fileImgUrl'/>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
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
                propertyStatus:ABS_STATUS['protocolStatus'] ? ABS_STATUS['protocolStatus'] : {},
                currentPage:1,
                pageNum:10,
                pages:0,
                active_name:'first',
                dialog_add_client:false,
                add_form:{},
                dialogDisable:false,
                dialogDisable2:false,
                rules:{},
                orderReceiptsIds:[],
                // companyList:[
                //     {
                //         label:'深圳xx公司',
                //         value:'0',
                //     },
                //     {
                //         label:'深圳开胃公司',
                //         value:'1',
                //     }
                // ],
                list:[],
                // list_pagenum:1,
                // list_pagesize:10,
                // list_total:10,
                state:0,
            }
        },
        mixins:[Common,Assets],
        methods: {
            listSizeChange(){},
            listCurrentChange(){},
            clearFilter(){
                this.filter_name = '';
                this.getAssetsList()
            },
            supply(){      
                const self = this; 
                //确认     
                self.$confirm('是否确认？','提示',{
                    type:'warning'
                }).then(()=>{
                    //确认
                    let ids = [];

                    self.orderReceiptsIds.forEach(val=>{
                        ids.push(val.id)
                    });
                    self.orderReceiptsMakeSure({
                        orderReceiptsIds:ids
                    });
                }).catch(()=>{

                });
                    
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
                this.pageNum = e;
                this.currentPage = 1;                
                this.getAssetsList();
            },
            pageCurrentChange(e){
                this.currentPage = e;
                this.pageNum = e;
                this.getAssetsList();
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
                    ids.push(val.id)
                });
                
                // self.confirmFinancing({orderReceiptsIds:ids.join(',')});
            },
            getData(active_name){
                const self = this;
                self.getAssetsList()
            },
            loadEnterpriseContent(tname){
                switch(tname){
                    case 'base_information':
                        // console.log('base_information')
                    break;
                    case 'data_management':
                        // console.log('data_management')
                    break;
                    case 'contact_information':
                        // console.log('contact_information')
                    break;
                }
            },
            //选项卡切换
            tabChange(tab, event){
                const self = this;
                self.active_name = tab.name;               
                self.state = tab.name=='first'?2:3;

                sessionStorage.setItem('assets_tname',tab.name);
                self.loadEnterpriseContent(tab.name);
                self.getData(self.active_name)
            },
            finacing(){
                //融资
                const self = this;
                
                let ids = [];
               
                self.orderReceiptsIds.forEach(val=>{
                    ids.push(val.id)
                });
                self.$confirm('确定融资吗？','提示',{
                    type:'warning'
                }).then(()=>{
                    self.confirmFinancing({
                        orderReceiptsIds:ids
                    });
                }).catch(()=>{

                });
            }
        },
        watch: {
            
        },
        mounted() {
            const self = this;
            self.state = self.enterprise_type==2?1:0
            self.$nextTick(()=>{
                const expandTables = document.querySelectorAll('.table-expand');
                expandTables.forEach((item)=>{
                    item.querySelector('th.el-table__expand-column').innerHTML = '<div class="cell">展开</div>';
                });

                if(sessionStorage.getItem('assets_tname')){
                    self.active_name = sessionStorage.getItem('assets_tname');
                    self.getData(self.active_name); 
                }else{
                    self.getData('first')
                }
                self.loadEnterpriseContent(self.active_name);
            });
            //self.getAssetsList()
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>