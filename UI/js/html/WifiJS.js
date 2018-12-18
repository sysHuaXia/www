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

//读取搜索信息 ResultState
function Seach(Val, TID) {
    if (TID == 1) {
        $("#OSatet").val(Val);
    } else if (TID == 2) {
        $("#OCountry").val(Val);
    } else if (TID == 4) {
        $("#ResultState").val(Val);
    } else if (TID == 8) {
        $("#GetType").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
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
        url: "/Wifi/WifiAjax",
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
    for (var i = 0; i < orders.length - 1; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = i + 1;

        tStr += '<tr height="50" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';
        tStr += '<td style="text-align:center;">' + h + '</td>';
        tStr += '<td style="text-align:center;">';
        tStr += '<a href="/Wifi/UpdateWifiOrder?WifiId=' + order[0] + '&version=' + (new Date()).getTime() + '" target="_blank" style="color:#6993E9;font-size:14px;">' + order[3] + '</a>';

        if (order[32] != null) {
            tStr += '<div style="border: 1px solid #badcfe; height:55px;text-align:left;">';
            tStr += '&nbsp;名称：' + order[32] + '&nbsp;<br/>&nbsp;数量：' + order[33] + '&nbsp;<br/>&nbsp;单价：￥' + toDecimal(order[34]) + '';
            tStr += '</div>';
        }

        tStr += '</td>';
        tStr += '<td style="text-align:center;">' + order[6] + '</td>';
        tStr += '<td style="text-align:center;">' + order[1] + '</td>';
        tStr += '<td style="text-align:center;">' + order[21] + '</td>';
        tStr += '<td style="text-align:center;">' + order[2] + '</td>';
        tStr += '<td style="text-align:center;">' + formatDate(order[7]) + '</td>';
        tStr += '<td style="text-align:left;">';
        tStr += '<span>是否wifi信用免押订单：<span style="text-align:left;font-size:14px;color:green">' + order[22] + '</span><br></span>';
        tStr += '<span>设备租借天数：<span style="text-align:left;font-size:14px;color:green">' + order[23] + '</span><br></span>';
        tStr += '<span>目的洲：<span style="text-align:left;font-size:14px;color:green">' + order[24] + '</span><br></span>';
        tStr += '<span>自取省份(对于自取方式才有值)：<span style="text-align:left;font-size:14px;color:green">' + order[25] + '</span><br></span>';
        tStr += '<span>自取城市(对于自取方式才有值)：<span style="text-align:left;font-size:14px;color:green">' + order[26] + '</span><br></span>';
        tStr += '<span>自取件区域(对于自取方式才有值)：<span style="text-align:left;font-size:14px;color:green">' + order[27] + '</span><br></span>';
        tStr += '<span>目的国家：<span style="text-align:left;font-size:14px;color:green">' + order[29] + '<br></span>';
        tStr += '<span>获取方式(邮寄-0，自取-1)：<span style="text-align:left;font-size:14px;color:green">' + order[30] + '</span><br></span>';
        tStr += '<span>自取地址(对于自取方式才有值)：<span style="text-align:left;font-size:14px;color:green">' + order[28] + '</span></span>';

        

        tStr += '</td>';
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
function BindScreeningData(OSatet, ResultState, OCountry, GetType, Count) {
    if (OCountry == 0 || OSatet == 0 || ResultState == 0 || GetType == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //绑定年份
    //showYear();
    //绑定月份
    //BindMonth();
    //绑定国家
    BindCountry();

    paging(Count, 8);

    chk();
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

//点击背景颜色变换
function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}


function ShowTagTicket(oid) {
    if (oid == '') {
        asyncbox.tips('标记', 'alert');
        return;
    }
    var winUrl = '/QuickQuery/ShowTagTicket?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '【新增】标记备注内容',
        url: winUrl,
        width: 700,
        height: 480
    });
}

