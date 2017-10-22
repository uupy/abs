<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar toolbar-top">
            <div class="f-right">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="getclient"><i class="el-icon-search"></i> 查询</el-button>
                <!-- <el-button size="small" type="primary" @click="dialog_add_client = true"><i class="el-icon-plus"></i> 新增</el-button> -->
            </div>
        </el-row>
        <div class="panel-protocol">
            <el-row :span="24">
                <el-table :data="list" class="table-list">
                    <el-table-column prop="index" label="序号" width="90"></el-table-column>
                    <el-table-column prop="id" label="协议编号"></el-table-column>
                    <el-table-column prop="name" label="协议名称"></el-table-column>
                    <el-table-column prop="signatory" label="协议签署方"></el-table-column>
                    <el-table-column prop="signatoryOtherSide" label="协议签署对方"></el-table-column>
                    <el-table-column prop="date" label="签署日期"></el-table-column>
                    <el-table-column inline-template :context="_self" label="操作" width="140" align='center'>
                        <span>
                            <span class="table-btn health" @click.stop="checkView(row)">资产详情</span>
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
                clients_total:2,
                currentType:0,
                filter_name:'',
                signDate:'',
                protocolStatus:{},
                deadline:'',
                dialog_add_client:false,
                list:[
                    {
                        index:'1',
                        id:'ZCA01171019001',
                        name:'应收帐款债权转让协议',
                        signatory:'工程公司',
                        signatoryOtherSide:'佛山项目公司',
                        date:'2017-10-19'
                    },
                    {
                        index:'2',
                        id:'ZCA01171019002',
                        name:'应收帐款债权转让通知函',
                        signatory:'工程公司',
                        signatoryOtherSide:'佛山项目公司',
                        date:'2017-10-19'
                    }
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
                self.$router.push({path:'/pages/protocol_signed/views'});
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
            console.log(self.protocolStatus)
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>