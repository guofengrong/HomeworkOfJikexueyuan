/**
 * Created by guofengrong on 15/10/26.
 */
var dataImg = {
    "data": [{
        "src": "1.jpg"
    }, {
        "src": "1.jpg"
    }, {
        "src": "2.jpg"
    }, {
        "src": "3.jpg"
    }, {
        "src": "4.jpg"
    }, {
        "src": "10.jpg"
    }]
};
$(document).ready(function() {
    $(window).on("load", function() {
        imgLocation();
        //当点击回到顶部的按钮时，页面回到顶部
        $("#back-to-top").click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
        $(window).scroll(function() {
            //当页面滚动大于100px时，右下角出现返回页面顶端的按钮，否则消失
            if ($(window).scrollTop() > 100) {
                $("#back-to-top").show(500);
                //$("#back-to-top").css("top",($(window).height()+$(window).scrollTop()-50));
            } else {
                $("#back-to-top").hide(500);
            }
            //当返回true时，图片开始自动加载，加载的图片通过调用imgLocation函数进行瀑布流式的摆放
            if (picAutoLoad()) {
                $.each(dataImg.data, function(index, value) {
                    var box = $("<div>").addClass("pic-box").appendTo($(".content"));
                    var pic = $("<div>").addClass("pic").appendTo(box);
                    var img = $("<img>").attr("src", "./img/" + $(value).attr("src")).appendTo(pic);
                });
                imgLocation();
            }
        });
    });
});
//用于摆放图片的函数：
// 先计算当前页面下，横向摆放图片的张数，当当前所需要摆放的图片的序号小于该数字时，则依次向左浮动摆放；
// 当超过这一数字时，则需要找到已经摆放的图片中最小高度的值（摆放图片的高度存放于数组boxHeightArr中），并在数组中找到具有最小高度的图片的位置；
//然后对需要摆放的图片设置位置信息进行摆放，摆放完成后将数组中的最小高度加上当前摆放图片的高度，然后进行下一次摆放
function imgLocation() {
    var picBox = $('.pic-box');
    var boxWidth = picBox.eq(0).width();
    var contentWidth = $('.content').width();
    // console.log(contentWidth);
    var num = Math.floor(contentWidth / boxWidth);
    var boxHeightArr = [];
    picBox.each(function(index, value) {
        var boxHeight = picBox.eq(index).height();
        if (index < num) {
            boxHeightArr[index] = boxHeight;
        } else {
            var minBoxHeight = Math.min.apply(null, boxHeightArr);
            var minHeightIndex = $.inArray(minBoxHeight, boxHeightArr);
            $(value).css({
                "position": "absolute",
                "top": minBoxHeight,
                "left": picBox.eq(minHeightIndex).position().left
            });
            boxHeightArr[minHeightIndex] += picBox.eq(index).height();
        }
    });
}
//用于自动加载图片用：
//lastBoxHeight获取最后一个图片的高度；
//当最后一张图片的高度小于鼠标滚轮滚过的距离加上显示器高度的时候，则放回true，否则返回false；
function picAutoLoad() {
    var box = $('.pic-box');
    var lastBoxHeight = box.last().get(0).offsetTop + Math.floor(box.last().height() / 2);
    var windowHeight = $(window).height();
    var scrollHeight = $(window).scrollTop();
    return (lastBoxHeight < windowHeight + scrollHeight) ? true : false;
}
