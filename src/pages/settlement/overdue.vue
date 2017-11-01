<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar toolbar-top">
            <div class="f-left">
                <label>逾期状态：</label>
                <el-select size="small" v-model="overdueStatus" placeholder="请选择" @change="filterList">
                    <el-option v-for="(item,index) in overdueStatuses" :label="item.label" :value="item.value" :key="index"></el-option>
                </el-select>
            </div>
            <div class="f-right">
                <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @focus="filterOnfocus = true" @blur="filterOnfocus = false" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="filterList"><i class="el-icon-search"></i>查询</el-button>
            </div>
        </el-row>
        <el-row :span="24">
            <el-table :data="list" border ref="multipleTable" :class="[{'empty-table':list.length == 0}]">
                <el-table-column prop="code" label="资产编号" width="150"></el-table-column>
                <el-table-column prop="supplierName" label="供应商"></el-table-column>
                <el-table-column prop="projectName" label="项目公司"></el-table-column>
                <el-table-column prop="area" label="所属区域"></el-table-column>
                <el-table-column prop="yszkje" align='center' label="应收账款金额" width="120"></el-table-column>
                <el-table-column prop="zrzj" align='center' label="转让折价" width="110"></el-table-column>
                <el-table-column prop="tjDate" align='center' label="提交日期" width="110"></el-table-column>
                <el-table-column prop="yszkDate" align='center' label="应收账款到期日" width="130"></el-table-column>
                <el-table-column prop="overdueDays" align='center' label="逾期天数" width="90"></el-table-column>
                <el-table-column prop="overdueMoney" align='center' label="逾期金额" width="110"></el-table-column>
                <el-table-column prop="status" align='center' label="逾期状态" width="90">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.status == 2 ? 'success' : (scope.row.status == 1 ? 'danger': 'default')" close-transition>{{overdueStatusTxt[scope.row.status] ? overdueStatusTxt[scope.row.status] : '未知'}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="jqDate" align='center' label="结清日期" width="110"></el-table-column>
                <el-table-column inline-template :context="_self" align='center' label="操作" width="160">
                    <span>
                        <span class="table-btn health" @click="checkAssetsViews(row)">资产详情</span>
                        <span class="table-btn health" @click="checkSettledViews(row)">结算详情</span>
                    </span>
                </el-table-column>
            </el-table>
            <el-pagination v-if="pageTotal > 0" class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-size="pageSize" :total="pageTotal"></el-pagination>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    export default {
        data() {
            return {
                dateRange:'',
                filterOnfocus:false,
                filterKeyword:'',
                overdueStatusTxt:ABS_STATUS['overdue'] ? ABS_STATUS['overdue'] : {},
                overdueStatus:0,
                overdueStatuses:[
                    {label:'全部',value:0},
                    {label:'已逾期',value:1},
                    {label:'已结清',value:2},
                ],
                curPage:1,
                pageSize:10,
                pageTotal:2,
                list:[
                    {
                        code:'ZCA01171019001',
                        supplierName:'供应商1',
                        projectName:'项目公司1',
                        area:'深圳福田',
                        yszkje:'2,000,000',
                        zrzj:'1,980,000',
                        tjDate:'2017-10-26',
                        yszkDate:'2017-10-26',
                        jqDate:'2017-10-26',
                        overdueDays:'300',
                        overdueMoney:'1,980,000',
                        status:1,
                    },
                    {
                        code:'ZCA01171019002',
                        supplierName:'供应商2',
                        projectName:'项目公司2',
                        area:'深圳南山',
                        yszkje:'2,000,000',
                        zrzj:'1,980,000',
                        tjDate:'2017-10-26',
                        yszkDate:'2017-10-26',
                        jqDate:'2017-10-26',
                        overdueDays:'300',
                        overdueMoney:'1,980,000',
                        status:2,
                    }
                ]
            } 
        },
        mixins:[Common],
        methods: {
            // 列表当前页改变
            pageCurrentChange(val){
                this.curPage = val;
                
            },
            // 列表条数改变
            pageSizeChange(val){
                this.pageSize = val;
                
            },
            // 过滤列表
            filterList(){
                if(this.curPage === 1){
                    
                }else{
                    this.curPage = 1;
                    
                }
            },
            // 清空查询
            clearFilter(type){
                this.filterKeyword = '';
                
            },
            checkAssetsViews(row){
                this.$router.push({ path: '/pages/settlement/overdue/asstesviews' });
            },
            checkSettledViews(row){
                this.$router.push({ path: '/pages/settlement/overdue/settledviews' });
            },
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    if(self.filterOnfocus){
                        self.filterList();
                    }
                }
            }
        },
        mounted() {
            const self = this;
            self.$nextTick(()=>{
                // self.saveStorageState({
                //     attr:'nav_menu_type',
                //     val:4,
                //     type:'number'
                // });
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

