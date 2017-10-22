export default {
    data(){
        return{}
    },
    methods: {
        // 退出登录
        logout () {
            const self = this;
            self.$confirm('确认退出吗?', '提示').then(() => {
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
                        path:'/user/moidfypassword',
                        params:{
                            username:self.username,
                            oldpassword:MD5(resetPwdForm.oldPassword),
                            newpassword:MD5(resetPwdForm.newPassword)
                        }
                    },(response)=>{
                        self.setState({
                            attr:'innerLoading',
                            val:false
                        });
                        if(response.code > 0){
                            self.dialogFormVisible = false;
                            self.$message({
                                message: '密码修改成功！',
                                type: 'success'
                            });
                            setTimeout(()=>{
                                self.$confirm('重新登录?', '提示').then(() => {
                                    self.logout();
                                }).catch(() => {});
                            },30)
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