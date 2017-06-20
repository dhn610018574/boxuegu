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
    form:'assets/jquery-form/jquery.form',
    datepicker:'assets/bootstrap-datepicker/js/bootstrap-datepicker.min',
    language:'assets/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min',
    validate:'assets/validate/jquery-validate.min',
    nprogress: 'assets/nprogress/nprogress',

    tools:'js/tools'
  },
  shim:{
    bootstrap:{
      deps:['jquery']
    },
    form:{
      deps:['jquery']
    },
    language:{
      deps:['datepicker']
    },
    datepicker:{
      deps:['jquery']
    },
    validate:{
      deps:['jquery']
    }
  }

};
require.config(pathConfig);
}();






