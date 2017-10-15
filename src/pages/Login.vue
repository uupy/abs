<template>
    <section class="login-wrap">
        <div class="login-center">
            <h3 class="login-title">
                <span class="login-title-con"><i>ABS</i>系统</span>
            </h3>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="loginform">
                <p class="login-txt">Welcome to ABS</p>
                <el-form-item prop="account">
                    <el-input id="login_account" type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号">
                        <template slot="prepend">
                            <i class="im-icon-username"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input id="login_password" type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码">
                        <template slot="prepend">
                            <i class="im-icon-password"></i>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item style="width:17%;">
                    <el-button id="login_submit" type="primary" style="width:100%;" @click.native.prevent="handleSubmit('loginForm')" :loading="innerLoading">登录</el-button>
                </el-form-item>
            </el-form>
            <p class="footer">
                <!-- CopyRight by 有容云  www.youruncloud.com   版权所有 -->
            </p>
        </div>
        <!-- 对话框 -->
        <el-dialog title="创建集群" size="tiny" v-model="dialogFormVisible" @close="cancelAdd('addClusterForm')">
            <el-form :model="addClusterForm" :rules="rules" ref="addClusterForm">
                <el-form-item label="集群名称" prop="name">
                    <el-input type="name" v-model="addClusterForm.name" auto-complete="off" placeholder="请输入集群名称"></el-input>
                </el-form-item>
                <el-form-item label="集群IP" prop="address">
                    <el-input type="address" v-model="addClusterForm.address" auto-complete="off" placeholder="请输入集群IP"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addCLuster('addClusterForm',addClusterForm)">确 定</el-button>
                <el-button @click="cancelAdd('addClusterForm')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '../mixins/common.js'
    import Login from '../mixins/api/login.js'
    import TestName from '../mixins/test/name.js'
    import TestAddress from '../mixins/test/address.js'
    export default {
        data() {
            return {
                checked: true,
                dialogFormVisible: false,
                rules: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ],
                    name: [
                        { required: true, validator: this.testName('集群名称'), trigger: 'change' }
                    ],
                    address: [
                        { required: true, validator: this.testAddress('集群IP'), trigger: 'change' }
                    ]
                }
            }
        },
        mixins:[Common,Login,TestName,TestAddress],
        methods: {
            //取消创建
            cancelAdd(formName) {
                const self = this;
                self.$refs[formName].resetFields();
                self.dialogFormVisible = false;
            },
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    if(self.dialogFormVisible){
                        self.addCLuster('addClusterForm',self.addClusterForm);
                    }else{
                        self.handleSubmit('loginForm');
                    }
                }
            }
        },
        mounted() {
            const self = this;
            document.addEventListener("keyup", self.enterKeyup, false);
        },
        destroyed() {
            const self = this;
            document.removeEventListener("keyup", self.enterKeyup, false);
        }
    }
</script>