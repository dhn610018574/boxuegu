define(['jquery'],function($){

function checkMenu(pathname){
    //左侧菜单高亮
    var $cuLink = $('.navs').find('[href = "'+ pathname+'"]');
    $('.navs').find('a').removeClass('active');
    $cuLink.addClass('active');
    //菜单默认展开
    $cuLink.closest('ul').show();
    $cuLink.closest('ul').prev().children('.arrow').addClass('fa-angle-down');
};

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return encodeURIComponent(r[2]);
    return null;
  }

return {
    checkMenu:checkMenu,
    getQS:GetQueryString
}


})