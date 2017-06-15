
//公共js
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
