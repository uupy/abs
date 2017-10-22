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
                
            </el-tab-pane>           
        </el-tabs>

        <el-tabs v-else  class='user-form' v-model="active_name" @tab-click="tabChange">            
            <el-tab-pane label="企业认证" name="contact_information">
                
            </el-tab-pane>
            <el-tab-pane label="授权" name="base_information" >
                
            </el-tab-pane>
        </el-tabs>


    </section>
</template>

<script>
    export default {
        data() {
            return {
            	userRole:'geren',
            	active_name:"contact_information"
            }
        },
        methods: {
           tabChange(){

           },
           handleRemove(){}
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
</style>

