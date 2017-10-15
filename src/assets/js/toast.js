var Toast = {};
Toast.install = function (Vue, options) {
    var opt = {
        level:'prompt',
        duration:'3000',
        callback:function(){}
    }
    for(var property in options){
        opt[property] = options[property];
    }
    Vue.prototype.$toast = function(msg,options){

        var curLevel = options.level ? options.level : opt.level;
        var title = options.title || '';
        var callback = options.callback ? options.callback : opt.callback;
        var timer = null;

        if(document.querySelector('.vs-toast')){
            // 如果toast还在，则不再执行
            return;
        }
        var toastTpl = Vue.extend({
            template: `<div class="vs-toast vs-toast-${curLevel}">
                            <h3 class="vs-toast-h">
                                ${title}
                                <i class="btn el-icon-close"></i>
                            </h3>
                            <div class="vs-toast-b">${msg}</div>
                       </div>`
        });
        var tpl = new toastTpl().$mount().$el;
        document.body.appendChild(tpl);
        tpl.onmouseover = function(){
            clearInterval(timer);
            tpl.querySelector('.el-icon-close').onclick = function(){
                document.body.removeChild(tpl);
            }
            tpl.querySelector('.vs-toast-b').onclick = function(){
                callback();
                document.body.removeChild(tpl);
            }
        }
        tpl.onmouseout = function(){
            timer = setTimeout(function () {
                document.body.removeChild(tpl);
            }, opt.duration)
        }
        timer = setTimeout(function () {
            document.body.removeChild(tpl);
        }, opt.duration)
    };
}
module.exports = Toast;