<template>
    <section class="panel-main" :style="styles">
        <el-tabs v-if='false' v-model="active_name" @tab-click="tabChange">
            <el-tab-pane label="个人认证" name="contact_information">
                <el-col>
                	<el-form label-width='100px' class='user-form'>
                		<el-form-item label='姓名'>
                			<el-input placeholder='请输入您的姓名'></el-input>
                		</el-form-item>
                		<el-form-item label='手机号码'>
                			<el-input placeholder='请输入您的手机号码'></el-input>
                		</el-form-item>
                		<el-form-item label='身份证号'>
                			<el-input placeholder='请输入您的身份证号码'></el-input>
                		</el-form-item>
                		<el-form-item label='上传身份证'>
                			<el-upload
                             	class="upload-demo"
                            	action="https://jsonplaceholder.typicode.com/posts/"
                              	:on-remove="handleRemove">
                            <el-button size="small" type="primary">上传证件</el-button>
                          </el-upload>
                		</el-form-item>
                        <el-form-item>
                            <el-button type="primary">认 证</el-button>
                        </el-form-item>
                	</el-form>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="资料详情" name="base_information" >
                <el-form label-width='100px' class='user-form'>
                		<el-form-item label='姓名'>
                			<el-input v-model='profile.name' readonly="readonly"></el-input>
                		</el-form-item>
                		<el-form-item label='角色'>
                			<el-input v-model='profile.role' readonly="readonly"></el-input>
                		</el-form-item>
                		<el-form-item label='系统权限'>
                			<el-input v-model='profile.author' readonly="readonly"></el-input>
                		</el-form-item>
                		<el-form-item label='职位'>
                			<el-input v-model='profile.position' readonly="readonly"></el-input>
                		</el-form-item>
                		<el-form-item label='手机号码'>
                			<el-input v-model='profile.phone' readonly="readonly"></el-input>
                		</el-form-item>
                		<el-form-item label='邮箱地址'>
                			<el-input v-model='profile.email'></el-input>
                		</el-form-item>
                		<el-form-item>
                			<el-button type='primary'>修改</el-button>
                		</el-form-item>
                	</el-form>
            </el-tab-pane>           
        </el-tabs>

        <el-tabs v-else  class='user-form' v-model="active_name2" @tab-click="enterpriseTabChange">            
            <el-tab-pane label="企业认证" name="tab-enterprise">
                <el-form class='enterprise-form' label-width='220px' :rules="rules" :model="enterprise" ref="enterprise">
                	<el-form-item label='企业注册号/统一社会信用代码' prop="code">
                		<el-input v-model='enterprise.code' placeholder='请填写企业注册号/统一社会信用代码'></el-input>
                	</el-form-item>
                	<el-form-item label='企业名称' prop="enterprise_name">
                		<el-input v-model='enterprise.enterprise_name' placeholder='请填写企业名称'></el-input>
                	</el-form-item>
                	<el-form-item label='法人代表姓名' prop="corporation_name">
                		<el-input v-model='enterprise.corporation_name' placeholder='请填写法人代表姓名'></el-input>
                	</el-form-item>
                	<el-form-item label='法人代表身份号' prop="corporation_id_number">
                		<el-input v-model='enterprise.corporation_id_number' placeholder='请填写法人代表身份证号'></el-input>
                	</el-form-item>
                	<el-form-item label='营业执照上传' prop="path">
                		<el-upload :headers="{'x-auth-token':token}" class="upload-demo" :action="`${url}/file/upload`" :on-remove="handleRemove" :on-success="uploadSuccessCallback">
                            <el-input v-model='enterprise.path' placeholder='点击上传证件' readonly="readonly"></el-input>
                        </el-upload>
                	</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addEnterpriseAuthentication('enterprise',enterprise)">认 证</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="授权" name="tab-author" >
                <el-table border :data='company'>
                    <el-table-column label='序号' type="index" width="90"></el-table-column>
                	<el-table-column label='姓名' prop='name' align='center'></el-table-column>
                	<el-table-column label='角色' prop='roleType' align='center'>
                        <template slot-scope="scope">
                            <span>{{roleType[scope.row.roleType]}}</span>
                        </template>
                    </el-table-column>
                	<el-table-column label='权限' prop='auditType' align='center'>
                        <template slot-scope="scope">
                            <span>{{auditType[scope.row.auditType]}}</span>
                        </template>
                    </el-table-column>
                	<el-table-column label='认证状态' prop='status' align='center'>
                        <template slot-scope="scope">
                            <el-tag :type="scope.row.status ? 'success' : 'danger'" close-transition>{{scope.row.status ? '已认证' : '未认证'}}</el-tag>
                        </template>   
                    </el-table-column>
                	<el-table-column label='操作' align='center'>
                		<template slot-scope='scope'>
                            <el-button :type="scope.row.status ? 'primary' : 'default'" size='small' :disabled="!scope.row.status" >授权</el-button>
                		</template>
                	</el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import Common from '@/mixins/common.js'
	import UserCenter from '@/api/user-center.js'
    export default {
        data() {
            return {
            	userRole:'1',
            	active_name:"contact_information",
            	active_name2:"tab-enterprise",
            	profile:{
                    index:1,
            		name:'王大锤',
            		role:'个人用户',
            		author:'xxx',
            		position:'CEO',
            		phone:'13430887445',
            		email:'12345678@qq.com'
            	},
                roleType:ABS_ROLE['user'] ? ABS_ROLE['user'] : {},
                auditType:ABS_ROLE['audit'] ? ABS_ROLE['audit'] : {},
            	company:[],
                enterprise:{
                    code:'',
                    enterprise_name:'',
                    corporation_name:'',
                    corporation_id_number:'',
                    path:''
                },
                rules:{
                    code:[
                        { required: true,message: '该选项不能为空', trigger: 'change' }
                    ],
                    enterprise_name:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ],
                    corporation_name:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ],
                    corporation_id_number:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ],
                    path:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ]
                },
            }
        },
        mixins:[Common,UserCenter],
        methods: {
           tabChange(){

           },
           enterpriseTabChange(type) {
                sessionStorage.setItem('enterpriseTabName',this.active_name2);
                if (this.active_name2 == 'tab-enterprise') {
                    this.getEnterpriseInfo();
                } else if (this.active_name2 == 'tab-author') {
                    this.getUserList();
                }
           },
           uploadSuccessCallback(response){
                if(response.code > 0){
                    if(response.data){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.enterprise.path = response.data.url;
                    }
                }
           },
           handleRemove(){
                this.enterprise.path = '';
           },
           enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    
                }
            }
        },
        mounted() {
            const self = this;
            self.$nextTick(()=>{
                if(sessionStorage.getItem('enterpriseTabName')){
                    self.active_name2 = sessionStorage.getItem('enterpriseTabName');
                    if(sessionStorage.getItem('enterpriseTabName') === 'tab-enterprise'){
                        self.getEnterpriseInfo();
                    }else{
                        self.getUserList();
                    }
                }else{
                    self.getEnterpriseInfo();
                }
                document.addEventListener("keyup", self.enterKeyup, false);
            });
        },
        watch:{
            
        },
        destroyed() {
            document.removeEventListener("keyup", self.enterKeyup, false);
            sessionStorage.removeItem('enterprise_tname');
            sessionStorage.removeItem('enterpriseTabName');
            this.setState({
                attr:'enterprise_menu_type',
                val:0
            });
        }
    }
</script>
<style>
	.user-form .el-input{width: 300px;}
	.enterprise-form .el-input{width: 400px;}
</style>

