<template>
    <section class="panel-main">
        property-to-be-loan
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                
            }
        },
        methods: {
           
        },
        watch: {
            
        },
        mixins:[Common,Clients],
        mounted() {
            const self = this;
            self.protocolStatus = STATUS.protocolStatus;
            console.log(self.protocolStatus)
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>