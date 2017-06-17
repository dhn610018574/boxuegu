/*
  这个文件用来处理 requirejs 的配置
*/

!function(){
var pathConfig = {
  // 基础路径
  baseUrl: '/public',
  // 各个模块的路径
  paths: {
    jquery: 'assets/jquery/jquery.min',
    cookie: 'assets/jquery-cookie/jquery.cookie'
  }
};

require.config(pathConfig);
}()






