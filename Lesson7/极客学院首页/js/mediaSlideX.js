define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('jquery-1.11.3.min');
    /*mediaSlideX是用于对合作伙伴操作的对象：
      1、init存放左右滑动需要执行的函数；
      2、slideLeft、slideRigth定义了选中向左或向右按钮后执行的操作函数；
      */
    var mediaSlideX = {
        div: $(".media-box"),
        a: $(".media-box a"),
        btnLeft: $(".media .arrow-left"),
        btnRight: $(".media .arrow-right"),
        init: function() {
            mediaSlideX.btnLeft.click(mediaSlideX.slideLeft);
            mediaSlideX.btnRight.click(mediaSlideX.slideRight);
        },
        slideLeft: function() {
            mediaSlideX.btnLeft.unbind('click', mediaSlideX.slideLeft);
            mediaSlideX.div.find('a:last').prependTo(mediaSlideX.div);
            mediaSlideX.div.css('left', '-150px');
            mediaSlideX.div.animate({
                'left': 0
            }, 'normal', function() {
                mediaSlideX.btnLeft.bind('click', mediaSlideX.slideLeft);
            });
        },
        slideRight: function() {
            mediaSlideX.btnRight.unbind('click', mediaSlideX.slideRight);
            mediaSlideX.div.animate({
                'left': '-150px'
            }, 'normal', function() {
                mediaSlideX.div.find('a:first').appendTo(mediaSlideX.div);
                mediaSlideX.div.css('left', 0);
                mediaSlideX.btnRight.bind('click', mediaSlideX.slideRight);
            });
        }
    };

    // 或者通过 module.exports 提供整个接口
    module.exports = mediaSlideX;

});
