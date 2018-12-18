
//自动加载数据
function BindData() {
    chk();
}

function chk(TDID) {
    $.ajax({
        type: "POST",
        url: "/OrderPackage/PagesAjax",
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
        var h = i + 1;
        var orderList = orders[i].split('&{');
        var order = orderList[0].split('&,');
        tStr += '<tr style="height:50px;">';
        //tStr += '<td style="text-align:center;width:5px;"></td>';
        tStr += '<td style="text-align:center;width:130px;">' + order[6] + '<br>' + h + '.<span onclick="updateCountry(' + order[0] + ');" style="color:#0000FF;">' + order[1] + '[' + order[7] + ']</span><br>排序' + order[5] + '<br>' + order[3] + '<br>' + order[4] + '</td>';
        if (orderList[1] != "") {
            var cashs = orderList[1].split('&}');
            tStr += '<td style="text-align:left;">';
            for (var j = 0; j < cashs.length - 1 ; j++) {
                var cash = cashs[j].split('&,');
                var h = j + 1;
                tStr += '<table><tr style="height:20px;"><td style="width:300px;">' + cash[10] + '<span onclick="updatePackage(' + cash[0] + ');" style="color:#0000FF;">系统套餐：' + h + '.' + cash[3] + '</span></td><td style="width:480px;" >天猫套餐：' + cash[8] + '</td><td style="color:#CCC;">套餐参数：算<span style="color:#9A9AFD;font-size:16px;"> ' + cash[4] + ' </span>份，' + cash[6] + '，' + cash[7] + '，排序' + cash[9] + '，客服' + cash[11] + '计量' + cash[12] + ' ' + cash[13] + ' ' + cash[14] +'</td></tr></table>';
            }
            tStr += '</td>';
        }
        else {
            tStr += '<td style="text-align:left;">&nbsp;</td>';
        }

        tStr += '<td style="text-align:center;width:80px;"><span onclick="updateMessage(' + order[0] + ');">调整</span></td>';
        tStr += '</tr>';

    }
    $("#t tbody").html(tStr);
    $('.footable').footable();
    $('.footable2').footable();
}

function updateCountry(Id) {
    if (Id == '') {
        asyncbox.tips('修改国家参数', 'alert');
        return;
    }
    var winUrl = '/OrderPackage/updateSaveCountry?Id=' + Id + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '修改套餐参数',
        url: winUrl,
        width: 650,
        height: 500
    });
}


function updatePackage(cpId) {
    if (cpId == '') {
        asyncbox.tips('修改套餐参数', 'alert');
        return;
    }
    var winUrl = '/OrderPackage/updateSavePackage?cpId=' + cpId + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '修改套餐参数',
        url: winUrl,
        width: 650,
        height: 500
    });
}


//修改
function updateMessage(countryId) {
    if (countryId == '') {
        asyncbox.tips('修改关联套餐', 'alert');
        return;
    }
    var winUrl = '/OrderPackage/UpdatePackage?countryId=' + countryId + "&version=" + (new Date()).getTime();
    asyncbox.open({
        id: '123',
        title: '修改关联套餐',
        url: winUrl,
        width: 750,
        height: 600
    });
}