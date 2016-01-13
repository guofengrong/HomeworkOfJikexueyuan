define(function(require, exports, module) {
    require('../jquery-1.11.3.min');
    var clearContent = require('./clearContent');
    // 当填写好新闻信息点击提交时，将相应的数据传送到数据库中，并且在传送成功后在页面上显示提交成功
    function addNews() {
        $("#send").click(function() {
            newsTitle = $('#newstitle').val();
            newsContent = $('#newscontent').val();
            addTime = $('#addtime').val();
            if (newsTitle == '' || newsContent == '' || addTime == '') {
                $("#submit-status").text('请正确输入信息');
            } else {
                $.ajax({
                    type: "post",
                    url: "/management/addNews",
                    data: {
                        "newstitle": $("#newstitle").val(),
                        "newsclass": $('#newsclass').val(),
                        "newsimg": $("#newsimg").val(),
                        "newscontent": $("#newscontent").val(),
                        "addtime": $("#addtime").val()
                    },
                    success: function(data) {
                        $('.masking').fadeIn();
                        $('#success').fadeIn();
                        setTimeout(clearContent, 2000);
                    }
                });
            }
        });
    }
    // 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = addNews;
});
