/**
 * Created by Me on 2018/3/2.
 */
$(function(){
    //���û���Ȧ
    NProgress.configure(
        { showSpinner: false }
    );
    //����������
    $(document).ajaxStart(function () {
        NProgress.start();
    });
    $(document).ajaxStop(function(){
        NProgress.done();
    })

});