export default {
    data(){
        return{}
    },
    methods: {
        // 退出登录
        logout () {
            const self = this;
            self.$confirm('确认退出吗?', '提示',{
                type: 'warning'
            }).then(() => {
                localStorage.clear();
                const self = this;
                self.$nprogress.start();
                self.setState({
                    attr:'onLoading',
                    val:true
                });
                self.onHttp({
                    method:'POST',
                    path:'/logout'
                },(response)=>{
                    self.$nprogress.done();
                    self.setState({
                        attr:'onLoading',
                        val:false
                    });
                    if(response.code > 0){
                        localStorage.clear();
                        self.$router.push('/login');
                    } else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            }).catch(() => {});
        },
        // 修改密码
        resetPassword(formName,resetPwdForm){
            const self = this;
            self.$refs[formName].validate((valid)=>{
                if(!valid){return false}
                if(resetPwdForm.newPassword !== resetPwdForm.confirmPassword){
                    self.$message({
                        message: '新密码与确认密码不一致！',
                        type: 'error'
                    });
                }else{
                    self.setState({
                        attr:'innerLoading',
                        val:true
                    });
                    self.onHttp({
                        method:'POST',
                        path:'/updatePassword',
                        params:{
                            oldPassword:resetPwdForm.oldPassword,
                            newPassword:resetPwdForm.newPassword,
                            confirmNewPassword:resetPwdForm.confirmPassword
                        }
                    },(response)=>{
                        self.setState({
                            attr:'innerLoading',
                            val:false
                        });
                        if(response.code > 0){
                            self.dialogFormVisible = false;
                            self.$confirm('密码修改成功,请重新登录','提示',{
                                confirmButtonText: '确定',
                                closeOnClickModal:false,
                                showCancelButton:false,
                                type: 'warning',
                                callback:function(){
                                    localStorage.clear();
                                    self.$router.push('/login');
                                }
                            });
                        }else{
                            self.$message({
                                message: response.msg,
                                type: 'error'
                            });
                        }
                    });
                }
            });
        }
    }
}