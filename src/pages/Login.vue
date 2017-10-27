<template>
    <section class="login-wrap">
        <div class="login-center">
            <h3 class="login-title">
                <span class="login-title-con"><i>高银保理金信</i>系统</span>
            </h3>
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="loginform">
                <p class="login-txt">Welcome to goldin</p>
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
        </div>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Login from '@/api/login.js'
    export default {
        data() {
            return {
                checked: true,
                rules: {
                    account: [
                        { required: true, message: '请输入账号', trigger: 'change' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'change' }
                    ]
                }
            }
        },
        mixins:[Common,Login],
        methods: {
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    if(!self.innerLoading){
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