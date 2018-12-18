function toDecimal(x) {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
    }
    return s;
}

//读取搜索信息
function Seach(Val, TID) {
    if (TID == 99) {
        $("#Page").val(Val);
    }
    chbk(1);
}

//删除方法
function del(obj, id) {
    Seach(0, id);
    $(obj).remove();
    $("#select" + id + " .select-all").addClass("selected").siblings().removeClass("selected");
    if (id == 26) {
        $("#select5").empty();
    }
    if ($(".select-result dd").length > 1) {
        $(".select-no").hide();
    } else {
        $(".select-no").show();
    }
}

function Seach(Val, TID) {

    if (TID == 26) {
        $("#OType").val(0);
        $("#select5").empty();
        GetBlackItem(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else if (TID == 5) {
        $("#OItem").val(Val);
    } else {
        $("#OType").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chbk();
}

function chbk(TDID) {

    $.ajax({
        type: "POST",
        url: "/BlackList/IndexAjax",
        data: $("#form1").serialize(),
        success: function (sesponseTest) {
            //alert(sesponseTest);
            if (sesponseTest == "") {
                $("#t tbody").html("");
            } else {
                BindSeachBlackList(sesponseTest);
            }
        }
    });
}

//绑定搜索信息
function BindSeachBlackList(str) {
    //分割字符串 &|
    var valueS = str.split('&*');
    paging(valueS[1], 10);
    var orders = valueS[0].split('&|');
    var tStr = '';
    $("#t tbody").html("");
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:13px;" onclick = "bgChange(this)">';
        tStr += '<td>' + h + '</td>';
        tStr += '<td >' + order[2] + '<br/>' + order[4] + '</td>';
        tStr += '<td ><span id="rs_' + order[5] + '">' + order[5] + '<br><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[5] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[5] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[5] + '" /></a></span></td>';
        tStr += '<td >' + order[6] + '</td>';
        tStr += '<td >' + order[7] + '</td>';
        tStr += '<td >' + order[8] + '</td>';
        tStr += '<td >' + order[11] + '</td>';
        tStr += '<td >' + order[9] + '</td>';
        tStr += '<td >' + order[10] + '</td>';
        tStr += '<td >' + formatDate(order[13], "yyyy-MM-dd") + '</td>';
        tStr += '</tr>';

    }
    $("#t tbody").html(tStr);
    $('.footable').footable();
    $('.footable2').footable();
}

//自动加载数据
function BindBlackListData(OType, OItem, Count) {
    if (OType == 0 && OItem == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //绑定黑名单类型
    BindBType(); 

    paging(Count, 10);

    chbk();
}

//绑定黑名单类型
function BindBType() {
    $.ajax({
        type: "GET",
        url: "/BlackList/GetBlackType",
        //data: "SupplierID=" + SupplierID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>获取类型：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,26);">全部</a></dd>';
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',26);">' + arr[1] + '</a></dd>';
                });
                $("#select26").append(str);

                $("#select26 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectZ").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisZ = $(this).clone();
                        if ($("#selectZ").length > 0) {
                            $("#selectZ a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisZ.attr("onclick", "del(this,26);");
                            $(".select-result dl").append(copyThisZ.attr("id", "selectZ"));
                            $("#selectZ a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

//绑定送签领馆中心的名称
function GetBlackItem(SID) {
    $("#select5").empty();
    $.ajax({
        type: "GET",
        url: "/BlackList/GetBlackItem",
        data: "SID=" + SID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var str = '<dt>类型子项：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
                var strAry = sesponseTest.split(",");
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',5);">' + arr[1] + '</a></dd>';
                });
                $("#select5").append(str);

                $("#select5 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectE").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisE = $(this).clone();
                        if ($("#selectE").length > 0) {
                            $("#selectE a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisE.attr("onclick", "del(this,5);");
                            $(".select-result dl").append(copyThisE.attr("id", "selectE"));
                            $("#selectE a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

//格式化时间
function formatDate(date, format) {
    //alert(date);
    if (!date) return;
    if (!format) format = "yyyy-MM-dd";
    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
        default:
            date = "";
            break;
    }
    if (!date instanceof Date) return;
    var dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
}

//内容复制项目
function jsCopy(wwhao) {
    var e = document.getElementById("" + wwhao + "");//对象是content 
    e.select(); //选择对象 
    document.execCommand("Copy"); //执行浏览器复制命令
    //alert("已复制好，可贴粘。");
}

//背景颜色
function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}