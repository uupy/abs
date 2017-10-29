<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar">
            <span class="title" style="font-size:16px;">{{enterpriseIdChange ? enterpriseName : enterprise_name}}</span>
        </el-row>
        <el-tabs v-model="active_name" @tab-click="tabChange">
            <el-tab-pane label="联系方式" name="contact_information">
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">企业联系方式</span>
                        <span class="subtxt" @click="dialogEditContact = true" v-if="operate_authority"><i class="im-icon-edit health"></i>编辑</span>
                    </el-col>
                    <el-col class="info-box" style="margin-top:-8px;">
                        <p>
                            <label>固定电话：</label>
                            <span>{{contact_form.telephone || ''}}</span>
                        </p>
                        <p>
                            <label>传真号码：</label>
                            <span>{{contact_form.fax || ''}}</span>
                        </p>
                        <p>
                            <label>官方网站：</label>
                            <span>{{contact_form.website || ''}}</span>
                        </p>
                        <p>
                            <label>注册地址：</label>
                            <span>{{contact_form.registerAddress || ''}}</span>
                        </p>
                        <p>
                            <label>联系地址：</label>
                            <span>{{contact_form.contactAddress || ''}}</span>
                        </p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">联系人列表</span>
                        <span class="subtxt" @click="dialogAddContact=true" v-if="operate_authority"><i class="im-icon-addbtn"></i>新增联系人</span>
                    </el-col>
                    <el-col :span="24">
                        <el-table :data="contact_persons" class="table-list">
                            <el-table-column label="序号" width="90">
                                <template slot-scope='scope'>{{scope.$index+1}}</template>
                            </el-table-column>
                            <el-table-column prop="name" label="联系人姓名"></el-table-column>
                            <el-table-column prop="roleType" label="角色">
                                <template slot-scope="scope">
                                    <span>{{entMemberType[scope.row.roleType]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="auditType" label="系统权限">
                                <template slot-scope="scope">
                                    <span>{{entMemberAuthority[scope.row.auditType] ? entMemberAuthority[scope.row.auditType] : entMemberAuthority['0']}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="position" label="职位"></el-table-column>
                            <el-table-column prop="mobile" label="手机号码"></el-table-column>
                            <el-table-column prop="email" label="邮箱地址"></el-table-column>
                            <el-table-column prop="status" label="认证状态" align="center" width="100">
                                <template slot-scope="scope">
                                    <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 3 ? 'danger':(scope.row.status == 1 ? 'warning':'default'))" close-transition>{{enterpriseMemberStatus[scope.row.status] ? enterpriseMemberStatus[scope.row.status] : '未知'}}</el-tag>                                </template>
                            </el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" align="center" width="120" v-if="operate_authority">
                                <span>
                                    <span class="table-btn health" @click.stop="editContactPerson(row)">编辑</span>
                                    <span class="table-btn danger" @click.stop="deleteEnterpriseMember(row)">删除</span>
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
                            <el-table-column prop="shareholder_type" label="股东类型"></el-table-column>
                            <el-table-column prop="shareholder" label="股东"></el-table-column>
                            <el-table-column prop="subscribe_for_funding" label="认缴出资（万元人民币）"></el-table-column>
                            <el-table-column prop="paid_in_capital" label="实缴出资（万元人民币）"></el-table-column>
                            <el-table-column prop="funded_ratio" label="出资比例"></el-table-column>
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
                            <el-table-column prop="person_in_charge" label="负责人"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">对外投资</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="investment" border>
                            <el-table-column prop="company_name" label="公司名称"></el-table-column>
                            <el-table-column prop="legal_representative" label="法定代表人"></el-table-column>
                            <el-table-column prop="establish_period" label="成立年限"></el-table-column>
                            <el-table-column prop="registered_capital" label="注册资本（万元人民币）"></el-table-column>
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
                            <el-table-column prop="risk_info" label="风险信息"></el-table-column>
                            <el-table-column prop="cumulative_quantity" label="累积数量"></el-table-column>
                            <el-table-column prop="verification_content" label="核查内容"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
                <el-row style="padding-top:15px;">
                    <el-col class="toolbar toolbar-top">
                        <span class="title">中登网登记信息</span>
                    </el-col>
                    <el-col :span="18">
                        <el-table :data="registers" border>
                            <el-table-column prop="registered_institution_name" label="登记机构名称"></el-table-column>
                            <el-table-column prop="registy_time" label="登记时间"></el-table-column>
                            <el-table-column prop="overdue_time" label="到期时间"></el-table-column>
                            <el-table-column prop="reg_asset_buyer_name" label="登记资产买方名称"></el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="基础资料" name="data_management">
                <el-col :span="24">
                    <el-row>
                        <el-col class="toolbar toolbar-top">
                            <span class="title">基础资料清单</span>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="data_list" class="table-list">
                                <el-table-column prop="index" label="序号" width="90">
                                    <template slot-scope='scope'>{{scope.$index+1}}</template>
                                </el-table-column>
                                <el-table-column prop="name" label="资料名称"></el-table-column>
                                <el-table-column prop="status" label="状态">
                                    <template slot-scope="scope">
                                        <el-tag :type="(scope.row.fileUrl != '' && scope.row.fileUrl != null) ? 'success' : 'warning'" close-transition>
                                            {{(scope.row.fileUrl != '' && scope.row.fileUrl != null) ? '已上传' : '未上传'}}
                                        </el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column label="操作" width="160">
                                    <template slot-scope='scope'>
                                        <span>
                                            <el-button size="small" @click="downLoadFile('/upload/image/6bca0e1e-6f35-46ce-a27e-3b39302ccbae.jpg')">下载</el-button>
                                        </span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="账户信息" name="account_information" v-if="enterprise_type === 3 || nav_menu_type === 4">
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">放款账户信息</span>
                    </el-col>
                    <el-col :span="18">
                        <table class="table-info">
                            <tbody>
                                <tr v-for="(item,index) in loanAccountInfo" :key="index">
                                    <td class="label" width="18%">{{item.label}}</td> 
                                    <td class="value" colspan="3">{{item.value}}</td>
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
                                <tr v-for="(item,index) in settledAccountInfo" :key="index">
                                    <td class="label" width="18%">{{item.label}}</td> 
                                    <td class="value" colspan="3">{{item.value}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="编辑联系方式" v-model="dialogEditContact" @close="cancelEditContact('contact_form')" class="dialogForm" :close-on-click-modal="false">
            <el-form :model="contact_form" ref="contact_form" label-width="80px">
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
        <el-dialog size="tiny" :title="dialogContactTitle" v-model="dialogAddContact" @close="cancelAddContact('addForm')" class="dialogForm" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                <el-form-item label="操作权限" prop="auditType">
                    <el-radio v-for="(item,index) in authorities" class="radio" v-model="addForm.auditType" :label="parseInt(item.value)" :key="index">{{item.label}}</el-radio>
                </el-form-item>
                <el-form-item label="角色" prop="roleType">
                    <el-select v-model="addForm.roleType" placeholder="请选择签约角色">
                        <el-option v-for="(item,index) in entMemberTypes" :label="item.label" :value="parseInt(item.value)" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入联系人姓名" :disabled="inputReadonly"></el-input>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="addForm.position" placeholder="请输入联系人职位"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile">
                    <el-input v-model="addForm.mobile" placeholder="请输入联系人手机号码" :disabled="inputReadonly"></el-input>
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
    import EnterpriseDetail from '@/api/enterprise/enterprise_detail.js'
    export default {
        data() {
            return {
                active_name:'contact_information',
                enterpriseMemberStatus:ABS_STATUS['enterpriseMemberStatus'] ? ABS_STATUS['enterpriseMemberStatus'] : {},
                entMemberType:ABS_ROLE['user'] ? ABS_ROLE['user'] : {},
                entMemberAuthority:ABS_ROLE['audit'] ? ABS_ROLE['audit'] : {},
                authorities:[
                    {label:'无',value:0},
                    {label:'经办',value:1},
                    {label:'复核',value:2}
                ],
                entMemberTypes:[
                    {label:'法定代表人',value:2},
                    {label:'代理人1',value:3},
                    {label:'代理人2',value:4},
                    {label:'对接人',value:5},
                ],
                dialogAddContact:false,
                dialogEditContact:false,
                addForm:{
                    roleType:2,
                    auditType:0,
                    name:'',
                    position:'',
                    mobile:'',
                    email:''
                },
                inputReadonly:false,
                isEditPerson:false,
                dialogContactTitle:'新增联系人',
                contact_form:{
                    telephone:'',
                    fax:'',
                    website:'',
                    registerAddress:'',
                    contactAddress:'',
                },
                rules:{
                    name:[
                        {required:true,message:'联系人姓名不能为空',trigger: 'change'}
                    ],
                    position:[
                        {required:true,message:'联系人职位不能为空',trigger: 'change'}
                    ],
                    mobile:[
                        {required:true,message:'联系人手机号码不能为空',trigger: 'change'}
                    ],
                    email:[
                        {required:true,message:'联系人邮箱不能为空',trigger: 'change'}
                    ]
                },
                data_list:[],
                contact_persons:[],
                business_infos:[
                    {
                        label1:'统一社会信用代码',
                        value1:'',
                        label2:'组织机构代码',
                        value2:'',
                        colspan:false
                    },
                    {
                        label1:'注册号',
                        value1:'',
                        label2:'经营状态',
                        value2:'',
                        colspan:false
                    },
                    {
                        label1:'所属行业',
                        value1:'',
                        label2:'公司类型',
                        value2:'',
                        colspan:false
                    },
                    {
                        label1:'注册资本',
                        value1:'',
                        label2:'成立日期',
                        value2:'',
                        colspan:false
                    },
                    {
                        label1:'营业期限',
                        value1:'',
                        label2:'发照日期',
                        value2:'',
                        colspan:false
                    },
                    {
                        label:'登记机关',
                        value:'',
                        colspan:true
                    },
                    {
                        label:'企业地址',
                        value:'',
                        colspan:true
                    },
                    {
                        label:'经营范围',
                        value:'',
                        colspan:true
                    },
                ],
                shareholder_infos:[],
                main_staffs:[],
                branch_offices:[],
                investment:[],
                properties:[
                    {label1:'商标',value1:'',label2:'专利信息',value2:'',colspan:false},
                    {label1:'著作权',value1:'',label2:'软件著作权',value2:'',colspan:false},
                    {label:'域名',value:'',colspan:true},
                    {label:'资质认证',value:'',colspan:true},
                ],
                risk_infos:[],
                registers:[],
                loanAccountInfo:[
                    {label:'户名',value:''},
                    {label:'开户行',value:''},
                    {label:'账号',value:''}
                ],
                settledAccountInfo:[
                    {label:'户名',value:''},
                    {label:'开户行',value:''},
                    {label:'账号',value:''}
                ]
            } 
        },
        mixins:[Common,EnterpriseDetail],
        methods: {
            // 选项卡切换
            tabChange(tab, event){
                this.active_name = tab.name;
                sessionStorage.setItem('enterprise_tname',tab.name);
                this.getData(this.active_name)
            },
            // 确认添加或编辑联系人
            confirmAddContact(){
                const self =this;
                self.$refs['addForm'].validate((valid)=>{
                    if(valid){
                        let params = {};
                        params.enterpriseType = self.enterpriseIdChange?self.enterpriseType:self.enterprise_type;
                        params.enterpriseId = self.enterpriseIdChange?self.enterpriseId:self.enterprise_id;
                        for(let key in self.addForm){
                            if(!params[key] && self.addForm[key]){
                                params[key] = self.addForm[key];
                            }
                        }
                        if(self.isEditPerson){
                            self.updateEnterpriseMember(params);
                        }else{
                            self.addEnterpriseMember(params);
                        }
                    }
                });
            },
            // 打开编辑联系人对话框
            editContactPerson(row){
                this.addForm = {
                    roleType:row.roleType,
                    auditType:row.auditType || 0,
                    name:row.name,
                    position:row.position,
                    mobile:row.mobile,
                    email:row.email,
                    id:row.id
                };
                this.dialogContactTitle = '编辑联系人';
                this.inputReadonly = (row.status === 2 ? true : false);
                this.isEditPerson = true;
                this.dialogAddContact = true;
            },
            // 取消编辑企业联系方式
            cancelEditContact(){
                this.dialogEditContact = false;
                this.getEnterpriseMembers({enterpriseId:(this.enterpriseIdChange?this.enterpriseId:this.enterprise_id)});
            },
            // 取消添加联系人
            cancelAddContact(){
                this.$refs['addForm'].resetFields();
                this.dialogAddContact = false;
                this.inputReadonly = false;
                this.isEditPerson = false;
                this.dialogContactTitle = '新增联系人';
                this.addForm = {
                    roleType:2,
                    auditType:0,
                    name:'',
                    position:'',
                    mobile:'',
                    email:''
                };
                this.getEnterpriseMembers({enterpriseId:(this.enterpriseIdChange?this.enterpriseId:this.enterprise_id)});
            },
            // enter键事件
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    if(self.dialogEditContact){
                        self.saveContact();
                    }else if(self.dialogAddContact){
                        self.confirmAddContact();
                    }
                }
            },
            // 获取tab数据
            getData(active_name){
                const self = this;
                switch(active_name){
                    case 'contact_information':
                        //联系方式：
                        self.getEnterpriseMembers({
                            enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)
                        });
                        break;
                    case 'base_information':
                        //基本信息
                        self.getEnterpriseBasicInfo({
                            enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)
                        });
                        break;  
                    case 'data_management':
                        //资料清单
                        self.getMaterialsList({
                            enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)
                        });
                        break; 
                    case 'account_information':
                        //账户信息
                        self.getEnterpriseAccountInfo({
                            enterpriseId:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id)
                        });
                        break;   
                        default:
                        break;
                }
            },
            // 保存编辑企业联系方式
            saveContact(){
                const self = this;
                self.updateEnterpriseBasicInfo({
                    id:(self.enterpriseIdChange?self.enterpriseId:self.enterprise_id),
                    telephone:self.contact_form.telephone,
                    fax:self.contact_form.fax,
                    website:self.contact_form.website,
                    registerAddress:self.contact_form.registerAddress,
                    contactAddress:self.contact_form.contactAddress,
                });
            }
        },
        mounted() {
            const self = this;
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

