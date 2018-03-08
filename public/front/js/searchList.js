/**
 * Created by Me on 2018/3/7.
 */
$(function(){
//   1. 从地址栏中获取参数，设置给input框的value
    var key = getPrame('key');
    $('.lt_search input').val(key);
//    2.发送ajax请求，根据输入的关键字把数据渲染出来
    function render(){
        $('.product').html('<div class="loading"></div>');
        var prame = {};
        prame.proName = $('.lt_search input').val();
        prame.page = 1;
        prame.pageSize = 10;
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
        console.log(prame);
        $.ajax({
            type:'GET',
            url:'/product/queryProduct',
            data:prame,
            success:function(info){
                console.log(info);
                setTimeout(function(){
                    $('.product').html( template('product_tmp',info));
                },1000)

            }
        })
    }
    render();
//    3.点击搜索按钮，
        // 1.获取input框的值
        // 2.再次发送ajax请求
    $('.btn_search').on('click',function(){
        render();
    //    重新渲染搜索记录
    //    从localstorage中获取数据
        var history = localStorage.getItem('search_list') || '[]';
        var arr = JSON.parse(history);
        if(arr.indexOf(key) != -1){
            arr.splice(arr.indexOf(key),1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));
    })
//    4.给价格和库存注册点击事件
    //    1.判断他是不是有now这个类，若果没有，就添加now这个类，
    //    2.如果有now这个类，就改变箭头的方向
    $('.lt_sort a[data-type]').on('click',function(){
        $this = $(this);
        if($this.hasClass('now')){
            $this.find('span').toggleClass('fa-angle-down').toggleClass('fa-angle-up');

        }else{
            $this.addClass('now').parents().siblings().children().removeClass('now')
            $('.lt_sort span').removeClass('fa-angle-up').addClass('fa-angle-down');
        }
        render();
    })

})