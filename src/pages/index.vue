<template>
	<section class="index-panel">
		<el-col :span='12' class='card-list'>
			<el-card class="box-card">
			  	<div slot="header" class="clearfix">
			    	<span>代办</span>
			    	<el-button style="float: right; padding: 3px 0" type="text" v-if="todoList.length > 0">更多 >></el-button>
			  	</div>
			  	<template v-if="todoList.length > 0">
				  	<div v-for="(item,index) in todoList" :key="index" class="item-list text item" @click='todoDetail("/pages/index/todo-list",item.id)'>
				    	{{item.name}}
				  	</div>
			  	</template>
			  	<template v-else>
				  	<div class="item-list text item">
				    	<p style="text-align:center;">待开发...</p>
				  	</div>
			  	</template>
			</el-card>
		</el-col>
		<el-col :span='12' class='card-list'>
			<el-card class="box-card">
			  	<div slot="header" class="clearfix">
			    	<span>公告</span>
			  	</div>
			  	<template v-if="noticeList.length > 0">
				  	<div v-for="(item,index) in noticeList" :key="index" class="item-list text item" @click='todoDetail("/pages/index/todo-list",item.id)'>
			    	{{item.name}}
			  	</div>
			  	</template>
			  	<template v-else>
				  	<div class="item-list text item">
				    	<p style="text-align:center;">待开发...</p>
				  	</div>
			  	</template>
			</el-card>
		</el-col>

		<el-col :span='12' class='card-list'>
			<el-card class="box-card">
			  	<div slot="header" class="clearfix">
			    	<span>统计表</span>			    	
			  	</div>
			  	<div class="echarts-wrap echarts-wrap1" id='echarts-wrap1'>
			  		<p style="text-align:center;">待开发...</p>
			  	</div>			  	
			</el-card>
		</el-col>
		<el-col :span='12' class='card-list'>
			<el-card class="box-card">
			  	<div slot="header" class="clearfix">
			    	<span>统计表</span>			    	
			  	</div>	
			  	<div class="echarts-wrap echarts-wrap2" id='echarts-wrap2'>
			  		<p style="text-align:center;">待开发...</p>
			  	</div>		  	
			</el-card>
		</el-col>
			
	</section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Users from '@/api/userMangement/user'
    export default {
        data() {
            return {
                todoList:[],
                noticeList:[],
                option1:{
				    title : {
				        text: '统计表',
				        subtext: '',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: []
				    },
				    series : [
				        // {
				        //     name: '访问来源',
				        //     type: 'pie',
				        //     radius : '55%',
				        //     center: ['50%', '60%'],
				        //     data:[
				        //         {value:335, name:'直接访问'},
				        //         {value:310, name:'邮件营销'},
				        //         {value:234, name:'联盟广告'},
				        //         {value:135, name:'视频广告'},
				        //         {value:1548, name:'搜索引擎'}
				        //     ],
				        //     itemStyle: {
				        //         emphasis: {
				        //             shadowBlur: 10,
				        //             shadowOffsetX: 0,
				        //             shadowColor: 'rgba(0, 0, 0, 0.5)'
				        //         }
				        //     }
				        // }
				    ]
				},
				option2:{
				    color: ['#3398DB'],
				    title : {
				        text: '统计表',
				        subtext: '',
				        x:'center'
				    },
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
				    xAxis : [
				        {
				            type : 'category',
				            data : [],
				            axisTick: {
				                alignWithLabel: true
				            }
				        }
				    ],
				    yAxis : [
				        {
				            type : 'value'
				        }
				    ],
				    series : [
				        // {
				        //     name:'直接访问',
				        //     type:'bar',
				        //     barWidth: '60%',
				        //     data:[10, 52, 200, 334, 390, 330, 220]
				        // }
				    ]
				},
            }
        },
        mixins:[Common,Users],
        methods: {            
            gopage(url,id){
            	console.log('url:',url,' id:',id)
            },
            echartsInit(id,option){
            	var myChart = echarts.init(document.getElementById(id));		      
		        myChart.setOption(option);
            },
            todoDetail(){
            	
            }
        },
        watch: {
            
        },
        mounted() {
            const self = this;   
            self.$nextTick(()=>{
            	// self.echartsInit('echarts-wrap1',self.option1);
            	// self.echartsInit('echarts-wrap2',self.option2);
            });        
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>
<style>
	.card-list{box-sizing: border-box;padding:2%  2% 0 2%;font-size: 14px;}
	.card-list:nth-child(odd){padding-right: 0;}
	.index-panel .el-card__header{padding: 10px 20px;color: #fff;background: #daccb1;border-bottom: 1px solid #daccb1;}
	.index-panel .el-card{border:1px solid #daccb1;color:#48576a;}
	.index-panel .el-card .el-button--text{color: #fff;}
	.index-panel .el-card__header i{font-size: 12px;font-weight: lighter;}
	.item-list{padding: 6px 0;cursor: pointer;}
	.item-list:hover{color: #8383dc;}

	.card-list:nth-child(1) .el-card .el-card__body,.card-list:nth-child(2) .el-card .el-card__body{height: 150px;height: 150px;overflow: hidden;}
	.card-list:nth-child(3) .el-card .el-card__body,.card-list:nth-child(4) .el-card .el-card__body{min-height: 300px;/*width: 300px;*/}
	.index-panel .echarts-wrap{min-height: 300px;/*width: 600px;*/}
</style>