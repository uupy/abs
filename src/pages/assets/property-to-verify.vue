<template>
    <section class="panel-main property-to-confirm" :style="styles">        
        <el-row class="toolbar toolbar-top">            
            <div class="f-left">
                <label style="padding-left:10px;">应收账款到期日：</label>
                <el-date-picker size="small" class='date-picker'
                    v-model="dateRange"
                    type="daterange"
                    range-separator=' 至 '
                    placeholder="选择日期范围">
                </el-date-picker>
                <label style="padding-left:10px;">提交日期：</label>
                <el-date-picker size="small" class='date-picker'
                    v-model="dateRange2"
                    type="daterange"
                    range-separator=' 至 '
                    placeholder="选择日期范围">
                </el-date-picker>
            </div>  
            <div class="f-right">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" ><i class="el-icon-search"></i> 查询</el-button>
                <el-button size="small" type='primary'>审核通过</el-button>
            </div>       
        </el-row>

        <el-row>
            <el-table ref="multipleTable" :data="propertyList" border @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop='pno'  align='center'  label='资产编号'></el-table-column>
                <el-table-column prop='supplier'  align='center'  label='供应商'></el-table-column>
                <el-table-column prop='project'  align='center' label='项目公司'></el-table-column>
                <el-table-column prop='area'  align='center' label='所属区域'></el-table-column>
                <el-table-column prop='yszkje' align='center'  label='应收账款金额'></el-table-column>
                <el-table-column prop='zrzj' align='center'  label='转让折价'></el-table-column>
                <el-table-column prop='tjrq' align='center' label='提交日期'></el-table-column>
                <el-table-column prop='yszkdqr'  align='center' label='应收账款到期日'></el-table-column>
                <el-table-column prop='rzts'  align='center' label='融资天数'></el-table-column>
                <el-table-column prop='dclr'  align='center' label='待处理人'></el-table-column>
                <el-table-column align='center' label='资产状态'>
                    <template slot-scope='scope'>
                        <el-tag :type="(scope.row.status == '6' || scope.row.status == '7' || scope.row.status == '8') ? 'success' : 'warning'" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align='center' label='操作' width="170">
                    <template slot-scope='scope'>
                        <span class="table-btn health" @click.stop="checkView(row)">详情</span>
                        <span class="table-btn danger">审核通过</span>
                        <span class="table-btn danger">回退</span>
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
                clients_total:1,
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
                        dclr:'保理商经办',
                        status:'2',
                    },
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
 
            },
            checkView(row){
                const self = this;
                self.$router.push({path:'/pages/assets/property-to-verify/views'});
            },
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
    .property-to-confirm .toolbar-top .date-picker.el-input{width: 230px;font-size: 13px;color: #666;text-align: center;}
</style>