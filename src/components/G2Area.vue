<template>
	<div :id="id"></div>
</template>
<script>
	import G2 from 'g2'
	export default {
		data(){
			return{
				chart:null,
				count:0,
				dx:0
			}
		},
		props:{
			chartData:{
				type:Array,
				default:[]
			},
			id:String,
			colors:{
				type:Array,
				default:function () {
					return ['#db7783']
				}
			},
			lgPosition:{
				type:String,
				default:'top'
			},
			legend:{
				type:Boolean,
				default:true
			},
			forceFit:{
				type:Boolean,
				default:true
			},
			width:{
				type:Number,
				defalut:600
			},
			height:{
				type:Number,
				default:200
			},
			translateX:{
				type:Number,
				default:55
			},
			opacity:{
				type:Number,
				default:0.8
			},
			plotCfg:{
				type:Object,
				default:function(){
					return {
						margin:[80,40,40,40]
					}
				}
			}
		},
		mounted(){
			this.dx = document.querySelector('#'+this.id).clientWidth/2 - this.translateX;
			this.drawChart(this.chartData);
		},
		watch:{
			//注意不能使用箭头函数
			chartData:function(val,oldVal){
				this.drawChart(val);
			}
		},
		methods:{
			drawChart(datas){
				const self = this;
				let data = datas;
				if(self.count > 2){
					self.chart.changeData(data);
					return
				}
				self.chart && self.chart.destroy();
				self.chart = new G2.Chart({
		          	id: self.id,
		          	forceFit: self.forceFit,
		          	width: self.width,
		          	height: self.height,
		          	plotCfg:self.plotCfg,
		          	animate:false
		        });
		        self.chart.source(data, {
		          	time: {
		                tickCount:7,
		                nice: false,
		                range:[0,1]
		          	}
		        });
		        //坐标轴配置
		        self.chart.axis('value',{
		        	title:null,
		        	labels:null,
		        	line:null,
		        	grid:null,
		        	tickLine: null
		        });
		        self.chart.axis('time',{
		        	title:null
		        });
		        //图例配置
		        if(self.legend){
			        if(self.lgPosition == 'top'){
			        	self.chart.legend({
			        		position:self.lgPosition,
			        		dx:self.dx,
			        		title: null
			        	});
			        }else{
			        	self.chart.legend({
			        		position:self.lgPosition,
			        		title: null
			        	});
			        }
		        }else{
		        	self.chart.legend(false);
		        }
		        self.chart.area().position('time*value').color('type',self.colors).shape('smooth').size(0).opacity(self.opacity);
		        self.chart.render();
		        self.count ++
			}
		}
	}
</script>