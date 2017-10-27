export default {
    data(){
        return{}
    },
    methods: {
        // 获取所有企业列表
        getEnterpriseList(options){
            const self = this;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            let params = {
                curPage:self.curPage,
                pageSize:self.pageSize,
                keyword:self.filterKeyword
            };
            if(options){
                (options.status && options.status !== 0) ? params.status = options.status : '';
                options.type ? params.type = options.type : '';
                options.filter ? params.curPage = 1 : '';
            }
            self.onHttp({
                method:'GET',
                path:'/enterprise/list',
                params:params
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    const data = response.data;
                    if(data){
                        if(Util.isArray(data.list)){
                            // data.list.forEach((item,index)=>{
                            //     item.index = (self.curPage - 1)*self.pageSize + index + 1;
                            // });
                            self.list = data.list;
                            self.pageTotal = data.total;
                            self.pages = data.pages;
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
        // 新增企业
        addEnterprise(formName,options){
            const self = this;
            self.$refs[formName].validate((valid)=>{
                if(!valid){return false}
                self.setState({
                    attr:'innerLoading',
                    val:true
                });
                let params = {
                    name:self.addForm.name,
                    type:self.addForm.role
                }
                if(options){
                    if(Util.isNumber(options.role)){
                        params.type = options.role;
                    }
                }
                if(self.addForm.area !== ''){
                    params.area = self.addForm.area;
                }
                self.onHttp({
                    method:'POST',
                    path:'/enterprise/add',
                    params:params
                },(response)=>{
                    self.setState({
                        attr:'innerLoading',
                        val:false
                    });
                    if(response.code > 0){
                        self.$message({
                            message: response.msg,
                            type: 'success'
                        });
                        self.cancelAddEnterprise(formName);
                        self.getEnterpriseList({type:self.enterpriseCurType});
                    } else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            });
        },
        // 删除企业
        deleteEnterprise(row) {
            const self = this;
            self.$confirm('操作不可逆，确认删除吗?', '提示', {
                type: 'warning'
            }).then(() => {
                self.$nprogress.start();
                self.setState({
                    attr:'onLoading',
                    val:true
                });
                self.onHttp({
                    method:'GET',
                    path:'/enterprise/deleteEnterprise',
                    params:{
                        enterpriseId:row.id
                    }
                },(response)=>{
                    self.$nprogress.done();
                    self.setState({
                        attr:'onLoading',
                        val:false
                    });
                    if(response.code > 0){
                        self.$message({
                            message: row.name+'，已成功删除！',
                            type: 'success'
                        });

                        console.log(self.enterpriseCurType + ',111');
                        self.getEnterpriseList({status:parseInt(self.enterprise_status),type:self.enterpriseCurType});
                    }else{
                        self.$message({
                            message: response.msg,
                            type: 'error'
                        });
                    }
                });
            }).catch(() => {});
        }
    }
}