define(['jquery','template','tools','bootstrap','form'],function($,template,tools){
    tools.checkMenu('/course/add');
  var cs_id = tools.getQS('cs_id');
  var $course_lesson = $('#course_lesson');
  render();
  //页面渲染
  function render(){
      $.ajax({
          url:'/api/course/lesson?cs_id=' + cs_id,
          dataType:'json',
          success:function(data){
              if(data.code === 200 ){
                var html = template('course_lesson_tpl',data.result);
                $course_lesson.html(html);
              }
          }
      });
  }

//课时添加
$course_lesson.on('click','.course_add_btn',function(){
   var html = template('lesson_tpl',{
       url:'/api/course/chapter/add',
       title:'课时添加',
       btnText:'添 加',
       ct_cs_id:cs_id,
   });
    $('#lesson').html(html);
    $('#lesson').modal();

    return false;//阻止冒泡
});

//添加数据
$('#lesson').on('click','.lesson_add_update',function(){
    var ct_name = $('[name="ct_name"]').val();
    var ct_minutes = $('[name="ct_minutes"]').val();
    var ct_seconds = $('[name="ct_seconds"]').val();
    var duration = ct_minutes + ":" + ct_seconds;
    var num = $('.lesson li').length + 1;
    $('#lesson_form').ajaxSubmit({
        type:'post',
        dataType:'json',
        success:function(data){
            if(data.code === 200 ){
                //比较好的做法，但是下面编辑做法冲突
                // $('#lesson').modal('hide');
                // $('.lessons li').last().clone()
                // .find('.order').text('课时'+ num)
                // .end()
                // .find('.name').text(ct_name)
                // .end()
                // .find('.duration').text(duration)
                // .end()
                // .appendTo('.lessons ul');
                $('#lesson').modal('hide');
                render();

            }
        }
    });
});

//编辑
$course_lesson.on('click','.edit',function(){
    var ct_id = $(this).parent().data('id');
    //根据ct_id渲染页面
    $.ajax({
        url:'/api/course/chapter/edit?ct_id=' + ct_id,
        type:'get',
        dataType:'json',
        success:function(data){
            if(data.code === 200 ){
                data.result.url = '/api/course/chapter/modify';
                data.result.title = '课时编辑';
                data.result.btnText = '编 辑';
                var html = template('lesson_tpl',data.result);
                $('#lesson').html(html);
                $('#lesson').modal();

            }
        }
    })
    return false;
});
});