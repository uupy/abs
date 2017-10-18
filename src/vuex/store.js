import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);
// 应用的数据源
const state = {
    //定义一些组件间通信的变量
    url: `http://115.28.0.94:8181/api`,
    innerLoading: false,
    onLoading: false,
    isTimeOut: false,
    isKickedOut:false,
    username: localStorage.getItem('username') || '',
    token: localStorage.getItem('token'),
    styles:'min-height:'+(window.innerHeight-84)+'px',

    //用户角色 1>核心企业 2>项目公司 3>供应商 4>保理商 5>资金方
    user_role:parseInt(localStorage.getItem('user_role')),
    enterprise_menu_type:0
}
// 定义所需的 mutations   可以在其他组件修改变量
const mutations = {
    //登录更新基本信息
    updateBaseInfo(state) {
        state.username = localStorage.getItem('username');
        state.token = localStorage.getItem('token');
        state.user_role = parseInt(localStorage.getItem('user_role'));
    },
    setState(state,options){
        if(Object.prototype.toString.call(options) == '[object Object]'){
            state[options.attr] = options.val;
        }else if(Object.prototype.toString.call(options) == '[object Array]'){
            if(options.length>0){
                options.forEach((item)=>{
                    state[item.attr] = item.val;
                });
            }
        }
    }
}
// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})
