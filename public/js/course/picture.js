define(['jquery', 'template', 'tools', 'jcrop', 'uploadify'], function ($, template, tools) {
    tools.checkMenu('/course/add');
    var cs_id = tools.getQS('cs_id');
    render();
    //渲染函数
    function render() {
        $.ajax({
            url: '/api/course/picture?cs_id=' + cs_id,
            type: 'get',
            success: function (data) {
                console.log(data);
                var html = template('course_picture_tpl', data.result);
                $('#course_picture').html(html);
                //图片上传
                uploadPic();
            }
        });
    };

    //上传图片
    function uploadPic(){
        $('#upfile_pic').uploadify({
            height:30,
            width:70,
            swf:'/public/assets/uploadify/uploadify.swf',
            uploader:'/api/uploader/cover',
            method:'post',
            buttonClass:'btn btn-success btn-sm',
            buttonText:'选择图片',
            formData:{
                cs_id:cs_id
            },
            fileObjName:'cs_cover_original',
            fileTypeExts: '*.jpg; *.gif; *.png',
            itemTemplate: '<span></span>',
            fileSizeLimit: '5MB',
            onUploadSuccess:function(file,data,response){
                data = JSON.parse(data);
                // console.log(data.result);
                //设置图片路径
                $('.upfile_pic_perview img').attr('src',data.result.path);
                //按钮可用
                $('#jcrop_btn').prop('disabled',false);
                //图片裁剪
                jcropPic();      
            }
        });
    };

    //图片裁剪
    function jcropPic(){
        var jcrop_api;
      $('#target').Jcrop({
        // 大图设置默认选区
        setSelect: [0, 0, 300, 150],
        // 设置宽高比
        aspectRatio: 2,
        boxWidth:400,
        // bgColor: 'pink'，
        // minSize: [100, 50],
        // maxSize: [300, 150]
      }, function () {
        jcrop_api = this;
        this.initComponent('Thumbnailer', { width: 240, height: 120, thumb: '.thumb' });
      });

      // 通过按钮设置选择区
      $('#jcrop_btn').on('click', function (e) {
        if (jcrop_api) {
          jcrop_api.setSelect([20, 20, 240, 120]);
          $('#jcrop_btn').val('保存图片');

        }
      });

      // cropstart cropmove cropend 都是插件的事件
      // 注意： 事件需要给 img标签的父容器绑定才会生效！！！
      $('#container').on('cropstart cropmove cropend', function (e, s, c) {
        $('#cropx').val(c.x);
        $('#cropx').val(c.y);
        $('#cropx').val(c.w);
        $('#cropx').val(c.h);
      });
    }
});