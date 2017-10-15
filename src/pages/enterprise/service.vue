<template>
    <section class="panel-main" :style="styles">
        
    </section>
</template>
<script>
    import Common from '../../mixins/common.js'
    export default {
        data() {
            return {
                
            } 
        },
        mixins:[Common],
        methods: {
            
            enterKeyup(e){
                const self = this;
                const ev = e || window.event;
                if(ev.keyCode == 13){
                    
                }
            }
        },
        mounted() {
            const self = this;
            self.$nextTick(()=>{
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

