define(['jquery'], function ($) {
    $('#loginForm').on('submit', function () {
        // 进行用户输入校验
        var tc_name = $('#tc_name').val();
        var tc_pass = $('#tc_pass').val();
        if (tc_name === '' || tc_pass === '') {
            // 阻止表单提交！！！
            return false;
        }

        // 作用：将表单序列化成一个 get请求的参数形式
        var params = $(this).serialize();
        params = decodeURI(params);
        console.log(params);
        var loginUrl = '/api/login?' + params;

        // 发送ajax请求到接口
        $.ajax({
            url: loginUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                if (data.code === 200) {
                    // 跳转到首页
                    location.href = '/';
                    //存储下cookie
                    $.cookie('tc_name',data.result.tc_name,{expires:1});
                    $.cookie('tc_avatar',data.result.tc_avatar,{expires:1});
                
                }
            }
        });

        // form 表单会自动提交，阻止默认提交
        return false;
    });
})