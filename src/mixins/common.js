import { mapState , mapActions } from 'vuex'
import VsLoading from '../components/vsLoading.vue'
export default {
    data() {
        return {
            isFirst:true
        }
    },
    methods: {
        // 登录超时函数
        fnTimeOut(){
            const self = this;
            localStorage.clear();
            self.setState([
                {attr:'onLoading',val:false},
                {attr:'innerLoading',val:false},
                {attr:'isTimeOut',val:true}
            ]);
            if(self.isFirst){
                self.isFirst = false;
                self.$confirm('用户未登录或会话已过期,请重新登录','提示',{
                    confirmButtonText: '确定',
                    closeOnClickModal:false,
                    showCancelButton:false,
                    type: 'warning',
                    callback:function(){
                        self.setState({
                            attr:'isTimeOut',val:false
                        });
                        self.isFirst = true;
                        localStorage.clear();
                        self.$router.push('/login');
                    }
                });
            }
        },
        // 全局http请求方法
        onHttp(options, successCallback, errorCallback) {
            const self = this;
            var options = options;
            var successCallback = successCallback;
            var errorCallback = errorCallback;
            if(self.isTimeOut || !Util.isObject(options)){return false;}
            // 默认使用GET请求
            options.method = (options.method ? options.method.toUpperCase() : null) || 'GET';
            let config = {
                method: options.method,
                url: `${self.url}${options.path}`,
                headers: {
                    "x-auth-token": `${self.token}`
                }
            }
            options.method == 'GET' ? config.params = options.params : (options.method == 'POST' ? config.body = JSON.stringify(options.params) : '');
            self.$http(config).then((response) => {
                const res = response.data;
                if(res.ecode == 9150 || res.ecode == 9401 || res.ecode == 9402){
                    self.fnTimeOut();
                }else{
                    Util.isFunction(successCallback) ? successCallback(res) : '';
                }
            }, (response) => {
                if(Util.isFunction(errorCallback)){
                    errorCallback(response)
                }else{
                    self.$nprogress.done();
                    self.setState([
                        {attr:'onLoading',val:false},
                        {attr:'innerLoading',val:false}
                    ]);
                    self.$message({
                        message: `请求结果：${response.ok}`,
                        type: 'error'
                    });
                    console.log(`请求地址：${response.url} 请求结果：${response.ok}`, 'error');
                }
            });
        },
        ...mapActions([
            'setState',
            'updateBaseInfo'
        ])
    },
    computed: {
        // 使用对象展开运算符将 getters 混入 computed 对象中
        ...mapState([
            'url',
            'isTimeOut',
            'username',
            'token',
            'styles',
            'onLoading',
            'innerLoading',
            'enterprise_menu_type',
            'user_role'
        ])
    },
    destroyed(){
        this.$nprogress.done();
        this.setState([
            {attr:'onLoading',val:false},
            {attr:'innerLoading',val:false}
        ]);
    },
    components:{
        VsLoading
    }
}