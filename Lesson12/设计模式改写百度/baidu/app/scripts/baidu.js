// 单例模式
// 功能：更多产品
// 将鼠标移入与鼠标移出时更多产品列表出现与消失的事件放置到同一实例对象下；
var moreProduct = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.mpMouseOver = $("#more_product1");
        me.mpMouseLeave = $(".product_list_wrapper");
    },
    bind: function() {
        var me = this;
        me.mpMouseOver.mouseover(function() {
            var windowHeight = $(window).height();
            $(".product_list_wrapper").css("height", windowHeight);
            $(".product_list_wrapper").show();
        });
        me.mpMouseLeave.mouseleave(function() {
            $(".product_list_wrapper").hide();
        });
    }
};

// 单例模式
// 功能：点选用户名与设置btn伴随的下拉菜单出现与消失事件；
var menuPullDown = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.usernamePullDown = $("#username");
        me.configPullDown = $("#configure1");
    },
    bind: function() {
        var me = this;
        me.usernamePullDown.mouseover(function() {
            $(".user-pd").show();
        }).mouseleave(function() {
            $(".user-pd").mouseover(function() {
                $(".user-pd").show();
            }).mouseleave(function() {
                $(".user-pd").hide();
            });
            $(".user-pd").hide();
        });
        me.configPullDown.mouseover(function() {
            $(".cog-pd").show();
        }).mouseleave(function() {
            $(".cog-pd").mouseover(function() {
                $(".cog-pd").show();
            }).mouseleave(function() {
                $(".cog-pd").hide();
            });
            $(".cog-pd").hide();
        });
    }
};
// 单例模式
// 功能：鼠标经过搜索框及选中搜索框时进行的操作
var textMouseOver = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.mouseOver = $(".textfile");
    },
    bind: function() {
        var me = this;
        me.mouseOver.mouseover(function() {
            me.mouseOver.css("border", "1px solid #999")
        }).mouseleave(function() {
            me.mouseOver.css("border", "1px solid #d8d8d8")
        });
        me.mouseOver.click(function() {
            me.mouseOver.css("border", "1px solid #38f")
        });
    }
};

// 单例模式
// 功能：用于监听左侧标签切换事件及点选标签后切换到相应的菜单的动作；
var leftTabCut = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.tabCut = $(".main-menu-left a");
    },
    bind: function() {
        var me = this;
        me.tabCut.each(function(index) {
            $(this).click(function() {
                $(".main-menu-right div.visible1").removeClass("visible1");
                $(".main-menu-left .click ").addClass("normal").removeClass("click");
                $(".main-menu-left a").eq(index).removeClass("normal").addClass("click");
                var yMove = index * 35 + 11.5;
                $("#arrow1").css("top", yMove);
                $(".main-menu-right .menu").eq(index).addClass("visible1");
            });
        });
    }
};

// 单例模式
// 功能：以下3个函数用于监听导航、购物、视频的二次标签切换事件及产生的相应动作
var childTabCut = {
    init: function() {
        this.render();
        this.bind();
    },
    render: function() {
        var me = this;
        me.navTabCut = $(".tab-nav a");
        me.shoppingTabCut = $("#shopping .title3 a");
        me.myId = $(".my-id");
        me.videoTabCut = $("#video .title3 a");
    },
    bind: function() {
        var me = this;
        me.navTabCut.each(function(index) {
            $(this).click(function() {
                $(".tab-nav .tab-nav-click").removeClass("tab-nav-click");
                $(".tab-nav a").eq(index).addClass("tab-nav-click");
                $("#navigation .visible2").removeClass("visible2");
                $("#navigation .link-wrapper").eq(index).addClass("visible2");
            });
        });
        me.shoppingTabCut.each(function(index) {
            $(this).click(function() {
                $("#shopping .title3 .tab-click").removeClass("tab-click");
                $("#shopping .title3 a").eq(index).addClass("tab-click");
                $("#shopping .visible2").removeClass("visible2");
                $("#shopping .content-wrapper").eq(index).addClass("visible2");
            });
        });
        me.myId.click(function() {
            $(".my-id-list").toggle();
        });
        me.videoTabCut.each(function(index) {
            $(this).click(function() {
                $("#video .title3 .tab-click").removeClass("tab-click");
                $("#video .title3 a").eq(index).addClass("tab-click");
                $("#video .visible2").removeClass("visible2");
                $("#video .content-wrapper").eq(index).addClass("visible2");
            });
        });
    }
};
$(document).ready(function() {
    // 网页加载依赖项在此统一载入;
    moreProduct.init();
    menuPullDown.init();
    textMouseOver.init();
    leftTabCut.init();
    childTabCut.init();
});
