$(document).ready(function() {
    $("#btn-login").click(function(event) {
        event.preventDefault();
        var userName = $("#input_username").val();
        var passWord = $("#input_password").val();
        if (userName == "" || userName == "undefined") {
            alert("用户名不能为空！");
            $("#username").focus();
            return;
        }
        if (passWord == "" || passWord == "undefined") {
            alert("密码不能为空！");
            $("#password").focus();
            return;
        }
        $.ajax({
            type: "post",
            url: "/login/doLogin",
            data: {
                "username": userName,
                "password": passWord
            },
            success: function(data) {
                if (data == true) {
                    //跳转至后台管理界面
                    setTimeout(function() {
                        window.location.href = '/management';
                    }, 2000);
                    $(".sign-in").hide();
                    $("#skip-info").fadeIn();
                } else {
                    $("#password").val("");
                    $("#password").focus();
                    $("#input-status").fadeIn();
                }
            }
        });
    })
});
