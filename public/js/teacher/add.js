define(['jquery','template'],function($,template){
    $.ajax({
        url:'/api/teacher/add',
        dataType:'json',
        type:'POST',
        data:'FormData',
        success:function(data){

        }
    })

})