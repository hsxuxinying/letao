/**
 * Created by Me on 2018/3/8.
 */
$(function(){
    //点击确认按钮，获取数据

    $('.btn_confirm').on('click',function(){
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(!password){
            mui.toast('请输入密码');
            return;
        }
        $.ajax({
            type:'POST',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(info){
                console.log(info);
                if(info.error){
                    mui.toast(info.message);
                }
                if(info.success){
                //    如果页面是之前的详情页跳转过来的，就再跳转到上一级页面
                //    若果不是，就跳转到用户中心
                    if(location.search.indexOf('retUrl') != -1){
                        location.href = history.go(-1);
                    }else{
                        location.href = 'user.html';
                    }
                }
            }
        })
    })


})