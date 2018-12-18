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
    } else {
        //$("#OLineID").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chk();
}

function chk(TDID) {
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
        url: "/Verify/VerifyAjax",
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
    paging(valueS[1], 14);
    var orders = valueS[0].split('&|');
    var tStr = '';
    $("#t tbody").html("");
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = i + 1;

        tStr += '<tr>';
        tStr += '<td style="text-align:center;">' + h + '</td>';
        tStr += '<td style="text-align:center;"><a href="/Order/UpdateOrderShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;font-size:14px;" id="lsh_' + order[0] + '">' + order[1] + '</a></td>';
        tStr += '<td style="text-align:center;">' + order[2] + '</td>';
        tStr += '<td style="text-align:center;">' + order[3] + '</td>';
        tStr += '<td style="text-align:center;">' + order[4] + '<br><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[4] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[4] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[4] + '" /></a></td>';
        tStr += '<td style="text-align:center;">' + order[5] + '</td>';
        tStr += '<td style="text-align:center;">' + order[6] + '</td>';
        tStr += '<td style="text-align:center;">' + order[7] + '</td>';
        tStr += '<td style="text-align:center;">' + order[8] + '</td>';
        tStr += '<td style="text-align:center;">' + order[10] + '</td>';
        tStr += '<td style="text-align:center;">' + order[12] + '</td>';
        tStr += '<td style="text-align:center;"><a href="/Order/AddPaymentShow?oid=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank">' + order[13] + '<br/>' + order[14] + '</a></td>';
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

    //if (date == null || date == "")
    //{
    //    date = "";
    //}

}

//自动加载数据
function BindVerifyData(SupplierID, OSatet, OCountry, ClientID, OLineID, Year, Month, Count) {
    if (OSatet == 0 && OCountry == 0 && ClientID == 0 && OLineID == 0 && Year == 0 && Month == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //绑定年份
    showYear();
    //绑定月份
    BindMonth();
    //绑定国家
    BindCountry();
    //杭州人员
    BindUserVerify();
    //绑定路线
    //BindLine();
    paging(Count, 14);

    chk();
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

//杭州人员
function BindUserVerify() {
    $.ajax({
        type: "GET",
        url: "/Verify/GetUserVerifyList",
        //data: "SupplierID=" + SupplierID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>人员列表：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',5);">' + arr[1] + '</a></dd>';
                });
                $("#select5").append(str);

                $("#select5 dd").click(function () {
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
                            copyThisZ.attr("onclick", "del(this,5);");
                            $(".select-result dl").append(copyThisZ.attr("id", "selectW"));
                            $("#selectW a").removeAttr("onclick");
                        }
                    }
                });
            }
        }
    });
}

