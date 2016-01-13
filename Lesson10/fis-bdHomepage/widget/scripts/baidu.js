$(document).ready(function() {
    //监听更多产品的按钮点击事件，分别声明了点击及离开更多产品栏后相应的操作
    $("#more_product1").mouseover(function() {
        var windowHeight = $(window).height();
        $(".product_list_wrapper").css("height", windowHeight);
        $(".product_list_wrapper").show();
    });
    $(".product_list_wrapper").mouseleave(function() {
        $(".product_list_wrapper").hide();
    });
    //声明了页面最上方鼠标触碰导航条用户及设置下拉菜单及离开相应选项时进行的操作
    $("#username").mouseover(function() {
        $(".user-pd").show();
    }).mouseleave(function() {
        $(".user-pd").mouseover(function() {
            $(".user-pd").show();
        }).mouseleave(function() {
            $(".user-pd").hide();
        });
        $(".user-pd").hide();
    });
    $("#configure1").mouseover(function() {
        $(".cog-pd").show();
    }).mouseleave(function() {
        $(".cog-pd").mouseover(function() {
            $(".cog-pd").show();
        }).mouseleave(function() {
            $(".cog-pd").hide();
        });
        $(".cog-pd").hide();
    });
    //声明了鼠标经过搜索框及选中搜索框时进行的操作
    $(".textfile").mouseover(function() {
        $(".textfile").css("border", "1px solid #999")
    }).mouseleave(function() {
        $(".textfile").css("border", "1px solid #d8d8d8")
    });
    $(".textfile").click(function() {
        $(".textfile").css("border", "1px solid #38f")
    });
    //用于监听左侧标签切换事件及点选标签后切换到相应的菜单的动作；
    $(".main-menu-left a").each(function(index) {
        $(this).click(function() {
            $(".main-menu-right div.visible1").removeClass("visible1");
            $(".main-menu-left .click ").addClass("normal").removeClass("click");
            $(".main-menu-left a").eq(index).removeClass("normal").addClass("click");
            var yMove = index * 35 + 11.5;
            $("#arrow1").css("top", yMove);
            $(".main-menu-right .menu").eq(index).addClass("visible1");
        });
    });
    //以下3个函数用于监听导航、购物、视频的二次标签切换事件及产生的相应动作
    $(".tab-nav a").each(function(index) {
        $(this).click(function() {
            $(".tab-nav .tab-nav-click").removeClass("tab-nav-click");
            $(".tab-nav a").eq(index).addClass("tab-nav-click");
            $("#navigation .visible2").removeClass("visible2");
            $("#navigation .link-wrapper").eq(index).addClass("visible2");
        });
    });
    $("#shopping .title3 a").each(function(index) {
        $(this).click(function() {
            $("#shopping .title3 .tab-click").removeClass("tab-click");
            $("#shopping .title3 a").eq(index).addClass("tab-click");
            $("#shopping .visible2").removeClass("visible2");
            $("#shopping .content-wrapper").eq(index).addClass("visible2");
        });
    });
    $(".my-id").click(function() {
        $(".my-id-list").toggle();
    });
    $("#video .title3 a").each(function(index) {
        $(this).click(function() {
            $("#video .title3 .tab-click").removeClass("tab-click");
            $("#video .title3 a").eq(index).addClass("tab-click");
            $("#video .visible2").removeClass("visible2");
            $("#video .content-wrapper").eq(index).addClass("visible2");
        });
    });
});
