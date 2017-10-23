
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
const PropertyToBeDist = resolve => require(['./pages/assets/property-to-dist.vue'],resolve)
const PropertyToIssued = resolve => require(['./pages/assets/property-to-issued.vue'],resolve)
const PropertyToBeLoan = resolve => require(['./pages/assets/property-to-loan.vue'],resolve)

//结算管理

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
                component:UserCenter
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '企业管理',
        iconCls: 'im-icon-management',
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
        iconCls: 'im-icon-management',
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
        iconCls: 'im-icon-management',
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
                    2:true,     //核心企业
                    3:false,     //供应商
                    4:true,     //项目公司及子公司
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
                path: '/pages/assets/property-to-loan',
                component: {template:'<router-view></router-view>'},
                name: '待放款资产',
                show:{
                    1:false,     //保理商
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
        path: '*',
        leaf:true,
        hidden: true,
        redirect: {
            path: '/404'
        }
    }
];

export default routes;