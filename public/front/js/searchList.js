/**
 * Created by Me on 2018/3/7.
 */
$(function(){
    var page = 1;
    var pageSize = 4;
//   1. 从地址栏中获取参数，设置给input框的value
    var key = getPrame('key');
    $('.lt_search input').val(key);
//    2.发送ajax请求，根据输入的关键字把数据渲染出来
    function render(callback){
        var prame = {};
        prame.proName = $('.lt_search input').val();
        prame.page = page;
        prame.pageSize = pageSize;
        //对于价格和库存两个参数要判断a中有没有now这个类
        //如果价格中有now这个类，就把price传过去
        //如果库存中有now这个类，就把num传过去
        //（1升序，2降序）
        var temp = $('.lt_sort a.now');
        if(temp.length > 0){
            var sortName = temp.data('type');
            var sortValue = temp.find('span').hasClass('fa-angle-down') ? 2 : 1;
            prame[sortName] = sortValue;
        }
        $.ajax({
            type:'GET',
            url:'/product/queryProduct',
            data:prame,
            success:function(info){
                setTimeout(function(){
                    //这里不再渲染，在callback中渲染
                    callback(info);
                    //$('.product').html( template('product_tmp',info));
                },1000)

            }
        })
    }
    //render();
    //下拉刷新和上拉加载
    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            //下拉刷新
            down : {
                auto: true,
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                callback :function(){
                    page = 1;
                    render(function(info){
                        console.log(info);
                        if(info.data.length == 0){
                            $('.product').html('<p >没有更多信息</p>');
                        }
                        //渲染数据
                        if(info.data.length > 0){
                            $('.product').html( template('product_tmp',info));

                        }
                        //    下拉结束
                        mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        //    重置上拉加载
                        mui('.mui-scroll-wrapper').pullRefresh().refresh(true);

                    })

                }
            },
        //    上拉加载
            up : {
                callback :function(){
                    page++;
                    render(function(info){
                        console.log(info);
                        if(info.data.length > 0){
                            //    重新加载
                            $('.product').append( template('product_tmp',info));
                            //结束上拉加载
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(false);
                        }else{
                            //结束上拉加载
                            mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
                        }

                    })
                }
            }
        }
    });
//    3.点击搜索按钮，
        // 1.获取input框的值
        // 2.再次发送ajax请求
    $('.btn_search').on('tap',function(){
        //render();
    //    重新自动加载
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    //    重新渲染搜索记录
        var value = $('.lt_search input').val();
        var history = localStorage.getItem('search_list') || '[]';
        var arr = JSON.parse(history);
        if(arr.indexOf(value) != -1){
            arr.splice(arr.indexOf(value),1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(value);
        localStorage.setItem('search_list',JSON.stringify(arr));
    })
//    4.给价格和库存注册点击事件
    //    1.判断他是不是有now这个类，若果没有，就添加now这个类，
    //    2.如果有now这个类，就改变箭头的方向
    $('.lt_sort a[data-type]').on('tap',function(){
        $this = $(this);
        if($this.hasClass('now')){
            $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

        }else{
            $this.addClass('now').parents().siblings().children().removeClass('now')
            $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        //render();
        //    重新自动加载
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    })

})