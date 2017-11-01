<template>
    <section class="panel-main" :style="styles">        
        <template>
            <el-row class="toolbar toolbar-top">
                <div class="f-right">
                    <template v-if="enterprise_type !== 4">
                        <el-input size="small" v-model="filter_name" placeholder="请输入关键字查询" @keyup.native.enter='search' icon="circle-cross" @click="clearFilter"></el-input>  
                        <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i> 查询</el-button>
                    </template>
                    <el-button size="small" type="primary" @click='dialogDisable = true'><i class="iconfont icon-plus"></i> 新增</el-button>
                </div>
            </el-row>
            <el-row>
                <el-table :data='list' class="table-list">
                    <el-table-column label="序号" width='90' align='center'>
                        <template slot-scope='scope'>{{scope.$index+1}}</template>
                    </el-table-column>
                    <el-table-column prop="name" label="姓名" align='center' width="120"></el-table-column>   
                    <!-- <el-table-column label="性别" align='center'>
                        <template slot-scope='scope'>
                            {{scope.row.gender==1?'男':'女'}}
                        </template>
                    </el-table-column> -->      
                    <el-table-column prop="mobile" label="手机号码" align='center' width="130"></el-table-column> 
                    <el-table-column prop="email" label="邮箱" align='center'></el-table-column>
                    <!-- <el-table-column prop="address" label="地址" align='center'></el-table-column>        -->
                    <el-table-column label="操作" align='center' width='100'>
                        <template slot-scope='scope'>
                            <span class="table-btn danger" @click.stop="removeUser(scope.row,scope.$index)">删除</span>
                        </template>
                    </el-table-column>       
                </el-table>
                <el-pagination v-if='pageTotal > 0' class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="[10, 20,50,100]" :page-size="pageSize" :total="pageTotal"></el-pagination>
            </el-row>
            <el-dialog size="tiny" title="新增用户" v-model="dialogDisable" @close="cancelAddContact" class="dialogForm" :close-on-click-modal="false">
                <el-form :model="add_form" :rules="rules" ref="add_form" label-width="80px">
                    <el-form-item label="角色">
                        <el-select v-model="add_form.entMemberType" placeholder="请选择用户角色">
                            <el-option v-for="(item,value) in contact_roles" :label="item" :value="value" :key="value"></el-option>
                        </el-select>
                    </el-form-item>                    
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="add_form.name" placeholder="请输入姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="add_form.password" type='password' placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input v-model="add_form.mobile" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱地址">
                        <el-input v-model="add_form.email" placeholder="请输入邮箱地址"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="confirm">确 定</el-button>
                    <el-button @click="cancelAddContact">取 消</el-button>
                </div>
                <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
            </el-dialog>
        </template>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Test from '@/mixins/test/index.js'
    import Users from '@/api/userMangement/user'
    export default {
        data() {
            return {
                currentStatus:'',
                dialogDisable2:false,
                currentPage:1,
                fileImgUrl:'',
                pageSize:10,
                gender:'',
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
                add_form:{
                    name:'',
                    mobile:'',
                    password:'',
                    entMemberType:'2'
                },
                contact_roles:{
                    2:'法人代表',
                    3:'代理人1',
                    4:'代理人2',
                    5:'对接人'
                },
                authorities:{
                    0:'无',
                    1:'经办',
                    2:'复核'
                },
                rules:{
                    name:[
                        {required:true,message:'姓名不能为空',trigger: 'change'}
                    ],
                    mobile:[
                        {required:true,validator:this.testMobile(),trigger: 'change'}
                    ],
                    password:[
                        {required:true,validator:this.testPassword('密码'),trigger: 'change'}
                    ]
                },
                genderList:[
                    {
                        label:'男',
                        value:1
                    },
                    {
                        label:'女',
                        value:2
                    },

                ],
                dialogDisable:false,
                dialogDisable2:false,
                orderReceiptsIds:[],                
                list:[],
                list_pagenum:1,
                list_pagesize:10,
                list_total:10,
            }
        },
        mixins:[Common,Test,Users],
        methods: {            
            clearFilter(){
                const self = this;
                if(self.filter_name != ''){
                    self.filter_name = '';
                    self.getUserList();
                }                    
            },
            cancelAddClient(){
                this.dialogDisable = false
            },
            confirm(){
                const self = this;
                self.$refs['add_form'].validate((valid)=>{
                    if(valid){                        
                        self.dialogDisable = false;
                        self.add_form.enterpriseId = self.enterpriseIdChange?self.enterpriseId:self.enterprise_id;
                        self.add_form.enterpriseType = self.enterprise_type;
                        self.addUser(self.add_form)
                    }
                });

                
            },
            removeUser(row,index){
                const self = this;
                self.$confirm('操作不可逆，确认删除吗?', '提示', {
                    type: 'warning'
                }).then(()=>{
                    self.deleteUser({user_id:row.id,index:index});
                }).catch(()=>{

                });
            },
            cancelAddContact(){
                this.dialogDisable = false
            },
            search(){
                const self = this;
                self.filter_name = self.filter_name.replace(/\s+/g,"");
                if(self.filter_name == ''){
                    return;
                }
                self.getUserList({keyword:self.filter_name});
            },
            pageSizeChange(e){
                this.pageSize = e;
                this.currentPage = 1;                
                this.getUserList();
            },
            pageCurrentChange(e){
                this.currentPage = e;
                this.getUserList();
            },
        },
        watch: {
            
        },
        mounted() {
            const self = this;
            self.getUserList();
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>