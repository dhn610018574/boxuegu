// jquery的插件是不需要引入的
define(['jquery', 'template', 'cookie'], function ($ ,template) {
    $('.logout').on('click', function () {
        $.ajax({
            url: '/api/logout',
            type: 'post',
            success: function (data) {
                if (data.code === '200') {
                    location.href = '/login';
                }
            }
        });
    });
    if (location.pathname !== '/login' && !$.cookie('PHPSESSID')) {
        location.href = '/login';
    }
    var userInfo = $.cookie();
    // $('.profile')
    //     .find('img').attr('src', userInfo.tc_avatar)
    //     .end()
    //     .find('h4').html(userInfo.tc_name);
    //使用模板引擎提交个人信息
    var tpl = '<div class="avatar img-circle">' +
            '<img src="{{tc_avatar}}">' +
            '</div>' +
            '<h4>{{tc_name}}</h4>';
            var html = template.render(tpl,userInfo);
            $('#profile').html(html);

});