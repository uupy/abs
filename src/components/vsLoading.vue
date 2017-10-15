<template>
	<div :class="className" v-show="isShow">
		<div class="spinner">
            <span class="rect1"></span>
            <span class="rect2"></span>
            <span class="rect3"></span>
            <span class="rect4"></span>
            <span class="rect5"></span>
         </div>
	</div>
</template>
<script>
	export default {
		data(){
			return{
				
			}
		},
		props:{
			className:{
				type:String,
				default:'vs-loading'
			},
			isShow:{
				type:Boolean,
				default:false
			}
		},
		mounted(){
			
		},
		watch:{
			//注意不能使用箭头函数
		},
		methods:{
			
		}
	}
</script>