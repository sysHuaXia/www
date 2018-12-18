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
        url: "/AuditAccounting/IndexAjax",
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
    paging(valueS[1], 11);
    var orders = valueS[0].split('&|');
    var tStr = '';

    $("#t tbody").html("");

    tStr += '<tr>';
    tStr += '<td colspan="11" style="font-size:13px;"><span style="color:#B5B1B1">注：审核的订单分为线上和线下两种，线上细分为要审核和系统自动审核。   &nbsp;&nbsp;&nbsp;&nbsp;数据统计状态：出签、拒签、退单、待处理订单</span>';
    tStr += '<table style="width:100%;border: dashed 1.0px #CCC;" cellpadding="0" cellspacing="0" align="center" bordercolor="#F3F3F3" height="40" width="250"><tbody>';
    tStr += '<tr style="border-bottom: dashed 1.5px #E4E4E4;background-color:#EEF4FB;">';
    tStr += '<td height="30px;" align="left" style="padding-left:10px;width:200px;">审核分类</td>';
    tStr += '<td style="width:120px;" align="center">业务类型</td>';
    tStr += '<td style="width:120px;" align="center">已审订单</td>';
    tStr += '<td style="width:120px;" align="center">已审金额</td>';
    tStr += '<td style="width:120px;"  align="center">未审订单</td>';
    tStr += '<td style="width:120px;" align="center">未审金额</td>';
    tStr += '<td style="width:120px;" align="center">总计订单</td>';
    tStr += '<td style="width:120px;" align="center">小计金额</td>';
    tStr += '<td style="width:120px;" align="center">封存</td>';
    tStr += '<td style="width:120px;" align="center">总计</td>';
    tStr += '</tr>';
    tStr += '<tr style="border-bottom: dashed 1.5px #E4E4E4;background-color:#EEF4FB;">';
    tStr += '<td height="80px;" align="left" style="padding-left:10px;">';
    tStr += '混合订单：<span style="color:blue;font-size:14px;" onclick="showData(' + valueS[6] + ',' + valueS[7] + ',2);">' + valueS[2] + '</span> <br>';
    tStr += '线上订单：<span style="color:blue;font-size:14px;" onclick="showData(' + valueS[6] + ',' + valueS[7] + ',4);">' + valueS[3] + '</span> <br>';
    tStr += '线下订单：<span style="color:blue;font-size:14px;" onclick="showData(' + valueS[6] + ',' + valueS[7] + ',5);">' + valueS[4] + '</span> <br>';
    tStr += '订单总数：<span style="font-size:14px;">' + valueS[5] + '</span> ';
    tStr += '</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '<td style="width:120px;" align="center">0</td>';
    tStr += '</tr>';
    tStr += '</tbody></table>';
    tStr += '</td>';
    tStr += '</tr>';

    tStr += '<tr style="background-color:#FFB5B5;color:#fff;font-size:12px;">';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="70px"><div align="center">总审状态</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="5%"><div align="center">国家</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="12%"><div align="center">订单编号</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" ><div align="center">客户姓名</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="8%"><div align="center">订单状态</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="10%"><div align="center">出签时间</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="10%"><div align="center">创建时间</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="8%" ><div align="center">创建人</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="8%" ><div align="center">接单人</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="8%" ><div align="center">行程人</div></td>';
    tStr += '<td height="30" bgcolor="#FF8E8E" width="8%" ><div align="center">利润</div></td>';
    tStr += '</tr>';

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="50" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';
        tStr += '<td style="' + order[10] + '">' + order[5] + '</td>';
        tStr += '<td></td>';
        tStr += '<td><a href="/Order/AddPaymentShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:blue;font-size:14px;" id="lsh_' + order[1] + '">' + order[2] + '</a></td>';
        tStr += '<td></td>';
        tStr += '<td>' + order[3] + '</td>';
        tStr += '<td>' + order[4] + '</td>';
        tStr += '<td>' + order[6] + '</td>';
        tStr += '<td>' + order[8] + '</td>';
        tStr += '<td>' + order[11] + '</td>';
        tStr += '<td>' + order[12] + '</td>';
        tStr += '<td>' + order[13] + '</td>';
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
function BindIniAccData(CodeId, Year, Month, RoleId, Count) {
    if (CodeId == 0 && Year == 0 && Month == 0 && RoleId == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定角色
    //BindRole();

    //绑定年份
    showYear();

    //绑定月份
    BindMonth();

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
    var str = '<dt>出签年份：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
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

//自动生成年份
function BindMonth() {
    var str = '<dt>出签月份：</dt><dd class="select-all selected">';
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


function showData(startTime,endTime,orderAuditState) {
    if (startTime == '') {
        asyncbox.tips('数据列表', 'alert');
        return;
    }

    var winUrl = '/AuditAccounting/showDataList?startTime=' + startTime + '&endTime=' + endTime + '&orderAuditState=' + orderAuditState + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '数据列表',
        url: winUrl,
        width: 620,
        height: 580
    });
}