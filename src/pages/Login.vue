<template>
    <section class="login-wrap">
        <div class="login-center">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="loginform">
                <el-form-item>
                    <h2 class="login-title">高银保理金信系统</h2>
                    <!-- <div class="login-txt">Welcome to goldin</div> -->
                </el-form-item>
                <el-form-item prop="account" class="login-input">
                    <el-input id="login_account" type="text" v-model="loginForm.account" auto-complete="off">
                        <template slot="prepend">
                            <i class="iconfont icon-zhanghu"></i>
                        </template>
                    </el-input>
                    <span class="placeholder-txt" @click="accountPlaceholder = false" v-if="accountPlaceholder">请输入账号</span>
                </el-form-item>
                <el-form-item prop="password" class="login-input">
                    <el-input id="login_password" type="password" v-model="loginForm.password" auto-complete="off">
                        <template slot="prepend">
                            <i class="iconfont icon-mima"></i>
                        </template>
                    </el-input>
                    <span class="placeholder-txt" v-if="passworPlaceholder">请输入密码</span>
                </el-form-item>
                <el-form-item>
                    <el-button id="login_submit" type="primary" style="width:100%;" @click.native.prevent="handleSubmit('loginForm')" :loading="innerLoading">登 录</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="login-bg"></div>
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
                },
                accountPlaceholder:true,
                passworPlaceholder:true
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
        watch:{
            loginForm:{
                handler:function(newval){
                    if(newval.account !== ''){
                        this.accountPlaceholder = false;
                    }else{
                        this.accountPlaceholder = true;
                    }
                    if(newval.password !== ''){
                        this.passworPlaceholder = false;
                    }else{
                        this.passworPlaceholder = true;
                    }
                },
                deep:true
            }
        },
        destroyed() {
            const self = this;
            document.removeEventListener("keyup", self.enterKeyup, false);
        }
    }
</script>