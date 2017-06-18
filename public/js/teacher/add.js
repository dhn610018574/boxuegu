define(['jquery', 'template', 'form', 'datepicker', 'language', 'validate'], function ($, template) {
  // var tc_id = location.search.substr(1).split('=')[1];
  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return encodeURIComponent(r[2]);
    return null;
  }
  var tc_id = GetQueryString('tc_id');
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
        console.log(data);
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
  }

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
  }

  // 不管是添加还是编辑，都需要执行以下功能
  // $('#teacher_add_edit').on('submit', 'form', function () {
  //   // 根据 name 属性，来序列化表单的
  //   $(this).ajaxSubmit({
  //     type: 'post',
  //     dataType: 'json',
  //     // 因为添加功能不需要id
  //     // data: {tc_id: tc_id},

  //     // 如果有id就指定额外的参数
  //     // 如果没有id，就不传参数
  //     // data: tc_id ? {tc_id: tc_id} : {},

  //     //将tc_id在页面中渲染就不必在js中做任何操作了！！
  //     success: function (data) {
  //       location.href = '/teacher/list';
  //     }
  //   });

  //   return false;
  // });
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
          // 因为添加功能不需要id
          // data: {tc_id: tc_id},

          // 如果有id就指定额外的参数
          // 如果没有id，就不传参数
          // data: tc_id ? {tc_id: tc_id} : {},

          //将tc_id在页面中渲染就不必在js中做任何操作了！！
          success: function (data) {
            location.href = '/teacher/list';
          }
        });
      },
      //失败执行的回调函数
      eachInvalidField:function(){
        this.parent().parent().addClass('has-error').removeClass('has-success');
      },
      //所有表单验证成功执行的回调函数
      eachValidField: function () {
        this.parent().parent().addClass('has-success').removeClass('has-error');
      },
      description:{
        tc_name:{
          required:'亚瑟友情提示，名字必填'
        },
        tc_pass:{
          required:'妲己友情提示，不能没有密码'
        }
      }
      


    });



  }




});