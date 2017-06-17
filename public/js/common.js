// jquery的插件是不需要引入的
define(['jquery','cookie'],function($){
    $('.logout').on('click',function(){
        $.ajax({
            url:'/api/logout',
            type:'post',
            success:function(data){
				if(data.code === '200'){
 				location.href = '/login';
				}   
            }
        });
    });
	if(location.pathname !== '/login' && !$.cookie('PHPSESSID')){
		location.href = '/login';
	}
    var userInfo = $.cookie();
    $('.profile')
        .find('img').attr('src',userInfo.tc_avatar)
        .end()
        .find('h4').html(userInfo.tc_name);

});
