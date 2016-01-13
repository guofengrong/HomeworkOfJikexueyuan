define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('jquery-1.11.3.min');

    /*universitySlideX是用于对合作伙伴操作的对象：
    1、init存放左右滑动需要执行的函数；
    2、slideLeft、slideRigth定义了选中向左或向右按钮后执行的操作函数；
    */
    var universitySlideX = {
        div: $(".university-box"),
        a: $(".university-box a"),
        btnLeft: $(".university .arrow-left"),
        btnRight: $(".university .arrow-right"),
        init: function() {
            universitySlideX.btnLeft.click(universitySlideX.slideLeft);
            universitySlideX.btnRight.click(universitySlideX.slideRight);
        },
        slideLeft: function() {
            universitySlideX.btnLeft.unbind('click', universitySlideX.slideLeft);
            universitySlideX.div.find('a:last').prependTo(universitySlideX.div);
            universitySlideX.div.css('left', '-150px');
            universitySlideX.div.animate({
                'left': 0
            }, 'normal', function() {
                universitySlideX.btnLeft.bind('click', universitySlideX.slideLeft);
            });
        },
        slideRight: function() {
            universitySlideX.btnRight.unbind('click', universitySlideX.slideRight);
            universitySlideX.div.animate({
                'left': '-150px'
            }, 'normal', function() {
                universitySlideX.div.find('a:first').appendTo(universitySlideX.div);
                universitySlideX.div.css('left', 0);
                universitySlideX.btnRight.bind('click', universitySlideX.slideRight);
            });
        }
    };
    // 或者通过 module.exports 提供整个接口
    module.exports = universitySlideX;

});
