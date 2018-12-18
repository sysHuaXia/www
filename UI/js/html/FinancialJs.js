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
        url: "/Financial/IndexAjax",
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
    paging(valueS[1], 9);
    var orders = valueS[0].split('&|');
    var tStr = '';

    $("#t tbody").html("");

    tStr += '<tr style="background-color:#FFB5B5;color:#fff;font-size:12px;">';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="3%"><div align="center">ID</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="16%"><div align="center">客户信息</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="4%"><div align="center">人数</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%" ><div align="center">旺旺号</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%"><div align="center">接单人</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="10%"><div align="center">收/付情况</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E"><div align="center">备注</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="12%"><div align="center">创建人信息</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="4%"><div align="center">操作</div></td>';
    tStr += '</tr>';

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';

        tStr += '<td>' + h + '</td>';
        tStr += '<td align="left">客户名:<a href="/Order/UpdateOrderShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;font-size:13px;" id="lsh_' + order[1] + '">' + order[2] + '</a><br/>电话:' + order[3] + '<br/>订单编号:' + order[1] + '<br/>' + order[9] + '' + order[10] + '</td>';
        tStr += '<td>' + order[6] + '</td>';
        tStr += '<td>' + order[4] + '<br><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[4] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[4] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[4] + '" /></a></td>';
        tStr += '<td>' + order[5] + '</td>';
        tStr += '<td align="center">应收:' + order[7] + '<br/>应付:' + order[8] + '</td>';
        tStr += '<td align="left">' + order[11] + '<br/>' + order[12] + '</td>';
        
        if (order[18] == 1) {
            tStr += '<td align="left" style="color:#333">创建人:' + order[16] + '<br/>创建时间:' + order[17] + '<br/><span style="color:green;">审核人:' + order[19] + '<br/>审核时间:' + order[20] + '</span></td>';
            tStr += '<td><a href="/Order/AddPaymentShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" id="lsh_' + order[1] + '" style="color:green">已审</a></td>';
        } else {
            tStr += '<td align="left" style="color:#333">创建人:' + order[16] + '<br/>创建时间:' + order[17] + '</td>';
            tStr += '<td><a href="/Order/AddPaymentShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" id="lsh_' + order[1] + '" style="color:blue">审核</a></td>';
        }
        

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
function BindIniAuditData(AuditRecordsUser, Year, Month, ALevelId, PayType, Count) {
    var nowYear = new Date().getFullYear();
    var date = new Date;
    var month = date.getMonth() + 1;
    if (AuditRecordsUser == 0 && Year == nowYear && Month == month && ALevelId == 0 && PayType == 2) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //alert(nowYear);
    //alert(month);
    //绑定操作人员
    BindOperation();

    //绑定年份
    showYear();

    //绑定月份
    BindMonth();

    paging(Count, 9);

    chkk();
}

//绑定关联人员
function BindOperation() {
    $.ajax({
        type: "GET",
        url: "/Financial/GetOrderAuditUserName",
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
    var str = '<dt>创建年份：</dt><dd><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year3 + ',3);">' + year3 + '年</a></dd>';
    str += '<dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(' + nowYear + ',3);">' + nowYear + '年</a></dd>';
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
    var date = new Date;
    var month = date.getMonth() + 1;
    var str = '<dt>创建月份：</dt><dd>';
    str += '<a href="javascript:void(0);" onclick="Seach(0,4);">全部</a></dd>';
    for (var i = 1; i <= 12 ; i++) {
        if(i==month){
            str += '<dd class="select-all selected">';
        }else{
            str += '<dd>';
        }
        str += '<a href="javascript:void(0);" onclick="Seach(' + i + ',4);">' + i + '月</a></dd>';
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

//修改审核记录
function UpdateAuditRecords(oid) {
    if (oid == '') {
        asyncbox.tips('查看审核记录内容', 'alert');
        return;
    }

    var winUrl = '/QuickQuery/UpdateAuditRecords?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '【查看】送材料前进行审核记录信息',
        url: winUrl,
        width: 700,
        height: 480
    });
}


