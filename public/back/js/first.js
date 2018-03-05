/**
 * Created by Me on 2018/3/4.
 */
$(function(){

    //1.列表渲染
    var page = 1;
    var pageSize = 2;
    function render(){
        $.ajax({
            type:'GET',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                $('tbody').html(template('first_tmp',info));
                //    分页标签
                $('#pagintor').bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:page,
                    totalPages:Math.ceil(info.total/info.size),
                    onPageClicked:function(a,b,c,p){
                        page = p;
                        //    重新渲染
                        render();
                    }
                })
            }
        })
    }
    render();
//   2. 添加分类
    $('.add_cate').on('click',function(){
        //    显示模态框
        $('#addCateModal').modal('show');
    })
//    3.初始化表单校验
    $('#form').bootstrapValidator({
        //1. 指定校验时的图标显示，默认是bootstrap风格
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        //2. 指定校验字段
        fields: {
            //校验用户名，对应name表单的name属性
            categoryName: {
                validators: {
                    //不能为空
                    notEmpty: {
                        message: '请输入一级分类的名称'
                    },
                }
            }
        }
    });
//    4.注册表单成功的事件
    $("#form").on('success.form.bv', function (e) {
        e.preventDefault();
        //使用ajax提交逻辑
        $.ajax({
            type:'POST',
            url:'/category/addTopCategory',
            data:$('#form').serialize(),
            dataType:'json',
            success:function(info){
                console.log(info);
                if(info.success){
                    //关闭模态框
                    $('#addCateModal').modal('hide');
                    //重置表单
                    $("#form").data('bootstrapValidator').resetForm(true);
                //    重新渲染第一页
                    page = 1;
                    render();
                }
            }
        })
    });
})