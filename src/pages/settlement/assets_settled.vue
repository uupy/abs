<template>
    <section class="panel-main" :style="styles">
        <el-row class="toolbar toolbar-top">
            <div class="f-left">
                <label style="padding-left:10px;">回款日期：</label>
                <el-date-picker size="small" class='date-picker'
                    v-model="dateRange"
                    type="daterange"
                    range-separator=' 至 '
                    placeholder="选择日期范围">
                </el-date-picker>
            </div>
            <div class="f-right">
                <el-input size="small" v-model="filterKeyword" placeholder="请输入关键字" icon="circle-cross" @focus="filterOnfocus = true" @blur="filterOnfocus = false" @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click="filterList"><i class="el-icon-search"></i>查询</el-button>
            </div>
        </el-row>
        <el-row :span="24">
            <el-table :data="list" border ref="multipleTable">
                <el-table-column prop="code" label="资产编号" width="150"></el-table-column>
                <el-table-column prop="supplierName" label="供应商"></el-table-column>
                <el-table-column prop="projectName" label="项目公司"></el-table-column>
                <el-table-column prop="area" label="所属区域"></el-table-column>
                <el-table-column prop="yszkje" align='center' label="应收账款金额" width="120"></el-table-column>
                <el-table-column prop="zrzj" align='center' label="转让折价" width="110"></el-table-column>
                <el-table-column prop="tjDate" align='center' label="提交日期" width="110"></el-table-column>
                <el-table-column prop="yszkDate" align='center' label="应收账款到期日" width="130"></el-table-column>
                <el-table-column prop="hkDate" align='center' label="回款日期" width="110"></el-table-column>
                <el-table-column prop="hkje" align='center' label="回款金额" width="110"></el-table-column>
                <el-table-column inline-template :context="_self" align='center' label="回款凭证" width="100">
                    <span>
                        <el-button size="small">附件</el-button>
                    </span>
                </el-table-column>
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
                curPage:1,
                pageSize:10,
                pageTotal:2,
                list:[
                    {
                        code:'ZCA01171019001',
                        supplierName:'供应商1',
                        projectName:'项目公司1',
                        area:'深圳福田区',
                        yszkje:'2,000,000',
                        zrzj:'1,980,000',
                        tjDate:'2017-10-26',
                        yszkDate:'2017-10-26',
                        hkDate:'2017-10-26',
                        hkje:'1,980,000',
                    },
                    {
                        code:'ZCA01171019002',
                        supplierName:'供应商2',
                        projectName:'项目公司2',
                        area:'深圳南山区',
                        yszkje:'2,000,000',
                        zrzj:'1,980,000',
                        tjDate:'2017-10-26',
                        yszkDate:'2017-10-26',
                        hkDate:'2017-10-26',
                        hkje:'1,980,000',
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
                this.$router.push({ path: '/pages/settlement/settled/asstesviews' });
            },
            checkSettledViews(row){
                this.$router.push({ path: '/pages/settlement/settled/settledviews' });
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

