define(['jquery','template','form','datepicker','language','validate'],function($,template){
    //个人资料获取
$.ajax({
    url:'/api/teacher/profile',
    success:function(data){
        var html = template('teacher_settings_tpl',data.result);
        $('#teacher_profile').html(html);
    }
})





})