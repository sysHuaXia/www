//在页面装载时，让所有的td都拥有点击事件
$(document).ready(function () {
    //找到所有td节点
    var tds = $("td");
    //给所有的td节点增加点击事件
    tds.click(tdclick);
});

function tdclick() {
    var clickfunction = this;
    //0,获取当前的td节点
    var td = $(this);
    //1,取出当前td中的文本内容保存起来
    var text = $(this).text();
    //2，清空td里边内同
    td.html("");
    //3,建立一个文本框，也就是建一个input节点
    var input = $("<input>");
    //4,设置文本框中值是保存起来的文本内容
    input.attr("value", text);
    //4.5让文本框可以相应键盘按下的事件
    input.keyup(function (event) {
        //记牌器当前用户按下的键值
        var myEvent = event || window.event;//获取不同浏览器中的event对象
        var kcode = myEvent.keyCode;
        //判断是否是回车键按下
        if (kcode == 13) {
            var inputnode = $(this);
            //获取当前文本框的内容
            var inputext = inputnode.val();
            //清空td里边的内容,然后将内容填充到里边
            var tdNode = inputnode.parent();
            tdNode.html(inputext);
            //让td重新拥有点击事件
            tdNode.click(tdclick);
        }
    });
    //5，把文本框加入到td里边去
    td.append(input);
    //5.5让文本框里边的文章被高亮选中
    //需要将jquery的对象转换成dom对象
    var inputdom = input.get(0);
    inputdom.select();

    //6,需要清楚td上的点击事件
    td.unbind("click");
}