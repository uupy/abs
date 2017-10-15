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
		// 登录成功，暂无集群时的提示
		createClusterTips(opt){
			const self = this;
		    self.$nprogress.done();
			self.setState({
				attr:'innerLoading',
				val:false
			});
			if (opt == 1) {
			    self.$confirm('您当前还没有集群，先创建一个集群?', '温馨提示', {
			        type: 'default'
			    }).then(() => {
			        // 弹出对话框 
			        self.dialogFormVisible = true;
			    }).catch(() => {});
			} else {
			    self.$alert('您当前未有可管理的集群，请联系超级管理员', '温馨提示', {
			        confirmButtonText: '确定'
			    });
			}
		},
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
	            sessionStorage.setItem('username',self.loginForm.account);
	            self.$router.push({ path: '/pages/enterprise' });
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
                        if (data.clusters.length > 0) {
                            var isnull = true;
                            data.clusters.forEach((item) => {
                                if (item.isauth) {
                                    isnull = false;
                                }
                            });
                            if (!isnull) {
                                if(data.currentcluster){
                                    sessionStorage.setItem('clusterid', data.currentcluster.id);
                                    sessionStorage.setItem('clusteruuid', data.currentcluster.uuid);
                                    sessionStorage.setItem('clustername', data.currentcluster.name);
                                    self.updateCluster();
                                }
                                self.getLicense(()=>{
                                	self.$router.push({ path: '/pages/cluster' });
                                })
                            } else {
                            	self.createClusterTips(data.isroot);
                            }
                        } else {
                            self.updateCluster();
                            self.createClusterTips(data.isroot);
                        }
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
		},
		// 创建集群
		addCLuster(formName, addClusterForm) {
		    const self = this;
		    self.$refs[formName].validate((valid) => {
		        if (!valid) {return false}
	        	self.$nprogress.start();
	        	self.setState({
	        	    attr:'innerLoading',
	        	    val:true
	        	});
	            self.onHttp({
	                method: 'POST',
	                path: '/cluster/add',
	                params:{
	                    name: addClusterForm.name,
	                	ip: addClusterForm.address
	                }
	            },(response) => {
	                if (response.ecode == 0) {
	                    self.$message({
	                        message: '成功创建集群' + addClusterForm.name,
	                        type: 'success'
	                    });
	                    self.dialogFormVisible = false;
	                    sessionStorage.setItem('clusterid', response.data.id);
	                    sessionStorage.setItem('clusteruuid', response.data.uuid);
	                    sessionStorage.setItem('clustername', response.data.name);
	                    self.updateCluster();
	                    self.getLicense(()=>{
	                    	self.$router.push({ path: '/pages/cluster' });
	                    })
	                } else {
	                	self.$nprogress.done();
	                	self.setState({
	                	    attr:'innerLoading',
	                	    val:false
	                	});
	                    self.$message({
	                        message: response.message,
	                        type: 'error'
	                    });
	                }
	            });
		    });
		},
		// 获取License信息
        getLicense(callback) {
            const self = this;
            self.onHttp({
            	method:'GET',
                path: '/license/get',
                params:{
                	clusterid: self.clusterid
                }
            }, (response) => {
	            self.$nprogress.done();
            	self.setState({
        			attr:'innerLoading',
        			val:false
        		});
            	Util.isFunction(callback) ? callback() : '';
                if (response.ecode == 0) {
                    const data = response.data;
                    if (data == null) { return }
                	if(data.LeftSeconds == 0){
                		self.setState({
                        	attr:'inactivated',
                        	val:true
                        });
                        sessionStorage.setItem('inactivated', true);
                	}else{
                		self.setState({
                        	attr:'inactivated',
                        	val:false
                        });
                        sessionStorage.setItem('inactivated', false);
                	}
                } else {
                    self.$message({
                        message: response.message,
                        type: 'error'
                    });
                }
            });
        }
	}
}