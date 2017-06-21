define(['jquery', 'tools','validate'], function ($, tools) {
    tools.checkMenu('/course/add');
    $('#course_form').validate({
        onSubmit: true,
        sendForm: false,
        valid: function () {
            $.ajax({
                url: '/api/course/create',
                type: 'post',
                data: {
                    cs_name: $('#cs_name').val()
                },
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    if (data.code === 200) {
                        location.href = '/course/basic?cs_id=' + data.result.cs_id;
                    }
                }
            });
        },
        eachInvalidField: function () {
            this.parent().parent().addClass('has-error').removeClass('has-success');
        },
        // 表单元素验证成功执行的回调函数
        eachValidField: function () {
            this.parent().parent().addClass('has-success').removeClass('has-error');
        },
        // 验证描述信息
        description: {
            cs_name: {
                required: '课程名称为必填项'
            }
        }

    });
});