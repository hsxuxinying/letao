/**
 * Created by Me on 2018/3/2.
 */
$(function(){
    //1.设置进度条
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

//2.二级菜单的显示与隐藏
    $('.second').prev().on('click',function(){
        $(this).next().slideToggle();
    })
//    3.侧边栏的显示和隐藏
    $('.menu .list').on('click',function(){
        //console.log(1);
        $('.lt_aside').toggleClass('now');
        $('.lt_main').toggleClass('now');

    })
//    4.退出功能
    $('.loginout').on('click',function(){
        $('#modalLoginOut').modal('show');
    })
    $('.login-out').on('click',function(){
    //    发送ajas请求，通过服务器退出账号
        $.ajax({
            type:'get',
            url:'/employee/employeeLogout',
            dataType:'json',
            success:function(info){
                //console.log(info);
                if(info.success){
                //    退出成功
                    location.href = "login.html";
                }
            }
        })
    })
//    1.如果不是登录页，每个页面初始就发送ajax请求,判断当前用户是否登录
    if(location.href.indexOf('login.html') == -1){
        $.ajax({
            type:'get',
            url:'/employee/checkRootLogin',
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.error == 400){
                    location.href = 'login.html'
                }
            }
        })
    }


});