<template>
	<div :id="id" style="position: relative;">
		<div class="jade-con">
			<span :style="{fontSize:vFontSize+'px',color:lineColor}">{{chartData.length > 0 ? ((chartData[0].value*100).toFixed(1)+'%') : '0%'}}</span>
			<span :style="{fontSize:tFontSize+'px'}">{{name}}</span>
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
			name:{
				type:String,
				default:''
			},
			vFontSize:{
				type:Number,
				default:24
			},
			tFontSize:{
				type:Number,
				default:18
			},
			lineWidth:{
				type:Number,
				default:0.15
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
				if(val.length > 0 && val[0].value){
					if(val[0].value >= 0.5 && val[0].value < 0.8){
						this.lineColor = '#ff913c';
						val[0].color = '#ffaa68';
					}else if(val[0].value >= 0.8){
						this.lineColor = '#f40';
						val[0].color = '#eb5270';
					}else{
						this.lineColor = '#009944';
						val[0].color = '#68d3b1';
					}
				}
				this.drawChart(val);
			}
		},
		methods:{
			drawChart(datas){
				let self = this;
				let data = datas;

				if(this.count > 1){
					this.chart2.changeData(data);
					return
				}
				//G2 部分
				this.chart && this.chart.destroy();
				this.chart = new G2.Chart({
		          	id: this.id,
		          	forceFit: this.forceFit,
		          	width: this.width,
		          	height: this.height,
		          	plotCfg:{
		          		margin:2
		          	},
		          	animate:false
		        });
		        //绘制底层圆环
		        this.chart.source([{name:'cricle',percent:1}]);
		        this.chart.coord('polar', {
	                inner: 1 - this.lineWidth
	            }).transpose();
	            this.chart.tooltip(false);
		        this.chart.legend(false);
		        this.chart.interval().position('name*percent').color('#f1efeb').opacity(1);
		        this.chart.changeData([{name:'cricle',percent:1}]);
		        //绘制上层圆环
		        this.chart2 = this.chart.createView();
    	        this.chart2.source(data,{
    	        	value:{
    	        		min:0,
    	        		max:1
    	        	}
    	        });
    	        this.chart2.coord('polar', {
                    inner: 1 - this.lineWidth
                }).transpose();
    	        this.chart2.tooltip(false);
    	        this.chart2.interval().position('name*value').color('color',function(){
    	        	if(data.length>0){
    	        		return data[0].color
    	        	}
    	        }).opacity(1);
		        this.chart.render();
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