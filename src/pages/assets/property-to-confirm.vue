<template>
    <section class="panel-main property-to-confirm">        
        <el-row class="toolbar toolbar-top">            
            <div class="f-left">
                <label style="padding-left:10px;">应收账款到期日：</label>
                <el-date-picker class='date-picker'
                    v-model="dateRange"
                    type="daterange"
                    range-separator=' 至 '
                    placeholder="选择日期范围">
                </el-date-picker>
                <label style="padding-left:10px;">宽限期限到期日：</label>
                <el-date-picker class='date-picker'
                    v-model="dateRange2"
                    type="daterange"
                    range-separator=' 至 '
                    placeholder="选择日期范围">
                </el-date-picker>
            </div>  
            <div class="f-right">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" ><i class="el-icon-search"></i> 查询</el-button>
                <el-button size="small" type='primary'>确认放款</el-button>
            </div>       
        </el-row>

        <el-row>
            <el-table
                ref="multipleTable"
                :data="propertyList"
                border
                tooltip-effect="dark"                
                @selection-change="handleSelectionChange">

                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop='pno'  align='center'  label='资产编号'></el-table-column>
                <el-table-column prop='hxqy'  align='center' label='核心企业'></el-table-column>
                <el-table-column prop='gysmc' align='center' label='供应商名称'></el-table-column>
                <el-table-column prop='yszkje' align='center'  label='应收账款金额'></el-table-column>
                <el-table-column prop='blrzje' align='center'  label='保理融资金额'></el-table-column>
                <el-table-column prop='fkrq' label='放款日期' align='center' ></el-table-column>
                <el-table-column prop='yszkdqr'  align='center' label='应收账款到期日'></el-table-column>
                <el-table-column prop='kxqxdqr' align='center' label='宽限期限到期日'></el-table-column>
                <el-table-column prop='hkr'  align='center' label='还款日'></el-table-column>
                <el-table-column align='center' label='状态'>
                    <template slot-scope='scope'>
                        <el-tag :type="scope.row.status == '1' ? 'success' : (scope.row.status == '2' ? 'warning':'default')" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align='center' label='操作' width='80'>
                    <template slot-scope='scope'>
                        <span class="table-btn health">详情</span>
                    </template>
                </el-table-column>                
              </el-table>
               <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                dateRange:'',
                dateRange2:'',
                filter_name:'',
                clients_pagesize:10,
                clients_total:100,
                propertyList:[
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'1',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'2',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'3',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'4',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'4',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'4',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'4',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'4',
                    },
                    {
                        pno:'zc001',
                        hxqy:'碧桂园',
                        gysmc:'供应商1',
                        yszkje:'100万',
                        blrzje:'100万',
                        fkrq:'2017-12-30',
                        yszkdqr:'2017-12-30',
                        kxqxdqr:'2017-12-30',
                        hkr:'2017-12-30',
                        status:'4',
                    }

                ],
                propertyStatus:{},
            }
        },
        methods: {
           clearFilter(){

           },
           handleSelectionChange(){

           },
           clientsSizeChange(){

           },
           clientsCurrentChange(){

           }
        },
        watch: {
            
        },
        mixins:[Common,Clients],
        mounted() {
            const self = this;
            self.propertyStatus = STATUS.propertyStatus;
            console.log(self.protocolStatus)
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>
<style>
    /*.property-to-confirm .date-picker input{width: 400px;font-size: 13px;color: #666;}*/
    .property-to-confirm .toolbar-top .el-input{width: 230px;font-size: 13px;color: #666;text-align: center;}
</style>