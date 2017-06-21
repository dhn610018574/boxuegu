define(['jquery', 'template', 'datepicker', 'language', 'uploadify', 'region', 'form'],function($,template){
    //个人资料获取
$.ajax({
    url:'/api/teacher/profile',
    success:function(data){
        if(data.code === 200){
        var html = template('teacher_settings_tpl',data.result);
        $('#teacher_profile').html(html);
        uploadAvatar();
        region();
        update();
        }
    }
});


//头像上传
function uploadAvatar () {
    $('#upfile').uploadify({
        //图片宽高
        height:120,
        width:120,
        swf:'/public/assets/uploadify/uploadify.swf',
        //请求地址
        uploader:'/api/uploader/avatar',
        //请求方式
        method:'post',
        //按钮文字
        buttonText: '',
        //相当于input的name属性，服务端根据这个获取内容
        fileObjName: 'tc_avatar',
        //限制文件上传格式
        fileTypeExts: '*.jpg; *.gif; *.png',
        //上传模板
        itemTemplate: '<span></span>',
        //上传大小限制
         fileSizeLimit: '5MB',
        //上传成功执行函数
        onUploadSuccess:function(file, data, response){
        // file 被选择图片的信息
        // data 服务端返回的数据
        // reponse 是一个布尔值
        // 服务端返回的是字符串，要转换成对象格式
        console.log(file);
        console.log(data);
        console.log(response);
         data = JSON.parse(data);
         var imgPath = data.result.path;
         $('#upfile_preview').attr('src',imgPath);
        }
    });

};

//省市区三级联动
function region(){
    $('#pcd').region({
        url:'/public/assets/jquery-region/region.json'
    });
}
//更新信息
function update(){
    $('form').on('submit',function(){
        $('form').ajaxSubmit({
            url:'/api/teacher/modify',
            type:'post',
            dataType:'json',
            //额外需要传给服务端的数据
            data:{
            tc_hometown: $('#p :selected').text() + '|' + $('#c :selected').text() + '|' + $('#d :selected').text()
            },
            success:function(data){
                alert('老铁！恭喜你更新成功');
            }
        });
        return false;
    });
};
});