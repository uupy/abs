<template>
    <section class="panel-main" :style="styles">
        <el-tabs v-if='user_type !== 1' v-model="active_name" @tab-click="presonTabChange">
            <el-tab-pane label="个人认证" name="contact_information">
            	<el-form label-width='100px' class='user-form' :rules="user_rules" :model="user" ref="user">
            		<el-form-item label='姓名' prop='name'>
            			<el-input v-model='user.name' placeholder='请输入您的姓名'></el-input>
            		</el-form-item>
            		<el-form-item label='手机号码' prop='mobile'>
            			<el-input v-model='user.mobile' placeholder='请输入您的手机号码'></el-input>
            		</el-form-item>
            		<el-form-item label='身份证号' prop='id_number'>
            			<el-input v-model='user.id_number' placeholder='请输入您的身份证号码'></el-input>
            		</el-form-item>
            		<el-form-item label='身份证正面' prop="front_path">
                        <el-upload :headers="{'x-auth-token':token}" class="upload-demo" :action="`${url}/file/upload`" :on-remove="handleRemove" :on-success="uploadSuccessCallback1">
                            <el-input v-model='user.front_path' placeholder='点击上传证件正面' readonly="readonly"></el-input>
                        </el-upload>
            		</el-form-item>
                    <el-form-item label='身份证反面' prop="back_path">
                        <el-upload :headers="{'x-auth-token':token}" class="upload-demo" :action="`${url}/file/upload`" :on-remove="handleRemove" :on-success="uploadSuccessCallback2">
                            <el-input v-model='user.back_path' placeholder='点击上传证件反面' readonly="readonly"></el-input>
                        </el-upload>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addUserAuthentication('user', user)">认 证</el-button>
                    </el-form-item>
            	</el-form>
            </el-tab-pane>
            <!-- <el-tab-pane label="资料详情" name="base_information" >
                <el-form label-width='100px' class='user-form' :model="profile" ref="profile">
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
            			<el-button type='primary' @click="updateUserEmail('profile', profile)">修改</el-button>
            		</el-form-item>
            	</el-form>
            </el-tab-pane>  -->          
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
                    <el-form-item label='法人手机号码' prop='mobile'>
                        <el-input v-model='enterprise.mobile' placeholder='请输入法人的手机号码'></el-input>
                    </el-form-item>
                	<el-form-item label='法人代表身份号' prop="corporation_id_number">
                		<el-input v-model='enterprise.corporation_id_number' placeholder='请填写法人代表身份证号'></el-input>
                	</el-form-item>
                	<el-form-item label='营业执照上传' prop="path">
                		<el-upload :headers="{'x-auth-token':token}" class="upload-demo" :action="`${url}/file/upload`" :on-success="uploadSuccessCallback" :before-upload="beforeUpload" ref="enterpriseUpload" :limit="1" :multiple="false" :show-file-list="false">
                            <el-input v-model='enterprise.fileName' placeholder='点击上传证件' readonly="readonly"></el-input>
                        </el-upload>
                	</el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addEnterpriseAuthentication('enterprise',enterprise)">认 证</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="授权" name="tab-author">
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
                            <el-tag :type="scope.row.status == 2 ? 'success' : 'danger'" close-transition>{{scope.row.status == 2 ? '已认证' : '未认证'}}</el-tag>
                        </template>   
                    </el-table-column>
                	<el-table-column label='操作' align='center'>
                		<template slot-scope='scope'>
                            <el-button :type="scope.row.status == 2 ? 'primary' : 'default'" size='small' :disabled="!(scope.row.status == 2)" >授权</el-button>
                            <el-button :type="scope.row.status == 2 ? 'primary' : 'default'" size='small' :disabled="!(scope.row.status == 2)" >下载</el-button>
                            <el-button :type="scope.row.status == 2 ? 'primary' : 'default'" size='small' :disabled="!(scope.row.status == 2)" >上传</el-button>
                            <el-button :type="scope.row.status == 2 ? 'primary' : 'default'" size='small' :disabled="!(scope.row.status == 2)" >预览</el-button>
                		</template>
                	</el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import Common from '@/mixins/common.js'
    import Test from '@/mixins/test/index.js'
	import UserCenter from '@/api/user-center.js'
    export default {
        data() {
            return {
            	userRole:'1',
            	active_name:"contact_information",
            	active_name2:"tab-enterprise",
            	profile:{
                    index:1,
            		name:'',
            		role:'',
            		author:'',
            		position:'',
            		phone:'',
            		email:''
            	},
                roleType:ABS_ROLE['user'] ? ABS_ROLE['user'] : {},
                auditType:ABS_ROLE['audit'] ? ABS_ROLE['audit'] : {},
            	company:[],
                user: {
                    name:'',
                    mobile:'',
                    id_number:'',
                    front_path:'',
                    back_path:''
                },
                enterprise:{
                    code:'',
                    enterprise_name:'',
                    corporation_name:'',
                    corporation_id_number:'',
                    path:'',
                    fileName:'',
                    mobile:''
                },
                rules:{
                    code:[
                        { required: true,message: '该选项不能为空', trigger: 'change' }
                    ],
                    enterprise_name:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ],
                    mobile:[
                        { required: true,validator:this.testMobile(), trigger: 'change' }
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
                user_rules:{
                    name:[
                        { required: true,message: '该选项不能为空', trigger: 'change' }
                    ],
                    mobile:[
                        { required: true, validator:this.testMobile(), trigger: 'change' }
                    ],
                    id_number:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ],
                    front_path:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ],
                    back_path:[
                        { required: true, message: '该选项不能为空', trigger: 'change' }
                    ]
                },
            }
        },
        mixins:[Common,Test,UserCenter],
        methods: {
           presonTabChange(type){
                sessionStorage.setItem('presonTabName',this.active_name);
                if (this.active_name == 'contact_information') {
                    this.getUserInfo();
                } else if (this.active_name == 'base_information') {
                    this.getUserBaseInfo();
                }
           },
           enterpriseTabChange(type) {
                sessionStorage.setItem('enterpriseTabName',this.active_name2);
                this.$refs['enterprise'].resetFields();
                this.$refs['enterpriseUpload'].clearFiles();
                this.enterprise.fileName = '';
                if (this.active_name2 == 'tab-enterprise') {
                    this.getEnterpriseInfo();
                } else if (this.active_name2 == 'tab-author') {
                    this.getUserList();
                }
           },
           beforeUpload(){
                this.setState({
                    attr:'onLoading',
                    val:true
                });
           },
           uploadSuccessCallback(response){
                this.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    if(response.data){
                        this.enterprise.path = response.data.fileUrl;
                        if(response.data.fileUrl){
                            if(response.data.fileUrl.indexOf(',') !== -1){
                                if(response.data.fileUrl.split(',')[0].indexOf('=') !== -1){
                                    this.enterprise.fileName = response.data.fileUrl.split(',')[0].split('=')[1];
                                }
                            }
                        }
                    }
                }else{
                    this.$message({
                        message: response.msg,
                        type: 'success'
                    });
                }
           },
           uploadSuccessCallback1(response){
                if(response.code > 0){
                    if(response.data){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.user.front_path = response.data.fileUrl;
                    }
                }
           },
           uploadSuccessCallback2(response){
                if(response.code > 0){
                    if(response.data){
                        this.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        this.user.back_path = response.data.fileUrl;
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
                if(self.user_type === 1){
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
                }else{
                    if(sessionStorage.getItem('presonTabName')){
                        self.active_name2 = sessionStorage.getItem('presonTabName');
                        if(sessionStorage.getItem('presonTabName') === 'contact_information'){
                            self.getUserInfo();
                        }else{
                            self.getUserBaseInfo();
                        }
                    }else{
                        self.getUserInfo();
                    }
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
	.enterprise-form .el-input,.enterprise-form .el-upload-list{width: 400px;}
</style>

