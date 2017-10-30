
const Login = resolve => require(['./pages/Login.vue'], resolve)
const NotFound = resolve => require(['./pages/404.vue'], resolve)
const Home = resolve => require(['./pages/Home.vue'], resolve)
const UserCenter = resolve => require(['./pages/user-center.vue'], resolve)

//企业管理
const AllEnterpriseList = resolve => require(['./pages/enterprise/all_enterprise.vue'],resolve)
const CoreList = resolve => require(['./pages/enterprise/core.vue'],resolve)
const SupplierList = resolve => require(['./pages/enterprise/supplier.vue'],resolve)
const CapitalList = resolve => require(['./pages/enterprise/capital.vue'],resolve)
const EnterpriseViews = resolve => require(['./pages/enterprise/views.vue'],resolve)

//协议管理
const ProtocolNotSignedList = resolve => require(['./pages/protocol/protocol_notsigned.vue'],resolve)
const ProtocolSignedList = resolve => require(['./pages/protocol/protocol_signed.vue'],resolve)
const ProtocolDetail = resolve => require(['./pages/protocol/protocol_detail.vue'],resolve)

//资产管理
const AssetsList = resolve => require(['./pages/assets/list.vue'],resolve)
const AssetsStatistics = resolve => require(['./pages/assets/statistics.vue'],resolve)
const StandingBook = resolve => require(['./pages/assets/standing-book.vue'],resolve)
const PropertyToBeVerify = resolve => require(['./pages/assets/property-to-verify.vue'],resolve)
const PropertyToRegister = resolve => require(['./pages/assets/property-to-register.vue'],resolve)
const PropertyToBeDist = resolve => require(['./pages/assets/property-to-dist.vue'],resolve)
const PropertyToIssued = resolve => require(['./pages/assets/property-to-issued.vue'],resolve)
const PropertyToBeLoan = resolve => require(['./pages/assets/property-to-loan.vue'],resolve)

//结算管理
const SettlementBackMoney = resolve => require(['./pages/settlement/back_money.vue'],resolve)
const SettlementAssetsToBeSettled = resolve => require(['./pages/settlement/assets_to_be_settled.vue'],resolve)
const SettlementAssetsSettled = resolve => require(['./pages/settlement/assets_settled.vue'],resolve)
const SettlementOverdue = resolve => require(['./pages/settlement/overdue.vue'],resolve)
const SettlementAccountInfo = resolve => require(['./pages/settlement/account_info.vue'],resolve)
const SettlementSettledDetail = resolve => require(['./pages/settlement/settled_detail.vue'],resolve)

//用户管理
const UserMangementList = resolve => require(['./pages/userMangement/user-list.vue'],resolve)

const Index = resolve => require(['./pages/index.vue'],resolve)

//企业角色 1>保理商 2>核心企业 3>供应商 4>项目公司及子公司 5>合作方spv 6>合作方其他
let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        leaf:true,
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        leaf:true,
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf:true,
        hidden: true,
        children:[
            {
                path:'/user-center',
                name:'用户中心',
                component:UserCenter,
                show:{
                    1:true,    //保理商
                    2:true,    //核心企业
                    3:true,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                }
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '默认首页',
        iconCls: 'icon-home2',
        leaf:true,
        show:{
            1:true,     //保理商
            2:true,     //核心企业
            3:true,     //供应商
            4:true,     //项目公司及子公司
            5:true,     //合作方spv
            6:true      //合作方其他
        },
        children:[
            {
                path: '/pages/index',
                component: Index,
                name: '首页',
                show:{
                    1:true,     //保理商
                    2:true,     //核心企业
                    3:true,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                }
            },
        ]
        
    },
    {
        path: '/',
        component: Home,
        name: '企业管理',
        iconCls: 'icon-qiye',
        show:{
            1:true,     //保理商
            2:true,     //核心企业
            3:true,     //供应商
            4:true,     //项目公司及子公司
            5:true,     //合作方spv
            6:true      //合作方其他
        },
        children: [
            {
                path: '/pages/enterprise/views',
                component: EnterpriseViews,
                name: '企业信息',
                show:{
                    1:false,    //保理商
                    2:false,    //核心企业
                    3:true,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                }
            },
            {
                path: '/pages/all_enterprise',
                component: {template:'<router-view></router-view>'},
                name: '企业汇总',
                show:{
                    1:true,      //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:false,     //合作方spv
                    6:false      //合作方其他
                },
                children:[
                    {
                        path: '/pages/all_enterprise',
                        component: AllEnterpriseList,
                        name: '企业汇总列表',
                    },
                    {
                        path: '/pages/all_enterprise/views',
                        component: EnterpriseViews,
                        name: '企业汇总详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/core',
                component: {template:'<router-view></router-view>'},
                name: '集团管理',
                show:{
                    1:true,      //保理商
                    2:true,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/core',
                        component: CoreList,
                        name: '集团列表',
                    },
                    {
                        path: '/pages/core/views',
                        component: EnterpriseViews,
                        name: '集团详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/supplier',
                component: {template:'<router-view></router-view>'},
                name: '融资客户管理',
                show:{
                    1:true,      //保理商
                    2:true,     //核心企业
                    3:false,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/supplier',
                        component: SupplierList,
                        name: '融资客户列表',
                    },
                    {
                        path: '/pages/supplier/views',
                        component: EnterpriseViews,
                        name: '融资客户详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/capital',
                component: {template:'<router-view></router-view>'},
                name: '合作方管理',
                show:{
                    1:true,      //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:false,     //合作方spv
                    6:false      //合作方其他
                },
                children:[
                    {
                        path: '/pages/capital',
                        component: CapitalList,
                        name: '合作方列表',
                    },
                    {
                        path: '/pages/capital/views',
                        component: EnterpriseViews,
                        name: '合作方详情',
                        hidden: true
                    },
                ]
            },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '协议管理',
        iconCls: 'icon-protocol',
        show:{
            1:true,     //保理商
            2:true,     //核心企业
            3:true,     //供应商
            4:true,     //项目公司及子公司
            5:true,     //合作方spv
            6:true      //合作方其他
        },
        children: [
            {
                path: '/pages/protocol_notsigned',
                component: {template:'<router-view></router-view>'},
                name: '未签约协议',
                show:{
                    1:true,     //保理商
                    2:true,     //核心企业
                    3:true,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/protocol_notsigned',
                        component: ProtocolNotSignedList,
                        name: '未签约协议列表',
                    },
                    {
                        path: '/pages/protocol_notsigned/views',
                        component: ProtocolDetail,
                        name: '未签约协议详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/protocol_signed',
                component: {template:'<router-view></router-view>'},
                name: '已签约协议',
                show:{
                    1:true,     //保理商
                    2:true,     //核心企业
                    3:true,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/protocol_signed',
                        component: ProtocolSignedList,
                        name: '已签约协议列表',
                    },
                    {
                        path: '/pages/protocol_signed/views',
                        component: ProtocolDetail,
                        name: '已签约协议详情',
                        hidden: true
                    },
                ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '资产管理',
        iconCls: 'icon-money',
        show:{
            1:true,     //保理商
            2:true,     //核心企业
            3:true,     //供应商
            4:true,     //项目公司及子公司
            5:true,     //合作方spv
            6:true      //合作方其他
        },
        children: [
            {
                path: '/pages/assets/list',
                component: AssetsList,
                name: '应付数据',
                show:{
                    1:true,     //保理商
                    2:true,     //核心企业
                    3:true,     //供应商
                    4:true,     //项目公司及子公司
                    5:false,     //合作方spv
                    6:false      //合作方其他
                }
            },
            {
                path: '/pages/assets/property-to-verify',
                component: {template:'<router-view></router-view>'},
                name: '待审核资产',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:false      //合作方其他
                },
                children:[
                    {
                        path: '/pages/assets/property-to-verify',
                        component: PropertyToBeVerify,
                        name: '待审核资产列表',
                    },
                    {
                        path: '/pages/assets/property-to-verify/views',
                        component: ProtocolDetail,
                        name: '待审核资产详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/assets/property-to-register',
                component: {template:'<router-view></router-view>'},
                name: '待中登网登记',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:false,     //合作方spv
                    6:false      //合作方其他
                },
                children:[
                    {
                        path: '/pages/assets/property-to-register',
                        component: PropertyToRegister,
                        name: '待中登网登记列表',
                    },
                    {
                        path: '/pages/assets/property-to-register/views',
                        component: ProtocolDetail,
                        name: '待中登网登记详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/assets/property-to-dist',
                component: {template:'<router-view></router-view>'},
                name: '待分配资产',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:false,     //合作方spv
                    6:false      //合作方其他
                },
                children:[
                    {
                        path: '/pages/assets/property-to-dist',
                        component: PropertyToBeDist,
                        name: '待分配资产列表',
                    },
                    {
                        path: '/pages/assets/property-to-dist/views',
                        component: ProtocolDetail,
                        name: '待分配资产详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/assets/property-to-loan',
                component: {template:'<router-view></router-view>'},
                name: '待放款资产',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:false      //合作方其他
                },
                children:[
                    {
                        path: '/pages/assets/property-to-loan',
                        component: PropertyToBeLoan,
                        name: '待放款资产列表',
                    },
                    {
                        path: '/pages/assets/property-to-loan/views',
                        component: ProtocolDetail,
                        name: '待放款资产详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/assets/property-to-issued',
                component: {template:'<router-view></router-view>'},
                name: '待发行资产',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:false,     //合作方spv
                    6:false      //合作方其他
                },
                children:[
                    {
                        path: '/pages/assets/property-to-issued',
                        component: PropertyToIssued,
                        name: '待发行资产列表',
                    },
                    {
                        path: '/pages/assets/property-to-issued/views',
                        component: ProtocolDetail,
                        name: '待发行资产详情',
                        hidden: true
                    },
                ]
            }, 
            {
                path: '/pages/assets/standing-book',
                component: {template:'<router-view></router-view>'},
                name: '台账管理',
                show:{
                    1:true,     //保理商
                    2:true,     //核心企业
                    3:true,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/assets/standing-book',
                        component: StandingBook,
                        name: '台账管理列表',
                    },
                    {
                        path: '/pages/assets/standing-book/views',
                        component: ProtocolDetail,
                        name: '台账管理详情',
                        hidden: true
                    },
                ]
            },
            
        ]
    },
    {
        path: '/',
        component: Home,
        name: '结算管理',
        iconCls: 'icon-acounts',
        show:{
            1:true,     //保理商
            2:true,     //核心企业
            3:false,     //供应商
            4:true,     //项目公司及子公司
            5:true,     //合作方spv
            6:true      //合作方其他
        },
        children: [
            {
                path: '/pages/settlement/backMoney',
                component: SettlementBackMoney,
                name: '回款管理',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                }
            },
            {
                path: '/pages/settlement/toBeSettled',
                component: {template:'<router-view></router-view>'},
                name: '待结算资产',
                show:{
                    1:true,     //保理商
                    2:true,     //核心企业
                    3:false,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/settlement/toBeSettled',
                        component: SettlementAssetsToBeSettled,
                        name: '待结算资产列表',
                    },
                    {
                        path: '/pages/settlement/toBeSettled/asstesviews',
                        component: ProtocolDetail,
                        name: '待结算资产详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/settlement/settled',
                component: {template:'<router-view></router-view>'},
                name: '已结清资产',
                show:{
                    1:true,     //保理商
                    2:true,     //核心企业
                    3:false,     //供应商
                    4:true,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/settlement/settled',
                        component: SettlementAssetsSettled,
                        name: '已结清资产列表',
                    },
                    {
                        path: '/pages/settlement/settled/asstesviews',
                        component: ProtocolDetail,
                        name: '已结清资产详情',
                        hidden: true
                    },
                    {
                        path: '/pages/settlement/settled/settledviews',
                        component: SettlementSettledDetail,
                        name: '已结清结算详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/settlement/overdue',
                component: {template:'<router-view></router-view>'},
                name: '逾期管理',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/settlement/overdue',
                        component: SettlementOverdue,
                        name: '逾期管理列表',
                    },
                    {
                        path: '/pages/settlement/overdue/asstesviews',
                        component: ProtocolDetail,
                        name: '逾期管理资产详情',
                        hidden: true
                    },
                    {
                        path: '/pages/settlement/overdue/settledviews',
                        component: SettlementSettledDetail,
                        name: '逾期管理结算详情',
                        hidden: true
                    },
                ]
            },
            {
                path: '/pages/settlement/accountInfo',
                component: {template:'<router-view></router-view>'},
                name: '账户信息',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:true,     //合作方spv
                    6:true      //合作方其他
                },
                children:[
                    {
                        path: '/pages/settlement/accountInfo',
                        component: SettlementAccountInfo,
                        name: '账户信息详情',
                    }
                ]
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '用户',
        iconCls: 'icon-user-manage',
        leaf:true,
        show:{
            1:true,     //保理商
            2:false,     //核心企业
            3:false,     //供应商
            4:false,     //项目公司及子公司
            5:false,     //合作方spv
            6:false      //合作方其他
        },
        children:[
            {
                path: '/pages/userMangement/user-list',
                component: UserMangementList,
                name: '用户管理',
                show:{
                    1:true,     //保理商
                    2:false,     //核心企业
                    3:false,     //供应商
                    4:false,     //项目公司及子公司
                    5:false,     //合作方spv
                    6:false      //合作方其他
                }
            },
        ]
        
    },    
    {
        path: '*',
        leaf:true,
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;