export default{
	data(){
		return{
			loginForm: {
			    account: '',
			    password: ''
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
	            	// 企业角色 1>保理商 2>核心企业 3>供应商 4>项目公司及子公司 5>合作方spv 6>合作方其他
	            	admin:{password:'admin',role:1},
	            	user2:{password:'user2',role:2},
	            	user3:{password:'user3',role:3},
	            	user4:{password:'user4',role:4},
	            	user5:{password:'user5',role:5},
	            	user6:{password:'user6',role:6},
	            };
	            if(users[self.loginForm.account]){
	            	if(self.loginForm.password === users[self.loginForm.account].password){
	            		self.saveStorageState([
	            		    {attr:'token',val:''},
	            		    {attr:'username',val:self.loginForm.account},
	            		    {attr:'user_type',val:1,type:'number'},
	            		    {attr:'enterprise_type',val:users[self.loginForm.account].role,type:'number'},
	            		]);
	            		if(users[self.loginForm.account].role === 1){
	            		    self.$router.push({ path: '/pages/all_enterprise' });
	            		}else if(users[self.loginForm.account].role === 2){
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
	            self.$http({
	                method: 'POST',
	                url:`${self.url}/authentication/login`,
	                body: JSON.stringify(params)
	            }).then((response) => {
	                // 响应成功回调
	                const res = response.data;
	                if (res.ecode == 0) {
	                    const data = res.data;
	                    // let tokenJson = JSON.parse(Base64.decode(data.token.split('.')[1]));
                        //保存用户登录信息
                        sessionStorage.setItem('username', data.username);
                        sessionStorage.setItem('token', data.token);
                        // sessionStorage.setItem('isRoot', JSON.stringify(data.isroot));
                        // sessionStorage.setItem('exptime', JSON.stringify(tokenJson.exp - tokenJson.iat));
                        // sessionStorage.setItem('clientSt', JSON.stringify(Date.parse(new Date())/1000));
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