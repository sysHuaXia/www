//��ҳ��װ��ʱ�������е�td��ӵ�е���¼�
$(document).ready(function () {
    //�ҵ�����td�ڵ�
    var tds = $("td");
    //�����е�td�ڵ����ӵ���¼�
    tds.click(tdclick);
});

function tdclick() {
    var clickfunction = this;
    //0,��ȡ��ǰ��td�ڵ�
    var td = $(this);
    //1,ȡ����ǰtd�е��ı����ݱ�������
    var text = $(this).text();
    //2�����td�����ͬ
    td.html("");
    //3,����һ���ı���Ҳ���ǽ�һ��input�ڵ�
    var input = $("<input>");
    //4,�����ı�����ֵ�Ǳ����������ı�����
    input.attr("value", text);
    //4.5���ı��������Ӧ���̰��µ��¼�
    input.keyup(function (event) {
        //��������ǰ�û����µļ�ֵ
        var myEvent = event || window.event;//��ȡ��ͬ������е�event����
        var kcode = myEvent.keyCode;
        //�ж��Ƿ��ǻس�������
        if (kcode == 13) {
            var inputnode = $(this);
            //��ȡ��ǰ�ı��������
            var inputext = inputnode.val();
            //���td��ߵ�����,Ȼ��������䵽���
            var tdNode = inputnode.parent();
            tdNode.html(inputext);
            //��td����ӵ�е���¼�
            tdNode.click(tdclick);
        }
    });
    //5�����ı�����뵽td���ȥ
    td.append(input);
    //5.5���ı�����ߵ����±�����ѡ��
    //��Ҫ��jquery�Ķ���ת����dom����
    var inputdom = input.get(0);
    inputdom.select();

    //6,��Ҫ���td�ϵĵ���¼�
    td.unbind("click");
}