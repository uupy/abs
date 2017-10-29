<template>
    <section class="panel-main property-to-confirm" :style="styles"> 
        <el-row class="toolbar toolbar-top">            
            <el-col :span="17">
                <el-col>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">资产状态：</label>
                    <el-select @change='statusChange' :clearable='true' size="small" v-model="currentStatus" placeholder="请选择" style="width:230px;">
                        <el-option v-for="(item,index) in propertyStatus" :label="item" :value="index" :key="index"></el-option>
                    </el-select>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">放款日期：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="loanTime"
                        type="daterange"
                        range-separator=' 至 '
                        @change='dateChange("loanTime",$event)'
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-col>
                <el-col style="margin-top:10px;">
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">应收账款到期日：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="receiveableMoneyTime"
                        type="daterange"
                        range-separator=' 至 '
                        @change='dateChange("receiveableMoneyTime",$event)'
                        placeholder="选择日期范围">
                    </el-date-picker>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">资产发行日期：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="publishTime"
                        type="daterange"
                        range-separator=' 至 '
                        @change='dateChange("publishTime",$event)'
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-col> 
            </el-col>  
            <div class="f-right" style="padding-top:40px;">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @keyup.native.enter='search' @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i> 查询</el-button>
                <el-button size="small" type='primary'  :disabled='assetsIds.length<=0?true:false'>导出</el-button>
            </div>       
        </el-row>

        <el-row>
            <el-table
                ref="multipleTable"
                :data="propertyList"                
                tooltip-effect="dark"                
                @selection-change="handleSelectionChange" @select='tableSelect' @select-all='tableSelectAll'>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop='assetsId'  align='center'  label='资产编号'></el-table-column>
                <el-table-column prop='providerName' align='center' label='供应商'></el-table-column>
                <el-table-column prop='productCompanyName' align='center' label='项目公司'></el-table-column>
                <el-table-column prop='area'  align='center' label='所属区域'></el-table-column>
                <el-table-column prop='receiveableMoney' align='center'  label='应收账款金额'></el-table-column>
                <el-table-column prop='transferPrice' align='center'  label='转让折价'></el-table-column>
                <el-table-column prop='submitTime' align='center' label='提交日期'></el-table-column>
                <el-table-column prop='loanTime' align='center' label='放款日期'></el-table-column>
                <el-table-column prop='publishTime' align='center' label='资产发行日期'></el-table-column>
                <el-table-column prop='receiveableMoneyEndTime'  align='center' label='应收账款到期日'></el-table-column>
                <el-table-column prop='financingDays'  align='center' label='融资天数'></el-table-column>
                <el-table-column prop='repaymentTime'  align='center' label='还款日期'></el-table-column>
                <el-table-column align='center' label='资产状态'>
                    <template slot-scope='scope'>
                        <el-tag :type="scope.row.status == '1' ? 'success' : (scope.row.status == '2' ? 'warning':'default')" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align='center' label='操作' width='80'>
                    <template slot-scope='scope'>
                        <span class="table-btn health" @click.stop="checkView(scope.row)">详情</span>
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
                receiveableMoneyTime:'',
                publishTime:'',
                loanTime:'',
                currentStatus:'',
                pageTotal:0,
                pageSize:10,
                currentPage:1,
                filter_name:'',
                clients_pagesize:10,
                clients_total:1,
                loanBeginTime:'',
                loanEndTime:'',
                receiveableMoneyBeginTime:'',
                receiveableMoneyEndTime:'',
                publishBeginTime:'',
                publishEndTime:'',
                propertyList:[
                    {
                        pno:'ZCA01171019001',
                        area:'碧桂园',
                        supplier:'供应商1',
                        yszkje:'100万',
                        zrzj:'100万',
                        tjrq:'2017-12-30',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        zcfxrq:'2017-12-30',
                        hkr:'2017-12-30',
                        rzts:'360',
                        status:'1',
                    }
                ],
                propertyStatus:ABS_STATUS.propertyStatus,
                loadTimeOptions:{
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                console.log('sb:',picker)
                                picker.$emit('pick', new Date());
                            }
                        }
                    ]
                },
                params:{
                    status:0
                },
                status:0,
                assetsIds:[]
            }
        },
        methods: {
            clearFilter(){
                const self = this;
                self.filter_name = '';
                self.getStandingBookList(self.params);
            },
            handleSelectionChange(){
 
            },
            clientsSizeChange(){
 
            },
            clientsCurrentChange(){
 
            },
            checkView(row){
                const self = this;
                self.$router.push({path:'/pages/assets/standing-book/views'});
            },
            pageSizeChange(e){
                this.pageSize = e;
                this.currentPage = 1;
                this.getStandingBookList(self.params);
            },
            pageCurrentChange(e){
                this.currentPage = e;
                this.getStandingBookList(self.params);
            },
            dateChange(type,event){
                const self = this;
                event = event.replace(/\s+/g,"");                

                let begin = event.split('至')[0];
                let end = event.split('至')[1];

                if(type == 'loanTime'){   
                    self.params.loanBeginTime = begin;
                    self.params.loanEndTime = end;
                        
                }else if(type == 'receiveableMoneyTime'){                    
                    self.params.receiveableMoneyBeginTime = begin
                    self.params.receiveableMoneyEndTime = end;
                                               
                }else if(type == 'publishTime'){
                    self.params.publishBeginTime = begin
                    self.params.publishEndTime = end; 
                        
                }

                self.getStandingBookList(self.params)  
            },
            statusChange(e){
                const self = this;
                self.params.status = e;
                self.getStandingBookList(self.params)
            },
            search(){
                const self = this;
                self.filter_name = self.filter_name.replace(/\s+/g,"");
                if(self.filter_name == ''){
                    return;
                }
                self.params.keyword = self.filter_name;
                self.getStandingBookList(self.params);
            },
            tableSelect(selection,row){
                const self = this;
                self.assetsIds = selection;
            },
            tableSelectAll(selection){
                const self = this;
                self.assetsIds = selection;
            },
        },
        watch: {
            
        },
        mixins:[Common,Assets],
        mounted() {
            const self = this;
            self.getStandingBookList(self.params);
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