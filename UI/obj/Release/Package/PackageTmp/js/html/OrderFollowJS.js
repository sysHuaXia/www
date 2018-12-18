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
    chfkk(1);
}

//读取旗帜内容
function opQiZhi(oid) {
    if (oid == '') {
        asyncbox.tips('旗帜备注', 'alert');
        return;
    }

    var winUrl = '/Order/AddQiZhiShow?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '旗帜备注(初始值是同步天猫数据)',
        url: winUrl,
        width: 600,
        height: 420
    });
}

//记录收款内容
function opPayment(oid) {
    if (oid == '') {
        asyncbox.tips('收付款项的信息', 'alert');
        return;
    }

    var winUrl = '/Order/AddPaymentShow?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '收付情况',
        url: winUrl,
        width: 800,
        height: 700
    });
}

//订单关联信息
function opAssociated(oid) {
    if (oid == '') {
        asyncbox.tips('加急服务，公证认证，代取护照，材料审核，机票酒店预订单，代填表格，翻译证件，EVUS信息登记', 'alert');
        return;
    }

    var winUrl = '/QuickQuery/opAssociatedShow?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '1.加急服务 2.公证认证 3.代取护照 4.材料审核 5.机票酒店预订单 6.代填表格 7.翻译证件 8.EVUS信息登记',
        url: winUrl,
        width: 800,
        height: 600
    });
}

//订单认领
function opOrderClaim(oid) {
    if (oid == '') {
        asyncbox.tips('订单认领', 'alert');
        return;
    }

    var winUrl = '/QuickQuery/opOrderClaimShow?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '订单认领（依据是接单人为空）',
        url: winUrl,
        width: 800,
        height: 550
    });
}

//拆分订单opSplitOrder
function opSplitOrder(oid) {
    if (oid == '') {
        asyncbox.tips('订单拆分界面', 'alert');
        return;
    }

    var winUrl = '/QuickQuery/opSplitOrderShow?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '天猫订单手动拆分',
        url: winUrl,
        width: 800,
        height: 600
    });
}

//行程管理
function opOrderTrip(oid) {
    if (oid == '') {
        asyncbox.tips('行程管理', 'alert');
        return;
    }

    var winUrl = '/QuickQuery/OrderTripInfo?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '订单上传管理',
        url: winUrl,
        width: 900,
        height: 600
    });
}

//修改订单页面
function opUpdateOrder(oid) {
    if (oid == '') {
        asyncbox.tips('旗帜备注', 'alert');
        return;
    }
    var winUrl = '/Order/UpdateOrderShow?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '订单详细页',
        url: winUrl,
        width: 980,
        height: 600
    });
}

//删除方法
function del(obj, id) {
    Seach(0, id);
    $(obj).remove();
    $("#select" + id + " .select-all").addClass("selected").siblings().removeClass("selected");
    if (id == 4) {
        $("#select4 dd").addClass("selected").siblings().removeClass("selected");
    }
    //if (id == 26) {
    //    $("#select5").empty();
    //}
    if ($(".select-result dd").length > 1) {
        $(".select-no").hide();
    } else {
        $(".select-no").show();
    }
}

//读取搜索信息
function Seach(Val, TID) {
    if (TID == 1) {
        $("#OSatet").val(Val);
        $("#select8").empty();
        $("#select9").empty();
        $("#select7").empty();
        BindSendTime(Val);
        BindOperation(Val);
        BindJDR(Val);
    } else if (TID == 2) {
        $("#OCountry").val(Val);//绑定国家
    } else if (TID == 8) {
        $("#SendSignTime").val(Val);//绑定材料分配时间
    } else if (TID == 9) {
        $("#XCtijiaoren").val(Val);//绑定材料接收者
    } else if (TID == 7) {
        $("#getJDR").val(Val);//绑定接单人员
    } else if (TID == 3) {
        $("#ScreeningNo").val(Val);//
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#SendSignTime").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chfkk();
}

function chfkk(TDID) {
    $.ajax({
        type: "POST",
        url: "/OrderFollow/OrderFollowAjax",
        data: $("#form1").serialize(),
        success: function (sesponseTest) {
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
    Tpaging(valueS[1], 10);
    var orders = valueS[0].split('&|');
    var count = valueS[1]; //获取数据条数
    var tStr = '';
    $("#t tbody").html("");

    if (count == 0) {
        tStr += '<tr>';
        tStr += '<td style="text-align:center;" colspan="9"><span style="color:#ccc;font-size:28px;">抱歉，没有找到相关的订单！</span></td>';
        tStr += '</tr>';
    }

    for (var i = 0; i < orders.length - 1; i++) {
        var orderList = orders[i].split('&{');
        var orderWWHaoList = orders[i].split('&#{');
        var order = orderList[0].split('&,');

        tStr += '<tr style="font-size:13px;">';
        tStr += '<td style="' + order[50] + '">'
        if (order[8] == "退单") {
            tStr += '<span onclick="opShowQuetion(' + order[1] + ')" style="background-color:red; color:#fff;">' + order[55] + '</span>&nbsp;<span><a href="/Order/UpdateOrderShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#ccc;font-size:13px;" id="lsh_' + order[1] + '">订单号: ' + order[3] + '&nbsp;&nbsp;成交时间: ' + order[15] + '&nbsp;</a>&nbsp;&nbsp;<span onclick="jsCopyNum(' + order[1] + '2)" style="padding-top:3px;color:#ccc;font-size:12px;">签证编号: ' + order[19] + '</span></span><table cellpadding="0" cellspacing="0" border="0" width="100%">';
        } else {
            tStr += '<span onclick="opShowQuetion(' + order[1] + ')" style="background-color:red; color:#fff;">' + order[55] + '</span>&nbsp;<span><a href="/Order/UpdateOrderShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;font-size:13px;" id="lsh_' + order[1] + '">订单号: ' + order[3] + '&nbsp;&nbsp;成交时间: ' + order[15] + '&nbsp;</a>&nbsp;&nbsp;<span onclick="jsCopyNum(' + order[1] + '2)" style="padding-top:3px;color:#6993E9;font-size:12px;">签证编号</span>: ' + order[19] + '</span><table cellpadding="0" cellspacing="0" border="0" width="100%">';
        }
        tStr += '<tr><td rowspan="3" width="66px;"><div align="center" style="padding:5px 1px 4px 1px"><img src="/images/countryImg/' + order[4] + '.jpg"></div></td><td><span id="lsh_' + order[1] + '" style="color:#000000">' + order[48] + '客户名称: ' + order[0] + '&nbsp;' + order[16] + '</span></td></tr>';
        tStr += '<tr><td><span class="fontColor">签证套餐: ' + order[2] + '领区&nbsp;<span style="border-bottom: dashed 1.5px #A2BEF8;">' + order[4] + '' + order[21] + '</span>&nbsp;<span style="border-bottom: dashed 1.0px #fbe592;color:green;">' + order[6] + '</span>' + '' + order[53] + '';
        tStr += '</span></td></tr>';
        tStr += '<tr><td><span class="fontColor">审核时间: ' + order[27] + '&nbsp;&nbsp;审核人: ' + order[26] + '</span></td></tr>';
        if (order[37] != 0) {
            tStr += '</table><span id="lsh_' + order[1] + '" class="fontColor"><div style="color:#A5A3A3;">备注：' + order[20] + '</div>关联订单:<span style="font-size:16px; color:#FF0000">' + order[37] + '</span>条</span></td>';
        } else {
            tStr += '</table><span id="lsh_' + order[1] + '" class="fontColor"><div style="color:#A5A3A3;">备注：' + order[20] + '</div></span></td>';
        }
        if (order[9].length != 0) {
            tStr += '<td style="text-align:center;"><input name="' + order[1] + '3" value="' + order[9] + '" type="text" id="' + order[1] + '3" style="width:100px;BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none;TEXT-ALIGN: center;" /><br><span onclick="jsCopyEmail(' + order[1] + '3)" style="padding-top:3px;">复制</span><br/>' + order[45] + '</td>';
        } else {
            tStr += '<td style="text-align:center;"><input name="' + order[1] + '3" value="' + order[9] + '" type="text" id="' + order[1] + '3" style="width:100px;BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none;TEXT-ALIGN: center;" /><br><span onclick="jsCopyEmail(' + order[1] + '3)" style="padding-top:3px;color:#DADADA">---</span><br/>' + order[45] + '</td>';
        }
        if (order[33] == 0) {
            tStr += '<td style="text-align:center;"><span style="color:#DADADA">--/--<br/>--/--</span></td>';
        } else {
            tStr += '<td style="text-align:center;"><span >' + formatDate(order[25], "MM/dd") + '<br/>' + formatDate(order[31], "MM/dd") + '<br/>' + order[33] + '天</span></td>';
        }
        if (order[38] != 0) {
            tStr += '<td style="text-align:center;"><span id="gys_' + order[1] + '">' + order[5] + '</span><br/><span onclick="opQiZhi(' + order[1] + ');"><img src="/images/qizhi/' + order[18] + '.png" ></span><br/><span onclick="opOrderTrip(' + order[1] + ');" style="color: #0024ff;">行程</span><br/><span>' + order[36] + '</span></td>';
        } else {
            tStr += '<td style="text-align:center;"><span id="gys_' + order[1] + '">' + order[5] + '</span><br/><span onclick="opQiZhi(' + order[1] + ');"><img src="/images/qizhi/' + order[18] + '.png" ></span><br/><span onclick="opOrderTrip(' + order[1] + ');" style="color: #999999;">无行程</span><br/><span>' + order[36] + '</span></td>';
        }
        tStr += '<td style="text-align:center;"><span id="rs_' + order[1] + '" class="fontColor"><input name="' + order[1] + '" value="' + order[7] + '" type="text" id="' + order[1] + '" style="width:100px;BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none;TEXT-ALIGN: center;" /><br><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[7] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[7] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[7] + '" /></a></span><br><span onclick="jsCopy(' + order[1] + ')" style="padding-top:3px;">复制</span></td>';

        if (order[8] == "审核中") {
            tStr += '<td style="text-align:center;"><span style="color:#0033FF" class="fontColor">' + order[40] + '' + order[54] + '</span><br/>';
            if (order[32].length != 0) {
                tStr += '<span>' + formatDate(order[32], "MM/dd") + '</span><br/>';
            }
            tStr += '<span id="rs_' + order[1] + '">' + order[8] + '<br/>' + order[34] + '个工作日</span></td>';
        }
        else if (order[8] == "待取" || order[8] == "出签") {
            tStr += '<td style="text-align:center;"><span style="color:#0033FF" class="fontColor">' + order[40] + '' + order[54] + '</span><br/>';
            if (order[32].length != 0) {
                tStr += '<span>' + formatDate(order[32], "MM/dd") + '</span><br/>';
            }
            tStr += '<span id="rs_' + order[1] + '">' + order[8] + '<br/>' + order[35] + '个工作日</span></td>';
        }
        else {
            tStr += '<td style="text-align:center;"><span style="color:#0033FF" class="fontColor">' + order[40] + '' + order[54] + '</span><br/>';
            if (order[32].length != 0) {
                tStr += '<span>' + formatDate(order[32], "MM/dd") + '</span><br/>';
            }
            tStr += '<span id="rs_' + order[1] + '">' + order[8] + '</span></td>';
        }

        if (order[22].length != 0) {
            tStr += '<td style="text-align:center;"><span id="s ' + order[14] + '">' + formatDate(order[22], "MM/dd") + '&nbsp;' + order[23] + ':' + order[24] + '</span></td>';
        } else {
            tStr += '<td style="text-align:center;"><span style="color:#DADADA">--/--</span></td>';
        }

        tStr += '<td id="OCustomType_' + order[1] + '">';
        tStr += '<div style="text-align:center;">' + order[11] + '</div>';
        tStr += '</td>';


        tStr += '<td >';
        tStr += '<div style="text-align:center;"><span style="color:blue;">' + order[57] + '</span><br/>' + order[58] + '工作日<br/>' + order[56] + '</div>';
        tStr += '</td>';


        tStr += '<td class="text-right" style="text-align:center;" >';
        tStr += '<a href="/Order/AddPaymentShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" id="lsh_' + order[1] + '" >' + order[46] + '<br/>' + order[47] + '</a>';

        if (order[5] >= 2 && order[51] != 1) {
            tStr += '<br/><span onclick="opSplitOrder(' + order[1] + ');" class="fontColor">拆分订单</span>';
        }

        if (order[44] == 1) {
            tStr += '<br/><span onclick="opAssociated(' + order[1] + ');" class="fontColor">关联订单</span>';
        }

        if (order[43] == 1) {
            tStr += '<br/><span onclick="opOrderClaim(' + order[1] + ');" style="background-color: #6993E9; color:#fff;">认领订单</span>';
        }

        tStr += '</td>';


        tStr += '<td data-hide="all"></td></tr>';

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
function BindFollowData(OSatet, ScreeningNo, SendSignTime, XCtijiaoren, OCountry, getJDR, Count) {
    if (OSatet == 0 && ScreeningNo == 0 && SendSignTime == 0 && XCtijiaoren == 0 && OCountry == 0 && getJDR == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定送签地区
    //BindArea();

    //绑定材料分配时间
    BindSendTime();

    //绑定材料接收者
    BindOperation();

    //绑定接单人员
    BindJDR();

    //绑定国家
    BindCountry();

    //绑定年份
    //showYear();
    BindScreeningNo();

    Tpaging(Count, 8);

    chfkk();
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

//绑定送签地区 
//function BindArea() {
//    $.ajax({
//        type: "GET",
//        url: "/QuickQuery/GetAreaList",
//        //data: "SupplierID=" + SupplierID,
//        success: function (sesponseTest) {
//            if (sesponseTest != "0") {
//                var strAry = sesponseTest.split(",");
//                var str = '<dt>送签地区：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,26);">全部</a></dd>';
//                var j = '';
//                $.each(strAry, function (i, val) {
//                    arr = val.split('|');
//                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',26);">' + arr[1] + '</a></dd>';
//                });
//                $("#select26").append(str);

//                $("#select26 dd").click(function () {
//                    $(this).addClass("selected").siblings().removeClass("selected");
//                    if ($(this).hasClass("select-all")) {
//                        $("#selectZ").remove();
//                        $(".select-no").show();
//                    } else {
//                        var copyThisZ = $(this).clone();
//                        if ($("#selectZ").length > 0) {
//                            $("#selectZ a").html($(this).text());
//                        } else {
//                            $(".select-no").hide();
//                            copyThisZ.attr("onclick", "del(this,26);");
//                            $(".select-result dl").append(copyThisZ.attr("id", "selectZ"));
//                            $("#selectZ a").removeAttr("onclick");
//                        }
//                    }
//                });
//            }
//        }
//    });
//}


//function ShowSale1(SID) {
//    $("#select5").empty();
//    $.ajax({
//        type: "GET",
//        url: "/QuickQuery/GetAreaConsul",
//        data: "SID=" + SID,
//        success: function (sesponseTest) {
//            if (sesponseTest != "0") {
//                var str = '<dt>送签地点：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
//                var strAry = sesponseTest.split(",");
//                var j = '';
//                $.each(strAry, function (i, val) {
//                    arr = val.split('|');
//                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',5);">' + arr[1] + '</a></dd>';
//                });
//                $("#select5").append(str);

//                $("#select5 dd").click(function () {
//                    $(this).addClass("selected").siblings().removeClass("selected");
//                    if ($(this).hasClass("select-all")) {
//                        $("#selectE").remove();
//                        $(".select-no").show();
//                    } else {
//                        var copyThisE = $(this).clone();
//                        if ($("#selectE").length > 0) {
//                            $("#selectE a").html($(this).text());
//                        } else {
//                            $(".select-no").hide();
//                            copyThisE.attr("onclick", "del(this,5);");
//                            $(".select-result dl").append(copyThisE.attr("id", "selectE"));
//                            $("#selectE a").removeAttr("onclick");
//                        }
//                    }
//                });
//            }
//        }
//    });
//}



//绑定材料分配时间
function BindSendTime(SID) {
    $("#select8").empty();
    $.ajax({
        type: "GET",
        url: "/OrderFollow/GetAllocateTime",
        data: "SID=" + SID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>材料分配：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,8);">全部</a></dd>';
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',8);">' + arr[1] + '</a></dd>';
                });
                $("#select8").append(str);

                $("#select8 dd").click(function () {
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
                            copyThisD.attr("onclick", "del(this,8);");
                            $(".select-result dl").append(copyThisD.attr("id", "selectD"));
                            $("#selectD a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

//绑定材料接收者
function BindOperation(SID) {
    $("#select9").empty();
    $.ajax({
        type: "GET",
        url: "/OrderFollow/GetRecipienter",
        data: "SID=" + SID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>材料接收：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,9);">全部</a></dd>';
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

//绑定接单人员
function BindJDR(SID) {
    $("#select7").empty();
    $.ajax({
        type: "GET",
        url: "/OrderFollow/GetUserJDR",
        data: "SID=" + SID,
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

//绑定送签领馆中心的名称



//自动生成年份
function BindScreeningNo() {
    //var nowYear = new Date().getFullYear();
    //var year1 = nowYear - 1;
    var jl = '';
    var str = '<dt>过虑筛选：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
    //str += '<dd><a href="javascript:void(0);" onclick="Seach(' + nowYear + ',3);">' + nowYear + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(1,3);">跳过缺材料到待送</a></dd>';
    //str += '<dd><a href="javascript:void(0);" onclick="Seach(3,3);">缺材料状态(原始订单)</a></dd>';
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


function jsCopy(wwhao) {
    var e = document.getElementById("" + wwhao + "");//对象是content 
    e.select(); //选择对象 
    document.execCommand("Copy"); //执行浏览器复制命令
    //alert("已复制好，可贴粘。");
}

function jsCopyNum(number) {
    var e = document.getElementById("" + number + "");//对象是content 
    e.select(); //选择对象 
    document.execCommand("Copy"); //执行浏览器复制命令
    //alert("已复制好，可贴粘。");
}

function jsCopyEmail(Email) {
    var e = document.getElementById("" + Email + "");//对象是content 
    e.select(); //选择对象 
    document.execCommand("Copy"); //执行浏览器复制命令
    //alert("已复制好，可贴粘。");
}

////疑问说明
//function questionShow() {
//    var winUrl = '/Order/questionShow?version=' + (new Date()).getTime();
//    asyncbox.open({
//        id: '123',
//        title: '综合搜索条件说明',
//        url: winUrl,
//        width: 600,
//        height: 720
//    });
//}


//售后(新)
//function chkAfterSales(oid, followType) {
//    if (oid == '') {
//        asyncbox.tips('售后', 'alert');
//        return;
//    }
//    var winUrl = '/QuickQuery/ShowOrderSales?oid=' + oid + '&followType=' + followType + "&version=" + (new Date()).getTime();
//    asyncbox.open({
//        id: '123',
//        title: '【售后】记录信息',
//        url: winUrl,
//        width: 700,
//        height: 480
//    });
//}


function opShowQuetion(SID) {
    if (SID == '') {
        asyncbox.tips('问题描述', 'alert');
        return;
    }
    var winUrl = '/Order/ShowQuetion?SID=' + SID + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '问题描述',
        url: winUrl,
        width: 500,
        height: 400
    });
}



//新增资料（材料不齐全 或 材料齐全）
function ShowMaterial(oid) {
    if (oid == '') {
        asyncbox.tips('新增资料', 'alert');
        return;
    }
    var winUrl = '/QuickQuery/ShowMaterial?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '【新增】材料不齐全的内容',
        url: winUrl,
        width: 700,
        height: 480
    });
}