define(['jquery', 'template', 'tools', 'ckeditor', 'form'], function($, template, tools,CKEDITOR) {
  tools.checkMenu('/course/add');
  var cs_id = tools.getQS('cs_id');
  console.log(cs_id);
  //页面渲染
  render();
  getCategoryChild();
  update();

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

           // 渲染富文本编辑器
          CKEDITOR.replace('cs_brief', {
            skin: 'moono-lisa'
          });
        }
      },
      error:function( data ){
        console.log('错误');

      }
      
    })
  };

  //实现二级菜单的联动
  function getCategoryChild(){
    //模板字符串
    var categoryTpl ='{{ each list }}' + 
                      '<option value="{{ $value.cg_id }}">{{ $value.cg_name }}</option>' +
                      '{{ /each }}';

    $('#course_basic').on('change','.category_top',function(){
      var cg_id = $(this).val();
      $.ajax({
        url:'/api/category/child?cg_id=' + cg_id,
        dataType:'json',
        type:'get',
        success:function(data){
          // console.log(data);
          if(data.code === 200 ) {
            $('.category_child').html(template.render(categoryTpl,{list:data.result}));
          }

        }

      });
    });



  };

  //保存更新
  function update(){
    $('#course_basic').on('submit','form',function(){
      $(this).ajaxSubmit({
        url: '/api/course/update/basic',
        type:'post',
        success:function(data){
          location.href = '/course/picture?cs_id=' + data.result.cs_id;
        }
      });
      return false;
    });

  }

  
});