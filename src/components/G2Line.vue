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
				dx:0,
				typeArr:[]
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
			opacity:{
				type:Number,
				default:0.8
			},
			typeCount:{
				type:Number,
				default:1
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
			this.dx = document.querySelector('#'+this.id).clientWidth/2 - 55;
			this.drawChart(this.chartData);
		},
		watch:{
			//注意不能使用箭头函数
			chartData:function(val,oldVal){
				this.typeArr = [];
				for(let i = 0; i<this.typeCount;i++){
					
					this.typeArr.push(val[i].type);
				}
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
		          	x: {
		                tickCount:7,
		                nice: false,
		                range:[0,1]
		          	},
		          	y: {
		                tickCount:5
		          	}
		        });
		        //坐标轴配置
		        self.chart.axis('y',{
		        	title:null
		        });
		        self.chart.axis('x',{
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
		        self.chart.line().position('x*y').color('type',self.colors).size(2).shape('type', self.typeArr);
		        self.chart.render();
		        self.count ++
			}
		}
	}
</script>