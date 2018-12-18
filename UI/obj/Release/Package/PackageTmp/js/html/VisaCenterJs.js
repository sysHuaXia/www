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
    if (TID == 2) {
        $("#OCountry").val(Val);
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
        url: "/VisaCenter/PagesAjax",
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
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');

        if (orderList[2] != "")
        {
            var message = orderList[2].split('##}');
            for (var n = 0; n < message.length - 1 ; n++) {
                var m = message[n].split('&,');

                if (m[1] == 1)
                {
                    tStr += '<tr style="heigh:100px;">';
                    tStr += '<td colspan="8" style="text-align:left;color:red;"><strong>公证认证</strong>&nbsp;&nbsp;&nbsp;<span style="color:#999;">更新时间' + formatDate(m[3], "yyyy-MM-dd") + '</span>&nbsp;&nbsp;&nbsp;<span onclick="updateMessage(' + m[0] + ',' + m[5] + ');" style="color:#999">编辑</span><br/><br/><span style="color:#red;">' + m[2] + '</span></td>';
                    tStr += '</tr>';
                }
                else if (m[1] == 2)
                {
                    tStr += '<tr style="heigh:100px;">';
                    tStr += '<td colspan="8" style="text-align:left;color:green;"><strong>签证须知</strong>&nbsp;&nbsp;&nbsp;<span style="color:#999;">更新时间' + formatDate(m[3], "yyyy-MM-dd") + '</span>&nbsp;&nbsp;&nbsp;<span onclick="updateMessage(' + m[0] + ',' + m[5] + ');" style="color:#999">编辑</span><br/><br/><span style="color:green">' + m[2] + '</span></td>';
                    tStr += '</tr>';
                }
                else if (m[1] == 3)
                {
                    tStr += '<tr style="heigh:100px;">';
                    tStr += '<td colspan="8" style="text-align:left;color:blue;"><strong>领事馆</strong>&nbsp;&nbsp;&nbsp;<span style="color:#999;">更新时间' + formatDate(m[3], "yyyy-MM-dd") + '</span>&nbsp;&nbsp;&nbsp;<span onclick="updateMessage(' + m[0] + ',' + m[5] + ');" style="color:#999">编辑</span>&nbsp;&nbsp;&nbsp;';

                    var mmessage = orderList[3].split('}##');
                    for (var w = 0; w < mmessage.length - 1 ; w++) {
                        var p = mmessage[w].split('&,');
                        tStr += '<span><a href="' + p[1] + '" target="_blank" style="font-weight:800;">' + p[2] + '</a>&nbsp;&nbsp;</span>';
                    }
                    
                    tStr += '<br/><br/><span style="color:#999;">' + m[2] + '</span></td>';
                    tStr += '</tr>';
                }
                else if (m[1] == 4) {
                    tStr += '<tr style="heigh:100px;">';
                    tStr += '<td colspan="8" style="text-align:left;color:#1BC5BB;"><strong>代交</strong>&nbsp;&nbsp;&nbsp;<span style="color:#999;">更新时间' + formatDate(m[3], "yyyy-MM-dd") + '</span>&nbsp;&nbsp;&nbsp;<span onclick="updateMessage(' + m[0] + ',' + m[5] + ');" style="color:#999">编辑</span><br/><br/><span style="color:#1BC5BB;">' + m[2] + '</span></td>';
                    tStr += '</tr>';
                }
            }
        }

        tStr += '<tr style="background-color:#F0F0F0">';
        tStr += '<th style="width:5%">序号</th>';
        tStr += '<th style="width:6%" id="cptd">国家</th>';
        tStr += '<th >签证中心</th>';
        tStr += '<th style="width:12%;text-align:left;">签证费</th>';
        tStr += '<th style="width:10%;text-align:center;">更新时间</th>';
        tStr += '<th style="width:8%;text-align:center;"><span onclick="opMessage(' + order[0] + ');">操作</span></th>';
        tStr += '</tr>';

        tStr += '<tr>';
        tStr += '<td style="text-align:left;">' + order[0] + '</td>';
        tStr += '<td style="text-align:left;">' + order[1] + '</td>';

        if (orderList[1] != "") {
            var cashs = orderList[1].split('&}');
            tStr += '<td style="text-align:left;">';
            for (var j = 0; j < cashs.length - 1 ; j++) {
                var cash = cashs[j].split('&,');
                var h = j + 1;
                tStr += '<a href="' + cash[2] + '" target="_blank" style="color:#0000FF">' + cash[1] + '</a>&nbsp;&nbsp;';
            }
            tStr += '</td>';
        }
        else {
            tStr += '<td style="text-align:left;">&nbsp;</td>';
        }

        tStr += '<td style="text-align:left;">成人：' + order[3] + '<br/>儿童：' + order[4] + '<br/>(<span style="color:red;">电</span>)成人：' + order[10] + '<br/>(<span style="color:red;">电</span>)儿童：' + order[11] + '<br/><a href="' + order[8] + '" target="_blank" style="color:#0000FF">链接</a></span></td>';
        tStr += '<td style="text-align:center;">' + order[5] + '</span></td>';
        tStr += '<td style="text-align:center;"><span onclick="opModify(' + order[0] + ');" style="color:#0000FF">修改</span></td>';
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
function BindData(OCountry, Count) {
    if (OCountry == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //绑定国家
    BindCountry();
    //绑定分页
    paging(Count, 8);
    //默认加载
    chk();
}

//绑定报名点
function BindCountry() {
    $.ajax({
        type: "GET",
        url: "/VisaCenter/GetCountryList",
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

//修改
function opModify(Cid) {
    if (Cid == '') {
        asyncbox.tips('修改价格', 'alert');
        return;
    }
    var winUrl = '/VisaCenter/UpdateVisaCenter?Cid=' + Cid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '修改价格',
        url: winUrl,
        width: 720,
        height: 680
    });
}

//新增
function opMessage(Cid) {
    if (Cid == '') {
        asyncbox.tips('新增消息', 'alert');
        return;
    }
    var winUrl = '/VisaCenter/AddVisaCenterMessage?Cid=' + Cid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '新增消息',
        url: winUrl,
        width: 660,
        height: 420
    });
}

//修改
function updateMessage(MId,CId) {
    if (MId == '') {
        asyncbox.tips('修改消息', 'alert');
        return;
    }
    var winUrl = '/VisaCenter/UpdateMessage?MId=' + MId + '&CId=' + CId + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '修改消息',
        url: winUrl,
        width: 660,
        height: 520
    });
}