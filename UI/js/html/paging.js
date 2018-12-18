function paging(Count, hs) {
    var pagesize = 10;
    var pagecount = ((Count % pagesize == 0) ? (Count / pagesize) : Math.ceil(Count / pagesize));
    pagecount = Number(pagecount);
    var NowPage = Number($("#Page").val());
    var prvePage = NowPage - 1;
    var nextPage = NowPage + 1;

    var str = "";
    if (Count > 0) {
        str = '<tr><td colspan="' + hs + '" class="footable-visible"><div style="text-align:center;">';
        str += '<div><span class="Hpage">共' + Count + '条&nbsp;&nbsp;&nbsp;<span>第' + NowPage + '页</span>/共 ' + pagecount + '页' + '</span>'
        if (NowPage == 1) {
            str += '<span class="Hpage" onclick="ShowError(1);">首页</span>';
            str += '<span class="previous-off" style="padding:3px 6px;" onclick="ShowError(1);">上一页</span>';
        } else {
            str += '<span class="Hpage" onclick="Seach(1,99);">首页</span>';
            str += '<span style="padding:3px 6px;" onclick="Seach(' + prvePage + ',99);">上一页</span>';
        }
        MaxPage = NowPage + 9;
        BeginPage = NowPage;
        if (MaxPage > pagecount) {
            MaxPage = pagecount;
            if (MaxPage > 9) {
                BeginPage = pagecount - 9;
            } else {
                BeginPage = 1;
            }
        }
        for (var i = BeginPage; i <= MaxPage; i++) {
            if (NowPage == i) {
                str += '<span class="Hactive" style="border:solid 1px #9aafe5; color:#888888; font-weight:bold; padding:3px 6px;">' + i + '</span>';
            } else {
                str += '<span style="padding:3px 6px;" onclick="Seach(' + i + ',99);">' + i + '</span>';
            }
        }
        if (NowPage == pagecount) {
            str += '<span style="padding:3px 6px;" onclick="ShowError(2);">下一页</span>';
            str += '<span class="Hpage" onclick="ShowError(2);">尾页</span>';
        } else {
            str += '<span style="padding:3px 6px;" onclick="Seach(' + nextPage + ',99);">下一页</span>';
            str += '<span class="Hpage" onclick="Seach(' + pagecount + ',99);">尾页</span>';
        }
        str += '</div>';
        str += '</div></td></tr>';
    }

    $("#t tfoot").html(str);
    window.scrollTo(0, 0);
}

function paging1(Count, hs, TDID) {
    var pagesize = 10;
    var pagecount = ((Count % pagesize == 0) ? (Count / pagesize) : Math.ceil(Count / pagesize));
    pagecount = Number(pagecount);
    var NowPage = Number($("#Page").val());
    var prvePage = NowPage - 1;
    var nextPage = NowPage + 1;

    var str = "";
    if (Count > 0) {
        str = '<tr><td colspan="' + hs + '" class="footable-visible"><div style="text-align:center;">';
        str += '<div><span class="Hpage">共' + Count + '条&nbsp;&nbsp;&nbsp;<span>第' + NowPage + '页</span>/共' + pagecount + '页</span>'
        if (NowPage == 1) {
            str += '<span class="Hpage" onclick="ShowError(1);">首页</span>';
            str += '<span class="previous-off" style="padding:3px 6px;" onclick="ShowError(1);"><a>上一页</a></span>';
        } else {
            str += '<span class="Hpage" onclick="Seach(1,99,' + TDID + ');">首页</span>';
            str += '<span style="padding:3px 6px;" onclick="Seach(' + prvePage + ',99,' + TDID + ');"><a>上一页</a></span>';
        }
        MaxPage = NowPage + 9;
        BeginPage = NowPage;
        if (MaxPage > pagecount) {
            MaxPage = pagecount;
            if (MaxPage > 9) {
                BeginPage = pagecount - 9;
            } else {
                BeginPage = 1;
            }
        }
        for (var i = BeginPage; i <= MaxPage; i++) {
            if (NowPage == i) {
                str += '<span class="Hactive" style="border:solid 1px #9aafe5; color:#888888; font-weight:bold; padding:3px 6px;"><a>' + i + '</a></span>';
            } else {
                str += '<span style="padding:3px 6px;" onclick="Seach(' + i + ',99,' + TDID + ');">' + i + '</span>';
            }
        }
        if (NowPage == pagecount) {
            str += '<span style="padding:3px 6px;" onclick="ShowError(2);"><a>下一页</a></span>';
            str += '<span class="Hpage" onclick="ShowError(2);">尾页</span>';
        } else {
            str += '<span style="padding:3px 6px;" onclick="Seach(' + nextPage + ',99,' + TDID + ');"><a>下一页</a></span>';
            str += '<span class="Hpage" onclick="Seach(' + pagecount + ',99,' + TDID + ');">尾页</span>';
        }
        str += '</div>';
        str += '</div></td></tr>';
    }

    $("#t" + TDID + " tfoot").html(str);
    window.scrollTo(0, 0);
}

function ShowError(TDID) {
    if (TDID == 1) {
        swal('错误...', '已经在首页！', 'error');
    } else {
        swal('错误...', '已经在尾页！', 'error');
    }
}