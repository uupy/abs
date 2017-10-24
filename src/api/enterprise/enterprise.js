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
                (options.type && options.type !== 0) ? params.type = options.type : '';
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
                            data.list.forEach((item,index)=>{
                                item.index = (self.curPage - 1)*self.pageSize + index + 1;
                            });
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
        addEnterprise(formName){
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
                        self.getEnterpriseList({type:parseInt(self.enterpriseCurType)});
                    } else{
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