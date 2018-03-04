/**
 * Created by Me on 2018/3/4.
 */
$(function(){
    var page = 1;
    var pageSize = 5;
//    1.渲染列表页
    function render(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                $('tbody').html(template("user_tmp",info));
                //    渲染分页
                $("#pagintor").bootstrapPaginator({
                    bootstrapMajorVersion:3,//默认是2，如果是bootstrap3版本，这个参数必填
                    currentPage:page,//当前页
                    totalPages:Math.ceil(info.total/info.size),//总页数
                    //size:"small",//设置控件的大小，mini, small, normal,large
                    onPageClicked:function(a, b, c,p){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        page = p;
                        //    重新渲染
                        render();
                    }
                });
            }
        });
    }
    render();
//    2.设置禁用或启用按钮
    $('tbody').on('click','.btn',function(){
        //开启模态框
        $('#userModal').modal('show');
        //获取此按钮的id
        var id = $(this).parent().data('id');
        //    判断isDelete的值
        var isDelete = $(this).hasClass('btn-success')?1:0;
        //    点击确认按钮时，发送ajax请求
        $('.btn_confirm').off().on('click',function(){
            $.ajax({
                type:'POST',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function(info){
                    //console.log(info);
                    if(info.success){
                        //    影藏模态框
                        $('#userModal').modal('hide');
                        //重新渲染
                        render();
                    }

                }
            })
        })



    })





});