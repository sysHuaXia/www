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
    chk(1);
}

//删除方法
function del(obj, id) {
    Seach(0, id);
    $(obj).remove();
    $("#select" + id + " .select-all").addClass("selected").siblings().removeClass("selected");
    if (id == 6) {
        $("#select7 dd").addClass("selected").siblings().removeClass("selected");
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
    if (TID == 1) {
        $("#Enable").val(Val);
    } else if (TID == 9) {
        $("#MArea").val(Val);
    } else if (TID == 2) {
        $("#pState").val(Val);
    } else if (TID == 3) {
        $("#V_jdrid").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#OCountry").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chk();
}

function chk(TDID) {
    $.ajax({
        type: "POST",
        url: "/Invoice/PagesAjax",
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
    paging(valueS[1], 10);
    var orders = valueS[0].split('&|');
    var tStr = '';
    $("#t tbody").html("");
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');

        var w = 0;
        w = i + 1;
        tStr += '<tr  onclick = "bgChange(this)">';
        tStr += '<td style="text-align:center;">' + order[16] + '<a href="/Order/UpdateOrderShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;" >' + w + '</a></span></td>';
        tStr += '<td style="text-align:center;">' + formatDate(order[3], "yyyy-MM-dd") + '</span><br/>' + order[18] + '</td>';

        if (order[15].length != 0) {
            tStr += '<td style="text-align:left;"><a href="/Order/UpdateOrderShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;" >' + order[6] + '</a><br/>税号' + order[15] + '</span></td>';
        } else {
            tStr += '<td style="text-align:left;"><a href="/Order/UpdateOrderShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;" >' + order[6] + '</a></span></td>';
        }
        tStr += '<td style="text-align:center;">' + order[8] + '</span></td>';
        tStr += '<td style="text-align:center;">' + order[7] + '</span></td>';
        tStr += '<td style="text-align:center;">' + order[9] + '</span></td>';
        tStr += '<td style="text-align:left;">' + order[1] + '' + order[12] + '<br/>' + order[11] + '</span></td>';
        tStr += '<td style="text-align:center;">' + order[2] + '<br/><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[2] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[2] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[2] + '" /></a></span></td>';
        tStr += '<td style="text-align:left;">开票人:' + order[19] + '<br/>登记人:' + order[14] + '<br/>登记时间:' + order[10] + '</span></td>';
        tStr += '<td style="text-align:center;"><span onclick="opFaPiao(' + order[0] + ');" style="color:#6993E9;">修改</span><br/><span onclick="AddInvoice(' + order[0] + ')">' + order[17] + '</span></td>';
        tStr += '</tr>';

        //绑定补开发票信息
        if (orderList[1] != "") {
            tStr += '<tr>';
            tStr += '<td colspan=10>';
            tStr += '<table style="border:1px solid #CCC" width="1000px">';
            tStr += '<tr height="25" style="background:#E3E3E3;">';
            tStr += '<td align="center" width="3%" style="border:1px solid #FFF;font-size:12px;">ID</td>';
            tStr += '<td align="center" width="10%" style="border:1px solid #FFF;font-size:12px;">类型</td>';
            tStr += '<td align="center" width="15%" style="border:1px solid #FFF;font-size:12px;">发票号</td>';
            tStr += '<td align="center" style="border:1px solid #FFF;font-size:12px;" >抬头/税号</td>';
            tStr += '<td align="center" width="6%" style="border:1px solid #FFF;font-size:12px;">内容</td>';
            tStr += '<td align="center" width="6%" style="border:1px solid #FFF;font-size:12px;">金额</td>';
            tStr += '<td align="center" width="7%" style="border:1px solid #FFF;font-size:12px;">登记人</td>';
            tStr += '<td align="center" width="10%" style="border:1px solid #FFF;font-size:12px;">登记时间</td>';
            tStr += '<td align="center" width="4%" style="border:1px solid #FFF;font-size:12px;">操作</td>';
            tStr += '</tr>';
            var fillTicket = orderList[1].split('&}');
            for (var j = 0; j < fillTicket.length - 1 ; j++) {
                var Ticket = fillTicket[j].split('&,');
                var h = j + 1;

                tStr += '<tr height="50" style="background:#F1F1F1;" >';
                tStr += '<td align="center" style="border:1px solid #FFF;">' + h + '</td>';
                tStr += '<td align="center" style="border:1px solid #FFF;">' + Ticket[11] + '<span onclick="opFaPiaoFill(' + Ticket[0] + ',' + Ticket[1] + ');" style="color:#6993E9;">' + Ticket[2] + '</span></td>';
                tStr += '<td align="center" style="border:1px solid #FFF;">' + Ticket[3] + '</td>';
                tStr += '<td align="left" style="border:1px solid #FFF;padding:3px;">&nbsp;' + Ticket[4] + '<br>&nbsp;' + Ticket[7] + '</td>';
                tStr += '<td align="center" style="border:1px solid #FFF;">' + Ticket[5] + '</td>';
                tStr += '<td align="center" style="border:1px solid #FFF;">' + toDecimal(Ticket[6]) + '</td>';
                tStr += '<td align="center" style="border:1px solid #FFF;">' + Ticket[9] + '</td>';
                tStr += '<td align="center" style="border:1px solid #FFF;">' + formatDate(Ticket[10], "yyyy-MM-dd") + '</td>';
                tStr += '<td align="center" style="border:1px solid #FFF;"><span onclick="opFaPiaoFill(' + Ticket[0] + ',' + Ticket[1] + ');" style="color:#6993E9;">编辑</span></td>';
                tStr += '</tr>';
            }
            tStr += '</table>';
            tStr += '</td>';
            tStr += '</tr>';
        }
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
function BindFPData(Enable, MArea, pState, V_jdrid, Count) {
    if (Enable == 0 || MArea == 0 || pState == 0 || V_jdrid==0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //绑定送签地区
    BindArea();
    //绑定分页
    paging(Count, 8);
    //接单人
    BindJDR();

    //默认加载
    chk();
}

//绑定送签地区
function BindArea() {
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetAreaList",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>送签地区：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,9);">全部</a></dd>';
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

//绑接单人
function BindJDR() {
    $.ajax({
        type: "GET",
        url: "/Invoice/GetUserJDR",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>接单人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',3);">' + arr[1] + '</a></dd>';
                });
                $("#select3").append(str);

                $("#select3 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectW").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisF = $(this).clone();
                        if ($("#selectW").length > 0) {
                            $("#selectW a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisF.attr("onclick", "del(this,3);");
                            $(".select-result dl").append(copyThisF.attr("id", "selectW"));
                            $("#selectW a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

//更新发票内容
function opFaPiao(oid) {
    if (oid == '') {
        asyncbox.tips('更新发票内容', 'alert');
        return;
    }

    var winUrl = '/Invoice/UpdateInvoice?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '更新发票内容',
        url: winUrl,
        width: 600,
        height: 420
    });
}

//更新补开发票内容
function opFaPiaoFill(pid,oid) {
    if (oid == '') {
        asyncbox.tips('更新补开发票内容', 'alert');
        return;
    }

    var winUrl = '/Invoice/UpdateInvoiceFill?pid=' + pid + '&oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '更新补开发票内容',
        url: winUrl,
        width: 600,
        height: 420
    });
}

function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}

function AddInvoice(oid) {
    if (oid == '') {
        asyncbox.tips('补开发票', 'alert');
        return;
    }

    var winUrl = '/QuickQuery/AddInvoice?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '【新增】补开发票',
        url: winUrl,
        width: 700,
        height: 480
    });
}