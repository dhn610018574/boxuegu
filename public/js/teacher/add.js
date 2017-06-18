define(['jquery'], function ($) {
    var str = location.href;
        var arr = str.split("?")[1];
        arr = arr.split("=");
        var tc_id = arr[1];
    var tc_id = location.search.substr(1).split('=')[1];
    if (!tc_id) {
        $('#form_add').on('submit', function () {
            var tc_name = $('#tc_name').val();
            var tc_pass = $('#tc_pass').val();
            var tc_join_date = $('#tc_join_date').val();
            var tc_type = $('#tc_type').val();
            var tc_gender = $('input[name = "tc_gender"]:checked').val();
            $.ajax({
                url: '/api/teacher/add',
                dataType: 'json',
                type: 'POST',
                data: {
                    tc_name: tc_name,
                    tc_pass: tc_pass,
                    tc_join_date: tc_join_date,
                    tc_type: tc_type,
                    tc_gender: tc_gender
                },
                success: function (data) {
                    console.log(data);
                    if (data.code === 200) {
                        location.href = '/teacher/list';
                    }
                }
            });
            return false;
        });
    }
    // 4.讲师编辑
    $.ajax({
        url: '/api/teacher/edit?tc_id=' + tc_id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            if (data.code === 200) {
                $('.active').text('讲师修改');
                $('#tc_name').val(data.result.tc_name);
                $('#tc_join_date').val(data.result.tc_join_date);
                $('#tc_type').val(data.result.tc_type);
                $('input[value = "'+data.result.tc_gender+'"]').prop('checked',true);
                $('input[type="submit"]').attr('value', '修改并保存');
            }
            $('#form_add').on('submit', function () {
                var tc_name = $('#tc_name').val();
                var tc_pass = $('#tc_pass').val();
                var tc_join_date = $('#tc_join_date').val();
                var tc_type = $('#tc_type').val();
                var tc_gender = $('input[name = "tc_gender"]:checked').val();

                $.ajax({
                    url: '/api/teacher/update',
                    dataType: 'json',
                    type: 'POST',
                    data: {
                        tc_id: tc_id,
                        tc_name: tc_name,
                        tc_pass: tc_pass,
                        tc_join_date: tc_join_date,
                        tc_type: tc_type,
                        tc_gender: tc_gender
                    },
                    success: function (data) {
                        console.log(data);
                        if (data.code === 200) {
                            location.href = '/teacher/list';
                        }
                    }
                });
                return false;
            });
        }
    });
});