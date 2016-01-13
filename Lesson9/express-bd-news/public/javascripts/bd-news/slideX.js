define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('../jquery-1.11.3.min');
    // slideRight可以实现图片的单词向右滚动；
    // 通过slideAuto每间隔3s图片向右轮换一张；
    var slideX = {
        thisDiv: $(".rec-img-tab"),
        thisA: $('.rec-img-tab a'),
        init: function() {
            // 当鼠标进入poster-viewer、选中左右滑动按钮及pagination按钮时，自动轮播停止
            slideX.slideAuto();
            slideX.thisDiv.hover(slideX.slideStop, slideX.slideAuto);
        },

        //向右滑动时，先解绑点击事件，然后改变poster-wrapper的left属性值，移动完成后将左移的a标签放置到最右侧，在海报切换的过程通过if语句对pagination设置样式 
        slideRight: function() {
            slideX.thisDiv.children().animate({
                'left': '-355px'
            }, '2000', function() {
                slideX.thisDiv.children().css('left', '0');
                slideX.thisDiv.children().find('a:first').appendTo(slideX.thisDiv.children('.img-tab'));
            });
            // return false;
        },
        // 当鼠标没有进入poster-viewer时，页面进行自动播放，自动播放的方式是每间隔3s，图片向右移动一次
        slideAuto: function() {
            slideX.intervalId = window.setInterval(slideX.slideRight, 3000);
        },
        // 当鼠标进入poster-viewer、选中左右滑动按钮及pagination按钮时，清除自动轮播
        slideStop: function() {
            window.clearInterval(slideX.intervalId);
        }
    };
    // 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = slideX;
});
