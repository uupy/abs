<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar toolbar-top">            
            <div class="f-right">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @keyup.native.enter='search(filter_name)' @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="search(filter_name)"><i class="el-icon-search"></i> 查询</el-button>
            </div>
        </el-row>
        <div class="panel-protocol">
            <el-row :span="24">
                <el-table :data="list" class="table-list">
                    <el-table-column label="序号" width="90">
                        <template slot-scope='scope'>
                            {{scope.$index+1}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="protocolCode" label="协议编号"></el-table-column>
                    <el-table-column prop="protocolName" label="协议名称"></el-table-column>
                    <el-table-column prop="protocolEnterpriseName" label="协议签署方"></el-table-column>
                    <el-table-column prop="protocolAnotherEnterpriseName" label="协议签署对方"></el-table-column>
                    <el-table-column inline-template :context="_self" label="操作" width="140" align='center'>
                        <span>
                            <span class="table-btn health" @click.stop="checkView(row)">预览</span>
                            <span class="table-btn danger" @click='check(row)'>{{row.state == 1 || row.state == 3 ? '签约申请' : '签约'}}</span>
                        </span>
                    </el-table-column>
                </el-table>
                <el-pagination v-if='pageTotal > 0' class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="[10, 20,50,100]" :page-size="pageSize" :total="pageTotal"></el-pagination>
            </el-row>
        </div>
        <el-dialog size="tiny" title="签约确认" v-model="dialogConfrimSigned" @close="cancelConfrimSigned('signedForm')" :close-on-click-modal="false" style="min-width:400px;">
            <el-form :model="signedForm" :rules="rules" ref="signedForm" label-width="90px">
                <el-form-item label="手机号码">
                    <el-input v-model="userMobile" readonly="readonly"></el-input>
                </el-form-item>
                <el-form-item label='验证码' prop="code">
                    <el-row>
                        <el-col :span="16">
                            <el-input v-model="signedForm.code" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-button type="primary">获取验证码</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label='密码' prop="password">
                    <el-input v-model="signedForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confrimSigned">确 认</el-button>
                <el-button @click="cancelConfrimSigned('signedForm')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Protocol from '@/api/protocol/protocol.js'
    export default {
        data() {
            return {
                currentStatus:'',
                currentPage:1,
                pageSize:10,
                pageTotal:0,
                pages:0,
                keyword:'',
                currentType:0,
                filter_name:'',
                protocolStatus:{},
                list:[],
                protocolType:[
                    {label:'全部',value:0},
                    {label:'主合同',value:1},
                    {label:'附件',value:2},
                ],
                rules:{
                    code:[
                        {required:true,message:'请输入验证码',trigger:'change'}
                    ],
                    password:[
                        {required:true,message:'请输入密码',trigger:'change'}
                    ]
                },
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
                dialogConfrimSigned:false,
                signedForm:{
                    code:'',
                    password:''
                }
            }
        },
        methods: {
            pageSizeChange(e){
                this.pageSize = e;
                this.currentPage = 1;
                this.getProtocolList({status:1});
            },
            pageCurrentChange(e){
                this.currentPage = e;
                this.getProtocolList({status:1});
            },
            checkView(row){
                const self = this;
                self.$router.push({path:'/pages/protocol_notsigned/views'});
            },
            clearFilter(type){
                const self = this;
            },
            search(){
                const self = this;
                if(self.filter_name.replace(/\s/g,"")==""){
                    self.filter_name = self.filter_name.replace(/\s/g,"");
                    return;
                }
                self.getProtocolList({status:1,keyword:self.filter_name});
            },
            check(row){   
                const self = this;
                if(row.state == 1 || row.state == 3){
                    self.signProtocol({protocolId:row.id,enterprise_type:self.enterprise_type});
                }else{
                    console.log(self);
                    self.dialogConfrimSigned = true;
                }
            },
            confrimSigned(){
                const self = this;
                self.$refs['signedForm'].validate((valid)=>{
                    if(valid){
                        self.signProtocol({protocolId:row.id,enterprise_type:self.enterprise_type});
                    }
                });
            },
            cancelConfrimSigned(formName){
                this.$refs[formName].resetFields();
                this.dialogConfrimSigned = false;
            },
        },
        watch: {
            
        },
        mixins:[Common,Protocol],
        mounted() {
            const self = this;
            self.getProtocolList({status:1});
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>