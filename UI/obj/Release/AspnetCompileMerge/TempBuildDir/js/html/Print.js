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
    if (TID == 1) {
        $("#OSatet").val(Val);
    } else if (TID == 8) {
        $("#SendSignTime").val(Val);
    } else if (TID == 9) {
        $("#TheSignTime").val(Val);
    } else if (TID == 5) {
        $("#SendSignAddree").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else if (TID == 26) {
        $("#AreaId").val(Val);
        $("#select5").empty();
        ShowSale1(Val);
    } else {
        $("#SendSignTime").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chkk();
}

function chkk(TDID) {
    $.ajax({
        type: "POST",
        url: "/QuickQuery/PrintAjax",
        data: $("#form1").serialize(),
        success: function (sesponseTest) {
            //alert(sesponseTest);
            if (sesponseTest == "") {
                $("#t tbody").html("");
            } else {
                BindSeachList(sesponseTest, UserType);
            }
        }
    });
}

//绑定搜索信息
function BindSeachList(str, userType) {
    //分割字符串 &|
    var valueS = str.split('&*');
    paging(valueS[1], 11);
    var orders = valueS[0].split('&|');
    var tStr = '';

    var sumrenshu = valueS[2];
    //alert(sumrenshu);

    $("#t tbody").html("");

    tStr += '<tr style="background-color:#FFB5B5;color:#fff;font-size:12px;">';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="2%"><div align="center">ID</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center">类型</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="3%"><div align="center">代送</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" ><div align="center">姓名</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="12%"><div align="center">行程人</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="3%"><div align="center" style="font-size:10px;">' + sumrenshu + '人</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center">客户电话</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center">出发/回国时间</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center">送签日期</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center">审核人/旺旺号</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="5%"><div align="center">付款情况</div></td>';
    tStr += '</tr>';

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';
        tStr += '<td>' + h + '</td>';
        tStr += '<td style="' + order[24] + '">' + order[1] + '' + order[2] + '<br/><img alt="image" class="img-circle" src="/images/biaozhi/' + order[26] + '.gif"></td>';
        tStr += '<td><span style="color:#0033FF">' + order[5] + '' + order[29] + '</span></td>';
        tStr += '<td style="text-align:left;"><span onclick="opUpdateOrder(' + order[0] + ')">' + order[7] + '</span><br/><span style="font-family:"宋体"">' + order[8] + '&nbsp;' + order[9] + '</span></td>';
        tStr += '<td>' + order[10] + '<br/>' + order[11] + '<br/>' + order[28] + '</td>';
        tStr += '<td>' + order[12] + '</td>';

        tStr += '<td>' + order[13] + '<br/><span onclick="opOrderTrip(' + order[0] + ');">' + order[14] + '</span></td>';

        if (order[15].length != 0 && order[16].length != 0) {
            tStr += '<td>' + formatDate(order[15], "yyyy-MM-dd") + '<br/>' + formatDate(order[16], "yyyy-MM-dd") + '<br/>'+order[25]+'</td>';
        } else if (order[15].length != 0 && order[16].length == 0) {
            tStr += '<td>' + formatDate(order[15], "yyyy-MM-dd") + '<br/><span style="color:#DADADA">--/--</span></td>';
        } else if (order[15].length == 0 && order[16].length != 0) {
            tStr += '<td style="color:#DADADA">--/--<br/>' + formatDate(order[16], "yyyy-MM-dd") + '</td>';
        } else {
            tStr += '<td style="color:#DADADA">--/--<br/>--/--</td>';
        }
        if (order[17].length != 0) {
            tStr += '<td>' + formatDate(order[17], "yyyy-MM-dd") + '<br/>' + order[18] + ':' + order[19] + '</td>';
        } else {
            tStr += '<td style="color:#DADADA">--/--</td>';
        }
        tStr += '<td style="text-align:center;">' + order[27] + '<br/>' + order[20] + '</td>';
        tStr += '<td>' + order[21] + '<br/>' + order[22] + '</td>';
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
function BindIniPData(OSatet, AreaId, ClientID, SendSignAddree, SendSignTime, TheSignTime, Count) {
    if (OSatet == 0 && AreaId == 0 && ClientID == 0 && SendSignAddree == 0 && SendSignTime == 0 && TheSignTime==0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定送签地区
    BindArea();

    //绑定送签日期
    BindSendTime();

    //绑定出签日期
    BindSignTime();

    paging(Count, 11);

    chkk();
}

//绑定送签地区
function BindArea() {
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetAreaList",
        //data: "SupplierID=" + SupplierID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>送签地区：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,26);">全部</a></dd>';
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

//绑定送签日期
function BindSendTime() {
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetSendSignTime",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>待送时间：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,8);">全部</a></dd>';
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

//绑定出签日期
function BindSignTime() {
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetSignTime",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>待取时间：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,9);">全部</a></dd>';
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

//绑定送签领馆中心的名称
function ShowSale1(SID) {
    $("#select5").empty();
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetAreaConsul",
        data: "SID=" + SID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var str = '<dt>送签地点：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
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


function jsCopy(wwhao) {
    var e = document.getElementById("" + wwhao + "");//对象是content 
    e.select(); //选择对象 
    document.execCommand("Copy"); //执行浏览器复制命令
    //alert("已复制好，可贴粘。");
}


function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}


//读取旗帜内容
function opLinkAddress(oid) {
    if (oid == '') {
        asyncbox.tips('跳转页面', 'alert');
        return;
    }
    var winUrl = '/QuickQuery/LinkAddress?oid=' + oid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '跳转页面',
        url: winUrl,
        width: 400,
        height: 200
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


