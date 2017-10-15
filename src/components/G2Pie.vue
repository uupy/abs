<template>
	<div :id="id" style="position: relative;">
		<div class="jade-con">
			<span :style="{fontSize:fontSize+'px',color:txtColor}">{{content}}</span>
			<span :style="{fontSize:(fontSize-8)+'px',color:txtColor}">{{subContent}}</span>
		</div>
	</div>
</template>
<script>
	import G2 from 'g2'
	export default {
		data(){
			return{
				chart:null,
				chart2:null,
				count:0,
				lineColor:'#059941'
			}
		},
		props:{
			chartData:{
				type:Array,
				default:[]
			},
			id:String,
			forceFit:{
				type:Boolean,
				default:true
			},
			width:{
				type:Number,
				defalut:200
			},
			height:{
				type:Number,
				default:200
			},
			fontSize:{
				type:Number,
				default:26
			},
			txtColor:{
				type:String,
				default:'#6a6a6a'
			},
			content:{
				type:Number,
				default:0
			},
			subContent:{
				type:String,
				default:''
			},
			lineWidth:{
				type:Number,
				default:0.10
			},
			colors:{
				type:Array,
				default:function(){
					return ['#6790d2']
				}
			}
		},
		mounted(){
			this.drawChart(this.chartData);
			this.$nextTick(()=>{
				let obj = document.querySelector('#'+this.id);
				let objChild = obj.querySelector('.jade-con');
				objChild.style.top = (obj.clientHeight - objChild.clientHeight)/2 + 'px'
			});
		},
		watch:{
			//注意不能使用箭头函数
			chartData:function(val,oldVal){
				this.drawChart(val);
			}
		},
		methods:{
			drawChart(datas){
				let self = this;
				let data = datas;
				let Stat = G2.Stat;
				if(this.count > 1){
					this.chart.changeData(data);
					return
				}
		        
				//G2 部分
				this.chart && this.chart.destroy();
				this.chart = new G2.Chart({
		          	id: this.id,
		          	forceFit: this.forceFit,
		          	height: this.height,
		          	plotCfg:{
		          		margin:2
		          	},
		          	animate:false
		        });
		        //绘制底层圆环
		        this.chart2 = this.chart.createView();
		        this.chart2.source([{name:'cricle',value:1}]);
		        this.chart2.coord('polar', {
	                inner: 1 - this.lineWidth
	            }).transpose();
	            this.chart2.tooltip(false);
		        this.chart2.interval().position('name*value').color('#f1efeb').opacity(1);
		        this.chart2.changeData([{name:'cricle',value:1}]);
		        //上层饼图
		        this.chart.source(data);
		        this.chart.coord('theta', {
	                radius: 1,
	                inner: 1 - this.lineWidth
	            });
		        this.chart.tooltip({
		        	title: null,
		        	map:{
		        		title:'name',
		        		name:'name',
		        		value:'value'
		        	}
		        });
		        this.chart.tooltip(false);
		        this.chart.legend(false);
		        this.chart.intervalStack().position(Stat.summary.percent('value')).color('name',this.colors);
		        this.chart.render();
		        this.chart.changeData(data);
		        this.count ++
			}
		}
	}
</script>
<style>
	.jade-con{
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		text-align: center;
		z-index: 99;
	}
	.jade-con span{
		display: block;
	}
</style>