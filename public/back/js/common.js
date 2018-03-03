/**
 * Created by Me on 2018/3/2.
 */
$(function(){
    //禁用缓冲圈
    NProgress.configure(
        { showSpinner: false }
    );
    //开启进度条
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    })

});