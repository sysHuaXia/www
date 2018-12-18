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





//生成结算
function settlement(OrderId) {
    $.ajax({
        type: "GET",
        url: "/AccountantCustom/Settlement",
        data: "OrderID=" + OrderId,
        success: function (sesponseTest) {
            if (sesponseTest == "0") {
                swal("操作失败...", "生成结算失败！", "error");
            } else {
                swal({
                    title: "操作成功...",
                    text: "生成结算成功！",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                }, function () {
                    $("#OCustomType_" + OrderId).html("<span style=\"color:green;\">已完成</span><br><span style=\"color:green;\">已结算</span>");
                });
            }
        }
    });
}

//预结算
function opPreSettlement(OrderId) {
    $.ajax({
        type: "GET",
        url: "/OrderCustom/PreSettlement",
        data: "OrderID=" + OrderId,
        success: function (sesponseTest) {
            if (sesponseTest == "0") {
                swal("操作失败...", "预结算失败！", "error");
            } else {
                swal({
                    title: "操作成功...",
                    text: "预结算成功！",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                }, function () {
                    $("#OCustomType_" + OrderId).html("<span style=\"color:red;\">未完成</span><br><span style=\"color:green;\">预结算</span>");
                    $("#ysh_" + OrderId).remove();
                });
            }
        }
    });
}

//读取搜索信息
function Seach(Val, TID) {



    if (TID == 99) {
        $("#Page").val(Val);
    }
    search(1);
}

function opAddCustom() {
    $.webox({
        height: 468,
        width: 978,
        top: 262,
        bgvisibel: true,
        title: '创建新订单',
        iframe: '/OrderCustom/AddOrderCustomShow'
    });
}


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



function opOrderNote(oid) {
    $.webox({
        height: 268,
        width: 378,
        top: 282,
        bgvisibel: true,
        title: '订单备注',
        iframe: '/Order/AddOrderNoteShow?oid=' + oid
    });
}


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




function opUpdateCustom(OCustomId, IType) {
    //判断订单是否已完成
    if (IType == 0) {
        $.webox({
            height: 558,
            width: 978,
            bgvisibel: true,
            title: '自定义订单信息',
            iframe: '/OrderCustom/UpdateOrder?OCustomId=' + OCustomId + '&IType=' + IType
        });
    }
    else {
        $.ajax({
            type: "GET",
            url: "/OrderCustom/getOCustomType",
            data: "OCustomId=" + OCustomId,
            success: function (sesponseTest) {
                if (sesponseTest == "3") {
                    swal({
                        title: "操作错误！",
                        text: "该订单已被审核，是否要刷新页面？",
                        type: "warning",
                        showCancelButton: true,
                        closeOnConfirm: false,
                        confirmButtonText: "是的",
                        confirmButtonColor: "#ec6c62"
                    }, function () {
                        location.reload();
                    });
                } else {
                    $.webox({
                        height: 558,
                        width: 978,
                        bgvisibel: true,
                        title: '自定义订单信息',
                        iframe: '/OrderCustom/UpdateOrder?OCustomId=' + OCustomId + '&IType=' + IType
                    });
                }
            }
        });
    }
}

function showExamine(OrderID) {
    //获取初审
    cSum = parseInt($("#cSum_" + OrderID).html());
    cSum++;
    $("#cSum_" + OrderID).html(cSum);
    $('#cDiv_' + OrderID).css('display', 'block');
}

function getOrderCash(TDID, CashAccount, OReceivable, OrderNowPay, OType, OPayable, OrderToPay) {
    $("#" + TDID + " tr:gt(0)").remove();
    $.ajax({
        type: "GET",
        url: "/OrderCustom/getOrderCashByOCustomId",
        data: "OCustomId=" + TDID + "&OReceivable=" + OReceivable + "&OrderNowPay=" + OrderNowPay + "&OPayable=" + OPayable + "&OrderToPay=" + OrderToPay,
        success: function (sesponseTest) {
            showExamine(TDID);
            if (OType == 2) {
                document.getElementById("OrderRemain " + TDID).innerHTML = '<span style="color:red;">未收清</span>';
                document.getElementById("OCustomType_" + TDID).innerHTML = '<div style="text-align:center;"><span style="color: red;">未完成</span></div>';
                document.getElementById("s " + TDID).innerHTML = "&#165;" + toDecimal(CashAccount);
            } else {
                if (OType == 3 || OType==4){
                    if (OType == 3) {
                        $('#jk_' + TDID).css('display', 'inline');
                    }
                }else if (OType == 0) {
                    document.getElementById("s " + TDID).innerHTML = "&#165;" + toDecimal(CashAccount);
                    if (parseFloat(OReceivable) == parseFloat(OrderNowPay)) {
                        document.getElementById("OrderRemain " + TDID).innerHTML = '<span style="color:green;">已收清</span>';
                    } else {
                        document.getElementById("OrderRemain " + TDID).innerHTML = '<span style="color:red;">未收清</span>';
                    }
                }
                else {
                    document.getElementById("f " + TDID).innerHTML = "&#165;" + toDecimal(CashAccount);
                    if (parseFloat(OPayable) == parseFloat(OrderToPay)) {
                        document.getElementById("OPayable " + TDID).innerHTML = '<span style="color:green;">已付清</span>';
                    } else {
                        document.getElementById("OPayable " + TDID).innerHTML = '<span style="color:red;">未付清</span>';
                    }
                }

                document.getElementById('stnOpen1 ' + TDID).onclick = function () {
                    opCashEdit(TDID, 0, OReceivable, OrderNowPay, OPayable, OrderToPay, 0);
                };
                document.getElementById('stnOpen2 ' + TDID).onclick = function () {
                    opCashEdit(TDID, 0, OReceivable, OrderNowPay, OPayable, OrderToPay, 1);
                };
                document.getElementById('stnOpen3 ' + TDID).onclick = function () {
                    opCashEdit(TDID, 0, OReceivable, OrderNowPay, OPayable, OrderToPay, 2);
                };

            }
            //sesponseTest = '<tr><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td><td>1</td></tr>';
            $("#" + TDID + " tbody").html(sesponseTest);
        }
    });
}

function opChannel() {
    $.webox({
        height: 500,
        width: 500,
        bgvisibel: true,
        title: '标签管理',
        iframe: '/Channel/Index'
    });
}

function opLogs(OCustomID) {
    $.webox({
        height: 500,
        width: 500,
        bgvisibel: true,
        title: '日志查询',
        iframe: '/OperationLog/ShowGetLogQuery?OCustomID=' + OCustomID
    });
}

function opComment(OCustomID) {
    $.webox({
        height: 300,
        width: 600,
        bgvisibel: true,
        title: '点评',
        iframe: '/Satisfaction/AddSatisfactionShow?OCustomID=' + OCustomID
    });
}

//打开借款还款
function opBorrow(OrderID, CashID, OReceivable, OrderNowPay, OPayable, OrderToPay,AType) {
    //判断订单是否已完成
    $.ajax({
        type: "GET",
        url: "/OrderCustom/getCashType",
        data: "CashID=" + CashID,
        success: function (sesponseTest) {
            if (sesponseTest == "1") {
                swal({
                    title: "操作错误！",
                    text: "该信息已被审核，是否要刷新页面？",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "是的",
                    confirmButtonColor: "#ec6c62"
                }, function () {
                    location.reload();
                });
            } else {
                $.webox({
                    height: 500,
                    width: 530,
                    bgvisibel: true,
                    title: '借/还款信息',
                    iframe: '/OrderCash/OrderBorrow?OrderID=' + OrderID + '&CashID=' + CashID + '&OReceivable=' + OReceivable + '&OrderNowPay=' + OrderNowPay + "&OPayable=" + OPayable + "&OrderToPay=" + OrderToPay + "&AType=" + AType
                });
            }
        }
    });
}

function opCashEdit(OrderID, CashID, OReceivable, OrderNowPay, OPayable, OrderToPay,AType) {
    //判断订单是否已完成
    $.ajax({
        type: "GET",
        url: "/OrderCustom/getCashType",
        data: "CashID=" + CashID,
        success: function (sesponseTest) {
            if (sesponseTest == "1") {
                swal({
                    title: "操作错误！",
                    text: "该信息已被审核，是否要刷新页面？",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "是的",
                    confirmButtonColor: "#ec6c62"
                }, function () {
                    location.reload();
                });
            } else {
                $.webox({
                    height: 560,
                    width: 530,
                    bgvisibel: true,
                    title: '收/退/付款信息',
                    iframe: '/OrderCash/OrderPay?OrderID=' + OrderID + '&CashID=' + CashID + '&OReceivable=' + OReceivable + '&OrderNowPay=' + OrderNowPay + "&OPayable=" + OPayable + "&OrderToPay=" + OrderToPay + "&AType=" + AType
                });
            }
        }
    });
}

function opBill(CashID, BType, OrderId) {
    $.webox({
        height: 558,
        width: 978,
        bgvisibel: true,
        title: '查看凭证',
        iframe: '/Bill/ShowBills?CashID=' + CashID + '&BType=' + BType + '&OrderId=' + OrderId
    });
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

function deleteOrder(TDID) {
    //判断订单是否已完成
    $.ajax({
        type: "GET",
        url: "/OrderCustom/getOCustomType",
        data: "OCustomId=" + TDID,
        success: function (sesponseTest) {
            if (sesponseTest == "3") {
                swal({
                    title: "操作错误！",
                    text: "该订单已被审核，是否要刷新页面？",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "是的",
                    confirmButtonColor: "#ec6c62"
                }, function () {
                    location.reload();
                });
            } else {
                swal({
                    title: "您确定要作废吗？",
                    text: "您确定要作废这条数据？",
                    type: "warning",
                    showCancelButton: true,
                    closeOnConfirm: false,
                    confirmButtonText: "是的",
                    confirmButtonColor: "#ec6c62"
                }, function () {
                    $.ajax({
                        type: "GET",
                        url: "/OrderCustom/DeleteOrderCustom",
                        data: "OCustomId=" + TDID,
                        success: function (sesponseTest) {
                            if (sesponseTest == "0") {
                                swal("操作失败...", "信息删除失败！", "error");
                            } else {
                                swal({
                                    title: "操作成功...",
                                    text: "信息删除成功！",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonText: "OK",
                                }, function () {
                                    window.location.href = ('ShowOrder');
                                });
                            }
                        }
                    });
                });
            }
        }
    });
}
//读取搜索信息
function Seach(Val, TID) {
    if (TID == 1) {
        $("#OSatet").val(Val);
    } else if (TID == 2) {
        $("#OCountry").val(Val);
    } else if (TID == 3) {
        $("#Year").val(Val);
    } else if (TID == 4) {
        $("#Month").val(Val);
    } else if (TID == 5) {
        $("#ClientID").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else if (TID == 8) {
        $("#IsBorrow").val(Val);
    } else if (TID == 26) {
        $("#select5").empty();
        $("#OSignUpID").val(Val);
        ShowSale1(Val);
        $("#ClientID").val(0);
    } else {
        $("#OLineID").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    search();
}

function search(TDID) {
    //var year = $("#Year").val();
    //var month = $("#Month").val();
    //if (year == 0) {
    //    if (month == 0) {
    //        $("#BeginTime").val("1900-01-01");
    //        $("#EndTime").val("1900-01-01");
    //        $("#TimeType").val(0);
    //    } else {
    //        var nowYear = new Date().getFullYear();
    //        var day = new Date(nowYear, month, 0);
    //        var daycount = day.getDate();
    //        $("#BeginTime").val(nowYear + "-" + month + "-01");
    //        $("#EndTime").val(nowYear + "-" + month + "-" + daycount);
    //        $("#TimeType").val(2);
    //    }
    //} else {
    //    if (month == 0) {
    //        $("#BeginTime").val(year + "-01-01");
    //        $("#EndTime").val(year + "-12-31");
    //        $("#TimeType").val(1);
    //    } else {
    //        var day = new Date(year, month, 0);
    //        var daycount = day.getDate();
    //        $("#BeginTime").val(year + "-" + month + "-01");
    //        $("#EndTime").val(year + "-" + month + "-" + daycount);
    //        $("#TimeType").val(3);
    //    }
    //}





    //if ($("#OProductName").val().trim() != '') {
    //    $.ajax({
    //        type: "POST",
    //        url: "/Order/ShowOrderAjax",
    //        data: $("#form1").serialize(),
    //        success: function (sesponseTest) {
    //            //alert(sesponseTest);
    //            if (sesponseTest == "") {
    //                $("#t tbody").html("");
    //            } else {
    //                BindSeachList(sesponseTest, UserType);
    //            }
    //        }
    //    });
    //}
    //else {
    //    $("#OProductName").focus();
    //    alert('请输入关键字');

    //}


}

//绑定搜索信息
function BindSeachList(str) {
    //分割字符串 &|
    var valueS = str.split('&*');
    paging(valueS[1], 8);
    var orders = valueS[0].split('&|');
    var tStr = '';
    $("#t tbody").html("");
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');

        tStr += '<tr>';
        tStr += '<td style="text-align:left;">'
        tStr += '<span><span onclick="opUpdateOrder(' + order[1] + ');"></span><a href="/Order/UpdateOrderShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;font-size:14px;" id="lsh_' + order[1] + '">订单号: ' + order[3] + '&nbsp;&nbsp;&nbsp;&nbsp;成交时间: ' + order[15] + '&nbsp;&nbsp;签证编号: ' + order[19] + '&nbsp;&nbsp;&nbsp;&nbsp;</a><span onclick="opQiZhi(' + order[1] + ');"><img src="/images/qizhi/' + order[18] + '.png" ></span></span><table cellpadding="0" cellspacing="0" border="0" width="100%">';
        tStr += '<tr><td rowspan="3" width="66px;"><div align="center" style="padding:5px 1px 4px 1px"><img src="/images/countryImg/' + order[4] + '.jpg"></div></td><td><span id="lsh_' + order[1] + '">' + order[33] + '客户名称: ' + order[0] + '&nbsp;' + order[16] + '</span></td></tr>';
        //tStr += '<tr><td><span style="color:#9e9e9e;">签证套餐: ' + order[2] + '领区' + order[4] + '' + order[21] + '';
        //tStr += '</span></td></tr>';

        tStr += '<tr><td><span class="fontColor">签证套餐: ' + order[2] + '领区&nbsp;<span style="border-bottom: dashed 1.5px #A2BEF8;">' + order[4] + '' + order[21] + '</span>&nbsp;<span style="border-bottom: dashed 1.0px #fbe592;color:green;">' + order[6] + '</span>' + '' + order[31] + '';
        tStr += '</span></td></tr>';

        tStr += '<tr><td><span style="color:#9e9e9e;">审核人: ' + order[26] + '&nbsp;&nbsp;审核时间: ' + order[27] + '</span></td></tr>';
        tStr += '</table><span style="color:#9e9e9e;" id="lsh_' + order[1] + '"><div style="width:400px;display:block;word-break: break-all;word-wrap: break-word;">备注:' + order[20] + '</div></span></td>';
        tStr += '<td style="text-align:left;"><span >' + order[9] + '</span></td>';
        tStr += '<td style="text-align:center;"><span id="gys_' + order[1] + '">' + order[5] + '</span></td>';
        tStr += '<td style="text-align:center;"><span id="rs_' + order[1] + '">' + order[7] + '<br><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[7] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[7] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[7] + '" /></a></span></td>';

        if (order[41].length == 0 && order[42].length == 0) {
            tStr += '<td style="text-align:center;"><span style="color:red;">' + order[32] + '</span><br/>' + order[8] + '<br/><span class="warnBox" style="color:green;font-size:13px;display: none;">' + order[34] + '<br/></span><span style="color:red;">' + order[43] + '</span></td>';
        } else if (order[41].length != 0 && order[42].length == 0){
            tStr += '<td style="text-align:center;"><span style="color:red;">' + order[32] + '</span><br/>' + order[8] + '<br/><span class="warnBox" style="color:green;font-size:13px;display: none;">' + order[34] + '<br/></span><span class="_warnBox" style="color:red;font-size:13px;">' + order[41] + '</span><br/><span style="color:red;">' + order[43] + '</span></td>';
        } else if (order[41].length == 0 && order[42].length != 0) {
            tStr += '<td style="text-align:center;"><span style="color:red;">' + order[32] + '</span><br/>' + order[8] + '<br/><span class="warnBox" style="color:green;font-size:13px;display: none;">' + order[34] + '<br/></span><span class="_warnBox" style="color:red;font-size:13px;">' + order[42] + '</span><br/><span style="color:red;">' + order[43] + '</span></td>';
        } else if (order[41].length != 0 && order[42].length != 0) {
            tStr += '<td style="text-align:center;"><span style="color:red;">' + order[32] + '</span><br/>' + order[8] + '<br/><span class="warnBox" style="color:green;font-size:13px;display: none;">' + order[34] + '<br/></span><span class="_warnBox" style="color:red;font-size:13px;">' + order[42] + '</span><br/><span class="_warnBox" style="color:red;font-size:13px;">' + order[41] + '</span><br/><span style="color:red;">' + order[43] + '</span></td>';
        }
        
        if (order[35] == 0) {
            tStr += '<td style="text-align:center;"><span style="color:#DADADA">--/--<br/>--/--</span></td>';
        } else {
            tStr += '<td style="text-align:center;"><span >' + formatDate(order[25], "MM/dd") + '<br/>' + formatDate(order[36], "MM/dd") + '<br/>' + order[35] + '天</span></td>';
        }

        tStr += '<td id="OCustomType_' + order[1] + '"><div style="text-align:center;">' + order[11] + '</div></td>';

        tStr += '<td class="text-right" style="text-align:center;" >';
        tStr += '<a href="/Order/AddPaymentShow?oid=' + order[1] + '&version=' + (new Date()).getTime() + '" target="_blank" id="lsh_' + order[1] + '" >' + order[37] + '<br/>' + order[38] + '</a>';
        if (order[5] >= 2 && order[39] != 1) {
            tStr += '<br/><span onclick="opSplitOrder(' + order[1] + ');" class="fontColor">拆分订单</span>';
        }
        //if (order[40] == 1) {
        //    tStr += '<br/><span onclick="opAssociated(' + order[1] + ');" class="fontColor">关联订单</span>';
        //}
        if (order[40] == 1) {
            tStr += '<br/><span onclick="opOrderClaim(' + order[1] + ');" style="background-color: #6993E9; color:#fff;">认领订单</span>';
        }
        tStr += '</td>';



        tStr += '<td data-hide="all"></td></tr>';
    }
    $("#t tbody").html(tStr);
    $('.footable').footable();
    $('.footable2').footable();
}

//修改后绑定
function ModifiedList(str) {
    var all = str.split(',');
    //修改流水号
    $("#lsh_" + all[1]).html(all[2]);
    //修改出团日期
    $("#ct_" + all[1]).html(all[3]);
    //修改回团日期
    $("#ht_" + all[1]).html(all[4]);
    //修改产品名称
    $("#cpmc_" + all[1]).html(all[5]);
    //修改供应商
    $("#gys_" + all[1]).html(all[6]);
    //修改客户名
    $("#khm_" + all[1]).html(all[7]);
    //修改出行人数
    $("#rs_" + all[1]).html(all[9]);
    //修改应收
    $("#je1_" + all[1]).html(toDecimal(all[10]));
    $("#ys_" + all[1]).html(toDecimal(all[10]));
    //修改应付
    $("#yf_" + all[1]).html(toDecimal(all[11]));
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

    //if (date == null || date == "")
    //{
    //    date = "";
    //}

}






////自动加载数据
//function BindData() {
//    //if (OSatet == 0 && OCountry == 0 && ClientID == 0 && OLineID == 0 && Year == 0 && Month == 0) {
//    //    $(".select-no").show();
//    //} else {
//    //    $(".select-no").hide();
//    //}
//    //绑定年份
//    //showYear();
//    //绑定月份
//    //BindMonth();
//    //绑定销售
//    //ShowSale(SupplierID);
//    //绑定国家
//    //BindCountry();
//    //绑定报名点
//    //ShowOSignUp(SupplierID);
//    //绑定路线
//    //BindLine();
//    //paging(Count, 8);

//    $().ready(function () {
//        $("#OProductName").keydown(function (e) {
//            var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode; //兼容IE 火狐 谷歌  
//            if (keyCode == 13) {
//                $("#span_search").trigger("click");
//                return false;
//            }
//        });
//    }) 


//    alert("123456");

//    search();
//}


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

//自动生成年份
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

//绑定报名点
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
                        $("#selectZ").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisZ = $(this).clone();
                        if ($("#selectZ").length > 0) {
                            $("#selectZ a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisZ.attr("onclick", "del(this,2);");
                            $(".select-result dl").append(copyThisZ.attr("id", "selectZ"));
                            $("#selectZ a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

//绑定销售
function ShowSale(SupplierID) {
    $.ajax({
        type: "GET",
        url: "/OrderCustom/ShowSale",
        data: "SupplierID=" + SupplierID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var str = '<dt>销售人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
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

//绑定销售
function ShowSale1(SID) {
    $("#select5").empty();
    $.ajax({
        type: "GET",
        url: "/OrderCustom/ShowSaleBySignUpID",
        data: "SID=" + SID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var str = '<dt>销售人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
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

//绑定线路
function BindLine() {
    $.ajax({
        type: "GET",
        url: "/OrderCustom/ShowLine",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var jl = '';
                //绑定国内
                var str = '<dt>国内：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,6);">全部</a></dd>';
                var strAry = sesponseTest.split("|");
                var aryA = strAry[0].split(",");
                var aryB = strAry[1].split(",");
                $.each(aryB, function (i, val) {
                    var arrBi = val.split('_');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arrBi[0] + ',6);">' + arrBi[1] + '</a></dd>';
                });
                $("#select6").append(str);
                $("#select6 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    $("#select7 dd").addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectF").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisF = $(this).clone();
                        if ($("#selectF").length > 0) {
                            $("#selectF a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisF.attr("onclick", "del(this,6);");
                            $(".select-result dl").append(copyThisF.attr("id", "selectF"));
                            $("#selectF a").removeAttr("onclick");
                        }
                    }
                });


                //绑定国外
                str = '<dt>国外：</dt>';
                $.each(aryA, function (i, val) {
                    var arrAi = val.split('_');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arrAi[0] + ',6);">' + arrAi[1] + '</a></dd>';
                });
                $("#select7").append(str);
                $("#select7 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    $("#select6 dd").addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectF").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisF = $(this).clone();
                        if ($("#selectF").length > 0) {
                            $("#selectF a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisF.attr("onclick", "del(this,6);");
                            $(".select-result dl").append(copyThisF.attr("id", "selectF"));
                            $("#selectF a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

//打开Execl页面
function opExecl() {
    var OSatet = $("#OSatet").val();
    var OCountry = $("#OCountry").val();
    var BeginTime = $("#BeginTime").val();
    var EndTime = $("#EndTime").val();
    var ClientID = $("#ClientID").val();
    var OLineID = $("#OLineID").val();
    var Year = $("#Year").val();
    var Month = $("#Month").val();
    var TimeType = $("#TimeType").val();
    var Page = $("#Page").val();
    var IsBorrow = $("#IsBorrow").val();
    var OSignUpID = $("#OSignUpID").val();
    var OProductName = $("#OProductName").val();
    $.webox({
        height: 1,
        width: 1,
        top: 246,
        bgvisibel: false,
        title: '',
        iframe: '/OrderCustom/ShowExecl?OSatet=' + OSatet + '&OCountry=' + OCountry + '&BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&ClientID=' + ClientID + '&OLineID=' + OLineID
            + '&Year=' + Year + '&Month=' + Month + '&TimeType=' + TimeType + '&Page=' + Page + '&IsBorrow=' + IsBorrow + '&OSignUpID=' + OSignUpID + '&OProductName=' + OProductName
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


