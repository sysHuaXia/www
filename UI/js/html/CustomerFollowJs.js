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
        //$("#select5").empty();
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
    } else if (TID == 8) {
        $("#SendSignTime").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else if (TID == 3) {
        $("#Year").val(Val);
    } else if (TID == 4) {
        $("#Month").val(Val);
    }else if (TID == 26) {
        $("#ClientID").val(Val);
    } else {
        $("#SendSignTime").val(Val);
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
            $("#EndTime").val("1900-01-31");
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
        url: "/ClientFollow/CustomerFollowAjax",
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
    var count = valueS[1]; //获取数据条数
    var tStr = '';
    $("#t tbody").html("");
    if (count == 0) {
        tStr += '<tr>';
        tStr += '<td style="text-align:center;" colspan="9"><span style="color:#ccc;font-size:28px;">抱歉，没有找到相关的订单！</span></td>';
        tStr += '</tr>';
    }
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var orderWWHaoList = orders[i].split('&#{');
        var order = orderList[0].split('&,');
        var h=i+1;

        tStr += '<tr>';
        tStr += '<td style="' + order[12] + '">' + h + '/' + order[8] + '</td>';
        tStr += '<td style="text-align:center;">' + order[1] + '<br/>' + order[3] + '</td>';
        tStr += '<td style="text-align:center;"><span id="rs_' + order[4] + '"><input name="' + order[0] + '" value="' + order[4] + '" type="text" id="' + order[0] + '" style="width:100px;BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none;TEXT-ALIGN: center;" /><br><a target="_blank" href="http://www.taobao.com/webww/ww.php?ver=3&touid=' + order[4] + '&siteid=cntaobao&status=1&charset=utf-8"><img border="0" src="http://amos.alicdn.com/realonline.aw?v=2&uid=' + order[4] + '&site=cntaobao&s=1&charset=utf-8" alt="' + order[4] + '" /></a></span><br><span onclick="jsCopy(' + order[0] + ')" style="padding-top:3px;">复制</span></td>';
        tStr += '<td style="text-align:center;">' + order[9] + '</td>';
        tStr += '<td style="text-align:center;">' + formatDate(order[10], "yyyy-MM-dd") + '</td>';
        tStr += '<td style="text-align:center;font-size:16px;color:blue;">' + formatDate(order[6], "yyyy-MM") + '</td>';
        tStr += '<td style="text-align:center;">' + order[2] + '</td>';
        tStr += '<td style="text-align:center;">' + order[5] + '</td>';
        tStr += '<td style="text-align:left;">' + order[7] + '</td>';

        tStr += '<td>';
        if (order[11] == 1) {
            tStr += '<button class="btn-white btn btn-xs" style="width:38px;background-color:#1ab394;color:#fff;" onclick="opUpdateCustomFollowUp(' + order[0] + ')">修改</button>';
            tStr += '<button class="btn-white btn btn-xs" style="width:38px;background-color:#1ab394;color:#fff;" onclick="opAddDetails(' + order[0] + ')">跟进</button>';
            if (order[13] == 0) {
                tStr += '<button class="btn-white btn btn-xs" style="width:38px;background-color:#1ab394;color:#fff;" onclick="DeleteCustomFollowUp(' + order[0] + ')">删除</button>';
            }
        } else if (order[11] == 2) {
            tStr += '<button class="btn-white btn btn-xs" style="width:66px;background-color:green;color:#fff;" >成功</button>';
        } else if (order[11] == 3) {
            tStr += '<button class="btn-white btn btn-xs" style="width:66px;background-color:#cccccc;color:#fff;" >失败</button>';
        } else {
            tStr += '<button class="btn-white btn btn-xs" style="width:66px;background-color:#1ab394;color:#fff;" onclick="opAddDetails(' + order[0] + ')">暂无</button>';
        }
        tStr += '</td>';

        tStr += '<td data-hide="all"><table id="' + order[1] + '" class="footable table table-stripped toggle-arrow-tiny" width="1200px" style="border:1px solid #a3ddff;background:#fbfbfb"><thead><tr style="border:1px solid #a3ddff;">';
        tStr += '<td align="center">序号</td>';
        tStr += '<td align="center" width="200">跟进正文</td>';
        tStr += '<td align="center" width="100">添加时间</td>';
        tStr += '<td align="center" width="100">跟进人员</td>';
        tStr += '<td align="center" width="100">跟进状态</td>';

        tStr += '</tr></thead><tbody>';


        //绑定单据信息
        if (orderList[1] != "") {
            var cashs = orderList[1].split('&}');
            for (var j = 0; j < cashs.length - 1 ; j++) {
                var cash = cashs[j].split('&,');
                var w = j + 1;
                tStr += '<tr id="tr_' + cash[11] + '" onmousemove="showPreview(this,event);" onmouseout="closePreview();">';
                tStr += '<td align="center">' + w + '</td>';
                tStr += '<td align="center">' + cash[2] + '</td>';
                tStr += '<td align="center">' + formatDate(cash[3], "yyyy-MM-dd") + '</td>';
                tStr += '<td align="center">' + cash[5] + '</td>';
                tStr += '<td align="center">' + cash[6] + '</td>';
                tStr += '</tr>';
            }
        } else {
            tStr += '<tr style="display:none"><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"></td><td style="display:none"><input type="button" /></td><td style="display:none"><input type="button" /></td></tr>';
        }
        tStr += '</tbody></table></td></tr>';



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
function BindIniData(OSatet, ClientID, SendSignTime, Count) {
    if (OSatet == 0 && ClientID == 0 && SendSignTime==0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定送签地区
    BindEntryUser();

    //绑定送签日期
    BindEntryTime();

    //绑定年份
    showYear();

    //绑定月份
    BindMonth();


    paging(Count, 8);

    chkk();
}

//绑定跟进人
function BindEntryUser() {
    $.ajax({
        type: "GET",
        url: "/ClientFollow/GetEntryUser",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>登记人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,26);">全部</a></dd>';
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


function showYear() {
    var nowYear = new Date().getFullYear();
    var year1 = nowYear - 1;
    var year2 = nowYear - 2;
    var year4 = nowYear - 3;
    var year5 = nowYear - 4;
    var year3 = nowYear + 1;
    var jl = '';
    var str = '<dt>出发年份：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,3);">全部</a></dd>';
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
    var str = '<dt>出发月份：</dt><dd class="select-all selected">';
    str += '<a href="javascript:void(0);" onclick="Seach(0,4);">全部</a></dd>';
    for (var i = 1; i <= 12; i++) {
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
//绑定出发日期
function BindEntryTime() {
    $.ajax({
        type: "GET",
        url: "/ClientFollow/GetEntryTime",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>出发时间：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,8);">全部</a></dd>';
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




function jsCopy(wwhao) {
    var e = document.getElementById("" + wwhao + "");//对象是content 
    e.select(); //选择对象 
    document.execCommand("Copy"); //执行浏览器复制命令
    //alert("已复制好，可贴粘。");
}







