<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        name: 'app',
        data() {
            return {
                themeClass:'theme-white'
            }
        },
        methods: {
            
        },
        watch: {
            
        },
        mounted() {
            this.$nextTick(()=>{
                const oBody = document.querySelector('body');
                      oBody.className = this.themeClass;
            });
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>