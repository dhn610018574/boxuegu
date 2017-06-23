define(['jquery','template','tools'],function($,template,tools){
    tools.checkMenu('/course/add');
  var cs_id = tools.getQS('cs_id');
  render();
  function render(){
      $.ajax({
          url:'/api/course/lesson?cs_id=' + cs_id,
          dataType:'json',
          success:function(data){
            //   console.log(data);
              if(data.code === 200 ){
                var html = template('course_lesson_tpl',data.result);
                $('#course_lesson').html(html);
              }
          }
      })
  }




})