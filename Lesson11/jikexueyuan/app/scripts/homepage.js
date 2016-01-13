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
