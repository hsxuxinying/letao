/**
 * Created by Me on 2018/3/8.
 */
$(function(){
//    获取验证码
//    点击获取验证码按钮，禁止按钮默认行为
//    禁用按钮，改变里面的内容
//    发送ajax请求
    $('.btn_vcode').on('click',function(e){
        e.preventDefault();
        $this = $(this);
        $this.prop('disabled',true).addClass('now').text('发送中...');
        $.ajax({
            type:'GET',
            url:'/user/vCode',
            success:function(info){
                console.log(info);
            //    开启倒计时
                var count = 5;
                var timer = setInterval(function(){
                    count--;
                    $this.text(count + '秒后发送');
                    if(count <= 0){
                        clearInterval(timer);
                        //恢复按钮
                        $this.prop('disabled',false).removeClass('now').text('重新发送')
                    }
                },1000)
            }
        })
    })
//    注册功能
    $('.btn_register').on('click',function(e){
        e.preventDefault();
        var username = $('[name=username]').val();
        var password = $('[name=password]').val();
        var repassword = $('[name=repassword]').val();
        var mobile = $('[name=mobile]').val();
        var vCode = $('[name=vCode]').val();
        if(!username){
            mui.toast('请输入用户名');
            return;
        }
        if(!password){
            mui.toast('请输入密码');
            return;
        }
        if(!repassword){
            mui.toast('请重新输入密码');
            return;
        }

        if(password != repassword){
            mui.toast('两次密码不一致，请重新输入');
            return;
        }
        if(!mobile){
            mui.toast('请输入手机号');
            return;
        }
        if(! /^1[3-9]\d{9}$/.test(mobile)){
            mui.toast('手机号格式不正确');
            return;
        }
        if(!vCode){
            mui.toast('请输入验证码');
            return;
        }
        $.ajax({
            type:"POST",
            url:'/user/register',
            data:$('.myForm').serialize(),
            success:function(info){
                console.log(info);
                if(info.error){
                    mui.toast(info.message);
                }
                if(info.success){
                    mui.toast('注册成功，1秒后跳转到登录页');
                    setTimeout(function(){
                        location.href = 'login.html';
                    },1000);
                }
            }
        })
    })
})