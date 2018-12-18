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
    } else if (TID == 2) {
        $("#OCountry").val(Val);
    } else if (TID == 5) {
        $("#ClientID").val(Val);
    } else if (TID == 9) {
        $("#XCtijiaoren").val(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else if (TID == 26) {
        $("#select5").empty();
        //$("#OSignUpID").val(Val);
        //ShowSale1(Val);
        $("#ClientID").val(0);
    } else {
        $("#OLineID").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chhk();
}

function chhk(TDID) {

    $.ajax({
        type: "POST",
        url: "/Home/ShowOrderAjax",
        data: $("#form1").serialize(),
        success: function (sesponseTest) {
            //alert(sesponseTest);
            if (sesponseTest == "") {
                $("#t tbody").html("");
            } else {
                BindSeachHomeList(sesponseTest, UserType);
            }
        }
    });
}

//绑定搜索信息
function BindSeachHomeList(str, userType) {
    //分割字符串 &|
    var valueS = str.split('&*');
    paging(valueS[1], 12);
    var orders = valueS[0].split('&|');
    var tStr = '';
    $("#t tbody").html("");
    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:13px;" onclick = "bgChange(this)">';
        tStr += '<td>' + h + '</td>';
        tStr += '<td style="font-size:12px;"><a href="/Order/UpdateOrderShow?oid=' + order[10] + '&version=' + (new Date()).getTime() + '" target="_blank" id="lsh_' + order[1] + '">' + order[0] + '</a></td>';
        tStr += '<td style="font-size:12px;">' + order[1] + '</td>';
        tStr += '<td style="font-size:12px;">' + order[2] + '</td>';
        tStr += '<td style="font-size:13px;">' + formatDate(order[3], "yyyy-MM-dd") + '<br><span style="color:#0000FF;">剩' + order[11] + '天</span></td>';

        if (order[4] == 1 || order[4] ==100) {
            tStr += '<td style="color:#FF0000;">否</td>';
        } else if (order[4] == 0) {
            tStr += '<td>是</td>';
        } else {
            tStr += '<td style="color:#FF0000;">否</td>';
        }

        tStr += '<td style="font-size:13px;"><input name="' + order[10] + '" value="' + order[5] + '" type="text" id="' + order[10] + '" style="width:120px;BORDER-TOP-STYLE: none; BORDER-RIGHT-STYLE: none; BORDER-LEFT-STYLE: none; BORDER-BOTTOM-STYLE: none;TEXT-ALIGN: center;" /><br><span onclick="jsCopy(' + order[10] + ')" style="padding-top:3px;">复制</span></td>';
        tStr += '<td style="font-size:13px;">' + formatDate(order[6], "yyyy-MM-dd") + '</td>';
        tStr += '<td style="font-size:12px;">' + order[7] + '</td>';
        tStr += '<td style="font-size:12px;">' + order[8] + '</td>';
        tStr += '<td style="font-size:12px;">' + order[9] + '</td>';
        tStr += '<td style="font-size:12px;">' + order[12] + '</td>';
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
function BindHomeData(OSatet, OCountry, ClientID, XCtijiaoren, Count) {
    if (OSatet == 0 && OCountry == 0 && ClientID == 0 && XCtijiaoren == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }
    //绑定国家
    BindCountry();

    //绑定操作人员
    BindOperation();

    paging(Count, 11);

    chhk();
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


//绑定操作人员
function BindOperation() {
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetUserTypeParam",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>操作人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,9);">全部</a></dd>';
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

function jsCopy(wwhao) {
    var e = document.getElementById("" + wwhao + "");//对象是content 
    e.select(); //选择对象 
    document.execCommand("Copy"); //执行浏览器复制命令
    //alert("已复制好，可贴粘。");
}

function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}