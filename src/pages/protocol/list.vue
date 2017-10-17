<template>
    <section class="panel-main">
        <el-row class="toolbar toolbar-top">
            <div class="f-left">
                <label>协议状态：</label>
                <el-select size="small" v-model="currentStatus" placeholder="请选择">
                    <el-option v-for="(item,index) in protocolStatus" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
                <label style="padding-left:10px;">协议类型：</label>
                <el-select size="small" v-model="currentType" placeholder="请选择">
                    <el-option v-for="(item,index) in protocolType" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
            </div>
            <div class="f-right">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="getclient"><i class="el-icon-search"></i> 查询</el-button>
                <el-button size="small" type="primary" @click="dialog_add_client = true"><i class="el-icon-plus"></i> 新增</el-button>
            </div>
        </el-row>
        <div class="panel-protocol">
            <el-row :span="24">
                <el-table :data="list" class="table-list">
                    <el-table-column prop="index" label="协议编号" width="90"></el-table-column>
                    <el-table-column prop="id" label="资产编号"></el-table-column>
                    <el-table-column prop="type" label="协议类型"></el-table-column>
                    <el-table-column prop="name" label="协议名称"></el-table-column>
                    <el-table-column prop="signatory" label="协议签署方"></el-table-column>
                    <el-table-column prop="sum" label="资产金额"></el-table-column>
                    <el-table-column label="签约状态">
                        <template slot-scope='scope'>
                            <el-tag :type="scope.row.status == '1' ? 'success' : (scope.row.status == '2' ? 'warning':'default')" close-transition>{{protocolStatus[scope.row.status]}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="signDate" label="签约日期"></el-table-column>
                    <el-table-column prop="deadline" label="合同到期日"></el-table-column>
                    <el-table-column inline-template :context="_self" label="操作" width="140" align='center'>
                        <span>
                            <span class="table-btn health" @click.stop="checkView(row)">资产详情</span>
                            <span class="table-btn danger">签约</span>
                        </span>
                    </el-table-column>
                </el-table>
                <el-pagination class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="clientsSizeChange" @current-change="clientsCurrentChange" :page-size="clients_pagesize" :total="clients_total"></el-pagination>
            </el-row>
        </div>

        <el-dialog size="tiny" title="新增协议" v-model="dialog_add_client" @close="cancelAddClient('add_form')" :close-on-click-modal="false">
            <el-form :model="add_form" :rules="rules" ref="add_form" label-width="90px">
                <el-form-item label="协议类型" prop="role">
                    <el-select v-model="add_form.type" placeholder="请选择协议类型">
                        <el-option v-for="(item,index) in protocolType" :label="item.label" :value="item.value" :key="index" v-if="item.value !== 0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="协议名称" prop="name">
                    <el-input v-model="add_form.name" placeholder="请输入协议名称"></el-input>
                </el-form-item>
                <el-form-item label='协议签署方' prop="principal">
                    <el-input v-model="add_form.signatory" placeholder="请输入协议签署方"></el-input>
                </el-form-item>
                <el-form-item label="签约日期" prop="position">
                    <el-date-picker
                        v-model="signDate"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同到期日" prop="position">
                    <el-date-picker
                        v-model="deadline"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions1">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">确 认</el-button>
                <el-button @click="cancelAddClient('add_form')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                currentStatus:'',
                clients_pagesize:10,
                clients_total:100,
                currentType:'',
                filter_name:'',
                signDate:'',
                protocolStatus:{},
                deadline:'',
                dialog_add_client:false,
                list:[
                    {
                        index:'1',
                        id:'pt1001',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'1',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'2',
                        id:'pt1002',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'1',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'3',
                        id:'pt1003',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'2',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'4',
                        id:'pt1004',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'3',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'5',
                        id:'pt1005',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'2',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'6',
                        id:'pt1006',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'1',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'7',
                        id:'pt1007',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'3',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'8',
                        id:'pt1007',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'1',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'9',
                        id:'pt1007',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'2',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'10',
                        id:'pt1007',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'3',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                    {
                        index:'11',
                        id:'pt1007',
                        type:'主合同',
                        name:'协议名称',
                        signatory:'深圳xx公司',
                        sum:'1000万',
                        status:'1',   
                        signDate:'2017-10-16',
                        deadline:'2027-10-16'
                    },
                ],
                protocolType:[
                    {label:'全部',value:0},
                    {label:'主合同',value:1},
                    {label:'附件',value:2},
                ],
                add_form:{},
                rules:{},
                pickerOptions0: {
                  disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                  }
                },
                pickerOptions1: {
                  disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                  }
                },
            }
        },
        methods: {
            clientsSizeChange(){

            },
            clientsCurrentChange(){

            },
            checkView(row){
                const self = this;
                self.$router.push({path:'/pages/protocol/list/'+row.id,params:{'protocolId':row.id}})
            },
            clearFilter(type){
                const self = this;
            },
            getclient(){

            },
            cancelAddClient(){
                this.dialog_add_client = false;
            },
        },
        watch: {
            
        },
        mixins:[Common,Clients],
        mounted() {
            const self = this;
            self.protocolStatus = STATUS.protocolStatus;
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>