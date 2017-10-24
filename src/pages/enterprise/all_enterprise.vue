<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar toolbar-top">
            <div class="f-left">
                <label>企业状态：</label>
                <el-select size="small" v-model="enterprise_status" placeholder="请选择" @change="filterEnterpriseStatus">
                    <el-option v-for="(item,index) in enterprise_statuses" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
                <label style="padding-left:10px;">企业角色：</label>
                <el-select size="small" v-model="enterpriseCurType" placeholder="请选择" @change="filterEnterpriseType">
                    <el-option v-for="(item,index) in enterprise_types" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
            </div>
            <div class="f-right">
                <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="getEnterprise"><i class="el-icon-search"></i>查询</el-button>
                <el-button size="small" type="primary" @click="dialogVisibleAddNew = true"><i class="el-icon-plus"></i>新增</el-button>
            </div>
        </el-row>
        <el-row :span="24">
            <el-table :data="list" class="table-list">
                <el-table-column prop="index" label="序号" width="90"></el-table-column>
                <el-table-column prop="code" label="企业编号"></el-table-column>
                <el-table-column prop="name" label="企业名称"></el-table-column>
                <el-table-column prop="type" label="企业角色">
                    <template slot-scope="scope">
                        <span>{{enterpriseType[scope.row.type] ? enterpriseType[scope.row.type] : '未知'}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="area" label="所属区域"></el-table-column>
                <el-table-column prop="status" label="认证状态">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 3 ? 'danger':(scope.row.status == 1 ? 'warning':'default'))" close-transition>{{enterpriseStatus[scope.row.status] ? enterpriseStatus[scope.row.status] : '未知'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column inline-template :context="_self" label="操作" width="140">
                    <span>
                        <span class="table-btn health" @click.stop="checkView(row)">企业详情</span>
                        <span class="table-btn danger">删除</span>
                    </span>
                </el-table-column>
            </el-table>
            <el-pagination v-if="pageTotal > 0" class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-size="pageSize" :total="pageTotal"></el-pagination>
        </el-row>
        <!-- 对话框 -->
        <el-dialog size="tiny" title="新增项目企业" v-model="dialogVisibleAddNew" @close="cancelAddClient('addForm')" :close-on-click-modal="false">
            <el-form :model="addForm" :rules="rules" ref="addForm" label-width="90px">
                <el-form-item label="企业角色" prop="role">
                    <el-select v-model="addForm.role" placeholder="请选择企业角色">
                        <el-option v-for="(item,index) in enterprise_types" :label="item.label" :value="item.value" :key="index" v-if="item.value !== 0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="企业名称" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入企业名称"></el-input>
                </el-form-item>
                <el-form-item label="所属区域" prop="area" v-if="addForm.role === 4">
                    <el-input v-model="addForm.area" placeholder="请输入所属区域"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addEnterprise" type="primary">确 认</el-button>
                <el-button @click="cancelAddClient('addForm')">取 消</el-button>
            </div>
            <vs-loading :isShow="innerLoading" className="vs-inner-loading"></vs-loading>
        </el-dialog>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Enterprise from '@/api/enterprise/enterprise.js'
    export default {
        data() {
            return {
                filterKeyword:'',
                enterprise_status:0,
                enterprise_statuses:[
                    {label:'全部',value:0},
                    {label:'创建中',value:1},
                    {label:'已认证',value:2},
                ],
                enterpriseType:ABS_TYPE['enterprise'] ? ABS_TYPE['enterprise'] : {},
                enterpriseStatus:ABS_STATUS['enterprise'] ? ABS_STATUS['enterprise'] : {},
                enterpriseCurType:0,
                enterprise_types:[
                    {label:'全部',value:0},
                    {label:'集团公司',value:2},
                    {label:'项目公司',value:4},
                    {label:'融资客户',value:3},
                    {label:'合作方',value:56},
                ],
                currentPage:1,
                pageSize:10,
                pageTotal:10,
                list:[],
                dialogVisibleAddNew:false,
                addForm:{
                    name:'',
                    role:2,
                    area:'',
                    principal:'',
                    position:''
                },
                rules:{

                }
            } 
        },
        mixins:[Common,Enterprise],
        methods: {
            // 列表当前页改变
            pageCurrentChange(val){
                
            },
            // 列表条数改变
            pageSizeChange(val){
                
            },
            // 过滤企业状态
            filterEnterpriseStatus(){
                if(this.enterprise_status === 0){
                    this.getEnterpriseList();
                }else{
                    this.getEnterpriseList({status:parseInt(this.enterprise_status)});
                }
            },
            // 过滤企业类型
            filterEnterpriseType(){
                if(this.enterpriseCurType === 0){
                    this.getEnterpriseList();
                }else{
                    this.getEnterpriseList({type:parseInt(this.enterpriseCurType)});
                }
            },
            // 查询列表
            getEnterprise(){
                const self = this;

                self.getEnterpriseList();
            },
            // 清空查询
            clearFilter(type){
                const self = this;
                
            },
            // 查看详情
            checkView(row){
                this.saveStorageState({
                    attr:'set_menu_type',
                    val:true,
                    type:'boolean'
                });
                this.$router.push({ path: '/pages/all_enterprise/views' });
            },
            cancelAddClient(){
                this.dialogVisibleAddNew = false;
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
                self.saveStorageState({
                    attr:'nav_menu_type',
                    val:2,
                    type:'number'
                });
                self.getEnterpriseList();
                document.addEventListener("keyup", self.enterKeyup, false);
            });
        },
        watch:{
            
        },
        destroyed() {
            document.removeEventListener("keyup", self.enterKeyup, false);
        }
    }
</script>

