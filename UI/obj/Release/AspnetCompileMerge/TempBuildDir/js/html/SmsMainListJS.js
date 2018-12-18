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
    chhk(1);
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

function Seach(Val, TID) {
    if (TID == 1) {
        $("#OSatet").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#Page").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chhk();
}

function chhk(TDID) {
    $.ajax({
        type: "POST",
        url: "/Sms/SmsListAjax",
        data: $("#form1").serialize(),
        success: function (sesponseTest) {
            if (sesponseTest == "") {
                $("#t tbody").html("");
            } else {
                BindSeachSmsList(sesponseTest);
            }
        }
    });
}

//绑定搜索信息
function BindSeachSmsList(str) {
    //分割字符串 &|
    var valueS = str.split('&*');
    paging(valueS[1], 5);
    var orders = valueS[0].split('&|');
    var tStr = '';
    $("#t tbody").html("");
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:13px;" onclick = "bgChange(this)">';
        tStr += '<td><a href="/Order/UpdateOrderShow?oid=' + order[6] + '&version=' + (new Date()).getTime() + '" target="_blank" id="lsh_' + order[6] + '">' + order[1] + '</a></td>';
        tStr += '<td>' + order[2] + '</td>';
        tStr += '<td>' + order[3] + '</td>';
        tStr += '<td>' + order[4] + '</td>';
        tStr += '<td style="text-align:left;">' + order[5] + '</td>';
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
function BindSmsListData(OSatet, Count) {
    if (OSatet == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    paging(Count, 5);
    chhk();
}




function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}