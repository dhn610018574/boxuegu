define(['jquery', 'template', 'tools'], function($, template, tools) {
  tools.checkMenu('/course/add');
  var cs_id = tools.getQS('cs_id');
  //页面渲染
  render();

  function render(){
    $.ajax({
      url:'/api/course/basic?cs_id=' + cs_id,
      type:'get',
      dataType:'json',
      success:function( data ){
        console.log(data);
        if(data.code === 200 ){
          var html = template('course_basic_tpl',data.result);
          $('#course_basic').html(html);
        }
      },
      error:function( data ){

      }
      
    })
  };

  
});