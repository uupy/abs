<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar">
            <span class="title" style="font-size:16px;">{{enterprise_name}}</span>
        </el-row>
        <el-tabs v-model="active_name" @tab-click="tabChange">
            <el-tab-pane label="联系方式" name="contact_information">
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">企业联系方式</span>
                        <span class="subtxt" @click="dialog_edit_contact = true" v-if="operate_authority"><i class="im-icon-edit health"></i>编辑</span>
                    </el-col>
                    <el-col class="info-box" style="margin-top:-8px;">
                        <p>
                            <label>固定电话：</label>
                            <span>{{contact_form.telephone}}</span>
                        </p>
                        <p>
                            <label>传真号码：</label>
                            <span>{{contact_form.fax}}</span>
                        </p>
                        <p>
                            <label>官方网站：</label>
                            <span>{{contact_form.website}}</span>
                        </p>
                        <p>
                            <label>注册地址：</label>
                            <span>{{contact_form.registerAddress}}</span>
                        </p>
                        <p>
                            <label>联系地址：</label>
                            <span>{{contact_form.contactAddress}}</span>
                        </p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">联系人列表</span>
                        <span class="subtxt" @click="dialog_add_contact=true" v-if="operate_authority"><i class="im-icon-addbtn"></i>新增联系人</span>
                    </el-col>
                    <el-col :span="24">
                        <el-table :data="contact_persons" class="table-list">
                            <el-table-column label="序号" width="90">
                                <template slot-scope='scope'>{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column prop="name" label="联系人姓名"></el-table-column>
                            <el-table-column prop="roleType" label="角色">
                                <template slot-scope="scope">
                                    <span>{{contact_roles[scope.row.roleType]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="auditType" label="系统权限">
                                <template slot-scope="scope">
                                    <span>{{authorities[scope.row.auditType]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="position" label="职位"></el-table-column>
                            <el-table-column prop="mobile" label="手机号码"></el-table-column>
                            <el-table-column prop="email" label="邮箱地址"></el-table-column>
                            <el-table-column prop="status" label="认证状态" width="100">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 3 ? 'danger':(scope.row.status == 1 ? 'warning':'default'))" close-transition>{{enterpriseMemberStatus[scope.row.status] ? enterpriseMemberStatus[scope.row.status] : '未知'}}</el-tag>                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="120" align='center' v-if="operate_authority">
                                <span>
                                    <span class="table-btn health" v-if="row.role === 2 || row.role === 3" @click.stop="editContactPerson">编辑</span>
                                    <span class="table-btn health" v-else></span>
                                    <span class="table-btn danger" @click.stop="handleDelContact(row)">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="基本信息" name="base_information" v-if="enterprise_type === 1">
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">工商信息</span>
                    </el-col>
                    <el-col :span="18">
                        <table class="table-info">
                            <tbody>
                                <tr v-for="(item,index) in business_infos" :key="index">
                                    <template v-if="item.colspan">
                                        <td class="label">{{item.label}}</td> 
                                        <td class="value" colspan="3">{{item.value}}</td>
                                    </template>
                                    <template v-else>
                                        <td class="label" width="18%">{{item.label1}}</td> 
                                        <td class="value">{{item.value1}}</td>
                                        <td class="label" width="18%">{{item.label2}}</td> 
                                        <td class="value">{{item.value2}}</td>  
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">股东信息</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="shareholder_infos" border>
                            <el-table-column prop="type" label="股东类型"></el-table-column>
                            <el-table-column prop="name" label="股东"></el-table-column>
                            <el-table-column prop="subscribe" label="认缴出资（万元人民币）"></el-table-column>
                            <el-table-column prop="pay" label="实缴出资（万元人民币）"></el-table-column>
                            <el-table-column prop="scale" label="出资比例"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">主要人员</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="main_staffs" border>
                            <el-table-column prop="name" label="姓名"></el-table-column>
                            <el-table-column prop="position" label="职务"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">分支机构</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="branch_offices" border>
                            <el-table-column prop="name" label="公司名称"></el-table-column>
                            <el-table-column prop="principal" label="负责人"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">对外投资</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="investment" border>
                            <el-table-column prop="name" label="公司名称"></el-table-column>
                            <el-table-column prop="legal" label="法定代表人"></el-table-column>
                            <el-table-column prop="date" label="成立年限"></el-table-column>
                            <el-table-column prop="capital" label="注册资本（万元人民币）"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">知识产权</span>
                    </el-col>
                    <el-col :span="18">
                        <table class="table-info">
                            <tbody>
                                <tr v-for="(item,index) in properties" :key="index">
                                    <template v-if="item.colspan">
                                        <td class="label">{{item.label}}</td> 
                                        <td class="value" colspan="3">{{item.value}}</td>
                                    </template>
                                    <template v-else>
                                        <td class="label" width="18%">{{item.label1}}</td> 
                                        <td class="value">{{item.value1}}</td>
                                        <td class="label" width="18%">{{item.label2}}</td> 
                                        <td class="value">{{item.value2}}</td>  
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">风险信息</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="risk_infos" border>
                            <el-table-column prop="name" label="风险信息"></el-table-column>
                            <el-table-column prop="count" label="累积数量"></el-table-column>
                            <el-table-column prop="desc" label="核查内容"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">中登网登记信息</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="registers" border>
                            <el-table-column prop="name" label="登记机构名称"></el-table-column>
                            <el-table-column prop="rtime" label="登记时间"></el-table-column>
                            <el-table-column prop="etime" label="到期时间"></el-table-column>
                            <el-table-column prop="oname" label="登记资产买方名称"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="基础资料" name="data_management">
                <el-col :span="24">
                    <el-row>
                        <el-col class="toolbar toolbar-top">
                            <span class="title">基础资料清单</span>
                            <!-- <div class="f-right" v-if="operate_authority">
                                <el-button size="small" type="primary" @click="dialog_add_data = true"><i class="el-icon-plus"></i>新增资料</el-button>
                            </div> -->
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="data_list" class="table-list">
                                <el-table-column prop="index" label="序号" width="90"></el-table-column>
                                <el-table-column prop="name" label="资料名称"></el-table-column>
                                <!-- <el-table-column prop="range" label="收集范围"></el-table-column> -->
                                <!-- <el-table-column prop="modus" label="提交形式"></el-table-column> -->
                                <el-table-column prop="status" label="状态">
                                    <template slot-scope="scope">
                                        <el-tag :type="scope.row.status == '已上传' ? 'success' : (scope.row.status == '未上传' ? 'warning':'default')" close-transition>{{scope.row.status}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column inline-template :context="_self" label="操作" width="160">
                                    <span>
                                        <!-- <el-button size="small" v-if="operate_authority">上传</el-button> -->
                                        <el-button size="small">下载</el-button>
                                    </span>
                                </el-table-column>
                            </el-table>
                            <!-- <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="dataSizeChange" @current-change="dataCurrentChange" :page-size="data_pagesize" :total="data_total"></el-pagination> -->
                        </el-col>
                    </el-row>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="签约信息" name="signed_information" v-if="enterprise_type === 3 || nav_menu_type === 4">
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">放款账户信息</span>
                    </el-col>
                    <el-col :span="18">
                        <table class="table-info">
                            <tbody>
                                <tr v-for="(item,index) in loan_account_infos" :key="index">
                                    <template v-if="item.colspan">
                                        <td class="label" width="18%">{{item.label}}</td> 
                                        <td class="value" colspan="3">{{item.value}}</td>
                                    </template>
                                    <template v-else>
                                        <td class="label" width="18%">{{item.label1}}</td> 
                                        <td class="value">{{item.value1}}</td>
                                        <td class="label" width="18%">{{item.label2}}</td> 
                                        <td class="value">{{item.value2}}</td>  
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">结算账户信息</span>
                    </el-col>
                    <el-col :span="18">
                        <table class="table-info">
                            <tbody>
                                <tr v-for="(item,index) in settle_account_infos" :key="index">
                                    <template v-if="item.colspan">
                                        <td class="label" width="18%">{{item.label}}</td> 
                                        <td class="value" colspan="3">{{item.value}}</td>
                                    </template>
                                    <template v-else>
                                        <td class="label" width="18%">{{item.label1}}</td> 
                                        <td class="value">{{item.value1}}</td>
                                        <td class="label" width="18%">{{item.label2}}</td> 
                                        <td class="value">{{item.value2}}</td>  
                                    </template>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="编辑联系方式" v-model="dialog_edit_contact" @close="cancelEditContact('contact_form')" class="dialogForm" :close-on-click-modal="false">
            <el-form :model="contact_form" :rules="edit_rules" ref="contact_form" label-width="80px">
                <el-form-item label="固定电话" prop="telephone">
                    <el-input v-model="contact_form.telephone" placeholder="请输入固定电话"></el-input>
                </el-form-item>
                <el-form-item label="传真号码" prop="fax">
                    <el-input v-model="contact_form.fax" placeholder="请输入传真号码"></el-input>
                </el-form-item>
                <el-form-item label="官方网站" prop="website">
                    <el-input v-model="contact_form.website" placeholder="请输入官方网站"></el-input>
                </el-form-item>
                <el-form-item label="注册地址" prop="registerAddress">
                    <el-input type="textarea" v-model="contact_form.registerAddress" placeholder="请输入注册地址"></el-input>
                </el-form-item>
                <el-form-item label="联系地址" prop="contactAddress">
                    <el-input type="textarea" v-model="contact_form.contactAddress" placeholder="请输入联系地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native='saveContact'>保 存</el-button>
                <el-button @click="cancelEditContact('contact_form')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="新增联系人" v-model="dialog_add_contact" @close="cancelAddContact('addForm')" class="dialogForm" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                <el-form-item label="角色" prop="roleType">
                    <el-select v-model="addForm.roleType" placeholder="请选择签约角色">
                        <el-option v-for="(item,value) in contact_roles" :label="item" :value="value" :key="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="操作权限" prop="auditType">
                    <el-radio v-for="(item,value) in authorities" class="radio" v-model="addForm.auditType" :label="value" :key="value">{{item}}</el-radio>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入联系人姓名"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="addForm.position" placeholder="请输入联系人职位"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="addForm.mobile" placeholder="请输入联系人手机号码"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input v-model="addForm.email" placeholder="请输入联系人邮箱地址"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAddContact('addForm')">确 定</el-button>
                <el-button @click="cancelAddContact('addForm')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '../../mixins/common.js'
    // import Logs from '../../mixins/api/logs.js'
    import Enterprise from '@/api/enterprise/enterprise.js'
    export default {
        data() {
            return {
                enterprise_name:'碧桂园控股有限公司',
                filter_name:'',
                active_name:'contact_information',
                enterpriseMemberStatus:ABS_STATUS['enterpriseMemberStatus'] ? ABS_STATUS['enterpriseMemberStatus'] : {},
                contact_roles:{
                    2:'法人代表',
                    3:'代理人1',
                    4:'代理人2',
                    5:'对接人'
                },
                authorities:{
                    0:'无',
                    1:'经办',
                    2:'复核'
                },
                dialog_add_contact:false,
                dialog_edit_contact:false,
                dialog_add_data:false,
                addForm:{
                    auditType:'0'
                },
                contact_form:{
                    // tel:'666666',
                    // fax:'222222',
                    // website:'https://www.baidu.com/',
                    // contact_addr:'深圳市福田区',
                    // reg_addr:'深圳市福田区',

                },
                edit_rules:{

                },
                rules:{
                    
                },
                data_pagenum:1,
                data_pagesize:10,
                data_total:10,
                data_list:[
                    {
                        index:1,
                        name:'企业法人营业执照',
                        // range:'',
                        // modus:'原件拍照/扫描',
                        status:'已上传'
                    },
                    {
                        index:2,
                        name:'法人身份证正反面',
                        // range:'',
                        // modus:'原件拍照/扫描',
                        status:'未上传'
                    },
                    {
                        index:3,
                        name:'代理人身份证正反面',
                        // range:'法定代表人',
                        // modus:'原件拍照/扫描',
                        status:'已上传'
                    }
                ],
                contact_pagenum:1,
                contact_pagesize:10,
                contact_persons:[
                    
                ],
                business_infos:[
                    {
                        label1:'统一社会信用代码',
                        value1:'91440300728579238Y',
                        label2:'组织机构代码',
                        value2:'72857923-8'
                    },
                    {
                        label1:'注册号',
                        value1:'440301102812067',
                        label2:'经营状态',
                        value2:'存续（在营、开业、在册）'
                    },
                    {
                        label1:'所属行业',
                        value1:'制造业',
                        label2:'公司类型',
                        value2:'非上市股份有限公司'
                    },
                    {
                        label1:'注册资本',
                        value1:'21710万元',
                        label2:'成立日期',
                        value2:'2017-06-30'
                    },
                    {
                        label1:'营业期限',
                        value1:'2001-05-22 至 2051-05-22',
                        label2:'发照日期',
                        value2:'2017-06-30'
                    },
                    {
                        label:'登记机关',
                        value:'深圳市市场监督管理局',
                        colspan:true
                    },
                    {
                        label:'企业地址',
                        value:'深圳市福田区卓越梅林中心广场北区2栋16层',
                        colspan:true
                    },
                    {
                        label:'经营范围',
                        value:'建筑及防水新型材料、保温装饰材料和屋面虹吸雨水排放系统的技术开发、研究，国内商业、物资供销业（不含专营、专卖、专控商品及限制项目）；兴办实业（具体项目另行申报）。经营进出口业务。防水材料、保温装饰材料和屋面虹吸雨水排放系统的生产和销售（生产场地另行申报）；建筑防水工程专业承包（凭建设主管部门颁发的资质证书经营）。',
                        colspan:true
                    },
                ],
                shareholder_infos:[
                    {
                        type:'自然人',
                        name:'张三',
                        subscribe:899.9052,
                        pay:899.9052,
                        scale:'-',
                    },
                    {
                        type:'自然人',
                        name:'李四',
                        subscribe:899.9052,
                        pay:899.9052,
                        scale:'-',
                    }
                ],
                main_staffs:[
                    {
                        name:'张三',
                        position:'监事'
                    },
                    {
                        name:'李四',
                        position:'监事'
                    },
                    {
                        name:'王五',
                        position:'总经理'
                    },
                ],
                branch_offices:[
                    {
                        principal:'张三',
                        name:'深圳市卓宝科技股份有限公司深圳分公司'
                    },
                    {
                        principal:'李四',
                        name:'深圳市卓宝科技股份有限公司防水材料厂'
                    },
                    {
                        principal:'王五',
                        name:'深圳市卓宝科技股份有限公司保定分公司'
                    },
                ],
                investment:[
                    {
                        name:'深圳市卓宝科技股份有限公司保定分公司',
                        legal:'张三',
                        date:'2007-10-10',
                        capital:1000
                    },
                    {
                        name:'深圳市卓宝科技股份有限公司防水材料厂',
                        legal:'李四',
                        date:'2007-10-10',
                        capital:1000
                    },
                    {
                        name:'深圳市卓宝科技股份有限公司保定分公司',
                        legal:'王五',
                        date:'2007-10-10',
                        capital:500
                    },
                ],
                properties:[
                    {label1:'商标',value1:5,label2:'专利信息',value2:52},
                    {label1:'著作权',value1:10,label2:'软件著作权',value2:30},
                    {label:'域名',value:'-',colspan:true},
                    {label:'资质认证',value:'-',colspan:true},
                ],
                risk_infos:[
                    {
                        name:'失信被执行人信息',
                        desc:'排查历史上是否有记录',
                        count:0
                    },
                    {
                        name:'被执行人信息',
                        desc:'排查半年内是否有执行记录',
                        count:0
                    },
                    {
                        name:'裁判文书',
                        desc:'是否与金融机构发生的诉讼/是否作为被告的刑事案件',
                        count:0
                    },
                    {
                        name:'开庭公告',
                        desc:'是否与金融机构发生的诉讼/是否作为被告的刑事案件',
                        count:0
                    },
                    {
                        name:'法院公告',
                        desc:'是否与金融机构发生的诉讼/是否作为被告的刑事案件',
                        count:0
                    },
                    {
                        name:'司法拍卖',
                        desc:'排查历史上是否有记录',
                        count:0
                    },
                    {
                        name:'经营异常',
                        desc:'排查近一年是否有记录',
                        count:0
                    },
                    {
                        name:'欠税信息',
                        desc:'排查近一年是否有记录',
                        count:0
                    },
                    {
                        name:'股权出质',
                        desc:'当前是否有股权出质状态',
                        count:0
                    },
                    {
                        name:'动产抵押',
                        desc:'当前是否有动产抵押状态',
                        count:0
                    },
                ],
                registers:[
                    {
                        name:'深圳市市场监督管理局',
                        oname:'深圳市市场监督管理局',
                        rtime:'2010-09-10',
                        etime:'2010-09-10'
                    },
                    {
                        name:'深圳市市场监督管理局',
                        oname:'深圳市市场监督管理局',
                        rtime:'2010-09-10',
                        etime:'2010-09-10'
                    },
                    {
                        name:'深圳市市场监督管理局',
                        oname:'深圳市市场监督管理局',
                        rtime:'2010-09-10',
                        etime:'2010-09-10'
                    },
                ],
                loan_account_infos:[
                    {label:'户名',value:'张三',colspan:true},
                    {label:'开户行',value:'中国工商银行',colspan:true},
                    {label:'账号',value:'8888888888',colspan:true},
                ],
                settle_account_infos:[
                    {label:'户名',value:'张三',colspan:true},
                    {label:'开户行',value:'中国工商银行',colspan:true},
                    {label:'账号',value:'8888888888',colspan:true},
                ]
            } 
        },
        mixins:[Common,Enterprise],
        methods: {
            //选项卡切换
            tabChange(tab, event){
                this.active_name = tab.name;
                sessionStorage.setItem('enterprise_tname',tab.name);
                this.loadEnterpriseContent(tab.name);
                this.getData(this.active_name)
            },
            loadEnterpriseContent(tname){
                switch(tname){
                    case 'base_information':
                        // console.log('base_information')
                    break;
                    case 'data_management':
                        // console.log('data_management')
                    break;
                    case 'contact_information':
                        // console.log('contact_information')
                    break;
                }
            },
            getContact(){},
            // 清空查询
            clearFilter(){
                const self = this;
                self.filter_name = '';
            },
            contactSizeChange(){},
            contactCurrentChange(){},
            dataSizeChange(){},
            dataCurrentChange(){},
            handleDelContact(){},
            confirmAddContact(){
                const self =this;
                self.dialog_add_contact = false;
                if(self.addForm.auditType == '0'){
                    delete(self.addForm.auditType);
                }
                console.log(self.addForm)
                self.addForm.enterpriseType = self.enterprise_type;
                self.addForm.enterpriseId = this.enterpriseId;
                self.addEnterpriseMember(self.addForm);
            },
            editContactPerson(){
                this.dialog_add_contact = true;
            },
            cancelEditContact(){
                this.dialog_edit_contact = false;
                this.getEnterpriseMembers({enterpriseId:this.enterprise_id});
            },
            cancelAddContact(){
                this.dialog_add_contact = false;
            },
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    
                }
            },
            getData(active_name){
                const self = this;
                console.log('enterpriseId:',self.enterpriseId,self.enterpriseIdChange)
                if(active_name == 'contact_information'){
                    //联系方式：
                    self.getEnterpriseMembers({
                        enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)
                    });
                }else if(active_name == 'base_information'){
                    //基本信息
                    self.getEnterpriseBasicInfo({
                        enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)
                    });

                }else if(active_name == 'data_management'){
                    //资料清单
                    self.getMaterialsList({
                        enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)
                    });
                }else if(active_name == 'signed_information'){
                    //签约信息
                }
            },
            saveContact(){
                this.dialog_edit_contact = false;
                this.updateEnterpriseBasicInfo(this.contact_form);
            }
            
        },
        mounted() {
            const self = this;
            console.log('enterpriseIdChange:',self.enterpriseIdChange)
            self.$nextTick(()=>{
                if(!self.set_menu_type){
                    this.saveStorageState({
                        attr:'nav_menu_type',
                        val:0,
                        type:'number' 
                    });
                }
                document.addEventListener("keyup", self.enterKeyup, false);
                if(sessionStorage.getItem('enterprise_tname')){
                    self.active_name = sessionStorage.getItem('enterprise_tname');
                    self.getData(self.active_name); 
                }else{
                    self.getData('contact_information')
                }
                self.loadEnterpriseContent(self.active_name);
            });
            
        },
        watch:{},
        destroyed() {
            document.removeEventListener("keyup", self.enterKeyup, false);
            sessionStorage.removeItem('enterprise_tname');
            this.saveStorageState({
                attr:'nav_menu_type',
                val:0,
                type:'number'
            });
            this.saveStorageState([
                {
                    attr:'nav_menu_type',
                    val:0,
                    type:'number' 
                },
                {
                    attr:'set_menu_type',
                    val:false,
                    type:'boolean' 
                },
                {
                    attr:'enterpriseIdChange',
                    val:false,
                    type:'boolean' 
                },                
            ]);
            this.updateOperateAuthority();
        }
    }
</script>

