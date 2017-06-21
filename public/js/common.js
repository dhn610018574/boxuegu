// jquery的插件是不需要引入的
define(['jquery', 'template','nprogress', 'cookie'], function ($ ,template,NProgress) {
     //菜单展开,页面不刷新，展开二级菜单
    $('.navs li ul').parent().on('click',function(){
        $(this).children('ul').slideToggle(200);
        $(this).find('.arrow').toggleClass('fa-angle-down');
    });
    //进度条效果和页面加载数据效果
    NProgress.start();
    setTimeout(function(){
        NProgress.done();
    },500);
    $(document)
    //加载效果
    .ajaxStart(function(){
        $('.loading-mask').show();
    })
    .ajaxStop(function(){
        setTimeout(function() {
            $('.loading-mask').hide();
        }, 300);
    })
    //退出功能
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
    //使用模板引擎提交个人信息
    var tpl = '<div class="avatar img-circle">' +
            '<img src="{{tc_avatar}}">' +
            '</div>' +
            '<h4>{{tc_name}}</h4>';
            var html = template.render(tpl,{
                tc_name:userInfo.tc_name,
                tc_avatar:userInfo.tc_avatar || '/public/images/monkey.png'
            });
            $('#profile').html(html);
});