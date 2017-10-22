import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex);
// 应用的数据源
const state = {
    //定义一些组件间通信的变量
    url: `http://192.168.1.102:8282/api`,
    innerLoading: false,
    onLoading: false,
    isTimeOut: false,
    isKickedOut:false,
    username: JSON.parse(localStorage.getItem('username') || '0'),
    token: JSON.parse(localStorage.getItem('token') || '0'),
    styles:'min-height:'+(window.innerHeight-84)+'px',

    // user_role:parseInt(localStorage.getItem('user_role')),
    // enterprise_menu_type:0,

    // 用户角色 1>admin 2>企业法人 3>代理人1 4>代理人2 5>对接人  
    user_type:parseInt(localStorage.getItem('user_type') || '0'),
    // 企业角色 1>保理商 2>核心企业 3>供应商 4>项目公司及子公司 5>合作方spv 6>合作方其他
    enterprise_type:parseInt(localStorage.getItem('enterprise_type') || '0'),
    // 子菜单类型 1>企业信息 2>企业汇总 3>集团管理 4>融资客户管理 5>合作方管理 6>未签约协议 7>已签约协议 8>应付数据 9>待审核资产 10>应付数据 11>待分配资产 12>待放款资产 13>台账管理
    nav_menu_type:parseInt(localStorage.getItem('nav_menu_type') || '0'),
    // 操作权限
    operate_authority:JSON.parse(localStorage.getItem('operate_authority') || 'false')
}
// 定义所需的 mutations   可以在其他组件修改变量
const mutations = {
    // 登录更新基本信息 更新操作权限
    updateOperateAuthority(state){
        function set_operate_authority(val){
            localStorage.setItem('operate_authority',val);
            state.operate_authority = val;
        }
        if(state.user_type === 1 || state.user_type === 2){
            switch(state.enterprise_type){
                case 1:
                    set_operate_authority(true);
                    break;
                case 2:
                    if(state.nav_menu_type === 2 || state.nav_menu_type === 4 || state.nav_menu_type === 5){
                        set_operate_authority(false);
                    }else{
                        set_operate_authority(true);
                    }
                    break;
                case 3:
                    if(state.nav_menu_type === 2 || state.nav_menu_type === 3 || state.nav_menu_type === 5){
                        set_operate_authority(false);
                    }else{
                        set_operate_authority(true);
                    }
                    break;
                case 4:
                    if(state.nav_menu_type === 2 || state.nav_menu_type === 3 || state.nav_menu_type === 4 || state.nav_menu_type === 5){
                        set_operate_authority(false);
                    }else{
                        set_operate_authority(true);
                    }
                    break;
                case 5:
                    if(state.nav_menu_type === 2 || state.nav_menu_type === 3 || state.nav_menu_type === 4 || state.nav_menu_type === 5){
                        set_operate_authority(false);
                    }else{
                        set_operate_authority(true);
                    }
                    break;
                case 6:
                    set_operate_authority(false);
                    break;
                default:
                    set_operate_authority(false);
                    break;
            }
        }else{
            set_operate_authority(false);
        }
    },
    saveStorageState(state,options){
        if(Object.prototype.toString.call(options) == '[object Object]'){
            localStorage.setItem(options.attr,JSON.stringify(options.val));
            if(state[options.attr] !== undefined){
                switch(options.type){
                    case 'number':
                        state[options.attr] = parseInt(localStorage.getItem(options.attr));
                        break;
                    case 'boolean':
                    case 'object':
                    case 'string':
                        state[options.attr] = JSON.parse(localStorage.getItem(options.attr));
                        break;
                    default :
                        state[options.attr] = JSON.parse(localStorage.getItem(options.attr));
                        break;
                }
            }
        }else if(Object.prototype.toString.call(options) == '[object Array]'){
            options.forEach((item)=>{
                localStorage.setItem(item.attr,JSON.stringify(item.val));
                if(state[item.attr] !== undefined){
                    switch(item.type){
                        case 'number':
                            state[item.attr] = parseInt(localStorage.getItem(item.attr));
                            break;
                        case 'boolean':
                        case 'object':
                        case 'string':
                            state[item.attr] = JSON.parse(localStorage.getItem(item.attr));
                            break;
                        default :
                            state[item.attr] = JSON.parse(localStorage.getItem(item.attr));
                            break;
                    }
                }
            });
        }
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
