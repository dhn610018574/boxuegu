define(['jquery','template','form','datepicker','language','validate'],function($,template){
    //讲师更新
$.ajax({
    url:'/api/teacher/profile',
    success:function(data){
        console.log(data);
    }
})





})