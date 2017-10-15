//日期格式化
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//可在Javascript中使用如同C#中的string.format
//使用方式 : var fullName = String.format('Hello. My name is {0} {1}.', 'FirstName', 'LastName');
String.format = function () {
    var s = arguments[0];
    if (s == null) return "";
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = getStringFormatPlaceHolderRegEx(i);
        s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
    }
    return cleanStringFormatResult(s);
}
//可在Javascript中使用如同C#中的string.format (對jQuery String的擴充方法)
//使用方式 : var fullName = 'Hello. My name is {0} {1}.'.format('FirstName', 'LastName');
String.prototype.format = function () {
    var txt = this.toString();
    for (var i = 0; i < arguments.length; i++) {
        var exp = getStringFormatPlaceHolderRegEx(i);
        txt = txt.replace(exp, (arguments[i] == null ? "" : arguments[i]));
    }
    return cleanStringFormatResult(txt);
}
String.prototype.replaceAll = function(s1,s2){ 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

String.prototype.trim = function() {
    var r = this.replace(/(^\s*)|(\s*$)/g, "");
    r = Lremoveblank(r);
    r = Rremoveblank(r);
    return r;
}
function Lremoveblank(s) {
    if (s.length == 1 && s.charCodeAt(0) == 160)
        return "";
    if (s.charCodeAt(0) == 160) {
        s = s.substr(1, s.length - 1);
        return Lremoveblank(s);
    }
    else {
        return s;
    }
}
function Rremoveblank(s) {
    if (s.length == 1 && s.charCodeAt(0) == 160)
        return "";
    if (s.charCodeAt(s.length-1) == 160) {
        s = s.substr(0, s.length - 1);
        return Rremoveblank(s);
    }
    else {
        return s;
    }
}
//讓輸入的字串可以包含{}
function getStringFormatPlaceHolderRegEx(placeHolderIndex) {
    return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
}
//當format格式有多餘的position時，就不會將多餘的position輸出
//ex:
// var fullName = 'Hello. My name is {0} {1} {2}.'.format('firstName', 'lastName');
// 輸出的 fullName 為 'firstName lastName', 而不會是 'firstName lastName {2}'
function cleanStringFormatResult(txt) {
    if (txt == null) return "";
    return txt.replace(getStringFormatPlaceHolderRegEx("\\d+"), "");
}
//扩展数组方法：查找指定元素的下标  
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};
//扩展数组方法:删除指定元素  
Array.prototype.removeByVal = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
            this.splice(i, 1);
            break;
        }
    }
};
//扩展数组方法:删除指定下标元素  
Array.prototype.removeByIndex = function (idx) {
    for (var i = 0; i < this.length; i++) {
        this.splice(idx, 1);
        break;
    }
};
//扩展数组方法:数组去重 
Array.prototype.unique = function () {
    var _this = this;
    var res = [];
    var json = {};
    for (var i = 0; i < _this.length; i++) {
        if (!json[_this[i]]) {
            res.push(_this[i]);
            json[_this[i]] = 1;
        }
    }
    return res;
};
let Util = {
    isArray:function(o){
        return Object.prototype.toString.call(o)=='[object Array]';
    },
    isObject:function(o){
        return Object.prototype.toString.call(o)=='[object Object]';
    },
    isString:function(o){
        return Object.prototype.toString.call(o)=='[object String]';
    },
    isNumber:function(o){
        return Object.prototype.toString.call(o)=='[object Number]';
    },
    isFunction:function(o){
        return Object.prototype.toString.call(o)=='[object Function]';
    },
};
export default Util;