define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('../jquery-1.11.3.min');
    // 监听编辑按钮的点击事件，当点击时，从management-main中传入newsClass的值，然后在从表格中依次获取新闻的标题、内容、图片地址、添加事件并将这些内容添加到编辑页面相应的input标签中
    function updateNews(newsClass) {
        $('.btn-update').each(function(index) {
            $(this).click(function() {
                newsId = $('td').eq(6 * index).text();
                // newsClass = "local";
                $('#update-newstitle').val($('td').eq(6 * index + 2).text());
                $('#update-newsclass').val(newsClass);
                $('#update-newscontent').val($('td').eq(6 * index + 3).text());
                $('#update-newsimg').val($('td').eq(6 * index + 1).children().attr('src'));
                var thisAddTime = $('td').eq(6 * index + 4).text();
                thisAddTime = thisAddTime.substring(0, 10);
                console.log(thisAddTime);
                $('#update-addtime').val(thisAddTime);
                $('.masking').fadeIn();
                $('.update-wrapper').fadeIn();
                $('#update-status').text('');
            });
        });
    }
    // 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = updateNews;
});
