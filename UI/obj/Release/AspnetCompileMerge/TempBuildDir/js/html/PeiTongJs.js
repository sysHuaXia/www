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
    if (TID == 8) {
        $("#SendSignTime").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
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
        url: "/Accompanied/IndexAjax",
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
    paging(valueS[1], 5);
    var orders = valueS[0].split('&|');
    var tStr = '';

    var sumrenshu = valueS[2];
    //alert(sumrenshu);

    $("#t tbody").html("");

    tStr += '<tr style="background-color:#FFB5B5;color:#fff;font-size:12px;">';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="5%"><div align="center">ID</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="20%"><div align="center">送签日期</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="20%"><div align="center">签证类型</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" ><div align="center">签证编号(M号)</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center">人数</div></td>';
  
    tStr += '</tr>';

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';
        
        tStr += '<td>' + h + '</td>';
        tStr += '<td>' + formatDate(order[1], "yyyy-MM-dd") + '&nbsp;' + order[7] + '</td>';
        tStr += '<td><span onclick="opUpdateOrder(' + order[0] + ');">' + order[4] + '</span></td>';
        tStr += '<td>' + order[5] + '</td>';
        tStr += '<td>' + order[6] + '</td>';

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
function BindIniAccPData(SendSignTime, Count) {
    if (SendSignTime == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定送签日期
    BindSendTime();

    paging(Count, 11);

    chkk();
}

//绑定送签日期
function BindSendTime() {
    $.ajax({
        type: "GET",
        url: "/Accompanied/GetSendSignTime",
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


function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
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

