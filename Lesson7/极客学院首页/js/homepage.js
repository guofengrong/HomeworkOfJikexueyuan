define(function(require, exports, module) {

    // 通过 require 引入依赖
    require('jquery-1.11.3.min');
    //引入外部模块
    var slideX = require('./slideX');
    var partnerSlideX = require('./partnerSlideX');
    var universitySlideX = require('./universitySlideX');
    var mediaSlideX = require('./mediaSlideX');
    $(document).ready(function() {
        // 监听消息图标点击事件
        $(".my-message").click(function() {
            $(".message-box-wrapper").slideToggle();
        });
        // 绑定鼠标悬停在user-mennu上和离开user-menu时的事件
        $(".user-menu").hover(
            function() {
                $(".pull-down-menu").show();
                $(".user-menu .icon-play3").addClass("rotate-180");
            },
            function() {
                $(".pull-down-menu").hide();
                $(".user-menu .icon-play3").removeClass("rotate-180");
            }
        );
        // 绑定鼠标悬停在user-mennu上和离开user-menu时的事件
        $(".lesson-classify-nav").mouseover(function() {
            $(".lesson-classify-nav ul").css({
                "height": "418px",
            });
        }).mouseleave(function() {
            $(".lesson-classify-nav ul").css({
                "height": "305px",
            });
        });
        // 绑定左侧课程分类导航条标签切换事件
        $(".lesson-classify-nav li").each(function(index) {
            $(this).hover(
                function() {
                    $(this).css("border-left", "2px solid #35b558");
                    $(".lesson-type").children().eq(index).removeClass("icon-ctrl");
                    $(".lesson-list-show").eq(index).show();
                },
                function() {
                    $(".lesson-list-show").hover(function() {
                            $(".lesson-list-show").eq(index).show();
                        },
                        function() {
                            $(".lesson-type").children().eq(index).addClass("icon-ctrl");
                            $(".lesson-list-show").eq(index).hide();
                        });
                    $(this).css("border-left", 0);
                    $(".lesson-type").children().eq(index).addClass("icon-ctrl");
                    $(".lesson-list-show").eq(index).hide();
                }
            );
        });
        // 左右滑动箭头出现隐藏以及相关动作的事件绑定
        $(".poster-viewer").hover(function() {
                $(".poster-viewer .arrow-left").fadeIn(500);
                $(".poster-viewer .arrow-right").fadeIn(500);
            },
            function() {
                $(".poster-viewer .arrow-left").fadeOut(500);
                $(".poster-viewer .arrow-right").fadeOut(500);
            }
        );
        slideX.init();
        // 绑定课程分类横向导航条标签切换事件
        $(".lesson-nav li").each(function(index) {
            $(this).mouseover(function() {
                $(".lesson-nav li i").removeClass("icon-play3");
                $(".lesson-nav li i").eq(index).addClass("icon-play3");
                $(".lesson-nav li").css("border-bottom", "2px solid #e4e4e4");
                $(this).css("border-bottom", "2px solid #35b558");
                $(".lesson-nav li").css("color", "#333");
                $(this).css("color", "#35b558");
                $(".lesson-list .visible").removeClass("visible");
                $(".lesson-list ul").eq(index).addClass("visible");
            })
        });
        //鼠标悬停于lesson-box上时，播放按钮及课程介绍出现的事件绑定
        $(".lesson-box").each(function(index) {
            $(this).hover(
                function() {
                    $(".box-mouseover").eq(index).show();
                    $(".lesson-info-box").eq(index).animate({
                        "height": "154px"
                    }, "fast");
                    $(".lesson-info").eq(index).animate({
                        "height": "52px"
                    }, "normal");
                    $(".lesson-info-box .title3").eq(2 * index + 1).removeClass("hidden");
                },
                function() {
                    $(".box-mouseover").eq(index).hide();
                    $(".lesson-info-box").animate({
                        "height": "67px"
                    }, "fast");
                    $(".lesson-info").eq(index).animate({
                        "height": 0
                    }, "normal");
                    $(".lesson-info-box .title3").eq(2 * index + 1).addClass("hidden");
                });
        });
        // 职业路径图鼠标悬停后样式变化事件绑定
        $(".learn-card").each(function(index) {
            $(this).mouseover(function() {
                if ((index == 4) || (index == 9)) {
                    $(this).css({
                        "border": "1px solid #35b558",
                        "color": "#ffffff"
                    });
                    $(".learn-card a button").eq(index).css({
                        "background-color": "#35b558",
                        "color": "#ffffff"
                    });
                } else {
                    $(this).css({
                        "border": "1px solid #35b558",
                        "border-right": 0
                    });
                    $(".learn-card").eq(index + 1).css({
                        "border-left": "1px solid #35b558"
                    });
                    $(".learn-card a button").eq(index).css({
                        "background-color": "#35b558",
                        "color": "#ffffff"
                    });
                }
            }).mouseleave(function() {
                if ((index == 4) || (index == 9)) {
                    $(this).css({
                        "border": "1px solid #e4e4e4",
                    });
                    $(".learn-card a button").eq(index).css({
                        "background-color": "#ffffff",
                        "color": "#35b558"
                    });
                } else {
                    $(this).css({
                        "border": "1px solid #e4e4e4",
                        "border-right": 0
                    });
                    $(".learn-card").eq(index + 1).css({
                        "border-left": "1px solid #e4e4e4"
                    });
                    $(".learn-card a button").eq(index).css({
                        "background-color": "#ffffff",
                        "color": "#35b558"
                    });
                }
            });
        });
        // 课程体系鼠标悬停后样式改变的事件绑定
        $(".system-box a").each(function(index) {
            $(this).hover(function() {
                    $(".front").eq(index).hide();
                    $(".back").eq(index).css({
                        "transform": "rotateY(0)",
                        "border-bottom": "1px solid #e4e4e4"
                    });
                },
                function() {
                    $(".back").eq(index).css({
                        "transform": "rotateY(-90deg)",
                        "border-bottom": "0"
                    });
                    $(".front").eq(index).fadeIn(1000);
                });
        });
        // wiki鼠标悬停后样式改变的事件绑定
        $(".wiki-box").each(function(index) {
            $(this).mouseover(function() {
                if (index == 2) {
                    $(this).css({
                        "border": "1px solid #35b558"
                    })
                } else {
                    $(this).css({
                        "border": "1px solid #35b558",
                        "border-right": 0,
                    });
                    $(".wiki-box").eq(index + 1).css({
                        "border-left": "1px solid #35b558"
                    });
                }
                $(".wiki-info-list").each(function(index) {
                    $(this).mouseover(function() {
                        $(".wiki-info-list p").eq(index).css("color", "#35b558");
                        $(".wiki-info-list span").eq(index).css("color", "#35b558");
                    }).mouseleave(function() {
                        $(".wiki-info-list p").eq(index).css("color", "#999");
                        $(".wiki-info-list span").eq(index).css("color", "#999");
                    });
                });
                $(".wiki-img a").each(function(index) {
                    $(this).mouseover(function() {
                        $(".wiki-img a h3").eq(index).css("color", "#35b558");
                        $(".wiki-img a span").eq(index).css("color", "#35b558");
                    }).mouseleave(function() {
                        $(".wiki-img a h3").eq(index).css("color", "#333");
                        $(".wiki-img a span").eq(index).css("color", "#999");
                    });
                });
            }).mouseleave(function() {
                if (index == 2) {
                    $(this).css({
                        "border": "1px solid #e4e4e4"
                    })
                } else {
                    $(this).css({
                        "border": "1px solid #e4e4e4",
                        "border-right": 0,
                    });
                    $(".wiki-box").eq(index + 1).css({
                        "border-left": "1px solid #e4e4e4"
                    });
                }
            });
        });
        // 战略合作伙伴、合作院校、媒体报道的左右滑动箭头出现及隐藏及滑动动作的事件绑定
        $(".partner").hover(function() {
                $(".partner .arrow-left").fadeIn(500);
                $(".partner .arrow-right").fadeIn(500);
            },
            function() {
                $(".partner .arrow-left").fadeOut(500);
                $(".partner .arrow-right").fadeOut(500);
            }
        );
        partnerSlideX.init();
        $(".university").hover(function() {
                $(".university .arrow-left").fadeIn(500);
                $(".university .arrow-right").fadeIn(500);
            },
            function() {
                $(".university .arrow-left").fadeOut(500);
                $(".university .arrow-right").fadeOut(500);
            }
        );
        universitySlideX.init();
        $(".media").hover(function() {
                $(".media .arrow-left").fadeIn(500);
                $(".media .arrow-right").fadeIn(500);
            },
            function() {
                $(".media .arrow-left").fadeOut(500);
                $(".media .arrow-right").fadeOut(500);
            }
        );
        mediaSlideX.init();
        $("#back-to-top").click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 1000);
        });
        // 回到页面顶部按钮及相关动作的事件绑定，当页面滑动距离大于100的时候，回到顶部按钮出现，当小于100的时候该按钮消失
        $(window).scroll(function() {
            //当页面滚动大于100px时，右下角出现返回页面顶端的按钮，否则消失
            if ($(window).scrollTop() > 100) {
                $("#back-to-top").slideDown(500);
                //$("#back-to-top").css("top",($(window).height()+$(window).scrollTop()-50));
            } else {
                $("#back-to-top").slideUp(500);
            }
        });
    });


});
