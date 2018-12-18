var progressBarZone = document.getElementById('progressBarZone');

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum);
            break;
        default:
            return 0;
            break;
    }
}

function sendFile(files) {
    if (!files || files.length < 1) {
        return;
    }

    var percent = document.createElement('div');
    progressBarZone.appendChild(percent);

    var formData = new FormData();             // 创建一个表单对象FormData
    formData.append('submit', '中文');  // 往表单对象添加文本字段

    var fileNames = '';
    var fname = '';
    var title = randomNum(1000, 9999);

    for (var i = 0; i < files.length; i++) {
        var file = files[i];    // file 对象有 name, size 属性

        formData.append('file[' + i + ']', file);       // 往FormData对象添加File对象

        fileNames += '《' + file.name + '》， ';
        var abc = file.name.split('.');
        fname = abc[0] + '_chat' + title + '.' + abc[1];
    }

    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress',
           function uploadProgress(evt) {
               // evt 有三个属性：
               // lengthComputable – 可计算的已上传字节数
               // total – 总的字节数
               // loaded – 到目前为止上传的字节数
               if (evt.lengthComputable) {
                   //percent.innerHTML = fileNames + ' upload percent :' + Math.round((evt.loaded / evt.total) * 100) + '%';
               }
           }, false); // false表示在事件冒泡阶段处理

    xhr.upload.onload = function () {
        str = fname + '|' + 'pic|' + fileNames;
        //var str = fileNames + '文件';
        $('#ChatCore_write').val(str);
        $("#ChatCore_sendbtn").click();
    };

    xhr.upload.onerror = function (e) {
        percent.innerHTML = fileNames + ' 上传失败。';
    };

    xhr.open('post', '/Test/Upload?title=' + title, true);
    xhr.send(formData);            // 发送表单对象。
}

document.addEventListener("dragover", function (e) {
    e.stopPropagation();
    e.preventDefault();            // 必须调用。否则浏览器会进行默认处理，比如文本类型的文件直接打开，非文本的可能弹出一个下载文件框。
}, false);

document.addEventListener("drop", function (e) {
    e.stopPropagation();
    e.preventDefault();            // 必须调用。否则浏览器会进行默认处理，比如文本类型的文件直接打开，非文本的可能弹出一个下载文件框。
    var str = $("#ChatCore_chatbox").html();
    if (str != null) {
        sendFile(e.dataTransfer.files);
    } else {
        alert("错误！请选择需要发送文件的联系人！");
    }
}, false);


function doPaste() {
    pasterTool.paste();
}

var Config = {
    Paths: {},
    isMac: false,
    Resources: null
};

Config.Resources = {
    makeImage: '/Home/PasteImage',
};

var State = {
    isPasting: false,
    pasterAdded: false,
    pasterReady: false,
    pasteComplete: false,
    pasteId: 0
};
var pasteCount = 0;
function isUrl(a) {
    var b = /(ftp|http|https):\/\/(\w+:{0,1}\w*@@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@@!\-\/]))?/;
    return b.test(a);
};
var pasterTool = {
    data: "",
    mode: 0,
    processAsHtml: function (b) {
        var a = b.clipboardData.getData("text/html");
        if (a) {
            $("#pasteCapture").html(a);
            if ($("#pasteCapture img").length) {
                pasterTool.data = $("#pasteCapture img:first").attr("src");
                pasterTool.mode = 2;
                pasterTool.process();
                return true;
            } else {
                if ($("#pasteCapture a").length) {
                    pasterTool.data = $("#pasteCapture a:first").attr("href");
                    pasterTool.mode = 2;
                    pasterTool.process();
                    return true;
                }
            }
        }
        return false;
    },
    processAsText: function (b) {
        var a = b.clipboardData.getData("text/plain");
        if (a) {
            if (isUrl(a)) {
                pasterTool.data = a;
                pasterTool.mode = 2;
                pasterTool.process();
                return true;
            }
        }
        return false;
    },
    checkEditableArea: function () {
        $("#pasteCapture").html("");
        (function () {
            var e = null;
            var c = 50;
            var d = 500;
            var b = function () {
                clearInterval(e);
                $("#pasteCapture").attr("contenteditable", false);
                $("#pasteCapture").blur();
                $("#pasteCapture").attr("contenteditable", true);
            };
            var a = function () {
                if ($("#pasteCapture").html().length > 0) {
                    b();
                    if ($("#pasteCapture img").length) {
                        var h = $("#pasteCapture img:first").attr("src");
                        var g = "data";
                        var f = "file";
                        var i = "webkit-fake-url";
                        if (h.substring(0, g.length) === g) {
                            pasterTool.data = h.substr(h.indexOf(",") + 1);
                            pasterTool.mode = 1;
                            pasterTool.process();
                        } else {
                            if (h.substring(0, f.length) === f) {
                                State.isPasting = false;
                            } else {
                                if (h.substring(0, i.length) === i) {
                                    State.isPasting = false;

                                } else {
                                    pasterTool.data = h;
                                    pasterTool.mode = 2;
                                    pasterTool.process();
                                }
                            }
                        }
                    } else {
                        if (isUrl($("#pasteCapture").html())) {
                            pasterTool.data = $("#pasteCapture").html();
                            pasterTool.mode = 2;
                            pasterTool.process();
                        } else {
                            State.isPasting = false;
                        }
                    }
                } else {
                    d -= c;
                    if (d <= 0) {
                        b();
                        State.isPasting = false;
                    }
                }
            };
            e = setInterval(a, c);
        })();
    },
    paste: function (d) {
        var str = $("#ChatCore_chatbox").html();
        if (str != null) {
            pasteCount--;
            if (State.isPasting) {
                return;
            }
            State.isPasting = true;
            d = d.originalEvent;
            if (d && d.clipboardData) {
                if (d.clipboardData.items) {
                    if (d.clipboardData.items.length == 0) {
                        State.isPasting = false;
                        return;
                    }
                    for (var b = 0; b < d.clipboardData.items.length; b++) {
                        var c = d.clipboardData.items[b];
                        if (c.type == "image/png") {
                            pasterTool.mode = 1;
                            var a = new FileReader();
                            a.onloadend = function () {
                                pasterTool.data = this.result.substr(this.result.indexOf(",") + 1);
                                pasterTool.process();
                            };
                            a.readAsDataURL(c.getAsFile());
                            break;
                        } else {
                            if (c.type == "text/html") {
                                if (pasterTool.processAsHtml(d)) {
                                    State.isPasting = false;
                                    break;
                                } else {
                                    State.isPasting = false;
                                }
                            } else {
                                if (c.type == "text/plain") {
                                    if (pasterTool.processAsText(d)) {
                                        State.isPasting = false;
                                        break;
                                    } else {
                                        State.isPasting = false;
                                    }
                                } else {
                                    State.isPasting = false;
                                }
                            }
                        }
                    }
                } else {
                    if (!(pasterTool.processAsHtml(d) || pasterTool.processAsText(d))) {
                        pasterTool.checkEditableArea();
                    }
                }
            } else {
                pasterTool.checkEditableArea();
            }
        } else {
            alert("错误！请选择需要发送文件的联系人！");
        }
    },
    process: function () {
        State.isPasting = true;
        var a = Config.Resources.makeImage;
        $.post(a, pasterTool.data,
            function (b) {
                State.isPasting = false;
                onPasteComplete(b);
            });
    }
};

function onPasteComplete(data) {
    var sdata = data.split('/');
    var dname = sdata[4];
    //var dat = data;
    //$("#imgDiv").append("<input type='image' src='" + data + "'/>");
    str = dname + '|' + 'pics|《 桌面截屏 》，';
    //var str = fileNames + '文件';
    $('#ChatCore_write').val(str);
    $("#ChatCore_sendbtn").click();
}

function focusPasteArea() {
    $("#pasteCapture").focus();
}

$(document).ready(function () {
    $("<div/>").attr({
        "id": "pasteCapture",
        "contenteditable": "true",
        "_moz_resizing": "false"
    }).css({
        "position": "absolute",
        "height": "1",
        "width": "0",
        "top": "-9999",
        "left": "-9999",
        "outline": "0",
        "overflow": "auto",
        "opacity": "0",
        "z-index": "-9999"
    }).prependTo("body");
    $("body").bind("paste", pasterTool.paste);
    focusPasteArea();
    //$(document).bind("keydown", "ctrl+v", focusPasteArea);
});