define(['jquery','template','tools','lazyload'],function($,template,tools){
      tools.checkMenu('/course/list');
      $.ajax({
          url:'/api/course',
          type:'get',
          success:function(data){
            //   console.log(data);
              if(data.code === 200 ){
                  var html = template('course_list_tpl',{list:data.result});
                  $('#course_list').html(html);
                  $('.lazy').lazyload();

              }
          }
      })



});