define(['jquery', 'template', 'tools', 'jcrop', 'uploadify'], function ($, template, tools) {
    tools.checkMenu('/course/add');
    var cs_id = tools.getQS('cs_id');
    console.log(cs_id);
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
                uploadPic();
            }
        });
    };

    //上传头像
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
            fileSizeLimit: '2MB',
            onUploadSuccess:function(file,data,response){
                data = JSON.parse(data);
                $('.upfile_pic_perview img').attr('src',data.result.path);
                //按钮可用
                $('#jcrop_btn').prop('disabled',false);
            }

        })




    }
});