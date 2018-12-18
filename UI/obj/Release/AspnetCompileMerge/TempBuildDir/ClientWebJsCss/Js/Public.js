function LoadingShow() {
    
}
function LoadingHide() {
    //asyncbox.Cover(false);
}

String.prototype.replaceAll = function (reallyDo, replaceWith) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, "g"), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
}
String.prototype.StrLen = function(){ return this.replace(/[\u4e00-\u9fa5]/g, "aa").length; }
function GetStringLenth(strValue) { return strValue.StrLen(); }
function GetStringSubStr(strValue, len) { return strValue.replace(/([\u0391-\uffe5])/ig, '$1a').substring(0, len).replace(/([\u0391-\uffe5])a/ig, '$1') + ""; }

function formatNumber(s, n) {
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = s.split(".")[0].split("").reverse();
    r = s.split(".")[1];
    t = "";
    for (i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
    }
    return t.split("").reverse().join("") + "." + r;
}

function AddDays(date, days) {
    var nd = new Date(date);
    nd = nd.valueOf();
    nd = nd + days * 24 * 60 * 60 * 1000;
    nd = new Date(nd);
    //alert(nd.getFullYear() + "年" + (nd.getMonth() + 1) + "月" + nd.getDate() + "日");
    var y = nd.getFullYear();
    var m = nd.getMonth() + 1;
    var d = nd.getDate();
    if (m <= 9) m = "0" + m;
    if (d <= 9) d = "0" + d;
    var cdate = y + "-" + m + "-" + d;
    return cdate;
}

//验证是否为金额
function isDigit(s) { var patrn = /^-?\d+\.{0,}\d{0,}$/; if (!patrn.exec(s)) { return false } else { return true } }

//验证是否为空
function isNull(str) {
    var result = false;
    str = lrTrim(str);
    if (str.length == 0) {
        result = true;
    }
    return result;
}
 
//通过id获取当前对象
function g(objId) {
    return document.getElementById(objId);
}
//去除左右边空格
function lTrim(str) {
    if (str.charAt(0) == " ") {
        //如果字串左边第一个字符为空格 
        str = str.slice(1); //将空格从字串中去掉 
        //这一句也可改成 str = str.substring(1, str.length); 
        str = lTrim(str);    //递归调用 
    }
    return str;
}
//rTrim()去掉字串右边的空格 
function rTrim(str) {
    var iLength;
    iLength = str.length;
    if (str.charAt(iLength - 1) == " ") {
        //如果字串右边第一个字符为空格 
        str = str.slice(0, iLength - 1); //将空格从字串中去掉 
        //这一句也可改成 str = str.substring(0, iLength - 1); 
        str = rTrim(str);    //递归调用 
    }
    return str;
}
//trim() 去掉字串两边的空格 
function lrTrim(str) {
    return lTrim(rTrim(str));
}

function showMessage(confirmText, IconIndex, waitSeconds, showStyle) {
    var icon = 'alert';
    if (IconIndex == 1) icon = 'alert';
    if (IconIndex == 2) icon = 'success';
    if (IconIndex == 3) icon = 'error';

    //showStyle = fadeIn 或者 slideDown
    if (showStyle == '' || showStyle == "undefined" || showStyle == undefined || showStyle == null) showStyle = 'fadeIn';
    if (waitSeconds == '' || waitSeconds == "undefined" || waitSeconds == undefined || waitSeconds == null) waitSeconds = 1200;

    asyncbox.tips(confirmText, icon, waitSeconds);
}


