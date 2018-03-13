/**
 * Created by Me on 2018/3/7.
 */
$(function(){
    //   1. 从地址栏中获取参数，设置给input框的value
    var productId = getPrame('productId');
    $.ajax({
        type:'GET',
        url:'/product/queryProductDetail',
        data:{
            id:productId
        },
        success:function(info){
            console.log(info);


            //计算尺码方法一
            var size = info.size;
            var tempArr = size.split('-');
            var arr = [];
            for(var i = +tempArr[0];i <= tempArr[1];i++){
                arr.push(i);
            }
            info.sizeArr = arr;
            console.log(info);
            $('.mui-scroll').html(template('details_tmp',info));
            //    重新初始化轮播图
            mui('.mui-slider').slider();
            //    重新初始化数字框
            mui('.mui-numbox').numbox()
            //    选择尺码
            $('.size').on('click','span',function(){
                $(this).addClass('now').siblings().removeClass('now');
            })
        }
    })
//    2.加入购物车功能
//    给按钮注册点击事件
//    获取productId，num,size
    $('.btn_add_cart').on('click',function(){
        var num = $('.mui-numbox-input').val();
        var size = $('.size span.now').text();
        if(!size){
            mui.toast('请选择尺码');
            return;
        }
        $.ajax({
            type:'POST',
            url:'/cart/addCart',
            data:{
                productId:productId,
                num:num,
                size:size
            },
            success:function(info){
                console.log(info);
            //    如果没有登录，跳转到登录页面
                if(info.error){
                    location.href = 'login.html?retUrl=' + location.href;
                }
            //    如果登陆了，弹出一个消息框
                if(info.success){
                    mui.confirm('添加成功','温馨提示',['去购物车','继续浏览'],function(e){
                        if(e.index == 0){
                            location.href = 'cart.html';
                        }
                    })
                }
            }
        })
    })
})