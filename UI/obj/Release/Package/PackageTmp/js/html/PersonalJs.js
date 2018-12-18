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
    if (TID == 3) {
        $("#Year").val(Val);
    } else if (TID == 4) {
        $("#Month").val(Val);
    } else if (TID == 26) {
        $("#RoleId").val(Val);
        $("#select5").empty();
        ShowUserByRoleId(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#CodeId").val(Val);
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
        url: "/PersonalCenter/IndexAjax",
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
    paging(valueS[1], 13);
    var orders = valueS[0].split('&|');
    var tStr = '';

    $("#t tbody").html("");

    tStr += '<tr style="background-color:#FFB5B5;color:#fff;font-size:12px;">';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="2%"><div align="center">ID</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%"><div align="center">姓名</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%"><div align="center">出签数</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%"><div align="center">拒签数</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%"><div align="center">退单数</div></td>';

    tStr += '<td height="35" bgcolor="#FF8E8E" width="7%"><div align="center" style="color:blue;">拒签率</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="7%"><div align="center" style="color:blue;">退单率</div></td>';

    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%" ><div align="center" style="color:#000000;">标准份数1</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center" style="color:#000000;">标准加急1+1</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center" style="color:#000000;">升级份数2</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%"><div align="center" style="color:#000000;">升级加急2+1</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="10%"><div align="center" style="color:#000000;">总份数</div></td>';

    tStr += '<td height="35" bgcolor="#FF8E8E"><div align="center" style="color:#green;">业绩考核-<span onclick="BaseSetUp();">管理</span></div></td>';
    tStr += '</tr>';

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';

        tStr += '<td>' + h + '</td>';
        tStr += '<td>' + order[2] + '</td>';
        tStr += '<td>' + order[3] + '</td>';
        tStr += '<td>' + order[8] + '</td>';
        tStr += '<td>' + order[9] + '</td>';

        tStr += '<td>' + order[15] + '</td>';
        tStr += '<td>' + order[16] + '</td>';

        tStr += '<td>' + order[4] + '</td>';
        tStr += '<td>' + order[5] + '</td>';
        tStr += '<td>' + order[6] + '</td>';
        tStr += '<td>' + order[7] + '</td>';
        tStr += '<td>' + order[10] + '&nbsp;&nbsp;' + order[12] + '</td>';

        if (order[14] == 1) {
            tStr += '<td><span style="color:#0000FF;" onclick="ShowSeal(' + order[1] + ',0);">已封存</span></td>';
        } else {
            tStr += '<td><span style="color:#CCC;" onclick="Sequestration(' + order[1] + ',' + order[13] + ',' + order[10] + ',' + order[17] + ');">操作</span></td>';
        }
        
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
function BindIniRoleData(CodeId, Year, Month, RoleId) {
    if (CodeId == 0 && Year == 0 && Month == 0 && RoleId == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定角色
    BindRole(); 

    //绑定年份
    showYear();

    //绑定月份
    BindMonth();

    paging(Count, 9);

    chkk();
}

//通过角色选项过虑人员 
function ShowUserByRoleId(SID) {
    $("#select5").empty();
    $.ajax({
        type: "GET",
        url: "/PersonalCenter/GetUserByRoleId",
        data: "RId=" + SID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var str = '<dt>相关人员：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
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

//角色内容
function BindRole() {
    $.ajax({
        type: "GET",
        url: "/PersonalCenter/GetRole",
        //data: "SupplierID=" + SupplierID,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>角色选项：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,26);">全部</a></dd>';
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

//点击背景颜色变换
function bgChange(obj) {
    obj.bgColor = obj.bgColor == "" ? "#B0D8FF" : "";
}

//基数设置
function BaseSetUp() {
    //var winUrl = '/Personal/baseSetUp';
    var winUrl = '/PersonalCenter/baseSetUp?version=' + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '基数设置',
        url: winUrl,
        width: 660,
        height: 550
    });
}

//
function Sequestration(uId, shijian, sumNum, roleId) {
    if (uId == '') {
        asyncbox.tips('封存当月业绩', 'alert');
        return;
    }

    var winUrl = '/PersonalCenter/UpdateSequestration?uId=' + uId + '&shijian=' + shijian + '&sumNum=' + sumNum + '&roleId=' + roleId + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '封存当月业绩',
        url: winUrl,
        width: 600,
        height: 450
    });
}


function ShowSeal(CodeId,getState) {
    if (CodeId == '') {
        asyncbox.tips('验证层', 'alert');
        return;
    }

    var winUrl = '/PersonalCenter/ShowSeal?codeId=' + CodeId + '&getState=' + getState + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '口令验证',
        url: winUrl,
        width: 810,
        height: 630
    });
}
