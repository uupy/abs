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
                if (!valid) {return false;}
                localStorage.clear();
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
                    if (res.ecode > 0) {
                        const data = res.data;
                        // let tokenJson = JSON.parse(Base64.decode(data.token.split('.')[1]));
                        //保存用户登录信息
                        localStorage.setItem('username', data.username);
                        localStorage.setItem('token', data.token);
                    } else {
                        self.$nprogress.done();
                        self.setState({
                            attr:'innerLoading',
                            val:false
                        });
                        self.$message({
                            message: res.msg,
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
            });
        }
    }
}