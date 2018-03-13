/**
 * Created by Me on 2018/3/8.
 */
$(function(){
    //渲染当前用户的个人信息
    $.ajax({
        type:'GET',
        url:'/user/queryUserMessage',
        success:function(info){
            console.log(info);
            if(info.error){
                location.href = 'login.html';
            }
            //登陆成功直接返回数据
            $('.user_message').html(template('user_tmp',info));

        }
    })

    $('.btn_loginout').on('click',function(){
        $.ajax({
            type:'GET',
            url:'/user/logout',
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href = 'login.html';
                }
            }
        })
    })
})