<template>
    <section class="panel-main">
        <el-tabs v-if='userRole=="geren"' v-model="active_name" @tab-click="tabChange">
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
                	</el-form>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="资料详情" name="base_information" >
                <el-form label-width='100px' class='user-form'>
                		<el-form-item label='姓名'>
                			<el-input v-model='profile.name' disabled></el-input>
                		</el-form-item>
                		<el-form-item label='角色'>
                			<el-input v-model='profile.role' disabled></el-input>
                		</el-form-item>
                		<el-form-item label='系统权限'>
                			<el-input v-model='profile.author' disabled></el-input>
                		</el-form-item>
                		<el-form-item label='职位'>
                			<el-input v-model='profile.position' disabled></el-input>
                		</el-form-item>
                		<el-form-item label='手机号码'>
                			<el-input v-model='profile.phone' disabled></el-input>
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

        <el-tabs v-else  class='user-form' v-model="active_name2" @tab-click="tabChange">            
            <el-tab-pane label="企业认证" name="tab-enterprise">
                <el-form class='enterprise-form' label-width='200px'>
                	<el-form-item label='企业注册号/统一社会信用代码'>
                		<el-input placeholder='请填写企业注册号/统一社会信用代码'></el-input>
                	</el-form-item>
                	<el-form-item label='企业名称'>
                		<el-input placeholder='请填写企业名称'></el-input>
                	</el-form-item>
                	<el-form-item label='法人代表姓名'>
                		<el-input placeholder='请填写法人代表姓名'></el-input>
                	</el-form-item>
                	<el-form-item label='法人代表身份号'>
                		<el-input placeholder='请填写法人代表身份号'></el-input>
                	</el-form-item>
                	<el-form-item label='营业执照上传'>
                		<el-upload
                             	class="upload-demo"
                            	action="https://jsonplaceholder.typicode.com/posts/"
                              	:on-remove="handleRemove">
                            <el-button size="small" type="primary">上传证件</el-button>
                          </el-upload>
                	</el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="授权" name="tab-author" >
                <el-table border :data='company'>
                	<el-table-column label='姓名' prop='name' align='center'></el-table-column>
                	<el-table-column label='角色' prop='role' align='center'></el-table-column>
                	<el-table-column label='权限' prop='author' align='center'></el-table-column>
                	<el-table-column label='认证状态' prop='status' align='center'></el-table-column>
                	<el-table-column label='操作' align='center'>
                		<template slot-scope='scope'>
                			<el-button type='primary' size='small'>授权</el-button>
                		</template>
                	</el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
	import { mapGetters , mapActions } from 'vuex'
    export default {
        data() {
            return {
            	userRole:'1',
            	active_name:"contact_information",
            	active_name2:"tab-enterprise",
            	profile:{
            		name:'王大锤',
            		role:'个人用户',
            		author:'xxx',
            		position:'CEO',
            		phone:'13430887445',
            		email:'12345678@qq.com'
            	},
            	company:[
            		{
            			name:'王大锤',
            			role:'管理员',
            			author:'',
            			status:'1'            			
            		}
            	],
            }
        },
        methods: {
           tabChange(){

           },
           handleRemove(){},
           ...mapActions([
			    'setState'
			])
        },
        mounted() {
            
        },
        watch:{
            
        },
        destroyed() {
            document.removeEventListener("keyup", self.enterKeyup, false);
            sessionStorage.removeItem('enterprise_tname');
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

