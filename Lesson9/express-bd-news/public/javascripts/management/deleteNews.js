define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('../jquery-1.11.3.min');

    // 监听删除按钮的点击事件，当发生点击时，显示蒙版并且弹出确认删除的对话框，同事将上一次的操作结果内容置空；
    function deleteNews() {
        $('.btn-delete').each(function(index) {
            $(this).click(function() {
                var newsId = $('td').eq(6 * index).text();
                // newsClass = "entertainment";
                $('#btn-wrapper').show();
                $('#delete-status').text('');
                $('.masking').fadeIn();
                $('.confirm-delete').fadeIn();
            });
        });
    }
    // 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = deleteNews;
});
