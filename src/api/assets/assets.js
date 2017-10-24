export default {
    data(){
        return{}
    },
    methods: {
        getAssetsList(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/orderReceipts/list',
                params:{
                    curPage:self.currentPage,
                    pageSize:self.pageNum,
                    productCompanyName:options&&options.productCompanyName?options.productCompanyName:'',
                    state:options&&options.state?options.state:'',
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
        }
    }
}