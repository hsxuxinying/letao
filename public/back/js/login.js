/**
 * Created by Me on 2018/3/2.
 */
$(function(){
    //1.表单校验
    $('form').bootstrapValidator({
        //1. 用户名和密码校验
        fields:{
            username:{
                validators:{
                //    不能为空
                    notEmpty:{
                        message:'用户名不能为空'
                    },
                //    长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:'用户名必须在2到6之间'
                    },
                    callback:{
                        message:'用户名不存在'
                    }
                }
            },
            password:{
                validators:{
                    //    不能为空
                    notEmpty:{
                        message:'密码不能为空'
                    },
                    //    长度校验
                    stringLength:{
                        min:6,
                        max:12,
                        message:'密码必须在6到12之间'
                    },
                    callback:{
                        message:'密码错误'
                    }
                }

            }
        },
        //2. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },


    })
//    2.注册表单验证成功事件
    $("form").on('success.form.bv', function (e) {
        //禁止表单自动提交
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'post',
            url:'/employee/employeeLogin',
            data:$('form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.error == 1000){
                    $("form").data('bootstrapValidator').updateStatus('username', 'INVALID', 'callback')
                }
                if(info.error == 1001){
                    $("form").data('bootstrapValidator').updateStatus('password', 'INVALID', 'callback')
                }
                if(info.success){
                    location.href = 'index.html';
                }
            }
        })

    });
//    3.表单重置

    $("[type='reset']").on('click',function(){
        $("form").data('bootstrapValidator').resetForm();
    })

});