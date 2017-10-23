export default {
    data(){
        return{}
    },
    methods: {
        getProtocolList(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/protocol/list',
                params:{
                    curPage:self.currentPage,
                    pageSize:self.pageNum,
                    status:options.status?options.status:'',
                    keyword:options.keyword?options.keyword:'',
                    begin:options.begin?options.begin:'',
                    end:options.end?options.end:'',
                }
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    self.list = response.list;
                    self.clients_total = response.total;
                    self.pages = response.pages;
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },
        
        //未完
        getProtocolDetail(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/protocol/list',
                params:{
                    curPage:self.currentPage,
                    pageSize:self.pageNum
                }
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });

                if(response.code > 0){
                    self.list = response.list;
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        }
    }
}