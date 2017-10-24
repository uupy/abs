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
                    self.list = response.data.list;
                    self.pageTotal = response.data.total;
                    self.pages = response.data.pages;
                }else{
                    self.$message({
                        message: response.msg,
                        type: 'error'
                    });
                }
            });
        },

        //获取发票
        getReceipts(options){
            const self = this;
            self.$nprogress.start();

            self.setState({
                attr:'onLoading',
                val:true
            });
            self.onHttp({
                method:'GET',
                path:'/invoice/list',
                params:{
                    curPage:self.currentPage,
                    pageSize:self.pageNum,
                    orderReceiptsId:options.orderReceiptsId?options.orderReceiptsId:''
                }
            },(response)=>{
                self.$nprogress.done();
                self.setState({
                    attr:'onLoading',
                    val:false
                });
                if(response.code > 0){
                    self.list.forEach((val,index)=>{
                        self.$set(val,'fp_list',response.data.list)
                    })                    
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