define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('jquery-1.11.3.min');
    /*partnerSlideX是用于对合作伙伴操作的对象：
    1、init存放左右滑动需要执行的函数；
    2、slideLeft、slideRigth定义了选中向左或向右按钮后执行的操作函数；
    */
    var partnerSlideX = {
        div: $(".partner-box"),
        a: $(".partner-box a"),
        btnLeft: $(".partner .arrow-left"),
        btnRight: $(".partner .arrow-right"),
        init: function() {
            partnerSlideX.btnLeft.click(partnerSlideX.slideLeft);
            partnerSlideX.btnRight.click(partnerSlideX.slideRight);
        },
        slideLeft: function() {
            partnerSlideX.btnLeft.unbind('click', partnerSlideX.slideLeft);
            partnerSlideX.div.find('a:last').prependTo(partnerSlideX.div);
            partnerSlideX.div.css('left', '-150px');
            partnerSlideX.div.animate({
                'left': 0
            }, 'normal', function() {
                partnerSlideX.btnLeft.bind('click', partnerSlideX.slideLeft);
            });
        },
        slideRight: function() {
            partnerSlideX.btnRight.unbind('click', partnerSlideX.slideRight);
            partnerSlideX.div.animate({
                'left': '-150px'
            }, 'normal', function() {
                partnerSlideX.div.find('a:first').appendTo(partnerSlideX.div);
                partnerSlideX.div.css('left', 0);
                partnerSlideX.btnRight.bind('click', partnerSlideX.slideRight);
            });
        }
    };

    // 或者通过 module.exports 提供整个接口
    module.exports = partnerSlideX;

});
