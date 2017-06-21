define(['jquery', 'template', 'tools', 'form', 'datepicker', 'language', 'validate'], function ($, template, tools) {
  // 高亮效果
  tools.checkMenu('/teacher/list');
  //根据url获取tc_id
  var tc_id = tools.getQS('tc_id');

  if (tc_id) {
    // 编辑
    updateTeacher();
  } else {
    // 添加
    addTeacher();
  }
  // 编辑
  function updateTeacher() {
    // 1 根据用户id获取讲师信息
    $.ajax({
      url: '/api/teacher/edit?tc_id=' + tc_id,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        if (data.code === 200) {
          // 2 渲染页面（模板 + 数据 => html结构）
          data.result.title = '讲师编辑';
          data.result.url = '/api/teacher/update';
          data.result.isAdd = false;
          data.result.btnTxt = '更 新';
          var html = template('teacher_add_edit_tpl', data.result);
          $('#teacher_add_edit').html(html);
          validate();
        }
      }
    });
  };

  // 添加
  function addTeacher() {
    var html = template('teacher_add_edit_tpl', {
      title: '讲师添加',
      url: '/api/teacher/add',
      isAdd: true,
      btnTxt: '添 加',
      tc_gender: '0' // 默认选中性别为 男
    });
    $('#teacher_add_edit').html(html);
    validate();

    // 添加
  };
  //表单验证插件
  function validate() {
    $('form').validate({
      onBlur: true,
      onSubmit: true,
      sendForm: false,
      valid: function () {
        //所有表单验证成功才发送请求
        $(this).ajaxSubmit({
          type: 'post',
          dataType: 'json',
          success: function (data) {
            location.href = '/teacher/list';
          }
        });
      },
      //失败执行的回调函数
      eachInvalidField: function () {
        this.parent().parent().addClass('has-error').removeClass('has-success');
      },
      //所有表单验证成功执行的回调函数
      eachValidField: function () {
        this.parent().parent().addClass('has-success').removeClass('has-error');
      },
      description: {
        tc_name: {
          required: '亚瑟友情提示，名字必填'
        },
        tc_pass: {
          required: '妲己友情提示，不能没有密码'
        }
      }
    });
  };

});