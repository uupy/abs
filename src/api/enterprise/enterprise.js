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
                curPage:self.currentPage,
                pageSize:self.pageSize,
                keyword:self.filterKeyword
            };
            if(options){
                options.status ? params.status = options.status : '';
                options.type ? params.type = options.type : '';
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
                                item.index = (self.currentPage - 1)*self.pageSize + index + 1;
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
        addEnterprise(){
            const self = this;
            self.setState({
                attr:'innerLoading',
                val:true
            });
            self.onHttp({
                method:'POST',
                path:'/enterprise/add',
                params:{
                    name:self.add_form.name,
                    type:self.add_form.role
                }
            },(response)=>{
                self.setState({
                    attr:'innerLoading',
                    val:false
                });
                if(response.code > 0){
                    console.log(response)
                } else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
}