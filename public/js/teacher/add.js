// 原始方式实现功能:
// define(['jquery'], function ($) {
//     var str = location.href;
//         var arr = str.split("?")[1];
//         arr = arr.split("=");
//         var tc_id = arr[1];
//     var tc_id = location.search.substr(1).split('=')[1];
//     if (!tc_id) {
//         $('#form_add').on('submit', function () {
//             var tc_name = $('#tc_name').val();
//             var tc_pass = $('#tc_pass').val();
//             var tc_join_date = $('#tc_join_date').val();
//             var tc_type = $('#tc_type').val();
//             var tc_gender = $('input[name = "tc_gender"]:checked').val();
//             $.ajax({
//                 url: '/api/teacher/add',
//                 dataType: 'json',
//                 type: 'POST',
//                 data: {
//                     tc_name: tc_name,
//                     tc_pass: tc_pass,
//                     tc_join_date: tc_join_date,
//                     tc_type: tc_type,
//                     tc_gender: tc_gender
//                 },
//                 success: function (data) {
//                     console.log(data);
//                     if (data.code === 200) {
//                         location.href = '/teacher/list';
//                     }
//                 }
//             });
//             return false;
//         });
//     }
//     // 讲师编辑
//     $.ajax({
//         url: '/api/teacher/edit?tc_id=' + tc_id,
//         type: 'GET',
//         dataType: 'json',
//         success: function (data) {
//             console.log(data);
//             if (data.code === 200) {
//                 $('.active').text('讲师修改');
//                 $('#tc_name').val(data.result.tc_name);
//                 $('#tc_join_date').val(data.result.tc_join_date);
//                 $('#tc_type').val(data.result.tc_type);
//                 $('input[value = "'+data.result.tc_gender+'"]').prop('checked',true);
//                 $('input[type="submit"]').attr('value', '修改并保存');
//             }
//             $('#form_add').on('submit', function () {
//                 var tc_name = $('#tc_name').val();
//                 var tc_pass = $('#tc_pass').val();
//                 var tc_join_date = $('#tc_join_date').val();
//                 var tc_type = $('#tc_type').val();
//                 var tc_gender = $('input[name = "tc_gender"]:checked').val();

//                 $.ajax({
//                     url: '/api/teacher/update',
//                     dataType: 'json',
//                     type: 'POST',
//                     data: {
//                         tc_id: tc_id,
//                         tc_name: tc_name,
//                         tc_pass: tc_pass,
//                         tc_join_date: tc_join_date,
//                         tc_type: tc_type,
//                         tc_gender: tc_gender
//                     },
//                     success: function (data) {
//                         console.log(data);
//                         if (data.code === 200) {
//                             location.href = '/teacher/list';
//                         }
//                     }
//                 });
//                 return false;
//             });
//         }
//     });
// });
// 模块化和页面复用方式：
define(['jquery', 'template', 'form'], function ($, template) {
  var tc_id = location.search.substr(1).split('=')[1];
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

    // 添加
  }

  // 不管是添加还是编辑，都需要执行以下功能
  $('#teacher_add_edit').on('submit', 'form', function () {
    // 根据 name 属性，来序列化表单的
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
        console.log(data);
        location.href = '/teacher/list';
      }
    });

    return false;
  });
});