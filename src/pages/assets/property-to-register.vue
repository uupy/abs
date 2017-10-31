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
                <el-input size="small" v-model="filter_name" @keyup.native.enter='search' placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search" ></i> 查询</el-button>
            </div>       
        </el-row>
        <el-row>
            <el-table ref="multipleTable" :data="list">
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
                <el-table-column align='center' label='中登网附件' width="110">
                    <template slot-scope='scope'>
                        <span class="table-btn health" @click.stop="checkView(scope.row)">上传</span>
                    </template>
                </el-table-column>
                <el-table-column align='center' label='操作' width="80">
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
    import Register from '@/api/assets/register'
    export default {
        data() {
            return {
                dateRange:'',
                dateRange2:'',
                filter_name:'',
                pageTotal:0,
                pageSize:10,
                currentPage:1,
                list:[],
                propertyStatus:{},
                params:{}
            }
        },
        methods: {
            clearFilter(){
                const self = this;
                if(self.filter_name!=''){
                    self.filter_name = '';
                    self.params.keyword = '';
                    self.factorMayDengJiAssetsList(self.params); 
                }                    
            },
            checkView(row){
                sessionStorage.setItem('assetId',row.id);
                this.$router.push({path:'/pages/assets/property-to-register/views'});
            },
            pageSizeChange(e){
                const self = this;
                self.pageSize = e;
                self.currentPage = 1;
                self.factorMayDengJiAssetsList(self.params);
            },
            pageCurrentChange(e){
                const self = this;
                self.currentPage = e;
                self.factorMayDengJiAssetsList(self.params);
            },
            dateChange(type,event){
                const self = this;
                event = event.replace(/\s+/g,"");                

                let begin = event.split('至')[0];
                let end = event.split('至')[1];
                if(type == 'receiveableMoneyTime'){                    
                    self.params.receiveableMoneyBeginTime = begin
                    self.params.receiveableMoneyEndTime = end;
                                               
                }else{
                    self.params.submitBeginTime = begin
                    self.params.submitEndTime = end; 
                        
                }
                self.factorMayDengJiAssetsList(self.params)  
            },
            search(){
                const self = this;
                self.filter_name = self.filter_name.replace(/\s+/g,"");
                if(self.filter_name == ''){
                    return;
                }
                self.params.keyword = self.filter_name;
                self.factorMayDengJiAssetsList({keyword:self.filter_name});
            },
        },
        watch: {
            
        },
        mixins:[Common,Register],
        mounted() {
            const self = this;
            self.propertyStatus = ABS_STATUS.propertyStatus;
            self.factorMayDengJiAssetsList();
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