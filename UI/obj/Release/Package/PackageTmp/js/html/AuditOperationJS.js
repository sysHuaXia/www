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
    chkk(1);
}

//删除方法
function del(obj, id) {
    Seach(0, id);
    $(obj).remove();
    $("#select" + id + " .select-all").addClass("selected").siblings().removeClass("selected");
    if (id == 4) {
        $("#select4 dd").addClass("selected").siblings().removeClass("selected");
    }
    if (id == 26) {
        $("#select5").empty();
    }
    if ($(".select-result dd").length > 1) {
        $(".select-no").hide();
    } else {
        $(".select-no").show();
    }
}

//读取搜索信息
function Seach(Val, TID) {
    if (TID == 9) {
        $("#AuditRecordsUser").val(Val);
    } else if (TID == 3) {
        $("#Year").val(Val);
    } else if (TID == 4) {
        $("#Month").val(Val);
    } else if (TID == 1) {
        $("#ALevelId").val(Val);
    } else if (TID == 2) {
        $("#PayType").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#AuditRecordsUser").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chkk();
}

function chkk(TDID) {

    var year = $("#Year").val();
    var month = $("#Month").val();
    if (year == 0) {
        if (month == 0) {
            $("#BeginTime").val("1900-01-01");
            $("#EndTime").val("1900-01-01");
            $("#TimeType").val(0);
        } else {
            var nowYear = new Date().getFullYear();
            var day = new Date(nowYear, month, 0);
            var daycount = day.getDate();
            $("#BeginTime").val(nowYear + "-" + month + "-01");
            $("#EndTime").val(nowYear + "-" + month + "-" + daycount);
            $("#TimeType").val(2);
        }
    } else {
        if (month == 0) {
            $("#BeginTime").val(year + "-01-01");
            $("#EndTime").val(year + "-12-31");
            $("#TimeType").val(1);
        } else {
            var day = new Date(year, month, 0);
            var daycount = day.getDate();
            $("#BeginTime").val(year + "-" + month + "-01");
            $("#EndTime").val(year + "-" + month + "-" + daycount);
            $("#TimeType").val(3);
        }
    }

    $.ajax({
        type: "POST",
        url: "/SysOperation/AuditListAjax",
        data: $("#form1").serialize(),
        success: function (sesponseTest) {
            //alert(sesponseTest);
            if (sesponseTest == "") {
                $("#t tbody").html("");
            } else {
                BindSeachList(sesponseTest);
            }
        }
    });
}

//绑定搜索信息
function BindSeachList(str) {
    //分割字符串 &|
    var valueS = str.split('&*');
    paging(valueS[1], 12);
    var orders = valueS[0].split('&|');
    var tStr = '';

    $("#t tbody").html("");

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';
        tStr += '<td>' + h + '</td>';
        tStr += '<td><span style="color:red;">' + order[13] + '</span></td>';
        tStr += '<td>' + order[17] + '</td>';
        tStr += '<td><a href="/Order/UpdateOrderShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;font-size:13px;" id="lsh_' + order[1] + '">' + order[20] + '</a><br/>' + order[16] + '</td>';
        tStr += '<td><a href="/Order/AddPaymentShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;font-size:13px;" id="lsh_' + order[1] + '">' + order[10] + '</a></td>';
        tStr += '<td>' + order[11] + '</td>';
        tStr += '<td>' + order[12] + '<br><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[12] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[12] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[12] + '" /></a></td>';
        tStr += '<td align="left" style="color:#333">创建人:' + order[8] + '<br/>创建时间:' + order[9] + '</span></td>';

        tStr += '<td align="left" style="color:gray;">';
        if (order[4].length != 0) {
            tStr += '<span >审核人:' + order[4] + '<br/>审核时间:' + order[5] + '</span>';
        }
        tStr += '</td>';

        tStr += '<td style="color:gray;" align="center">';
        if (order[13].length != 0) {
            tStr += '<table align="center"><tr><td width="50%"><div align="right" style="padding-right:5px;"><span style="color:green;">应收:' + toDecimal(order[18]) + '</span><br/><span style="color:red;">应付:' + toDecimal(order[19]) + '</span></div></td><td width="50%" style="border-left: dashed 1.5px #CCC;"><span style="color:red;padding-left:8px;">实付:' + toDecimal(order[14]) + '</span></td></tr></table>';
        }
        tStr += '</td>';

        tStr += '<td>' + toDecimal(order[15]) + '</td>';

        tStr += '<td><input name="pp" readonly="readonly" type="checkbox" id="' + order[0] + '" onclick="doit()" lang="' + toDecimal(order[14]) + '" value="' + order[0] + '"></td>';

        tStr += '</tr>';
    }

    tStr += '<tr style="background-color:#FFB5B5;">';
    tStr += '<td height="40" bgcolor="#FADCDC" width="100%"  style="text-align:right;" colspan="12"><input style="text-align:right;font-size:18px;color:green;border:0px;background:rgba(0, 0, 0, 0);width:100px;" type="text" name="sum">&nbsp;实付¥&nbsp;</td>';
    tStr += '</tr>';

    $("#t tbody").html(tStr);
    $('.footable').footable();
    //$('.footable2').footable();
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

//自动加载数据
function BindIniAuditData(AuditRecordsUser, Year, Month, ALevelId, PayType, Count) {
    var nowYear = new Date().getFullYear();
    var date = new Date;
    var month = date.getMonth() + 1;
    if (AuditRecordsUser == 0 && Year == 0 && Month == 0 && ALevelId == 5 && PayType == 2) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //alert(nowYear);
    //alert(month);

    //doit();

    windowOnload()

    //绑定操作人员
    BindOperation();

    //绑定年份
    showYear();

    //绑定月份
    BindMonth();

    paging(Count, 9);

    chkk();

}

//function doit() {
//    alert("888")
//    var sum = 0;
//    var a = document.getElementsByName("pp");
//    for (var i = 0; i < a.length; i++) {
//        if (a[i].checked) sum += parseFloat(a[i].value, 10);
//    }
//    document.getElementsByName("sum")[0].value = sum;
//}


function windowOnload() {
    //alert("777")
    var a = document.getElementsByName("pp");
    for (var i = 0; i < a.length; i++) {
        a[i].onclick = doit;
    }
}

//绑定关联人员
function BindOperation() {
    $.ajax({
        type: "GET",
        url: "/SysOperation/GetOrderAuditUserName",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>创建人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,9);">全部</a></dd>';
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',9);">' + arr[1] + '</a></dd>';
                });
                $("#select9").append(str);

                $("#select9 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectF").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisF = $(this).clone();
                        if ($("#selectF").length > 0) {
                            $("#selectF a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisF.attr("onclick", "del(this,9);");
                            $(".select-result dl").append(copyThisF.attr("id", "selectF"));
                            $("#selectF a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}


//自动生成年份
function showYear() {
    var nowYear = new Date().getFullYear();
    var year1 = nowYear - 1;
    var year2 = nowYear - 2;
    var year4 = nowYear - 3;
    var year5 = nowYear - 4;
    var year3 = nowYear + 1;
    var jl = '';
    var str = '<dt>订单年份：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year3 + ',3);">' + year3 + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + nowYear + ',3);">' + nowYear + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year1 + ',3);">' + year1 + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year2 + ',3);">' + year2 + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year4 + ',3);">' + year4 + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year5 + ',3);">' + year5 + '年</a></dd>';
    $("#select3").append(str);

    $("#select3 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectC").remove();
            $(".select-no").show();
        } else {
            var copyThisC = $(this).clone();
            if ($("#selectC").length > 0) {
                $("#selectC a").html($(this).text());
            } else {
                $(".select-no").hide();
                copyThisC.attr("onclick", "del(this,3);");
                $(".select-result dl").append(copyThisC.attr("id", "selectC"));
                $("#selectC a").removeAttr("onclick");
            }
        }
    });
}

//自动生成月份
function BindMonth() {
    var str = '<dt>订单月份：</dt><dd class="select-all selected">';
    str += '<a href="javascript:void(0);" onclick="Seach(0,4);">全部</a></dd>';
    for (var i = 1; i <= 12 ; i++) {
        str += '<dd><a href="javascript:void(0);" onclick="Seach(' + i + ',4);">' + i + '月</a></dd>';
    }
    $("#select4").append(str);

    $("#select4 dd").click(function () {
        $(this).addClass("selected").siblings().removeClass("selected");
        if ($(this).hasClass("select-all")) {
            $("#selectD").remove();
            $(".select-no").show();
        } else {
            var copyThisD = $(this).clone();
            if ($("#selectD").length > 0) {
                $("#selectD a").html($(this).text());
            } else {
                $(".select-no").hide();
                copyThisD.attr("onclick", "del(this,4);");
                $(".select-result dl").append(copyThisD.attr("id", "selectD"));
                $("#selectD a").removeAttr("onclick");
            }
        }
    });
}


//点击背景颜色变换
function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}







