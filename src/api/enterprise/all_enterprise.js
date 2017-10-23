export default {
    data(){
        return{}
    },
    methods: {
        // 获取所有企业列表
        getAllEnterprise(){
            const self = this;
            return false;
            self.$nprogress.start();
            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/enterprise/list',
                params:{
                    curPage:self.clients_pagenum,
                    pageSize:self.clients_pagesize
                }
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
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