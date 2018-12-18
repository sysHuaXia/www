//金钱格式
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

//查看所有凭证
function opBill(CashID, BType, OrderId) {
    $.webox({
        height: 558,
        width: 978,
        bgvisibel: true,
        title: '查看凭证',
        iframe: '/Bill/ShowBills?CashID=' + CashID + '&BType=' + BType + '&OrderId=' + OrderId
    });
}
//根据收据ID查看条凭证
function opBillByOrderId(OrderId) {
    $.webox({
        height: 558,
        width: 978,
        bgvisibel: true,
        title: '查看凭证',
        iframe: '/Bill/ShowBillsByOrderId?OrderId=' + OrderId
    });
}
//更改订单状态
function qk(OrderId) {
    var tab = document.getElementById("sc " + OrderId);
    for (var i = 0; i < tab.rows.length; i++) {
        if (i > 0) {
            for (var j = 0; j < tab.rows.item(i).cells.length; j++) {
                if (j == tab.rows.item(i).cells.length - 4 || j == tab.rows.item(i).cells.length - 7) {
                    tab.rows.item(i).cells[j].innerHTML = '<input id="stnOpen" disabled="disabled" type="button" value="撤回" class="btn-white btn btn-xs" />';
                }
            }
        }
    }
    $("#" + OrderId).remove();
    document.getElementById("OCustomType " + OrderId).innerHTML = "<span style=\"color:green;\">已完成</span><br><span style=\"color:green;\">已结算</span>";
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
                    qk(OrderId);
                });
            }
        }
    });
}
//撤回初审
function RetractOrderCash(OrderID, CashID, UserID) {
    swal({
        title: "您确定要撤回吗？",
        text: "您确定要撤回当前记录？",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的",
        confirmButtonColor: "#ec6c62"
    }, function () {
        $.ajax({
            type: "GET",
            url: "/AccountantCustom/RetractOrderCash",
            data: "OrderID=" + OrderID + "&CashID=" + CashID,
            success: function (sesponseTest) {
                if (sesponseTest == "0") {
                    swal('错误...', '撤回审核失败！', 'error');
                } else {
                    swal({
                        title: "操作成功...",
                        text: "撤回审核成功！",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    }, function () {
                        showExamine(2, OrderID);
                        document.getElementById("pay " + CashID).innerHTML = '<span style="color:red;">未审核</span>';
                        document.getElementById("status " + CashID).innerHTML = '<input id="stnOpen" type="button" value="审核" onclick="AuditOrderCash(' + OrderID + ',' + CashID + ',' + UserID + ')" class="btn-white btn btn-xs" />';
                        document.getElementById("fscz " + CashID).innerHTML = '<input id="stnOpen" type="button" value="终审" disabled="disabled" onclick="ListAuditOrderCash(' + CashID + ',' + OrderID + ',' + UserID + ')" class="btn-white btn btn-xs">';
                        document.getElementById("OCustomType " + OrderID).innerHTML = "<span style=\"color:red;\">未完成</span>";
                    });
                }
            }
        });
    });
}

//撤回终审
function ReListAuditOrderCash(OrderID, CashID, UserID) {
    swal({
        title: "您确定要撤回吗？",
        text: "您确定要撤回当前记录？",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的",
        confirmButtonColor: "#ec6c62"
    }, function () {
        $.ajax({
            type: "GET",
            url: "/AccountantCustom/ReListAuditOrderCash",
            data: "OrderID=" + OrderID + "&CashID=" + CashID,
            success: function (sesponseTest) {
                if (sesponseTest == "0") {
                    swal('错误...', '撤回审核失败！', 'error');
                } else {
                    swal({
                        title: "操作成功...",
                        text: "撤回审核成功！",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    }, function () {
                        showExamine(4, OrderID);
                        document.getElementById("pay " + CashID).innerHTML = '<span style="color:green;">已初审</span>';
                        document.getElementById("fscz " + CashID).innerHTML = '<input id="stnOpen" type="button" value="终审" onclick="ListAuditOrderCash(' + OrderID + ',' + CashID + ',' + UserID + ')" class="btn-white btn btn-xs" />';
                        document.getElementById("status " + CashID).innerHTML = '<input id="stnOpen" type="button" value="撤回" onclick="RetractOrderCash(' + OrderID + ',' + CashID + ',' + UserID + ')" class="btn-white btn btn-xs" />';
                        document.getElementById("OCustomType " + OrderID).innerHTML = "<span style='color: red;'>未完成</span><br /><span style='color:green;'>已初审</span>";
                        document.getElementById("czl " + OrderID).innerHTML = '<input id="stnOpen" type="button" value="所有凭证" onclick="opBillByOrderId(' + OrderID + ');" class="btn-white btn btn-xs" />';
                    });
                }
            }
        });
    });
}

//终审
function ListAuditOrderCash(OrderID, CashID, UserID) {
    swal({
        title: "您确定要审核吗？",
        text: "您确定要审核当前记录？",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的",
        confirmButtonColor: "#ec6c62"
    }, function () {
        $.ajax({
            type: "GET",
            url: "/AccountantCustom/ListAuditOrderCash",
            data: "OrderID=" + OrderID + "&CashID=" + CashID + "&UserID=" + UserID,
            success: function (sesponseTest) {
                if (sesponseTest == "0") {
                    swal('错误...', '收款审核失败！', 'error');
                } else {
                    swal({
                        title: "操作成功...",
                        text: "收款审核成功！",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    }, function () {
                        showExamine(3, OrderID);
                        document.getElementById("pay " + CashID).innerHTML = '<span style="color:green;">已终审</span>';
                        document.getElementById("fscz " + CashID).innerHTML = '<input id="stnOpen" type="button" value="撤回" onclick="ReListAuditOrderCash(' + OrderID + ',' + CashID + ',' + UserID + ')" class="btn-white btn btn-xs" />';
                        document.getElementById("status " + CashID).innerHTML = '<input id="stnOpen" type="button" value="撤回" disabled="disabled" onclick="RetractOrderCash(' + OrderID + ',' + CashID + ',' + UserID + ')" class="btn-white btn btn-xs" />';
                        var strAry = sesponseTest.split(",");
                        document.getElementById("fsczy " + CashID).innerHTML = strAry[0];
                        document.getElementById("fssj " + CashID).innerHTML = formatDate(strAry[1], "yyyy-MM-dd");
                        if (strAry[2] == "2") {
                            document.getElementById("OCustomType " + OrderID).innerHTML = "<span style='color: green;'>已完成</span><br /><span style='color:green;'>已终审</span>";
                            document.getElementById("czl " + OrderID).innerHTML = '<input id="stnOpen" type="button" value="所有凭证" onclick="opBillByOrderId(' + OrderID + ');" class="btn-white btn btn-xs" /><br /><input id="' + OrderID + '" type="button" value="生成结算" onclick="settlement(' + OrderID + ');" class="btn-white btn btn-xs" />';
                        }
                    });
                }
            }
        });
    });
}

function showExamine(TID,OrderID) {
    //获取初审数、复审数
    cSum = parseInt($("#cSum_" + OrderID).html());
    fSum = parseInt($("#fSum_" + OrderID).html());
    if (TID == 1) {
        //初审
        cSum--;
        $("#cSum_" + OrderID).html(cSum);
        if (cSum == 0) {
            $('#cDiv_' + OrderID).css('display', 'none');
        }
        fSum++;
        $("#fSum_" + OrderID).html(fSum);
        $('#fDiv_' + OrderID).css('display', 'block');
    } else if (TID == 2) {
        //撤回初审
        cSum++;
        $("#cSum_" + OrderID).html(cSum);
        $('#cDiv_' + OrderID).css('display', 'block');
        fSum--;
        $("#fSum_" + OrderID).html(fSum);
        if (fSum == 0) {
            $('#fDiv_' + OrderID).css('display', 'none');
        }
    } else if (TID == 3) {
        //复审
        fSum--;
        $("#fSum_" + OrderID).html(fSum);
        if (fSum == 0) {
            $('#fDiv_' + OrderID).css('display', 'none');
        }
    } else {
        //撤回复审
        fSum++;
        $("#fSum_" + OrderID).html(fSum);
        $('#fDiv_' + OrderID).css('display', 'block');
    }
}

//初审
function AuditOrderCash(OrderID, CashID, UserID) {
    swal({
        title: "您确定要审核吗？",
        text: "您确定要审核当前记录？",
        type: "warning",
        showCancelButton: true,
        closeOnConfirm: false,
        confirmButtonText: "是的",
        confirmButtonColor: "#ec6c62"
    }, function () {
        $.ajax({
            type: "GET",
            url: "/AccountantCustom/AuditOrderCash",
            data: "OrderID=" + OrderID + "&CashID=" + CashID + "&UserID=" + UserID,
            success: function (sesponseTest) {
                if (sesponseTest == "0") {
                    swal('错误...', '收款审核失败！', 'error');
                } else {
                    swal({
                        title: "操作成功...",
                        text: "收款审核成功！",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonText: "OK",
                    }, function () {
                        showExamine(1, OrderID);
                        document.getElementById("pay " + CashID).innerHTML = '<span style="color:green;">已初审</span>';
                        document.getElementById("status " + CashID).innerHTML = '<input id="stnOpen" type="button" value="撤回" onclick="RetractOrderCash(' + OrderID + ',' + CashID + ',' + UserID + ')" class="btn-white btn btn-xs" />';
                        var strAry = sesponseTest.split(",");
                        document.getElementById("csczy " + CashID).innerHTML = strAry[0];
                        document.getElementById("cssj " + CashID).innerHTML = formatDate(strAry[1], "yyyy-MM-dd");
                        document.getElementById("fscz " + CashID).innerHTML = '<input id="stnOpen" type="button" value="终审" onclick="ListAuditOrderCash(' + OrderID + ',' + CashID + ',' + UserID + ')" class="btn-white btn btn-xs">';
                        //显示复审信息
                        if (strAry[2] == "2") {
                            document.getElementById("OCustomType " + OrderID).innerHTML = "<span style='color: red;'>未完成</span><br /><span style='color:green;'>已初审</span>";
                        }
                    });
                }
            }
        });
    });
}
//格式化时间
function formatDate(date, format) {
    if (!date) return;
    if (!format) format = "yyyy-MM-dd";
    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/, "/"));
            break;
        case "number":
            date = new Date(date);
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

//自动生成年份
function BindMonth() {
    var str = '<dt>月份：</dt><dd class="select-all selected">';
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

//自动加载数据
function BindData(SupplierID, OSatet, OCType, ClientID, OLineID, Year, Month, Count) {
    if (OSatet == 0 && OCType == 0 && ClientID == 0 && OLineID == 0 && Year == 0 && Month == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //绑定年份
    showYear();
    //绑定月份
    BindMonth();
    //绑定销售
    ShowSale(SupplierID);
    //绑定报名点
    ShowOSignUp(SupplierID);
    //绑定路线
    BindLine();
    paging(Count,8);
}

//绑定报名点
function ShowOSignUp(SupplierID) {
    $.ajax({
        type: "GET",
        url: "/Supplier/GetSignUp",
        data: "SupplierID=" + SupplierID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>报名点：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,26);">主门店</a></dd>';
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

//绑定线路
function BindLine() {
    $.ajax({
        type: "GET",
        url: "/AccountantCustom/ShowLine",
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

//绑定销售
function ShowSale(SupplierID) {
    $.ajax({
        type: "GET",
        url: "/AccountantCustom/ShowSale",
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
        url: "/Supplier/ShowSale",
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

//自动生成年份
function showYear() {
    var nowYear = new Date().getFullYear();
    var year1 = nowYear - 1;
    var year2 = nowYear - 2;
    var year3 = nowYear + 1;
    var jl = '';
    var str = '<dt>年份：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year3 + ',3);">' + year3 + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + nowYear + ',3);">' + nowYear + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year1 + ',3);">' + year1 + '年</a></dd>';
    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + year2 + ',3);">' + year2 + '年</a></dd>';
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

//删除方法
function del(obj, id) {
    Seach(0, id);
    $(obj).remove();
    $("#select" + id + " .select-all").addClass("selected").siblings().removeClass("selected");
    if (id == 6){
        $("#select7 dd").addClass("selected").siblings().removeClass("selected");
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
        $("#OSatet").val(Val);
    } else if (TID == 2) {
        $("#OCType").val(Val);
    } else if (TID == 3) {
        $("#Year").val(Val);
    } else if (TID == 4) {
        $("#Month").val(Val);
    } else if (TID == 5) {
        $("#ClientID").val(Val);
    } else if (TID == 8) {
        $("#IsBorrow").val(Val);
    } else if (TID == 26) {
        $("#select5").empty();
        $("#OSignUpID").val(Val);
        ShowSale1(Val);
        $("#ClientID").val(0);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#OLineID").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chk();
}

function chk() {
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
        url: "/AccountantCustom/ShowAccountantCustomAjax",
        data: $("#form1").serialize(),
        success: function (sesponseTest) {
            if (sesponseTest == "") {
                $("#t tbody").html("");
            } else {
                BindSeachList(sesponseTest, UserType);
            }
        }
    });
}

function chk1() {
    with (document.form1) {
        //计算时间
        if (Year.value == 0) {
            if (Month.value == 0) {
                BeginTime.value = "1900-01-01";
                EndTime.value = "1900-01-01";
                TimeType.value = 0;
            } else {
                var nowYear = new Date().getFullYear();
                var day = new Date(nowYear, Month.value, 0);
                var daycount = day.getDate();
                BeginTime.value = nowYear + "-" + Month.value + "-01";
                EndTime.value = nowYear + "-" + Month.value + "-" + daycount;
                TimeType.value = 2;
            }
        } else {
            if (Month.value == 0) {
                BeginTime.value = Year.value + "-01-01";
                EndTime.value = Year.value + "-12-31";
                TimeType.value = 1;
            } else {
                var day = new Date(Year.value, Month.value, 0);
                var daycount = day.getDate();
                BeginTime.value = Year.value + "-" + Month.value + "-01";
                EndTime.value = Year.value + "-" + Month.value + "-" + daycount;
                TimeType.value = 3;
            }
        }
        form1.action = "/AccountantCustom/ShowAccountantCustom";
        form1.submit();
    }
}

//绑定搜索信息
function BindSeachList(str,userType) {
    //分割字符串 &|
    var valueS = str.split('&*');
    paging(valueS[1],8);
    var orders = valueS[0].split('&|');
    var tStr = '';
    $("#t tbody").html("");
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        tStr += '<tr><td style="text-align:center;">';
        tStr += '<div style="position:absolute;overflow: hidden;z-index:99999;">';
        tStr += '<div id="cDiv_' + order[1] + '" style="border:1px solid; color:#f64949; width:60px; display:';
        if (order[24] == "0") {
            tStr += 'none';
        } else {
            tStr += 'block';
        }
        tStr += ';">初审<span id="cSum_' + order[1] + '">' + order[24] + '</span>条</div>';
        tStr += '<div id="fDiv_' + order[1] + '" style="border:1px solid; color:red; width:60px; display:';
        if (order[25] == "0") {
            tStr += 'none';
        } else {
            tStr += 'block';
        }
        tStr += ';">终审<span id="fSum_' + order[1] + '">' + order[25] + '</span>条</div>';
        tStr += '</div>';
        tStr += order[0] + '<table cellpadding="0" cellspacing="0" border="0" width="100%"><tr><td>';
        if (order[11] == "1") {
            tStr += '<span style="color:green;" id="OrderRemain ' + order[1] + '">已收清</span>';
        } else {
            tStr += '<span style="color:red;" id="OrderRemain ' + order[1] + '">未收清</span>';
        }
        tStr += '</td></tr><tr><td>';
        if (order[16] == "1") {
            tStr += '<span style="color:green;" id="OrderToPay ' + order[1] + '">已付清</span>';
        } else {
            tStr += '<span style="color:red;" id="OrderToPay ' + order[1] + '">未付清</span>';
        }
        tStr += '</td></tr></table></td><td><span style="color:palevioletred">出团：' + formatDate(order[2], "yyyy-MM-dd") + '<br />回团：' + formatDate(order[3], "yyyy-MM-dd");
        tStr += '</span><br />';
        if (order[22] == "True") {
            tStr += '<div style="border:1px solid rgb(240,200,10); text-align:center;display:inline;">&nbsp;&nbsp;小蜜蜂&nbsp;&nbsp;</div>';
        }
        tStr += order[4] + '</td><td>供应商：' + order[19] + '<br />客户名：' + order[5] + '<br />销售：' + order[21] + '</td>';
        tStr += '<td style="text-align:center;">' + order[7] + '<span>人</span><br />&#165;' + toDecimal(order[9]) + '</td>'
        tStr += '<td>下单：' + formatDate(order[8], "yyyy-MM-dd") + '<br />支付：' + order[13] + '</td>';
        tStr += '<td>应收：&#165;' + toDecimal(order[9]) + '<br />实收：&#165;' + toDecimal(order[12]) + '<br />剩余：&#165;' + toDecimal(order[15]) + '<br />应付：&#165;' + toDecimal(order[10]) + '<br />实付：&#165;' + toDecimal(order[14]) + '</td>';
        tStr += '<td align="center" id="OCustomType '+order[1]+'">';
        switch (order[18]) {
            case "1":
                tStr += '<span style="color: red; ">未完成</span>';
                break;
            case "3":
                tStr += '<span style="color: red; ">未完成</span><br /><span style="color: green; ">已初审</span>';
                break;
            case "4":
                tStr += '<span style="color: green; ">已完成</span><br /><span style="color: green; ">已结算</span>';
                break;
            case "5":
                tStr += '<span style="color: green; ">已完成</span><br /><span style="color: green; ">已终审</span>';
                break;
            case "6":
                tStr += '<span style="color: red; ">未完成</span><br /><span style="color: green; ">预结算</span>';
                break;
            default:
                tStr += '<span style="color: red; ">未完成</span>';
                break;
        }
        tStr += '</td>';
        tStr += '<td id="czl ' + order[1] + '"><input id="stnOpen" type="button" value="所有凭证" onclick="opBillByOrderId(' + order[1] + ');" class="btn-white btn btn-xs" />';
        if (order[18] == "5") {
            tStr += '<br /><input id="' + order[1] + '" type="button" value="生成结算" onclick="settlement(' + order[1] + ');" class="btn-white btn btn-xs" />';
        }
        tStr += '</td>';
        tStr += '<td data-hide="all"><table class="footable table table-stripped toggle-arrow-tiny" id="sc ' + order[1] + '"><thead><tr>';
        tStr += '<td align="center">支付状态</td><td align="center" width="80">款项方式</td><td align="center" width="80">款项状态</td><td align="center" style="display:none;">流水单号</td>';
        tStr += '<td align="center">金额</td><td align="center" width="268px" style="display:none;">备注</td><td align="center">操作员</td><td align="center">提交时间</td><td align="center">收/付时间</td>';
        tStr += '<td align="center">状态</td><td align="center">初审</td><td align="center">初审员</td><td align="center">初审时间</td><td align="center">终审</td>';
        tStr += '<td align="center">终审员</td><td align="center">终审时间</td><td align="center">详情</td>';
        tStr += '</tr></thead>';
        //绑定单据信息
        if (orderList[1] != "空") {
            var cashs = orderList[1].split('&}');
            for (var j = 0; j < cashs.length - 1 ; j++) {
                var cash = cashs[j].split('&,');
                tStr += '<tr id="tr_' + cash[10] + '" onmousemove="showPreview(this,event);" onmouseout="closePreview();">';
                tStr += '<td>';
                switch (cash[0]) {
                    case "0":
                        tStr += "<span style=\"color: green; \">收款</span>";
                        break;
                    case "1":
                        tStr += "<span style=\"color: dodgerblue; \">支付</span>";
                        break;
                    default:
                        tStr += "<span style=\"color: red; \">退款</span>";
                        break;
                }
                tStr += '</td>';
                tStr += '<td align="center">' + cash[1] + '</td>';
                tStr += '<td align="center">' + cash[17] + '</td>';
                tStr += '<td align="center" style="display:none;">' + cash[2] + '</td>';
                tStr += '<td align="center">&#165;' + toDecimal(cash[3]) + '</td>';
                tStr += '<td align="left" width="268px" style="display:none;">' + cash[4] + '</td>';
                tStr += '<td align="center">' + cash[5] + '</td>'
                tStr += '<td align="center">' + formatDate(cash[6], "yyyy-MM-dd") + '</td>';
                tStr += '<td align="center">' + formatDate(cash[7], "yyyy-MM-dd") + '</td>';
                tStr += '<td align="center" id="pay ' + cash[10] + '">'
                switch (cash[8]) {
                    case "1":
                        tStr += "<span style=\"color: green; \">已初审</span>";
                        break;
                    case "2":
                        tStr += "<span style=\"color: green; \">已复审</span>";
                        break;
                    default:
                        tStr += "<span style=\"color: red; \">未审核</span>";
                        break;
                }
                tStr += '</td>';
                tStr += '<td align="center" id="status ' + cash[10] + '">'
                if (cash[16] != "4")
                {
                    if (cash[8] == "0")
                    {
                        tStr += "<input id=\"stnOpen\" type=\"button\" value=\"初审\" onclick=\"AuditOrderCash(" + cash[9] + "," + cash[10] + "," + UserID + ")\" class=\"btn-white btn btn-xs\" />";
                    }
                    else if (cash[8] == "1")
                    {
                        tStr += "<input id=\"stnOpen\" type=\"button\" value=\"撤回\" onclick=\"RetractOrderCash(" + cash[9] + "," + cash[10] + "," + UserID + ")\" class=\"btn-white btn btn-xs\" />";
                    }
                    else
                    {
                        tStr += "<input id=\"stnOpen\" disabled=\"disabled\" type=\"button\" value=\"撤回\" onclick=\"RetractOrderCash(" + cash[9] + "," + cash[10] + "," + UserID + ")\" class=\"btn-white btn btn-xs\" />";
                    }
                }
                tStr += '</td>';
                tStr += '<td align="center" id="csczy ' + cash[10] + '">' + cash[11] + '</td>';
                tStr += '<td align="center" id="cssj ' + cash[10] + '">';
                if (cash[12] != "") {
                    tStr += formatDate(cash[12], "yyyy-MM-dd");
                }
                tStr += '</td>';
                tStr += '<td align="center" id="fscz ' + cash[10] + '">'
                if (cash[16] != "4") {
                    if (cash[8] == "1") {
                        tStr += "<input id=\"stnOpen\" type=\"button\" value=\"终审\" onclick=\"ListAuditOrderCash(" + cash[9] + "," + cash[10] + "," + UserID + ")\" class=\"btn-white btn btn-xs\" />";
                    }
                    else if (cash[8] == "2") {
                        tStr += "<input id=\"stnOpen\" type=\"button\" value=\"撤回\" onclick=\"ReListAuditOrderCash(" + cash[9] + "," + cash[10] + "," + UserID + ")\" class=\"btn-white btn btn-xs\" />";
                    }
                    else {
                        tStr += "<input id=\"stnOpen\" disabled=\"disabled\" type=\"button\" value=\"终审\" onclick=\"ListAuditOrderCash(" + cash[10] + "," + cash[9] + "," + UserID + ")\" class=\"btn-white btn btn-xs\" />";
                    }
                }
                tStr += '</td>';
                tStr += '<td align="center" id="fsczy ' + cash[10] + '">' + cash[13] + '</td>';
                tStr += '<td align="center" id="fssj ' + cash[10] + '">';
                if (cash[14] != "") {
                    tStr += formatDate(cash[14], "yyyy-MM-dd");
                }
                tStr += '</td>';
                tStr += '<td align="center">';
                tStr += '<input id="stnOpen" type="button" value="查看" onclick="opBill(' + cash[10] + ',0,0);" class="btn-white btn btn-xs" />';
                tStr += '</td>';
                tStr += '</tr>';

            }
        }
        tStr += '</table></td></tr>';
    }
    $("#t tbody").html(tStr);
    $('.footable').footable();
    $('.footable2').footable();
}

function opExecl() {
    var OSatet = $("#OSatet").val();
    var OCType = $("#OCType").val();
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
    $.webox({
        height: 1,
        width: 1,
        top: 246,
        bgvisibel: false,
        title: '',
        iframe: '/OrderCustom/ShowExecl?OSatet=' + OSatet + '&OCType=' + OCType + '&BeginTime=' + BeginTime + '&EndTime=' + EndTime + '&ClientID=' + ClientID + '&OLineID=' + OLineID
            + '&Year=' + Year + '&Month=' + Month + '&TimeType=' + TimeType + '&Page=' + Page + '&IsBorrow=' + IsBorrow + '&OSignUpID=' + OSignUpID + '&OProductName=""'
    });
}