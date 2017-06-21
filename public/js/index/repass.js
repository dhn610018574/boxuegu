define(['jquery'],function($){
    $.ajax({
        url:'/api/teacher/repass',
        type:'post',
        datatype:'json',
        data:{
            tc_pass:123456,
            tc_new_pass:456789
        },
        success:function(data){
            console.log(data);
        }
    })



});