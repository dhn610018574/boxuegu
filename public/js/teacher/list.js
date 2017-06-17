define(['jquery','template','bootstrap'],function($,template){
var $teacher_list = $('#teacher_list');
$.ajax({
    url:'/api/teacher',
    success:function(data){
        // console.log(data);
        if(data.code === 200){
            var html = template('teacher_list_tpl',{
                list:data.result
            });
            $teacher_list.html(html);
        }

    }
});

//查看讲师详情
$teacher_list.on('click','.preview',function(){
var tc_id = $(this).parent().data('id');
$.ajax({
    url:'/api/teacher/view?tc_id=' + tc_id,
    type:'get',
    success:function(data){
        console.log(data);
        if(data.code === 200){
            var html = template('teacher_view_tpl',data.result);
            $('#teacher_view').html(html);
            //展示模态框
            $('#teacher_view_modal').modal();
        }

    }

})
})

})