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
    //if (id == 4) {
    //    $("#select4 dd").addClass("selected").siblings().removeClass("selected");
    //}
    if (id == 9) {
        $("#select26").empty();
    }
    if (id == 26) {
        $("#select5").empty();
    }
    if (id == 5) {
        $("#select6").empty();
    }
    if ($(".select-result dd").length > 1) {
        $(".select-no").hide();
    } else {
        $(".select-no").show();
    }
}

//读取搜索信息
function Seach(Val, TID) {
    if (TID == 9) {
        $("#MArea").val(Val);
        $("#select26").empty();
        BindCountry(Val);
    } else if (TID == 5) {
        $("#MVType").val(Val);
        $("#select6").empty();
        ShowCrowd(Val);
    } else if (TID == 6) {
        $("#MCrowd").val(Val);
    } else if (TID == 26) {
        $("#MCountry").val(Val);
        $("#select5").empty();
        ShowSale1(Val);
    } else if (TID == 99) {
        $("#Page").val(Val);
    } else {
        $("#MArea").val(Val);
    }
    if (TID != 99) {
        $("#Page").val("1");
    }
    chkk();
}

function chkk(TDID) {
    $.ajax({
        type: "POST",
        url: "/MaterialsList/IndexAjax",
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
    var tStr = '';

    $("#t tbody").html("");
    tStr += '<tr style="background-color:#FFB5B5;color:#fff;font-size:12px;">';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="4%"><div align="center">序号</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%"><div align="center">区域</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%"><div align="center">国家</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="6%" ><div align="center">类型</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%" ><div align="center">人群</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E"><div align="center">下载内容</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="8%" ><div align="center">上传人</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="15%"><div align="center">记录时间</div></td>';
    tStr += '<td height="35" bgcolor="#FF8E8E" width="5%"><div align="center" style="color:blue;" onclick="addCaiLiao();">新增</div></td>';
    tStr += '</tr>';

    for (var i = 0; i < orders.length - 1 ; i++) {
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        var h = 0;
        h = i + 1;
        tStr += '<tr height="35" style="text-align:center; font-size:12px;background-image: url("../../img/loading-upload.gif")" onclick = "bgChange(this)">';

        tStr += '<td>' + h + '</td>';
        tStr += '<td>' + order[9] + '</td>';
        tStr += '<td>' + order[7] + '</td>';
        tStr += '<td>' + order[8] + '</td>';
        tStr += '<td>' + order[11] + '</td>';
        if (order[12] == 1) {
            tStr += '<td align="left">';
            
            var getListTitle = order[13].split(',');
            if (getListTitle.length > 1) {
                for (var t = 0; t < getListTitle.length; t++) {

                    str = getListTitle[t]; //这是一字符串 
                    var strs = new Array(); //定义一数组 
                    strs = str.split("/"); //字符分割 

                    _str = strs[3]; //这是一字符串 
                    var _strs = new Array(); //定义一数组 
                    _strs = _str.split("["); //字符分割 
                    var _dddd = _strs[0];

                    var w = 0;
                    w = t + 1;
                    tStr += '' + w + ' <a href="http://106.14.67.1/' + getListTitle[t] + '" target="_blank" style="color:blue;">' + _dddd + '</a><br/>';

                }
            } else {
                tStr += '<a href="http://106.14.67.1/' + order[10] + '" target="_blank" style="color:blue;">' + order[5] + '</a><br/>';
            }

            //alert(getListTitle.length)


            tStr += '</td>'; 
        } else {
            tStr += '<td align="left"><a href="http://47.100.193.13/' + order[10] + '" target="_blank">' + order[5] + '</a></td>'; //旧地址
        }
        tStr += '<td>' + order[14] + '</td>';
        tStr += '<td>' + order[15] + '<span style="font-size:8px;color:green;">(更新)</span><br/>' + order[6] + '<span style="font-size:8px;color:gray;">(新增)</span></td>';
        tStr += '<td><span onclick="cailiao(' + order[0] + ');">修改</span><br/><span onclick="cailiaoDel(' + order[0] + ');" style="color:#CCC;">删除</span></td>';

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
function BindIniMData(MArea, MCountry, MVType, MCrowd, Count) {
    if (MArea == 0 && MCountry == 0 && MVType == 0 && MCrowd == 0) {
        $(".select-no").show();
    } else {
        $(".select-no").hide();
    }

    //绑定送签地区
    BindArea();

    //绑定国家
    //BindCountry();

    paging(Count, 9);

    chkk();
}

//绑定送签地区
function BindArea() {
    $.ajax({
        type: "GET",
        url: "/QuickQuery/GetAreaList",
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>送签地区：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,9);">全部</a></dd>';
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

//绑定送签地区 
function BindCountry(areaId) {
    $.ajax({
        type: "GET",
        url: "/MaterialsList/GetCountryList",
        data: "areaId=" + areaId,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var strAry = sesponseTest.split(",");
                var str = '<dt>签证国家：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,26);">全部</a></dd>';
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

//类型
function ShowSale1(SID) {
    var areaId = $("#MArea").val();
    $("#select5").empty();
    $.ajax({
        type: "GET",
        url: "/MaterialsList/GetVisaType",
        data: "SID=" + SID + "&AreaId=" + areaId,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var str = '<dt>签证类型：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,5);">全部</a></dd>';
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

//适合人群 
function ShowCrowd(SID) {
    var areaId = $("#MArea").val();
    var countryId = $("#MCountry").val();
    $("#select6").empty();
    $.ajax({
        type: "GET",
        url: "/MaterialsList/GetCrowd",
        data: "SID=" + SID + "&AreaId=" + areaId + "&CountryId=" + countryId,
        success: function (sesponseTest) {
            if (sesponseTest != "0") {
                var str = '<dt>适合人群：</dt><dd class="select-all selected"><a href="javascript:void(0);" onclick="Seach(0,6);">全部</a></dd>';
                var strAry = sesponseTest.split(",");
                var j = '';
                $.each(strAry, function (i, val) {
                    arr = val.split('|');
                    str += '<dd><a href="javascript:void(0);" onclick="Seach(' + arr[0] + ',6);">' + arr[1] + '</a></dd>';
                });
                $("#select6").append(str);

                $("#select6 dd").click(function () {
                    $(this).addClass("selected").siblings().removeClass("selected");
                    if ($(this).hasClass("select-all")) {
                        $("#selectM").remove();
                        $(".select-no").show();
                    } else {
                        var copyThisE = $(this).clone();
                        if ($("#selectM").length > 0) {
                            $("#selectM a").html($(this).text());
                        } else {
                            $(".select-no").hide();
                            copyThisE.attr("onclick", "del(this,6);");
                            $(".select-result dl").append(copyThisE.attr("id", "selectM"));
                            $("#selectM a").removeAttr("onclick");
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

//读取旗帜内容
function cailiao(mid) {
    if (mid == '') {
        asyncbox.tips('材料分类', 'alert');
        return;
    }

    var winUrl = '/MaterialsList/UpdateMaterial?mid=' + mid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '材料分类',
        url: winUrl,
        width: 600,
        height: 420
    });
}

//删除操作 读取旗帜内容
function cailiaoDel(mid) {
    if (mid == '') {
        asyncbox.tips('删除材料', 'alert');
        return;
    }

    var winUrl = '/MaterialsList/DelMaterial?mid=' + mid + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '删除材料分类',
        url: winUrl,
        width: 600,
        height: 420
    });
}


//读取旗帜内容
function addCaiLiao() {
    var winUrl = '/MaterialsList/AddMaterial';
    asyncbox.open({
        id: '123',
        title: '新增清单',
        url: winUrl,
        width: 600,
        height: 420
    });
}

