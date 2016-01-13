define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('jquery-1.11.3.min');
    /*slideX是用于对海报轮播进行的操作的对象：
    1、init中存放自动轮播、以及选中poster-viewer后停止自动轮播的函数；
    2、slideRight、slideAuto、slideStop定义了自动轮播、停止自动轮播操作的函数；
    */
    var slideX = {
        thisDiv: $(".poster-wrapper"),
        btnLeft: $(".poster-viewer .arrow-left"),
        btnRight: $(".poster-viewer .arrow-right"),
        btnChoice: $(".pagination-switch"),
        paginationDiv: $(".pagination"),
        thisA: $('.poster-wrapper a'),
        init: function() {
            // 当鼠标进入poster-viewer、选中左右滑动按钮及pagination按钮时，自动轮播停止
            slideX.btnChoice.eq(0).css('background-color', '#35b558');
            slideX.slideAuto();
            slideX.btnLeft.click(slideX.slideLeft).hover(slideX.slideStop, slideX.slideAuto);
            slideX.btnRight.click(slideX.slideRight).hover(slideX.slideStop, slideX.slideAuto);
            slideX.thisDiv.hover(slideX.slideStop, slideX.slideAuto);
            slideX.paginationDiv.hover(slideX.slideStop, slideX.slideAuto);
            slideX.slideChoose();
        },
        // 向左滑动时，先解绑点击事件，然后将此时位于最右侧的a标签添加至最左侧，并添加动作改变整个div的left属性值，在海报切换的过程通过if语句对pagination设置样式
        slideLeft: function() {
            slideX.btnLeft.unbind('click', slideX.slideLeft);
            slideX.thisDiv.find('a:last').prependTo(slideX.thisDiv);
            slideX.thisDiv.css('left', '-570px');
            slideX.thisDiv.animate({
                'left': 0
            }, 'normal', function() {
                var currentIndex = slideX.thisA.index();
                slideX.btnLeft.bind('click', slideX.slideLeft);
                // console.log(slideX.thisLi.index());
                if (currentIndex == 0) {
                    slideX.btnChoice.eq(0).css('background-color', '#35b558');
                    slideX.btnChoice.eq(1).css('background-color', '#ffffff')
                }
                if (currentIndex == 1) {
                    slideX.btnChoice.eq(5 - currentIndex).css('background-color', '#35b558');
                    slideX.btnChoice.eq(0).css('background-color', '#ffffff');
                } else {
                    slideX.btnChoice.eq(5 - currentIndex).css('background-color', '#35b558');
                    slideX.btnChoice.eq(6 - currentIndex).css('background-color', '#ffffff');
                }

            });
            // return false;
        },
        //向右滑动时，先解绑点击事件，然后改变poster-wrapper的left属性值，移动完成后将左移的a标签放置到最右侧，在海报切换的过程通过if语句对pagination设置样式 
        slideRight: function() {
            slideX.btnRight.unbind('click', slideX.slideRight);
            slideX.thisDiv.animate({
                'left': '-570px'
            }, 'normal', function() {
                slideX.thisDiv.css('left', '0');
                slideX.thisDiv.find('a:first').appendTo(slideX.thisDiv);
                slideX.btnRight.bind('click', slideX.slideRight);
                var currentIndex = slideX.thisA.index();
                if (currentIndex != 0) {
                    slideX.btnChoice.eq(5 - currentIndex).css('background-color', '#35b558');
                    slideX.btnChoice.eq(4 - currentIndex).css('background-color', '#ffffff');
                } else {
                    slideX.btnChoice.eq(0).css('background-color', '#35b558');
                    slideX.btnChoice.eq(4).css('background-color', '#ffffff');
                }
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
        },
        // 当鼠标对pagination-switch进行操作时，图片跳转至对应的图片；
        // 主要分为三种情况讨论，当当前显示图片为第一张时，则向右移动的距离即选中的按钮乘以570px，同时将左移的a标签依次添加到最右侧；
        // 当选中的开关所在位置大于当前显示的图片位置时，则向右移动的距离为两者之差乘以570px，同时将左移的a标签依次添加到最右侧；
        // 当选中的开关位置小于当前显示的图片位置时，将此时位于右侧的a标签依次放到最左侧，向左移动的距离为两者之差乘以570px；
        slideChoose: function() {
            slideX.btnChoice.each(function(index) {
                $(this).click(function() {
                    var a1Index = slideX.thisA.index();
                    var slideLeftLength, slideRightLength;
                    var currentShowIndex = 5 - a1Index;
                    $(this).css('background-color', '#35b558');
                    slideX.btnChoice.eq(currentShowIndex).css('background-color', '#ffffff');
                    if (a1Index == 0) {
                        slideX.thisDiv.animate({
                            'left': (-1) * index * 570 + 'px'
                        }, 'normal', function() {
                            for (var i = index; i > 0; i--) {
                                slideX.thisDiv.find('a:first').appendTo(slideX.thisDiv);
                            }
                            slideX.thisDiv.css('left', '0');
                            slideX.btnChoice.eq(0).css('background-color', '#ffffff');
                        });

                    }
                    if (a1Index != 0) {
                        if (index > currentShowIndex) {
                            slideX.thisDiv.animate({
                                'left': (-1) * (index - currentShowIndex) * 570 + 'px'
                            }, 'normal', function() {
                                for (var i = (index - currentShowIndex); i > 0; i--) {
                                    slideX.thisDiv.find('a:first').appendTo(slideX.thisDiv);
                                }
                                slideX.thisDiv.css('left', '0');
                            });
                        }
                        if (index < currentShowIndex) {
                            for (var i = currentShowIndex - index; i > 0; i--) {
                                slideX.thisDiv.find('a:last').prependTo(slideX.thisDiv);
                            }
                            slideX.thisDiv.css('left', (currentShowIndex - index) * (-1) * 570 + 'px');
                            slideX.thisDiv.animate({
                                'left': 0
                            }, 'normal', function() {

                            });
                        }
                    }
                });
            });
        }
    };

    // 通过 exports 对外提供接口
    // exports.doSomething = ...

    // 或者通过 module.exports 提供整个接口
    module.exports = slideX;

});
