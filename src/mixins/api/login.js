export default{
	data(){
		return{
			loginForm: {
			    account: '',
			    password: ''
			},
			addClusterForm: {
			    name: '',
			    address: ''
			}
		}
	},
	methods:{
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
	                username: self.loginForm.account,
	                password: MD5(self.loginForm.password)
	            };

	            //模拟登录
	            const users = {
	            	admin:{password:'admin',role:1},
	            	user1:{password:'user1',role:2},
	            	user2:{password:'user2',role:3},
	            	user3:{password:'user3',role:4},
	            	user4:{password:'user4',role:5},
	            };
	            let login_status = false;
	            let login_role = 1;
	            if(users[self.loginForm.account]){
	            	if(self.loginForm.password === users[self.loginForm.account].password){
	            		console.log(users[self.loginForm.account].role)
	            		localStorage.setItem('username',self.loginForm.account);
	            		localStorage.setItem('user_role',users[self.loginForm.account].role);
	            		self.$router.push({ path: '/pages/enterprise' });
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
	            self.$http({
	                method: 'POST',
	                url:`${self.url}/authentication/login`,
	                body: JSON.stringify(params)
	            }).then((response) => {
	                // 响应成功回调
	                const res = response.data;
	                if (res.ecode == 0) {
	                    const data = res.data;
	                    let tokenJson = JSON.parse(Base64.decode(data.token.split('.')[1]));
                        //保存用户登录信息
                        sessionStorage.setItem('username', data.username);
                        sessionStorage.setItem('token', data.token);
                        sessionStorage.setItem('isRoot', JSON.stringify(data.isroot));
                        sessionStorage.setItem('exptime', JSON.stringify(tokenJson.exp - tokenJson.iat));
                        sessionStorage.setItem('clientSt', JSON.stringify(Date.parse(new Date())/1000));
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
		        
		    });
		}
	}
}