<template>
    <section class="panel-main property-to-confirm" :style="styles"> 
        <el-row class="toolbar toolbar-top">            
            <el-col :span="17">
                <el-col>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">资产状态：</label>
                    <el-select @change='statusChange' :clearable='true' size="small" v-model="currentStatus" placeholder="请选择" style="width:220px;" class="toolbar-select">
                        <el-option v-for="(item,index) in propertyStatus" :label="item" :value="index" :key="index"></el-option>
                    </el-select>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">放款日期：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="loanTime"
                        type="daterange"
                        range-separator=' 至 '
                        @change='dateChange("loanTime",$event)'
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-col>
                <el-col style="margin-top:10px;">
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">应收账款到期日：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="receiveableMoneyTime"
                        type="daterange"
                        range-separator=' 至 '
                        @change='dateChange("receiveableMoneyTime",$event)'
                        placeholder="选择日期范围">
                    </el-date-picker>
                    <label style="display:inline-block;min-width:115px; padding-left:10px;text-align:right;">资产发行日期：</label>
                    <el-date-picker size="small" class='date-picker'
                        v-model="publishTime"
                        type="daterange"
                        range-separator=' 至 '
                        @change='dateChange("publishTime",$event)'
                        placeholder="选择日期范围">
                    </el-date-picker>
                </el-col> 
            </el-col>  
            <div class="f-right" style="padding-top:40px;">
                <el-input size="small" v-model="filter_name" placeholder="请输入关键字" icon="circle-cross" @keyup.native.enter='search' @click="clearFilter"></el-input>
                <el-button size="small" type="primary" @click.native='search'><i class="el-icon-search"></i> 查询</el-button>
                <el-button size="small" type='primary'  :disabled='assetsIds.length<=0?true:false' @click.native="downloadExl">导出</el-button>
                <!-- <el-button size="small" @click.native="downloadExl">导出</el-button> -->
            </div>       
        </el-row>

        <el-row>
            <el-table ref="multipleTable" :data="propertyList" tooltip-effect="dark" @selection-change="handleSelectionChange" @select='tableSelect' @select-all='tableSelectAll' border :class="[{'empty-table':propertyList.length == 0}]">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop='assetsId'  align='center'  label='资产编号'></el-table-column>
                <el-table-column prop='providerName' align='center' label='供应商'></el-table-column>
                <el-table-column prop='productCompanyName' align='center' label='项目公司'></el-table-column>
                <el-table-column prop='area'  align='center' label='所属区域'></el-table-column>
                <el-table-column prop='receiveableMoney' align='center'  label='应收账款金额'></el-table-column>
                <el-table-column prop='transferPrice' align='center'  label='转让折价'></el-table-column>
                <el-table-column prop='submitTime' align='center' label='提交日期'></el-table-column>
                <el-table-column prop='loanTime' align='center' label='放款日期'></el-table-column>
                <el-table-column prop='publishTime' align='center' label='资产发行日期'></el-table-column>
                <el-table-column prop='receiveableMoneyEndTime'  align='center' label='应收账款到期日'></el-table-column>
                <el-table-column prop='financingDays'  align='center' label='融资天数'></el-table-column>
                <el-table-column prop='repaymentTime'  align='center' label='还款日期'></el-table-column>
                <el-table-column align='center' label='资产状态'>
                    <template slot-scope='scope'>
                        <el-tag :type="scope.row.status == '1' ? 'success' : (scope.row.status == '2' ? 'warning':'default')" close-transition>{{propertyStatus[scope.row.status]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align='center' label='操作' width='80'>
                    <template slot-scope='scope'>
                        <span class="table-btn health" @click.stop="checkView(scope.row)">详情</span>
                    </template>
                </el-table-column>                
            </el-table>
            <el-pagination v-if='pageTotal > 0' class="toolbar" layout="total, sizes, prev, pager, next, jumper" @size-change="pageSizeChange" @current-change="pageCurrentChange" :page-sizes="[10, 20,50,100]" :page-size="pageSize" :total="pageTotal"></el-pagination>
        </el-row>
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Assets from '@/api/assets/assets'
    export default {
        data() {
            return {
                receiveableMoneyTime:'',
                publishTime:'',
                loanTime:'',
                currentStatus:'',
                pageTotal:0,
                pageSize:10,
                currentPage:1,
                filter_name:'',
                clients_pagesize:10,
                clients_total:1,
                loanBeginTime:'',
                loanEndTime:'',
                receiveableMoneyBeginTime:'',
                receiveableMoneyEndTime:'',
                publishBeginTime:'',
                publishEndTime:'',
                propertyList:[
                    {
                        
                    }
                ],
                propertyStatus:ABS_STATUS.propertyStatus,
                loadTimeOptions:{
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date());
                            }
                        }
                    ]
                },
                params:{
                    status:0
                },
                status:0,
                assetsIds:[],

                excelData:[],
                tmpDown:{},
                wopts:{ bookType: 'xlsx', bookSST: false, type: 'binary' },
            }
        },
        methods: {
            clearFilter(){
                const self = this;
                if(self.filter_name!=''){
                    self.filter_name = '';
                    self.params.keyword = '';
                    self.getStandingBookList(self.params);
                }                    
            },
            handleSelectionChange(){
 
            },
            
            checkView(row){
                const self = this;
                sessionStorage.setItem('assetsId',row.id);
                self.$router.push({path:'/pages/assets/standing-book/views'});
            },
            pageSizeChange(e){
                const self = this;
                self.pageSize = e;
                self.currentPage = 1;
                self.getStandingBookList(self.params);
            },
            pageCurrentChange(e){
                const self = this;
                self.currentPage = e;
                self.getStandingBookList(self.params);
            },
            dateChange(type,event){
                const self = this;
                event = event.replace(/\s+/g,"");                

                let begin = event.split('至')[0];
                let end = event.split('至')[1];

                if(type == 'loanTime'){   
                    self.params.loanBeginTime = begin;
                    self.params.loanEndTime = end;
                        
                }else if(type == 'receiveableMoneyTime'){                    
                    self.params.receiveableMoneyBeginTime = begin
                    self.params.receiveableMoneyEndTime = end;
                                               
                }else if(type == 'publishTime'){
                    self.params.publishBeginTime = begin
                    self.params.publishEndTime = end; 
                        
                }

                self.getStandingBookList(self.params)  
            },
            statusChange(e){
                const self = this;
                self.params.status = e;
                self.getStandingBookList(self.params)
            },
            search(){
                const self = this;
                self.filter_name = self.filter_name.replace(/\s+/g,"");
                if(self.filter_name == ''){
                    return;
                }
                self.params.keyword = self.filter_name;
                self.getStandingBookList(self.params);
            },
            tableSelect(selection,row){
                const self = this;
                self.assetsIds = selection;
            },
            tableSelectAll(selection){
                const self = this;
                self.assetsIds = selection;
            },

            downloadExl() {
                const self = this;

                let excelData = [];
                self.assetsIds.forEach((val,index)=>{
                    excelData.push({
                        '资产编号':val.assetsId,
                        '供应商':val.providerName,
                        '项目公司':val.productCompanyName,
                        '所属区域':val.area,
                        '应收账款金额':val.receiveableMoney,
                        '转让折价':val.transferPrice,
                        '提交日期':val.submitTime,
                        '放款日期':val.loanTime,
                        '资产发行日期':val.publishTime,
                        '应收账款到期日':val.receiveableMoneyEndTime,
                        '融资天数':val.financingDays,
                        '还款日期':val.repaymentTime,
                        '资产状态':self.propertyStatus[val.status]
                    })
                })

                const wb = { SheetNames: ['Sheet1'], Sheets: {}, Props: {} };
                wb.Sheets['Sheet1'] = XLSX.utils.json_to_sheet(excelData);//通过json_to_sheet转成单页(Sheet)数据
                self.saveAs(new Blob([self.s2ab(XLSX.write(wb, self.wopts))], { type: "application/octet-stream" }), "台账列表" + '.' + (self.wopts.bookType=="biff2"?"xls":self.wopts.bookType));
            },
            s2ab(s) {
                if (typeof ArrayBuffer !== 'undefined') {
                    var buf = new ArrayBuffer(s.length);
                    var view = new Uint8Array(buf);
                    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                } else {
                    var buf = new Array(s.length);
                    for (var i = 0; i != s.length; ++i) buf[i] = s.charCodeAt(i) & 0xFF;
                    return buf;
                }
            },
            saveAs(obj, fileName) {//当然可以自定义简单的下载文件实现方式 
                var tmpa = document.createElement("a");
                tmpa.download = fileName || "下载";
                tmpa.href = URL.createObjectURL(obj); //绑定a标签
                tmpa.click(); //模拟点击实现下载
                setTimeout(function () { //延时释放
                    URL.revokeObjectURL(obj); //用URL.revokeObjectURL()来释放这个object URL
                }, 100);
            }
            
        },
        watch: {
            
        },
        mixins:[Common,Assets],
        mounted() {
            const self = this;
            self.getStandingBookList(self.params);
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>
<style>
    /*.property-to-confirm .date-picker input{width: 400px;font-size: 13px;color: #666;}*/
    .property-to-confirm .toolbar-top .date-picker.el-input{width: 220px;font-size: 13px;color: #666;text-align: center;}
    .toolbar-top .toolbar-select .el-input{width: 220px;}
</style>