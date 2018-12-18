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
    if (TID == 3) {
        $("#Year").val(Val);
    } else if (TID == 4) {
        $("#Month").val(Val);
    } else if (TID == 2) {
        $("#OCountry").val(Val);
    } else if (TID == 1) {
        $("#StateType").val(Val);
    } else if (TID == 8) {
        $("#getDepartment").val(Val);
    } else if (TID == 7) {
        $("#getJDR").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#CodeId").val(Val);
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
        url: "/AliPay/IndexAjax",
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
    paging(valueS[1], 8);
    var orders = valueS[0].split('&|');
    var tStr = '';

    $("#t tbody").html("");


    tStr += '<tr>';
    tStr += '<td colspan="11" style="font-size:13px;">';
    tStr += '<table style="width:100%;border: dashed 1.0px #CCC;" cellpadding="0" cellspacing="0" align="center" bordercolor="#F3F3F3" height="40" width="250"><tbody>';
    tStr += '<tr style="border-bottom: dashed 1.5px #E4E4E4;background-color:#EEF4FB;">';
    tStr += '<td height="30px;" align="left" style="padding-left:10px;width:250px;">按照月份统计 (入账时间)</td>';
    tStr += '<td style="width:120px;" align="center">&nbsp;</td>';
    tStr += '<td style="width:120px;" align="center">&nbsp;</td>';
    tStr += '<td style="width:120px;" align="center">&nbsp;</td>';
    tStr += '</tr>';
    tStr += '<tr style="border-bottom: dashed 1.5px #E4E4E4;background-color:#EEF4FB;">';
    tStr += '<td height="70px;" align="left" style="padding-left:10px;font-size:14px;">';
    tStr += '总收入：<span style="color:green;font-size:18px;" >' + valueS[2] + '</span> <br>';
    tStr += '总支出：<span style="color:red;;font-size:18px;" >' + valueS[3] + '</span> <br>';

    //tStr += '部门交易收入：<span style="color:red;;font-size:18px;" >' + valueS[4] + '</span> <br>';
    //tStr += '部门交易支出：<span style="color:red;;font-size:18px;" >' + valueS[5] + '</span> <br>';

    tStr += '</td>';
    tStr += '<td style="width:120px;" align="center">&nbsp;</td>';
    tStr += '<td style="width:120px;" align="center">&nbsp;</td>';
    tStr += '<td style="width:120px;" align="center">&nbsp;</td>';
    tStr += '</tr>';
    tStr += '</tbody></table>';
    tStr += '</td>';
    tStr += '</tr>';


    tStr += '<tr style="background-color:#C6C3C3;color:#fff;font-size:12px;">';
    tStr += '<td height="30" bgcolor="#C6C3C3" width="30%"><div align="center">订单号</div></td>';
    tStr += '<td height="30" bgcolor="#C6C3C3" width="12%" ><div align="center">入账时间</div></td>';
    tStr += '<td height="30" bgcolor="#C6C3C3" width="18%"><div align="center">类型栏</div></td>';
    tStr += '<td height="30" bgcolor="#C6C3C3" width="15%" ><div align="center">费用栏</div></td>';
    tStr += '<td height="30" bgcolor="#C6C3C3" width="18%" ><div align="center">对方信息</div></td>';
    tStr += '<td height="30" bgcolor="#C6C3C3" ><div align="center">商品名称</div></td>';
    tStr += '</tr>';

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="40" style="text-align:center; font-size:12px;" onclick = "bgChange(this)">';
        tStr += '<td align="left" style="' + order[25] + '"><div style="padding-left:18px;"><a href="/Order/AddPaymentShow?oid=' + order[26] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:blue;font-size:15px;" id="lsh_' + order[1] + '">' + order[1] + '</a><br/>支付宝交易号: ' + order[4] + '<br/>支付宝流水号: ' + order[5] + '<br/>商户订单号: ' + order[6] + '<br/>备注: ' + order[17] + '</div></td>';
        tStr += '<td align="center">' + order[3] + '</td>';
        tStr += '<td align="left">' + order[27] + '<br/>账务类型: ' + order[7] + '<br/>支付渠道: ' + order[12] + '</td>';
        //tStr += '<td>' + order[9] + '</td>';
        tStr += '<td align="left">' + order[28] + '<br/>服务费(元): ' + order[11] + '<br/>账户余额(元): ' + order[10].toString().match(/^\d+(?:\.\d{0,2})?/) + '</td>';
        tStr += '<td align="left">对方账户: ' + order[13] + '<br/>对方名称: ' + order[14] + '<br/>银行订单号: ' + order[15] + '</td>';
        tStr += '<td>' + order[16] + '</td>';
        tStr += '</tr>';
    }
    $("#t tbody").html(tStr);
    $('.footable').footable();
    $('.footable2').footable();
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
function BindIniAliData(Year, Month, StateType, OCountry, getJDR, getDepartment, Count) {
    if (Year == 0 && Month == 0 && StateType == 0 && OCountry == 0 && getJDR == 0 && getDepartment == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定年份
    showYear();

    //绑定国家
    BindCountry();

    //绑定月份
    BindMonth();

    //绑定接单人员
    BindJDR();

    paging(Count, 7);

    chkk();
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
    var str = '<dt>入账年份：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year3 + ',3);">' + year3 + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + nowYear + ',3);">' + nowYear + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year1 + ',3);">' + year1 + '年</a></dd>';
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

//自动生成年份
function BindMonth() {
    var str = '<dt>入账月份：</dt><dd class="select-all selected">';
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

//绑定接单人员
function BindJDR() {
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetUserJDR",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>接单人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,7);">全部</a></dd>';
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',7);">' + arr[1] + '</a></dd>';
                });
                $("#select7").append(str);

                $("#select7 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectY").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisF = $(this).clone();
                        if ($("#selectY").length > 0) {
                            $("#selectY a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisF.attr("onclick", "del(this,7);");
                            $(".select-result dl").append(copyThisF.attr("id", "selectY"));
                            $("#selectY a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

//绑定国家
function BindCountry() {
    $.ajax({
        type: "GET",
        url: "/Order/GetCountryList",
        //data: "SupplierID=" + SupplierID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>签证国家：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,2);">全部</a></dd>';
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',2);">' + arr[1] + '</a></dd>';
                });
                $("#select2").append(str);

                $("#select2 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectW").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisZ = $(this).clone();
                        if ($("#selectW").length > 0) {
                            $("#selectW a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisZ.attr("onclick", "del(this,2);");
                            $(".select-result dl").append(copyThisZ.attr("id", "selectW"));
                            $("#selectW a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

