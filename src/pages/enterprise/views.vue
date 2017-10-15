<template>
    <section class="panel-main" :style="styles">
        <el-tabs v-model="active_name" @tab-click="tabChange">
            <el-tab-pane label="联系方式" name="contact_information">
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">企业联系方式</span>
                        <span class="subtxt" @click="dialog_edit_contact = true"><i class="im-icon-edit health"></i>编辑</span>
                    </el-col>
                    <el-col class="info-box" style="margin-top:-8px;">
                        <p>
                            <label>公开电话：</label>
                            <span>{{contact_form.tel}}</span>
                        </p>
                        <p>
                            <label>邮箱：</label>
                            <span>{{contact_form.email}}</span>
                        </p>
                        <p>
                            <label>官网：</label>
                            <span>{{contact_form.links}}</span>
                        </p>
                        <p>
                            <label>办公地址：</label>
                            <span>{{contact_form.address}}</span>
                        </p>
                        <p>
                            <label>项目公司：</label>
                            <span>{{contact_form.company}}</span>
                        </p>
                        <p>
                            <label>项目名称：</label>
                            <span>{{contact_form.project}}</span>
                        </p>
                        <p>
                            <label>所属区域：</label>
                            <span>{{contact_form.area}}</span>
                        </p>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col class="toolbar toolbar-top">
                        <span class="title">联系人列表</span>
                        <span class="subtxt" @click="dialog_add_contact = true"><i class="im-icon-addbtn"></i>新增联系人</span>
                    </el-col>
                    <el-col :span="24">
                        <el-table :data="contact_persons" class="table-list">
                            <el-table-column prop="index" label="序号" width="90"></el-table-column>
                            <el-table-column prop="name" label="联系人姓名"></el-table-column>
                            <el-table-column prop="role" label="个人角色"></el-table-column>
                            <el-table-column prop="position" label="职位"></el-table-column>
                            <el-table-column prop="tel" label="联系电话"></el-table-column>
                            <el-table-column prop="qq" label="QQ号"></el-table-column>
                            <el-table-column prop="email" label="邮箱"></el-table-column>
                            <el-table-column prop="address" label="联系地址"></el-table-column>
                            <el-table-column inline-template :context="_self" label="操作" width="200">
                                <span>
                                    <!-- <button :class="['vs-btn','vs-btn-del']" @click.stop="handleDelContact(row)">
                                        <i class="im-icon-del danger"></i>
                                    </button> -->
                                    <span class="table-btn health">个人认证</span>
                                    <span class="table-btn health">授权书</span>
                                    <span class="table-btn danger" @click.stop="handleDelContact(row)">删除</span>
                                </span>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="基本信息" name="base_information">
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
            <el-tab-pane label="资料管理" name="data_management">
                <el-col :span="24">
                    <el-row>
                        <el-col class="toolbar toolbar-top">
                            <span class="title">标准资料清单</span>
                        </el-col>
                        <el-col :span="24">
                            <el-table :data="data_list" class="table-list">
                                <el-table-column prop="index" label="序号" width="90"></el-table-column>
                                <el-table-column prop="name" label="资料名称"></el-table-column>
                                <el-table-column prop="range" label="收集范围"></el-table-column>
                                <el-table-column prop="modus" label="提交形式"></el-table-column>
                                <el-table-column prop="remark" label="功能键设置备注"></el-table-column>
                                <el-table-column inline-template :context="_self" label="操作" width="160">
                                    <span>
                                        <button :class="['vs-btn','vs-btn-del']">
                                            <el-button size="small">上传</el-button>
                                            <el-button size="small">下载</el-button>
                                        </button>
                                    </span>
                                </el-table-column>
                            </el-table>
                            <el-pagination layout="total, sizes, prev, pager, next, jumper" @size-change="dataSizeChange" @current-change="dataCurrentChange" :page-size="data_pagesize" :total="data_total"></el-pagination>
                        </el-col>
                    </el-row>
                </el-col>
            </el-tab-pane>
        </el-tabs>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="编辑联系方式" v-model="dialog_edit_contact" @close="cancelEditContact('contact_form')" class="dialogForm" :close-on-click-modal="false">
            <el-form :model="contact_form" :rules="edit_rules" ref="contact_form" label-width="80px">
                <el-form-item label="公开电话" prop="tel">
                    <el-input v-model="contact_form.tel" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="contact_form.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="官网" prop="links">
                    <el-input v-model="contact_form.links" placeholder="请输入官网"></el-input>
                </el-form-item>
                <el-form-item label="办公地址" prop="address">
                    <el-input type="textarea" v-model="contact_form.address" placeholder="请输入办公地址"></el-input>
                </el-form-item>
                <el-form-item label="项目公司" prop="company">
                    <el-input v-model="contact_form.company" placeholder="请输入项目公司"></el-input>
                </el-form-item>
                <el-form-item label="项目名称" prop="project">
                    <el-input v-model="contact_form.project" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="所属区域" prop="area">
                    <el-input type="textarea" v-model="contact_form.area" placeholder="请输入所属区域"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary">保 存</el-button>
                <el-button @click="cancelEditContact('contact_form')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="新增联系人" v-model="dialog_add_contact" @close="cancelAddContact('addForm')" class="dialogForm" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="80px">
                <el-form-item label="个人角色" prop="role">
                    <el-select v-model="addForm.role" placeholder="请选择个人角色">
                        <el-option v-for="(item,index) in roles" :label="item.label" :value="item.value" :key="index"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="职位" prop="position">
                    <el-input v-model="addForm.position" placeholder="请输入职位"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="tel">
                    <el-input v-model="addForm.tel" placeholder="请输入联系电话"></el-input>
                </el-form-item>
                <el-form-item label="微信号" prop="weixin">
                    <el-input v-model="addForm.weixin" placeholder="请输入微信号"></el-input>
                </el-form-item>
                <el-form-item label="QQ号" prop="qq">
                    <el-input v-model="addForm.qq" placeholder="请输入QQ号"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="addForm.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                <el-form-item label="联系地址" prop="address">
                    <el-input type="textarea" v-model="addForm.address" placeholder="请输入联系地址"></el-input>
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
    export default {
        data() {
            return {
                filter_name:'',
                active_name:'contact_information',
                roles:[
                    {label:'企业法人',value:'corporate'},
                    {label:'代理人1',value:'agent1'},
                    {label:'代理人2',value:'agent2'},
                    {label:'对接人',value:'docking'}
                ],
                data_pagenum:1,
                data_pagesize:10,
                data_total:10,
                data_list:[
                    {
                        index:1,
                        name:'企业法人营业执照',
                        range:'',
                        modus:'原件拍照/扫描',
                        remark:'可上传主要图片格式与PDF格式'
                    },
                    {
                        index:2,
                        name:'公司章程及修正案',
                        range:'',
                        modus:'原件拍照/扫描',
                        remark:'可上传主要图片格式与PDF格式'
                    },
                    {
                        index:3,
                        name:'身份证',
                        range:'法定代表人',
                        modus:'原件拍照/扫描',
                        remark:'可上传主要图片格式与PDF格式'
                    },
                    {
                        index:4,
                        name:'与买方合同协议',
                        range:'包含所有与买方签署的协议及其附件',
                        modus:'原件拍照/扫描',
                        remark:'可上传主要图片格式与PDF格式'
                    }
                ],
                contact_pagenum:1,
                contact_pagesize:10,
                contact_total:10,
                contact_persons:[
                    {
                        index:1,
                        name:'张三',
                        role:'企业法人',
                        position:'CEO',
                        tel:'18812345678',
                        qq:'66666',
                        email:'66666@qq.com',
                        address:'beijing'
                    },
                    {
                        index:2,
                        name:'李四',
                        role:'代理人1',
                        position:'CEO',
                        tel:'18812345678',
                        qq:'66666',
                        email:'66666@qq.com',
                        address:'beijing'
                    },
                    {
                        index:3,
                        name:'王五',
                        role:'代理人2',
                        position:'CEO',
                        tel:'18812345678',
                        qq:'66666',
                        email:'66666@qq.com',
                        address:'beijing'
                    }
                ],
                dialog_add_contact:false,
                dialog_edit_contact:false,
                addForm:{
                    role:'corporate',
                    position:'',
                    tel:'',
                    weixin:'',
                    qq:'',
                    email:'',
                    address:'',
                },
                contact_form:{
                    tel:'666666',
                    email:'123456@qq.com',
                    links:'https://www.baidu.com/',
                    address:'深圳市福田区',
                    company:'碧桂园控股有限公司',
                    project:'123',
                    area:'深圳市福田区',
                },
                edit_rules:{

                },
                rules:{
                    
                },
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
                ]
            } 
        },
        mixins:[Common],
        methods: {
            //选项卡切换
            tabChange(tab, event){
                sessionStorage.setItem('enterprise_tname',tab.name);
                this.loadEnterpriseContent(tab.name);
            },
            loadEnterpriseContent(tname){
                switch(tname){
                    case 'base_information':
                        console.log('base_information')
                    break;
                    case 'data_management':
                        console.log('data_management')
                    break;
                    case 'contact_information':
                        console.log('contact_information')
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
            confirmAddContact(){},
            cancelEditContact(){
                this.dialog_edit_contact = false;
            },
            cancelAddContact(){
                this.dialog_add_contact = false;
            },
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    
                }
            }
        },
        mounted() {
            const self = this;
            self.$nextTick(()=>{
                document.addEventListener("keyup", self.enterKeyup, false);
                if(sessionStorage.getItem('enterprise_tname')){
                    self.active_name = sessionStorage.getItem('enterprise_tname');
                }
                self.loadEnterpriseContent(self.active_name);
            });
        },
        watch:{
            
        },
        destroyed() {
            document.removeEventListener("keyup", self.enterKeyup, false);
            sessionStorage.removeItem('enterprise_tname');
        }
    }
</script>

