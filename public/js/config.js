//处理requirejs的配置
define(function () {
    var pathConfig = {
        baseUrl: '/public',
        paths: {
            jquery: 'assets/jquery/jquery.min',
        }
    }
    require.config(pathConfig);
})