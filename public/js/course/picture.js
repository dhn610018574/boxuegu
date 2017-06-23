define(['jquery', 'template', 'tools', 'jcrop', 'uploadify', 'form'], function ($, template, tools) {
  tools.checkMenu('/course/add');
  var cs_id = tools.getQS('cs_id');
  var jcrop_api;

  // 渲染页面结构
  render();
  // 渲染页面结构
  function render() {
    $.ajax({
      url: '/api/course/picture?cs_id=' + cs_id,
      type: 'get',
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        if (data.code === 200) {
          // 根据接口返回的数据 + 模板引擎 ---> 页面结构
          var html = template('course_picture_tpl', data.result);
          $('#course_picture').html(html);

          // 根据 cs_cover_original 设置按钮的状态
          if (data.result.cs_cover_original) {
            // 让按钮变为可用
            $('#jcrop_btn').prop('disabled', false);
            // 剪裁图片和保存图片功能
            // 没有上传过图片，此时，剪裁区域不用初始化
            initJcrop();
          }

          // 头像上传
          uploadPic();
          // 绑定剪裁图片和保存图片的事件
          bindEvent();
        }
      }
    });

  }

  // 实现剪裁和保存图片 功能
  function initJcrop() {
    // 初始化 图片剪裁功能
    try {
      $('.upfile_pic_perview > img').Jcrop({
        // 设置宽高比
        aspectRatio: 2,
        boxWidth: 400,
        allowSelect: false
      }, function () {
        // console.log(this);
        jcrop_api = this;
      });
    } catch (e) { }
  }

  // 图片上传：
  function uploadPic() {
    $('#upfile_pic').uploadify({
      height: 30,
      width: 70,
      swf: '/public/assets/uploadify/uploadify.swf',
      uploader: '/api/uploader/cover',
      // 上传文件请求的类型
      method: 'post',
      buttonClass: 'btn btn-success btn-sm',
      buttonText: '选择图片',
      formData: {
        cs_id: cs_id
      },
      fileObjName: 'cs_cover_original',
      // fileTypeDesc : 'Any old file you want...',
      // 限制 上传文件的格式（后缀名）
      fileTypeExts: '*.jpg; *.gif; *.png',
      // 上传模板
      itemTemplate: '<span></span>',
      // 上传文件大小限制
      fileSizeLimit: '1MB',

      // 文件上传成功的回调函数
      onUploadSuccess: function (file, data, response) {
        // file 被选择图片的信息
        // data 服务端返回的数据
        // reponse 是一个布尔值
        data = JSON.parse(data);
        // console.log(data);
        $('.upfile_pic_perview img').attr('src', data.result.path);

        // 让按钮可用
        $('#jcrop_btn').prop('disabled', false);

        // 判断是否上传过图片，如果上传过了，那么 jcrop_api 是有值的！
        if (jcrop_api) {
          // 如果初始化过 剪裁图片功能，那么就先销毁掉
          jcrop_api.destroy();
          // 重置剪裁按钮的功能
          $('#jcrop_btn').val('剪裁图片').data('option', 1);
        }

        // 图片上传成功，重新实现图片剪裁功能
        initJcrop();
      }
    });
  }

  // 绑定 剪裁图片或保存图片 按钮事件
  function bindEvent() {
    // 通过按钮设置选择区
    $('#jcrop_btn').on('click', function () {
      // 问题：  一个按钮实现两个功能
      // 思路：
      //  1 使用两个按钮，单击 剪裁图片按钮，让剪裁图片按钮隐藏，让保存图片按钮展示
      //  2 根据按钮的文字，区分不同的功能
      //  3 根据按钮的标识，来区分不同的按钮 data-option="1"
      var $this = $(this);
      var option = $this.data('option');
      if (option === 1) {
        // 剪裁图片功能
        // 1 让图片文字修改为：保存图片
        $this.val('保存图片').data('option', 2);
        
        // 如果有 图片剪裁对象 然后，再初始化
        if (jcrop_api) {
          var imgW = jcrop_api.ui.stage.width;
          var imgH = jcrop_api.ui.stage.height;
          // console.log(imgW, imgH);

          // 先初始化一下
          jcrop_api.newSelection();
          var y = (imgH - imgW / 2) / 2
          jcrop_api.setSelect([0, y, imgW, imgW / 2]);

          // 初始化一个缩略图
          jcrop_api.initComponent('Thumbnailer', { width: 240, height: 120, thumb: '.thumb' });
          $('.jcrop-thumb').css('top', 0);
        }
      } else {
        // 保存图片
        $('#upfile_pic_form').ajaxSubmit({
          url: '/api/course/update/picture',
          type: 'POST',
          dataType: 'json',
          success: function (data) {
            // console.log(data);
            if (data.code === 200) {
              location.href = '/course/lesson?cs_id=' + cs_id;
            }
          }
        });
      }
      
      return false;
    });

    // 绑定事件
    $('.upfile_pic_perview').on('cropstart cropmove cropend', function (e, s, c) {
      $('#x').val(c.x);
      $('#y').val(c.y);
      $('#w').val(c.w);
      $('#h').val(c.h);
    });
  }
});