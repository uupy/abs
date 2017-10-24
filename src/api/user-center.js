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