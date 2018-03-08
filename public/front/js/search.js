/**
 * Created by Me on 2018/3/7.
 */
$(function(){
//    1.从localstorage中取出数据，渲染到页面上
//    规定：从localstorage中的数据存放在search_list中
    function history(){
        var history = localStorage.getItem('search_list') || '[]';
        var arr = JSON.parse(history);
        //console.log(str);
        return arr;
    }
    //2.渲染搜索记录
    function render(){
        var arr = history();
        $('.lt_history').html(template('history_tmp',{arr:arr}));
    }
    render();
//    3.点击清空记录
    $('.lt_history').on('click','.btn_empty',function(){
        mui.confirm('你确定要清空全部记录吗？','温馨提示',['是','否'],function(e){
            if(e.index === 0){
                localStorage.removeItem('search_list');
                //    重新渲染
                render();
            }
        })
    })
//    3.点击某一项的删除
    //    1.获取对应项的下标
    //    2.从localstorage中获取数据，并转换成数组
    //    3.在数组中找到对应下标的元素，删除
    //    4.把数据存到localstorage中
    //    5.重新渲染
    $('.lt_history').on('click','.btn_delete',function(){
        var index = $(this).data('index');
        mui.confirm('你确定要删除此条记录吗','温馨提示',['是','否'],function(e){
            console.log(e);
            if(e.index === 0){
                var arr =  history();
                console.log(arr);
                arr.splice(index,1);   //返回改变后的数组
                console.log(arr);
                localStorage.setItem('search_list',JSON.stringify(arr));
                render();
            }
        })

    })
//    4.添加数据
    //    1.获取到输入框中的value
    //    2.从localstorage中获取到数据，数组
    //    3.把value添加到数组中
            //   数组的长度大于10把添加的元素放在最前面，把最后一项元素删除
            //   数组中已经存在搜索项，把原来的搜索记录删除
    //    4.把数组中的数据保存到localstorage中
    //    5.重新渲染页面
    $('.btn_search').on('click',function(){
        var key = $('.lt_search input').val().trim();
        $('.lt_search input').val('');
        if(key.length === 0){
            mui.toast('请输入搜索关键字');
            return;
        }
        var arr = history();
        if(arr.indexOf(key) != -1){
            arr.splice(arr.indexOf(key),1);
        }
        if(arr.length >= 10){
            arr.pop();
        }
        arr.unshift(key);
        localStorage.setItem('search_list',JSON.stringify(arr));
        //render();
        location.href = 'searchList.html?key=' + key;
    })
})