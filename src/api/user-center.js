export default {
    data(){
        return{}
    },
    methods: {
        // 获取基本信息
        getEnterpriseInfo () {
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/authenticate/enterpriseAuthenticationInfo'
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    if (response.data) {
                        self.enterprise.code = response.data.code || '';
                        self.enterprise.enerprise_name = response.data.enterprise_name || '';
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
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