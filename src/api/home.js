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
        // 修改登录密码
        resetLoginPassword(){
            const self = this;
            if(self.resetLoginPwdForm.newPassword !== self.resetLoginPwdForm.confirmPassword){
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
                        oldPassword:self.resetLoginPwdForm.oldPassword,
                        newPassword:self.resetLoginPwdForm.newPassword,
                        confirmNewPassword:self.resetLoginPwdForm.confirmPassword
                    }
                },(response)=>{
                    self.setState({
                        attr:'innerLoading',
                        val:false
                    });
                    if(response.code > 0){
                        self.cancelReset();
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
        },
        // 修改登录密码
        resetSignPassword(){
            const self = this;
            if(self.resetSignPwdForm.newPassword !== self.resetSignPwdForm.confirmPassword){
                self.$message({
                    message: '新密码与确认密码不一致！',
                    type: 'error'
                });
            }else{


                return false;


                self.setState({
                    attr:'innerLoading',
                    val:true
                });
                self.onHttp({
                    method:'POST',
                    path:'/updatePassword',
                    params:{
                        oldPassword:self.resetSignPwdForm.oldPassword,
                        newPassword:self.resetSignPwdForm.newPassword,
                        confirmNewPassword:self.resetSignPwdForm.confirmPassword
                    }
                },(response)=>{
                    self.setState({
                        attr:'innerLoading',
                        val:false
                    });
                    if(response.code > 0){
                        self.cancelReset();
                        self.$message({
                            message: '签约密码修改成功！',
                            type: 'success'
                        });
                    }else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            }
        }
    }
}