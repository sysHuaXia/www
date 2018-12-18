$(function () {
    GetInfoCount();
    GetSupplierCount();
    GetStoreCount();
    GetNoticeCount();
    GetTaskCount();
});

function GetInfoCount() {
    var params = "{UserID:'" + UserID + "'}";
    $.ajax({
        type: "post",
        url: "/Home/CustomFollowUpsCount",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var data = eval("(" + d.d + ")");
            $("#spAccount").html("" + d + "");
        }       
    });
    //setTimeout(GetInfoCount, 200000);
}

function GetSupplierCount() {
    //var params = "{SupplierType:'" + SupplierType + "'}";
    $.ajax({
        type: "post",
        url: "/SysPublic/GetSupplierCount",
        //data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            $("#spSupplier").html("" + d + "");
        }
    });
}

function GetStoreCount() {
    //var params = "{SupplierType:'" + SupplierType + "'}";
    $.ajax({
        type: "post",
        url: "/SysPublic/GetStoreCount",
        //data: params,  
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            $("#spStore").html("" + d + "");
        }
    });
}


function GetNoticeCount() {
    var params = "{ItemID:'" + ItemID + "'}";
    $.ajax({
        type: "post",
        url: "/SysPublic/GetNoticeCount",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var data = eval("(" + d.d + ")");
            $("#spNotice").html("" + d + "");
        }
    });
}

//记录任务数目
function GetTaskCount() {
    var params = "{ItemID:'" + CodeId + "'}";
    $.ajax({
        type: "post",
        url: "/SysPublic/SysTaskCount",
        data: params,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (d) {
            var data = eval("(" + d.d + ")");
            $("#spSysTask").html("" + d + "");
        }
    });
}
