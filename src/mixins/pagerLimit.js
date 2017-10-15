export default {
    methods: {
        pagerLimit(pagesize,pagetotal,obj){
            obj = obj || document;
            const pageInput = obj.querySelector('.el-pagination__editor');
            if(pageInput){
                pageInput.onkeyup = function(ev){
                    if(this.value > Math.ceil(pagetotal/pagesize)){
                        this.value = Math.ceil(pagetotal/pagesize)
                    }
                    if(ev.keyCode == 110||ev.keyCode == 190){
                        let val = this.value;
                        this.value = '';
                        this.value = val;
                        return
                    }
                }
            }
        }
    }
}