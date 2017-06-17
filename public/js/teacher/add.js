define(['jquery'], function ($) {
    if (location.href.indexOf('tc_id') === -1) {
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

    $('.edit').on('click', function () {
        alert(111);
        // var tc_id = $(this).parent().data('id');
        $.ajax({
            url: '/api/teacher/edit',
            type: 'GET',
            dataType: 'json',
            data: {
                tc_id: 21
            },
            success: function (data) {
                console.log(data);

            }
        });
    });
});