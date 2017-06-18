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
    cookie: 'assets/jquery-cookie/jquery.cookie',
    template:'assets/artTemplate/template-web',
    bootstrap:'assets/bootstrap/js/bootstrap',
    form:'assets/jquery-form/jquery.form'
  },
  shim:{
    bootstrap:{
      deps:['jquery']
    },
    form:{
      deps:['jquery']
    }
  }

};
require.config(pathConfig);
}();






