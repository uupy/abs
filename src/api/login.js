export default {
    data(){
        return{
            loginForm: {
                account: '',
                password: ''
            }
        }
    },
    methods: {
        // 确认登录
        handleSubmit(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (valid) {
                    self.$nprogress.start();
                    self.setState({
                        attr:'innerLoading',
                        val:true
                    });
                    self.$http({
                        method: 'POST',
                        url:`${self.url}/doLogin`,
                        headers:{
                            'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
                        },
                        body: `mobile=${self.loginForm.account}&password=${self.loginForm.password}`
                    }).then((response) => {
                        // 响应成功回调
                        const res = response.body;
                        self.$nprogress.done();
                        self.setState({
                            attr:'innerLoading',
                            val:false
                        });
                        if (res.code > 0) {
                            const data = res.data;
                            // 保存登录信息
                            if(data){
                                self.saveStorageState([
                                    {attr:'token',val:res.token},
                                    {attr:'username',val:self.loginForm.account},
                                    {attr:'user_type',val:data.entMemberType,type:'number'},
                                    {attr:'enterprise_type',val:data.enterpriseType,type:'number'},
                                    {attr:'enterprise_id',val:data.enterpriseId,type:'number'},
                                ]);
                                if(data.enterpriseType === 1){
                                    self.$router.push({ path: '/pages/all_enterprise' });
                                }else if(data.enterpriseType === 2){
                                    self.$router.push({ path: `/pages/core`});
                                }else{  
                                    self.$router.push({ path: `/pages/enterprise/views?enterpriseId=${self.enterprise_id}`});
                                }
                            }
                        } else {
                            self.$message({
                                message: res.msg,
                                type: 'error'
                            });
                        }
                    }, (response) => {
                        // 响应错误回调
                        self.$nprogress.done();
                        self.setState({
                            attr:'innerLoading',
                            val:false
                        });
                        self.$message({
                            message: '接口请求失败！',
                            type: 'error'
                        });
                    });
                }
            });
        }
    }
}