<template>
    <section class="panel-main property-to-confirm" :style="styles">        
        <el-row class="toolbar toolbar-top">            
            <div class="f-left">
                <label style="padding-left:10px;">应收账款到期日：</label>
                <el-date-picker size="small" class='date-picker'
                    v-model="dateRange"
                    type="daterange"
                    range-separator=' 至 '
                    placeholder="选择日期范围"
                    @change='dateChange("receiveableMoneyTime",$event)'>
                </el-date-picker>
                <label style="padding-left:10px;">提交日期：</label>
                <el-date-picker size="small" class='date-picker'
                    v-model="dateRange2"
                    type="daterange"
                    range-separator=' 至 '
                    placeholder="选择日期范围"
                    @change='dateChange("submitTime",$event)'>
                </el-date-picker>
            </div>  
            <div class="f-right">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search" ></i> 查询</el-button>
                <el-button size="small" type='primary' :disabled='assetsIds.length<=0?true:false' @click.native='loanHandle'>确认放款</el-button>
            </div>       
        </el-row>

        <el-row>
            <el-table @select='tableSelect' @select-all='tableSelectAll' ref="multipleTable" :data="propertyList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop='assetsId'  align='center'  label='资产编号'></el-table-column>
                <el-table-column prop='providerName'  align='center'  label='供应商'></el-table-column>
                <el-table-column prop='productCompanyName'  align='center' label='项目公司'></el-table-column>
                <el-table-column prop='area'  align='center' label='所属区域'></el-table-column>
                <el-table-column prop='receiveableMoney' align='center'  label='应收账款金额'></el-table-column>
                <el-table-column prop='transferPrice' align='center'  label='转让折价'></el-table-column>
                <el-table-column prop='submitTime' align='center' label='提交日期' width="120"></el-table-column>
                <el-table-column prop='receiveableMoneyEndTime'  align='center' label='应收账款到期日' width="130"></el-table-column>
                <el-table-column prop='financingDays'  align='center' label='融资天数' width="100"></el-table-column>
                <el-table-column prop='dclr'  align='center' label='待处理人' width="100"></el-table-column>
                <el-table-column align='center' label='资产状态' width="100">
                    <template slot-scope='scope'>
                        <el-tag :type="(scope.row.status == '6' || scope.row.status == '7' || scope.row.status == '8') ? 'success' : 'warning'" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align='center' label='操作' width="170">
                    <template slot-scope='scope'>
                        <span class="table-btn health" @click.stop="checkView(scope.row)">资产详情</span>
                        <span class="table-btn danger" @click='loanHandle(scope.row)'>确认放款</span>
                    </template>
                </el-table-column>                
            </el-table>
            <el-pagination v-if='pageTotal > 0' class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="[10, 20,50,100]" :page-size="pageSize" :total="pageTotal"></el-pagination>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Assets from '@/api/assets/assets'
    export default {
        data() {
            return {
                dateRange:'',
                dateRange2:'',
                filter_name:'',
                clients_pagesize:10,
                clients_total:1,
                pageTotal:10,
                pageSize:10,
                currentPage:1,
                params:{},
                propertyList:[
                    {
                        pno:'ZCA01171019001',
                        supplier:'供应商1',
                        project:'碧桂园',
                        area:'深圳宝安',
                        yszkje:'2,000,000',
                        zrzj:'1,988,000',
                        tjrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        rzts:'360',
                        dclr:'保理商复核',
                        status:'5',
                    },
                ],
                propertyStatus:{},
                assetsIds:[]
            }
        },
        methods: {
            clearFilter(){
                const self = this;
                if(self.filter_name!=''){
                    self.filter_name = '';
                    self.params.keyword = '';
                    if (self.enterprise_type == 5) {
                        self.spvMayFangKuanAssetsList(self.params);
                    } else if (self.enterprise_type == 1) {
                        self.factorMayFenPeiAssetsList(self.params);    
                    } 
                }
            },
            handleSelectionChange(){
 
            },
            clientsSizeChange(){
 
            },
            clientsCurrentChange(){
 
            },
            checkView(row){
                const self = this;
                self.$router.push({path:'/pages/assets/property-to-loan/views'});
            },
            pageSizeChange(e){
                const self = this;
                self.pageSize = e;
                self.currentPage = 1;
                if (self.enterprise_type == 5) {
                    self.spvMayFangKuanAssetsList(self.params);
                } else if (self.enterprise_type == 1) {
                    self.factorMayFenPeiAssetsList(self.params);    
                } 
            },
            pageCurrentChange(e){
                const self = this;
                self.currentPage = e;
                if (self.enterprise_type == 5) {
                    self.spvMayFangKuanAssetsList(self.params);
                } else if (self.enterprise_type == 1) {
                    self.factorMayFenPeiAssetsList(self.params);    
                } 
            },
            dateChange(type,event){
                const self = this;
                event = event.replace(/\s+/g,"");                

                let begin = event.split('至')[0];
                let end = event.split('至')[1];

                if(type == 'receiveableMoneyTime'){                    
                    self.params.receiveableMoneyBeginTime = begin
                    self.params.receiveableMoneyEndTime = end;
                                               
                }else if(type == 'submitTime'){
                    self.params.submitBeginTime = begin
                    self.params.submitEndTime = end; 
                        
                }

                if (self.enterprise_type == 5) {
                    self.spvMayFangKuanAssetsList(self.params);
                } else if (self.enterprise_type == 1) {
                    self.factorMayFenPeiAssetsList(self.params);    
                } 
            },
            tableSelect(selection,row){
                const self = this;
                self.assetsIds = selection;
            },
            tableSelectAll(selection){
                const self = this;
                self.assetsIds = selection;
            },
            loanHandle(row){
                const self = this;
                let ids = [];

                if(row.assetsId){
                    ids = row.id;
                }else{
                    self.assetsIds.forEach(val=>{
                        ids.push(val.id)
                    });
                }

                self.$confirm('确定放款吗？','提示',{
                    type:'warning'
                }).then(()=>{
                    if(self.enterprise_type == 1) {
                        self.capitalLoan({assetsIds:ids});
                    } else if (self.enterprise_type == 5) {
                        self.spvLoan({assetsIds:ids});
                    }
                    
                }).catch(()=>{

                }); 
            },
            search(){
                const self = this;
                self.filter_name = self.filter_name.replace(/\s+/g,"");
                if(self.filter_name == ''){
                    return;
                }
                self.params.keyword = self.filter_name;
                self.propertyStatus = ABS_STATUS.propertyStatus;
                if (self.enterprise_type == 5) {
                    self.spvMayFangKuanAssetsList(self.params);
                } else if (self.enterprise_type == 1) {
                    self.factorMayFenPeiAssetsList(self.params);    
                }
            },
        },
        watch: {
            
        },
        mixins:[Common,Assets],
        mounted() {
            const self = this;
            self.propertyStatus = ABS_STATUS.propertyStatus;
            if (self.enterprise_type == 5) {
                self.spvMayFangKuanAssetsList();
            } else if (self.enterprise_type == 1) {
                self.factorMayFenPeiAssetsList();    
            }
            
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>
<style>
    /*.property-to-confirm .date-picker input{width: 400px;font-size: 13px;color: #666;}*/
    .property-to-confirm .toolbar-top .date-picker.el-input{width: 230px;font-size: 13px;color: #666;text-align: center;}
</style>