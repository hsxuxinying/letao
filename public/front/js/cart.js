/**
 * Created by Me on 2018/3/9.
 */
$(function(){
    //1.列表渲染
    function render(){
        $.ajax({
            type:'GET',
            url:'/cart/queryCart',
            success:function(info){
                console.log(info);
                setTimeout(function(){
                    if(info.error){
                        //如果没有登录，跳转到登录页面，登陆成功后，再跳转回来
                        location.href = "login.html?retUrl="+location.href;
                    }
                    $('#OA_task_2').html(template('cart_tmp',{info:info}));
                    mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh()
                },1000)

            }
        })
    }
    //render();
////    下拉刷新
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                auto: true,//可选,默认false.首次加载自动上拉刷新一次
                callback :function(){
                    render();
                }
            }
        }
    });
//2.删除功能
    $('#OA_task_2').on('tap','.btn_delete',function(){
        var id = $(this).data('id');
        mui.confirm('你是否确定要删除这件商品?','温馨提示',['是','否'],function(e){
            if(e.index == 0){
                $.ajax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{
                        id:[id]
                    },
                    success:function(info){
                        //重新下拉加载
                        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                    }
                })
            }
        })
    })
//    3.修改功能
    $('#OA_task_2').on('tap','.btn_edit',function(){
    //    获取多个自定义属性值
        var data = this.dataset;
        console.log(data);
        var html = template('edit_tmp',data);
        //替换掉所有的换行
        html = html.replace(/\n/g,'');
        //var tempArr = data.productsize.split('-');
        //var arr = [];
        //for(var i = +tempArr[0];i <= tempArr[1];i++){
        //    arr.push(i);
        //}
        //data.sizeArr = arr;
        //console.log(data);
        mui.confirm(html,'温馨提示',['确定','取消'],function(e){
            if(e.index == 0){
                var id = data.id;
                var size = $('.edit_size span.now').text();
                var num = $('.mui-numbox-input').val();
                $.ajax({
                    type:'POST',
                    url:'/cart/updateCart',
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    success:function(info){
                        //console.log(info);
                    //    重新加载
                        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
                    }
                })
            }
        })
        //    给鞋码的span注册点击事件
        $('.edit_size span').on('tap',function(){
            $(this).addClass('now').siblings().removeClass('now');
        })
        //重新初始化数字框
        mui('.mui-numbox').numbox();

    })

//4.计算总金额
    $('#OA_task_2').on('change','.ck',function(){
        var total = 0;
        $(':checked').each(function(){
            var price = $(this).data('price');
            var num = $(this).data('num');
            total += price * num;
        })
        $('.money_sum span').text(total.toFixed(2));
    })


})