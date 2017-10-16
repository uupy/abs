<template>
    <section class="panel-main">
        {{protocolId}}
    </section>
</template>
<script>
    import Common from '@/mixins/common.js'
    import Clients from '@/api/clients.js'
    export default {
        data() {
            return {
                protocolId:''
            }
        },
        methods: {
           
        },
        watch: {
            
        },
        mixins:[Common,Clients],
        mounted() {
            const self = this;
            
        },
        computed: {
            
        },
        components:{
           
        }
    }
</script>