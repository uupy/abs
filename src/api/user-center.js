export default {
    data(){
        return{}
    },
    methods: {
        // 获取授权用户列表
        getUserList() {
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/authenticate/enterpriseMemberList'
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    if (response.data) {
                        if (Util.isArray(response.data.list)) {
                            self.company = response.data.list;
                        }
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        // 获取用户认证信息
        getUserInfo() {
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/authenticate/userAuthentication'
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    if (response.data) {
                        self.user.name = response.data.name || '';
                        self.user.mobile = response.data.mobile || '';
                        self.user.id_number = response.data.id_number || '';
                        self.user.back_path = response.data.idNumberBackPath || '';
                        self.user.front_path = response.data.idNumberFrontPath || '';
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },
        // 获取用户基本信息
        getUserBaseInfo(){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/authenticate/userInfo'
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    if (response.data) {
                        self.profile.name = response.data.name || '';
                        self.profile.role = self.roleType[response.data.roleType] || '未知';
                        self.profile.author = self.auditType[response.data.auditType] || '无';
                        self.profile.position = response.data.position || '';
                        self.profile.phone = response.data.mobile || '';
                        self.profile.email = response.data.email || '';
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        // 获取企业认证信息
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
                        self.enterprise.enterprise_name = response.data.enterprise_name || '';
                        self.enterprise.corporation_id_number = response.data.corporationIdNumber || '';
                        self.enterprise.corporation_name = response.data.corporationName || '';
                        self.enterprise.path = response.data.path || '';
                    }
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },
        // 企业认证
        addEnterpriseAuthentication(formName,enterprise){
            const self = this;
            self.$refs[formName].validate((valid)=>{
                if(!valid){return false}
                self.$nprogress.start();
                self.setState({
                    attr:'onLoading',
                    val:true
                });
                self.onHttp({
                    method:'POST',
                    path:'/authenticate/addEnterpriseAuthentication',
                    params:{
                        code:enterprise.code,
                        enterprise_name:enterprise.enterprise_name,
                        corporation_name:enterprise.corporation_name,
                        corporation_id_number:enterprise.corporation_id_number,
                        path:enterprise.path,
                        mobile:enterprise.mobile
                    }
                },(response)=>{
                    self.$nprogress.done();
                    self.setState({
                        attr:'onLoading',
                        val:false
                    });
                    if(response.code > 0){
                        self.$message({
                            message: response.msg,
                            type: 'success'
                        });
                    }else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },

        // 个人认证
        addUserAuthentication(formName,user){
            const self = this;
            self.$refs[formName].validate((valid)=>{
                if(!valid){return false}
                self.$nprogress.start();
                self.setState({
                    attr:'onLoading',
                    val:true
                });
                self.onHttp({
                    method:'POST',
                    path:'/authenticate/addUserAuthentication',
                    params:{
                        id_number:user.id_number,
                        name:user.name,
                        mobile:user.mobile,
                        id_number_path1:user.front_path,
                        id_number_path2:user.back_path,
                    }
                },(response)=>{
                    self.$nprogress.done();
                    self.setState({
                        attr:'onLoading',
                        val:false
                    });
                    if(response.code > 0){
                        self.$message({
                            message: response.msg,
                            type: 'success'
                        });
                    }else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },

        // 修改邮箱
        updateUserEmail(formName,profile){
            const self = this;
            self.$refs[formName].validate((valid)=>{
                if(!valid){return false}
                self.$nprogress.start();
                self.setState({
                    attr:'onLoading',
                    val:true
                });
                self.onHttp({
                    method:'POST',
                    path:'/entMember/updateEmail',
                    params:{
                        email:profile.email,
                    }
                },(response)=>{
                    self.$nprogress.done();
                    self.setState({
                        attr:'onLoading',
                        val:false
                    });
                    if(response.code > 0){
                        self.$message({
                            message: response.msg,
                            type: 'success'
                        });
                    }else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            });
        }
    }
}