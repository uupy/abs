export default {
    data(){
        return{
            
        }
    },
    methods: {
        // 确认登录
        handleSubmit(formName) {
            const self = this;
            self.$refs[formName].validate((valid) => {
                if (!valid) {return false;}
                sessionStorage.clear();
                self.$nprogress.start();
                self.setState({
                    attr:'innerLoading',
                    val:true
                });
                const params = {
                    mobile: self.loginForm.account,
                    password: MD5(self.loginForm.password)
                };

                self.$http({
                    method: 'POST',
                    url:`${self.url}/doLogin`,
                    body: JSON.stringify(params)
                }).then((response) => {
                    // 响应成功回调
                    const res = response.data;
                    console.log(res)
                    if (res.ecode == 0) {
                        const data = res.data;
                        // let tokenJson = JSON.parse(Base64.decode(data.token.split('.')[1]));
                        //保存用户登录信息
                        sessionStorage.setItem('username', data.username);
                        sessionStorage.setItem('token', data.token);
                    } else {
                        self.$nprogress.done();
                        self.setState({
                            attr:'innerLoading',
                            val:false
                        });
                        self.$message({
                            message: res.message,
                            type: 'error'
                        });
                    }
                }, (response) => {
                    //响应错误回调
                    self.$nprogress.done();
                    self.setState({
                        attr:'innerLoading',
                        val:false
                    });
                });
                return false;
                //模拟登录
                const users = {
                    //用户角色 1>核心企业 2>项目公司 3>供应商 4>保理商 5>资金方
                    user1:{password:'user1',role:1},
                    user2:{password:'user2',role:2},
                    user3:{password:'user3',role:3},
                    admin:{password:'admin',role:4},
                    user5:{password:'user5',role:5},
                };
                let login_status = false;
                let login_role = 1;
                if(users[self.loginForm.account]){
                    if(self.loginForm.password === users[self.loginForm.account].password){
                        localStorage.setItem('username',self.loginForm.account);
                        localStorage.setItem('user_role',users[self.loginForm.account].role);
                        self.updateBaseInfo();
                        if(users[self.loginForm.account].role === 1 || users[self.loginForm.account].role === 4){
                            self.$router.push({ path: '/pages/core' });
                        }else{  
                            self.$router.push({ path: '/pages/enterprise/views' });
                        }
                    }else{
                        self.$message({
                            message: '密码有误！',
                            type: 'error'
                        });
                        self.$nprogress.done();
                        self.setState({
                            attr:'innerLoading',
                            val:false
                        });
                    }
                }else{
                    self.$message({
                        message: '不存在用户！',
                        type: 'error'
                    });
                    self.$nprogress.done();
                    self.setState({
                        attr:'innerLoading',
                        val:false
                    });
                }
                return false;
                
                
            });
        }
    }
}